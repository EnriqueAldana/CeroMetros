/*
*  Validar que la variable de entorno MAIL_URL este fijada
*/
if(!process.env.MAIL_URL){
    if(Meteor.settings.private?.MAIL_URL){
        process.env.MAIL_URL= Meteor.settings.private.MAIL_URL;
    }else{
        console.warn("El servicio de envio de correos no ha sido configurado -Variable de entorno MAIL_URL indefinida- , por lo que no se enviarán correos.");
    }   
}
if (!process.env.SENDER_EMAIL){
    if(Meteor.settings.private?.SENDER_EMAILS){
        process.env.SENDER_EMAIL= Meteor.settings.private.SENDER_EMAILS.CONTACT;
    }else{
        console.warn("El servicio de envio de correos no ha sido configurado -Variable de entorno SENDER_EMAIL no definida- , por lo que no se enviarán correos.");
    }
}

if(!process.env.LOGO_IMAGE_PATH){
    process.env.LOGO_IMAGE_PATH="";
    console.warn("La ruta a la imagen del LOGO no ha sido configurado -Variable de entorno LOGO_IMAGEPATH- , por lo que no se visualizará.");
}
if(!process.env.PRODUCT_IMAGE_PATH){
    process.env.PRODUCT_IMAGE_PATH="";
    console.warn("La ruta a la imagen del producto que lo identificano ha sido configurado -Variable de entorno PRODUCT_IMAGE__PATH - , por lo que no se visualizará.");
}
console.info(" Configuracion del sistema de correo");
console.info(" Email URL ",process.env.MAIL_URL);
console.info(" Email sender",process.env.SENDER_EMAIL);

const name = 'Sistema CeroMetros';
const email = `<${process.env.SENDER_EMAIL}>`;
const from = `${ name } ${ email}`;

const emailEnrollAccount = 'email_enroll_account.html';
const emailResetPassword = 'email_reset_password.html';
const emailVerifyEmail = 'email_verify_email.html';
//const productSrc = 'http://localhost:3000/img/vue-meteor.png';
//const logoSrc = 'http://localhost:3000/img/Logo.png';
const productSrc = process.env.PRODUCT_IMAGE_PATH;
const logoSrc =process.env.LOGO_IMAGE_PATH;
Accounts.emailTemplates.siteName = name;
Accounts.emailTemplates.from = from;
const emailTemplates = Accounts.emailTemplates;

emailTemplates.enrollAccount = {
    subject() {
        return `Bienvenido a ${name}`;
    },
    html(user,url) {
        const urlWithoutHash = url.replace('#/','');
        if(Meteor.isDevelopment) {
            console.info('Link para fijar contraseña',urlWithoutHash);
        }
        SSR.compileTemplate('emailEnrollAccount',Assets.getText(emailEnrollAccount));
        return SSR.render('emailEnrollAccount',{
            urlWithoutHash,
            productSrc,
            logoSrc
        });
    }
};


emailTemplates.resetPassword = {
    subject() {
        return `Reestablecer contraseña`;
    },
    html(user,url) {
        const urlWithoutHash = url.replace('#/','');
        if(Meteor.isDevelopment) {
            console.info('Link para reestablecer contraseña',urlWithoutHash);
        }
        SSR.compileTemplate('emailResetPassword',Assets.getText(emailResetPassword));
        return SSR.render('emailResetPassword',{
            urlWithoutHash,
            productSrc,
            logoSrc
        });
    }
};

emailTemplates.verifyEmail = {
    subject() {
        return `Validar correo electronico`;
    },
    html(user,url) {
        const urlWithoutHash = url.replace('#/','');
        if(Meteor.isDevelopment) {
            console.info('Liga para validar correo electronico',urlWithoutHash);
        }
        SSR.compileTemplate('emailVerifyEmail',Assets.getText(emailVerifyEmail));
        return SSR.render('emailVerifyEmail',{
            urlWithoutHash,
            productSrc,
            logoSrc
        });
    }
};


