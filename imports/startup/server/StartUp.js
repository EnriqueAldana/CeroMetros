
import { Meteor } from 'meteor/meteor'
import APMServ from "../../api/AppPerformanceManagement/APMServ"
import { APMstatus } from "../both/APMStatus";
import APMlog from "../both/APMLog"
import APMTemplate from "../both/APMTemplate"

// On server startup, if the database is empty, create some initial data.
if (Meteor.isServer) {
  Meteor.startup(() => {
    console.info(" Configuracion del sistema" + '\n');
    console.log('Meteor version used: ', Meteor.release)
    let environment, settings
    environment = process.env.METEOR_ENV || "development"

    settings = {
      "production": {
        "private": {
          "MAIL_URL": "smtp://cerometros@jealdana.com:wiwcev-jynDo5-tosjom@smtp.ionos.mx:993",
          "SENDER_EMAILS": {
            "CONTACT": "cerometros@jealdana.com",
            "SUPPORT": "cerometros@jealdana.com",
            "SALES": "cerometros@jealdana.com"
          },
          "REFRESH_PERMISSIONS": false,
          "REFRESH_STATIC_PROFILES": false,
          "SHOW_ZERO_METERS_VERSION": true,
          "ZERO_METERS_USER": "Sealed Air Apodaca",
          "ZERO_METERS_VERSION": "0.0.1",
          "PRODUCT_IMAGE_PATH": "https://firebasestorage.googleapis.com/v0/b/cerometros.appspot.com/o/ZeroMts_Product.png?alt=media&token=084767d8-190f-4fb6-8cab-ee1a40f2c00d",
          "LOGO_IMAGE_PATH": "https://firebasestorage.googleapis.com/v0/b/cerometros.appspot.com/o/Logo.png?alt=media&token=0a923e0e-df2f-4201-a910-0d5a7ad735f2'",
          "BASE_URL_STORAGE": "https://storage.googleapis.com",
          "STORAGE_BUCKET": "gs://cerometros.appspot.com",
          "MONGO_URL": "mongodb://root:CeroM3tros@jealdana.com:27017/zmeters?authSource=admin",
          "ROOT_URL":"https://jealdana.com",
          "METEOR_ENV":"PRD"
        }
      },
      "staging": {
        "private": {
          "MAIL_URL": "smtp://cerometros@jealdana.com:wiwcev-jynDo5-tosjom@smtp.ionos.mx:993",
          "SENDER_EMAILS": {
            "CONTACT": "cerometros@jealdana.com",
            "SUPPORT": "cerometros@jealdana.com",
            "SALES": "cerometros@jealdana.com"
          },
          "REFRESH_PERMISSIONS": false,
          "REFRESH_STATIC_PROFILES": false,
          "SHOW_ZERO_METERS_VERSION": true,
          "ZERO_METERS_USER": "Mi empresa",
          "ZERO_METERS_VERSION": "0.0.1",
          "PRODUCT_IMAGE_PATH": "https://firebasestorage.googleapis.com/v0/b/cerometros.appspot.com/o/ZeroMts_Product.png?alt=media&token=084767d8-190f-4fb6-8cab-ee1a40f2c00d",
          "LOGO_IMAGE_PATH": "https://firebasestorage.googleapis.com/v0/b/cerometros.appspot.com/o/Logo.png?alt=media&token=0a923e0e-df2f-4201-a910-0d5a7ad735f2'",
          "BASE_URL_STORAGE": "https://storage.googleapis.com",
          "STORAGE_BUCKET": "gs://cerometros.appspot.com",
          "MONGO_URL": "mongodb://root:CeroM3tros@jealdana.com:27017/zmeters?authSource=admin",
          "ROOT_URL":"https://jealdana.com",
          "METEOR_ENV":"STG"
        },

      },
      "development": {
        "private": {
          "MAIL_URL": "smtp://cerometros@jealdana.com:wiwcev-jynDo5-tosjom@smtp.ionos.mx:993",
          "SENDER_EMAILS": {
            "CONTACT": "cerometros@jealdana.com",
            "SUPPORT": "cerometros@jealdana.com",
            "SALES": "cerometros@jealdana.com"
          },
          "REFRESH_PERMISSIONS": false,
          "REFRESH_STATIC_PROFILES": false,
          "SHOW_ZERO_METERS_VERSION": true,
          "ZERO_METERS_USER": "Mi empresa DEV startUP",
          "ZERO_METERS_VERSION": "0.0.2",
          "PRODUCT_IMAGE_PATH": "https://firebasestorage.googleapis.com/v0/b/cerometros.appspot.com/o/ZeroMts_Product.png?alt=media&token=084767d8-190f-4fb6-8cab-ee1a40f2c00d",
          "LOGO_IMAGE_PATH": "https://firebasestorage.googleapis.com/v0/b/cerometros.appspot.com/o/Logo.png?alt=media&token=0a923e0e-df2f-4201-a910-0d5a7ad735f2'",
          "BASE_URL_STORAGE": "http://storage.googleapis.com",
          "STORAGE_BUCKET": "gs://cerometros.appspot.com",
          "MONGO_URL": "mongodb://localhost:27017/zmeters?authSource=admin",
          "ROOT_URL":"http://localhost:3000",
          "METEOR_ENV":"Dev"
        }
      }
    }

    if (!process.env.METEOR_SETTINGS) {
      console.info("No se ha especificado una configuración mediante la variable de entorno METEOR_SETTINGS= JSON file con variables, por lo que se tomaran los valores de configuracion de la especificacion interna... ")
      if (environment === "production") {
        Meteor.settings = settings.production;
      } else if (environment === "staging") {
        Meteor.settings = settings.staging;
      } else {
        Meteor.settings = settings.development;
      }
      console.log("Using [ " + environment + " ] Meteor.settings");
    }else{
      console.info("Se ha especificado una configuración mediante METEOR_SETTINGS, por lo que se tomaran los valores de configuracion del JSON externo ... ")
      console.info("Se ha han declarado variables de entorno éstas seran incluidas en la configuración del sistema sobreescribiendo las existentes... ")
    
    }

    if (process.env.REFRESH_PERMISSIONS) {
      if (Meteor.settings.private) {
        Meteor.settings.private.REFRESH_PERMISSIONS = process.env.REFRESH_PERMISSIONS;
      } else {
        console.warn("El REFRESH_PERMISSIONS no ha sido configurado ");
      }
    }
    if (process.env.REFRESH_STATIC_PROFILES) {
      if (Meteor.settings.private) {
        Meteor.settings.private.REFRESH_STATIC_PROFILES = process.env.REFRESH_STATIC_PROFILES;
      } else {
        console.warn("El REFRESH_STATIC_PROFILES no ha sido configurado ");
      }
    }
    if (process.env.SHOW_ZERO_METERS_VERSION) {
      if (Meteor.settings.private) {
        Meteor.settings.private.SHOW_ZERO_METERS_VERSION = process.env.SHOW_ZERO_METERS_VERSION
      } else {
        console.warn("El SHOW_ZERO_METERS_VERSION no ha sido configurado ");
      }
    }
    if (process.env.ZERO_METERS_USER) {
      if (Meteor.settings.private?.ZERO_METERS_USER) {
        Meteor.settings.private.ZERO_METERS_USER = process.env.ZERO_METERS_USER
      } else {
        console.warn("El ZERO_METERS_USER no ha sido configurado ");
      }
    }
    if (process.env.ZERO_METERS_VERSION) {
      if (Meteor.settings.private?.ZERO_METERS_VERSION) {
        Meteor.settings.private.ZERO_METERS_VERSION = process.env.ZERO_METERS_VERSION
      } else {
        console.warn("El ZERO_METERS_VERSION no ha sido configurado ");
      }
    }
    if (process.env.MONGO_URL) {
      if (Meteor.settings.private?.MONGO_URL) {

        Meteor.settings.private.MONGO_URL = process.env.MONGO_URL

      } else {
        console.warn("El MONGO_URL no ha sido configurado ");
      }
    } else {
      console.log("No esta definida la variable de entorno process.env.MONGO_URL ")
      console.info("Será definida con la variable interna del ambiente METEOR_ENV")
      process.env.MONGO_URL=Meteor.settings.private.MONGO_URL
    }

    if (process.env.ROOT_URL) {
      if (Meteor.settings.private?.ROOT_URL) {

        Meteor.settings.private.ROOT_URL = process.env.ROOT_URL

      } else {
        console.warn("El ROOT_URL no ha sido configurado ");
      }
    } else {
      console.log("No esta definida la variable de entorno process.env.ROOT_URL ")
      console.info("Será definida con la variable interna del ambiente METEOR_ENV")
      process.env.ROOT_URL=Meteor.settings.private.ROOT_URL
    }

    if (process.env.METEOR_ENV) {
      if (Meteor.settings.private?.METEOR_ENV) {
        Meteor.settings.private.METEOR_ENV = process.env.METEOR_ENV
      } else {
        console.warn("El METEOR_ENV no ha sido configurado ");
      }
    } else {
      console.log("No esta definida la variable de entorno process.env.METEOR_ENV ")
      console.info("Será definida con la variable interna del ambiente METEOR_ENV")
      process.env.METEOR_ENV=Meteor.settings.private.METEOR_ENV
    }
    // Configuracion 
    let logTemplate = new APMTemplate('Info', APMstatus.SUCC.STATUSKEY, 'Configuration', 'AppGlobalVariables',
      'Configuracion del sistema  \n ' +
      ' REFRESH_PERMISSIONS:' + Meteor.settings.private.REFRESH_PERMISSIONS + '\n' +
      ' REFRESH_STATIC_PROFILES:' + Meteor.settings.private.REFRESH_STATIC_PROFILES + '\n' +

      ' SHOW_ZERO_METERS_VERSION:' + Meteor.settings.private.SHOW_ZERO_METERS_VERSION + '\n' +
      ' ZERO_METERS_USER:' + Meteor.settings.private.ZERO_METERS_USER + '\n' +
      ' ZERO_METERS_VERSION:' + Meteor.settings.private.ZERO_METERS_VERSION + '\n' +
      ' MONGO_URL:' + Meteor.settings.private.MONGO_URL + '\n'
      , 'Fijando variables de entorno para el servicio SMTP', '');
    logTemplate.msg = 'Variables de entorno para el aplicativo'
    let log = new APMlog('', 'Global Configuration', logTemplate);

    try {
      log.userId = 'Sistema CeroMetros' + Meteor.settings.private.ZERO_METERS_USER;
      // actualizamos el Id del registro del log
      log._id = APMServ.logToDB(log)

      console.log(' REFRESH_PERMISSIONS:' + Meteor.settings.private.REFRESH_PERMISSIONS + '\n');
      console.log(' REFRESH_STATIC_PROFILES:' + Meteor.settings.private.REFRESH_STATIC_PROFILES + '\n');

      console.log(' SHOW_ZERO_METERS_VERSION:' + Meteor.settings.private.SHOW_ZERO_METERS_VERSION + '\n');
      console.log(' ZERO_METERS_USER:' + Meteor.settings.private.ZERO_METERS_USER + '\n');
      console.log(' ZERO_METERS_VERSION:' + Meteor.settings.private.ZERO_METERS_VERSION);
      console.log(" BASE_URL_STORAGE:" + Meteor.settings.private.BASE_URL_STORAGE)
      console.log(" STORAGE_BUCKET:" + Meteor.settings.private.STORAGE_BUCKET)
      console.log(' MONGO_URL:' + Meteor.settings.private.MONGO_URL);
      console.log(" ROOT_URL:" + Meteor.settings.private.ROOT_URL);
      console.log(" METEOR_ENV:" + Meteor.settings.private.METEOR_ENV)
      console.log("============= Variables de entorno =========")
      console.log(JSON.stringify(process.env));

    } catch (e) {
      console.error("Error inicio de la aplicación variables globales", e)
    }
  });
}