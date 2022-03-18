

import APMServ from "../../../api/AppPerformanceManagement/APMServ"
import { APMstatus } from "../../both/APMStatus";
import APMlog from "../../both/APMLog"
import APMTemplate from "../../both/APMTemplate"

const name = 'Sistema CeroMetros ' + Meteor.settings.private.ZERO_METERS_USER;
const email = `<${Meteor.settings.private.SENDER_EMAIL}>`;
const from = `${ name } ${ email}`;

const emailEnrollAccount = 'email_enroll_account.html';
const emailResetPassword = 'email_reset_password.html';
const emailVerifyEmail = 'email_verify_email.html';
//const productSrc = 'http://localhost:3000/img/vue-meteor.png';
//const logoSrc = 'http://localhost:3000/img/Logo.png';
const productSrc = Meteor.settings.private.PRODUCT_IMAGE_PATH;
const logoSrc =Meteor.settings.private.LOGO_IMAGE_PATH;
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

// Configuracion 
        let logTemplate= new APMTemplate('Info',APMstatus.SUCC.STATUSKEY,'Configuration','MailServ',
             'Configuracion del sistema de correo \n '+
             ' Email URL:'+ Meteor.settings.private.MAIL_URL + '\n' +
             ' Email sender:'+ Meteor.settings.private.SENDER_EMAIL+ '\n' +
             ' Email LOGO IMAGE URL:'+ Meteor.settings.private.LOGO_IMAGE_PATH+ '\n' +
             ' Email  APP IMAGE PATH:'+ Meteor.settings.private.PRODUCT_IMAGE_PATH + '\n' 
            , 'Fijando variables de entorno para el servicio SMTP','');
            logTemplate.msg='Variables de entorno para el servicio SMTP'
        let log = new APMlog('','Configuration MailServ',logTemplate);
try{
    log.userId='Sistema CeroMetros MailServ' 
    log._id=APMServ.logToDB(log)
    console.info(" Configuracion del sistema de correo"+ '\n');
    console.info(" Email URL ",Meteor.settings.private.MAIL_URL+ '\n');
    console.info(" Email sender",Meteor.settings.private.SENDER_EMAILS.CONTACT+ '\n');
    console.info(' Email LOGO IMAGE URL:'+ Meteor.settings.private.LOGO_IMAGE_PATH+ '\n');
    console.info(' Email  APP IMAGE PATH:'+ Meteor.settings.private.PRODUCT_IMAGE_PATH+ '\n');
    
}catch(e){
    console.error("Error inicio de la aplicaion",e)
    logTemplate.type='Error'
    logTemplate.statusKeyLog=APMstatus.FAIL.STATUSKEY
    logTemplate.error=e
    log.log=logTemplate
    log._id=APMServ.logToDB(log)
}
