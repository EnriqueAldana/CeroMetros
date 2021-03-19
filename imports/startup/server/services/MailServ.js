if(Meteor.isDevelopment){
    if(Meteor.settings.private?.SENDER_EMAILS){
        process.env.EMAIL_SERVICES= Meteor.settings.private.SENDER_EMAILS.CONTACT;
    }else{
        console.warn("El servicio de envio de correos no ha sido configurado , por lo que no se enviarán correos.");
    }
}


const name = 'Sistema ZMeters';
const email = `<${process.env.EMAIL_SERVICES}>`;
const from = `${ name } ${ email}`;

const emailEnrollAccount = 'email_enroll_account.html';
const emailResetPassword = 'email_reset_password.html';
const emailVerifyEmail = 'email_verify_email.html';
//const productSrc = 'http://localhost:3000/img/vue-meteor.png';
//const logoSrc = 'http://localhost:3000/img/Logo.png';
const productSrc = 'https://firebasestorage.googleapis.com/v0/b/zmeters.appspot.com/o/ZeroMts_Product.png?alt=media';
const logoSrc ='https://firebasestorage.googleapis.com/v0/b/zmeters.appspot.com/o/Logo.png?alt=media';
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

if(Meteor.isDevelopment){
    if(Meteor.settings.private?.MAIL_URL){
        process.env.MAIL_URL= Meteor.settings.private.MAIL_URL;
    }else{
        console.warn("El servicio de envio de correos no ha sido configurado , por lo que no se enviarán correos.");
    }
}