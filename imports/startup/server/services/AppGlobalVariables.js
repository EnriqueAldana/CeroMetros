import APMServ from "../../../api/AppPerformanceManagement/APMServ"
import { APMstatus } from "../../../api/AppPerformanceManagement/APMStatus";
import APMlog from "../../../api/AppPerformanceManagement/APMLog"
import Utilities from "../../both/Utilities";

/*
*  Validar que la variable de entorno Globales
*/
console.info(" Configuracion del sistema");
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
try{
    console.log('REFRESH_PERMISSIONS:'+ process.env.REFRESH_PERMISSIONS);
    console.log(   'REFRESH_STATIC_PROFILES:'+ process.env.REFRESH_STATIC_PROFILES);
    console.log(    'SHOW_ZERO_METERS_VERSION:'+ process.env.SHOW_ZERO_METERS_VERSION);
    console.log(    'ZERO_METERS_USER:'+ process.env.ZERO_METERS_USER);
    console.log(   'ZERO_METERS_VERSION:'+ process.env.ZERO_METERS_VERSION);

    APMlog.view.viewComponentName ='Configuracion variables globales'
    APMlog.view.viewComponentParameters=[
        'Configuracion del sistema',
        'REFRESH_PERMISSIONS:'+ process.env.REFRESH_PERMISSIONS,
        'REFRESH_STATIC_PROFILES:'+ process.env.REFRESH_STATIC_PROFILES,
        'SHOW_ZERO_METERS_VERSION:'+ process.env.SHOW_ZERO_METERS_VERSION,
        'ZERO_METERS_USER:'+ process.env.ZERO_METERS_USER,
        'ZERO_METERS_VERSION:'+ process.env.ZERO_METERS_VERSION
    ]
    APMlog.user = 'Sistema CeroMetros' + process.env.ZERO_METERS_USER;
    APMlog.view.status = APMstatus.SUCC
    APMlog.view.dateViewCreated = Utilities.getDateTimeNowUTC()
    APMlog.view.msg = "Aplicacion iniciada variables globales"
    APMServ.loggerDB(APMlog)
}catch(e){
    console.error("Error inicio de la aplicación variables globales",e)
}