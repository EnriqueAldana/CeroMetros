import APMServ from "../../../api/AppPerformanceManagement/APMServ"
import { APMstatus } from "../../both/APMStatus";
import APMlog from "../../../api/AppPerformanceManagement/APMLog"
import APMTemplate from "../../both/APMTemplate"
/*
*  Validar que la variable de entorno Globales
*/
console.info(" Configuracion del sistema"+ '\n');
if(!process.env.REFRESH_PERMISSIONS){
    if(Meteor.settings.private){
        process.env.REFRESH_PERMISSIONS= Meteor.settings.private.REFRESH_PERMISSIONS;
    }else{
        console.warn("El REFRESH_PERMISSIONS no ha sido configurado ");
    }   
}
if(!process.env.REFRESH_STATIC_PROFILES){
    if(Meteor.settings.private){
        process.env.REFRESH_STATIC_PROFILES= Meteor.settings.private.REFRESH_STATIC_PROFILES;
    }else{
        console.warn("El REFRESH_STATIC_PROFILES no ha sido configurado ");
    }   
}
if(!process.env.SHOW_ZERO_METERS_VERSION){
    if(Meteor.settings.private){
        process.env.SHOW_ZERO_METERS_VERSION= Meteor.settings.private.SHOW_ZERO_METERS_VERSION;
    }else{
        console.warn("El SHOW_ZERO_METERS_VERSION no ha sido configurado ");
    }   
}
if(!process.env.ZERO_METERS_USER){
    if(Meteor.settings.private?.ZERO_METERS_USER){
        process.env.ZERO_METERS_USER= Meteor.settings.private.ZERO_METERS_USER;
    }else{
        console.warn("El ZERO_METERS_USER no ha sido configurado ");
    }   
}
if(!process.env.ZERO_METERS_VERSION){
    if(Meteor.settings.private?.ZERO_METERS_VERSION){
        process.env.ZERO_METERS_VERSION= Meteor.settings.private.ZERO_METERS_VERSION;
    }else{
        console.warn("El ZERO_METERS_VERSION no ha sido configurado ");
    }   
}   

// Configuracion 
let logTemplate= new APMTemplate('Info',APMstatus.SUCC.STATUSKEY,'Configuration','AppGlobalVariables',
             'Configuracion del sistema  \n '+
             ' REFRESH_PERMISSIONS:'+ process.env.REFRESH_PERMISSIONS + '\n' +
             ' SHOW_ZERO_METERS_VERSION:'+ process.env.SHOW_ZERO_METERS_VERSION+ '\n' +
             ' ZERO_METERS_USER:'+ process.env.ZERO_METERS_USER+ '\n' +
             ' ZERO_METERS_VERSION:'+ process.env.ZERO_METERS_VERSION + '\n' 
            , 'Fijando variables de entorno para el servicio SMTP','');
            logTemplate.msg='Variables de entorno para el servicio SMTP'
        let log = new APMlog('','Global Configuration',logTemplate);

try{
    log.userId='Sistema CeroMetros' + process.env.ZERO_METERS_USER;
    // actualizamos el Id del registro del log
    log._id=APMServ.logToDB(log)

    console.log(' REFRESH_PERMISSIONS:'+ process.env.REFRESH_PERMISSIONS + '\n');
    console.log(' SHOW_ZERO_METERS_VERSION:'+ process.env.SHOW_ZERO_METERS_VERSION+ '\n' );
    console.log(' ZERO_METERS_USER:'+ process.env.ZERO_METERS_USER+ '\n');
    console.log(' ZERO_METERS_VERSION:'+ process.env.ZERO_METERS_VERSION);

}catch(e){
    console.error("Error inicio de la aplicación variables globales",e)
}