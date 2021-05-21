var require = meteorInstall({"imports":{"startup":{"server":{"services":{"FirebaseAdmin.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/startup/server/services/FirebaseAdmin.js                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  firebaseAdminsStorage: () => firebaseAdminsStorage,
  BASE_URL_STORAGE: () => BASE_URL_STORAGE
});
let firebaseAdmin;
module.link("firebase-admin", {
  default(v) {
    firebaseAdmin = v;
  }

}, 0);
let serviceAccount;
module.link("../../../../settings/cerometros-firebase-adminsdk-ublo1-0e93050736.json", {
  default(v) {
    serviceAccount = v;
  }

}, 1);
;
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  storageBucket: 'gs://cerometros.appspot.com'
});
const firebaseAdminsStorage = firebaseAdmin.storage().bucket('gs://cerometros.appspot.com');
const BASE_URL_STORAGE = 'http://storage.googleapis.com';
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"MailServ.js":function module(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/startup/server/services/MailServ.js                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
/*
*  Validar que la variable de entorno MAIL_URL este fijada
*/
if (!process.env.MAIL_URL) {
  var _Meteor$settings$priv;

  if ((_Meteor$settings$priv = Meteor.settings.private) !== null && _Meteor$settings$priv !== void 0 && _Meteor$settings$priv.MAIL_URL) {
    process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;
  } else {
    console.warn("El servicio de envio de correos no ha sido configurado -Variable de entorno MAIL_URL indefinida- , por lo que no se enviarán correos.");
  }
}

if (!process.env.SENDER_EMAIL) {
  var _Meteor$settings$priv2;

  if ((_Meteor$settings$priv2 = Meteor.settings.private) !== null && _Meteor$settings$priv2 !== void 0 && _Meteor$settings$priv2.SENDER_EMAILS) {
    process.env.SENDER_EMAIL = Meteor.settings.private.SENDER_EMAILS.CONTACT;
  } else {
    console.warn("El servicio de envio de correos no ha sido configurado -Variable de entorno SENDER_EMAIL no definida- , por lo que no se enviarán correos.");
  }
}

if (!process.env.LOGO_IMAGE_PATH) {
  process.env.LOGO_IMAGE_PATH = "";
  console.warn("La ruta a la imagen del LOGO no ha sido configurado -Variable de entorno LOGO_IMAGEPATH- , por lo que no se visualizará.");
}

if (!process.env.PRODUCT_IMAGE_PATH) {
  process.env.PRODUCT_IMAGE_PATH = "";
  console.warn("La ruta a la imagen del producto que lo identificano ha sido configurado -Variable de entorno PRODUCT_IMAGE__PATH - , por lo que no se visualizará.");
}

console.info(" Configuracion del sistema de correo");
console.info(" Email URL ", process.env.MAIL_URL);
console.info(" Email sender", process.env.SENDER_EMAIL);
const name = 'Sistema CeroMetros';
const email = "<".concat(process.env.SENDER_EMAIL, ">");
const from = "".concat(name, " ").concat(email);
const emailEnrollAccount = 'email_enroll_account.html';
const emailResetPassword = 'email_reset_password.html';
const emailVerifyEmail = 'email_verify_email.html'; //const productSrc = 'http://localhost:3000/img/vue-meteor.png';
//const logoSrc = 'http://localhost:3000/img/Logo.png';

const productSrc = process.env.PRODUCT_IMAGE_PATH;
const logoSrc = process.env.LOGO_IMAGE_PATH;
Accounts.emailTemplates.siteName = name;
Accounts.emailTemplates.from = from;
const emailTemplates = Accounts.emailTemplates;
emailTemplates.enrollAccount = {
  subject() {
    return "Bienvenido a ".concat(name);
  },

  html(user, url) {
    const urlWithoutHash = url.replace('#/', '');

    if (Meteor.isDevelopment) {
      console.info('Link para fijar contraseña', urlWithoutHash);
    }

    SSR.compileTemplate('emailEnrollAccount', Assets.getText(emailEnrollAccount));
    return SSR.render('emailEnrollAccount', {
      urlWithoutHash,
      productSrc,
      logoSrc
    });
  }

};
emailTemplates.resetPassword = {
  subject() {
    return "Reestablecer contrase\xF1a";
  },

  html(user, url) {
    const urlWithoutHash = url.replace('#/', '');

    if (Meteor.isDevelopment) {
      console.info('Link para reestablecer contraseña', urlWithoutHash);
    }

    SSR.compileTemplate('emailResetPassword', Assets.getText(emailResetPassword));
    return SSR.render('emailResetPassword', {
      urlWithoutHash,
      productSrc,
      logoSrc
    });
  }

};
emailTemplates.verifyEmail = {
  subject() {
    return "Validar correo electronico";
  },

  html(user, url) {
    const urlWithoutHash = url.replace('#/', '');

    if (Meteor.isDevelopment) {
      console.info('Liga para validar correo electronico', urlWithoutHash);
    }

    SSR.compileTemplate('emailVerifyEmail', Assets.getText(emailVerifyEmail));
    return SSR.render('emailVerifyEmail', {
      urlWithoutHash,
      productSrc,
      logoSrc
    });
  }

};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"utilities":{"FileOperations.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/startup/server/utilities/FileOperations.js                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let mimetypes;
module.link("mimetypes", {
  default(v) {
    mimetypes = v;
  }

}, 0);
let Utilities;
module.link("./Utilities", {
  default(v) {
    Utilities = v;
  }

}, 1);
let BASE_URL_STORAGE, firebaseAdminsStorage;
module.link("../services/FirebaseAdmin", {
  BASE_URL_STORAGE(v) {
    BASE_URL_STORAGE = v;
  },

  firebaseAdminsStorage(v) {
    firebaseAdminsStorage = v;
  }

}, 2);
let ResponseMessage;
module.link("./ResponseMesssage", {
  ResponseMessage(v) {
    ResponseMessage = v;
  }

}, 3);
module.exportDefault({
  saveFileFromBufferToGoogleStorage(fileBuffer, name, path, mimeType) {
    return Promise.asyncApply(() => {
      const responseMessage = new ResponseMessage();
      const versionFile = Utilities.generateNumberToken(10, 99);
      const filename = "".concat(name).concat(versionFile, ".").concat(mimetypes.detectExtension(mimeType));
      const file = firebaseAdminsStorage.file("".concat(path, "/").concat(filename));
      const fileUrl = "".concat(BASE_URL_STORAGE, "/").concat(firebaseAdminsStorage.name, "/").concat(path, "/").concat(filename);

      try {
        Promise.await(file.save(fileBuffer, {
          metadata: {
            contentType: mimeType
          },
          public: true
        }));
        responseMessage.create('File uploaded', null, {
          success: true,
          fileUrl
        });
      } catch (exception) {
        console.error('Error uploading file to Google Storage: ', exception);
        responseMessage.create('Error uploading file to Google Storage', null, {
          success: false
        });
      }

      return responseMessage;
    });
  },

  saveFileFromBase64ToGoogleStorage(base64file, name, path) {
    return Promise.asyncApply(() => {
      const mimeType = base64file.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];
      const base64EncodedImageString = base64file.split(';base64,').pop();
      const fileBuffer = Buffer.from(base64EncodedImageString, 'base64');
      return Promise.await(this.saveFileFromBufferToGoogleStorage(fileBuffer, name, path, mimeType));
    });
  },

  deleteFileFromGoogleStoreIfExists(fileLocation) {
    return Promise.asyncApply(() => {
      const file = firebaseAdminsStorage.file(fileLocation);

      try {
        const existsFile = Promise.await(file.exists());

        if (existsFile[0]) {
          Promise.await(file.delete());
        }
      } catch (exception) {
        console.error('Ha habido un error al borrar archivo de Google Store', exception);
      }
    });
  },

  deleteFilesOfFolderFromGoogleStorage(userFolder) {
    return Promise.asyncApply(() => {
      try {
        Promise.await(firebaseAdminsStorage.deleteFiles({
          prefix: userFolder + '/'
        }));
      } catch (exception) {
        console.error('Error deleting files from Google Storage');
      }
    });
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ResponseMesssage.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/startup/server/utilities/ResponseMesssage.js                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  ResponseMessage: () => ResponseMessage
});

class ResponseMessage {
  constructor() {
    this.message = null;
    this.description = null;
    this.data = null;
  }

  create(message) {
    let description = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    let data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    this.message = message;
    this.description = description;
    this.data = data;
  }

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"Utilities.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/startup/server/utilities/Utilities.js                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.exportDefault({
  generateNumberToken(min, max) {
    //console.log('min ', min);
    //console.log('max ',max);
    const num = Math.floor(Math.random() * (max + 1 - min) + min); //console.log('random ' , num);

    return num;
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Permissions.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/startup/server/Permissions.js                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  permissionsArray: () => permissionsArray
});
let Roles;
module.link("meteor/alanning:roles", {
  Roles(v) {
    Roles = v;
  }

}, 0);
const Permissions = {
  USERS: {
    LIST: {
      VALUE: 'users-view',
      TEXT: 'Listar usuarios'
    },
    CREATE: {
      VALUE: 'users-create',
      TEXT: 'Crear Usuario'
    },
    UPDATE: {
      VALUE: 'users-edit',
      TEXT: 'Editar Usuario'
    },
    DELETE: {
      VALUE: 'users-delete',
      TEXT: 'Borrar Usuario'
    }
  },
  PROFILES: {
    LIST: {
      VALUE: 'profiles-view',
      TEXT: 'Listar perfil'
    },
    CREATE: {
      VALUE: 'profiles-create',
      TEXT: 'Crear perfil'
    },
    UPDATE: {
      VALUE: 'profiles-edit',
      TEXT: 'Editar perfil'
    },
    DELETE: {
      VALUE: 'profiles-delete',
      TEXT: 'Borrar perfil'
    }
  },
  PERMISSIONS: {
    LIST: {
      VALUE: 'permissions-view',
      TEXT: 'Listar permisos'
    }
  },
  ADMINS: {
    LIST_ADMINS: {
      VALUE: 'admins-view',
      TEXT: 'Listar administrador'
    },
    CREATE_ADMIN: {
      VALUE: 'admins-create',
      TEXT: 'Crear administrador'
    },
    UPDATE_ADMIN: {
      VALUE: 'admins-edit',
      TEXT: 'Editar administrador'
    },
    DELETE_ADMIN: {
      VALUE: 'admins-delete',
      TEXT: 'Borrar administrador'
    }
  },
  SUPERADMINS: {
    LIST_SUPER_ADMINS: {
      VALUE: 'superadmins-view',
      TEXT: 'Listar super administrador'
    },
    CREATE_SUPER_ADMIN: {
      VALUE: 'superadmins-create',
      TEXT: 'Crear super administrador'
    },
    UPDATE_SUPER_ADMIN: {
      VALUE: 'superadmins-edit',
      TEXT: 'Editar super administrador'
    },
    DELETE_SUPER_ADMIN: {
      VALUE: 'superadmins-delete',
      TEXT: 'Borrar super administrador'
    }
  },
  CHAT: {
    CREATE: {
      VALUE: 'message-create',
      TEXT: 'Enviar mensaje de chat'
    },
    LIST: {
      VALUE: 'message-view',
      TEXT: 'Ver mensajes de chat'
    }
  },
  COMPANIES: {
    LIST: {
      VALUE: 'companies-view',
      TEXT: 'Listar compañias'
    },
    CREATE: {
      VALUE: 'companies-create',
      TEXT: 'Crear compañias'
    },
    UPDATE: {
      VALUE: 'companies-edit',
      TEXT: 'Editar compañias'
    },
    DELETE: {
      VALUE: 'companies-delete',
      TEXT: 'Borrar compañias'
    }
  },
  PRODUCTIONLINES: {
    LIST: {
      VALUE: 'productionlines-view',
      TEXT: 'Listar linea de produccion'
    },
    CREATE: {
      VALUE: 'productionlines-create',
      TEXT: 'Crear linea de produccion'
    },
    UPDATE: {
      VALUE: 'productionlines-edit',
      TEXT: 'Editar linea de produccion'
    },
    DELETE: {
      VALUE: 'productionlines-delete',
      TEXT: 'Borrar linea de produccion'
    }
  },
  PRODUCTIONORDERS: {
    LIST: {
      VALUE: 'productionorders-view',
      TEXT: 'Listar orden de produccion'
    },
    CREATE: {
      VALUE: 'productionorders-create',
      TEXT: 'Crear ordenes de produccion'
    },
    UPDATE: {
      VALUE: 'productionorders-edit',
      TEXT: 'Editar orden de produccion'
    },
    DELETE: {
      VALUE: 'productionorders-delete',
      TEXT: 'Borrar orden de produccion'
    }
  },
  PRODUCTS: {
    LIST: {
      VALUE: 'products-view',
      TEXT: 'Listar productos'
    },
    CREATE: {
      VALUE: 'products-create',
      TEXT: 'Crear productos'
    },
    UPDATE: {
      VALUE: 'products-edit',
      TEXT: 'Editar producto'
    },
    DELETE: {
      VALUE: 'products-delete',
      TEXT: 'Borrar producto'
    }
  },
  PROVIDERSTATIONS: {
    LIST: {
      VALUE: 'providerstations-view',
      TEXT: 'Listar estaciones de suministro'
    },
    CREATE: {
      VALUE: 'providerstations-create',
      TEXT: 'Crear estacion de suministro'
    },
    UPDATE: {
      VALUE: 'providerstations-edit',
      TEXT: 'Editar estacion de suministro'
    },
    DELETE: {
      VALUE: 'providerstations-delete',
      TEXT: 'Borrar estacion de suministro'
    }
  },
  WAREHOUSES: {
    LIST: {
      VALUE: 'warehouses-view',
      TEXT: 'Listar almacenes'
    },
    CREATE: {
      VALUE: 'warehouses-create',
      TEXT: 'Crear almacen'
    },
    UPDATE: {
      VALUE: 'warehouses-edit',
      TEXT: 'Editar almacen'
    },
    DELETE: {
      VALUE: 'warehouses-delete',
      TEXT: 'Borrar almacen'
    }
  },
  WORKSTATIONS: {
    LIST: {
      VALUE: 'workstations-view',
      TEXT: 'Listar estaciones de trabajo'
    },
    CREATE: {
      VALUE: 'workstations-create',
      TEXT: 'Crear estacion de trabajo'
    },
    UPDATE: {
      VALUE: 'workstations-edit',
      TEXT: 'Editar estacion de trabajo'
    },
    DELETE: {
      VALUE: 'workstations-delete',
      TEXT: 'Borrar estacion de trabajo'
    }
  },
  PROVIDERS: {
    LIST: {
      VALUE: 'providers-view',
      TEXT: 'Listar proveedores'
    },
    CREATE: {
      VALUE: 'providers-create',
      TEXT: 'Crear proveedore'
    },
    UPDATE: {
      VALUE: 'providers-edit',
      TEXT: 'Editar proveedore'
    },
    DELETE: {
      VALUE: 'providers-delete',
      TEXT: 'Borrar proveedore'
    }
  }
};
const permissionsArray = Object.keys(Permissions).reduce((accumulator, systemModuleName) => {
  const systemModuleObject = Permissions[systemModuleName];
  const modulePermissions = Object.keys(systemModuleObject).map(permission => systemModuleObject[permission]);
  return accumulator.concat(modulePermissions);
}, []);

/*
Devuelve esto:

[
  { VALUE: 'users-view', TEXT: 'Listar usuarios' },
  { VALUE: 'users-create', TEXT: 'Crear Usuario' },
  { VALUE: 'users-edit', TEXT: 'Editar Usuario' },
  { VALUE: 'users-delete', TEXT: 'Borrar Usuario' },
  { VALUE: 'users-admin', TEXT: 'Administrar  Usuarios' },
  { VALUE: 'users-super-admin', TEXT: 'Super usuario' }
]

 */
if (Meteor.settings.private && Meteor.settings.private.REFRESH_PERMISSIONS) {
  console.log(' Updating permissions...');
  const currentRoles = Roles.getAllRoles().fetch();

  for (let permission of permissionsArray) {
    let exists = currentRoles.find(_role => _role._id == permission.VALUE);

    if (!exists) {
      Roles.createRole(permission.VALUE);
    } else {
      Meteor.roles.update(permission.VALUE, {
        $set: {
          publicName: permission.TEXT
        }
      });
    }
  }
} else {
  console.log('Not Updating permissions...');
}

module.exportDefault(Permissions);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/startup/server/index.js                                                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.link("./Permissions");
module.link("./services/MailServ");
module.link("../../api/Users/UsersCtrl");
module.link("../../api/Users/User");
module.link("../../api/Users/UsersPubs");
module.link("../../api/Profiles/ProfileSeeder");
module.link("../../api/Profiles/ProfileCtl");
module.link("../../api/Profiles/ProfilesServ");
module.link("../../api/Profiles/ProfilesPubs");
module.link("../../api/Permissions/PermissionCtl");
module.link("../../api/Permissions/PermissionPubs");
module.link("../../api/SystemOptions/SystemOptionsCtl");
module.link("../server/services/FirebaseAdmin");
module.link("../../api/Messages/Message");
module.link("../../api/Messages/MessagesCtl");
module.link("../../api/Messages/MessagePubs");
module.link("../../api/Messages/MessageSeeder");
module.link("../../api/Companies/Company");
module.link("../../api/Companies/CompanyCtl");
module.link("../../api/Companies/CompanyPubs");
module.link("../../api/Companies/CompanyServ");
module.link("../../api/Workstations/WorkStation");
module.link("../../api/Workstations/WorkStationCtl");
module.link("../../api/Workstations/WorkStationPubs");
module.link("../../api/Workstations/WorkStationServ");
module.link("../../api/ProductionLines/ProductionLine");
module.link("../../api/ProductionLines/ProductionLineCtl");
module.link("../../api/ProductionLines/ProductionLinesPubs");
module.link("../../api/ProductionLines/ProductionLinesServ");
module.link("../../api/ProductionLines/ProductionLineSeeder");
module.link("../../api/Warehouses/Warehouse");
module.link("../../api/Warehouses/WarehouseCtl");
module.link("../../api/Warehouses/WarehousePubs");
module.link("../../api/Warehouses/WarehouseSeeder");
module.link("../../api/Warehouses/WarehouseServ");
module.link("../../api/Providers/Provider");
module.link("../../api/Providers/ProviderCtl");
module.link("../../api/Providers/ProviderPubs");
module.link("../../api/Providers/ProviderSeeder");
module.link("../../api/Providers/ProviderServ");
module.link("../../api/Products/Product");
module.link("../../api/Products/ProductCtl");
module.link("../../api/Products/ProductPubs");
module.link("../../api/Products/ProductSeeder");
module.link("../../api/Products/ProductServ");
let ValidatedMethod;
module.link("meteor/mdg:validated-method", {
  ValidatedMethod(v) {
    ValidatedMethod = v;
  }

}, 0);
let check;
module.link("meteor/check", {
  check(v) {
    check = v;
  }

}, 1);
Meteor.methods({
  testmethod() {
    console.log('Hola mundo');
    return 'Este es un end point';
  },

  suma(a, b) {
    return {
      result: a + b
    };
  },

  connectionData() {
    console.log(this);

    if (userId) {
      console.log('Ususario logeado');
    } else {
      console.log('Usuario no esta logeado');
    }
    /*
    Datos del contexto
         I20210219-17:16:23.677(-6)?   isSimulation: false,
        I20210219-17:16:23.677(-6)?   _unblock: [Function],
        I20210219-17:16:23.677(-6)?   _calledUnblock: false,
        I20210219-17:16:23.678(-6)?   userId: null,
        I20210219-17:16:23.678(-6)?   _setUserId: [Function: setUserId],
        I20210219-17:16:23.678(-6)?   connection: null,
        I20210219-17:16:23.678(-6)?   randomSeed: null,
        I20210219-17:16:23.678(-6)?   randomStream: null
        I20210219-17:16:23.678(-6)? }
      */

  },

  delayFunction() {
    return Promise.asyncApply(() => {
      let delayMessage = 'Antes';
      Promise.await(new Promise(resolve => {
        setTimeout(() => {
          delayMessage = "Despues";
          resolve(1);
        }, 2000);
      }));
      return delayMessage;
    });
  }

});
new ValidatedMethod({
  name: 'multiplicacion',

  validate(_ref) {
    let {
      a,
      b
    } = _ref;
    check(a, Number);
    check(b, Number);
  },

  run(_ref2) {
    let {
      a,
      b
    } = _ref2;
    return {
      result: a * b
    };
  }

});
new ValidatedMethod({
  name: 'multiplication',
  validate: null,

  run(_ref3) {
    let {
      a,
      b
    } = _ref3;
    // se ej
    return {
      result: a * b
    };
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"both":{"index.js":function module(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/startup/both/index.js                                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Accounts.config({
  loginExpirationInDays: 1 // Numero de dias para expirar el token

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"api":{"Companies":{"Company.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Companies/Company.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  Company: () => Company
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const Company = new Mongo.Collection('companies');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"CompanyCtl.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Companies/CompanyCtl.js                                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let ValidatedMethod;
module.link("meteor/mdg:validated-method", {
  ValidatedMethod(v) {
    ValidatedMethod = v;
  }

}, 0);
let ResponseMessage;
module.link("../../startup/server/utilities/ResponseMesssage", {
  ResponseMessage(v) {
    ResponseMessage = v;
  }

}, 1);
let AuthGuard;
module.link("../../middlewares/AuthGuard", {
  default(v) {
    AuthGuard = v;
  }

}, 2);
let Permissions;
module.link("../../startup/server/Permissions", {
  default(v) {
    Permissions = v;
  }

}, 3);
let Company;
module.link("./Company", {
  Company(v) {
    Company = v;
  }

}, 4);
let CompanyServ;
module.link("./CompanyServ", {
  default(v) {
    CompanyServ = v;
  }

}, 5);
let check, Match;
module.link("meteor/check", {
  check(v) {
    check = v;
  },

  Match(v) {
    Match = v;
  }

}, 6);
new ValidatedMethod({
  name: 'company.save',
  mixins: [MethodHooks],
  permissions: [Permissions.COMPANIES.CREATE.VALUE, Permissions.COMPANIES.UPDATE.VALUE],
  beforeHooks: [AuthGuard.checkPermission],

  validate(company) {
    try {
      console.log("Obj Empresa", company);
      check(company, {
        _id: Match.OneOf(String, null),
        name: String,
        name_full: String,
        companyBussinessId: String,
        address: String,
        phones: String,
        web: String,
        email: String,
        isAvailable: Boolean
      });
    } catch (exception) {
      console.error('company.save', exception);
      throw new Meteor.Error('403', 'La informacion introducida no es valida');
    } // Validar que no haya compañias con el mismo nombre y BussinesID


    CompanyServ.validateCompanyBussinessId(company.companyBussinessId, company._id);
    CompanyServ.validateCompanyName(company.name, company._id);
  },

  run(company) {
    const responseMessage = new ResponseMessage();

    try {
      if (company._id !== null) {
        Company.update(company._id, {
          $set: {
            name: company.name,
            name_full: company.name_full,
            companyBussinessId: company.companyBussinessId,
            address: company.address,
            phones: company.phones,
            web: company.web,
            email: company.email,
            isAvailable: company.isAvailable
          }
        });
        responseMessage.create('Se actualizó la empresa exitosamente');
      } else {
        Company.insert({
          name: company.name,
          name_full: company.name_full,
          companyBussinessId: company.companyBussinessId,
          address: company.address,
          phones: company.phones,
          web: company.web,
          email: company.email,
          isAvailable: company.isAvailable
        });
        responseMessage.create('Se insertó la empresa exitosamente');
      }
    } catch (exception) {
      console.error('company.save', exception);
      throw new Meteor.Error('500', 'Ha ocurrido un error al guardar la empresa');
    }

    return responseMessage;
  }

});
new ValidatedMethod({
  name: 'company.delete',
  mixins: [MethodHooks],
  permissions: [Permissions.COMPANIES.DELETE.VALUE],
  beforeHooks: [AuthGuard.checkPermission],
  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
  afterHooks: [],

  validate(_ref) {
    let {
      idCompany
    } = _ref;

    try {
      check(idCompany, String);
    } catch (exception) {
      console.error('company.delete', exception);
      throw new Meteor.Error('403', 'Ocurrio un error al eliminar la compañia');
    } // validar que no sea posible eliminar una empresa si hay un usuario utilizandolo.


    const userWithCompany = CompanyServ.getUsersBycompany(idCompany);

    if (userWithCompany.length > 0) {
      throw new Meteor.Error('403', 'No es posible elimiar la empresa', 'Hay al menos un usuario utilizando la empresa');
    }
  },

  run(_ref2) {
    let {
      idCompany
    } = _ref2;
    const responseMessage = new ResponseMessage();

    try {
      Company.remove(idCompany);
      responseMessage.create('Compañia eliminada exitosamente');
    } catch (exception) {
      console.error('profile.delete', exception);
      throw new Meteor.Error('500', 'Ocurrio un error al eliminar la empresa');
    }

    return responseMessage;
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"CompanyPubs.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Companies/CompanyPubs.js                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Company;
module.link("./Company", {
  Company(v) {
    Company = v;
  }

}, 0);
let PermissionMiddleware;
module.link("../../middlewares/PermissionMiddleware", {
  PermissionMiddleware(v) {
    PermissionMiddleware = v;
  }

}, 1);
let Permissions;
module.link("../../startup/server/Permissions", {
  default(v) {
    Permissions = v;
  }

}, 2);
const companyPublication = new PublishEndpoint('company.list', function (param1) {
  return Company.find({}, {
    sort: {
      createdAt: -1
    }
  });
});
companyPublication.use(new PermissionMiddleware(Permissions.COMPANIES.LIST.VALUE));
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"CompanyServ.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Companies/CompanyServ.js                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let Company;
module.link("./Company", {
  Company(v) {
    Company = v;
  }

}, 1);
module.exportDefault({
  validateCompanyBussinessId(newCompanyBussinesId, idCompany) {
    const existsCompany = Company.findOne({
      companyBussinessId: newCompanyBussinesId
    });

    if (idCompany !== null) {
      // actualizacion de Compañia
      const oldCompany = Company.findOne(idCompany);

      if (oldCompany.companyBussinessId !== newCompanyBussinesId && existsCompany) {
        throw new Meteor.Error('403', 'El nuevo RFC de empresa ya esta siendo usado');
      }
    } else if (existsCompany) {
      // es compañia nuevo pero el CompanyBussinesId  ya existe.
      throw new Meteor.Error('403', 'El nuevo RFC de empresa  ya esta siendo utilizado');
    }
  },

  validateCompanyName(newCompanyName, idCompany) {
    const existsCompany = Company.findOne({
      name: newCompanyName
    });

    if (idCompany !== null) {
      // actualizacion de Compañia
      const oldCompany = Company.findOne(idCompany);

      if (oldCompany.name !== newCompanyName && existsCompany) {
        throw new Meteor.Error('403', 'El nuevo nombre de empresa ya esta siendo usado');
      }
    } else if (existsCompany) {
      // es compañia nuevo pero el CompanyBussinesId  ya existe.
      throw new Meteor.Error('403', 'El nuevo nombre de empresa  ya esta siendo utilizado');
    }
  },

  getUsersBycompany(idCompany) {
    const company = Company.findOne(idCompany);
    return Meteor.users.find({
      'companyName': company.name
    }).fetch();
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Messages":{"Message.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Messages/Message.js                                                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  Message: () => Message
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const Message = new Mongo.Collection('messages');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"MessagePubs.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Messages/MessagePubs.js                                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Message;
module.link("./Message", {
  Message(v) {
    Message = v;
  }

}, 0);
let PermissionMiddleware;
module.link("../../middlewares/PermissionMiddleware", {
  PermissionMiddleware(v) {
    PermissionMiddleware = v;
  }

}, 1);
let Permissions;
module.link("../../startup/server/Permissions", {
  default(v) {
    Permissions = v;
  }

}, 2);
const messagesPublication = new PublishEndpoint('message.list', function () {
  let idContact = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  const idUserLogged = this.userId;
  return Message.find({
    $or: [{
      idSender: idUserLogged,
      idReceiver: idContact
    }, {
      idSender: idContact,
      idReceiver: idUserLogged
    }]
  }, {
    limit: 20,
    sort: {
      date: -1
    }
  });
});
messagesPublication.use(new PermissionMiddleware(Permissions.CHAT.LIST.VALUE));
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"MessageSeeder.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Messages/MessageSeeder.js                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Message;
module.link("./Message", {
  Message(v) {
    Message = v;
  }

}, 0);
Message.rawCollection().createIndex({
  idSender: 1
});
Message.rawCollection().createIndex({
  idReceiver: 1
});
Message.rawCollection().createIndex({
  date: 1
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"MessagesCtl.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Messages/MessagesCtl.js                                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let ValidatedMethod;
module.link("meteor/mdg:validated-method", {
  ValidatedMethod(v) {
    ValidatedMethod = v;
  }

}, 0);
let check;
module.link("meteor/check", {
  check(v) {
    check = v;
  }

}, 1);
let ResponseMessage;
module.link("../../startup/server/utilities/ResponseMesssage", {
  ResponseMessage(v) {
    ResponseMessage = v;
  }

}, 2);
let AuthGuard;
module.link("../../middlewares/AuthGuard", {
  default(v) {
    AuthGuard = v;
  }

}, 3);
let Permissions;
module.link("../../startup/server/Permissions", {
  default(v) {
    Permissions = v;
  }

}, 4);
let Message;
module.link("./Message", {
  Message(v) {
    Message = v;
  }

}, 5);
new ValidatedMethod({
  name: 'message.save',
  mixins: [MethodHooks],
  permissions: [Permissions.CHAT.CREATE.VALUE],
  beforeHooks: [AuthGuard.checkPermission],

  validate(message) {
    try {
      check(message, {
        idSender: String,
        idReceiver: String,
        text: String,
        date: String,
        read: Boolean
      });
    } catch (exception) {
      console.error('message.save', exception);
      throw new Meteor.Error('403', 'La informacion introducida no es valida');
    }
  },

  run(message) {
    const responseMessage = new ResponseMessage();

    try {
      Message.insert(message);
      responseMessage.create('Se insertó el mensaje exitosamente');
    } catch (exception) {
      console.error('message.save', exception);
      throw new Meteor.Error('500', 'Ha ocurrido un error al guardar el mensaje');
    }

    return responseMessage;
  }

});
new ValidatedMethod({
  name: 'messages.read',
  mixins: [MethodHooks],
  beforeHooks: [AuthGuard.isUserLogged],

  validate(messages) {
    try {
      check(messages, [{
        _id: String,
        idSender: String,
        idReceiver: String,
        text: String,
        date: String,
        read: Boolean
      }]);
    } catch (exception) {
      console.error('message.read', exception);
      throw new Meteor.Error('403', 'La informacion introducida no es valida');
    }
  },

  run(messages) {
    const responseMessage = new ResponseMessage();

    try {
      Message.update({
        _id: {
          $in: messages.map(m => m._id)
        }
      }, {
        $set: {
          read: true
        }
      }, {
        multi: true
      });
    } catch (exception) {
      console.error('message.read', exception);
      throw new Meteor.Error('500', 'Ha ocurrido un error al marcar los mensajes como leidos');
    }

    return responseMessage;
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Permissions":{"PermissionCtl.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Permissions/PermissionCtl.js                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let AuthGuard;
module.link("../../middlewares/AuthGuard", {
  default(v) {
    AuthGuard = v;
  }

}, 0);
let Permissions;
module.link("../../startup/server/Permissions", {
  default(v) {
    Permissions = v;
  }

}, 1);
let ResponseMessage;
module.link("../../startup/server/utilities/ResponseMesssage", {
  ResponseMessage(v) {
    ResponseMessage = v;
  }

}, 2);
let check, Match;
module.link("meteor/check", {
  check(v) {
    check = v;
  },

  Match(v) {
    Match = v;
  }

}, 3);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 4);
let Profile;
module.link("../Profiles/Profile", {
  Profile(v) {
    Profile = v;
  }

}, 5);
new ValidatedMethod({
  name: 'permissions.list',
  mixins: [MethodHooks],
  permissions: [Permissions.PERMISSIONS.LIST.VALUE],
  beforeHooks: [AuthGuard.checkPermission],
  validate: null,

  run() {
    const responseMessage = new ResponseMessage();

    try {
      const permissions = Meteor.roles.find().fetch();
      responseMessage.create('Permisos disponibles del sistema', null, permissions);
    } catch (ex) {
      console.log('permissions.list: ', ex);
      throw new Meteor.Error('500', 'Ocurrió un error al obtener la lista de permisos');
    }

    return responseMessage;
  }

});
new ValidatedMethod({
  name: 'permissions.listByIdProfile',
  mixins: [MethodHooks],
  permissions: [Permissions.PERMISSIONS.LIST.VALUE],
  beforeHooks: [AuthGuard.checkPermission],

  validate(_ref) {
    let {
      idProfile
    } = _ref;

    try {
      check('idProfile', String);
    } catch (exception) {
      console.error('user.remove', exception);
      throw new Meteor.Error('403', 'La informacion proporcionada no es correcta');
    }
  },

  run(idProfile) {
    const responseMessage = new ResponseMessage();

    try {
      let permissions = [];
      const profile = Profile.findOne({
        '_id': idProfile.idProfile
      });

      if (profile) {
        permissions = Meteor.roles.find({
          '_id': {
            $in: profile.permissions
          }
        }).fetch();
      }

      responseMessage.create('Permisos asociados al perfil', 'Permisos incluidos en el perfil', permissions);
    } catch (ex) {
      console.log('permissions.listByIdProfile: ', ex);
      throw new Meteor.Error('500', 'Ocurrió un error al obtener la lista de permisos asociados a un perfil');
    }

    return responseMessage;
  }

});
new ValidatedMethod({
  name: 'permissions.listOfOthers',
  mixins: [MethodHooks],
  permissions: [Permissions.PERMISSIONS.LIST.VALUE],
  beforeHooks: [AuthGuard.checkPermission],

  validate(_ref2) {
    let {
      idProfile
    } = _ref2;

    try {
      check('idProfile', String);
    } catch (exception) {
      console.error('permissions.listOfOthers', exception);
      throw new Meteor.Error('403', 'La informacion proporcionada no es correcta');
    }
  },

  run(idProfile) {
    const responseMessage = new ResponseMessage();

    try {
      let permissions = [];
      const profile = Profile.findOne({
        '_id': idProfile.idProfile
      });

      if (profile) {
        permissions = Meteor.roles.find({
          '_id': {
            $nin: profile.permissions
          }
        }).fetch();
      }

      responseMessage.create('Permisos NO asociados al perfil', 'Permisos NO incluidos en el perfil', permissions);
    } catch (ex) {
      console.log('permissions.listOfOthers: ', ex);
      throw new Meteor.Error('500', 'Ocurrió un error al obtener la lista de permisos NO asociados a un perfil');
    }

    return responseMessage;
  }

});
new ValidatedMethod({
  name: 'permissions.check',
  mixins: [MethodHooks],
  beforeHooks: [AuthGuard.isUserLogged],

  validate(permission) {
    try {
      check(permission, String);
    } catch (exception) {
      console.error('permissions.check', exception);
      throw new Meteor.Error('403', 'La información introducida no es valida.');
    }
  },

  run(permission) {
    const responseMessage = new ResponseMessage();

    try {
      const scope = Roles.getScopesForUser(this.userId)[0];
      const hasPermission = Roles.userIsInRole(this.userId, permission, scope);
      responseMessage.create(" El usuario {$hasPermission?'si','no'} el permiso", null, {
        hasPermission
      });
    } catch (exception) {
      console.error('permissions.check', exception);
      throw new Meteor.Error('500', ' Ha ocurrido un error al verificar el permiso ');
    }

    return responseMessage;
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"PermissionPubs.js":function module(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Permissions/PermissionPubs.js                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish('roles', function () {
  return Meteor.roleAssignment.find({
    'user._id': this.userId
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"ProductionLines":{"ProductionLine.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/ProductionLines/ProductionLine.js                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  ProductionLineRepository: () => ProductionLineRepository
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const ProductionLineRepository = new Mongo.Collection('productionlines');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ProductionLineCtl.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/ProductionLines/ProductionLineCtl.js                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let check, Match;
module.link("meteor/check", {
  check(v) {
    check = v;
  },

  Match(v) {
    Match = v;
  }

}, 0);
let ResponseMessage;
module.link("../../startup/server/utilities/ResponseMesssage", {
  ResponseMessage(v) {
    ResponseMessage = v;
  }

}, 1);
let Permissions;
module.link("../../startup/server/Permissions", {
  default(v) {
    Permissions = v;
  }

}, 2);
let AuthGuard;
module.link("../../middlewares/AuthGuard", {
  default(v) {
    AuthGuard = v;
  }

}, 3);
let ProductionLineRepository;
module.link("./ProductionLine", {
  ProductionLineRepository(v) {
    ProductionLineRepository = v;
  }

}, 4);
let ProductionLinesServ;
module.link("./ProductionLinesServ", {
  default(v) {
    ProductionLinesServ = v;
  }

}, 5);
let WorkstationRepository;
module.link("../Workstations/WorkStation", {
  WorkstationRepository(v) {
    WorkstationRepository = v;
  }

}, 6);
new ValidatedMethod({
  name: 'productionline.save',
  mixins: [MethodHooks],
  permissions: [Permissions.PRODUCTIONLINES.CREATE.VALUE, Permissions.PRODUCTIONLINES.UPDATE.VALUE],
  beforeHooks: [AuthGuard.checkPermission],
  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
  afterHooks: [],

  validate(productionline) {
    console.info('productionline', productionline);

    try {
      // Valida que la estructura del objeto user este conforme a la definicion.
      check(productionline, {
        _id: Match.OneOf(String, null),
        name: String,
        description: String,
        workstations: [{
          _id: Match.OneOf(String, null),
          name: String,
          name_full: String,
          location: String,
          productionline: {
            description: String,
            name: String,
            _id: String
          }
        }]
      });
    } catch (exception) {
      console.error('productionline.save', exception);
      throw new Meteor.Error('403', 'La informacion introducida no es válida.');
    }

    ProductionLinesServ.validateProductionLineName(productionline.name, productionline._id);
  },

  run(productionline) {
    console.log('productionline.save');
    const responseMessage = new ResponseMessage();

    if (productionline._id !== null) {
      try {
        ProductionLineRepository.update(productionline._id, {
          $set: {
            name: productionline.name,
            description: productionline.description,
            workstations: productionline.workstations
          }
        });
        console.log('Se ha actualizado la linea de produccion');
        responseMessage.create('Se ha actualizado la linea de produccion');
      } catch (exception) {
        console.error('productionline.save', exception);
        throw new Meteor.Error('500', 'Ocurrió un error al actualizar la linea de produccion');
      }
    } else {
      console.log('productionline: ', productionline);

      try {
        ProductionLineRepository.insert({
          name: productionline.name,
          description: productionline.description,
          workstations: productionline.workstations
        });
        console.log('Se ha guardado la linea de produccion');
        responseMessage.create('Se ha guardado la linea de produccion');
      } catch (exception) {
        console.error('productionline.save', exception);
        throw new Meteor.Error('500', 'Ocurrió un error al guardar la linea de produccion');
      }
    }

    return responseMessage;
  }

});
new ValidatedMethod({
  name: 'productionline.list',
  mixins: [MethodHooks],
  permissions: [Permissions.PRODUCTIONLINES.LIST.VALUE],
  beforeHooks: [AuthGuard.checkPermission],
  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
  afterHooks: [],

  validate() {},

  run() {
    console.log('productionline.list');
    const responseMessage = new ResponseMessage();

    try {
      const productionlines = ProductionLineRepository.find().fetch();
      responseMessage.create('Se ha obtenido la lista de lineas de produccion', null, productionlines);
    } catch (exception) {
      console.error('productionline.save', exception);
      throw new Meteor.Error('500', 'Ocurrió un error al obtener las linea de produccion');
    }

    return responseMessage;
  }

});
new ValidatedMethod({
  name: 'productionline.delete',
  mixins: [MethodHooks],
  permissions: [Permissions.PRODUCTIONLINES.DELETE.VALUE],
  beforeHooks: [AuthGuard.checkPermission],
  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
  afterHooks: [],

  validate(_ref) {
    let {
      idProductionline
    } = _ref;

    try {
      check(idProductionline, String);
    } catch (exception) {
      console.error('productionline.delete', exception);
      throw new Meteor.Error('403', 'Ocurrio un error al eliminar la linea de produccion');
    } // validar que no sea posible eliminar una linea de produccion si hay una orden de produccion ACTIVA utilizandolo.

  },

  run(_ref2) {
    let {
      idProductionline
    } = _ref2;
    const responseMessage = new ResponseMessage();

    try {
      ProductionLineRepository.remove(idProductionline);
      responseMessage.create('Linea de produccion eliminada exitosamente');
    } catch (exception) {
      console.error('profile.delete', exception);
      throw new Meteor.Error('500', 'Ocurrio un error al eliminar la linea de produccion');
    }

    return responseMessage;
  }

});
new ValidatedMethod({
  name: 'productionline.workstations.availables.to.include',
  mixins: [MethodHooks],
  permissions: [Permissions.PRODUCTIONLINES.LIST.VALUE],
  beforeHooks: [AuthGuard.checkPermission],

  validate(idProductionLine) {
    try {
      console.info('idProductionLine', idProductionLine);
      check('idProductionLine', String);
    } catch (exception) {
      console.error('productionline.workstations', exception);
      throw new Meteor.Error('403', 'La informacion proporcionada no es correcta');
    }
  },

  run(idProductionLine) {
    const responseMessage = new ResponseMessage();

    try {
      let workstationsAssigned = [];
      let workstationsIncluded = [];
      const productionline = ProductionLineRepository.findOne({
        '_id': idProductionLine
      });

      if (productionline) {
        workstationsAssigned = WorkstationRepository.find({
          'productionline._id': idProductionLine
        }).fetch();
        workstationsIncluded = WorkstationRepository.find({
          '_id': {
            $in: productionline.workstations.map(workstation => workstation._id)
          }
        }).fetch();
      }

      let workstationsAvailablesToInclude = [];
      var found = false;

      for (var i = 0; i < workstationsAssigned.length; i++) {
        for (var j = 0; j < workstationsIncluded.length; j++) {
          if (workstationsAssigned[i]._id == workstationsIncluded[j]._id) {
            found = true;
            break;
          }
        }

        if (!found) {
          workstationsAvailablesToInclude.push(workstationsAssigned[i]);
        }

        found = false;
      } // console.info('workstationsAssigned',workstationsAssigned);
      // console.info('workstationsIncluded',workstationsIncluded);
      //  console.info('workstationsAvailablesToInclude', workstationsAvailablesToInclude);
      // El tercer parametro equivaldra al objeto data en el response


      responseMessage.create('Estaciones de trabajo asociadas a la linea de produccion disponibles para incluir', 'Estaciones disponibles para incluir en la linea de prod', workstationsAvailablesToInclude);
    } catch (ex) {
      console.log('workstations.listByIdProductionLine: ', ex);
      throw new Meteor.Error('500', 'Ocurrió un error al obtener la lista de estaciones de trabajo asociadas a una linea de produccion disponibles para incluir');
    }

    return responseMessage;
  }

});
/*
* Aqui devolver las estaciones de trabajo que esten
* incluidas en la linea
*/

new ValidatedMethod({
  name: 'productionline.workstations.included',
  mixins: [MethodHooks],
  permissions: [Permissions.PRODUCTIONLINES.LIST.VALUE],
  beforeHooks: [AuthGuard.checkPermission],

  validate(idProductionLine) {},

  run(idProductionLine) {
    const responseMessage = new ResponseMessage();

    try {
      let workstationsIncluded = [];
      const productionline = ProductionLineRepository.findOne({
        '_id': idProductionLine
      });

      if (productionline) {
        //db.getCollection('workstations').find({'_id':{$in:['gMdEx5QjaGsxwekwY', 'P2CB6iverfv7E8eGp']}})
        workstationsIncluded = productionline.workstations; //workstationsIncluded= WorkstationRepository.find({'_id': {$in: productionline.workstations }  }).fetch();
      } // El tercer parametro equivaldra al objeto data en el response


      responseMessage.create('Estaciones de trabajo incluidas a la linea de produccion', 'Estaciones incluidas en la linea de prod', workstationsIncluded);
    } catch (ex) {
      console.log('productionline.workstations.included: ', ex);
      throw new Meteor.Error('500', 'Ocurrió un error al obtener la lista de estaciones de trabajo incluidas a una linea de produccion');
    }

    return responseMessage;
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ProductionLineSeeder.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/ProductionLines/ProductionLineSeeder.js                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let ProductionLineRepository;
module.link("./ProductionLine", {
  ProductionLineRepository(v) {
    ProductionLineRepository = v;
  }

}, 0);
ProductionLineRepository.rawCollection().createIndex({
  'name': 1
}, {
  unique: true
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ProductionLinesPubs.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/ProductionLines/ProductionLinesPubs.js                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let ProductionLineRepository;
module.link("./ProductionLine", {
  ProductionLineRepository(v) {
    ProductionLineRepository = v;
  }

}, 0);
let PermissionMiddleware;
module.link("../../middlewares/PermissionMiddleware", {
  PermissionMiddleware(v) {
    PermissionMiddleware = v;
  }

}, 1);
let Permissions;
module.link("../../startup/server/Permissions", {
  default(v) {
    Permissions = v;
  }

}, 2);
const productionLinesPublication = new PublishEndpoint('productionlines.list', function (param1) {
  //return ProductionLineRepository.find({},{ _id:1,name:1,description:1,
  return ProductionLineRepository.find({}, {
    sort: {
      createdAt: -1
    }
  });
});
productionLinesPublication.use(new PermissionMiddleware(Permissions.PRODUCTIONLINES.LIST.VALUE));
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ProductionLinesServ.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/ProductionLines/ProductionLinesServ.js                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let ProductionLineRepository;
module.link("./ProductionLine", {
  ProductionLineRepository(v) {
    ProductionLineRepository = v;
  }

}, 1);
module.exportDefault({
  validateProductionLineName(newProductionLine, idProductionLine) {
    const existsProductionLineName = ProductionLineRepository.find({
      name: newProductionLine
    }).fetch(); // recorrer la lista y comparar que uno diferente de mi tenga el mismo nombre

    existsProductionLineName.filter(productionline => {
      if (productionline.name == newProductionLine && productionline._id !== idProductionLine) {
        throw new Meteor.Error('403', 'El nombre de la nueva linea de produccion  ya esta siendo utilizado');
      }
    });
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Products":{"Product.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Products/Product.js                                                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  Product: () => Product
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const Product = new Mongo.Collection('products');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ProductCtl.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Products/ProductCtl.js                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let ValidatedMethod;
module.link("meteor/mdg:validated-method", {
  ValidatedMethod(v) {
    ValidatedMethod = v;
  }

}, 0);
let ResponseMessage;
module.link("../../startup/server/utilities/ResponseMesssage", {
  ResponseMessage(v) {
    ResponseMessage = v;
  }

}, 1);
let AuthGuard;
module.link("../../middlewares/AuthGuard", {
  default(v) {
    AuthGuard = v;
  }

}, 2);
let Permissions;
module.link("../../startup/server/Permissions", {
  default(v) {
    Permissions = v;
  }

}, 3);
let Product;
module.link("./Product", {
  Product(v) {
    Product = v;
  }

}, 4);
let ProductServ;
module.link("./ProductServ", {
  default(v) {
    ProductServ = v;
  }

}, 5);
let check, Match;
module.link("meteor/check", {
  check(v) {
    check = v;
  },

  Match(v) {
    Match = v;
  }

}, 6);
new ValidatedMethod({
  name: 'product.save',
  mixins: [MethodHooks],
  permissions: [Permissions.PRODUCTS.CREATE.VALUE, Permissions.PRODUCTS.UPDATE.VALUE],
  beforeHooks: [AuthGuard.checkPermission],

  validate(product) {
    try {
      console.info('product ', product);
      check(product, {
        _id: Match.OneOf(String, null),
        name: String,
        name_full: String,
        unit: {
          _id: String,
          name: String
        },
        stock: String,
        provider: {
          _id: String,
          name: String
        },
        location: String,
        sku: String,
        warehouse: {
          _id: String,
          name: String,
          name_full: String,
          location: String
        },
        production_line: {
          _id: String,
          description: String,
          name: String,
          workstations: [{
            _id: String,
            name: String,
            name_full: String,
            location: String,
            productionline: {
              description: String,
              name: String,
              _id: String
            }
          }]
        },
        bom: [{
          _id: Match.OneOf(String, null),
          name: Match.OneOf(String, null),
          quantity: Match.OneOf(String, null)
        }],
        isAvailable: Boolean
      });
    } catch (exception) {
      console.error('product.save', exception);
      throw new Meteor.Error('403', 'La informacion introducida no es valida');
    } // Validar que no haya producto con el mismo nombre


    ProductServ.validateProductName(product.name, product._id);
  },

  run(product) {
    const responseMessage = new ResponseMessage();

    try {
      if (product._id !== null) {
        // ToDO
        // agregar registro en kardex si se ha cambiado el valor de stock
        Product.update(product._id, {
          $set: {
            name: product.name,
            name_full: product.name_full,
            unit: product.unit,
            stock: product.stock,
            location: product.location,
            sku: product.sku,
            warehouse: product.warehouse,
            production_line: product.production_line,
            provider: product.provider,
            bom: product.bomList,
            isAvailable: product.isAvailable
          }
        });
        responseMessage.create('Se actualizó la empresa exitosamente');
      } else {
        Product.insert({
          name: product.name,
          name_full: product.name_full,
          unit: product.unit,
          stock: product.stock,
          location: product.location,
          sku: product.sku,
          warehouse: product.warehouse,
          production_line: product.production_line,
          provider: product.provider,
          bom: product.bomList,
          isAvailable: product.isAvailable
        });
        responseMessage.create('Se insertó el producto exitosamente');
      }
    } catch (exception) {
      console.error('product.save', exception);
      throw new Meteor.Error('500', 'Ha ocurrido un error al guardar el producto');
    }

    return responseMessage;
  }

});
new ValidatedMethod({
  name: 'product.delete',
  mixins: [MethodHooks],
  permissions: [Permissions.PRODUCTS.DELETE.VALUE],
  beforeHooks: [AuthGuard.checkPermission],
  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
  afterHooks: [],

  validate(_ref) {
    let {
      idProduct
    } = _ref;

    try {
      check(idProduct, String);
    } catch (exception) {
      console.error('product.delete', exception);
      throw new Meteor.Error('403', 'Ocurrio un error al eliminar el producto');
    } // validar que no sea posible eliminar un producto si hay un almacen utilizandolo.
    // ToDo


    const isUseredByWarehouse = 0; //CompanyServ.getUsersBycompany(idCompany);

    if (isUseredByWarehouse.length > 0) {
      throw new Meteor.Error('403', 'No es posible elimiar el producto', 'Hay al menos un almacen utilizando el producto');
    }
  },

  run(_ref2) {
    let {
      idProduct
    } = _ref2;
    const responseMessage = new ResponseMessage();

    try {
      Product.remove(idProduct);
      responseMessage.create('Producto eliminado exitosamente');
    } catch (exception) {
      console.error('product.delete', exception);
      throw new Meteor.Error('500', 'Ocurrio un error al eliminar el producto');
    }

    return responseMessage;
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ProductPubs.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Products/ProductPubs.js                                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Product;
module.link("./Product", {
  Product(v) {
    Product = v;
  }

}, 0);
let PermissionMiddleware;
module.link("../../middlewares/PermissionMiddleware", {
  PermissionMiddleware(v) {
    PermissionMiddleware = v;
  }

}, 1);
let Permissions;
module.link("../../startup/server/Permissions", {
  default(v) {
    Permissions = v;
  }

}, 2);
const productPublication = new PublishEndpoint('product.list', function (param1) {
  return Product.find({}, {
    isAvailable: 1,
    name: 1,
    name_full: 1,
    unit: 1,
    stock: 1,
    location: 1,
    sku: 1,
    warehouse: 1,
    production_line: 1
  });
});
productPublication.use(new PermissionMiddleware(Permissions.PRODUCTS.LIST.VALUE));
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ProductSeeder.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Products/ProductSeeder.js                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Product;
module.link("./Product", {
  Product(v) {
    Product = v;
  }

}, 0);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ProductServ.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Products/ProductServ.js                                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let Product;
module.link("./Product", {
  Product(v) {
    Product = v;
  }

}, 1);
module.exportDefault({
  validateProductName(newProductName, idProduct) {
    const existsProduct = Product.findOne({
      name: newProductName
    });

    if (idProduct !== null) {
      // actualizacion de producto
      const oldProduct = Product.findOne(idProduct);

      if (oldProduct.name !== newProductName && existsProduct) {
        throw new Meteor.Error('403', 'El nuevo nombre de producto ya esta siendo usado');
      }
    } else if (existsProduct) {
      // es producto nuevo pero el nombre  ya existe.
      throw new Meteor.Error('403', 'El nuevo nombre del producto  ya esta siendo utilizado');
    }
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Profiles":{"Profile.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Profiles/Profile.js                                                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  Profile: () => Profile
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const Profile = new Mongo.Collection('profiles');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ProfileCtl.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Profiles/ProfileCtl.js                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let check, Match;
module.link("meteor/check", {
  check(v) {
    check = v;
  },

  Match(v) {
    Match = v;
  }

}, 0);
let Profile;
module.link("./Profile", {
  Profile(v) {
    Profile = v;
  }

}, 1);
let ResponseMessage;
module.link("../../startup/server/utilities/ResponseMesssage", {
  ResponseMessage(v) {
    ResponseMessage = v;
  }

}, 2);
let ProfileServ;
module.link("./ProfilesServ", {
  default(v) {
    ProfileServ = v;
  }

}, 3);
let Permissions;
module.link("../../startup/server/Permissions", {
  default(v) {
    Permissions = v;
  }

}, 4);
let AuthGuard;
module.link("../../middlewares/AuthGuard", {
  default(v) {
    AuthGuard = v;
  }

}, 5);
new ValidatedMethod({
  name: 'profile.save',
  mixins: [MethodHooks],
  permissions: [Permissions.PROFILES.CREATE.VALUE, Permissions.PROFILES.UPDATE.VALUE],
  beforeHooks: [AuthGuard.checkPermission],
  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
  afterHooks: [],

  validate(profile) {
    try {
      // Valida que la estructura del objeto user este conforme a la definicion.
      check(profile, {
        _id: Match.OneOf(String, null),
        name: String,
        description: String,
        permissions: [String]
      });
    } catch (exception) {
      console.error('profile.save', exception);
      throw new Meteor.Error('403', 'La informacion introducida no es válida.');
    }

    ProfileServ.validateProfileName(profile.name, profile._id);
  },

  run(profile) {
    console.log('profile.save');
    const responseMessage = new ResponseMessage();

    if (profile._id !== null) {
      try {
        const oldProfile = Profile.findOne(profile._id);
        const users = ProfileServ.getUsersByprofile(profile._id);
        Profile.update(profile._id, {
          $set: {
            name: profile.name,
            description: profile.description,
            permissions: profile.permissions
          }
        }); // Aqui debemos actualizar a los usuarios con el perfil anterior por el nuevo

        if (oldProfile.name !== profile.name) {
          Meteor.users.update({
            'profile.profile': oldProfile.name
          }, {
            $set: {
              'profile.profile': profile.name
            }
          }, {
            multi: true
          });
        } // Actualizamos los permisos para el nuevo rol a todos los usuarios en la tabla de relacion
        // role-assignment


        ProfileServ.updateProfileUsers(users, profile);
        console.log('Se ha actualizado el perfil');
        responseMessage.create('Se ha actualizado el perfil');
      } catch (exception) {
        console.error('profile.save', exception);
        throw new Meteor.Error('500', 'Ocurrió un error al actualizar el perfil');
      }
    } else {
      console.log('perfil: ', profile);

      try {
        Profile.insert({
          name: profile.name,
          description: profile.description,
          permissions: profile.permissions
        });
        console.log('Se ha guardado el perfil');
        responseMessage.create('Se ha guardado el perfil');
      } catch (exception) {
        console.error('profile.save', exception);
        throw new Meteor.Error('500', 'Ocurrió un error al guardar el perfil');
      }
    }

    return responseMessage;
  }

});
new ValidatedMethod({
  name: 'profile.delete',
  mixins: [MethodHooks],
  permissions: [Permissions.PROFILES.DELETE.VALUE],
  beforeHooks: [AuthGuard.checkPermission],
  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
  afterHooks: [],

  validate(_ref) {
    let {
      idProfile
    } = _ref;

    try {
      check(idProfile, String);
    } catch (exception) {
      console.error('profile.delete', exception);
      throw new Meteor.Error('403', 'Ocurrio un error al eliminar el perfil');
    } // validar que no sea posible eliminar un perfil si hay un usuario utilizandolo.


    const userWithProfile = ProfileServ.getUsersByprofile(idProfile);
    console.log('idProfile', idProfile);
    console.log('userWithProfile', userWithProfile);

    if (userWithProfile.length > 0) {
      throw new Meteor.Error('403', 'No es posible elimiar el perfil', 'Hay al menos un usuario utilizando el perfil');
    }
  },

  run(_ref2) {
    let {
      idProfile
    } = _ref2;
    const responseMessage = new ResponseMessage();

    try {
      Profile.remove(idProfile);
      responseMessage.create('Perfil eliminado exitosamente');
    } catch (exception) {
      console.error('profile.delete', exception);
      throw new Meteor.Error('500', 'Ocurrio un error al eliminar el perfil');
    }

    return responseMessage;
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ProfileSeeder.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Profiles/ProfileSeeder.js                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  StaticProfiles: () => StaticProfiles
});
let Permissions, permissionsArray;
module.link("../../startup/server/Permissions", {
  default(v) {
    Permissions = v;
  },

  permissionsArray(v) {
    permissionsArray = v;
  }

}, 0);
let Profile;
module.link("./Profile", {
  Profile(v) {
    Profile = v;
  }

}, 1);
Profile.rawCollection().createIndex({
  'name': 1
}, {
  unique: true
});
const StaticProfiles = {
  admin: {
    name: 'admin',
    description: 'Administrador',
    permissions: permissionsArray.map(p => p.VALUE)
  }
};

if (Meteor.isDevelopment) {
  if (Meteor.settings.private && Meteor.settings.private.REFRESH_STATIC_PROFILES) {
    console.log('Updating static profiles');
    Object.keys(StaticProfiles).forEach(staticprofileName => {
      Profile.upsert({
        name: StaticProfiles[staticprofileName].name
      }, {
        $set: {
          description: StaticProfiles[staticprofileName].description,
          permissions: StaticProfiles[staticprofileName].permissions
        }
      });
      Meteor.users.find({
        'profile.profile': StaticProfiles[staticprofileName].name
      }).fetch().forEach(user => {
        // Meteor.roleAssignments.remove({'user._id':user._id});
        //RoleAssignment.remove({'user._id':user._id});
        if (StaticProfiles[staticprofileName].permissions.length > 0) {
          Roles.setUserRoles(user._id, StaticProfiles[staticprofileName].permissions, StaticProfiles[staticprofileName].name);
        }
      });
    });
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ProfilesPubs.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Profiles/ProfilesPubs.js                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Profile;
module.link("./Profile", {
  Profile(v) {
    Profile = v;
  }

}, 0);
let ProfilesServ;
module.link("./ProfilesServ", {
  default(v) {
    ProfilesServ = v;
  }

}, 1);
let PermissionMiddleware;
module.link("../../middlewares/PermissionMiddleware", {
  PermissionMiddleware(v) {
    PermissionMiddleware = v;
  }

}, 2);
let Permissions;
module.link("../../startup/server/Permissions", {
  default(v) {
    Permissions = v;
  }

}, 3);
const notStaticProfilePublication = new PublishEndpoint('notStaticProfile.list', function (param1) {
  return Profile.find({
    name: {
      $nin: ProfilesServ.getStaticprofilesName()
    }
  });
});
const profilePublication = new PublishEndpoint('profile.listAll', function (param1) {
  return Profile.find();
});
notStaticProfilePublication.use(new PermissionMiddleware(Permissions.PROFILES.LIST.VALUE));
profilePublication.use(new PermissionMiddleware(Permissions.PROFILES.LIST.VALUE));
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ProfilesServ.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Profiles/ProfilesServ.js                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Profile;
module.link("./Profile", {
  Profile(v) {
    Profile = v;
  }

}, 0);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 1);
let StaticProfiles;
module.link("./ProfileSeeder", {
  StaticProfiles(v) {
    StaticProfiles = v;
  }

}, 2);
module.exportDefault({
  getUsersByprofile(idPrtofile) {
    const profile = Profile.findOne(idPrtofile);
    return Meteor.users.find({
      'profile.profile': profile.name
    }).fetch();
  },

  setUsersRoles(idUser, profileName) {
    const permissions = Profile.findOne({
      'name': profileName
    }).permissions;
    Meteor.roleAssignment.remove({
      'user._id': idUser
    });
    Roles.setUserRoles(idUser, permissions, profileName);
  },

  updateProfileUsers(users, profile) {
    users.forEach(user => {
      this.setUsersRoles(user._id, profile.name);
    });
  },

  validateProfileName(newProfileName, idProfile) {
    const query = {
      name: newProfileName
    };
    const existsProfileName = Profile.findOne(query);

    if (idProfile) {
      // actualizacion de usuario//
      const oldProfile = Profile.findOne(idProfile);

      if (oldProfile.name !== newProfileName && existsProfileName) {
        throw new Meteor.Error('403', 'El nombre del Perfil  ya esta siendo utilizado');
      }
    } else if (existsProfileName) {
      // El nombre de NUEVO profile ya existe
      throw new Meteor.Error('403', 'El nombre del Perfil  ya esta siendo utilizado');
    }
  },

  getStaticprofilesName() {
    return Object.keys(StaticProfiles).map(staticprofileName => {
      return StaticProfiles[staticprofileName].name;
    });
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Providers":{"Provider.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Providers/Provider.js                                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  Provider: () => Provider
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const Provider = new Mongo.Collection('providers');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ProviderCtl.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Providers/ProviderCtl.js                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let ValidatedMethod;
module.link("meteor/mdg:validated-method", {
  ValidatedMethod(v) {
    ValidatedMethod = v;
  }

}, 0);
let ResponseMessage;
module.link("../../startup/server/utilities/ResponseMesssage", {
  ResponseMessage(v) {
    ResponseMessage = v;
  }

}, 1);
let AuthGuard;
module.link("../../middlewares/AuthGuard", {
  default(v) {
    AuthGuard = v;
  }

}, 2);
let Permissions;
module.link("../../startup/server/Permissions", {
  default(v) {
    Permissions = v;
  }

}, 3);
let Provider;
module.link("./Provider", {
  Provider(v) {
    Provider = v;
  }

}, 4);
let ProviderServ;
module.link("./ProviderServ", {
  default(v) {
    ProviderServ = v;
  }

}, 5);
let check, Match;
module.link("meteor/check", {
  check(v) {
    check = v;
  },

  Match(v) {
    Match = v;
  }

}, 6);
new ValidatedMethod({
  name: 'provider.save',
  mixins: [MethodHooks],
  permissions: [Permissions.PROVIDERS.CREATE.VALUE, Permissions.PROVIDERS.UPDATE.VALUE],
  beforeHooks: [AuthGuard.checkPermission],

  validate(provider) {
    try {
      check(provider, {
        _id: Match.OneOf(String, null),
        name: String,
        name_full: String,
        providerBussinessId: String,
        address: String,
        phones: String,
        web: String,
        email: String,
        isAvailable: Boolean
      });
    } catch (exception) {
      console.error('provider.save', exception);
      throw new Meteor.Error('403', 'La informacion introducida no es valida');
    } // Validar que no haya proveedores con el mismo nombre y BussinesID


    ProviderServ.validateProviderBussinessId(provider.providerBussinessId, provider._id);
    ProviderServ.validateProviderName(provider.name, provider._id);
  },

  run(provider) {
    const responseMessage = new ResponseMessage();

    try {
      if (provider._id !== null) {
        Provider.update(provider._id, {
          $set: {
            name: provider.name,
            name_full: provider.name_full,
            providerBussinessId: provider.providerBussinessId,
            address: provider.address,
            phones: provider.phones,
            web: provider.web,
            email: provider.email,
            isAvailable: provider.isAvailable
          }
        });
        responseMessage.create('Se actualizó el proveedor exitosamente');
      } else {
        Provider.insert({
          name: provider.name,
          name_full: provider.name_full,
          providerBussinessId: provider.providerBussinessId,
          address: provider.address,
          phones: provider.phones,
          web: provider.web,
          email: provider.email,
          isAvailable: provider.isAvailable
        });
        responseMessage.create('Se insertó el proveedor exitosamente');
      }
    } catch (exception) {
      console.error('company.save', exception);
      throw new Meteor.Error('500', 'Ha ocurrido un error al guardar el proveedor');
    }

    return responseMessage;
  }

});
new ValidatedMethod({
  name: 'provider.delete',
  mixins: [MethodHooks],
  permissions: [Permissions.PROVIDERS.DELETE.VALUE],
  beforeHooks: [AuthGuard.checkPermission],
  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
  afterHooks: [],

  validate(_ref) {
    let {
      idProvider
    } = _ref;

    try {
      check(idProvider, String);
    } catch (exception) {
      console.error('provider.delete', exception);
      throw new Meteor.Error('403', 'Ocurrio un error al eliminar al proveedor');
    } // validar que no sea posible eliminar un proveedor si hay un producto utilizandolo.
    // ToDo 


    const toUseInToProduct = 0; //CompanyServ.getUsersBycompany(idCompany);

    if (toUseInToProduct.length > 0) {
      throw new Meteor.Error('403', 'No es posible elimiar al proveedor', 'Hay al menos un producto utilizando al proveedor');
    }
  },

  run(_ref2) {
    let {
      idProvider
    } = _ref2;
    const responseMessage = new ResponseMessage();

    try {
      Provider.remove(idProvider);
      responseMessage.create('Proveedor eliminado exitosamente');
    } catch (exception) {
      console.error('provider.delete', exception);
      throw new Meteor.Error('500', 'Ocurrio un error al eliminar al proveedor');
    }

    return responseMessage;
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ProviderPubs.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Providers/ProviderPubs.js                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Provider;
module.link("./Provider", {
  Provider(v) {
    Provider = v;
  }

}, 0);
let PermissionMiddleware;
module.link("../../middlewares/PermissionMiddleware", {
  PermissionMiddleware(v) {
    PermissionMiddleware = v;
  }

}, 1);
let Permissions;
module.link("../../startup/server/Permissions", {
  default(v) {
    Permissions = v;
  }

}, 2);
const providerPublication = new PublishEndpoint('provider.list', function (param1) {
  return Provider.find({}, {});
});
providerPublication.use(new PermissionMiddleware(Permissions.PROVIDERS.LIST.VALUE));
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ProviderSeeder.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Providers/ProviderSeeder.js                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Provider;
module.link("./Provider", {
  Provider(v) {
    Provider = v;
  }

}, 0);
Provider.rawCollection().createIndex({
  "providerBussinessId": 1
}, {
  unique: true
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ProviderServ.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Providers/ProviderServ.js                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let Provider;
module.link("./Provider", {
  Provider(v) {
    Provider = v;
  }

}, 1);
module.exportDefault({
  validateProviderBussinessId(newProviderBussinesId, idProvider) {
    const existsProvider = Provider.findOne({
      providerBussinessId: newProviderBussinesId
    });

    if (idProvider !== null) {
      // actualizacion de Proveedor
      const oldProvider = Provider.findOne(idProvider);

      if (oldProvider.providerBussinessId !== newProviderBussinesId && existsProvider) {
        throw new Meteor.Error('403', 'El nuevo RFC del proveedor ya esta siendo usado');
      }
    } else if (existsProvider) {
      // es compañia nuevo pero el ProviderBussinesId  ya existe.
      throw new Meteor.Error('403', 'El nuevo RFC del proveedor ya esta siendo utilizado');
    }
  },

  validateProviderName(newProviderName, idProvider) {
    const existsProvider = Provider.findOne({
      name: newProviderName
    });

    if (idProvider !== null) {
      // actualizacion de proveedor
      const oldProvider = Provider.findOne(idProvider);

      if (oldProvider.name !== newProviderName && existsProvider) {
        throw new Meteor.Error('403', 'El nuevo nombre del proveedor ya esta siendo usado');
      }
    } else if (existsProvider) {
      // es proveedor nuevo pero el name  ya existe.
      throw new Meteor.Error('403', 'El nuevo nombre del proveedor ya esta siendo utilizado');
    }
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"SystemOptions":{"SystemOptions.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/SystemOptions/SystemOptions.js                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Permissions;
module.link("../../startup/server/Permissions", {
  default(v) {
    Permissions = v;
  }

}, 0);
module.exportDefault([{
  title: 'Inicio',
  permission: null,
  routeName: 'home'
}, {
  title: 'Usuarios',
  permission: Permissions.USERS.LIST.VALUE,
  routeName: 'home.users'
}, {
  title: 'Perfiles',
  permission: Permissions.PROFILES.LIST.VALUE,
  routeName: 'home.profiles'
}, {
  title: 'Empresas',
  permission: Permissions.COMPANIES.LIST.VALUE,
  routeName: 'home.companies'
}, {
  title: 'Chat',
  permission: Permissions.CHAT.LIST.VALUE,
  routeName: 'home.chat'
}, {
  title: 'Lineas Produccion',
  permission: Permissions.PRODUCTIONLINES.LIST.VALUE,
  routeName: 'home.productionlines'
}, {
  title: 'Ordenes Produccion',
  permission: Permissions.PRODUCTIONORDERS.LIST.VALUE,
  routeName: 'home.productionorders'
}, {
  title: 'Productos',
  permission: Permissions.PRODUCTS.LIST.VALUE,
  routeName: 'home.products'
}, {
  title: 'Est Suministro',
  permission: Permissions.PROVIDERSTATIONS.LIST.VALUE,
  routeName: 'home.providerstation'
}, {
  title: 'Almacenes',
  permission: Permissions.WAREHOUSES.LIST.VALUE,
  routeName: 'home.warehouses'
}, {
  title: 'Proveedores',
  permission: Permissions.PROVIDERS.LIST.VALUE,
  routeName: 'home.providers'
}, {
  title: 'Estaciones Trabajo',
  permission: Permissions.WORKSTATIONS.LIST.VALUE,
  routeName: 'home.workstations'
}]);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"SystemOptionsCtl.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/SystemOptions/SystemOptionsCtl.js                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let SystemOptions;
module.link("./SystemOptions", {
  default(v) {
    SystemOptions = v;
  }

}, 0);
let AuthGuard;
module.link("../../middlewares/AuthGuard", {
  default(v) {
    AuthGuard = v;
  }

}, 1);
let ResponseMessage;
module.link("../../startup/server/utilities/ResponseMesssage", {
  ResponseMessage(v) {
    ResponseMessage = v;
  }

}, 2);
new ValidatedMethod({
  name: 'user.getSystemOptions',
  mixins: [MethodHooks],
  beforeHooks: [AuthGuard.isUserLogged],
  validate: null,

  run() {
    const responseMessage = new ResponseMessage();
    const userLogged = Meteor.user();
    const userRoles = Roles.getRolesForUser(userLogged._id, userLogged.profile.profile); //console.log('userRoles',userRoles);

    const optionOfUser = SystemOptions.reduce((accumulator, systemOption) => {
      if (!systemOption.permission || !!userRoles.find(role => role === systemOption.permission)) {
        accumulator.push(systemOption);
      }

      return accumulator;
    }, []); //console.log(optionOfUser);

    responseMessage.create('Opciones del sistema para el usuario', null, optionOfUser);
    return responseMessage;
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Users":{"User.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Users/User.js                                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let User;
module.link("meteor/socialize:user-model", {
  User(v) {
    User = v;
  }

}, 0);

const {
  default: SimpleSchema
} = require("simpl-schema");

Meteor.users.rawCollection().createIndex({
  'profile.profile': 1
});
const UserProfileSchema = new SimpleSchema({
  profile: {
    type: Object,
    optional: false,
    blackbox: true
  }
});
User.attachSchema(UserProfileSchema);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"UserPresenceConfig.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Users/UserPresenceConfig.js                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let User;
module.link("meteor/socialize:user-model", {
  User(v) {
    User = v;
  }

}, 1);
let UserPresence;
module.link("meteor/socialize:user-presence", {
  UserPresence(v) {
    UserPresence = v;
  }

}, 2);
let SimpleSchema;
module.link("simpl-schema", {
  default(v) {
    SimpleSchema = v;
  }

}, 3);
// Schema for the fields where we will store the status data
const StatusSchema = new SimpleSchema({
  status: Object,
  'status.online': {
    type: Boolean
  },
  'status.idle': {
    type: Boolean,
    optional: true
  },
  'status.lastLogin': {
    type: Object,
    optional: true,
    blackbox: true
  }
}); // Add the schema to the existing schema currently attached to the User model

User.attachSchema(StatusSchema); // If `sessionIds` is undefined this signifies we need a fresh start.
// When a full cleanup is necessary we will unset the status field to show all users as offline

UserPresence.onCleanup(function onCleanup(sessionIds) {
  if (!sessionIds) {
    Meteor.users.update({}, {
      $set: {
        'status.online': false
      }
    }, {
      $unset: {
        status: true
      }
    }, {
      multi: true
    });
  }
}); // When a user comes online we set their status to online and set the lastOnline field to the current time

UserPresence.onUserOnline(function onUserOnline(userId, connection) {
  Meteor.users.update(userId, {
    $set: {
      'status.online': true,
      'status.idle': false,
      'status.lastLogin': {
        date: new Date(),
        ipAddr: connection.clientAddress,
        userAgent: connection.httpHeaders['user-agent']
      }
    }
  });
}); // When a user goes idle we'll set their status to indicate this

UserPresence.onUserIdle(function onUserIdle(userId) {
  Meteor.users.update(userId, {
    $set: {
      'status.idle': true
    }
  });
}); // When a user goes offline we'll unset their status field to indicate offline status

UserPresence.onUserOffline(function onUserOffline(userId) {
  Meteor.users.update(userId, {
    $set: {
      'status.online': false
    },
    $unset: {
      'status.idle': true
    }
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"UsersCtrl.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Users/UsersCtrl.js                                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let ValidatedMethod;
module.link("meteor/mdg:validated-method", {
  ValidatedMethod(v) {
    ValidatedMethod = v;
  }

}, 0);
let check;
module.link("meteor/check", {
  check(v) {
    check = v;
  }

}, 1);
let ResponseMessage;
module.link("../../startup/server/utilities/ResponseMesssage", {
  ResponseMessage(v) {
    ResponseMessage = v;
  }

}, 2);
let UsersServ;
module.link("./UsersServ", {
  default(v) {
    UsersServ = v;
  }

}, 3);
let AuthGuard;
module.link("../../middlewares/AuthGuard", {
  default(v) {
    AuthGuard = v;
  }

}, 4);
let Permissions;
module.link("../../startup/server/Permissions", {
  default(v) {
    Permissions = v;
  }

}, 5);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 6);
module.link("./UserPresenceConfig");
// se inserta usuario mediante un listener para agregar el Schema
Accounts.onCreateUser((options, user) => {
  const customizedUser = Object.assign({
    status: {
      online: false
    }
  }, user);

  if (options.profile) {
    customizedUser.profile = options.profile;
  }

  return customizedUser;
}); // Aqui removemos los rgistros de tokens del objeto user en la BD

Accounts.validateLoginAttempt(loginAttempt => {
  //console.log('loginAttempt ' , loginAttempt);
  // console.log('allowed' , loginAttempt.allowed);
  // console.log('correo verificado' , loginAttempt.user.emails[0].verified);
  if (loginAttempt.allowed) {
    var _loginAttempt$user$se;

    if (!loginAttempt.user.emails[0].verified) {
      throw new Meteor.Error('403', 'El correo del usuario no ha sido verificado aún');
    }

    const loginTokensOfuser = ((_loginAttempt$user$se = loginAttempt.user.services.resume) === null || _loginAttempt$user$se === void 0 ? void 0 : _loginAttempt$user$se.loginTokens) || []; //console.log('loginTokensOfuser ', loginTokensOfuser)

    if (loginTokensOfuser.length > 1) {
      Meteor.users.update(loginAttempt.user._id, {
        $set: {
          'services.resume.loginTokens': [loginTokensOfuser.pop()]
        }
      });
    }

    return true;
  }
});
new ValidatedMethod({
  name: 'user.save',
  mixins: [MethodHooks],
  permissions: [Permissions.USERS.CREATE.VALUE, Permissions.USERS.UPDATE.VALUE],
  beforeHooks: [AuthGuard.checkPermission],
  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
  afterHooks: [],

  validate(_ref) {
    let {
      user
    } = _ref;

    try {
      // Valida que la estructura del objeto user este conforme a la definicion.
      console.log("Usuario ", user);
      check(user, {
        _id: Match.OneOf(String, null),
        username: String,
        emails: [{
          address: String,
          verified: Boolean
        }],
        profile: {
          profile: String,
          name: String,
          path: Match.OneOf(String, null)
        } //,
        //password:String

      });
    } catch (exception) {
      console.error('user.save', exception);
      throw new Meteor.Error('403', 'La informacion introducida no es válida.');
    } // Validar que no haya usuarios con el mismo correo y nombre de usuario en la BD.


    UsersServ.validateEmail(user.emails[0].address, user._id);
    UsersServ.validateUserName(user.username, user._id);
  },

  run(_ref2) {
    return Promise.asyncApply(() => {
      let {
        user,
        photoFileUser
      } = _ref2;
      //   async run(user) {
      console.log('user.save');
      console.log('Usuario logeado ', this.userId);
      const responseMessage = new ResponseMessage();

      if (user._id !== null) {
        console.log('Actualizando usuario a la BD');

        try {
          Promise.await(UsersServ.updateuser(user, photoFileUser));
        } catch (exception) {
          console.error('user.save', exception);
          throw new Meteor.Error('500', 'Ocurrió un error al actualizar los datos del usuario');
        }

        console.log('Se actualizaron los datos del usuario exitosamente');
        responseMessage.create('Se actualizaron los datos del usuario exitosamente');
      } else {
        console.log('Agregando usuario a la BD');

        try {
          Promise.await(UsersServ.createUser(user, photoFileUser)); //await UsersServ.createUser(user,null);

          console.log('Se ha guardado el usuario');
          responseMessage.create('Se ha guardado el usuario');
        } catch (exception) {
          console.error('user.save', exception);
          throw new Meteor.Error('500', 'Ocurrió un error al guardar el usuario');
        }
      }

      return responseMessage;
    });
  }

});
new ValidatedMethod({
  name: 'user.delete',
  mixins: [MethodHooks],
  permissions: [Permissions.USERS.DELETE.VALUE],
  beforeHooks: [AuthGuard.checkPermission],

  validate(_ref3) {
    let {
      idUser
    } = _ref3;

    try {
      check('idUser', String);
    } catch (exception) {
      console.error('user.remove', exception);
      throw new Meteor.Error('403', 'La informacion proporcionada no es correcta');
    }
  },

  run(_ref4) {
    return Promise.asyncApply(() => {
      let {
        idUser
      } = _ref4;
      const responseMessage = new ResponseMessage();

      try {
        console.log('Eliminando usuario a la BD');
        Promise.await(UsersServ.deleteUser(idUser));
      } catch (exception) {
        console.error('user.remove', 'Ocurrió un error al eliminar al usaurio');
        throw new Meteor.Error('500', 'ocurrió un error al eliminar al usaurio');
      }

      responseMessage.create('Usuario eliminado exitosamente');
      return responseMessage;
    });
  }

});
new ValidatedMethod({
  name: 'user.updatePersonalData',
  mixins: [MethodHooks],
  beforeHooks: [AuthGuard.isUserLogged],
  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
  afterHooks: [],

  validate(_ref5) {
    let {
      user
    } = _ref5;

    try {
      // Valida que la estructura del objeto user este conforme a la definicion.
      check(user, {
        _id: Match.OneOf(String, null),
        username: String,
        emails: [{
          address: String,
          verified: Boolean
        }],
        profile: {
          profile: String,
          name: String,
          path: Match.OneOf(String, null)
        }
      });
    } catch (exception) {
      console.error('user.updatePersonalData', exception);
      throw new Meteor.Error('403', 'La informacion introducida no es válida.');
    } // Validar que no haya usuarios con el mismo correo y nombre de usuario en la BD.


    UsersServ.validateEmail(user.emails[0].address, user._id);
    UsersServ.validateUserName(user.username, user._id);
  },

  run(_ref6) {
    return Promise.asyncApply(() => {
      let {
        user,
        photoFileUser
      } = _ref6;
      console.log('user.updatePersonalData'); //console.log('Usuario logeado ', this.userId);

      const responseMessage = new ResponseMessage();

      if (user._id !== null) {
        try {
          Promise.await(UsersServ.updateuser(user, photoFileUser));
        } catch (exception) {
          console.error('user.updatePersonalData', exception);
          throw new Meteor.Error('500', 'Ocurrió un error al actualizar los datos del usuario');
        }

        console.log('Se actualizaron los datos del usuario exitosamente');
        responseMessage.create('Se actualizaron los datos del usuario exitosamente');
      }

      return responseMessage;
    });
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"UsersPubs.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Users/UsersPubs.js                                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let PermissionMiddleware;
module.link("../../middlewares/PermissionMiddleware", {
  PermissionMiddleware(v) {
    PermissionMiddleware = v;
  }

}, 0);
let Permissions;
module.link("../../startup/server/Permissions", {
  default(v) {
    Permissions = v;
  }

}, 1);
const userPublication = new PublishEndpoint('user.list', function (param1) {
  return Meteor.users.find({}, {
    sort: {
      createdAt: -1
    }
  });
});
userPublication.use(new PermissionMiddleware(Permissions.USERS.LIST.VALUE));
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"UsersServ.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Users/UsersServ.js                                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let ProfilesServ;
module.link("../Profiles/ProfilesServ", {
  default(v) {
    ProfilesServ = v;
  }

}, 0);
let FileOperations;
module.link("../../startup/server/utilities/FileOperations", {
  default(v) {
    FileOperations = v;
  }

}, 1);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 2);
const PATH_USERS_FILENAME = 'users/';
module.exportDefault({
  validateEmail(newEmail, idUser) {
    const existsEmail = Accounts.findUserByEmail(newEmail);

    if (idUser) {
      // actualizacion de usuario
      const oldUser = Meteor.users.findOne(idUser);

      if (oldUser.emails[0].address !== newEmail && existsEmail) {
        throw new Meteor.Error('403', 'El nuevo correo electronico ya esta siendo usado');
      }
    } else if (existsEmail) {
      // es usuario nuevo pero el correo  ya existe.
      throw new Meteor.Error('403', 'El nuevo correo ya esta siendo utilizado');
    }
  },

  validateUserName(newUserName, idUser) {
    const existsUserName = Accounts.findUserByUsername(newUserName);

    if (idUser) {
      // actualizacion de usuario//
      const oldUser = Meteor.users.findOne(idUser);

      if (oldUser.username !== newUserName && existsUserName) {
        throw new Meteor.Error('403', 'El nombre de usuario  ya esta siendo utilizado');
      }
    } else if (existsUserName) {
      // El nombre de NUEVO usuario ya existe
      throw new Meteor.Error('403', 'El nombre de usuario  ya esta siendo utilizado');
    }
  },

  createUser(user, photoFileUser) {
    return Promise.asyncApply(() => {
      const idUser = Accounts.createUser({
        username: user.username,
        email: user.emails[0].address,
        profile: user.profile //,  AL CREAR USUARIO no se fija el password porque se implementara un envio de una URL para que el usuario lo fije
        //password: user.password

      });

      if (idUser) {
        ProfilesServ.setUsersRoles(idUser, user.profile.profile);
        Accounts.sendEnrollmentEmail(idUser, user.emails[0].address);
      }

      let avatarSrc = null;

      if (photoFileUser) {
        const response = Promise.await(FileOperations.saveFileFromBase64ToGoogleStorage(photoFileUser, 'avatar', PATH_USERS_FILENAME + idUser));

        if (!response.data.success) {
          throw new Meteor.Error('403', 'Error al subir la foto');
        } else {
          avatarSrc = response.data.fileUrl;
        }
      }

      Meteor.users.update(idUser, {
        $set: {
          'profile.path': avatarSrc
        }
      });
    });
  },

  updateuser(user, photoFileUser) {
    return Promise.asyncApply(() => {
      const currentUser = Meteor.users.findOne(user._id);

      if (currentUser !== undefined) {
        if (currentUser.emails[0].address !== user.emails[0].address) {
          Accounts.removeEmail(currentUser._id, currentUser.emails[0].address);
          Accounts.addEmail(currentUser._id, user.emails[0].address);
          Accounts.sendVerificationEmail(user._id, user.emails[0].address);
        }

        if (currentUser.username !== user.username) {
          Accounts.setUsername(currentUser._id, user.username);
        }

        Meteor.users.update(user._id, {
          $set: {
            profile: {
              profile: user.profile.profile,
              name: user.profile.name,
              path: currentUser.profile.path
            }
          }
        });
        ProfilesServ.setUsersRoles(user._id, user.profile.profile);

        if (photoFileUser) {
          if (currentUser.profile.path) {
            Promise.await(FileOperations.deleteFileFromGoogleStoreIfExists(currentUser.profile.path.substring(currentUser.profile.path.lastIndexOf(PATH_USERS_FILENAME))));
          }

          const response = Promise.await(FileOperations.saveFileFromBase64ToGoogleStorage(photoFileUser, 'avatar', PATH_USERS_FILENAME + user._id));

          if (!response.data.success) {
            throw new Meteor.Error('403', 'Error al subir la foto');
          } else {
            Meteor.users.update(user._id, {
              $set: {
                'profile.path': response.data.fileUrl
              }
            });
          }
        }
      } else {
        throw new Meteor.Error('403', 'El usuario por actualizar no está en la BD');
      }
    });
  },

  deleteUser(idUser) {
    return Promise.asyncApply(() => {
      Meteor.users.remove(idUser);
      Meteor.roleAssignment.remove({
        'user._id': idUser
      });
      Promise.await(FileOperations.deleteFilesOfFolderFromGoogleStorage(PATH_USERS_FILENAME + idUser));
    });
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Warehouses":{"Warehouse.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Warehouses/Warehouse.js                                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  WarehouseRepository: () => WarehouseRepository
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const WarehouseRepository = new Mongo.Collection('warehouses');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"WarehouseCtl.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Warehouses/WarehouseCtl.js                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let check, Match;
module.link("meteor/check", {
  check(v) {
    check = v;
  },

  Match(v) {
    Match = v;
  }

}, 0);
let ValidatedMethod;
module.link("meteor/mdg:validated-method", {
  ValidatedMethod(v) {
    ValidatedMethod = v;
  }

}, 1);
let ResponseMessage;
module.link("../../startup/server/utilities/ResponseMesssage", {
  ResponseMessage(v) {
    ResponseMessage = v;
  }

}, 2);
let AuthGuard;
module.link("../../middlewares/AuthGuard", {
  default(v) {
    AuthGuard = v;
  }

}, 3);
let Permissions;
module.link("../../startup/server/Permissions", {
  default(v) {
    Permissions = v;
  }

}, 4);
let WarehouseRepository;
module.link("./Warehouse", {
  WarehouseRepository(v) {
    WarehouseRepository = v;
  }

}, 5);
let WarehouseServ;
module.link("./WarehouseServ", {
  default(v) {
    WarehouseServ = v;
  }

}, 6);
new ValidatedMethod({
  name: 'warehouse.save',
  mixins: [MethodHooks],
  permissions: [Permissions.WAREHOUSES.CREATE.VALUE, Permissions.WAREHOUSES.UPDATE.VALUE],
  beforeHooks: [AuthGuard.checkPermission],

  validate(warehouse) {
    try {
      check(warehouse, {
        _id: Match.OneOf(String, null),
        name: String,
        name_full: String,
        location: String
      });
    } catch (exception) {
      console.error('warehouse.save', exception);
      throw new Meteor.Error('403', 'La informacion introducida no es valida');
    } // Validar que no haya almacenes con el mismo nombre   


    WarehouseServ.validateWarehouseName(warehouse.name, warehouse._id);
  },

  run(warehouse) {
    const responseMessage = new ResponseMessage();

    try {
      if (warehouse._id !== null) {
        WarehouseRepository.update(warehouse._id, {
          $set: {
            name: warehouse.name,
            name_full: warehouse.name_full,
            location: warehouse.location
          }
        });
        responseMessage.create('Se actualizó el almacen exitosamente');
      } else {
        WarehouseRepository.insert({
          name: warehouse.name,
          name_full: warehouse.name_full,
          location: warehouse.location
        });
        responseMessage.create('Se insertó el almacen exitosamente');
      }
    } catch (exception) {
      console.error('warehouse.save', exception);
      throw new Meteor.Error('500', 'Ha ocurrido un error al guardar el almacen');
    }

    return responseMessage;
  }

});
new ValidatedMethod({
  name: 'warehouse.delete',
  mixins: [MethodHooks],
  permissions: [Permissions.WAREHOUSES.DELETE.VALUE],
  beforeHooks: [AuthGuard.checkPermission],
  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
  afterHooks: [],

  validate(_ref) {
    let {
      idWarehouse
    } = _ref;

    try {
      console.log('idWarehouse ', idWarehouse);
      check(idWarehouse, String);
    } catch (exception) {
      console.error('warehouse.delete', exception);
      throw new Meteor.Error('403', 'Ocurrio un error al eliminar el almacen');
    } // validar que no sea posible eliminar un almacen si hay un producto utilizandolo.


    const warehouseWithProduct = WarehouseServ.validateWarehouseBusy(idWarehouse);

    if (warehouseWithProduct > 0) {
      throw new Meteor.Error('403', 'No es posible elimiar el almacen', 'Hay al menos un producto utilizandolo');
    }
  },

  run(_ref2) {
    let {
      idWarehouse
    } = _ref2;
    const responseMessage = new ResponseMessage();

    try {
      WarehouseRepository.remove(idWarehouse);
      responseMessage.create('Almacen eliminado exitosamente');
    } catch (exception) {
      console.error('warehouse.delete', exception);
      throw new Meteor.Error('500', 'Ocurrio un error al eliminar el almacen');
    }

    return responseMessage;
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"WarehousePubs.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Warehouses/WarehousePubs.js                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let WarehouseRepository;
module.link("./Warehouse", {
  WarehouseRepository(v) {
    WarehouseRepository = v;
  }

}, 0);
let PermissionMiddleware;
module.link("../../middlewares/PermissionMiddleware", {
  PermissionMiddleware(v) {
    PermissionMiddleware = v;
  }

}, 1);
let Permissions;
module.link("../../startup/server/Permissions", {
  default(v) {
    Permissions = v;
  }

}, 2);
const warehousePublication = new PublishEndpoint('warehouse.list', function (param1) {
  return WarehouseRepository.find({}, {});
});
warehousePublication.use(new PermissionMiddleware(Permissions.WAREHOUSES.LIST.VALUE));
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"WarehouseSeeder.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Warehouses/WarehouseSeeder.js                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Permissions, permissionsArray;
module.link("../../startup/server/Permissions", {
  default(v) {
    Permissions = v;
  },

  permissionsArray(v) {
    permissionsArray = v;
  }

}, 0);
let WarehouseRepository;
module.link("./Warehouse", {
  WarehouseRepository(v) {
    WarehouseRepository = v;
  }

}, 1);
WarehouseRepository.rawCollection().createIndex({
  'name': 1
}, {
  unique: true
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"WarehouseServ.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Warehouses/WarehouseServ.js                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let WarehouseRepository;
module.link("./Warehouse", {
  WarehouseRepository(v) {
    WarehouseRepository = v;
  }

}, 1);
module.exportDefault({
  validateWarehouseName(newWarehouseName, idWarehouse) {
    const existsWarehouseList = WarehouseRepository.find({
      name: newWarehouseName
    }).fetch(); // recorrer la lista y comparar que uno diferente de mi tenga el mismo nombre

    existsWarehouseList.filter(warehouse => {
      if (warehouse.name == newWarehouseName && warehouse._id !== idWarehouse) {
        throw new Meteor.Error('403', 'El nombre del almacen ya esta siendo utilizado');
      }
    });
  },

  validateWarehouseBusy(idWarehouse) {
    // ToDo Buscar productos con almacen id 
    return 0;
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"Workstations":{"WorkStation.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Workstations/WorkStation.js                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  WorkstationRepository: () => WorkstationRepository
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const WorkstationRepository = new Mongo.Collection('workstations');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"WorkStationCtl.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Workstations/WorkStationCtl.js                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let check, Match;
module.link("meteor/check", {
  check(v) {
    check = v;
  },

  Match(v) {
    Match = v;
  }

}, 0);
let ValidatedMethod;
module.link("meteor/mdg:validated-method", {
  ValidatedMethod(v) {
    ValidatedMethod = v;
  }

}, 1);
let ResponseMessage;
module.link("../../startup/server/utilities/ResponseMesssage", {
  ResponseMessage(v) {
    ResponseMessage = v;
  }

}, 2);
let AuthGuard;
module.link("../../middlewares/AuthGuard", {
  default(v) {
    AuthGuard = v;
  }

}, 3);
let Permissions;
module.link("../../startup/server/Permissions", {
  default(v) {
    Permissions = v;
  }

}, 4);
let WorkstationRepository;
module.link("./WorkStation", {
  WorkstationRepository(v) {
    WorkstationRepository = v;
  }

}, 5);
let WorkStationServ;
module.link("./WorkStationServ", {
  default(v) {
    WorkStationServ = v;
  }

}, 6);
new ValidatedMethod({
  name: 'workstation.save',
  mixins: [MethodHooks],
  permissions: [Permissions.WORKSTATIONS.CREATE.VALUE, Permissions.WORKSTATIONS.UPDATE.VALUE],
  beforeHooks: [AuthGuard.checkPermission],

  validate(workstation) {
    try {
      console.info('workstation ', workstation);
      check(workstation, {
        _id: Match.OneOf(String, null),
        name: String,
        name_full: String,
        location: String,
        productionline: {
          _id: Match.OneOf(String, null),
          name: Match.OneOf(String, null),
          description: Match.OneOf(String, null)
        }
      });
    } catch (exception) {
      console.error('workstation.save', exception);
      throw new Meteor.Error('403', 'La informacion introducida no es valida');
    } // Validar que no haya estaciones de trabajo con el mismo nombre   


    WorkStationServ.validateWorkstationName(workstation.name, workstation._id);
  },

  run(workstation) {
    const responseMessage = new ResponseMessage();

    try {
      if (workstation._id !== null) {
        WorkStationServ.validateWorkstationChangeProductionLine(workstation);
        WorkstationRepository.update(workstation._id, {
          $set: {
            name: workstation.name,
            name_full: workstation.name_full,
            location: workstation.location,
            productionline: workstation.productionline
          }
        });
        responseMessage.create('Se actualizó la estacion de trabajo exitosamente');
      } else {
        WorkstationRepository.insert({
          name: workstation.name,
          name_full: workstation.name_full,
          location: workstation.location,
          productionline: workstation.productionline
        }); // ToDo actualizar la Linea de produccion

        responseMessage.create('Se insertó la estacion de trabajo exitosamente');
      }
    } catch (exception) {
      console.error('workstation.save', exception);
      throw new Meteor.Error('500', 'Ha ocurrido un error al guardar la estacion de trabajo');
    }

    return responseMessage;
  }

});
new ValidatedMethod({
  name: 'workstation.delete',
  mixins: [MethodHooks],
  permissions: [Permissions.WORKSTATIONS.DELETE.VALUE],
  beforeHooks: [AuthGuard.checkPermission],
  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
  afterHooks: [],

  validate(_ref) {
    let {
      idWorkstation
    } = _ref;

    try {
      check(idWorkstation, String);
    } catch (exception) {
      console.error('workstation.delete', exception);
      throw new Meteor.Error('403', 'Ocurrio un error al eliminar la estacion de trabajo');
    } // validar que no sea posible eliminar una estacion si hay una linea utilizandolo.


    const workstationWithProductionLine = WorkStationServ.validateWorkstationBusy(idWorkstation);

    if (workstationWithProductionLine > 0) {
      throw new Meteor.Error('403', 'No es posible elimiar la estacion de trabajo', 'Hay al menos una linea de produccion utilizandola');
    }
  },

  run(_ref2) {
    let {
      idWorkstation
    } = _ref2;
    const responseMessage = new ResponseMessage();

    try {
      WorkstationRepository.remove(idWorkstation);
      responseMessage.create('Estacion de trabajo eliminada exitosamente');
    } catch (exception) {
      console.error('workstation.delete', exception);
      throw new Meteor.Error('500', 'Ocurrio un error al eliminar la estacion de trabajo');
    }

    return responseMessage;
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"WorkStationPubs.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Workstations/WorkStationPubs.js                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let WorkstationRepository;
module.link("./WorkStation", {
  WorkstationRepository(v) {
    WorkstationRepository = v;
  }

}, 0);
let PermissionMiddleware;
module.link("../../middlewares/PermissionMiddleware", {
  PermissionMiddleware(v) {
    PermissionMiddleware = v;
  }

}, 1);
let Permissions;
module.link("../../startup/server/Permissions", {
  default(v) {
    Permissions = v;
  }

}, 2);
const workstationPublication = new PublishEndpoint('workstation.list', function (param1) {
  return WorkstationRepository.find({}, {
    sort: {
      createdAt: -1
    }
  });
});
workstationPublication.use(new PermissionMiddleware(Permissions.WORKSTATIONS.LIST.VALUE));
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"WorkStationServ.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/api/Workstations/WorkStationServ.js                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let WorkstationRepository;
module.link("./WorkStation", {
  WorkstationRepository(v) {
    WorkstationRepository = v;
  }

}, 1);
let ProductionLineRepository;
module.link("../ProductionLines/ProductionLine", {
  ProductionLineRepository(v) {
    ProductionLineRepository = v;
  }

}, 2);
module.exportDefault({
  validateWorkstationName(newWorkstationName, idWorkstation) {
    const existsWorkstationList = WorkstationRepository.find({
      name: newWorkstationName
    }).fetch(); // recorrer la lista y comparar que uno diferente de mi tenga el mismo nombre

    existsWorkstationList.filter(workstation => {
      if (workstation.name == newWorkstationName && workstation._id !== idWorkstation) {
        throw new Meteor.Error('403', 'El nombre de la estacion de trabajo  ya esta siendo utilizado');
      }
    });
  },

  validateWorkstationBusy(idWorkstation) {
    const existsWorkstationNumber = ProductionLineRepository.find({
      'workstations._id': idWorkstation
    }).count();
    return existsWorkstationNumber;
  },

  validateWorkstationChangeProductionLine(workstation) {
    // actualizar la Linea de produccion si es diferente de la actual
    // Validar que la linea nueva es diferente de la vieja.
    // Si es diferente hay que removerla de la linea de produccion vieja.
    const oldWorkstation = WorkstationRepository.findOne(workstation._id);

    if (oldWorkstation) {
      if (oldWorkstation.productionline._id !== workstation.productionline._id) {
        const oldProductionLine = ProductionLineRepository.findOne(oldWorkstation.productionline._id);
        const oldProductionLineWorkstationsUpdated = oldProductionLine.workstations.filter(ws => ws._id !== workstation._id);
        ProductionLineRepository.update(oldProductionLine._id, {
          $set: {
            workstations: oldProductionLineWorkstationsUpdated
          }
        });
      }
    }
  }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"middlewares":{"AuthGuard.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/middlewares/AuthGuard.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
const checkPermission = function (methodArgs, methodOptions) {
  const idUser = this.userId;
  const permissions = methodOptions.permissions;
  let hasPermission = false;

  if (idUser !== null) {
    const profileName = Meteor.user().profile.profile;
    hasPermission = Roles.userIsInRole(idUser, permissions, profileName);
  }

  if (!hasPermission) {
    throw new Meteor.Error('403', 'Acceso denegado.', 'No tienes permiso para ejecutar esta accion');
  }

  return methodArgs;
};

const isUserLogged = function (methodArgs, methodOptions) {
  if (!this.userId) {
    throw new Meteor.Error('403', 'Acceso denegado.', 'No tienes permiso para ejecutar esta opcion');
  }

  return methodArgs;
};

module.exportDefault({
  checkPermission,
  isUserLogged
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"PermissionMiddleware.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// imports/middlewares/PermissionMiddleware.js                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  PermissionMiddleware: () => PermissionMiddleware
});

class PermissionMiddleware extends PublishMiddleware {
  constructor(permissions) {
    super();
    this._permissions = permissions;
  } // solo a este evento no le verificamos permisos para no sobre cargar el proceso
  // ya que en una lista por cada elemento agregado es llamada esta funcion


  added(publish, collection, id, fields) {
    if (publish.userId) {
      return super.added(...arguments);
    }

    return publish.ready();
  }

  changed(publish, collection, id, fields) {
    if (this.checkPermission(publish.userId)) {
      return super.changed(...arguments);
    }

    return publish.ready();
  }

  removed(publish, collection, id) {
    if (this.checkPermission(publish.userId)) {
      return super.removed(...arguments);
    }

    return publish.ready();
  }

  onReady(publish) {
    if (publish.userId) {
      return super.onReady(...arguments);
    }

    return publish.ready();
  }

  onStop(publish) {
    if (publish.userId) {
      return super.onStop(...arguments);
    }

    return publish.ready();
  }

  onError(publish, error) {
    if (publish.userId) {
      return super.onError(...arguments);
    }

    return publish.ready();
  }

  checkPermission(idUser) {
    const profileName = Roles.getScopesForUser(idUser)[0];
    return Roles.userIsInRole(idUser, this._permissions, profileName);
  }

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"server":{"main.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/main.js                                                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.link("/imports/startup/server");
module.link("/imports/startup/both");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"settings":{"cerometros-firebase-adminsdk-ublo1-0e93050736.json":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// settings/cerometros-firebase-adminsdk-ublo1-0e93050736.json                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.exports = {
  "type": "service_account",
  "project_id": "cerometros",
  "private_key_id": "0e930507365b322f301de9724863af67815fa10d",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDWcIOANMJ/JudS\nuhpERzz5oNkPS4Aa6fn4SRxDe7A/zz05Bdj5ITet70+QfzP8h4GzNs8NhdeqDEmr\nAFqFg5v+E+X7bokcFIspFSZ/KROxxOGUrKG3F/PnKPgVy1ku02mTkUoFODz/Z2D3\nYyfdjuGIkRgXfgFNjzA+r341eieQzrH2HLTuWE/b/Re2LDSGU1IzSWIl9jVXi+23\nLdt6v9UnttXFCx/fC4hHWU8uCOSBIM6+mZjY3e35dgWYD23HJQF0HjCon6xo3TnK\n79OqaE/P2uINeLiolOxNKuCwOCG84dorRHibolfqxxus8kQmeF7oFRDqQK7/m436\nL2soIcinAgMBAAECggEACMDUqqs8qeUOzz0tLPlSygZ1+x5ZWdU622wx56fztKnD\nICyWw+tGXbwQMt/xDCSvN39hafYQghlN+S7NWHgxVL3qMYkRtrWN9/zW3UeczVux\n25hFDPdrgNWWyYj17dKPvjLRjdn9qhfwXi4he/VE9oakWvJ39NBcp0pm6/boXjbx\nQj0Her0E+6fnp4O0vDdHDa+r8hxQ3rsfGRmjXxvyWsW4+nZc/Bp3ed+4NPSgfGaE\ntBxDQ7I1cCWfxDIU8RU6DWmohKN6HxzZvUmLKxlSnKmMYAAIdbV0x4BFGIxU8kng\n5fsjRLZLqGEjY2f3MgtiM4ljGVZ8bHimPrdas2RjfQKBgQDuPodko20rDWD4ScNy\nAbFOebxNIasjVOZTF/JpHFxJAiRQ/G1TC1FlwQy0gE9v7hrwe4mRo/T5cGRL3yhu\nQuxlnCY9xoVDfsLNCN6D4bJoljqOC1N+K3PQld5yjhJJnxv7MsJionWDD680JGAO\n89Qa2KpMl9EabmEbgueq6hToXQKBgQDma9ApQWGLjP1iCO6Ee7tlUjoR7XHojdHx\nbZNoukoUgdCd3rSIYF8W5Z/mIh8StSdZ+7WTlEXITmb7ZvhWcIoo6qQL/Z2trb0C\nQJjeKhzqJS4YwKq+JFUaijSf8a9sFMMwiEEmHMBn05nRDo7dXWTQAXwniULNTXQM\n/okeWcsU0wKBgQDTjdzGRcSDzU6FS2LtEomyiLDnwPTp29LmiEYuhguAnRFIhM5D\nRrKR65nvklx3pPRxBRIErJW1BdNZ+CA7wNuP4temVWkypRYv4SdN7pVw/62hQndy\nev1NhDdSe8vLaij7p3grA93bcor+fyp5PJTk/e5DMzBwCwHZ3yT+hPvp1QKBgQDa\ncGDhi3Le6eUX+CGuBOKtdhtI/ZHcBf5+YwO458ns0PglgYgiNUJQIZXJhJVylbvd\niUskwg65iuID+ST6RSwlB/RGzcKacLdbGEQTcVcB/gdKPfRf12+6fkTPUD6eNryo\nGLOyXtVkWGxcjPGRF8XHj3DUxkJHAONAolj5JeTpMwKBgD2xtnX4oPnS15JuvhWd\ne16YInvcEVYuCizaVZmifeyw26Qx8889E9g5DJm19DR+J2AXXN+WX6utaPiA2x45\nWLifRpKSxBzrV5311nwBRc8FpZcQqK5ts8ViYd3WmQ9aIfQ/an91HLfMKCtOtkzT\n772MzP/o9XjYsSPpLm+y6R2Z\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-ublo1@cerometros.iam.gserviceaccount.com",
  "client_id": "116252256361768172307",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ublo1%40cerometros.iam.gserviceaccount.com"
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".ts",
    ".mjs",
    ".vue",
    ".tsx"
  ]
});

var exports = require("/server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zdGFydHVwL3NlcnZlci9zZXJ2aWNlcy9GaXJlYmFzZUFkbWluLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL3N0YXJ0dXAvc2VydmVyL3NlcnZpY2VzL01haWxTZXJ2LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL3N0YXJ0dXAvc2VydmVyL3V0aWxpdGllcy9GaWxlT3BlcmF0aW9ucy5qcyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zdGFydHVwL3NlcnZlci91dGlsaXRpZXMvUmVzcG9uc2VNZXNzc2FnZS5qcyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9zdGFydHVwL3NlcnZlci91dGlsaXRpZXMvVXRpbGl0aWVzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL3N0YXJ0dXAvc2VydmVyL1Blcm1pc3Npb25zLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL3N0YXJ0dXAvc2VydmVyL2luZGV4LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL3N0YXJ0dXAvYm90aC9pbmRleC5qcyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvQ29tcGFuaWVzL0NvbXBhbnkuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL0NvbXBhbmllcy9Db21wYW55Q3RsLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL2FwaS9Db21wYW5pZXMvQ29tcGFueVB1YnMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL0NvbXBhbmllcy9Db21wYW55U2Vydi5qcyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvTWVzc2FnZXMvTWVzc2FnZS5qcyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvTWVzc2FnZXMvTWVzc2FnZVB1YnMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL01lc3NhZ2VzL01lc3NhZ2VTZWVkZXIuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL01lc3NhZ2VzL01lc3NhZ2VzQ3RsLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL2FwaS9QZXJtaXNzaW9ucy9QZXJtaXNzaW9uQ3RsLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL2FwaS9QZXJtaXNzaW9ucy9QZXJtaXNzaW9uUHVicy5qcyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvUHJvZHVjdGlvbkxpbmVzL1Byb2R1Y3Rpb25MaW5lLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL2FwaS9Qcm9kdWN0aW9uTGluZXMvUHJvZHVjdGlvbkxpbmVDdGwuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL1Byb2R1Y3Rpb25MaW5lcy9Qcm9kdWN0aW9uTGluZVNlZWRlci5qcyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvUHJvZHVjdGlvbkxpbmVzL1Byb2R1Y3Rpb25MaW5lc1B1YnMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL1Byb2R1Y3Rpb25MaW5lcy9Qcm9kdWN0aW9uTGluZXNTZXJ2LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL2FwaS9Qcm9kdWN0cy9Qcm9kdWN0LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL2FwaS9Qcm9kdWN0cy9Qcm9kdWN0Q3RsLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL2FwaS9Qcm9kdWN0cy9Qcm9kdWN0UHVicy5qcyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvUHJvZHVjdHMvUHJvZHVjdFNlZWRlci5qcyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvUHJvZHVjdHMvUHJvZHVjdFNlcnYuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL1Byb2ZpbGVzL1Byb2ZpbGUuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL1Byb2ZpbGVzL1Byb2ZpbGVDdGwuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL1Byb2ZpbGVzL1Byb2ZpbGVTZWVkZXIuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL1Byb2ZpbGVzL1Byb2ZpbGVzUHVicy5qcyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvUHJvZmlsZXMvUHJvZmlsZXNTZXJ2LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL2FwaS9Qcm92aWRlcnMvUHJvdmlkZXIuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL1Byb3ZpZGVycy9Qcm92aWRlckN0bC5qcyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvUHJvdmlkZXJzL1Byb3ZpZGVyUHVicy5qcyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvUHJvdmlkZXJzL1Byb3ZpZGVyU2VlZGVyLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL2FwaS9Qcm92aWRlcnMvUHJvdmlkZXJTZXJ2LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL2FwaS9TeXN0ZW1PcHRpb25zL1N5c3RlbU9wdGlvbnMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL1N5c3RlbU9wdGlvbnMvU3lzdGVtT3B0aW9uc0N0bC5qcyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvVXNlcnMvVXNlci5qcyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvVXNlcnMvVXNlclByZXNlbmNlQ29uZmlnLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL2FwaS9Vc2Vycy9Vc2Vyc0N0cmwuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL1VzZXJzL1VzZXJzUHVicy5qcyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvVXNlcnMvVXNlcnNTZXJ2LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL2FwaS9XYXJlaG91c2VzL1dhcmVob3VzZS5qcyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvV2FyZWhvdXNlcy9XYXJlaG91c2VDdGwuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL1dhcmVob3VzZXMvV2FyZWhvdXNlUHVicy5qcyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvV2FyZWhvdXNlcy9XYXJlaG91c2VTZWVkZXIuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL1dhcmVob3VzZXMvV2FyZWhvdXNlU2Vydi5qcyIsIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvV29ya3N0YXRpb25zL1dvcmtTdGF0aW9uLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL2FwaS9Xb3Jrc3RhdGlvbnMvV29ya1N0YXRpb25DdGwuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL1dvcmtzdGF0aW9ucy9Xb3JrU3RhdGlvblB1YnMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvYXBpL1dvcmtzdGF0aW9ucy9Xb3JrU3RhdGlvblNlcnYuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvbWlkZGxld2FyZXMvQXV0aEd1YXJkLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9pbXBvcnRzL21pZGRsZXdhcmVzL1Blcm1pc3Npb25NaWRkbGV3YXJlLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWFpbi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnQiLCJmaXJlYmFzZUFkbWluc1N0b3JhZ2UiLCJCQVNFX1VSTF9TVE9SQUdFIiwiZmlyZWJhc2VBZG1pbiIsImxpbmsiLCJkZWZhdWx0IiwidiIsInNlcnZpY2VBY2NvdW50IiwiaW5pdGlhbGl6ZUFwcCIsImNyZWRlbnRpYWwiLCJjZXJ0Iiwic3RvcmFnZUJ1Y2tldCIsInN0b3JhZ2UiLCJidWNrZXQiLCJwcm9jZXNzIiwiZW52IiwiTUFJTF9VUkwiLCJNZXRlb3IiLCJzZXR0aW5ncyIsInByaXZhdGUiLCJjb25zb2xlIiwid2FybiIsIlNFTkRFUl9FTUFJTCIsIlNFTkRFUl9FTUFJTFMiLCJDT05UQUNUIiwiTE9HT19JTUFHRV9QQVRIIiwiUFJPRFVDVF9JTUFHRV9QQVRIIiwiaW5mbyIsIm5hbWUiLCJlbWFpbCIsImZyb20iLCJlbWFpbEVucm9sbEFjY291bnQiLCJlbWFpbFJlc2V0UGFzc3dvcmQiLCJlbWFpbFZlcmlmeUVtYWlsIiwicHJvZHVjdFNyYyIsImxvZ29TcmMiLCJBY2NvdW50cyIsImVtYWlsVGVtcGxhdGVzIiwic2l0ZU5hbWUiLCJlbnJvbGxBY2NvdW50Iiwic3ViamVjdCIsImh0bWwiLCJ1c2VyIiwidXJsIiwidXJsV2l0aG91dEhhc2giLCJyZXBsYWNlIiwiaXNEZXZlbG9wbWVudCIsIlNTUiIsImNvbXBpbGVUZW1wbGF0ZSIsIkFzc2V0cyIsImdldFRleHQiLCJyZW5kZXIiLCJyZXNldFBhc3N3b3JkIiwidmVyaWZ5RW1haWwiLCJtaW1ldHlwZXMiLCJVdGlsaXRpZXMiLCJSZXNwb25zZU1lc3NhZ2UiLCJleHBvcnREZWZhdWx0Iiwic2F2ZUZpbGVGcm9tQnVmZmVyVG9Hb29nbGVTdG9yYWdlIiwiZmlsZUJ1ZmZlciIsInBhdGgiLCJtaW1lVHlwZSIsInJlc3BvbnNlTWVzc2FnZSIsInZlcnNpb25GaWxlIiwiZ2VuZXJhdGVOdW1iZXJUb2tlbiIsImZpbGVuYW1lIiwiZGV0ZWN0RXh0ZW5zaW9uIiwiZmlsZSIsImZpbGVVcmwiLCJzYXZlIiwibWV0YWRhdGEiLCJjb250ZW50VHlwZSIsInB1YmxpYyIsImNyZWF0ZSIsInN1Y2Nlc3MiLCJleGNlcHRpb24iLCJlcnJvciIsInNhdmVGaWxlRnJvbUJhc2U2NFRvR29vZ2xlU3RvcmFnZSIsImJhc2U2NGZpbGUiLCJtYXRjaCIsImJhc2U2NEVuY29kZWRJbWFnZVN0cmluZyIsInNwbGl0IiwicG9wIiwiQnVmZmVyIiwiZGVsZXRlRmlsZUZyb21Hb29nbGVTdG9yZUlmRXhpc3RzIiwiZmlsZUxvY2F0aW9uIiwiZXhpc3RzRmlsZSIsImV4aXN0cyIsImRlbGV0ZSIsImRlbGV0ZUZpbGVzT2ZGb2xkZXJGcm9tR29vZ2xlU3RvcmFnZSIsInVzZXJGb2xkZXIiLCJkZWxldGVGaWxlcyIsInByZWZpeCIsImNvbnN0cnVjdG9yIiwibWVzc2FnZSIsImRlc2NyaXB0aW9uIiwiZGF0YSIsIm1pbiIsIm1heCIsIm51bSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInBlcm1pc3Npb25zQXJyYXkiLCJSb2xlcyIsIlBlcm1pc3Npb25zIiwiVVNFUlMiLCJMSVNUIiwiVkFMVUUiLCJURVhUIiwiQ1JFQVRFIiwiVVBEQVRFIiwiREVMRVRFIiwiUFJPRklMRVMiLCJQRVJNSVNTSU9OUyIsIkFETUlOUyIsIkxJU1RfQURNSU5TIiwiQ1JFQVRFX0FETUlOIiwiVVBEQVRFX0FETUlOIiwiREVMRVRFX0FETUlOIiwiU1VQRVJBRE1JTlMiLCJMSVNUX1NVUEVSX0FETUlOUyIsIkNSRUFURV9TVVBFUl9BRE1JTiIsIlVQREFURV9TVVBFUl9BRE1JTiIsIkRFTEVURV9TVVBFUl9BRE1JTiIsIkNIQVQiLCJDT01QQU5JRVMiLCJQUk9EVUNUSU9OTElORVMiLCJQUk9EVUNUSU9OT1JERVJTIiwiUFJPRFVDVFMiLCJQUk9WSURFUlNUQVRJT05TIiwiV0FSRUhPVVNFUyIsIldPUktTVEFUSU9OUyIsIlBST1ZJREVSUyIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJhY2N1bXVsYXRvciIsInN5c3RlbU1vZHVsZU5hbWUiLCJzeXN0ZW1Nb2R1bGVPYmplY3QiLCJtb2R1bGVQZXJtaXNzaW9ucyIsIm1hcCIsInBlcm1pc3Npb24iLCJjb25jYXQiLCJSRUZSRVNIX1BFUk1JU1NJT05TIiwibG9nIiwiY3VycmVudFJvbGVzIiwiZ2V0QWxsUm9sZXMiLCJmZXRjaCIsImZpbmQiLCJfcm9sZSIsIl9pZCIsImNyZWF0ZVJvbGUiLCJyb2xlcyIsInVwZGF0ZSIsIiRzZXQiLCJwdWJsaWNOYW1lIiwiVmFsaWRhdGVkTWV0aG9kIiwiY2hlY2siLCJtZXRob2RzIiwidGVzdG1ldGhvZCIsInN1bWEiLCJhIiwiYiIsInJlc3VsdCIsImNvbm5lY3Rpb25EYXRhIiwidXNlcklkIiwiZGVsYXlGdW5jdGlvbiIsImRlbGF5TWVzc2FnZSIsIlByb21pc2UiLCJyZXNvbHZlIiwic2V0VGltZW91dCIsInZhbGlkYXRlIiwiTnVtYmVyIiwicnVuIiwiY29uZmlnIiwibG9naW5FeHBpcmF0aW9uSW5EYXlzIiwiQ29tcGFueSIsIk1vbmdvIiwiQ29sbGVjdGlvbiIsIkF1dGhHdWFyZCIsIkNvbXBhbnlTZXJ2IiwiTWF0Y2giLCJtaXhpbnMiLCJNZXRob2RIb29rcyIsInBlcm1pc3Npb25zIiwiYmVmb3JlSG9va3MiLCJjaGVja1Blcm1pc3Npb24iLCJjb21wYW55IiwiT25lT2YiLCJTdHJpbmciLCJuYW1lX2Z1bGwiLCJjb21wYW55QnVzc2luZXNzSWQiLCJhZGRyZXNzIiwicGhvbmVzIiwid2ViIiwiaXNBdmFpbGFibGUiLCJCb29sZWFuIiwiRXJyb3IiLCJ2YWxpZGF0ZUNvbXBhbnlCdXNzaW5lc3NJZCIsInZhbGlkYXRlQ29tcGFueU5hbWUiLCJpbnNlcnQiLCJhZnRlckhvb2tzIiwiaWRDb21wYW55IiwidXNlcldpdGhDb21wYW55IiwiZ2V0VXNlcnNCeWNvbXBhbnkiLCJsZW5ndGgiLCJyZW1vdmUiLCJQZXJtaXNzaW9uTWlkZGxld2FyZSIsImNvbXBhbnlQdWJsaWNhdGlvbiIsIlB1Ymxpc2hFbmRwb2ludCIsInBhcmFtMSIsInNvcnQiLCJjcmVhdGVkQXQiLCJ1c2UiLCJuZXdDb21wYW55QnVzc2luZXNJZCIsImV4aXN0c0NvbXBhbnkiLCJmaW5kT25lIiwib2xkQ29tcGFueSIsIm5ld0NvbXBhbnlOYW1lIiwidXNlcnMiLCJNZXNzYWdlIiwibWVzc2FnZXNQdWJsaWNhdGlvbiIsImlkQ29udGFjdCIsImlkVXNlckxvZ2dlZCIsIiRvciIsImlkU2VuZGVyIiwiaWRSZWNlaXZlciIsImxpbWl0IiwiZGF0ZSIsInJhd0NvbGxlY3Rpb24iLCJjcmVhdGVJbmRleCIsInRleHQiLCJyZWFkIiwiaXNVc2VyTG9nZ2VkIiwibWVzc2FnZXMiLCIkaW4iLCJtIiwibXVsdGkiLCJQcm9maWxlIiwiZXgiLCJpZFByb2ZpbGUiLCJwcm9maWxlIiwiJG5pbiIsInNjb3BlIiwiZ2V0U2NvcGVzRm9yVXNlciIsImhhc1Blcm1pc3Npb24iLCJ1c2VySXNJblJvbGUiLCJwdWJsaXNoIiwicm9sZUFzc2lnbm1lbnQiLCJQcm9kdWN0aW9uTGluZVJlcG9zaXRvcnkiLCJQcm9kdWN0aW9uTGluZXNTZXJ2IiwiV29ya3N0YXRpb25SZXBvc2l0b3J5IiwicHJvZHVjdGlvbmxpbmUiLCJ3b3Jrc3RhdGlvbnMiLCJsb2NhdGlvbiIsInZhbGlkYXRlUHJvZHVjdGlvbkxpbmVOYW1lIiwicHJvZHVjdGlvbmxpbmVzIiwiaWRQcm9kdWN0aW9ubGluZSIsImlkUHJvZHVjdGlvbkxpbmUiLCJ3b3Jrc3RhdGlvbnNBc3NpZ25lZCIsIndvcmtzdGF0aW9uc0luY2x1ZGVkIiwid29ya3N0YXRpb24iLCJ3b3Jrc3RhdGlvbnNBdmFpbGFibGVzVG9JbmNsdWRlIiwiZm91bmQiLCJpIiwiaiIsInB1c2giLCJ1bmlxdWUiLCJwcm9kdWN0aW9uTGluZXNQdWJsaWNhdGlvbiIsIm5ld1Byb2R1Y3Rpb25MaW5lIiwiZXhpc3RzUHJvZHVjdGlvbkxpbmVOYW1lIiwiZmlsdGVyIiwiUHJvZHVjdCIsIlByb2R1Y3RTZXJ2IiwicHJvZHVjdCIsInVuaXQiLCJzdG9jayIsInByb3ZpZGVyIiwic2t1Iiwid2FyZWhvdXNlIiwicHJvZHVjdGlvbl9saW5lIiwiYm9tIiwicXVhbnRpdHkiLCJ2YWxpZGF0ZVByb2R1Y3ROYW1lIiwiYm9tTGlzdCIsImlkUHJvZHVjdCIsImlzVXNlcmVkQnlXYXJlaG91c2UiLCJwcm9kdWN0UHVibGljYXRpb24iLCJuZXdQcm9kdWN0TmFtZSIsImV4aXN0c1Byb2R1Y3QiLCJvbGRQcm9kdWN0IiwiUHJvZmlsZVNlcnYiLCJ2YWxpZGF0ZVByb2ZpbGVOYW1lIiwib2xkUHJvZmlsZSIsImdldFVzZXJzQnlwcm9maWxlIiwidXBkYXRlUHJvZmlsZVVzZXJzIiwidXNlcldpdGhQcm9maWxlIiwiU3RhdGljUHJvZmlsZXMiLCJhZG1pbiIsInAiLCJSRUZSRVNIX1NUQVRJQ19QUk9GSUxFUyIsImZvckVhY2giLCJzdGF0aWNwcm9maWxlTmFtZSIsInVwc2VydCIsInNldFVzZXJSb2xlcyIsIlByb2ZpbGVzU2VydiIsIm5vdFN0YXRpY1Byb2ZpbGVQdWJsaWNhdGlvbiIsImdldFN0YXRpY3Byb2ZpbGVzTmFtZSIsInByb2ZpbGVQdWJsaWNhdGlvbiIsImlkUHJ0b2ZpbGUiLCJzZXRVc2Vyc1JvbGVzIiwiaWRVc2VyIiwicHJvZmlsZU5hbWUiLCJuZXdQcm9maWxlTmFtZSIsInF1ZXJ5IiwiZXhpc3RzUHJvZmlsZU5hbWUiLCJQcm92aWRlciIsIlByb3ZpZGVyU2VydiIsInByb3ZpZGVyQnVzc2luZXNzSWQiLCJ2YWxpZGF0ZVByb3ZpZGVyQnVzc2luZXNzSWQiLCJ2YWxpZGF0ZVByb3ZpZGVyTmFtZSIsImlkUHJvdmlkZXIiLCJ0b1VzZUluVG9Qcm9kdWN0IiwicHJvdmlkZXJQdWJsaWNhdGlvbiIsIm5ld1Byb3ZpZGVyQnVzc2luZXNJZCIsImV4aXN0c1Byb3ZpZGVyIiwib2xkUHJvdmlkZXIiLCJuZXdQcm92aWRlck5hbWUiLCJ0aXRsZSIsInJvdXRlTmFtZSIsIlN5c3RlbU9wdGlvbnMiLCJ1c2VyTG9nZ2VkIiwidXNlclJvbGVzIiwiZ2V0Um9sZXNGb3JVc2VyIiwib3B0aW9uT2ZVc2VyIiwic3lzdGVtT3B0aW9uIiwicm9sZSIsIlVzZXIiLCJTaW1wbGVTY2hlbWEiLCJyZXF1aXJlIiwiVXNlclByb2ZpbGVTY2hlbWEiLCJ0eXBlIiwib3B0aW9uYWwiLCJibGFja2JveCIsImF0dGFjaFNjaGVtYSIsIlVzZXJQcmVzZW5jZSIsIlN0YXR1c1NjaGVtYSIsInN0YXR1cyIsIm9uQ2xlYW51cCIsInNlc3Npb25JZHMiLCIkdW5zZXQiLCJvblVzZXJPbmxpbmUiLCJjb25uZWN0aW9uIiwiRGF0ZSIsImlwQWRkciIsImNsaWVudEFkZHJlc3MiLCJ1c2VyQWdlbnQiLCJodHRwSGVhZGVycyIsIm9uVXNlcklkbGUiLCJvblVzZXJPZmZsaW5lIiwiVXNlcnNTZXJ2Iiwib25DcmVhdGVVc2VyIiwib3B0aW9ucyIsImN1c3RvbWl6ZWRVc2VyIiwiYXNzaWduIiwib25saW5lIiwidmFsaWRhdGVMb2dpbkF0dGVtcHQiLCJsb2dpbkF0dGVtcHQiLCJhbGxvd2VkIiwiZW1haWxzIiwidmVyaWZpZWQiLCJsb2dpblRva2Vuc09mdXNlciIsInNlcnZpY2VzIiwicmVzdW1lIiwibG9naW5Ub2tlbnMiLCJ1c2VybmFtZSIsInZhbGlkYXRlRW1haWwiLCJ2YWxpZGF0ZVVzZXJOYW1lIiwicGhvdG9GaWxlVXNlciIsInVwZGF0ZXVzZXIiLCJjcmVhdGVVc2VyIiwiZGVsZXRlVXNlciIsInVzZXJQdWJsaWNhdGlvbiIsIkZpbGVPcGVyYXRpb25zIiwiUEFUSF9VU0VSU19GSUxFTkFNRSIsIm5ld0VtYWlsIiwiZXhpc3RzRW1haWwiLCJmaW5kVXNlckJ5RW1haWwiLCJvbGRVc2VyIiwibmV3VXNlck5hbWUiLCJleGlzdHNVc2VyTmFtZSIsImZpbmRVc2VyQnlVc2VybmFtZSIsInNlbmRFbnJvbGxtZW50RW1haWwiLCJhdmF0YXJTcmMiLCJyZXNwb25zZSIsImN1cnJlbnRVc2VyIiwidW5kZWZpbmVkIiwicmVtb3ZlRW1haWwiLCJhZGRFbWFpbCIsInNlbmRWZXJpZmljYXRpb25FbWFpbCIsInNldFVzZXJuYW1lIiwic3Vic3RyaW5nIiwibGFzdEluZGV4T2YiLCJXYXJlaG91c2VSZXBvc2l0b3J5IiwiV2FyZWhvdXNlU2VydiIsInZhbGlkYXRlV2FyZWhvdXNlTmFtZSIsImlkV2FyZWhvdXNlIiwid2FyZWhvdXNlV2l0aFByb2R1Y3QiLCJ2YWxpZGF0ZVdhcmVob3VzZUJ1c3kiLCJ3YXJlaG91c2VQdWJsaWNhdGlvbiIsIm5ld1dhcmVob3VzZU5hbWUiLCJleGlzdHNXYXJlaG91c2VMaXN0IiwiV29ya1N0YXRpb25TZXJ2IiwidmFsaWRhdGVXb3Jrc3RhdGlvbk5hbWUiLCJ2YWxpZGF0ZVdvcmtzdGF0aW9uQ2hhbmdlUHJvZHVjdGlvbkxpbmUiLCJpZFdvcmtzdGF0aW9uIiwid29ya3N0YXRpb25XaXRoUHJvZHVjdGlvbkxpbmUiLCJ2YWxpZGF0ZVdvcmtzdGF0aW9uQnVzeSIsIndvcmtzdGF0aW9uUHVibGljYXRpb24iLCJuZXdXb3Jrc3RhdGlvbk5hbWUiLCJleGlzdHNXb3Jrc3RhdGlvbkxpc3QiLCJleGlzdHNXb3Jrc3RhdGlvbk51bWJlciIsImNvdW50Iiwib2xkV29ya3N0YXRpb24iLCJvbGRQcm9kdWN0aW9uTGluZSIsIm9sZFByb2R1Y3Rpb25MaW5lV29ya3N0YXRpb25zVXBkYXRlZCIsIndzIiwibWV0aG9kQXJncyIsIm1ldGhvZE9wdGlvbnMiLCJQdWJsaXNoTWlkZGxld2FyZSIsIl9wZXJtaXNzaW9ucyIsImFkZGVkIiwiY29sbGVjdGlvbiIsImlkIiwiZmllbGRzIiwiYXJndW1lbnRzIiwicmVhZHkiLCJjaGFuZ2VkIiwicmVtb3ZlZCIsIm9uUmVhZHkiLCJvblN0b3AiLCJvbkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBYztBQUFDQyx1QkFBcUIsRUFBQyxNQUFJQSxxQkFBM0I7QUFBaURDLGtCQUFnQixFQUFDLE1BQUlBO0FBQXRFLENBQWQ7QUFBdUcsSUFBSUMsYUFBSjtBQUFrQkosTUFBTSxDQUFDSyxJQUFQLENBQVksZ0JBQVosRUFBNkI7QUFBQ0MsU0FBTyxDQUFDQyxDQUFELEVBQUc7QUFBQ0gsaUJBQWEsR0FBQ0csQ0FBZDtBQUFnQjs7QUFBNUIsQ0FBN0IsRUFBMkQsQ0FBM0Q7QUFBOEQsSUFBSUMsY0FBSjtBQUFtQlIsTUFBTSxDQUFDSyxJQUFQLENBQVkseUVBQVosRUFBc0Y7QUFBQ0MsU0FBTyxDQUFDQyxDQUFELEVBQUc7QUFBQ0Msa0JBQWMsR0FBQ0QsQ0FBZjtBQUFpQjs7QUFBN0IsQ0FBdEYsRUFBcUgsQ0FBckg7QUFFckc7QUFFckdILGFBQWEsQ0FBQ0ssYUFBZCxDQUE0QjtBQUN4QkMsWUFBVSxFQUFFTixhQUFhLENB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LEtBQUssQ0FBQzZJLGdCQUFOLENBQXVCbUUsTUFBdkIsRUFBK0IsQ0FBL0IsQ0FBbEI7QUFDQSxXQUFPaE4sS0FBSyxDQUFDK0ksWUFBTixDQUFtQmlFLE1BQW5CLEVBQTJCLEtBQUt1SCxZQUFoQyxFQUE4Q3RILFdBQTlDLENBQVA7QUFDSDs7QUEzRG1ELEM7Ozs7Ozs7Ozs7O0FDQTVEMVQsTUFBTSxDQUFDSyxJQUFQLENBQVkseUJBQVo7QUFBdUNMLE1BQU0sQ0FBQ0ssSUFBUCxDQUFZLHVCQUFaLEUiLCJmaWxlIjoiL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmaXJlYmFzZUFkbWluIGZyb20gJ2ZpcmViYXNlLWFkbWluJztcblxuaW1wb3J0IHNlcnZpY2VBY2NvdW50IGZyb20gJy4uLy4uLy4uLy4uL3NldHRpbmdzL2Nlcm9tZXRyb3MtZmlyZWJhc2UtYWRtaW5zZGstdWJsbzEtMGU5MzA1MDczNi5qc29uJzs7XG5cbmZpcmViYXNlQWRtaW4uaW5pdGlhbGl6ZUFwcCh7XG4gICAgY3JlZGVudGlhbDogZmlyZWJhc2VBZG1pbi5jcmVkZW50aWFsLmNlcnQoc2VydmljZUFjY291bnQpLFxuICAgIHN0b3JhZ2VCdWNrZXQ6ICdnczovL2Nlcm9tZXRyb3MuYXBwc3BvdC5jb20nXG59KTtcblxuZXhwb3J0IGNvbnN0IGZpcmViYXNlQWRtaW5zU3RvcmFnZSA9IGZpcmViYXNlQWRtaW4uc3RvcmFnZSgpLmJ1Y2tldCgnZ3M6Ly9jZXJvbWV0cm9zLmFwcHNwb3QuY29tJyk7XG5leHBvcnQgY29uc3QgQkFTRV9VUkxfU1RPUkFHRT0naHR0cDovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20nO1xuXG5cbiIsIi8qXG4qICBWYWxpZGFyIHF1ZSBsYSB2YXJpYWJsZSBkZSBlbnRvcm5vIE1BSUxfVVJMIGVzdGUgZmlqYWRhXG4qL1xuaWYoIXByb2Nlc3MuZW52Lk1BSUxfVVJMKXtcbiAgICBpZihNZXRlb3Iuc2V0dGluZ3MucHJpdmF0ZT8uTUFJTF9VUkwpe1xuICAgICAgICBwcm9jZXNzLmVudi5NQUlMX1VSTD0gTWV0ZW9yLnNldHRpbmdzLnByaXZhdGUuTUFJTF9VUkw7XG4gICAgfWVsc2V7XG4gICAgICAgIGNvbnNvbGUud2FybihcIkVsIHNlcnZpY2lvIGRlIGVudmlvIGRlIGNvcnJlb3Mgbm8gaGEgc2lkbyBjb25maWd1cmFkbyAtVmFyaWFibGUgZGUgZW50b3JubyBNQUlMX1VSTCBpbmRlZmluaWRhLSAsIHBvciBsbyBxdWUgbm8gc2UgZW52aWFyw6FuIGNvcnJlb3MuXCIpO1xuICAgIH0gICBcbn1cbmlmICghcHJvY2Vzcy5lbnYuU0VOREVSX0VNQUlMKXtcbiAgICBpZihNZXRlb3Iuc2V0dGluZ3MucHJpdmF0ZT8uU0VOREVSX0VNQUlMUyl7XG4gICAgICAgIHByb2Nlc3MuZW52LlNFTkRFUl9FTUFJTD0gTWV0ZW9yLnNldHRpbmdzLnByaXZhdGUuU0VOREVSX0VNQUlMUy5DT05UQUNUO1xuICAgIH1lbHNle1xuICAgICAgICBjb25zb2xlLndhcm4oXCJFbCBzZXJ2aWNpbyBkZSBlbnZpbyBkZSBjb3JyZW9zIG5vIGhhIHNpZG8gY29uZmlndXJhZG8gLVZhcmlhYmxlIGRlIGVudG9ybm8gU0VOREVSX0VNQUlMIG5vIGRlZmluaWRhLSAsIHBvciBsbyBxdWUgbm8gc2UgZW52aWFyw6FuIGNvcnJlb3MuXCIpO1xuICAgIH1cbn1cblxuaWYoIXByb2Nlc3MuZW52LkxPR09fSU1BR0VfUEFUSCl7XG4gICAgcHJvY2Vzcy5lbnYuTE9HT19JTUFHRV9QQVRIPVwiXCI7XG4gICAgY29uc29sZS53YXJuKFwiTGEgcnV0YSBhIGxhIGltYWdlbiBkZWwgTE9HTyBubyBoYSBzaWRvIGNvbmZpZ3VyYWRvIC1WYXJpYWJsZSBkZSBlbnRvcm5vIExPR09fSU1BR0VQQVRILSAsIHBvciBsbyBxdWUgbm8gc2UgdmlzdWFsaXphcsOhLlwiKTtcbn1cbmlmKCFwcm9jZXNzLmVudi5QUk9EVUNUX0lNQUdFX1BBVEgpe1xuICAgIHByb2Nlc3MuZW52LlBST0RVQ1RfSU1BR0VfUEFUSD1cIlwiO1xuICAgIGNvbnNvbGUud2FybihcIkxhIHJ1dGEgYSBsYSBpbWFnZW4gZGVsIHByb2R1Y3RvIHF1ZSBsbyBpZGVudGlmaWNhbm8gaGEgc2lkbyBjb25maWd1cmFkbyAtVmFyaWFibGUgZGUgZW50b3JubyBQUk9EVUNUX0lNQUdFX19QQVRIIC0gLCBwb3IgbG8gcXVlIG5vIHNlIHZpc3VhbGl6YXLDoS5cIik7XG59XG5jb25zb2xlLmluZm8oXCIgQ29uZmlndXJhY2lvbiBkZWwgc2lzdGVtYSBkZSBjb3JyZW9cIik7XG5jb25zb2xlLmluZm8oXCIgRW1haWwgVVJMIFwiLHByb2Nlc3MuZW52Lk1BSUxfVVJMKTtcbmNvbnNvbGUuaW5mbyhcIiBFbWFpbCBzZW5kZXJcIixwcm9jZXNzLmVudi5TRU5ERVJfRU1BSUwpO1xuXG5jb25zdCBuYW1lID0gJ1Npc3RlbWEgQ2Vyb01ldHJvcyc7XG5jb25zdCBlbWFpbCA9IGA8JHtwcm9jZXNzLmVudi5TRU5ERVJfRU1BSUx9PmA7XG5jb25zdCBmcm9tID0gYCR7IG5hbWUgfSAkeyBlbWFpbH1gO1xuXG5jb25zdCBlbWFpbEVucm9sbEFjY291bnQgPSAnZW1haWxfZW5yb2xsX2FjY291bnQuaHRtbCc7XG5jb25zdCBlbWFpbFJlc2V0UGFzc3dvcmQgPSAnZW1haWxfcmVzZXRfcGFzc3dvcmQuaHRtbCc7XG5jb25zdCBlbWFpbFZlcmlmeUVtYWlsID0gJ2VtYWlsX3ZlcmlmeV9lbWFpbC5odG1sJztcbi8vY29uc3QgcHJvZHVjdFNyYyA9ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvaW1nL3Z1ZS1tZXRlb3IucG5nJztcbi8vY29uc3QgbG9nb1NyYyA9ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvaW1nL0xvZ28ucG5nJztcbmNvbnN0IHByb2R1Y3RTcmMgPSBwcm9jZXNzLmVudi5QUk9EVUNUX0lNQUdFX1BBVEg7XG5jb25zdCBsb2dvU3JjID1wcm9jZXNzLmVudi5MT0dPX0lNQUdFX1BBVEg7XG5BY2NvdW50cy5lbWFpbFRlbXBsYXRlcy5zaXRlTmFtZSA9IG5hbWU7XG5BY2NvdW50cy5lbWFpbFRlbXBsYXRlcy5mcm9tID0gZnJvbTtcbmNvbnN0IGVtYWlsVGVtcGxhdGVzID0gQWNjb3VudHMuZW1haWxUZW1wbGF0ZXM7XG5cbmVtYWlsVGVtcGxhdGVzLmVucm9sbEFjY291bnQgPSB7XG4gICAgc3ViamVjdCgpIHtcbiAgICAgICAgcmV0dXJuIGBCaWVudmVuaWRvIGEgJHtuYW1lfWA7XG4gICAgfSxcbiAgICBodG1sKHVzZXIsdXJsKSB7XG4gICAgICAgIGNvbnN0IHVybFdpdGhvdXRIYXNoID0gdXJsLnJlcGxhY2UoJyMvJywnJyk7XG4gICAgICAgIGlmKE1ldGVvci5pc0RldmVsb3BtZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oJ0xpbmsgcGFyYSBmaWphciBjb250cmFzZcOxYScsdXJsV2l0aG91dEhhc2gpO1xuICAgICAgICB9XG4gICAgICAgIFNTUi5jb21waWxlVGVtcGxhdGUoJ2VtYWlsRW5yb2xsQWNjb3VudCcsQXNzZXRzLmdldFRleHQoZW1haWxFbnJvbGxBY2NvdW50KSk7XG4gICAgICAgIHJldHVybiBTU1IucmVuZGVyKCdlbWFpbEVucm9sbEFjY291bnQnLHtcbiAgICAgICAgICAgIHVybFdpdGhvdXRIYXNoLFxuICAgICAgICAgICAgcHJvZHVjdFNyYyxcbiAgICAgICAgICAgIGxvZ29TcmNcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxuXG5lbWFpbFRlbXBsYXRlcy5yZXNldFBhc3N3b3JkID0ge1xuICAgIHN1YmplY3QoKSB7XG4gICAgICAgIHJldHVybiBgUmVlc3RhYmxlY2VyIGNvbnRyYXNlw7FhYDtcbiAgICB9LFxuICAgIGh0bWwodXNlcix1cmwpIHtcbiAgICAgICAgY29uc3QgdXJsV2l0aG91dEhhc2ggPSB1cmwucmVwbGFjZSgnIy8nLCcnKTtcbiAgICAgICAgaWYoTWV0ZW9yLmlzRGV2ZWxvcG1lbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnTGluayBwYXJhIHJlZXN0YWJsZWNlciBjb250cmFzZcOxYScsdXJsV2l0aG91dEhhc2gpO1xuICAgICAgICB9XG4gICAgICAgIFNTUi5jb21waWxlVGVtcGxhdGUoJ2VtYWlsUmVzZXRQYXNzd29yZCcsQXNzZXRzLmdldFRleHQoZW1haWxSZXNldFBhc3N3b3JkKSk7XG4gICAgICAgIHJldHVybiBTU1IucmVuZGVyKCdlbWFpbFJlc2V0UGFzc3dvcmQnLHtcbiAgICAgICAgICAgIHVybFdpdGhvdXRIYXNoLFxuICAgICAgICAgICAgcHJvZHVjdFNyYyxcbiAgICAgICAgICAgIGxvZ29TcmNcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxuZW1haWxUZW1wbGF0ZXMudmVyaWZ5RW1haWwgPSB7XG4gICAgc3ViamVjdCgpIHtcbiAgICAgICAgcmV0dXJuIGBWYWxpZGFyIGNvcnJlbyBlbGVjdHJvbmljb2A7XG4gICAgfSxcbiAgICBodG1sKHVzZXIsdXJsKSB7XG4gICAgICAgIGNvbnN0IHVybFdpdGhvdXRIYXNoID0gdXJsLnJlcGxhY2UoJyMvJywnJyk7XG4gICAgICAgIGlmKE1ldGVvci5pc0RldmVsb3BtZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oJ0xpZ2EgcGFyYSB2YWxpZGFyIGNvcnJlbyBlbGVjdHJvbmljbycsdXJsV2l0aG91dEhhc2gpO1xuICAgICAgICB9XG4gICAgICAgIFNTUi5jb21waWxlVGVtcGxhdGUoJ2VtYWlsVmVyaWZ5RW1haWwnLEFzc2V0cy5nZXRUZXh0KGVtYWlsVmVyaWZ5RW1haWwpKTtcbiAgICAgICAgcmV0dXJuIFNTUi5yZW5kZXIoJ2VtYWlsVmVyaWZ5RW1haWwnLHtcbiAgICAgICAgICAgIHVybFdpdGhvdXRIYXNoLFxuICAgICAgICAgICAgcHJvZHVjdFNyYyxcbiAgICAgICAgICAgIGxvZ29TcmNcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxuXG4iLCJpbXBvcnQgbWltZXR5cGVzIGZyb20gJ21pbWV0eXBlcyc7XG5pbXBvcnQgVXRpbGl0aWVzIGZyb20gXCIuL1V0aWxpdGllc1wiO1xuaW1wb3J0IHsgQkFTRV9VUkxfU1RPUkFHRSAsIGZpcmViYXNlQWRtaW5zU3RvcmFnZX0gZnJvbSBcIi4uL3NlcnZpY2VzL0ZpcmViYXNlQWRtaW5cIjtcbmltcG9ydCB7UmVzcG9uc2VNZXNzYWdlfSBmcm9tIFwiLi9SZXNwb25zZU1lc3NzYWdlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhc3luYyBzYXZlRmlsZUZyb21CdWZmZXJUb0dvb2dsZVN0b3JhZ2UoZmlsZUJ1ZmZlciwgbmFtZSwgcGF0aCAsbWltZVR5cGUpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2VNZXNzYWdlID0gbmV3IFJlc3BvbnNlTWVzc2FnZSgpO1xuICAgICAgICBjb25zdCB2ZXJzaW9uRmlsZT0gVXRpbGl0aWVzLmdlbmVyYXRlTnVtYmVyVG9rZW4oMTAsOTkpO1xuICAgICAgICBjb25zdCBmaWxlbmFtZSA9IGAkeyBuYW1lIH0keyB2ZXJzaW9uRmlsZSB9LiR7IG1pbWV0eXBlcy5kZXRlY3RFeHRlbnNpb24obWltZVR5cGUpIH1gO1xuICAgICAgICBjb25zdCBmaWxlID0gZmlyZWJhc2VBZG1pbnNTdG9yYWdlLmZpbGUoYCR7IHBhdGh9LyR7IGZpbGVuYW1lfWApO1xuICAgICAgICBjb25zdCBmaWxlVXJsID0gYCR7IEJBU0VfVVJMX1NUT1JBR0UgfS8keyBmaXJlYmFzZUFkbWluc1N0b3JhZ2UubmFtZSB9LyR7IHBhdGggfS8keyBmaWxlbmFtZSB9YDtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgIGF3YWl0IGZpbGUuc2F2ZShmaWxlQnVmZmVyLHtcbiAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBtaW1lVHlwZVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBwdWJsaWM6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXNwb25zZU1lc3NhZ2UuY3JlYXRlKCdGaWxlIHVwbG9hZGVkJyxudWxsLHtzdWNjZXNzOiB0cnVlLCBmaWxlVXJsfSk7XG5cbiAgICAgICAgfWNhdGNoKGV4Y2VwdGlvbil7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciB1cGxvYWRpbmcgZmlsZSB0byBHb29nbGUgU3RvcmFnZTogJywgZXhjZXB0aW9uKTtcbiAgICAgICAgICAgIHJlc3BvbnNlTWVzc2FnZS5jcmVhdGUoJ0Vycm9yIHVwbG9hZGluZyBmaWxlIHRvIEdvb2dsZSBTdG9yYWdlJyxudWxsLHtzdWNjZXNzOiBmYWxzZX0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZU1lc3NhZ2U7XG4gICAgfSxcbiAgICBhc3luYyBzYXZlRmlsZUZyb21CYXNlNjRUb0dvb2dsZVN0b3JhZ2UoYmFzZTY0ZmlsZSxuYW1lLHBhdGgpe1xuICAgICAgICBjb25zdCBtaW1lVHlwZSA9IGJhc2U2NGZpbGUubWF0Y2goL2RhdGE6KFthLXpBLVowLTldK1xcL1thLXpBLVowLTktLitdKykuKiwuKi8pWzFdO1xuICAgICAgICBjb25zdCBiYXNlNjRFbmNvZGVkSW1hZ2VTdHJpbmc9IGJhc2U2NGZpbGUuc3BsaXQoJztiYXNlNjQsJykucG9wKCk7XG4gICAgICAgIGNvbnN0IGZpbGVCdWZmZXI9IEJ1ZmZlci5mcm9tKGJhc2U2NEVuY29kZWRJbWFnZVN0cmluZywnYmFzZTY0Jyk7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnNhdmVGaWxlRnJvbUJ1ZmZlclRvR29vZ2xlU3RvcmFnZShmaWxlQnVmZmVyLG5hbWUscGF0aCxtaW1lVHlwZSk7XG4gICAgfSxcbiAgICBhc3luYyBkZWxldGVGaWxlRnJvbUdvb2dsZVN0b3JlSWZFeGlzdHMoZmlsZUxvY2F0aW9uKXtcbiAgICAgICAgY29uc3QgZmlsZSA9IGZpcmViYXNlQWRtaW5zU3RvcmFnZS5maWxlKGZpbGVMb2NhdGlvbik7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0c0ZpbGUgPSBhd2FpdCBmaWxlLmV4aXN0cygpO1xuICAgICAgICAgICAgaWYoZXhpc3RzRmlsZVswXSl7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGZpbGUuZGVsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1jYXRjaChleGNlcHRpb24pe1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignSGEgaGFiaWRvIHVuIGVycm9yIGFsIGJvcnJhciBhcmNoaXZvIGRlIEdvb2dsZSBTdG9yZScsIGV4Y2VwdGlvbik7XG4gICAgICAgIH1cblxuICAgIH0sXG4gICAgYXN5bmMgZGVsZXRlRmlsZXNPZkZvbGRlckZyb21Hb29nbGVTdG9yYWdlKHVzZXJGb2xkZXIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IGZpcmViYXNlQWRtaW5zU3RvcmFnZS5kZWxldGVGaWxlcyh7cHJlZml4OiB1c2VyRm9sZGVyICsgJy8nfSk7XG4gICAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZGVsZXRpbmcgZmlsZXMgZnJvbSBHb29nbGUgU3RvcmFnZScpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFJlc3BvbnNlTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5tZXNzYWdlPW51bGw7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICB0aGlzLmRhdGE9bnVsbDtcbiAgICB9XG5cbiAgICBjcmVhdGUobWVzc2FnZSxkZXNjcmlwdGlvbiA9bnVsbCxkYXRhID1udWxsKXtcbiAgICAgICAgdGhpcy5tZXNzYWdlPW1lc3NhZ2U7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb249ZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuZGF0YT1kYXRhO1xuXG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IHtcblxuICAgIGdlbmVyYXRlTnVtYmVyVG9rZW4obWluLCBtYXgpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnbWluICcsIG1pbik7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ21heCAnLG1heCk7XG4gICAgICAgIGNvbnN0IG51bT0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCsxLW1pbikgK21pbiApO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdyYW5kb20gJyAsIG51bSk7XG4gICAgICAgIHJldHVybiBudW07XG4gICAgfVxufTtcblxuIiwiaW1wb3J0IHsgUm9sZXMgfSBmcm9tICdtZXRlb3IvYWxhbm5pbmc6cm9sZXMnO1xuXG5cbmNvbnN0IFBlcm1pc3Npb25zPXtcbiAgICBVU0VSUzp7XG4gICAgICAgIExJU1Q6e1ZBTFVFOid1c2Vycy12aWV3JyxURVhUOidMaXN0YXIgdXN1YXJpb3MnfSxcbiAgICAgICAgQ1JFQVRFOntWQUxVRTondXNlcnMtY3JlYXRlJyxURVhUOidDcmVhciBVc3VhcmlvJ30sXG4gICAgICAgIFVQREFURTp7VkFMVUU6J3VzZXJzLWVkaXQnLFRFWFQ6J0VkaXRhciBVc3VhcmlvJ30sXG4gICAgICAgIERFTEVURTp7VkFMVUU6J3VzZXJzLWRlbGV0ZScsVEVYVDonQm9ycmFyIFVzdWFyaW8nfVxuICAgIH0sXG4gICAgUFJPRklMRVM6e1xuICAgICAgICBMSVNUOntWQUxVRToncHJvZmlsZXMtdmlldycsVEVYVDonTGlzdGFyIHBlcmZpbCd9LFxuICAgICAgICBDUkVBVEU6e1ZBTFVFOidwcm9maWxlcy1jcmVhdGUnLFRFWFQ6J0NyZWFyIHBlcmZpbCd9LFxuICAgICAgICBVUERBVEU6e1ZBTFVFOidwcm9maWxlcy1lZGl0JyxURVhUOidFZGl0YXIgcGVyZmlsJ30sXG4gICAgICAgIERFTEVURTp7VkFMVUU6J3Byb2ZpbGVzLWRlbGV0ZScsVEVYVDonQm9ycmFyIHBlcmZpbCd9XG4gICAgfSxcbiAgICBQRVJNSVNTSU9OUzp7XG4gICAgICAgIExJU1Q6e1ZBTFVFOidwZXJtaXNzaW9ucy12aWV3JyxURVhUOidMaXN0YXIgcGVybWlzb3MnfVxuICAgIH0sXG4gICAgQURNSU5TOntcbiAgICAgICAgTElTVF9BRE1JTlM6e1ZBTFVFOidhZG1pbnMtdmlldycsVEVYVDonTGlzdGFyIGFkbWluaXN0cmFkb3InfSxcbiAgICAgICAgQ1JFQVRFX0FETUlOOntWQUxVRTonYWRtaW5zLWNyZWF0ZScsVEVYVDonQ3JlYXIgYWRtaW5pc3RyYWRvcid9LFxuICAgICAgICBVUERBVEVfQURNSU46e1ZBTFVFOidhZG1pbnMtZWRpdCcsVEVYVDonRWRpdGFyIGFkbWluaXN0cmFkb3InfSxcbiAgICAgICAgREVMRVRFX0FETUlOOntWQUxVRTonYWRtaW5zLWRlbGV0ZScsVEVYVDonQm9ycmFyIGFkbWluaXN0cmFkb3InfVxuICAgIH0sXG4gICAgU1VQRVJBRE1JTlM6e1xuICAgICAgICBMSVNUX1NVUEVSX0FETUlOUzp7VkFMVUU6J3N1cGVyYWRtaW5zLXZpZXcnLFRFWFQ6J0xpc3RhciBzdXBlciBhZG1pbmlzdHJhZG9yJ30sXG4gICAgICAgIENSRUFURV9TVVBFUl9BRE1JTjp7VkFMVUU6J3N1cGVyYWRtaW5zLWNyZWF0ZScsVEVYVDonQ3JlYXIgc3VwZXIgYWRtaW5pc3RyYWRvcid9LFxuICAgICAgICBVUERBVEVfU1VQRVJfQURNSU46e1ZBTFVFOidzdXBlcmFkbWlucy1lZGl0JyxURVhUOidFZGl0YXIgc3VwZXIgYWRtaW5pc3RyYWRvcid9LFxuICAgICAgICBERUxFVEVfU1VQRVJfQURNSU46e1ZBTFVFOidzdXBlcmFkbWlucy1kZWxldGUnLFRFWFQ6J0JvcnJhciBzdXBlciBhZG1pbmlzdHJhZG9yJ31cblxuICAgIH0sXG4gICAgQ0hBVDoge1xuICAgICAgICBDUkVBVEU6IHsgVkFMVUU6ICdtZXNzYWdlLWNyZWF0ZScsIFRFWFQ6ICdFbnZpYXIgbWVuc2FqZSBkZSBjaGF0J30sXG4gICAgICAgIExJU1Q6IHsgVkFMVUU6ICdtZXNzYWdlLXZpZXcnLCBURVhUOiAnVmVyIG1lbnNhamVzIGRlIGNoYXQnfVxuICAgIH0sXG4gICAgQ09NUEFOSUVTOntcbiAgICAgICAgTElTVDp7VkFMVUU6J2NvbXBhbmllcy12aWV3JyxURVhUOidMaXN0YXIgY29tcGHDsWlhcyd9LFxuICAgICAgICBDUkVBVEU6e1ZBTFVFOidjb21wYW5pZXMtY3JlYXRlJyxURVhUOidDcmVhciBjb21wYcOxaWFzJ30sXG4gICAgICAgIFVQREFURTp7VkFMVUU6J2NvbXBhbmllcy1lZGl0JyxURVhUOidFZGl0YXIgY29tcGHDsWlhcyd9LFxuICAgICAgICBERUxFVEU6e1ZBTFVFOidjb21wYW5pZXMtZGVsZXRlJyxURVhUOidCb3JyYXIgY29tcGHDsWlhcyd9XG5cbiAgICB9LFxuICAgIFBST0RVQ1RJT05MSU5FUzp7XG4gICAgICAgIExJU1Q6e1ZBTFVFOidwcm9kdWN0aW9ubGluZXMtdmlldycsVEVYVDonTGlzdGFyIGxpbmVhIGRlIHByb2R1Y2Npb24nfSxcbiAgICAgICAgQ1JFQVRFOntWQUxVRToncHJvZHVjdGlvbmxpbmVzLWNyZWF0ZScsVEVYVDonQ3JlYXIgbGluZWEgZGUgcHJvZHVjY2lvbid9LFxuICAgICAgICBVUERBVEU6e1ZBTFVFOidwcm9kdWN0aW9ubGluZXMtZWRpdCcsVEVYVDonRWRpdGFyIGxpbmVhIGRlIHByb2R1Y2Npb24nfSxcbiAgICAgICAgREVMRVRFOntWQUxVRToncHJvZHVjdGlvbmxpbmVzLWRlbGV0ZScsVEVYVDonQm9ycmFyIGxpbmVhIGRlIHByb2R1Y2Npb24nfVxuXG4gICAgfSxcbiAgICBQUk9EVUNUSU9OT1JERVJTOntcbiAgICAgICAgTElTVDp7VkFMVUU6J3Byb2R1Y3Rpb25vcmRlcnMtdmlldycsVEVYVDonTGlzdGFyIG9yZGVuIGRlIHByb2R1Y2Npb24nfSxcbiAgICAgICAgQ1JFQVRFOntWQUxVRToncHJvZHVjdGlvbm9yZGVycy1jcmVhdGUnLFRFWFQ6J0NyZWFyIG9yZGVuZXMgZGUgcHJvZHVjY2lvbid9LFxuICAgICAgICBVUERBVEU6e1ZBTFVFOidwcm9kdWN0aW9ub3JkZXJzLWVkaXQnLFRFWFQ6J0VkaXRhciBvcmRlbiBkZSBwcm9kdWNjaW9uJ30sXG4gICAgICAgIERFTEVURTp7VkFMVUU6J3Byb2R1Y3Rpb25vcmRlcnMtZGVsZXRlJyxURVhUOidCb3JyYXIgb3JkZW4gZGUgcHJvZHVjY2lvbid9XG5cbiAgICB9LFxuICAgIFBST0RVQ1RTOntcbiAgICAgICAgTElTVDp7VkFMVUU6J3Byb2R1Y3RzLXZpZXcnLFRFWFQ6J0xpc3RhciBwcm9kdWN0b3MnfSxcbiAgICAgICAgQ1JFQVRFOntWQUxVRToncHJvZHVjdHMtY3JlYXRlJyxURVhUOidDcmVhciBwcm9kdWN0b3MnfSxcbiAgICAgICAgVVBEQVRFOntWQUxVRToncHJvZHVjdHMtZWRpdCcsVEVYVDonRWRpdGFyIHByb2R1Y3RvJ30sXG4gICAgICAgIERFTEVURTp7VkFMVUU6J3Byb2R1Y3RzLWRlbGV0ZScsVEVYVDonQm9ycmFyIHByb2R1Y3RvJ31cblxuICAgIH0sXG4gICAgUFJPVklERVJTVEFUSU9OUzp7XG4gICAgICAgIExJU1Q6e1ZBTFVFOidwcm92aWRlcnN0YXRpb25zLXZpZXcnLFRFWFQ6J0xpc3RhciBlc3RhY2lvbmVzIGRlIHN1bWluaXN0cm8nfSxcbiAgICAgICAgQ1JFQVRFOntWQUxVRToncHJvdmlkZXJzdGF0aW9ucy1jcmVhdGUnLFRFWFQ6J0NyZWFyIGVzdGFjaW9uIGRlIHN1bWluaXN0cm8nfSxcbiAgICAgICAgVVBEQVRFOntWQUxVRToncHJvdmlkZXJzdGF0aW9ucy1lZGl0JyxURVhUOidFZGl0YXIgZXN0YWNpb24gZGUgc3VtaW5pc3Rybyd9LFxuICAgICAgICBERUxFVEU6e1ZBTFVFOidwcm92aWRlcnN0YXRpb25zLWRlbGV0ZScsVEVYVDonQm9ycmFyIGVzdGFjaW9uIGRlIHN1bWluaXN0cm8nfVxuXG4gICAgfSxcbiAgICBXQVJFSE9VU0VTOntcbiAgICAgICAgTElTVDp7VkFMVUU6J3dhcmVob3VzZXMtdmlldycsVEVYVDonTGlzdGFyIGFsbWFjZW5lcyd9LFxuICAgICAgICBDUkVBVEU6e1ZBTFVFOid3YXJlaG91c2VzLWNyZWF0ZScsVEVYVDonQ3JlYXIgYWxtYWNlbid9LFxuICAgICAgICBVUERBVEU6e1ZBTFVFOid3YXJlaG91c2VzLWVkaXQnLFRFWFQ6J0VkaXRhciBhbG1hY2VuJ30sXG4gICAgICAgIERFTEVURTp7VkFMVUU6J3dhcmVob3VzZXMtZGVsZXRlJyxURVhUOidCb3JyYXIgYWxtYWNlbid9XG5cbiAgICB9LFxuICAgIFdPUktTVEFUSU9OUzp7XG4gICAgICAgIExJU1Q6e1ZBTFVFOid3b3Jrc3RhdGlvbnMtdmlldycsVEVYVDonTGlzdGFyIGVzdGFjaW9uZXMgZGUgdHJhYmFqbyd9LFxuICAgICAgICBDUkVBVEU6e1ZBTFVFOid3b3Jrc3RhdGlvbnMtY3JlYXRlJyxURVhUOidDcmVhciBlc3RhY2lvbiBkZSB0cmFiYWpvJ30sXG4gICAgICAgIFVQREFURTp7VkFMVUU6J3dvcmtzdGF0aW9ucy1lZGl0JyxURVhUOidFZGl0YXIgZXN0YWNpb24gZGUgdHJhYmFqbyd9LFxuICAgICAgICBERUxFVEU6e1ZBTFVFOid3b3Jrc3RhdGlvbnMtZGVsZXRlJyxURVhUOidCb3JyYXIgZXN0YWNpb24gZGUgdHJhYmFqbyd9XG5cbiAgICB9LFxuICAgIFBST1ZJREVSUzp7XG4gICAgICAgIExJU1Q6e1ZBTFVFOidwcm92aWRlcnMtdmlldycsVEVYVDonTGlzdGFyIHByb3ZlZWRvcmVzJ30sXG4gICAgICAgIENSRUFURTp7VkFMVUU6J3Byb3ZpZGVycy1jcmVhdGUnLFRFWFQ6J0NyZWFyIHByb3ZlZWRvcmUnfSxcbiAgICAgICAgVVBEQVRFOntWQUxVRToncHJvdmlkZXJzLWVkaXQnLFRFWFQ6J0VkaXRhciBwcm92ZWVkb3JlJ30sXG4gICAgICAgIERFTEVURTp7VkFMVUU6J3Byb3ZpZGVycy1kZWxldGUnLFRFWFQ6J0JvcnJhciBwcm92ZWVkb3JlJ31cblxuICAgIH0sXG5cbn07XG5cbmV4cG9ydCBjb25zdCBwZXJtaXNzaW9uc0FycmF5PSBPYmplY3Qua2V5cyhQZXJtaXNzaW9ucykucmVkdWNlKChhY2N1bXVsYXRvciwgc3lzdGVtTW9kdWxlTmFtZSk9PntcbiAgICBjb25zdCBzeXN0ZW1Nb2R1bGVPYmplY3Q9IFBlcm1pc3Npb25zW3N5c3RlbU1vZHVsZU5hbWVdO1xuICAgIGNvbnN0IG1vZHVsZVBlcm1pc3Npb25zPSBPYmplY3Qua2V5cyhzeXN0ZW1Nb2R1bGVPYmplY3QpLm1hcChwZXJtaXNzaW9uPT4gc3lzdGVtTW9kdWxlT2JqZWN0W3Blcm1pc3Npb25dKTtcbiAgICByZXR1cm4gYWNjdW11bGF0b3IuY29uY2F0KG1vZHVsZVBlcm1pc3Npb25zKTtcbn0sW10pO1xuXG4vKlxuRGV2dWVsdmUgZXN0bzpcblxuW1xuICB7IFZBTFVFOiAndXNlcnMtdmlldycsIFRFWFQ6ICdMaXN0YXIgdXN1YXJpb3MnIH0sXG4gIHsgVkFMVUU6ICd1c2Vycy1jcmVhdGUnLCBURVhUOiAnQ3JlYXIgVXN1YXJpbycgfSxcbiAgeyBWQUxVRTogJ3VzZXJzLWVkaXQnLCBURVhUOiAnRWRpdGFyIFVzdWFyaW8nIH0sXG4gIHsgVkFMVUU6ICd1c2Vycy1kZWxldGUnLCBURVhUOiAnQm9ycmFyIFVzdWFyaW8nIH0sXG4gIHsgVkFMVUU6ICd1c2Vycy1hZG1pbicsIFRFWFQ6ICdBZG1pbmlzdHJhciAgVXN1YXJpb3MnIH0sXG4gIHsgVkFMVUU6ICd1c2Vycy1zdXBlci1hZG1pbicsIFRFWFQ6ICdTdXBlciB1c3VhcmlvJyB9XG5dXG5cbiAqL1xuaWYoTWV0ZW9yLnNldHRpbmdzLnByaXZhdGUgJiYgTWV0ZW9yLnNldHRpbmdzLnByaXZhdGUuUkVGUkVTSF9QRVJNSVNTSU9OUyl7XG4gICAgY29uc29sZS5sb2coJyBVcGRhdGluZyBwZXJtaXNzaW9ucy4uLicpO1xuICAgIGNvbnN0IGN1cnJlbnRSb2xlcz0gUm9sZXMuZ2V0QWxsUm9sZXMoKS5mZXRjaCgpO1xuICAgIGZvcihsZXQgcGVybWlzc2lvbiBvZiBwZXJtaXNzaW9uc0FycmF5KXtcbiAgICAgICAgbGV0IGV4aXN0cz0gY3VycmVudFJvbGVzLmZpbmQoX3JvbGU9PiBfcm9sZS5faWQ9PXBlcm1pc3Npb24uVkFMVUUpXG4gICAgICAgIGlmKCFleGlzdHMpe1xuICAgICAgICAgICAgUm9sZXMuY3JlYXRlUm9sZShwZXJtaXNzaW9uLlZBTFVFKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBNZXRlb3Iucm9sZXMudXBkYXRlKHBlcm1pc3Npb24uVkFMVUUsIHtcbiAgICAgICAgICAgICAgICAkc2V0OntcbiAgICAgICAgICAgICAgICAgICAgcHVibGljTmFtZTpwZXJtaXNzaW9uLlRFWFRcbiAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG59ZWxzZXtcbiAgICBjb25zb2xlLmxvZygnTm90IFVwZGF0aW5nIHBlcm1pc3Npb25zLi4uJyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBlcm1pc3Npb25zO1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vTWV0ZW9yLUNvbW11bml0eS1QYWNrYWdlcy9tZXRlb3Itcm9sZXMiLCJpbXBvcnQgJy4vUGVybWlzc2lvbnMnO1xuaW1wb3J0ICcuL3NlcnZpY2VzL01haWxTZXJ2JztcbmltcG9ydCAnLi4vLi4vYXBpL1VzZXJzL1VzZXJzQ3RybCc7XG5pbXBvcnQgJy4uLy4uL2FwaS9Vc2Vycy9Vc2VyJztcbmltcG9ydCAnLi4vLi4vYXBpL1VzZXJzL1VzZXJzUHVicyc7XG5pbXBvcnQgJy4uLy4uL2FwaS9Qcm9maWxlcy9Qcm9maWxlU2VlZGVyJztcbmltcG9ydCAnLi4vLi4vYXBpL1Byb2ZpbGVzL1Byb2ZpbGVDdGwnO1xuaW1wb3J0ICcuLi8uLi9hcGkvUHJvZmlsZXMvUHJvZmlsZXNTZXJ2JztcbmltcG9ydCAnLi4vLi4vYXBpL1Byb2ZpbGVzL1Byb2ZpbGVzUHVicyc7XG5pbXBvcnQgJy4uLy4uL2FwaS9QZXJtaXNzaW9ucy9QZXJtaXNzaW9uQ3RsJztcbmltcG9ydCAnLi4vLi4vYXBpL1Blcm1pc3Npb25zL1Blcm1pc3Npb25QdWJzJztcbmltcG9ydCAnLi4vLi4vYXBpL1N5c3RlbU9wdGlvbnMvU3lzdGVtT3B0aW9uc0N0bCc7XG5pbXBvcnQgJy4uL3NlcnZlci9zZXJ2aWNlcy9GaXJlYmFzZUFkbWluJztcbmltcG9ydCAnLi4vLi4vYXBpL01lc3NhZ2VzL01lc3NhZ2UnO1xuaW1wb3J0ICcuLi8uLi9hcGkvTWVzc2FnZXMvTWVzc2FnZXNDdGwnO1xuaW1wb3J0ICcuLi8uLi9hcGkvTWVzc2FnZXMvTWVzc2FnZVB1YnMnO1xuaW1wb3J0ICcuLi8uLi9hcGkvTWVzc2FnZXMvTWVzc2FnZVNlZWRlcic7XG5pbXBvcnQgJy4uLy4uL2FwaS9Db21wYW5pZXMvQ29tcGFueSc7XG5pbXBvcnQgJy4uLy4uL2FwaS9Db21wYW5pZXMvQ29tcGFueUN0bCc7XG5pbXBvcnQgJy4uLy4uL2FwaS9Db21wYW5pZXMvQ29tcGFueVB1YnMnO1xuaW1wb3J0ICcuLi8uLi9hcGkvQ29tcGFuaWVzL0NvbXBhbnlTZXJ2JztcbmltcG9ydCAnLi4vLi4vYXBpL1dvcmtzdGF0aW9ucy9Xb3JrU3RhdGlvbic7XG5pbXBvcnQgJy4uLy4uL2FwaS9Xb3Jrc3RhdGlvbnMvV29ya1N0YXRpb25DdGwnO1xuaW1wb3J0ICcuLi8uLi9hcGkvV29ya3N0YXRpb25zL1dvcmtTdGF0aW9uUHVicyc7XG5pbXBvcnQgJy4uLy4uL2FwaS9Xb3Jrc3RhdGlvbnMvV29ya1N0YXRpb25TZXJ2JztcbmltcG9ydCAnLi4vLi4vYXBpL1Byb2R1Y3Rpb25MaW5lcy9Qcm9kdWN0aW9uTGluZSc7XG5pbXBvcnQgJy4uLy4uL2FwaS9Qcm9kdWN0aW9uTGluZXMvUHJvZHVjdGlvbkxpbmVDdGwnO1xuaW1wb3J0ICcuLi8uLi9hcGkvUHJvZHVjdGlvbkxpbmVzL1Byb2R1Y3Rpb25MaW5lc1B1YnMnO1xuaW1wb3J0ICcuLi8uLi9hcGkvUHJvZHVjdGlvbkxpbmVzL1Byb2R1Y3Rpb25MaW5lc1NlcnYnO1xuaW1wb3J0ICcuLi8uLi9hcGkvUHJvZHVjdGlvbkxpbmVzL1Byb2R1Y3Rpb25MaW5lU2VlZGVyJztcbmltcG9ydCAnLi4vLi4vYXBpL1dhcmVob3VzZXMvV2FyZWhvdXNlJztcbmltcG9ydCAnLi4vLi4vYXBpL1dhcmVob3VzZXMvV2FyZWhvdXNlQ3RsJztcbmltcG9ydCAnLi4vLi4vYXBpL1dhcmVob3VzZXMvV2FyZWhvdXNlUHVicyc7XG5pbXBvcnQgJy4uLy4uL2FwaS9XYXJlaG91c2VzL1dhcmVob3VzZVNlZWRlcic7XG5pbXBvcnQgJy4uLy4uL2FwaS9XYXJlaG91c2VzL1dhcmVob3VzZVNlcnYnO1xuaW1wb3J0ICcuLi8uLi9hcGkvUHJvdmlkZXJzL1Byb3ZpZGVyJztcbmltcG9ydCAnLi4vLi4vYXBpL1Byb3ZpZGVycy9Qcm92aWRlckN0bCc7XG5pbXBvcnQgJy4uLy4uL2FwaS9Qcm92aWRlcnMvUHJvdmlkZXJQdWJzJztcbmltcG9ydCAnLi4vLi4vYXBpL1Byb3ZpZGVycy9Qcm92aWRlclNlZWRlcic7XG5pbXBvcnQgJy4uLy4uL2FwaS9Qcm92aWRlcnMvUHJvdmlkZXJTZXJ2JztcbmltcG9ydCAnLi4vLi4vYXBpL1Byb2R1Y3RzL1Byb2R1Y3QnO1xuaW1wb3J0ICcuLi8uLi9hcGkvUHJvZHVjdHMvUHJvZHVjdEN0bCc7XG5pbXBvcnQgJy4uLy4uL2FwaS9Qcm9kdWN0cy9Qcm9kdWN0UHVicyc7XG5pbXBvcnQgJy4uLy4uL2FwaS9Qcm9kdWN0cy9Qcm9kdWN0U2VlZGVyJztcbmltcG9ydCAnLi4vLi4vYXBpL1Byb2R1Y3RzL1Byb2R1Y3RTZXJ2JztcblxuXG5cbi8vIEVqZW1wbG9zIGRlIGNyZWFjaW9uIGRlIG1ldG9kb3MgbyBFbmQgUG9pbnRzXG5pbXBvcnQge1ZhbGlkYXRlZE1ldGhvZH0gZnJvbSAnbWV0ZW9yL21kZzp2YWxpZGF0ZWQtbWV0aG9kJztcbmltcG9ydCB7Y2hlY2t9IGZyb20gJ21ldGVvci9jaGVjayc7XG5NZXRlb3IubWV0aG9kcygge1xuICAgIHRlc3RtZXRob2QoKXtcbiAgICAgICAgY29uc29sZS5sb2coJ0hvbGEgbXVuZG8nKVxuICAgICAgICByZXR1cm4gJ0VzdGUgZXMgdW4gZW5kIHBvaW50JztcbiAgICB9LFxuICAgIHN1bWEoYSxiKXtcbiAgICAgICAgcmV0dXJuIHtyZXN1bHQ6IGEgKyAgYn07XG4gICAgfSxcbiAgICBjb25uZWN0aW9uRGF0YSgpe1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICAgICAgaWYodXNlcklkKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVc3VzYXJpbyBsb2dlYWRvJyk7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVc3VhcmlvIG5vIGVzdGEgbG9nZWFkbycpO1xuXG4gICAgICAgIH1cbiAgICAgICAgLypcbiAgICAgICAgRGF0b3MgZGVsIGNvbnRleHRvXG5cbiAgICAgICAgICAgIEkyMDIxMDIxOS0xNzoxNjoyMy42NzcoLTYpPyAgIGlzU2ltdWxhdGlvbjogZmFsc2UsXG4gICAgICAgICAgICBJMjAyMTAyMTktMTc6MTY6MjMuNjc3KC02KT8gICBfdW5ibG9jazogW0Z1bmN0aW9uXSxcbiAgICAgICAgICAgIEkyMDIxMDIxOS0xNzoxNjoyMy42NzcoLTYpPyAgIF9jYWxsZWRVbmJsb2NrOiBmYWxzZSxcbiAgICAgICAgICAgIEkyMDIxMDIxOS0xNzoxNjoyMy42NzgoLTYpPyAgIHVzZXJJZDogbnVsbCxcbiAgICAgICAgICAgIEkyMDIxMDIxOS0xNzoxNjoyMy42NzgoLTYpPyAgIF9zZXRVc2VySWQ6IFtGdW5jdGlvbjogc2V0VXNlcklkXSxcbiAgICAgICAgICAgIEkyMDIxMDIxOS0xNzoxNjoyMy42NzgoLTYpPyAgIGNvbm5lY3Rpb246IG51bGwsXG4gICAgICAgICAgICBJMjAyMTAyMTktMTc6MTY6MjMuNjc4KC02KT8gICByYW5kb21TZWVkOiBudWxsLFxuICAgICAgICAgICAgSTIwMjEwMjE5LTE3OjE2OjIzLjY3OCgtNik/ICAgcmFuZG9tU3RyZWFtOiBudWxsXG4gICAgICAgICAgICBJMjAyMTAyMTktMTc6MTY6MjMuNjc4KC02KT8gfVxuXG4gICAgICAgICAqL1xuXG4gICAgfSwgYXN5bmMgZGVsYXlGdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgZGVsYXlNZXNzYWdlID0gJ0FudGVzJztcbiAgICAgICAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSggIHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGF5TWVzc2FnZSA9IFwiRGVzcHVlc1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LDIwMDApXG4gICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlbGF5TWVzc2FnZTtcbiAgICAgICAgfVxufSlcblxubmV3IFZhbGlkYXRlZE1ldGhvZCgge1xuICAgIG5hbWU6J211bHRpcGxpY2FjaW9uJyxcbiAgICB2YWxpZGF0ZSh7YSxifSl7XG4gICAgICAgIGNoZWNrKGEsTnVtYmVyKTtcbiAgICAgICAgY2hlY2soYiwgTnVtYmVyKTtcblxuICAgIH0scnVuKHthLGJ9KXtcbiAgICAgICAgcmV0dXJuIHtyZXN1bHQ6IGEqYn07XG4gICAgICAgIH1cbn1cbik7XG5cbm5ldyBWYWxpZGF0ZWRNZXRob2QoIHtcbiAgICBuYW1lOidtdWx0aXBsaWNhdGlvbicsXG4gICAgICAgIHZhbGlkYXRlOiBudWxsLFxuICAgIHJ1bih7YSxifSl7ICAvLyBzZSBlalxuICAgIHJldHVybiB7IHJlc3VsdDogYSpifTtcblxuICAgIH1cbn0pO1xuIiwiQWNjb3VudHMuY29uZmlnKHtcbiAgICBsb2dpbkV4cGlyYXRpb25JbkRheXM6MSAgLy8gTnVtZXJvIGRlIGRpYXMgcGFyYSBleHBpcmFyIGVsIHRva2VuXG59KTsiLCJpbXBvcnQgeyBNb25nbyB9IGZyb20gJ21ldGVvci9tb25nbyc7XG5cbmV4cG9ydCBjb25zdCBDb21wYW55ID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oJ2NvbXBhbmllcycpOyIsImltcG9ydCB7VmFsaWRhdGVkTWV0aG9kfSBmcm9tICdtZXRlb3IvbWRnOnZhbGlkYXRlZC1tZXRob2QnO1xuaW1wb3J0IHtSZXNwb25zZU1lc3NhZ2V9IGZyb20gXCIuLi8uLi9zdGFydHVwL3NlcnZlci91dGlsaXRpZXMvUmVzcG9uc2VNZXNzc2FnZVwiO1xuaW1wb3J0IEF1dGhHdWFyZCBmcm9tIFwiLi4vLi4vbWlkZGxld2FyZXMvQXV0aEd1YXJkXCI7XG5pbXBvcnQgUGVybWlzc2lvbnMgZnJvbSBcIi4uLy4uL3N0YXJ0dXAvc2VydmVyL1Blcm1pc3Npb25zXCI7XG5pbXBvcnQge0NvbXBhbnl9IGZyb20gXCIuL0NvbXBhbnlcIjtcbmltcG9ydCBDb21wYW55U2VydiBmcm9tIFwiLi9Db21wYW55U2VydlwiO1xuaW1wb3J0IHtjaGVjaywgTWF0Y2h9IGZyb20gXCJtZXRlb3IvY2hlY2tcIjtcblxubmV3IFZhbGlkYXRlZE1ldGhvZCh7XG4gICAgbmFtZTonY29tcGFueS5zYXZlJyxcbiAgICAgbWl4aW5zOltNZXRob2RIb29rc10sXG4gICAgIHBlcm1pc3Npb25zOiBbUGVybWlzc2lvbnMuQ09NUEFOSUVTLkNSRUFURS5WQUxVRSxQZXJtaXNzaW9ucy5DT01QQU5JRVMuVVBEQVRFLlZBTFVFXSwgIFxuICAgICBiZWZvcmVIb29rczogW0F1dGhHdWFyZC5jaGVja1Blcm1pc3Npb25dLFxuICAgIHZhbGlkYXRlKGNvbXBhbnkpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPYmogRW1wcmVzYVwiLGNvbXBhbnkpO1xuICAgICAgICAgICAgY2hlY2soY29tcGFueSx7XG4gICAgICAgICAgICAgICAgX2lkOiBNYXRjaC5PbmVPZihTdHJpbmcsIG51bGwpLFxuICAgICAgICAgICAgICAgIG5hbWU6IFN0cmluZyxcbiAgICAgICAgICAgICAgICBuYW1lX2Z1bGw6IFN0cmluZyxcbiAgICAgICAgICAgICAgICBjb21wYW55QnVzc2luZXNzSWQ6IFN0cmluZyxcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgcGhvbmVzOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgd2ViOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgZW1haWw6IFN0cmluZyxcbiAgICAgICAgICAgICAgICBpc0F2YWlsYWJsZTogQm9vbGVhblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfWNhdGNoICggZXhjZXB0aW9uKXtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2NvbXBhbnkuc2F2ZScsIGV4Y2VwdGlvbik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc0MDMnLCAnTGEgaW5mb3JtYWNpb24gaW50cm9kdWNpZGEgbm8gZXMgdmFsaWRhJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVmFsaWRhciBxdWUgbm8gaGF5YSBjb21wYcOxaWFzIGNvbiBlbCBtaXNtbyBub21icmUgeSBCdXNzaW5lc0lEXG4gICAgICAgIENvbXBhbnlTZXJ2LnZhbGlkYXRlQ29tcGFueUJ1c3NpbmVzc0lkKGNvbXBhbnkuY29tcGFueUJ1c3NpbmVzc0lkLGNvbXBhbnkuX2lkKTtcbiAgICAgICAgQ29tcGFueVNlcnYudmFsaWRhdGVDb21wYW55TmFtZShjb21wYW55Lm5hbWUsY29tcGFueS5faWQpO1xuICAgIH0sXG4gICAgcnVuKGNvbXBhbnkpe1xuICAgICAgICBjb25zdCByZXNwb25zZU1lc3NhZ2UgPSBuZXcgUmVzcG9uc2VNZXNzYWdlKCk7IFxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoY29tcGFueS5faWQgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIENvbXBhbnkudXBkYXRlKGNvbXBhbnkuX2lkLHtcbiAgICAgICAgICAgICAgICAgICAgJHNldDoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb21wYW55Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWVfZnVsbDogY29tcGFueS5uYW1lX2Z1bGwsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnlCdXNzaW5lc3NJZDogY29tcGFueS5jb21wYW55QnVzc2luZXNzSWQsXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IGNvbXBhbnkuYWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgcGhvbmVzOiBjb21wYW55LnBob25lcyxcbiAgICAgICAgICAgICAgICAgICAgd2ViOiBjb21wYW55LndlYixcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IGNvbXBhbnkuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgIGlzQXZhaWxhYmxlOiBjb21wYW55LmlzQXZhaWxhYmxlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXNwb25zZU1lc3NhZ2UuY3JlYXRlKCdTZSBhY3R1YWxpesOzIGxhIGVtcHJlc2EgZXhpdG9zYW1lbnRlJyk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBDb21wYW55Lmluc2VydCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGNvbXBhbnkubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZV9mdWxsOiBjb21wYW55Lm5hbWVfZnVsbCxcbiAgICAgICAgICAgICAgICAgICAgY29tcGFueUJ1c3NpbmVzc0lkOiBjb21wYW55LmNvbXBhbnlCdXNzaW5lc3NJZCxcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogY29tcGFueS5hZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICBwaG9uZXM6IGNvbXBhbnkucGhvbmVzLFxuICAgICAgICAgICAgICAgICAgICB3ZWI6IGNvbXBhbnkud2ViLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogY29tcGFueS5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgaXNBdmFpbGFibGU6IGNvbXBhbnkuaXNBdmFpbGFibGVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXNwb25zZU1lc3NhZ2UuY3JlYXRlKCdTZSBpbnNlcnTDsyBsYSBlbXByZXNhIGV4aXRvc2FtZW50ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9Y2F0Y2ggKCBleGNlcHRpb24pe1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignY29tcGFueS5zYXZlJywgZXhjZXB0aW9uKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzUwMCcsICdIYSBvY3VycmlkbyB1biBlcnJvciBhbCBndWFyZGFyIGxhIGVtcHJlc2EnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2VNZXNzYWdlO1xuICAgIH1cbiB9KTtcblxubmV3IFZhbGlkYXRlZE1ldGhvZCh7XG4gICAgbmFtZTogJ2NvbXBhbnkuZGVsZXRlJyxcbiAgICBtaXhpbnM6IFtNZXRob2RIb29rc10sXG4gICAgcGVybWlzc2lvbnM6IFtQZXJtaXNzaW9ucy5DT01QQU5JRVMuREVMRVRFLlZBTFVFXSxcbiAgICBiZWZvcmVIb29rczogW0F1dGhHdWFyZC5jaGVja1Blcm1pc3Npb25dLCAgLy8gQXF1aSBzZSB2ZXJpZmljYSBzaSBsb3MgcGVybWlzb3MgZGUgdXN1YXJpbyBzb24gYWRlY3VhZG9zIHBhcmEgZXN0YSBhY2Npb25cbiAgICBhZnRlckhvb2tzOiBbXSxcbiAgICB2YWxpZGF0ZSh7IGlkQ29tcGFueSB9KXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNoZWNrKGlkQ29tcGFueSwgU3RyaW5nKTtcbiAgICAgICAgfWNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2NvbXBhbnkuZGVsZXRlJywgZXhjZXB0aW9uKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzQwMycsICdPY3VycmlvIHVuIGVycm9yIGFsIGVsaW1pbmFyIGxhIGNvbXBhw7FpYScpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHZhbGlkYXIgcXVlIG5vIHNlYSBwb3NpYmxlIGVsaW1pbmFyIHVuYSBlbXByZXNhIHNpIGhheSB1biB1c3VhcmlvIHV0aWxpemFuZG9sby5cbiAgICAgICAgY29uc3QgdXNlcldpdGhDb21wYW55ID0gQ29tcGFueVNlcnYuZ2V0VXNlcnNCeWNvbXBhbnkoaWRDb21wYW55KTtcblxuICAgICAgICBpZiAodXNlcldpdGhDb21wYW55Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignNDAzJywnTm8gZXMgcG9zaWJsZSBlbGltaWFyIGxhIGVtcHJlc2EnLFxuICAgICAgICAgICAgICAgICdIYXkgYWwgbWVub3MgdW4gdXN1YXJpbyB1dGlsaXphbmRvIGxhIGVtcHJlc2EnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcnVuKHsgaWRDb21wYW55IH0pe1xuICAgICAgICBjb25zdCByZXNwb25zZU1lc3NhZ2UgPSBuZXcgUmVzcG9uc2VNZXNzYWdlKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgQ29tcGFueS5yZW1vdmUoaWRDb21wYW55KTtcbiAgICAgICAgICAgICAgICByZXNwb25zZU1lc3NhZ2UuY3JlYXRlKCdDb21wYcOxaWEgZWxpbWluYWRhIGV4aXRvc2FtZW50ZScpO1xuICAgICAgICB9Y2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcigncHJvZmlsZS5kZWxldGUnLCBleGNlcHRpb24pO1xuICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignNTAwJywgJ09jdXJyaW8gdW4gZXJyb3IgYWwgZWxpbWluYXIgbGEgZW1wcmVzYScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlTWVzc2FnZTtcbiAgICB9XG59KTtcbiIsImltcG9ydCB7IENvbXBhbnkgfSBmcm9tICcuL0NvbXBhbnknO1xuaW1wb3J0IHsgUGVybWlzc2lvbk1pZGRsZXdhcmUgfSBmcm9tICcuLi8uLi9taWRkbGV3YXJlcy9QZXJtaXNzaW9uTWlkZGxld2FyZSc7XG5pbXBvcnQgUGVybWlzc2lvbnMgZnJvbSAnLi4vLi4vc3RhcnR1cC9zZXJ2ZXIvUGVybWlzc2lvbnMnO1xuXG5jb25zdCBjb21wYW55UHVibGljYXRpb249bmV3IFB1Ymxpc2hFbmRwb2ludCgnY29tcGFueS5saXN0JyxmdW5jdGlvbihwYXJhbTEpe1xuICAgICAgICByZXR1cm4gQ29tcGFueS5maW5kKHt9LHtcbiAgICAgICAgICAgICAgICBzb3J0OntjcmVhdGVkQXQ6IC0xfVxuICAgICAgICB9KTtcbn0pO1xuXG5jb21wYW55UHVibGljYXRpb24udXNlKG5ldyBQZXJtaXNzaW9uTWlkZGxld2FyZShQZXJtaXNzaW9ucy5DT01QQU5JRVMuTElTVC5WQUxVRSkpOyIsIlxuaW1wb3J0IHtNZXRlb3J9IGZyb20gXCJtZXRlb3IvbWV0ZW9yXCI7XG5pbXBvcnQge0NvbXBhbnl9IGZyb20gXCIuL0NvbXBhbnlcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgdmFsaWRhdGVDb21wYW55QnVzc2luZXNzSWQobmV3Q29tcGFueUJ1c3NpbmVzSWQsaWRDb21wYW55KXtcblxuICAgICAgICBjb25zdCBleGlzdHNDb21wYW55PSBDb21wYW55LmZpbmRPbmUoe2NvbXBhbnlCdXNzaW5lc3NJZDpuZXdDb21wYW55QnVzc2luZXNJZH0pO1xuICAgICAgICBpZihpZENvbXBhbnkgIT09IG51bGwpeyAgLy8gYWN0dWFsaXphY2lvbiBkZSBDb21wYcOxaWFcbiAgICAgICAgICAgIGNvbnN0IG9sZENvbXBhbnk9IENvbXBhbnkuZmluZE9uZShpZENvbXBhbnkpO1xuICAgICAgICAgICAgaWYob2xkQ29tcGFueS5jb21wYW55QnVzc2luZXNzSWQgIT09IG5ld0NvbXBhbnlCdXNzaW5lc0lkICYmIGV4aXN0c0NvbXBhbnkpe1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzQwMycsICdFbCBudWV2byBSRkMgZGUgZW1wcmVzYSB5YSBlc3RhIHNpZW5kbyB1c2FkbycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZSBpZihleGlzdHNDb21wYW55KXsgLy8gZXMgY29tcGHDsWlhIG51ZXZvIHBlcm8gZWwgQ29tcGFueUJ1c3NpbmVzSWQgIHlhIGV4aXN0ZS5cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc0MDMnLCAnRWwgbnVldm8gUkZDIGRlIGVtcHJlc2EgIHlhIGVzdGEgc2llbmRvIHV0aWxpemFkbycpO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG4gICAgdmFsaWRhdGVDb21wYW55TmFtZShuZXdDb21wYW55TmFtZSxpZENvbXBhbnkpe1xuICAgICAgICBjb25zdCBleGlzdHNDb21wYW55PSBDb21wYW55LmZpbmRPbmUoe25hbWU6bmV3Q29tcGFueU5hbWV9KTtcbiAgICAgICAgaWYoaWRDb21wYW55ICE9PSBudWxsKXsgIC8vIGFjdHVhbGl6YWNpb24gZGUgQ29tcGHDsWlhXG4gICAgICAgICAgICBjb25zdCBvbGRDb21wYW55PSBDb21wYW55LmZpbmRPbmUoaWRDb21wYW55KTtcbiAgICAgICAgICAgIGlmKG9sZENvbXBhbnkubmFtZSAhPT0gbmV3Q29tcGFueU5hbWUgJiYgZXhpc3RzQ29tcGFueSl7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignNDAzJywgJ0VsIG51ZXZvIG5vbWJyZSBkZSBlbXByZXNhIHlhIGVzdGEgc2llbmRvIHVzYWRvJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNlIGlmKGV4aXN0c0NvbXBhbnkpeyAvLyBlcyBjb21wYcOxaWEgbnVldm8gcGVybyBlbCBDb21wYW55QnVzc2luZXNJZCAgeWEgZXhpc3RlLlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzQwMycsICdFbCBudWV2byBub21icmUgZGUgZW1wcmVzYSAgeWEgZXN0YSBzaWVuZG8gdXRpbGl6YWRvJyk7XG5cbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0VXNlcnNCeWNvbXBhbnkoaWRDb21wYW55KXtcbiAgICAgICAgY29uc3QgY29tcGFueSA9IENvbXBhbnkuZmluZE9uZShpZENvbXBhbnkpO1xuICAgICAgICByZXR1cm4gTWV0ZW9yLnVzZXJzLmZpbmQoeydjb21wYW55TmFtZSc6Y29tcGFueS5uYW1lfSkuZmV0Y2goKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgTW9uZ28gfSBmcm9tICdtZXRlb3IvbW9uZ28nO1xuXG5leHBvcnQgY29uc3QgTWVzc2FnZSA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdtZXNzYWdlcycpO1xuIiwiaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJy4vTWVzc2FnZSc7XG5pbXBvcnQgeyBQZXJtaXNzaW9uTWlkZGxld2FyZSB9IGZyb20gJy4uLy4uL21pZGRsZXdhcmVzL1Blcm1pc3Npb25NaWRkbGV3YXJlJztcbmltcG9ydCBQZXJtaXNzaW9ucyBmcm9tICcuLi8uLi9zdGFydHVwL3NlcnZlci9QZXJtaXNzaW9ucyc7XG5cbmNvbnN0IG1lc3NhZ2VzUHVibGljYXRpb24gPSBuZXcgUHVibGlzaEVuZHBvaW50KCdtZXNzYWdlLmxpc3QnLCBmdW5jdGlvbihpZENvbnRhY3QgPSBudWxsKXtcbiAgICBjb25zdCBpZFVzZXJMb2dnZWQgPSB0aGlzLnVzZXJJZDtcbiAgICByZXR1cm4gTWVzc2FnZS5maW5kKHtcbiAgICAgICAgJG9yOiBbXG4gICAgICAgICAgICB7aWRTZW5kZXI6IGlkVXNlckxvZ2dlZCwgaWRSZWNlaXZlcjogaWRDb250YWN0fSxcbiAgICAgICAgICAgIHtpZFNlbmRlcjogaWRDb250YWN0LCBpZFJlY2VpdmVyOiBpZFVzZXJMb2dnZWR9XG4gICAgICAgIF1cbiAgICB9LHtcbiAgICAgICAgbGltaXQ6MjAsXG4gICAgICAgIHNvcnQ6e1xuICAgICAgICAgICBkYXRlOi0xIFxuICAgICAgICB9XG4gICAgfSk7XG59KTtcblxubWVzc2FnZXNQdWJsaWNhdGlvbi51c2UobmV3IFBlcm1pc3Npb25NaWRkbGV3YXJlKFBlcm1pc3Npb25zLkNIQVQuTElTVC5WQUxVRSkpOyIsImltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICcuL01lc3NhZ2UnO1xuXG5NZXNzYWdlLnJhd0NvbGxlY3Rpb24oKS5jcmVhdGVJbmRleCh7IGlkU2VuZGVyOiAxfSk7XG5NZXNzYWdlLnJhd0NvbGxlY3Rpb24oKS5jcmVhdGVJbmRleCh7IGlkUmVjZWl2ZXI6IDF9KTtcbk1lc3NhZ2UucmF3Q29sbGVjdGlvbigpLmNyZWF0ZUluZGV4KHsgZGF0ZTogMX0pOyIsImltcG9ydCB7VmFsaWRhdGVkTWV0aG9kfSBmcm9tICdtZXRlb3IvbWRnOnZhbGlkYXRlZC1tZXRob2QnO1xuaW1wb3J0IHtjaGVja30gZnJvbSAnbWV0ZW9yL2NoZWNrJztcbmltcG9ydCB7UmVzcG9uc2VNZXNzYWdlfSBmcm9tIFwiLi4vLi4vc3RhcnR1cC9zZXJ2ZXIvdXRpbGl0aWVzL1Jlc3BvbnNlTWVzc3NhZ2VcIjtcbmltcG9ydCBBdXRoR3VhcmQgZnJvbSBcIi4uLy4uL21pZGRsZXdhcmVzL0F1dGhHdWFyZFwiO1xuaW1wb3J0IFBlcm1pc3Npb25zIGZyb20gXCIuLi8uLi9zdGFydHVwL3NlcnZlci9QZXJtaXNzaW9uc1wiO1xuaW1wb3J0IHtNZXNzYWdlfSBmcm9tIFwiLi9NZXNzYWdlXCI7XG5cbm5ldyBWYWxpZGF0ZWRNZXRob2Qoe1xuICAgIG5hbWU6J21lc3NhZ2Uuc2F2ZScsXG4gICAgIG1peGluczpbTWV0aG9kSG9va3NdLFxuICAgICBwZXJtaXNzaW9uczogW1Blcm1pc3Npb25zLkNIQVQuQ1JFQVRFLlZBTFVFXSwgIFxuICAgICBiZWZvcmVIb29rczogW0F1dGhHdWFyZC5jaGVja1Blcm1pc3Npb25dLFxuICAgIHZhbGlkYXRlKG1lc3NhZ2Upe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY2hlY2sobWVzc2FnZSx7XG4gICAgICAgICAgICAgICAgaWRTZW5kZXI6IFN0cmluZyxcbiAgICAgICAgICAgICAgICBpZFJlY2VpdmVyOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgdGV4dDogU3RyaW5nLFxuICAgICAgICAgICAgICAgIGRhdGU6IFN0cmluZyxcbiAgICAgICAgICAgICAgICByZWFkOiBCb29sZWFuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9Y2F0Y2ggKCBleGNlcHRpb24pe1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignbWVzc2FnZS5zYXZlJywgZXhjZXB0aW9uKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzQwMycsICdMYSBpbmZvcm1hY2lvbiBpbnRyb2R1Y2lkYSBubyBlcyB2YWxpZGEnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcnVuKG1lc3NhZ2Upe1xuICAgICAgICBjb25zdCByZXNwb25zZU1lc3NhZ2UgPSBuZXcgUmVzcG9uc2VNZXNzYWdlKCk7XG4gICAgICAgIFxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgTWVzc2FnZS5pbnNlcnQobWVzc2FnZSk7XG4gICAgICAgICAgICByZXNwb25zZU1lc3NhZ2UuY3JlYXRlKCdTZSBpbnNlcnTDsyBlbCBtZW5zYWplIGV4aXRvc2FtZW50ZScpO1xuICAgICAgIFxuICAgICAgICB9Y2F0Y2ggKCBleGNlcHRpb24pe1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignbWVzc2FnZS5zYXZlJywgZXhjZXB0aW9uKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzUwMCcsICdIYSBvY3VycmlkbyB1biBlcnJvciBhbCBndWFyZGFyIGVsIG1lbnNhamUnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2VNZXNzYWdlO1xuICAgIH1cbiB9KTtcblxuIG5ldyBWYWxpZGF0ZWRNZXRob2Qoe1xuICAgIG5hbWU6J21lc3NhZ2VzLnJlYWQnLFxuICAgICBtaXhpbnM6W01ldGhvZEhvb2tzXSwgIFxuICAgICBiZWZvcmVIb29rczogW0F1dGhHdWFyZC5pc1VzZXJMb2dnZWRdLFxuICAgIHZhbGlkYXRlKG1lc3NhZ2VzKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNoZWNrKG1lc3NhZ2VzLFtcbiAgICAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgX2lkOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgaWRTZW5kZXI6IFN0cmluZyxcbiAgICAgICAgICAgICAgICBpZFJlY2VpdmVyOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgdGV4dDogU3RyaW5nLFxuICAgICAgICAgICAgICAgIGRhdGU6IFN0cmluZyxcbiAgICAgICAgICAgICAgICByZWFkOiBCb29sZWFuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdKTtcblxuICAgICAgICB9Y2F0Y2ggKCBleGNlcHRpb24pe1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignbWVzc2FnZS5yZWFkJywgZXhjZXB0aW9uKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzQwMycsICdMYSBpbmZvcm1hY2lvbiBpbnRyb2R1Y2lkYSBubyBlcyB2YWxpZGEnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcnVuKG1lc3NhZ2VzKXtcbiAgICAgICAgY29uc3QgcmVzcG9uc2VNZXNzYWdlID0gbmV3IFJlc3BvbnNlTWVzc2FnZSgpO1xuICAgICAgICBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIE1lc3NhZ2UudXBkYXRlKHtfaWQ6eyAkaW46IG1lc3NhZ2VzLm1hcChtID0+IG0uX2lkKSB9IH0se1xuICAgICAgICAgICAgICAgICRzZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVhZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHttdWx0aTogdHJ1ZX0pO1xuICAgICAgICBcbiAgICAgICAgfWNhdGNoICggZXhjZXB0aW9uKXtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ21lc3NhZ2UucmVhZCcsIGV4Y2VwdGlvbik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc1MDAnLCAnSGEgb2N1cnJpZG8gdW4gZXJyb3IgYWwgbWFyY2FyIGxvcyBtZW5zYWplcyBjb21vIGxlaWRvcycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZU1lc3NhZ2U7XG4gICAgfVxuIH0pOyIsIlxuaW1wb3J0IEF1dGhHdWFyZCBmcm9tIFwiLi4vLi4vbWlkZGxld2FyZXMvQXV0aEd1YXJkXCI7XG5pbXBvcnQgUGVybWlzc2lvbnMgZnJvbSBcIi4uLy4uL3N0YXJ0dXAvc2VydmVyL1Blcm1pc3Npb25zXCJcbmltcG9ydCB7UmVzcG9uc2VNZXNzYWdlfSBmcm9tIFwiLi4vLi4vc3RhcnR1cC9zZXJ2ZXIvdXRpbGl0aWVzL1Jlc3BvbnNlTWVzc3NhZ2VcIjtcbmltcG9ydCB7Y2hlY2ssIE1hdGNofSBmcm9tIFwibWV0ZW9yL2NoZWNrXCI7XG5pbXBvcnQge01ldGVvcn0gZnJvbSBcIm1ldGVvci9tZXRlb3JcIjtcbmltcG9ydCB7UHJvZmlsZX0gZnJvbSBcIi4uL1Byb2ZpbGVzL1Byb2ZpbGVcIjtcblxubmV3IFZhbGlkYXRlZE1ldGhvZCh7XG4gICAgbmFtZToncGVybWlzc2lvbnMubGlzdCcsXG4gICAgbWl4aW5zOiBbTWV0aG9kSG9va3NdLFxuICAgIHBlcm1pc3Npb25zOiBbUGVybWlzc2lvbnMuUEVSTUlTU0lPTlMuTElTVC5WQUxVRV0sXG4gICAgYmVmb3JlSG9va3M6IFtBdXRoR3VhcmQuY2hlY2tQZXJtaXNzaW9uXSxcbiAgICB2YWxpZGF0ZTogbnVsbCxcbiAgICBydW4oKSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlTWVzc2FnZSA9IG5ldyBSZXNwb25zZU1lc3NhZ2UoKTtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgY29uc3QgcGVybWlzc2lvbnMgPSBNZXRlb3Iucm9sZXMuZmluZCgpLmZldGNoKCk7XG4gICAgICAgICAgICByZXNwb25zZU1lc3NhZ2UuY3JlYXRlKCdQZXJtaXNvcyBkaXNwb25pYmxlcyBkZWwgc2lzdGVtYScsbnVsbCxwZXJtaXNzaW9ucyk7XG4gICAgICAgIH1jYXRjaChleCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncGVybWlzc2lvbnMubGlzdDogJywgZXgpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignNTAwJywnT2N1cnJpw7MgdW4gZXJyb3IgYWwgb2J0ZW5lciBsYSBsaXN0YSBkZSBwZXJtaXNvcycpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlTWVzc2FnZTtcbiAgICB9XG5cbn0pO1xuXG5uZXcgVmFsaWRhdGVkTWV0aG9kKHtcbiAgICBuYW1lOidwZXJtaXNzaW9ucy5saXN0QnlJZFByb2ZpbGUnLFxuICAgIG1peGluczogW01ldGhvZEhvb2tzXSxcbiAgICBwZXJtaXNzaW9uczogW1Blcm1pc3Npb25zLlBFUk1JU1NJT05TLkxJU1QuVkFMVUVdLFxuICAgIGJlZm9yZUhvb2tzOiBbQXV0aEd1YXJkLmNoZWNrUGVybWlzc2lvbl0sXG4gICAgdmFsaWRhdGUoe2lkUHJvZmlsZX0pIHtcbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICBjaGVjaygnaWRQcm9maWxlJyxTdHJpbmcpO1xuICAgICAgICAgICAgfWNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcigndXNlci5yZW1vdmUnLCBleGNlcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc0MDMnLCdMYSBpbmZvcm1hY2lvbiBwcm9wb3JjaW9uYWRhIG5vIGVzIGNvcnJlY3RhJyk7XG4gICAgICAgICAgICB9XG4gICAgfSxcbiAgICBydW4oaWRQcm9maWxlKSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlTWVzc2FnZSA9IG5ldyBSZXNwb25zZU1lc3NhZ2UoKTtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgbGV0IHBlcm1pc3Npb25zPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHByb2ZpbGU9IFByb2ZpbGUuZmluZE9uZSh7J19pZCc6aWRQcm9maWxlLmlkUHJvZmlsZX0pO1xuICAgICAgICAgICAgaWYocHJvZmlsZSl7XG4gICAgICAgICAgICAgICAgcGVybWlzc2lvbnM9TWV0ZW9yLnJvbGVzLmZpbmQoeydfaWQnOnskaW46cHJvZmlsZS5wZXJtaXNzaW9uc319KS5mZXRjaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzcG9uc2VNZXNzYWdlLmNyZWF0ZSgnUGVybWlzb3MgYXNvY2lhZG9zIGFsIHBlcmZpbCcsJ1Blcm1pc29zIGluY2x1aWRvcyBlbiBlbCBwZXJmaWwnLHBlcm1pc3Npb25zKTtcbiAgICAgICAgfWNhdGNoKGV4KXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwZXJtaXNzaW9ucy5saXN0QnlJZFByb2ZpbGU6ICcsIGV4KTtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzUwMCcsJ09jdXJyacOzIHVuIGVycm9yIGFsIG9idGVuZXIgbGEgbGlzdGEgZGUgcGVybWlzb3MgYXNvY2lhZG9zIGEgdW4gcGVyZmlsJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzcG9uc2VNZXNzYWdlO1xuICAgIH1cblxufSk7XG5cbm5ldyBWYWxpZGF0ZWRNZXRob2Qoe1xuICAgIG5hbWU6J3Blcm1pc3Npb25zLmxpc3RPZk90aGVycycsXG4gICAgbWl4aW5zOiBbTWV0aG9kSG9va3NdLFxuICAgIHBlcm1pc3Npb25zOiBbUGVybWlzc2lvbnMuUEVSTUlTU0lPTlMuTElTVC5WQUxVRV0sXG4gICAgYmVmb3JlSG9va3M6IFtBdXRoR3VhcmQuY2hlY2tQZXJtaXNzaW9uXSxcbiAgICB2YWxpZGF0ZSh7aWRQcm9maWxlfSkge1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBjaGVjaygnaWRQcm9maWxlJyxTdHJpbmcpO1xuICAgICAgICB9Y2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcigncGVybWlzc2lvbnMubGlzdE9mT3RoZXJzJywgZXhjZXB0aW9uKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzQwMycsJ0xhIGluZm9ybWFjaW9uIHByb3BvcmNpb25hZGEgbm8gZXMgY29ycmVjdGEnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcnVuKGlkUHJvZmlsZSkge1xuICAgICAgICBjb25zdCByZXNwb25zZU1lc3NhZ2UgPSBuZXcgUmVzcG9uc2VNZXNzYWdlKCk7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGxldCBwZXJtaXNzaW9ucz0gW107XG4gICAgICAgICAgICBjb25zdCBwcm9maWxlPSBQcm9maWxlLmZpbmRPbmUoeydfaWQnOmlkUHJvZmlsZS5pZFByb2ZpbGV9KTtcbiAgICAgICAgICAgIGlmKHByb2ZpbGUpe1xuICAgICAgICAgICAgICAgIHBlcm1pc3Npb25zPU1ldGVvci5yb2xlcy5maW5kKHsnX2lkJzp7JG5pbjpwcm9maWxlLnBlcm1pc3Npb25zfX0pLmZldGNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXNwb25zZU1lc3NhZ2UuY3JlYXRlKCdQZXJtaXNvcyBOTyBhc29jaWFkb3MgYWwgcGVyZmlsJywnUGVybWlzb3MgTk8gaW5jbHVpZG9zIGVuIGVsIHBlcmZpbCcscGVybWlzc2lvbnMpO1xuICAgICAgICB9Y2F0Y2goZXgpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Blcm1pc3Npb25zLmxpc3RPZk90aGVyczogJywgZXgpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignNTAwJywnT2N1cnJpw7MgdW4gZXJyb3IgYWwgb2J0ZW5lciBsYSBsaXN0YSBkZSBwZXJtaXNvcyBOTyBhc29jaWFkb3MgYSB1biBwZXJmaWwnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNwb25zZU1lc3NhZ2U7XG4gICAgfVxuXG59KTtcblxubmV3IFZhbGlkYXRlZE1ldGhvZCh7XG4gICAgbmFtZTogJ3Blcm1pc3Npb25zLmNoZWNrJyxcbiAgICBtaXhpbnM6IFtNZXRob2RIb29rc10sXG4gICAgYmVmb3JlSG9va3M6IFtBdXRoR3VhcmQuaXNVc2VyTG9nZ2VkXSxcbiAgICB2YWxpZGF0ZShwZXJtaXNzaW9uKXtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgY2hlY2socGVybWlzc2lvbixTdHJpbmcpO1xuICAgICAgICB9Y2F0Y2goZXhjZXB0aW9uKXtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3Blcm1pc3Npb25zLmNoZWNrJyxleGNlcHRpb24pO1xuICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignNDAzJywgJ0xhIGluZm9ybWFjacOzbiBpbnRyb2R1Y2lkYSBubyBlcyB2YWxpZGEuJyk7XG4gICAgICAgIH0gICAgICAgXG4gICAgfSxcbiAgICBydW4ocGVybWlzc2lvbil7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlTWVzc2FnZSA9IG5ldyBSZXNwb25zZU1lc3NhZ2UoKTtcbiAgICAgICAgdHJ5e1xuXG4gICAgICAgICAgICBjb25zdCBzY29wZSA9IFJvbGVzLmdldFNjb3Blc0ZvclVzZXIodGhpcy51c2VySWQpWzBdO1xuICAgICAgICAgICAgY29uc3QgaGFzUGVybWlzc2lvbj1Sb2xlcy51c2VySXNJblJvbGUodGhpcy51c2VySWQscGVybWlzc2lvbixzY29wZSk7XG4gICAgICAgICAgICByZXNwb25zZU1lc3NhZ2UuY3JlYXRlKGAgRWwgdXN1YXJpbyB7JGhhc1Blcm1pc3Npb24/J3NpJywnbm8nfSBlbCBwZXJtaXNvYCxudWxsLHtoYXNQZXJtaXNzaW9ufSk7XG4gICAgICAgIH1jYXRjaChleGNlcHRpb24pe1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcigncGVybWlzc2lvbnMuY2hlY2snLGV4Y2VwdGlvbik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc1MDAnLCAnIEhhIG9jdXJyaWRvIHVuIGVycm9yIGFsIHZlcmlmaWNhciBlbCBwZXJtaXNvICcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZU1lc3NhZ2U7XG4gICAgfVxufSk7IiwiTWV0ZW9yLnB1Ymxpc2goJ3JvbGVzJyxmdW5jdGlvbigpe1xuICByZXR1cm4gTWV0ZW9yLnJvbGVBc3NpZ25tZW50LmZpbmQoeyd1c2VyLl9pZCc6dGhpcy51c2VySWR9KTtcbn0pOyIsImltcG9ydCB7IE1vbmdvIH0gZnJvbSAnbWV0ZW9yL21vbmdvJztcbmV4cG9ydCBjb25zdCBQcm9kdWN0aW9uTGluZVJlcG9zaXRvcnkgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbigncHJvZHVjdGlvbmxpbmVzJyk7IiwiaW1wb3J0IHtjaGVjaywgTWF0Y2h9IGZyb20gXCJtZXRlb3IvY2hlY2tcIjtcbmltcG9ydCB7UmVzcG9uc2VNZXNzYWdlfSBmcm9tIFwiLi4vLi4vc3RhcnR1cC9zZXJ2ZXIvdXRpbGl0aWVzL1Jlc3BvbnNlTWVzc3NhZ2VcIjtcbmltcG9ydCBQZXJtaXNzaW9ucyBmcm9tIFwiLi4vLi4vc3RhcnR1cC9zZXJ2ZXIvUGVybWlzc2lvbnNcIjtcbmltcG9ydCBBdXRoR3VhcmQgZnJvbSBcIi4uLy4uL21pZGRsZXdhcmVzL0F1dGhHdWFyZFwiO1xuaW1wb3J0IHtQcm9kdWN0aW9uTGluZVJlcG9zaXRvcnl9IGZyb20gXCIuL1Byb2R1Y3Rpb25MaW5lXCI7XG5pbXBvcnQgUHJvZHVjdGlvbkxpbmVzU2VydiBmcm9tIFwiLi9Qcm9kdWN0aW9uTGluZXNTZXJ2XCI7XG5pbXBvcnQge1dvcmtzdGF0aW9uUmVwb3NpdG9yeX0gZnJvbSAnLi4vV29ya3N0YXRpb25zL1dvcmtTdGF0aW9uJ1xuXG5uZXcgVmFsaWRhdGVkTWV0aG9kKHtcbiAgICBuYW1lOiAncHJvZHVjdGlvbmxpbmUuc2F2ZScsXG4gICAgbWl4aW5zOiBbTWV0aG9kSG9va3NdLFxuICAgIHBlcm1pc3Npb25zOiBbUGVybWlzc2lvbnMuUFJPRFVDVElPTkxJTkVTLkNSRUFURS5WQUxVRSxQZXJtaXNzaW9ucy5QUk9EVUNUSU9OTElORVMuVVBEQVRFLlZBTFVFXSxcbiAgICBiZWZvcmVIb29rczogW0F1dGhHdWFyZC5jaGVja1Blcm1pc3Npb25dLCAgLy8gQXF1aSBzZSB2ZXJpZmljYSBzaSBsb3MgcGVybWlzb3MgZGUgdXN1YXJpbyBzb24gYWRlY3VhZG9zIHBhcmEgZXN0YSBhY2Npb25cbiAgICBhZnRlckhvb2tzOiBbXSxcbiAgICB2YWxpZGF0ZShwcm9kdWN0aW9ubGluZSkge1xuICAgICAgICBjb25zb2xlLmluZm8oJ3Byb2R1Y3Rpb25saW5lJywgcHJvZHVjdGlvbmxpbmUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gVmFsaWRhIHF1ZSBsYSBlc3RydWN0dXJhIGRlbCBvYmpldG8gdXNlciBlc3RlIGNvbmZvcm1lIGEgbGEgZGVmaW5pY2lvbi5cbiAgICAgICAgICAgIGNoZWNrKHByb2R1Y3Rpb25saW5lLCB7XG4gICAgICAgICAgICAgICAgX2lkOiBNYXRjaC5PbmVPZihTdHJpbmcsIG51bGwpLFxuICAgICAgICAgICAgICAgIG5hbWU6IFN0cmluZyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogU3RyaW5nLFxuICAgICAgICAgICAgICAgIHdvcmtzdGF0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfaWQ6IE1hdGNoLk9uZU9mKFN0cmluZywgbnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lX2Z1bGw6IFN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0aW9ubGluZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uIDogU3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2lkIDogU3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdwcm9kdWN0aW9ubGluZS5zYXZlJywgZXhjZXB0aW9uKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzQwMycsICdMYSBpbmZvcm1hY2lvbiBpbnRyb2R1Y2lkYSBubyBlcyB2w6FsaWRhLicpO1xuICAgICAgICB9XG4gICAgICAgIFByb2R1Y3Rpb25MaW5lc1NlcnYudmFsaWRhdGVQcm9kdWN0aW9uTGluZU5hbWUocHJvZHVjdGlvbmxpbmUubmFtZSxwcm9kdWN0aW9ubGluZS5faWQpO1xuICAgIFxuICAgICBcbiAgICB9LFxuICAgIHJ1bihwcm9kdWN0aW9ubGluZSkge1xuICAgICAgICBjb25zb2xlLmxvZygncHJvZHVjdGlvbmxpbmUuc2F2ZScpO1xuICAgICAgICBjb25zdCByZXNwb25zZU1lc3NhZ2U9IG5ldyBSZXNwb25zZU1lc3NhZ2UoKTtcbiAgICAgICAgaWYocHJvZHVjdGlvbmxpbmUuX2lkICE9PW51bGwpe1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgIFByb2R1Y3Rpb25MaW5lUmVwb3NpdG9yeS51cGRhdGUocHJvZHVjdGlvbmxpbmUuX2lkLHtcbiAgICAgICAgICAgICAgICAgICAgJHNldDp7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBwcm9kdWN0aW9ubGluZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHByb2R1Y3Rpb25saW5lLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya3N0YXRpb25zOiBwcm9kdWN0aW9ubGluZS53b3Jrc3RhdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1NlIGhhIGFjdHVhbGl6YWRvIGxhIGxpbmVhIGRlIHByb2R1Y2Npb24nKTtcbiAgICAgICAgICAgICAgICByZXNwb25zZU1lc3NhZ2UuY3JlYXRlKCdTZSBoYSBhY3R1YWxpemFkbyBsYSBsaW5lYSBkZSBwcm9kdWNjaW9uJyk7XG4gICAgICAgICAgICB9Y2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3Byb2R1Y3Rpb25saW5lLnNhdmUnLCBleGNlcHRpb24pO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzUwMCcsICdPY3VycmnDsyB1biBlcnJvciBhbCBhY3R1YWxpemFyIGxhIGxpbmVhIGRlIHByb2R1Y2Npb24nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncHJvZHVjdGlvbmxpbmU6ICcscHJvZHVjdGlvbmxpbmUpO1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgIFByb2R1Y3Rpb25MaW5lUmVwb3NpdG9yeS5pbnNlcnQoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBwcm9kdWN0aW9ubGluZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogcHJvZHVjdGlvbmxpbmUuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIHdvcmtzdGF0aW9uczogcHJvZHVjdGlvbmxpbmUud29ya3N0YXRpb25zXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1NlIGhhIGd1YXJkYWRvIGxhIGxpbmVhIGRlIHByb2R1Y2Npb24nKTtcbiAgICAgICAgICAgICAgICByZXNwb25zZU1lc3NhZ2UuY3JlYXRlKCdTZSBoYSBndWFyZGFkbyBsYSBsaW5lYSBkZSBwcm9kdWNjaW9uJyk7XG4gICAgICAgICAgICB9Y2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3Byb2R1Y3Rpb25saW5lLnNhdmUnLCBleGNlcHRpb24pO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzUwMCcsICdPY3VycmnDsyB1biBlcnJvciBhbCBndWFyZGFyIGxhIGxpbmVhIGRlIHByb2R1Y2Npb24nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2VNZXNzYWdlO1xuICAgIH1cbn0pO1xuXG5uZXcgVmFsaWRhdGVkTWV0aG9kKHtcbiAgICBuYW1lOiAncHJvZHVjdGlvbmxpbmUubGlzdCcsXG4gICAgbWl4aW5zOiBbTWV0aG9kSG9va3NdLFxuICAgIHBlcm1pc3Npb25zOiBbUGVybWlzc2lvbnMuUFJPRFVDVElPTkxJTkVTLkxJU1QuVkFMVUVdLFxuICAgIGJlZm9yZUhvb2tzOiBbQXV0aEd1YXJkLmNoZWNrUGVybWlzc2lvbl0sICAvLyBBcXVpIHNlIHZlcmlmaWNhIHNpIGxvcyBwZXJtaXNvcyBkZSB1c3VhcmlvIHNvbiBhZGVjdWFkb3MgcGFyYSBlc3RhIGFjY2lvblxuICAgIGFmdGVySG9va3M6IFtdLFxuICAgIHZhbGlkYXRlKCkge1xuICAgIH0sXG4gICAgcnVuKCkge1xuICAgICAgICBjb25zb2xlLmxvZygncHJvZHVjdGlvbmxpbmUubGlzdCcpO1xuICAgICAgICBjb25zdCByZXNwb25zZU1lc3NhZ2U9IG5ldyBSZXNwb25zZU1lc3NhZ2UoKTtcbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3Rpb25saW5lcyA9IFByb2R1Y3Rpb25MaW5lUmVwb3NpdG9yeS5maW5kKCkuZmV0Y2goKTtcbiAgICAgICAgICAgICAgICByZXNwb25zZU1lc3NhZ2UuY3JlYXRlKCdTZSBoYSBvYnRlbmlkbyBsYSBsaXN0YSBkZSBsaW5lYXMgZGUgcHJvZHVjY2lvbicsbnVsbCxwcm9kdWN0aW9ubGluZXMpO1xuICAgICAgICAgICAgfWNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdwcm9kdWN0aW9ubGluZS5zYXZlJywgZXhjZXB0aW9uKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc1MDAnLCAnT2N1cnJpw7MgdW4gZXJyb3IgYWwgb2J0ZW5lciBsYXMgbGluZWEgZGUgcHJvZHVjY2lvbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlTWVzc2FnZTtcbiAgICB9XG59KTtcblxubmV3IFZhbGlkYXRlZE1ldGhvZCh7XG4gICAgbmFtZTogJ3Byb2R1Y3Rpb25saW5lLmRlbGV0ZScsXG4gICAgbWl4aW5zOiBbTWV0aG9kSG9va3NdLFxuICAgIHBlcm1pc3Npb25zOiBbUGVybWlzc2lvbnMuUFJPRFVDVElPTkxJTkVTLkRFTEVURS5WQUxVRV0sXG4gICAgYmVmb3JlSG9va3M6IFtBdXRoR3VhcmQuY2hlY2tQZXJtaXNzaW9uXSwgIC8vIEFxdWkgc2UgdmVyaWZpY2Egc2kgbG9zIHBlcm1pc29zIGRlIHVzdWFyaW8gc29uIGFkZWN1YWRvcyBwYXJhIGVzdGEgYWNjaW9uXG4gICAgYWZ0ZXJIb29rczogW10sXG4gICAgdmFsaWRhdGUoeyBpZFByb2R1Y3Rpb25saW5lIH0pe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY2hlY2soaWRQcm9kdWN0aW9ubGluZSwgU3RyaW5nKTtcbiAgICAgICAgfWNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3Byb2R1Y3Rpb25saW5lLmRlbGV0ZScsIGV4Y2VwdGlvbik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc0MDMnLCAnT2N1cnJpbyB1biBlcnJvciBhbCBlbGltaW5hciBsYSBsaW5lYSBkZSBwcm9kdWNjaW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdmFsaWRhciBxdWUgbm8gc2VhIHBvc2libGUgZWxpbWluYXIgdW5hIGxpbmVhIGRlIHByb2R1Y2Npb24gc2kgaGF5IHVuYSBvcmRlbiBkZSBwcm9kdWNjaW9uIEFDVElWQSB1dGlsaXphbmRvbG8uXG4gICAgICAgIFxuICAgIH0sXG4gICAgcnVuKHsgaWRQcm9kdWN0aW9ubGluZSB9KXtcbiAgICAgICAgY29uc3QgcmVzcG9uc2VNZXNzYWdlID0gbmV3IFJlc3BvbnNlTWVzc2FnZSgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgUHJvZHVjdGlvbkxpbmVSZXBvc2l0b3J5LnJlbW92ZShpZFByb2R1Y3Rpb25saW5lKTtcbiAgICAgICAgICAgIHJlc3BvbnNlTWVzc2FnZS5jcmVhdGUoJ0xpbmVhIGRlIHByb2R1Y2Npb24gZWxpbWluYWRhIGV4aXRvc2FtZW50ZScpO1xuICAgICAgICB9Y2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcigncHJvZmlsZS5kZWxldGUnLCBleGNlcHRpb24pO1xuICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignNTAwJywgJ09jdXJyaW8gdW4gZXJyb3IgYWwgZWxpbWluYXIgbGEgbGluZWEgZGUgcHJvZHVjY2lvbicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZU1lc3NhZ2U7XG4gICAgfVxufSk7XG5cbm5ldyBWYWxpZGF0ZWRNZXRob2Qoe1xuICAgIG5hbWU6J3Byb2R1Y3Rpb25saW5lLndvcmtzdGF0aW9ucy5hdmFpbGFibGVzLnRvLmluY2x1ZGUnLFxuICAgIG1peGluczogW01ldGhvZEhvb2tzXSxcbiAgICBwZXJtaXNzaW9uczogW1Blcm1pc3Npb25zLlBST0RVQ1RJT05MSU5FUy5MSVNULlZBTFVFXSxcbiAgICBiZWZvcmVIb29rczogW0F1dGhHdWFyZC5jaGVja1Blcm1pc3Npb25dLFxuICAgIHZhbGlkYXRlKGlkUHJvZHVjdGlvbkxpbmUpIHtcbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ2lkUHJvZHVjdGlvbkxpbmUnLGlkUHJvZHVjdGlvbkxpbmUpO1xuICAgICAgICAgICAgICAgIGNoZWNrKCdpZFByb2R1Y3Rpb25MaW5lJyxTdHJpbmcpO1xuICAgICAgICAgICAgfWNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcigncHJvZHVjdGlvbmxpbmUud29ya3N0YXRpb25zJywgZXhjZXB0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignNDAzJywnTGEgaW5mb3JtYWNpb24gcHJvcG9yY2lvbmFkYSBubyBlcyBjb3JyZWN0YScpO1xuICAgICAgICAgICAgfVxuICAgIH0sXG4gICAgcnVuKGlkUHJvZHVjdGlvbkxpbmUpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2VNZXNzYWdlID0gbmV3IFJlc3BvbnNlTWVzc2FnZSgpO1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBsZXQgd29ya3N0YXRpb25zQXNzaWduZWQ9IFtdO1xuICAgICAgICAgICAgbGV0IHdvcmtzdGF0aW9uc0luY2x1ZGVkPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3Rpb25saW5lPSBQcm9kdWN0aW9uTGluZVJlcG9zaXRvcnkuZmluZE9uZSh7J19pZCc6aWRQcm9kdWN0aW9uTGluZX0pO1xuICAgICAgICAgICAgaWYocHJvZHVjdGlvbmxpbmUpe1xuICAgICAgICAgICAgICAgIHdvcmtzdGF0aW9uc0Fzc2lnbmVkPSAgV29ya3N0YXRpb25SZXBvc2l0b3J5LmZpbmQoeydwcm9kdWN0aW9ubGluZS5faWQnOmlkUHJvZHVjdGlvbkxpbmV9KS5mZXRjaCgpO1xuICAgICAgICAgICAgICAgIHdvcmtzdGF0aW9uc0luY2x1ZGVkPSAgV29ya3N0YXRpb25SZXBvc2l0b3J5LmZpbmQoeydfaWQnOiB7JGluOiBwcm9kdWN0aW9ubGluZS53b3Jrc3RhdGlvbnMubWFwKHdvcmtzdGF0aW9uID0+IHdvcmtzdGF0aW9uLl9pZCl9fSkuZmV0Y2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB3b3Jrc3RhdGlvbnNBdmFpbGFibGVzVG9JbmNsdWRlPVtdO1xuICAgICAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgd29ya3N0YXRpb25zQXNzaWduZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgd29ya3N0YXRpb25zSW5jbHVkZWQubGVuZ3RoOyBqKyspe1xuICAgICAgICAgICAgICAgICAgICBpZiAod29ya3N0YXRpb25zQXNzaWduZWRbaV0uX2lkID09IHdvcmtzdGF0aW9uc0luY2x1ZGVkW2pdLl9pZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCA9dHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9ICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKCFmb3VuZCl7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtzdGF0aW9uc0F2YWlsYWJsZXNUb0luY2x1ZGUucHVzaCh3b3Jrc3RhdGlvbnNBc3NpZ25lZFtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgLy8gY29uc29sZS5pbmZvKCd3b3Jrc3RhdGlvbnNBc3NpZ25lZCcsd29ya3N0YXRpb25zQXNzaWduZWQpO1xuICAgICAgICAgICAvLyBjb25zb2xlLmluZm8oJ3dvcmtzdGF0aW9uc0luY2x1ZGVkJyx3b3Jrc3RhdGlvbnNJbmNsdWRlZCk7XG4gICAgICAgICAgIC8vICBjb25zb2xlLmluZm8oJ3dvcmtzdGF0aW9uc0F2YWlsYWJsZXNUb0luY2x1ZGUnLCB3b3Jrc3RhdGlvbnNBdmFpbGFibGVzVG9JbmNsdWRlKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gRWwgdGVyY2VyIHBhcmFtZXRybyBlcXVpdmFsZHJhIGFsIG9iamV0byBkYXRhIGVuIGVsIHJlc3BvbnNlXG4gICAgICAgICAgICByZXNwb25zZU1lc3NhZ2UuY3JlYXRlKCdFc3RhY2lvbmVzIGRlIHRyYWJham8gYXNvY2lhZGFzIGEgbGEgbGluZWEgZGUgcHJvZHVjY2lvbiBkaXNwb25pYmxlcyBwYXJhIGluY2x1aXInLCdFc3RhY2lvbmVzIGRpc3BvbmlibGVzIHBhcmEgaW5jbHVpciBlbiBsYSBsaW5lYSBkZSBwcm9kJyx3b3Jrc3RhdGlvbnNBdmFpbGFibGVzVG9JbmNsdWRlKTtcbiAgICAgICAgfWNhdGNoKGV4KXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd3b3Jrc3RhdGlvbnMubGlzdEJ5SWRQcm9kdWN0aW9uTGluZTogJywgZXgpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignNTAwJywnT2N1cnJpw7MgdW4gZXJyb3IgYWwgb2J0ZW5lciBsYSBsaXN0YSBkZSBlc3RhY2lvbmVzIGRlIHRyYWJham8gYXNvY2lhZGFzIGEgdW5hIGxpbmVhIGRlIHByb2R1Y2Npb24gZGlzcG9uaWJsZXMgcGFyYSBpbmNsdWlyJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzcG9uc2VNZXNzYWdlO1xuICAgIH1cblxufSk7XG5cbi8qXG4qIEFxdWkgZGV2b2x2ZXIgbGFzIGVzdGFjaW9uZXMgZGUgdHJhYmFqbyBxdWUgZXN0ZW5cbiogaW5jbHVpZGFzIGVuIGxhIGxpbmVhXG4qL1xubmV3IFZhbGlkYXRlZE1ldGhvZCh7XG4gICAgbmFtZToncHJvZHVjdGlvbmxpbmUud29ya3N0YXRpb25zLmluY2x1ZGVkJyxcbiAgICBtaXhpbnM6IFtNZXRob2RIb29rc10sXG4gICAgcGVybWlzc2lvbnM6IFtQZXJtaXNzaW9ucy5QUk9EVUNUSU9OTElORVMuTElTVC5WQUxVRV0sXG4gICAgYmVmb3JlSG9va3M6IFtBdXRoR3VhcmQuY2hlY2tQZXJtaXNzaW9uXSxcbiAgICB2YWxpZGF0ZShpZFByb2R1Y3Rpb25MaW5lKSB7XG4gICAgfSxcbiAgICBydW4oaWRQcm9kdWN0aW9uTGluZSkge1xuICAgICAgICBjb25zdCByZXNwb25zZU1lc3NhZ2UgPSBuZXcgUmVzcG9uc2VNZXNzYWdlKCk7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGxldCB3b3Jrc3RhdGlvbnNJbmNsdWRlZD1bXTtcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3Rpb25saW5lPSBQcm9kdWN0aW9uTGluZVJlcG9zaXRvcnkuZmluZE9uZSh7J19pZCc6aWRQcm9kdWN0aW9uTGluZX0pO1xuXG4gICAgICAgICAgICBpZihwcm9kdWN0aW9ubGluZSl7XG4gICAgICAgICAgICAgICAgLy9kYi5nZXRDb2xsZWN0aW9uKCd3b3Jrc3RhdGlvbnMnKS5maW5kKHsnX2lkJzp7JGluOlsnZ01kRXg1UWphR3N4d2Vrd1knLCAnUDJDQjZpdmVyZnY3RThlR3AnXX19KVxuICAgICAgICAgICAgICAgIHdvcmtzdGF0aW9uc0luY2x1ZGVkPSBwcm9kdWN0aW9ubGluZS53b3Jrc3RhdGlvbnM7XG4gICAgICAgICAgICAgICAvL3dvcmtzdGF0aW9uc0luY2x1ZGVkPSBXb3Jrc3RhdGlvblJlcG9zaXRvcnkuZmluZCh7J19pZCc6IHskaW46IHByb2R1Y3Rpb25saW5lLndvcmtzdGF0aW9ucyB9ICB9KS5mZXRjaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEVsIHRlcmNlciBwYXJhbWV0cm8gZXF1aXZhbGRyYSBhbCBvYmpldG8gZGF0YSBlbiBlbCByZXNwb25zZVxuICAgICAgICBcbiAgICAgICAgICAgIHJlc3BvbnNlTWVzc2FnZS5jcmVhdGUoJ0VzdGFjaW9uZXMgZGUgdHJhYmFqbyBpbmNsdWlkYXMgYSBsYSBsaW5lYSBkZSBwcm9kdWNjaW9uJywnRXN0YWNpb25lcyBpbmNsdWlkYXMgZW4gbGEgbGluZWEgZGUgcHJvZCcsd29ya3N0YXRpb25zSW5jbHVkZWQpO1xuICAgICAgICB9Y2F0Y2goZXgpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Byb2R1Y3Rpb25saW5lLndvcmtzdGF0aW9ucy5pbmNsdWRlZDogJywgZXgpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignNTAwJywnT2N1cnJpw7MgdW4gZXJyb3IgYWwgb2J0ZW5lciBsYSBsaXN0YSBkZSBlc3RhY2lvbmVzIGRlIHRyYWJham8gaW5jbHVpZGFzIGEgdW5hIGxpbmVhIGRlIHByb2R1Y2Npb24nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNwb25zZU1lc3NhZ2U7XG4gICAgfVxuXG59KTsiLCJcbmltcG9ydCB7UHJvZHVjdGlvbkxpbmVSZXBvc2l0b3J5fSBmcm9tIFwiLi9Qcm9kdWN0aW9uTGluZVwiO1xuXG5Qcm9kdWN0aW9uTGluZVJlcG9zaXRvcnkucmF3Q29sbGVjdGlvbigpLmNyZWF0ZUluZGV4KHsnbmFtZSc6MX0se3VuaXF1ZTogdHJ1ZX0pO1xuXG4iLCJpbXBvcnQge1Byb2R1Y3Rpb25MaW5lUmVwb3NpdG9yeX0gZnJvbSBcIi4vUHJvZHVjdGlvbkxpbmVcIjtcbmltcG9ydCB7IFBlcm1pc3Npb25NaWRkbGV3YXJlIH0gZnJvbSAnLi4vLi4vbWlkZGxld2FyZXMvUGVybWlzc2lvbk1pZGRsZXdhcmUnO1xuaW1wb3J0IFBlcm1pc3Npb25zIGZyb20gJy4uLy4uL3N0YXJ0dXAvc2VydmVyL1Blcm1pc3Npb25zJztcblxuY29uc3QgcHJvZHVjdGlvbkxpbmVzUHVibGljYXRpb249bmV3IFB1Ymxpc2hFbmRwb2ludCgncHJvZHVjdGlvbmxpbmVzLmxpc3QnLGZ1bmN0aW9uKHBhcmFtMSl7XG4gICAgICAgIC8vcmV0dXJuIFByb2R1Y3Rpb25MaW5lUmVwb3NpdG9yeS5maW5kKHt9LHsgX2lkOjEsbmFtZToxLGRlc2NyaXB0aW9uOjEsXG4gICAgICAgIHJldHVybiBQcm9kdWN0aW9uTGluZVJlcG9zaXRvcnkuZmluZCh7fSx7c29ydDp7Y3JlYXRlZEF0OiAtMX1cbiAgICAgICAgfSk7XG59KTtcblxucHJvZHVjdGlvbkxpbmVzUHVibGljYXRpb24udXNlKG5ldyBQZXJtaXNzaW9uTWlkZGxld2FyZShQZXJtaXNzaW9ucy5QUk9EVUNUSU9OTElORVMuTElTVC5WQUxVRSkpOyIsIlxuaW1wb3J0IHtNZXRlb3J9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHtQcm9kdWN0aW9uTGluZVJlcG9zaXRvcnl9IGZyb20gXCIuL1Byb2R1Y3Rpb25MaW5lXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxudmFsaWRhdGVQcm9kdWN0aW9uTGluZU5hbWUobmV3UHJvZHVjdGlvbkxpbmUsaWRQcm9kdWN0aW9uTGluZSl7XG5cbiAgICBjb25zdCBleGlzdHNQcm9kdWN0aW9uTGluZU5hbWU9IFByb2R1Y3Rpb25MaW5lUmVwb3NpdG9yeS5maW5kKHtuYW1lOm5ld1Byb2R1Y3Rpb25MaW5lfSkuZmV0Y2goKTtcbiAgICAgICAgLy8gcmVjb3JyZXIgbGEgbGlzdGEgeSBjb21wYXJhciBxdWUgdW5vIGRpZmVyZW50ZSBkZSBtaSB0ZW5nYSBlbCBtaXNtbyBub21icmVcbiAgICAgICAgZXhpc3RzUHJvZHVjdGlvbkxpbmVOYW1lLmZpbHRlcihcbiAgICAgICAgICAgIHByb2R1Y3Rpb25saW5lPT57XG4gICAgICAgICAgICAgICAgaWYgKHByb2R1Y3Rpb25saW5lLm5hbWU9PW5ld1Byb2R1Y3Rpb25MaW5lICYmIHByb2R1Y3Rpb25saW5lLl9pZCE9PWlkUHJvZHVjdGlvbkxpbmUpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc0MDMnLCAnRWwgbm9tYnJlIGRlIGxhIG51ZXZhIGxpbmVhIGRlIHByb2R1Y2Npb24gIHlhIGVzdGEgc2llbmRvIHV0aWxpemFkbycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgTW9uZ28gfSBmcm9tICdtZXRlb3IvbW9uZ28nO1xuXG5leHBvcnQgY29uc3QgUHJvZHVjdCA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdwcm9kdWN0cycpOyIsImltcG9ydCB7VmFsaWRhdGVkTWV0aG9kfSBmcm9tICdtZXRlb3IvbWRnOnZhbGlkYXRlZC1tZXRob2QnO1xuaW1wb3J0IHtSZXNwb25zZU1lc3NhZ2V9IGZyb20gXCIuLi8uLi9zdGFydHVwL3NlcnZlci91dGlsaXRpZXMvUmVzcG9uc2VNZXNzc2FnZVwiO1xuaW1wb3J0IEF1dGhHdWFyZCBmcm9tIFwiLi4vLi4vbWlkZGxld2FyZXMvQXV0aEd1YXJkXCI7XG5pbXBvcnQgUGVybWlzc2lvbnMgZnJvbSBcIi4uLy4uL3N0YXJ0dXAvc2VydmVyL1Blcm1pc3Npb25zXCI7XG5pbXBvcnQge1Byb2R1Y3R9IGZyb20gXCIuL1Byb2R1Y3RcIjtcbmltcG9ydCBQcm9kdWN0U2VydiBmcm9tIFwiLi9Qcm9kdWN0U2VydlwiO1xuaW1wb3J0IHtjaGVjaywgTWF0Y2h9IGZyb20gXCJtZXRlb3IvY2hlY2tcIjtcblxubmV3IFZhbGlkYXRlZE1ldGhvZCh7XG4gICAgbmFtZToncHJvZHVjdC5zYXZlJyxcbiAgICAgbWl4aW5zOltNZXRob2RIb29rc10sXG4gICAgIHBlcm1pc3Npb25zOiBbUGVybWlzc2lvbnMuUFJPRFVDVFMuQ1JFQVRFLlZBTFVFLFBlcm1pc3Npb25zLlBST0RVQ1RTLlVQREFURS5WQUxVRV0sICBcbiAgICAgYmVmb3JlSG9va3M6IFtBdXRoR3VhcmQuY2hlY2tQZXJtaXNzaW9uXSxcbiAgICB2YWxpZGF0ZShwcm9kdWN0KXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygncHJvZHVjdCAnLCBwcm9kdWN0KVxuICAgICAgICAgICAgY2hlY2socHJvZHVjdCx7XG4gICAgICAgICAgICAgICAgX2lkOiBNYXRjaC5PbmVPZihTdHJpbmcsIG51bGwpLFxuICAgICAgICAgICAgICAgIG5hbWU6IFN0cmluZyxcbiAgICAgICAgICAgICAgICBuYW1lX2Z1bGw6IFN0cmluZyxcbiAgICAgICAgICAgICAgICB1bml0OiB7XG4gICAgICAgICAgICAgICAgICAgIF9pZDogU3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBTdHJpbmdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN0b2NrOiBTdHJpbmdcbiAgICAgICAgICAgICAgICAsXG4gICAgICAgICAgICAgICAgcHJvdmlkZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgX2lkOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFN0cmluZ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IFN0cmluZyxcbiAgICAgICAgICAgICAgICBza3U6IFN0cmluZyxcbiAgICAgICAgICAgICAgICB3YXJlaG91c2U6IHtcbiAgICAgICAgICAgICAgICAgICAgX2lkOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZV9mdWxsOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBTdHJpbmdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHByb2R1Y3Rpb25fbGluZToge1xuICAgICAgICAgICAgICAgICAgICBfaWQ6IFN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogU3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICB3b3Jrc3RhdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaWQ6IFN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZV9mdWxsOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246IFN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0aW9ubGluZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA6IFN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA6IFN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2lkIDogU3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICxcbiAgICAgICAgICAgICAgICBib206W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pZDogTWF0Y2guT25lT2YoU3RyaW5nLCBudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBNYXRjaC5PbmVPZihTdHJpbmcsIG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1YW50aXR5OiBNYXRjaC5PbmVPZihTdHJpbmcsIG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgaXNBdmFpbGFibGU6IEJvb2xlYW5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1jYXRjaCAoIGV4Y2VwdGlvbil7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdwcm9kdWN0LnNhdmUnLCBleGNlcHRpb24pO1xuICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignNDAzJywgJ0xhIGluZm9ybWFjaW9uIGludHJvZHVjaWRhIG5vIGVzIHZhbGlkYScpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFZhbGlkYXIgcXVlIG5vIGhheWEgcHJvZHVjdG8gY29uIGVsIG1pc21vIG5vbWJyZVxuICAgICAgICBQcm9kdWN0U2Vydi52YWxpZGF0ZVByb2R1Y3ROYW1lKHByb2R1Y3QubmFtZSxwcm9kdWN0Ll9pZCk7XG4gICAgfSxcbiAgICBydW4ocHJvZHVjdCl7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlTWVzc2FnZSA9IG5ldyBSZXNwb25zZU1lc3NhZ2UoKTsgXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZihwcm9kdWN0Ll9pZCAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgLy8gVG9ET1xuICAgICAgICAgICAgICAgIC8vIGFncmVnYXIgcmVnaXN0cm8gZW4ga2FyZGV4IHNpIHNlIGhhIGNhbWJpYWRvIGVsIHZhbG9yIGRlIHN0b2NrXG4gICAgICAgICAgICAgICAgUHJvZHVjdC51cGRhdGUocHJvZHVjdC5faWQse1xuICAgICAgICAgICAgICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHByb2R1Y3QubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZV9mdWxsOiBwcm9kdWN0Lm5hbWVfZnVsbCxcbiAgICAgICAgICAgICAgICAgICAgdW5pdDogcHJvZHVjdC51bml0LFxuICAgICAgICAgICAgICAgICAgICBzdG9jazogcHJvZHVjdC5zdG9jayxcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246IHByb2R1Y3QubG9jYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIHNrdTogcHJvZHVjdC5za3UsXG4gICAgICAgICAgICAgICAgICAgIHdhcmVob3VzZTogcHJvZHVjdC53YXJlaG91c2UsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3Rpb25fbGluZTogcHJvZHVjdC5wcm9kdWN0aW9uX2xpbmUsXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyOiBwcm9kdWN0LnByb3ZpZGVyLFxuICAgICAgICAgICAgICAgICAgICBib206ICAgIHByb2R1Y3QuYm9tTGlzdCxcbiAgICAgICAgICAgICAgICAgICAgaXNBdmFpbGFibGU6IHByb2R1Y3QuaXNBdmFpbGFibGVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlTWVzc2FnZS5jcmVhdGUoJ1NlIGFjdHVhbGl6w7MgbGEgZW1wcmVzYSBleGl0b3NhbWVudGUnKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIFByb2R1Y3QuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogcHJvZHVjdC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBuYW1lX2Z1bGw6IHByb2R1Y3QubmFtZV9mdWxsLFxuICAgICAgICAgICAgICAgICAgICB1bml0OiBwcm9kdWN0LnVuaXQsXG4gICAgICAgICAgICAgICAgICAgIHN0b2NrOiBwcm9kdWN0LnN0b2NrLFxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogcHJvZHVjdC5sb2NhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgc2t1OiBwcm9kdWN0LnNrdSxcbiAgICAgICAgICAgICAgICAgICAgd2FyZWhvdXNlOiBwcm9kdWN0LndhcmVob3VzZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdGlvbl9saW5lOiBwcm9kdWN0LnByb2R1Y3Rpb25fbGluZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXI6IHByb2R1Y3QucHJvdmlkZXIsXG4gICAgICAgICAgICAgICAgICAgIGJvbTogICAgcHJvZHVjdC5ib21MaXN0LFxuICAgICAgICAgICAgICAgICAgICBpc0F2YWlsYWJsZTogcHJvZHVjdC5pc0F2YWlsYWJsZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlTWVzc2FnZS5jcmVhdGUoJ1NlIGluc2VydMOzIGVsIHByb2R1Y3RvIGV4aXRvc2FtZW50ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9Y2F0Y2ggKCBleGNlcHRpb24pe1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcigncHJvZHVjdC5zYXZlJywgZXhjZXB0aW9uKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzUwMCcsICdIYSBvY3VycmlkbyB1biBlcnJvciBhbCBndWFyZGFyIGVsIHByb2R1Y3RvJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlTWVzc2FnZTtcbiAgICB9XG4gfSk7XG5cbm5ldyBWYWxpZGF0ZWRNZXRob2Qoe1xuICAgIG5hbWU6ICdwcm9kdWN0LmRlbGV0ZScsXG4gICAgbWl4aW5zOiBbTWV0aG9kSG9va3NdLFxuICAgIHBlcm1pc3Npb25zOiBbUGVybWlzc2lvbnMuUFJPRFVDVFMuREVMRVRFLlZBTFVFXSxcbiAgICBiZWZvcmVIb29rczogW0F1dGhHdWFyZC5jaGVja1Blcm1pc3Npb25dLCAgLy8gQXF1aSBzZSB2ZXJpZmljYSBzaSBsb3MgcGVybWlzb3MgZGUgdXN1YXJpbyBzb24gYWRlY3VhZG9zIHBhcmEgZXN0YSBhY2Npb25cbiAgICBhZnRlckhvb2tzOiBbXSxcbiAgICB2YWxpZGF0ZSh7IGlkUHJvZHVjdCB9KXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNoZWNrKGlkUHJvZHVjdCwgU3RyaW5nKTtcbiAgICAgICAgfWNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3Byb2R1Y3QuZGVsZXRlJywgZXhjZXB0aW9uKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzQwMycsICdPY3VycmlvIHVuIGVycm9yIGFsIGVsaW1pbmFyIGVsIHByb2R1Y3RvJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdmFsaWRhciBxdWUgbm8gc2VhIHBvc2libGUgZWxpbWluYXIgdW4gcHJvZHVjdG8gc2kgaGF5IHVuIGFsbWFjZW4gdXRpbGl6YW5kb2xvLlxuICAgICAgICAvLyBUb0RvXG4gICAgICAgIGNvbnN0IGlzVXNlcmVkQnlXYXJlaG91c2UgPSAwO1xuICAgICAgICAvL0NvbXBhbnlTZXJ2LmdldFVzZXJzQnljb21wYW55KGlkQ29tcGFueSk7XG5cbiAgICAgICAgaWYgKGlzVXNlcmVkQnlXYXJlaG91c2UubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc0MDMnLCdObyBlcyBwb3NpYmxlIGVsaW1pYXIgZWwgcHJvZHVjdG8nLFxuICAgICAgICAgICAgICAgICdIYXkgYWwgbWVub3MgdW4gYWxtYWNlbiB1dGlsaXphbmRvIGVsIHByb2R1Y3RvJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJ1bih7IGlkUHJvZHVjdCB9KXtcbiAgICAgICAgY29uc3QgcmVzcG9uc2VNZXNzYWdlID0gbmV3IFJlc3BvbnNlTWVzc2FnZSgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgUHJvZHVjdC5yZW1vdmUoaWRQcm9kdWN0KTtcbiAgICAgICAgICAgICAgICByZXNwb25zZU1lc3NhZ2UuY3JlYXRlKCdQcm9kdWN0byBlbGltaW5hZG8gZXhpdG9zYW1lbnRlJyk7XG4gICAgICAgIH1jYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdwcm9kdWN0LmRlbGV0ZScsIGV4Y2VwdGlvbik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc1MDAnLCAnT2N1cnJpbyB1biBlcnJvciBhbCBlbGltaW5hciBlbCBwcm9kdWN0bycpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlTWVzc2FnZTtcbiAgICB9XG59KTtcbiIsImltcG9ydCB7IFByb2R1Y3QgfSBmcm9tICcuL1Byb2R1Y3QnO1xuaW1wb3J0IHsgUGVybWlzc2lvbk1pZGRsZXdhcmUgfSBmcm9tICcuLi8uLi9taWRkbGV3YXJlcy9QZXJtaXNzaW9uTWlkZGxld2FyZSc7XG5pbXBvcnQgUGVybWlzc2lvbnMgZnJvbSAnLi4vLi4vc3RhcnR1cC9zZXJ2ZXIvUGVybWlzc2lvbnMnO1xuXG5jb25zdCBwcm9kdWN0UHVibGljYXRpb249bmV3IFB1Ymxpc2hFbmRwb2ludCgncHJvZHVjdC5saXN0JyxmdW5jdGlvbihwYXJhbTEpe1xuICAgICAgICByZXR1cm4gUHJvZHVjdC5maW5kKHt9LHtcbiAgICAgICAgICAgICAgICBpc0F2YWlsYWJsZToxLFxuICAgICAgICAgICAgICAgICAgbmFtZToxLFxuICAgICAgICAgICAgICAgICAgbmFtZV9mdWxsOjEsXG4gICAgICAgICAgICAgICAgICB1bml0OjEsXG4gICAgICAgICAgICAgICAgICBzdG9jazoxLFxuICAgICAgICAgICAgICAgICAgbG9jYXRpb246MSxcbiAgICAgICAgICAgICAgICAgIHNrdToxLFxuICAgICAgICAgICAgICAgICAgd2FyZWhvdXNlOjEsXG4gICAgICAgICAgICAgICAgICBwcm9kdWN0aW9uX2xpbmU6MVxuICAgICAgICAgICAgICB9KTtcbn0pO1xuXG5wcm9kdWN0UHVibGljYXRpb24udXNlKG5ldyBQZXJtaXNzaW9uTWlkZGxld2FyZShQZXJtaXNzaW9ucy5QUk9EVUNUUy5MSVNULlZBTFVFKSk7IiwiaW1wb3J0IHtQcm9kdWN0fSBmcm9tIFwiLi9Qcm9kdWN0XCI7XG5cbi8vUHJvZHVjdC5yYXdDb2xsZWN0aW9uKCkuY3JlYXRlSW5kZXgoeyduYW1lJzoxfSx7dW5pcXVlOiB0cnVlfSk7XG4iLCJcbmltcG9ydCB7TWV0ZW9yfSBmcm9tIFwibWV0ZW9yL21ldGVvclwiO1xuaW1wb3J0IHtQcm9kdWN0fSBmcm9tIFwiLi9Qcm9kdWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBcbiAgICB2YWxpZGF0ZVByb2R1Y3ROYW1lKG5ld1Byb2R1Y3ROYW1lLGlkUHJvZHVjdCl7XG4gICAgICAgIGNvbnN0IGV4aXN0c1Byb2R1Y3Q9IFByb2R1Y3QuZmluZE9uZSh7bmFtZTpuZXdQcm9kdWN0TmFtZX0pO1xuICAgICAgICBpZihpZFByb2R1Y3QgIT09IG51bGwpeyAgLy8gYWN0dWFsaXphY2lvbiBkZSBwcm9kdWN0b1xuICAgICAgICAgICAgY29uc3Qgb2xkUHJvZHVjdD0gUHJvZHVjdC5maW5kT25lKGlkUHJvZHVjdCk7XG4gICAgICAgICAgICBpZihvbGRQcm9kdWN0Lm5hbWUgIT09IG5ld1Byb2R1Y3ROYW1lICYmIGV4aXN0c1Byb2R1Y3Qpe1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzQwMycsICdFbCBudWV2byBub21icmUgZGUgcHJvZHVjdG8geWEgZXN0YSBzaWVuZG8gdXNhZG8nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2UgaWYoZXhpc3RzUHJvZHVjdCl7IC8vIGVzIHByb2R1Y3RvIG51ZXZvIHBlcm8gZWwgbm9tYnJlICB5YSBleGlzdGUuXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignNDAzJywgJ0VsIG51ZXZvIG5vbWJyZSBkZWwgcHJvZHVjdG8gIHlhIGVzdGEgc2llbmRvIHV0aWxpemFkbycpO1xuXG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHtNb25nb30gZnJvbSAnbWV0ZW9yL21vbmdvJ1xuXG5leHBvcnQgY29uc3QgUHJvZmlsZSA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdwcm9maWxlcycpO1xuIiwiaW1wb3J0IHtjaGVjaywgTWF0Y2h9IGZyb20gXCJtZXRlb3IvY2hlY2tcIjtcbmltcG9ydCB7UHJvZmlsZX0gZnJvbSBcIi4vUHJvZmlsZVwiO1xuaW1wb3J0IHtSZXNwb25zZU1lc3NhZ2V9IGZyb20gXCIuLi8uLi9zdGFydHVwL3NlcnZlci91dGlsaXRpZXMvUmVzcG9uc2VNZXNzc2FnZVwiO1xuaW1wb3J0IFByb2ZpbGVTZXJ2IGZyb20gXCIuL1Byb2ZpbGVzU2VydlwiO1xuaW1wb3J0IFBlcm1pc3Npb25zIGZyb20gXCIuLi8uLi9zdGFydHVwL3NlcnZlci9QZXJtaXNzaW9uc1wiO1xuaW1wb3J0IEF1dGhHdWFyZCBmcm9tIFwiLi4vLi4vbWlkZGxld2FyZXMvQXV0aEd1YXJkXCI7XG5cblxubmV3IFZhbGlkYXRlZE1ldGhvZCh7XG4gICAgbmFtZTogJ3Byb2ZpbGUuc2F2ZScsXG4gICAgbWl4aW5zOiBbTWV0aG9kSG9va3NdLFxuICAgIHBlcm1pc3Npb25zOiBbUGVybWlzc2lvbnMuUFJPRklMRVMuQ1JFQVRFLlZBTFVFLFBlcm1pc3Npb25zLlBST0ZJTEVTLlVQREFURS5WQUxVRV0sXG4gICAgYmVmb3JlSG9va3M6IFtBdXRoR3VhcmQuY2hlY2tQZXJtaXNzaW9uXSwgIC8vIEFxdWkgc2UgdmVyaWZpY2Egc2kgbG9zIHBlcm1pc29zIGRlIHVzdWFyaW8gc29uIGFkZWN1YWRvcyBwYXJhIGVzdGEgYWNjaW9uXG4gICAgYWZ0ZXJIb29rczogW10sXG4gICAgdmFsaWRhdGUocHJvZmlsZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gVmFsaWRhIHF1ZSBsYSBlc3RydWN0dXJhIGRlbCBvYmpldG8gdXNlciBlc3RlIGNvbmZvcm1lIGEgbGEgZGVmaW5pY2lvbi5cbiAgICAgICAgICAgIGNoZWNrKHByb2ZpbGUsIHtcbiAgICAgICAgICAgICAgICBfaWQ6IE1hdGNoLk9uZU9mKFN0cmluZywgbnVsbCksXG4gICAgICAgICAgICAgICAgbmFtZTogU3RyaW5nLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgcGVybWlzc2lvbnM6IFtTdHJpbmddXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdwcm9maWxlLnNhdmUnLCBleGNlcHRpb24pO1xuICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignNDAzJywgJ0xhIGluZm9ybWFjaW9uIGludHJvZHVjaWRhIG5vIGVzIHbDoWxpZGEuJyk7XG4gICAgICAgIH1cbiAgICAgICAgUHJvZmlsZVNlcnYudmFsaWRhdGVQcm9maWxlTmFtZShwcm9maWxlLm5hbWUscHJvZmlsZS5faWQpO1xuICAgIH0sXG4gICAgcnVuKHByb2ZpbGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3Byb2ZpbGUuc2F2ZScpO1xuICAgICAgICBjb25zdCByZXNwb25zZU1lc3NhZ2U9IG5ldyBSZXNwb25zZU1lc3NhZ2UoKTtcbiAgICAgICAgaWYocHJvZmlsZS5faWQgIT09bnVsbCl7XG4gICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkUHJvZmlsZT0gUHJvZmlsZS5maW5kT25lKHByb2ZpbGUuX2lkKTtcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VycyA9IFByb2ZpbGVTZXJ2LmdldFVzZXJzQnlwcm9maWxlKHByb2ZpbGUuX2lkKTtcbiAgICAgICAgICAgICAgICBQcm9maWxlLnVwZGF0ZShwcm9maWxlLl9pZCx7XG4gICAgICAgICAgICAgICAgICAgICRzZXQ6e1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcHJvZmlsZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHByb2ZpbGUuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uczogcHJvZmlsZS5wZXJtaXNzaW9uc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gQXF1aSBkZWJlbW9zIGFjdHVhbGl6YXIgYSBsb3MgdXN1YXJpb3MgY29uIGVsIHBlcmZpbCBhbnRlcmlvciBwb3IgZWwgbnVldm9cbiAgICAgICAgICAgICAgICBpZihvbGRQcm9maWxlLm5hbWUgIT09IHByb2ZpbGUubmFtZSl7XG4gICAgICAgICAgICAgICAgICBNZXRlb3IudXNlcnMudXBkYXRlKHsncHJvZmlsZS5wcm9maWxlJzpvbGRQcm9maWxlLm5hbWV9LHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJHNldDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwcm9maWxlLnByb2ZpbGUnOiBwcm9maWxlLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0se211bHRpOiB0cnVlfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gQWN0dWFsaXphbW9zIGxvcyBwZXJtaXNvcyBwYXJhIGVsIG51ZXZvIHJvbCBhIHRvZG9zIGxvcyB1c3VhcmlvcyBlbiBsYSB0YWJsYSBkZSByZWxhY2lvblxuICAgICAgICAgICAgICAgIC8vIHJvbGUtYXNzaWdubWVudFxuICAgICAgICAgICAgICAgIFByb2ZpbGVTZXJ2LnVwZGF0ZVByb2ZpbGVVc2Vycyh1c2Vycyxwcm9maWxlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU2UgaGEgYWN0dWFsaXphZG8gZWwgcGVyZmlsJyk7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VNZXNzYWdlLmNyZWF0ZSgnU2UgaGEgYWN0dWFsaXphZG8gZWwgcGVyZmlsJyk7XG4gICAgICAgICAgICB9Y2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3Byb2ZpbGUuc2F2ZScsIGV4Y2VwdGlvbik7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignNTAwJywgJ09jdXJyacOzIHVuIGVycm9yIGFsIGFjdHVhbGl6YXIgZWwgcGVyZmlsJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BlcmZpbDogJyxwcm9maWxlKTtcbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICBQcm9maWxlLmluc2VydCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHByb2ZpbGUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHByb2ZpbGUuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb25zOiBwcm9maWxlLnBlcm1pc3Npb25zXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1NlIGhhIGd1YXJkYWRvIGVsIHBlcmZpbCcpO1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlTWVzc2FnZS5jcmVhdGUoJ1NlIGhhIGd1YXJkYWRvIGVsIHBlcmZpbCcpO1xuICAgICAgICAgICAgfWNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdwcm9maWxlLnNhdmUnLCBleGNlcHRpb24pO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzUwMCcsICdPY3VycmnDsyB1biBlcnJvciBhbCBndWFyZGFyIGVsIHBlcmZpbCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4gcmVzcG9uc2VNZXNzYWdlO1xuICAgIH1cbn0pO1xuXG5uZXcgVmFsaWRhdGVkTWV0aG9kKHtcbiAgICBuYW1lOiAncHJvZmlsZS5kZWxldGUnLFxuICAgIG1peGluczogW01ldGhvZEhvb2tzXSxcbiAgICBwZXJtaXNzaW9uczogW1Blcm1pc3Npb25zLlBST0ZJTEVTLkRFTEVURS5WQUxVRV0sXG4gICAgYmVmb3JlSG9va3M6IFtBdXRoR3VhcmQuY2hlY2tQZXJtaXNzaW9uXSwgIC8vIEFxdWkgc2UgdmVyaWZpY2Egc2kgbG9zIHBlcm1pc29zIGRlIHVzdWFyaW8gc29uIGFkZWN1YWRvcyBwYXJhIGVzdGEgYWNjaW9uXG4gICAgYWZ0ZXJIb29rczogW10sXG4gICAgdmFsaWRhdGUoeyBpZFByb2ZpbGUgfSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjaGVjayhpZFByb2ZpbGUsIFN0cmluZyk7XG4gICAgICAgIH1jYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdwcm9maWxlLmRlbGV0ZScsIGV4Y2VwdGlvbik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc0MDMnLCAnT2N1cnJpbyB1biBlcnJvciBhbCBlbGltaW5hciBlbCBwZXJmaWwnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB2YWxpZGFyIHF1ZSBubyBzZWEgcG9zaWJsZSBlbGltaW5hciB1biBwZXJmaWwgc2kgaGF5IHVuIHVzdWFyaW8gdXRpbGl6YW5kb2xvLlxuICAgICAgICBjb25zdCB1c2VyV2l0aFByb2ZpbGUgPSBQcm9maWxlU2Vydi5nZXRVc2Vyc0J5cHJvZmlsZShpZFByb2ZpbGUpO1xuICAgICAgICBjb25zb2xlLmxvZygnaWRQcm9maWxlJywgaWRQcm9maWxlKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3VzZXJXaXRoUHJvZmlsZScsIHVzZXJXaXRoUHJvZmlsZSlcbiAgICAgICAgaWYgKHVzZXJXaXRoUHJvZmlsZS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzQwMycsJ05vIGVzIHBvc2libGUgZWxpbWlhciBlbCBwZXJmaWwnLFxuICAgICAgICAgICAgICAgICdIYXkgYWwgbWVub3MgdW4gdXN1YXJpbyB1dGlsaXphbmRvIGVsIHBlcmZpbCcpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBydW4oeyBpZFByb2ZpbGUgfSl7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlTWVzc2FnZSA9IG5ldyBSZXNwb25zZU1lc3NhZ2UoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBQcm9maWxlLnJlbW92ZShpZFByb2ZpbGUpO1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlTWVzc2FnZS5jcmVhdGUoJ1BlcmZpbCBlbGltaW5hZG8gZXhpdG9zYW1lbnRlJyk7XG4gICAgICAgIH1jYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdwcm9maWxlLmRlbGV0ZScsIGV4Y2VwdGlvbik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc1MDAnLCAnT2N1cnJpbyB1biBlcnJvciBhbCBlbGltaW5hciBlbCBwZXJmaWwnKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlTWVzc2FnZTtcbiAgICB9XG59KTsiLCJpbXBvcnQgUGVybWlzc2lvbnMsIHtwZXJtaXNzaW9uc0FycmF5fSBmcm9tICcuLi8uLi9zdGFydHVwL3NlcnZlci9QZXJtaXNzaW9ucyc7XG5pbXBvcnQge1Byb2ZpbGV9IGZyb20gXCIuL1Byb2ZpbGVcIjtcblxuUHJvZmlsZS5yYXdDb2xsZWN0aW9uKCkuY3JlYXRlSW5kZXgoeyduYW1lJzoxfSx7dW5pcXVlOiB0cnVlfSk7XG5cblxuZXhwb3J0IGNvbnN0IFN0YXRpY1Byb2ZpbGVzPXtcbiAgICBhZG1pbjoge1xuICAgICAgICBuYW1lOiAnYWRtaW4nLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0FkbWluaXN0cmFkb3InLFxuICAgICAgICBwZXJtaXNzaW9uczogcGVybWlzc2lvbnNBcnJheS5tYXAocD0+cC5WQUxVRSlcbiAgICB9XG59O1xuXG5pZihNZXRlb3IuaXNEZXZlbG9wbWVudCl7XG4gICAgaWYoTWV0ZW9yLnNldHRpbmdzLnByaXZhdGUgJiYgTWV0ZW9yLnNldHRpbmdzLnByaXZhdGUuUkVGUkVTSF9TVEFUSUNfUFJPRklMRVMpe1xuICAgICAgICBjb25zb2xlLmxvZygnVXBkYXRpbmcgc3RhdGljIHByb2ZpbGVzJyk7XG4gICAgICAgIE9iamVjdC5rZXlzKFN0YXRpY1Byb2ZpbGVzKS5mb3JFYWNoKHN0YXRpY3Byb2ZpbGVOYW1lID0+IHtcbiAgICAgICAgICAgIFByb2ZpbGUudXBzZXJ0KHtuYW1lOlN0YXRpY1Byb2ZpbGVzW3N0YXRpY3Byb2ZpbGVOYW1lXS5uYW1lfSx7XG4gICAgICAgICAgICAgICAkc2V0OntcbiAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjpTdGF0aWNQcm9maWxlc1tzdGF0aWNwcm9maWxlTmFtZV0uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbnM6U3RhdGljUHJvZmlsZXNbc3RhdGljcHJvZmlsZU5hbWVdLnBlcm1pc3Npb25zXG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIE1ldGVvci51c2Vycy5maW5kKHsncHJvZmlsZS5wcm9maWxlJzpTdGF0aWNQcm9maWxlc1tzdGF0aWNwcm9maWxlTmFtZV0ubmFtZX0pLmZldGNoKCkuZm9yRWFjaCh1c2VyID0+IHtcblxuICAgICAgICAgICAgICAgLy8gTWV0ZW9yLnJvbGVBc3NpZ25tZW50cy5yZW1vdmUoeyd1c2VyLl9pZCc6dXNlci5faWR9KTtcbiAgICAgICAgICAgICAgICAvL1JvbGVBc3NpZ25tZW50LnJlbW92ZSh7J3VzZXIuX2lkJzp1c2VyLl9pZH0pO1xuICAgICAgICAgICAgICAgaWYoU3RhdGljUHJvZmlsZXNbc3RhdGljcHJvZmlsZU5hbWVdLnBlcm1pc3Npb25zLmxlbmd0aD4wKXtcbiAgICAgICAgICAgICAgICAgICBSb2xlcy5zZXRVc2VyUm9sZXModXNlci5faWQsU3RhdGljUHJvZmlsZXNbc3RhdGljcHJvZmlsZU5hbWVdLnBlcm1pc3Npb25zLFN0YXRpY1Byb2ZpbGVzW3N0YXRpY3Byb2ZpbGVOYW1lXS5uYW1lKTtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59IiwiaW1wb3J0IHsgUHJvZmlsZSB9IGZyb20gJy4vUHJvZmlsZSc7XG5pbXBvcnQgUHJvZmlsZXNTZXJ2IGZyb20gXCIuL1Byb2ZpbGVzU2VydlwiO1xuaW1wb3J0IHtQZXJtaXNzaW9uTWlkZGxld2FyZX0gZnJvbSBcIi4uLy4uL21pZGRsZXdhcmVzL1Blcm1pc3Npb25NaWRkbGV3YXJlXCI7XG5pbXBvcnQgUGVybWlzc2lvbnMgZnJvbSBcIi4uLy4uL3N0YXJ0dXAvc2VydmVyL1Blcm1pc3Npb25zXCI7XG5cbmNvbnN0IG5vdFN0YXRpY1Byb2ZpbGVQdWJsaWNhdGlvbj1uZXcgUHVibGlzaEVuZHBvaW50KCdub3RTdGF0aWNQcm9maWxlLmxpc3QnLCBmdW5jdGlvbihwYXJhbTEpIHtcbiAgICAgICAgIHJldHVybiBQcm9maWxlLmZpbmQoe25hbWU6IHsgJG5pbjpQcm9maWxlc1NlcnYuZ2V0U3RhdGljcHJvZmlsZXNOYW1lKCl9fSk7XG4gICAgfSk7XG5jb25zdCBwcm9maWxlUHVibGljYXRpb249bmV3IFB1Ymxpc2hFbmRwb2ludCgncHJvZmlsZS5saXN0QWxsJywgZnVuY3Rpb24ocGFyYW0xKSB7XG4gICAgcmV0dXJuIFByb2ZpbGUuZmluZCgpO1xufSk7XG5cbm5vdFN0YXRpY1Byb2ZpbGVQdWJsaWNhdGlvbi51c2UobmV3IFBlcm1pc3Npb25NaWRkbGV3YXJlKFBlcm1pc3Npb25zLlBST0ZJTEVTLkxJU1QuVkFMVUUpKTtcbnByb2ZpbGVQdWJsaWNhdGlvbi51c2UobmV3IFBlcm1pc3Npb25NaWRkbGV3YXJlKFBlcm1pc3Npb25zLlBST0ZJTEVTLkxJU1QuVkFMVUUpKTtcbiIsImltcG9ydCB7UHJvZmlsZX0gZnJvbSAnLi9Qcm9maWxlJztcbmltcG9ydCB7TWV0ZW9yfSBmcm9tICdtZXRlb3IvbWV0ZW9yJ1xuaW1wb3J0IHtTdGF0aWNQcm9maWxlc30gZnJvbSBcIi4vUHJvZmlsZVNlZWRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBnZXRVc2Vyc0J5cHJvZmlsZShpZFBydG9maWxlKXtcbiAgICAgICAgICAgIGNvbnN0IHByb2ZpbGUgPSBQcm9maWxlLmZpbmRPbmUoaWRQcnRvZmlsZSk7XG4gICAgICAgICAgICByZXR1cm4gTWV0ZW9yLnVzZXJzLmZpbmQoeydwcm9maWxlLnByb2ZpbGUnOnByb2ZpbGUubmFtZX0pLmZldGNoKCk7XG4gICAgICAgIH0sXG4gICAgc2V0VXNlcnNSb2xlcyhpZFVzZXIsIHByb2ZpbGVOYW1lKXtcbiAgICAgICAgY29uc3QgcGVybWlzc2lvbnM9IFByb2ZpbGUuZmluZE9uZSh7J25hbWUnOnByb2ZpbGVOYW1lfSkucGVybWlzc2lvbnM7XG4gICAgICAgICBNZXRlb3Iucm9sZUFzc2lnbm1lbnQucmVtb3ZlKHsndXNlci5faWQnOiBpZFVzZXJ9KTtcbiAgICAgICAgIFJvbGVzLnNldFVzZXJSb2xlcyhpZFVzZXIscGVybWlzc2lvbnMscHJvZmlsZU5hbWUpO1xuICAgICAgICB9LFxuICAgIHVwZGF0ZVByb2ZpbGVVc2Vycyh1c2Vycyxwcm9maWxlKXtcbiAgICAgIHVzZXJzLmZvckVhY2godXNlciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRVc2Vyc1JvbGVzKHVzZXIuX2lkLHByb2ZpbGUubmFtZSk7XG4gICAgICAgICAgIH0pO1xuICAgIH0sdmFsaWRhdGVQcm9maWxlTmFtZShuZXdQcm9maWxlTmFtZSxpZFByb2ZpbGUpe1xuICAgICAgICBjb25zdCBxdWVyeSA9IHsgbmFtZTogbmV3UHJvZmlsZU5hbWUgfTtcbiAgICAgICAgY29uc3QgZXhpc3RzUHJvZmlsZU5hbWU9IFByb2ZpbGUuZmluZE9uZShxdWVyeSk7XG4gICAgICAgIGlmIChpZFByb2ZpbGUpeyAvLyBhY3R1YWxpemFjaW9uIGRlIHVzdWFyaW8vL1xuICAgICAgICAgICAgY29uc3Qgb2xkUHJvZmlsZT0gUHJvZmlsZS5maW5kT25lKGlkUHJvZmlsZSk7XG4gICAgICAgICAgICBpZihvbGRQcm9maWxlLm5hbWUgIT09IG5ld1Byb2ZpbGVOYW1lICYmIGV4aXN0c1Byb2ZpbGVOYW1lKXtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc0MDMnLCAnRWwgbm9tYnJlIGRlbCBQZXJmaWwgIHlhIGVzdGEgc2llbmRvIHV0aWxpemFkbycpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1lbHNlIGlmKGV4aXN0c1Byb2ZpbGVOYW1lKXsgLy8gRWwgbm9tYnJlIGRlIE5VRVZPIHByb2ZpbGUgeWEgZXhpc3RlXG4gICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc0MDMnLCAnRWwgbm9tYnJlIGRlbCBQZXJmaWwgIHlhIGVzdGEgc2llbmRvIHV0aWxpemFkbycpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRTdGF0aWNwcm9maWxlc05hbWUoKXtcblxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoU3RhdGljUHJvZmlsZXMpLm1hcChzdGF0aWNwcm9maWxlTmFtZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gU3RhdGljUHJvZmlsZXNbc3RhdGljcHJvZmlsZU5hbWVdLm5hbWU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG59IiwiaW1wb3J0IHsgTW9uZ28gfSBmcm9tICdtZXRlb3IvbW9uZ28nO1xuXG5leHBvcnQgY29uc3QgUHJvdmlkZXIgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbigncHJvdmlkZXJzJyk7XG4iLCJpbXBvcnQge1ZhbGlkYXRlZE1ldGhvZH0gZnJvbSAnbWV0ZW9yL21kZzp2YWxpZGF0ZWQtbWV0aG9kJztcbmltcG9ydCB7UmVzcG9uc2VNZXNzYWdlfSBmcm9tIFwiLi4vLi4vc3RhcnR1cC9zZXJ2ZXIvdXRpbGl0aWVzL1Jlc3BvbnNlTWVzc3NhZ2VcIjtcbmltcG9ydCBBdXRoR3VhcmQgZnJvbSBcIi4uLy4uL21pZGRsZXdhcmVzL0F1dGhHdWFyZFwiO1xuaW1wb3J0IFBlcm1pc3Npb25zIGZyb20gXCIuLi8uLi9zdGFydHVwL3NlcnZlci9QZXJtaXNzaW9uc1wiO1xuaW1wb3J0IHtQcm92aWRlcn0gZnJvbSBcIi4vUHJvdmlkZXJcIjtcbmltcG9ydCBQcm92aWRlclNlcnYgZnJvbSBcIi4vUHJvdmlkZXJTZXJ2XCI7XG5pbXBvcnQge2NoZWNrLCBNYXRjaH0gZnJvbSBcIm1ldGVvci9jaGVja1wiO1xuXG5uZXcgVmFsaWRhdGVkTWV0aG9kKHtcbiAgICBuYW1lOidwcm92aWRlci5zYXZlJyxcbiAgICAgbWl4aW5zOltNZXRob2RIb29rc10sXG4gICAgIHBlcm1pc3Npb25zOiBbUGVybWlzc2lvbnMuUFJPVklERVJTLkNSRUFURS5WQUxVRSxQZXJtaXNzaW9ucy5QUk9WSURFUlMuVVBEQVRFLlZBTFVFXSwgIFxuICAgICBiZWZvcmVIb29rczogW0F1dGhHdWFyZC5jaGVja1Blcm1pc3Npb25dLFxuICAgIHZhbGlkYXRlKHByb3ZpZGVyKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2hlY2socHJvdmlkZXIse1xuICAgICAgICAgICAgICAgIF9pZDogTWF0Y2guT25lT2YoU3RyaW5nLCBudWxsKSxcbiAgICAgICAgICAgICAgICBuYW1lOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgbmFtZV9mdWxsOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgcHJvdmlkZXJCdXNzaW5lc3NJZDogU3RyaW5nLFxuICAgICAgICAgICAgICAgIGFkZHJlc3M6IFN0cmluZyxcbiAgICAgICAgICAgICAgICBwaG9uZXM6IFN0cmluZyxcbiAgICAgICAgICAgICAgICB3ZWI6IFN0cmluZyxcbiAgICAgICAgICAgICAgICBlbWFpbDogU3RyaW5nLFxuICAgICAgICAgICAgICAgIGlzQXZhaWxhYmxlOiBCb29sZWFuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9Y2F0Y2ggKCBleGNlcHRpb24pe1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcigncHJvdmlkZXIuc2F2ZScsIGV4Y2VwdGlvbik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc0MDMnLCAnTGEgaW5mb3JtYWNpb24gaW50cm9kdWNpZGEgbm8gZXMgdmFsaWRhJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVmFsaWRhciBxdWUgbm8gaGF5YSBwcm92ZWVkb3JlcyBjb24gZWwgbWlzbW8gbm9tYnJlIHkgQnVzc2luZXNJRFxuICAgICAgICBQcm92aWRlclNlcnYudmFsaWRhdGVQcm92aWRlckJ1c3NpbmVzc0lkKHByb3ZpZGVyLnByb3ZpZGVyQnVzc2luZXNzSWQscHJvdmlkZXIuX2lkKTtcbiAgICAgICAgUHJvdmlkZXJTZXJ2LnZhbGlkYXRlUHJvdmlkZXJOYW1lKHByb3ZpZGVyLm5hbWUscHJvdmlkZXIuX2lkKTtcbiAgICB9LFxuICAgIHJ1bihwcm92aWRlcil7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlTWVzc2FnZSA9IG5ldyBSZXNwb25zZU1lc3NhZ2UoKTsgXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZihwcm92aWRlci5faWQgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIFByb3ZpZGVyLnVwZGF0ZShwcm92aWRlci5faWQse1xuICAgICAgICAgICAgICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHByb3ZpZGVyLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWVfZnVsbDogcHJvdmlkZXIubmFtZV9mdWxsLFxuICAgICAgICAgICAgICAgICAgICBwcm92aWRlckJ1c3NpbmVzc0lkOiBwcm92aWRlci5wcm92aWRlckJ1c3NpbmVzc0lkLFxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiBwcm92aWRlci5hZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICBwaG9uZXM6IHByb3ZpZGVyLnBob25lcyxcbiAgICAgICAgICAgICAgICAgICAgd2ViOiBwcm92aWRlci53ZWIsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiBwcm92aWRlci5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgaXNBdmFpbGFibGU6IHByb3ZpZGVyLmlzQXZhaWxhYmxlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXNwb25zZU1lc3NhZ2UuY3JlYXRlKCdTZSBhY3R1YWxpesOzIGVsIHByb3ZlZWRvciBleGl0b3NhbWVudGUnKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIFByb3ZpZGVyLmluc2VydCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHByb3ZpZGVyLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWVfZnVsbDogcHJvdmlkZXIubmFtZV9mdWxsLFxuICAgICAgICAgICAgICAgICAgICBwcm92aWRlckJ1c3NpbmVzc0lkOiBwcm92aWRlci5wcm92aWRlckJ1c3NpbmVzc0lkLFxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiBwcm92aWRlci5hZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICBwaG9uZXM6IHByb3ZpZGVyLnBob25lcyxcbiAgICAgICAgICAgICAgICAgICAgd2ViOiBwcm92aWRlci53ZWIsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiBwcm92aWRlci5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgaXNBdmFpbGFibGU6IHByb3ZpZGVyLmlzQXZhaWxhYmxlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VNZXNzYWdlLmNyZWF0ZSgnU2UgaW5zZXJ0w7MgZWwgcHJvdmVlZG9yIGV4aXRvc2FtZW50ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9Y2F0Y2ggKCBleGNlcHRpb24pe1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignY29tcGFueS5zYXZlJywgZXhjZXB0aW9uKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzUwMCcsICdIYSBvY3VycmlkbyB1biBlcnJvciBhbCBndWFyZGFyIGVsIHByb3ZlZWRvcicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZU1lc3NhZ2U7XG4gICAgfVxuIH0pO1xuXG5uZXcgVmFsaWRhdGVkTWV0aG9kKHtcbiAgICBuYW1lOiAncHJvdmlkZXIuZGVsZXRlJyxcbiAgICBtaXhpbnM6IFtNZXRob2RIb29rc10sXG4gICAgcGVybWlzc2lvbnM6IFtQZXJtaXNzaW9ucy5QUk9WSURFUlMuREVMRVRFLlZBTFVFXSxcbiAgICBiZWZvcmVIb29rczogW0F1dGhHdWFyZC5jaGVja1Blcm1pc3Npb25dLCAgLy8gQXF1aSBzZSB2ZXJpZmljYSBzaSBsb3MgcGVybWlzb3MgZGUgdXN1YXJpbyBzb24gYWRlY3VhZG9zIHBhcmEgZXN0YSBhY2Npb25cbiAgICBhZnRlckhvb2tzOiBbXSxcbiAgICB2YWxpZGF0ZSh7IGlkUHJvdmlkZXIgfSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjaGVjayhpZFByb3ZpZGVyLCBTdHJpbmcpO1xuICAgICAgICB9Y2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcigncHJvdmlkZXIuZGVsZXRlJywgZXhjZXB0aW9uKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzQwMycsICdPY3VycmlvIHVuIGVycm9yIGFsIGVsaW1pbmFyIGFsIHByb3ZlZWRvcicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHZhbGlkYXIgcXVlIG5vIHNlYSBwb3NpYmxlIGVsaW1pbmFyIHVuIHByb3ZlZWRvciBzaSBoYXkgdW4gcHJvZHVjdG8gdXRpbGl6YW5kb2xvLlxuICAgICAgICAvLyBUb0RvIFxuICAgICAgICBjb25zdCB0b1VzZUluVG9Qcm9kdWN0ID0gMDtcbiAgICAgICAgLy9Db21wYW55U2Vydi5nZXRVc2Vyc0J5Y29tcGFueShpZENvbXBhbnkpO1xuXG4gICAgICAgIGlmICh0b1VzZUluVG9Qcm9kdWN0Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignNDAzJywnTm8gZXMgcG9zaWJsZSBlbGltaWFyIGFsIHByb3ZlZWRvcicsXG4gICAgICAgICAgICAgICAgJ0hheSBhbCBtZW5vcyB1biBwcm9kdWN0byB1dGlsaXphbmRvIGFsIHByb3ZlZWRvcicpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBydW4oeyBpZFByb3ZpZGVyfSl7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlTWVzc2FnZSA9IG5ldyBSZXNwb25zZU1lc3NhZ2UoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIFByb3ZpZGVyLnJlbW92ZShpZFByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICByZXNwb25zZU1lc3NhZ2UuY3JlYXRlKCdQcm92ZWVkb3IgZWxpbWluYWRvIGV4aXRvc2FtZW50ZScpO1xuICAgICAgICB9Y2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcigncHJvdmlkZXIuZGVsZXRlJywgZXhjZXB0aW9uKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzUwMCcsICdPY3VycmlvIHVuIGVycm9yIGFsIGVsaW1pbmFyIGFsIHByb3ZlZWRvcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlTWVzc2FnZTtcbiAgICB9XG59KTtcbiIsImltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAnLi9Qcm92aWRlcic7XG5pbXBvcnQgeyBQZXJtaXNzaW9uTWlkZGxld2FyZSB9IGZyb20gJy4uLy4uL21pZGRsZXdhcmVzL1Blcm1pc3Npb25NaWRkbGV3YXJlJztcbmltcG9ydCBQZXJtaXNzaW9ucyBmcm9tICcuLi8uLi9zdGFydHVwL3NlcnZlci9QZXJtaXNzaW9ucyc7XG5cbmNvbnN0IHByb3ZpZGVyUHVibGljYXRpb249bmV3IFB1Ymxpc2hFbmRwb2ludCgncHJvdmlkZXIubGlzdCcsZnVuY3Rpb24ocGFyYW0xKXtcbiAgICAgICAgcmV0dXJuIFByb3ZpZGVyLmZpbmQoe30se30pO1xufSk7XG5cbnByb3ZpZGVyUHVibGljYXRpb24udXNlKG5ldyBQZXJtaXNzaW9uTWlkZGxld2FyZShQZXJtaXNzaW9ucy5QUk9WSURFUlMuTElTVC5WQUxVRSkpOyIsIlxuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICcuL1Byb3ZpZGVyJztcblxuXG5Qcm92aWRlci5yYXdDb2xsZWN0aW9uKCkuY3JlYXRlSW5kZXgoXG4gICAge1wicHJvdmlkZXJCdXNzaW5lc3NJZFwiIDogMSx9LHt1bmlxdWU6IHRydWV9XG4gICAgKTtcbiIsIlxuaW1wb3J0IHtNZXRlb3J9IGZyb20gXCJtZXRlb3IvbWV0ZW9yXCI7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gXCIuL1Byb3ZpZGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIHZhbGlkYXRlUHJvdmlkZXJCdXNzaW5lc3NJZChuZXdQcm92aWRlckJ1c3NpbmVzSWQsaWRQcm92aWRlcil7XG5cbiAgICAgICAgY29uc3QgZXhpc3RzUHJvdmlkZXI9IFByb3ZpZGVyLmZpbmRPbmUoe3Byb3ZpZGVyQnVzc2luZXNzSWQ6bmV3UHJvdmlkZXJCdXNzaW5lc0lkfSk7XG4gICAgICAgIGlmKGlkUHJvdmlkZXIgIT09IG51bGwpeyAgLy8gYWN0dWFsaXphY2lvbiBkZSBQcm92ZWVkb3JcbiAgICAgICAgICAgIGNvbnN0IG9sZFByb3ZpZGVyPSBQcm92aWRlci5maW5kT25lKGlkUHJvdmlkZXIpO1xuICAgICAgICAgICAgaWYob2xkUHJvdmlkZXIucHJvdmlkZXJCdXNzaW5lc3NJZCAhPT0gbmV3UHJvdmlkZXJCdXNzaW5lc0lkICYmIGV4aXN0c1Byb3ZpZGVyKXtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc0MDMnLCAnRWwgbnVldm8gUkZDIGRlbCBwcm92ZWVkb3IgeWEgZXN0YSBzaWVuZG8gdXNhZG8nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2UgaWYoZXhpc3RzUHJvdmlkZXIpeyAvLyBlcyBjb21wYcOxaWEgbnVldm8gcGVybyBlbCBQcm92aWRlckJ1c3NpbmVzSWQgIHlhIGV4aXN0ZS5cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc0MDMnLCAnRWwgbnVldm8gUkZDIGRlbCBwcm92ZWVkb3IgeWEgZXN0YSBzaWVuZG8gdXRpbGl6YWRvJyk7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcbiAgICB2YWxpZGF0ZVByb3ZpZGVyTmFtZShuZXdQcm92aWRlck5hbWUsaWRQcm92aWRlcil7XG4gICAgICAgIGNvbnN0IGV4aXN0c1Byb3ZpZGVyPSBQcm92aWRlci5maW5kT25lKHtuYW1lOm5ld1Byb3ZpZGVyTmFtZX0pO1xuICAgICAgICBpZihpZFByb3ZpZGVyICE9PSBudWxsKXsgIC8vIGFjdHVhbGl6YWNpb24gZGUgcHJvdmVlZG9yXG4gICAgICAgICAgICBjb25zdCBvbGRQcm92aWRlcj0gUHJvdmlkZXIuZmluZE9uZShpZFByb3ZpZGVyKTtcbiAgICAgICAgICAgIGlmKG9sZFByb3ZpZGVyLm5hbWUgIT09IG5ld1Byb3ZpZGVyTmFtZSAmJiBleGlzdHNQcm92aWRlcil7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignNDAzJywgJ0VsIG51ZXZvIG5vbWJyZSBkZWwgcHJvdmVlZG9yIHlhIGVzdGEgc2llbmRvIHVzYWRvJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNlIGlmKGV4aXN0c1Byb3ZpZGVyKXsgLy8gZXMgcHJvdmVlZG9yIG51ZXZvIHBlcm8gZWwgbmFtZSAgeWEgZXhpc3RlLlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzQwMycsICdFbCBudWV2byBub21icmUgZGVsIHByb3ZlZWRvciB5YSBlc3RhIHNpZW5kbyB1dGlsaXphZG8nKTtcblxuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCBQZXJtaXNzaW9ucyBmcm9tIFwiLi4vLi4vc3RhcnR1cC9zZXJ2ZXIvUGVybWlzc2lvbnNcIlxuZXhwb3J0IGRlZmF1bHQgW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgdGl0bGU6J0luaWNpbycsXG4gICAgICAgICAgICBwZXJtaXNzaW9uOm51bGwsXG4gICAgICAgICAgICByb3V0ZU5hbWU6J2hvbWUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRpdGxlOidVc3VhcmlvcycsXG4gICAgICAgICAgICAgICAgcGVybWlzc2lvbjpQZXJtaXNzaW9ucy5VU0VSUy5MSVNULlZBTFVFLFxuICAgICAgICAgICAgICAgIHJvdXRlTmFtZTonaG9tZS51c2VycydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGl0bGU6J1BlcmZpbGVzJyxcbiAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOlBlcm1pc3Npb25zLlBST0ZJTEVTLkxJU1QuVkFMVUUsXG4gICAgICAgICAgICAgICAgcm91dGVOYW1lOidob21lLnByb2ZpbGVzJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aXRsZTonRW1wcmVzYXMnLFxuICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IFBlcm1pc3Npb25zLkNPTVBBTklFUy5MSVNULlZBTFVFLFxuICAgICAgICAgICAgICAgIHJvdXRlTmFtZTonaG9tZS5jb21wYW5pZXMnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRpdGxlOidDaGF0JyxcbiAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiBQZXJtaXNzaW9ucy5DSEFULkxJU1QuVkFMVUUsXG4gICAgICAgICAgICAgICAgcm91dGVOYW1lOidob21lLmNoYXQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRpdGxlOidMaW5lYXMgUHJvZHVjY2lvbicsXG4gICAgICAgICAgICAgICAgcGVybWlzc2lvbjogUGVybWlzc2lvbnMuUFJPRFVDVElPTkxJTkVTLkxJU1QuVkFMVUUsXG4gICAgICAgICAgICAgICAgcm91dGVOYW1lOidob21lLnByb2R1Y3Rpb25saW5lcydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGl0bGU6J09yZGVuZXMgUHJvZHVjY2lvbicsXG4gICAgICAgICAgICAgICAgcGVybWlzc2lvbjogUGVybWlzc2lvbnMuUFJPRFVDVElPTk9SREVSUy5MSVNULlZBTFVFLFxuICAgICAgICAgICAgICAgIHJvdXRlTmFtZTonaG9tZS5wcm9kdWN0aW9ub3JkZXJzJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aXRsZTonUHJvZHVjdG9zJyxcbiAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiBQZXJtaXNzaW9ucy5QUk9EVUNUUy5MSVNULlZBTFVFLFxuICAgICAgICAgICAgICAgIHJvdXRlTmFtZTonaG9tZS5wcm9kdWN0cydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGl0bGU6J0VzdCBTdW1pbmlzdHJvJyxcbiAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiBQZXJtaXNzaW9ucy5QUk9WSURFUlNUQVRJT05TLkxJU1QuVkFMVUUsXG4gICAgICAgICAgICAgICAgcm91dGVOYW1lOidob21lLnByb3ZpZGVyc3RhdGlvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGl0bGU6J0FsbWFjZW5lcycsXG4gICAgICAgICAgICAgICAgcGVybWlzc2lvbjogUGVybWlzc2lvbnMuV0FSRUhPVVNFUy5MSVNULlZBTFVFLFxuICAgICAgICAgICAgICAgIHJvdXRlTmFtZTonaG9tZS53YXJlaG91c2VzJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aXRsZTonUHJvdmVlZG9yZXMnLFxuICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IFBlcm1pc3Npb25zLlBST1ZJREVSUy5MSVNULlZBTFVFLFxuICAgICAgICAgICAgICAgIHJvdXRlTmFtZTonaG9tZS5wcm92aWRlcnMnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRpdGxlOidFc3RhY2lvbmVzIFRyYWJham8nLFxuICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IFBlcm1pc3Npb25zLldPUktTVEFUSU9OUy5MSVNULlZBTFVFLFxuICAgICAgICAgICAgICAgIHJvdXRlTmFtZTonaG9tZS53b3Jrc3RhdGlvbnMnXG4gICAgICAgICAgICB9ICAgIFxuICAgIF0iLCJpbXBvcnQgU3lzdGVtT3B0aW9ucyBmcm9tIFwiLi9TeXN0ZW1PcHRpb25zXCI7XG5pbXBvcnQgQXV0aEd1YXJkIGZyb20gXCIuLi8uLi9taWRkbGV3YXJlcy9BdXRoR3VhcmRcIjtcbmltcG9ydCB7UmVzcG9uc2VNZXNzYWdlfSBmcm9tIFwiLi4vLi4vc3RhcnR1cC9zZXJ2ZXIvdXRpbGl0aWVzL1Jlc3BvbnNlTWVzc3NhZ2VcIlxuXG5uZXcgVmFsaWRhdGVkTWV0aG9kKHtcbiAgIG5hbWU6J3VzZXIuZ2V0U3lzdGVtT3B0aW9ucycsXG4gICAgbWl4aW5zOltNZXRob2RIb29rc10sXG4gICAgYmVmb3JlSG9va3M6IFtBdXRoR3VhcmQuaXNVc2VyTG9nZ2VkXSxcbiAgIHZhbGlkYXRlOm51bGwsXG4gICBydW4oKXtcbiAgICAgICBjb25zdCByZXNwb25zZU1lc3NhZ2UgPSBuZXcgUmVzcG9uc2VNZXNzYWdlKCk7XG4gICAgICAgY29uc3QgdXNlckxvZ2dlZD0gTWV0ZW9yLnVzZXIoKTtcbiAgICAgICBjb25zdCB1c2VyUm9sZXM9Um9sZXMuZ2V0Um9sZXNGb3JVc2VyKHVzZXJMb2dnZWQuX2lkLHVzZXJMb2dnZWQucHJvZmlsZS5wcm9maWxlKTtcbiAgICAgICAvL2NvbnNvbGUubG9nKCd1c2VyUm9sZXMnLHVzZXJSb2xlcyk7XG4gICAgICAgY29uc3Qgb3B0aW9uT2ZVc2VyPSBTeXN0ZW1PcHRpb25zLnJlZHVjZSgoYWNjdW11bGF0b3Isc3lzdGVtT3B0aW9uKT0+e1xuICAgICAgICAgICBpZighc3lzdGVtT3B0aW9uLnBlcm1pc3Npb24gfHwgISF1c2VyUm9sZXMuZmluZChyb2xlPT4gcm9sZSA9PT0gc3lzdGVtT3B0aW9uLnBlcm1pc3Npb24pKXtcbiAgICAgICAgICAgICAgIGFjY3VtdWxhdG9yLnB1c2goc3lzdGVtT3B0aW9uKTtcbiAgICAgICAgICAgfVxuICAgICAgICAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gICAgICAgfSxbXSk7XG4gICAgICAgLy9jb25zb2xlLmxvZyhvcHRpb25PZlVzZXIpO1xuICAgICAgIHJlc3BvbnNlTWVzc2FnZS5jcmVhdGUoJ09wY2lvbmVzIGRlbCBzaXN0ZW1hIHBhcmEgZWwgdXN1YXJpbycsbnVsbCxvcHRpb25PZlVzZXIpO1xuICAgICAgIHJldHVybiByZXNwb25zZU1lc3NhZ2U7XG4gICB9XG59KTsiLCJpbXBvcnQge1VzZXIgfSBmcm9tICdtZXRlb3Ivc29jaWFsaXplOnVzZXItbW9kZWwnO1xuY29uc3QgeyBkZWZhdWx0OiBTaW1wbGVTY2hlbWEgfSA9IHJlcXVpcmUoXCJzaW1wbC1zY2hlbWFcIik7XG5cbk1ldGVvci51c2Vycy5yYXdDb2xsZWN0aW9uKCkuY3JlYXRlSW5kZXgoeydwcm9maWxlLnByb2ZpbGUnOjF9KTtcbmNvbnN0IFVzZXJQcm9maWxlU2NoZW1hPSBuZXcgU2ltcGxlU2NoZW1hKHtcbiAgICBwcm9maWxlOiB7XG4gICAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgICAgb3B0aW9uYWw6IGZhbHNlLFxuICAgICAgICBibGFja2JveDogdHJ1ZVxuICAgIH1cbn0pO1xuVXNlci5hdHRhY2hTY2hlbWEoVXNlclByb2ZpbGVTY2hlbWEpOyIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJ21ldGVvci9zb2NpYWxpemU6dXNlci1tb2RlbCc7XG5pbXBvcnQgeyBVc2VyUHJlc2VuY2UgfSBmcm9tICdtZXRlb3Ivc29jaWFsaXplOnVzZXItcHJlc2VuY2UnO1xuaW1wb3J0IFNpbXBsZVNjaGVtYSBmcm9tICdzaW1wbC1zY2hlbWEnO1xuXG4vLyBTY2hlbWEgZm9yIHRoZSBmaWVsZHMgd2hlcmUgd2Ugd2lsbCBzdG9yZSB0aGUgc3RhdHVzIGRhdGFcbmNvbnN0IFN0YXR1c1NjaGVtYSA9IG5ldyBTaW1wbGVTY2hlbWEoe1xuICAgc3RhdHVzOiBPYmplY3QsXG4gICAnc3RhdHVzLm9ubGluZSc6e3R5cGU6Qm9vbGVhbn0sXG4gICAnc3RhdHVzLmlkbGUnOnt0eXBlOkJvb2xlYW4sb3B0aW9uYWw6dHJ1ZX0sXG4gICAnc3RhdHVzLmxhc3RMb2dpbic6e3R5cGU6T2JqZWN0LCBvcHRpb25hbDogdHJ1ZSwgYmxhY2tib3g6IHRydWV9XG59KTtcblxuLy8gQWRkIHRoZSBzY2hlbWEgdG8gdGhlIGV4aXN0aW5nIHNjaGVtYSBjdXJyZW50bHkgYXR0YWNoZWQgdG8gdGhlIFVzZXIgbW9kZWxcblVzZXIuYXR0YWNoU2NoZW1hKFN0YXR1c1NjaGVtYSk7XG5cbi8vIElmIGBzZXNzaW9uSWRzYCBpcyB1bmRlZmluZWQgdGhpcyBzaWduaWZpZXMgd2UgbmVlZCBhIGZyZXNoIHN0YXJ0LlxuLy8gV2hlbiBhIGZ1bGwgY2xlYW51cCBpcyBuZWNlc3Nhcnkgd2Ugd2lsbCB1bnNldCB0aGUgc3RhdHVzIGZpZWxkIHRvIHNob3cgYWxsIHVzZXJzIGFzIG9mZmxpbmVcblVzZXJQcmVzZW5jZS5vbkNsZWFudXAoZnVuY3Rpb24gb25DbGVhbnVwKHNlc3Npb25JZHMpIHtcbiAgICBpZiAoIXNlc3Npb25JZHMpIHtcbiAgICAgICAgTWV0ZW9yLnVzZXJzLnVwZGF0ZSh7fSx7JHNldDogeydzdGF0dXMub25saW5lJzpmYWxzZX19ICx7ICR1bnNldDogeyBzdGF0dXM6IHRydWUgfSB9LCB7IG11bHRpOiB0cnVlIH0pO1xuICAgIH1cbn0pO1xuXG4vLyBXaGVuIGEgdXNlciBjb21lcyBvbmxpbmUgd2Ugc2V0IHRoZWlyIHN0YXR1cyB0byBvbmxpbmUgYW5kIHNldCB0aGUgbGFzdE9ubGluZSBmaWVsZCB0byB0aGUgY3VycmVudCB0aW1lXG5Vc2VyUHJlc2VuY2Uub25Vc2VyT25saW5lKGZ1bmN0aW9uIG9uVXNlck9ubGluZSh1c2VySWQsY29ubmVjdGlvbikge1xuICAgIE1ldGVvci51c2Vycy51cGRhdGUodXNlcklkLCB7IFxuICAgICAgICAkc2V0OiB7IFxuICAgICAgICAgICAgJ3N0YXR1cy5vbmxpbmUnOiB0cnVlLCBcbiAgICAgICAgICAgICdzdGF0dXMuaWRsZSc6IGZhbHNlICxcbiAgICAgICAgICAgICdzdGF0dXMubGFzdExvZ2luJzoge1xuICAgICAgICAgICAgICAgIGRhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgaXBBZGRyOiBjb25uZWN0aW9uLmNsaWVudEFkZHJlc3MsXG4gICAgICAgICAgICAgICAgdXNlckFnZW50OiBjb25uZWN0aW9uLmh0dHBIZWFkZXJzWyd1c2VyLWFnZW50J11cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgfSk7XG59KTtcblxuLy8gV2hlbiBhIHVzZXIgZ29lcyBpZGxlIHdlJ2xsIHNldCB0aGVpciBzdGF0dXMgdG8gaW5kaWNhdGUgdGhpc1xuVXNlclByZXNlbmNlLm9uVXNlcklkbGUoZnVuY3Rpb24gb25Vc2VySWRsZSh1c2VySWQpIHtcbiAgICBNZXRlb3IudXNlcnMudXBkYXRlKHVzZXJJZCwgeyAkc2V0OiB7ICdzdGF0dXMuaWRsZSc6IHRydWUgfSB9KTtcbn0pO1xuXG4vLyBXaGVuIGEgdXNlciBnb2VzIG9mZmxpbmUgd2UnbGwgdW5zZXQgdGhlaXIgc3RhdHVzIGZpZWxkIHRvIGluZGljYXRlIG9mZmxpbmUgc3RhdHVzXG5Vc2VyUHJlc2VuY2Uub25Vc2VyT2ZmbGluZShmdW5jdGlvbiBvblVzZXJPZmZsaW5lKHVzZXJJZCkge1xuICAgIE1ldGVvci51c2Vycy51cGRhdGUodXNlcklkLCB7ICRzZXQ6eydzdGF0dXMub25saW5lJzpmYWxzZX0sICR1bnNldDogeyAnc3RhdHVzLmlkbGUnOnRydWUgfSB9KTtcbn0pOyIsImltcG9ydCB7VmFsaWRhdGVkTWV0aG9kfSBmcm9tICdtZXRlb3IvbWRnOnZhbGlkYXRlZC1tZXRob2QnO1xuaW1wb3J0IHtjaGVja30gZnJvbSAnbWV0ZW9yL2NoZWNrJztcbmltcG9ydCB7UmVzcG9uc2VNZXNzYWdlfSBmcm9tIFwiLi4vLi4vc3RhcnR1cC9zZXJ2ZXIvdXRpbGl0aWVzL1Jlc3BvbnNlTWVzc3NhZ2VcIjtcbmltcG9ydCBVc2Vyc1NlcnYgZnJvbSBcIi4vVXNlcnNTZXJ2XCI7XG5pbXBvcnQgQXV0aEd1YXJkIGZyb20gXCIuLi8uLi9taWRkbGV3YXJlcy9BdXRoR3VhcmRcIjtcbmltcG9ydCBQZXJtaXNzaW9ucyBmcm9tIFwiLi4vLi4vc3RhcnR1cC9zZXJ2ZXIvUGVybWlzc2lvbnNcIjtcbmltcG9ydCB7TWV0ZW9yfSBmcm9tICdtZXRlb3IvbWV0ZW9yJ1xuaW1wb3J0ICcuL1VzZXJQcmVzZW5jZUNvbmZpZydcblxuLy8gc2UgaW5zZXJ0YSB1c3VhcmlvIG1lZGlhbnRlIHVuIGxpc3RlbmVyIHBhcmEgYWdyZWdhciBlbCBTY2hlbWFcbkFjY291bnRzLm9uQ3JlYXRlVXNlciggKG9wdGlvbnMsdXNlcikgPT4ge1xuICAgIGNvbnN0IGN1c3RvbWl6ZWRVc2VyID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIHN0YXR1czoge1xuICAgICAgICAgICAgb25saW5lOiBmYWxzZVxuICAgICAgICB9XG4gICAgfSwgdXNlcik7XG4gICAgaWYob3B0aW9ucy5wcm9maWxlKXtcbiAgICAgICAgY3VzdG9taXplZFVzZXIucHJvZmlsZSA9IG9wdGlvbnMucHJvZmlsZTtcbiAgICB9XG4gICAgcmV0dXJuIGN1c3RvbWl6ZWRVc2VyO1xuICAgIFxufSk7XG5cbi8vIEFxdWkgcmVtb3ZlbW9zIGxvcyByZ2lzdHJvcyBkZSB0b2tlbnMgZGVsIG9iamV0byB1c2VyIGVuIGxhIEJEXG5BY2NvdW50cy52YWxpZGF0ZUxvZ2luQXR0ZW1wdCggbG9naW5BdHRlbXB0PT57XG4gICAvL2NvbnNvbGUubG9nKCdsb2dpbkF0dGVtcHQgJyAsIGxvZ2luQXR0ZW1wdCk7XG4gICAvLyBjb25zb2xlLmxvZygnYWxsb3dlZCcgLCBsb2dpbkF0dGVtcHQuYWxsb3dlZCk7XG4gICAvLyBjb25zb2xlLmxvZygnY29ycmVvIHZlcmlmaWNhZG8nICwgbG9naW5BdHRlbXB0LnVzZXIuZW1haWxzWzBdLnZlcmlmaWVkKTtcbiAgICBpZihsb2dpbkF0dGVtcHQuYWxsb3dlZCl7XG4gICAgICAgIGlmKCFsb2dpbkF0dGVtcHQudXNlci5lbWFpbHNbMF0udmVyaWZpZWQpe1xuICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignNDAzJywgJ0VsIGNvcnJlbyBkZWwgdXN1YXJpbyBubyBoYSBzaWRvIHZlcmlmaWNhZG8gYcO6bicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxvZ2luVG9rZW5zT2Z1c2VyPWxvZ2luQXR0ZW1wdC51c2VyLnNlcnZpY2VzLnJlc3VtZT8ubG9naW5Ub2tlbnMgfHwgW107XG4gICAgICAgIC8vY29uc29sZS5sb2coJ2xvZ2luVG9rZW5zT2Z1c2VyICcsIGxvZ2luVG9rZW5zT2Z1c2VyKVxuICAgICAgICBpZihsb2dpblRva2Vuc09mdXNlci5sZW5ndGggPiAxKXtcbiAgICAgICAgICAgIE1ldGVvci51c2Vycy51cGRhdGUobG9naW5BdHRlbXB0LnVzZXIuX2lkLHtcbiAgICAgICAgICAgICAgICAkc2V0OntcbiAgICAgICAgICAgICAgICAgICAgJ3NlcnZpY2VzLnJlc3VtZS5sb2dpblRva2Vucyc6IFtsb2dpblRva2Vuc09mdXNlci5wb3AoKV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbn0pO1xuXG5cbm5ldyBWYWxpZGF0ZWRNZXRob2Qoe1xuICAgIG5hbWU6ICd1c2VyLnNhdmUnLFxuICAgIG1peGluczogW01ldGhvZEhvb2tzXSxcbiAgICBwZXJtaXNzaW9uczogW1Blcm1pc3Npb25zLlVTRVJTLkNSRUFURS5WQUxVRSxQZXJtaXNzaW9ucy5VU0VSUy5VUERBVEUuVkFMVUVdLFxuICAgIGJlZm9yZUhvb2tzOiBbQXV0aEd1YXJkLmNoZWNrUGVybWlzc2lvbl0sICAvLyBBcXVpIHNlIHZlcmlmaWNhIHNpIGxvcyBwZXJtaXNvcyBkZSB1c3VhcmlvIHNvbiBhZGVjdWFkb3MgcGFyYSBlc3RhIGFjY2lvblxuICAgIGFmdGVySG9va3M6IFtdLFxuICAgIHZhbGlkYXRlKHt1c2VyfSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gVmFsaWRhIHF1ZSBsYSBlc3RydWN0dXJhIGRlbCBvYmpldG8gdXNlciBlc3RlIGNvbmZvcm1lIGEgbGEgZGVmaW5pY2lvbi5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXN1YXJpbyBcIix1c2VyKTtcbiAgICAgICAgICAgIGNoZWNrKHVzZXIsIHtcbiAgICAgICAgICAgICAgICBfaWQ6IE1hdGNoLk9uZU9mKFN0cmluZywgbnVsbCksXG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6IFN0cmluZyxcbiAgICAgICAgICAgICAgICBlbWFpbHM6IFt7YWRkcmVzczogU3RyaW5nLCB2ZXJpZmllZDogQm9vbGVhbn1dLFxuICAgICAgICAgICAgICAgIHByb2ZpbGU6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZmlsZTogU3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IE1hdGNoLk9uZU9mKFN0cmluZywgbnVsbClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8sXG4gICAgICAgICAgICAgICAgLy9wYXNzd29yZDpTdHJpbmdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3VzZXIuc2F2ZScsIGV4Y2VwdGlvbik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc0MDMnLCAnTGEgaW5mb3JtYWNpb24gaW50cm9kdWNpZGEgbm8gZXMgdsOhbGlkYS4nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBWYWxpZGFyIHF1ZSBubyBoYXlhIHVzdWFyaW9zIGNvbiBlbCBtaXNtbyBjb3JyZW8geSBub21icmUgZGUgdXN1YXJpbyBlbiBsYSBCRC5cbiAgICAgICAgVXNlcnNTZXJ2LnZhbGlkYXRlRW1haWwodXNlci5lbWFpbHNbMF0uYWRkcmVzcyx1c2VyLl9pZCk7XG4gICAgICAgIFVzZXJzU2Vydi52YWxpZGF0ZVVzZXJOYW1lKHVzZXIudXNlcm5hbWUsdXNlci5faWQpO1xuXG4gICAgfSxcbiAgICBhc3luYyBydW4oe3VzZXIscGhvdG9GaWxlVXNlcn0pIHtcbiAgICAgLy8gICBhc3luYyBydW4odXNlcikge1xuICAgICAgICBjb25zb2xlLmxvZygndXNlci5zYXZlJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVc3VhcmlvIGxvZ2VhZG8gJywgdGhpcy51c2VySWQpO1xuICAgICAgICBjb25zdCByZXNwb25zZU1lc3NhZ2U9IG5ldyBSZXNwb25zZU1lc3NhZ2UoKTtcbiAgICAgICAgaWYodXNlci5faWQgIT09bnVsbCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQWN0dWFsaXphbmRvIHVzdWFyaW8gYSBsYSBCRCcpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBVc2Vyc1NlcnYudXBkYXRldXNlcih1c2VyLHBob3RvRmlsZVVzZXIpO1xuICAgICAgICAgICAgfWNhdGNoKGV4Y2VwdGlvbil7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcigndXNlci5zYXZlJyxleGNlcHRpb24pO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzUwMCcsJ09jdXJyacOzIHVuIGVycm9yIGFsIGFjdHVhbGl6YXIgbG9zIGRhdG9zIGRlbCB1c3VhcmlvJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU2UgYWN0dWFsaXphcm9uIGxvcyBkYXRvcyBkZWwgdXN1YXJpbyBleGl0b3NhbWVudGUnKTtcbiAgICAgICAgICAgIHJlc3BvbnNlTWVzc2FnZS5jcmVhdGUoJ1NlIGFjdHVhbGl6YXJvbiBsb3MgZGF0b3MgZGVsIHVzdWFyaW8gZXhpdG9zYW1lbnRlJyk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0FncmVnYW5kbyB1c3VhcmlvIGEgbGEgQkQnKTtcbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICBhd2FpdCBVc2Vyc1NlcnYuY3JlYXRlVXNlcih1c2VyLHBob3RvRmlsZVVzZXIpO1xuICAgICAgICAgICAgICAgLy9hd2FpdCBVc2Vyc1NlcnYuY3JlYXRlVXNlcih1c2VyLG51bGwpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTZSBoYSBndWFyZGFkbyBlbCB1c3VhcmlvJyk7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VNZXNzYWdlLmNyZWF0ZSgnU2UgaGEgZ3VhcmRhZG8gZWwgdXN1YXJpbycpO1xuICAgICAgICAgICAgfWNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCd1c2VyLnNhdmUnLCBleGNlcHRpb24pO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzUwMCcsICdPY3VycmnDsyB1biBlcnJvciBhbCBndWFyZGFyIGVsIHVzdWFyaW8nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlTWVzc2FnZTtcbiAgICB9XG59KTtcblxuXG5uZXcgVmFsaWRhdGVkTWV0aG9kKHtcbiAgICBuYW1lOid1c2VyLmRlbGV0ZScsXG4gICAgbWl4aW5zOiBbTWV0aG9kSG9va3NdLFxuICAgIHBlcm1pc3Npb25zOiBbUGVybWlzc2lvbnMuVVNFUlMuREVMRVRFLlZBTFVFXSxcbiAgICBiZWZvcmVIb29rczogW0F1dGhHdWFyZC5jaGVja1Blcm1pc3Npb25dLFxuICAgIHZhbGlkYXRlKHtpZFVzZXJ9KXtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgY2hlY2soJ2lkVXNlcicsU3RyaW5nKTtcbiAgICAgICAgfWNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3VzZXIucmVtb3ZlJywgZXhjZXB0aW9uKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzQwMycsJ0xhIGluZm9ybWFjaW9uIHByb3BvcmNpb25hZGEgbm8gZXMgY29ycmVjdGEnKTtcbiAgICAgICAgfVxuXG4gICAgfSxcbiAgICBhc3luYyBydW4oe2lkVXNlcn0pe1xuICAgICAgICBjb25zdCByZXNwb25zZU1lc3NhZ2UgPSBuZXcgUmVzcG9uc2VNZXNzYWdlO1xuXG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRWxpbWluYW5kbyB1c3VhcmlvIGEgbGEgQkQnKTtcbiAgICAgICAgICAgICAgIGF3YWl0IFVzZXJzU2Vydi5kZWxldGVVc2VyKGlkVXNlcik7XG5cbiAgICAgICAgfWNhdGNoKGV4Y2VwdGlvbil7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCd1c2VyLnJlbW92ZScsJ09jdXJyacOzIHVuIGVycm9yIGFsIGVsaW1pbmFyIGFsIHVzYXVyaW8nKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzUwMCcsICdvY3VycmnDsyB1biBlcnJvciBhbCBlbGltaW5hciBhbCB1c2F1cmlvJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXNwb25zZU1lc3NhZ2UuY3JlYXRlKCdVc3VhcmlvIGVsaW1pbmFkbyBleGl0b3NhbWVudGUnKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlTWVzc2FnZTtcbiAgICB9XG59KTtcblxubmV3IFZhbGlkYXRlZE1ldGhvZCh7XG4gICAgbmFtZTogJ3VzZXIudXBkYXRlUGVyc29uYWxEYXRhJyxcbiAgICBtaXhpbnM6IFtNZXRob2RIb29rc10sXG4gICAgYmVmb3JlSG9va3M6IFtBdXRoR3VhcmQuaXNVc2VyTG9nZ2VkXSwgIC8vIEFxdWkgc2UgdmVyaWZpY2Egc2kgbG9zIHBlcm1pc29zIGRlIHVzdWFyaW8gc29uIGFkZWN1YWRvcyBwYXJhIGVzdGEgYWNjaW9uXG4gICAgYWZ0ZXJIb29rczogW10sXG4gICAgdmFsaWRhdGUoe3VzZXJ9KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBWYWxpZGEgcXVlIGxhIGVzdHJ1Y3R1cmEgZGVsIG9iamV0byB1c2VyIGVzdGUgY29uZm9ybWUgYSBsYSBkZWZpbmljaW9uLlxuICAgICAgICAgICAgY2hlY2sodXNlciwge1xuICAgICAgICAgICAgICAgIF9pZDogTWF0Y2guT25lT2YoU3RyaW5nLCBudWxsKSxcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogU3RyaW5nLFxuICAgICAgICAgICAgICAgIGVtYWlsczogW3thZGRyZXNzOiBTdHJpbmcsIHZlcmlmaWVkOiBCb29sZWFufV0sXG4gICAgICAgICAgICAgICAgcHJvZmlsZToge1xuICAgICAgICAgICAgICAgICAgICBwcm9maWxlOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogTWF0Y2guT25lT2YoU3RyaW5nLCBudWxsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3VzZXIudXBkYXRlUGVyc29uYWxEYXRhJywgZXhjZXB0aW9uKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzQwMycsICdMYSBpbmZvcm1hY2lvbiBpbnRyb2R1Y2lkYSBubyBlcyB2w6FsaWRhLicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFZhbGlkYXIgcXVlIG5vIGhheWEgdXN1YXJpb3MgY29uIGVsIG1pc21vIGNvcnJlbyB5IG5vbWJyZSBkZSB1c3VhcmlvIGVuIGxhIEJELlxuICAgICAgICBVc2Vyc1NlcnYudmFsaWRhdGVFbWFpbCh1c2VyLmVtYWlsc1swXS5hZGRyZXNzLHVzZXIuX2lkKTtcbiAgICAgICAgVXNlcnNTZXJ2LnZhbGlkYXRlVXNlck5hbWUodXNlci51c2VybmFtZSx1c2VyLl9pZCk7XG5cbiAgICB9LFxuICAgIGFzeW5jIHJ1bih7dXNlcixwaG90b0ZpbGVVc2VyfSkge1xuICAgICAgICBjb25zb2xlLmxvZygndXNlci51cGRhdGVQZXJzb25hbERhdGEnKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnVXN1YXJpbyBsb2dlYWRvICcsIHRoaXMudXNlcklkKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2VNZXNzYWdlPSBuZXcgUmVzcG9uc2VNZXNzYWdlKCk7XG4gICAgICAgIGlmKHVzZXIuX2lkICE9PW51bGwpe1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBVc2Vyc1NlcnYudXBkYXRldXNlcih1c2VyLHBob3RvRmlsZVVzZXIpO1xuICAgICAgICAgICAgfWNhdGNoKGV4Y2VwdGlvbil7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcigndXNlci51cGRhdGVQZXJzb25hbERhdGEnLGV4Y2VwdGlvbik7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignNTAwJywnT2N1cnJpw7MgdW4gZXJyb3IgYWwgYWN0dWFsaXphciBsb3MgZGF0b3MgZGVsIHVzdWFyaW8nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTZSBhY3R1YWxpemFyb24gbG9zIGRhdG9zIGRlbCB1c3VhcmlvIGV4aXRvc2FtZW50ZScpO1xuICAgICAgICAgICAgcmVzcG9uc2VNZXNzYWdlLmNyZWF0ZSgnU2UgYWN0dWFsaXphcm9uIGxvcyBkYXRvcyBkZWwgdXN1YXJpbyBleGl0b3NhbWVudGUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNwb25zZU1lc3NhZ2U7XG4gICAgfVxufSk7IiwiLyogRm9ybWEgZGUgcHVibGljYXJcbk1ldGVvci5wdWJsaXNoKCd1c2VyLmxpc3QnLGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBNZXRlb3IudXNlcnMuZmluZCgpO1xufSk7XG5cbiAqL1xuLy8gbm8gbG8gcmVjb25vY2UgcXVpdGFyIGFkdmVydGVuY2lhXG5pbXBvcnQge1Blcm1pc3Npb25NaWRkbGV3YXJlfSBmcm9tIFwiLi4vLi4vbWlkZGxld2FyZXMvUGVybWlzc2lvbk1pZGRsZXdhcmVcIlxuaW1wb3J0IFBlcm1pc3Npb25zIGZyb20gXCIuLi8uLi9zdGFydHVwL3NlcnZlci9QZXJtaXNzaW9uc1wiXG5jb25zdCB1c2VyUHVibGljYXRpb249bmV3IFB1Ymxpc2hFbmRwb2ludCgndXNlci5saXN0JyxmdW5jdGlvbihwYXJhbTEpe1xuICAgICAgICByZXR1cm4gTWV0ZW9yLnVzZXJzLmZpbmQoe30se1xuICAgICAgICAgICAgICAgIHNvcnQ6e2NyZWF0ZWRBdDogLTF9XG4gICAgICAgIH0pO1xufSk7XG5cbnVzZXJQdWJsaWNhdGlvbi51c2UobmV3IFBlcm1pc3Npb25NaWRkbGV3YXJlKFBlcm1pc3Npb25zLlVTRVJTLkxJU1QuVkFMVUUpKTtcbiIsImltcG9ydCBQcm9maWxlc1NlcnYgZnJvbSBcIi4uL1Byb2ZpbGVzL1Byb2ZpbGVzU2VydlwiO1xuaW1wb3J0IEZpbGVPcGVyYXRpb25zIGZyb20gXCIuLi8uLi9zdGFydHVwL3NlcnZlci91dGlsaXRpZXMvRmlsZU9wZXJhdGlvbnNcIjtcbmltcG9ydCB7TWV0ZW9yfSBmcm9tIFwibWV0ZW9yL21ldGVvclwiO1xuXG5jb25zdCBQQVRIX1VTRVJTX0ZJTEVOQU1FID0gJ3VzZXJzLyc7XG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICB2YWxpZGF0ZUVtYWlsKG5ld0VtYWlsLGlkVXNlcil7XG5cbiAgICAgICAgY29uc3QgZXhpc3RzRW1haWw9IEFjY291bnRzLmZpbmRVc2VyQnlFbWFpbChuZXdFbWFpbCk7XG4gICAgICAgIGlmKGlkVXNlcil7ICAvLyBhY3R1YWxpemFjaW9uIGRlIHVzdWFyaW9cbiAgICAgICAgICAgIGNvbnN0IG9sZFVzZXI9IE1ldGVvci51c2Vycy5maW5kT25lKGlkVXNlcik7XG4gICAgICAgICAgICBpZihvbGRVc2VyLmVtYWlsc1swXS5hZGRyZXNzIT09IG5ld0VtYWlsICYmIGV4aXN0c0VtYWlsKXtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc0MDMnLCAnRWwgbnVldm8gY29ycmVvIGVsZWN0cm9uaWNvIHlhIGVzdGEgc2llbmRvIHVzYWRvJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNlIGlmKGV4aXN0c0VtYWlsKXsgLy8gZXMgdXN1YXJpbyBudWV2byBwZXJvIGVsIGNvcnJlbyAgeWEgZXhpc3RlLlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzQwMycsICdFbCBudWV2byBjb3JyZW8geWEgZXN0YSBzaWVuZG8gdXRpbGl6YWRvJyk7XG5cbiAgICAgICAgfVxuXG4gICAgfSxcbiAgICB2YWxpZGF0ZVVzZXJOYW1lKG5ld1VzZXJOYW1lLGlkVXNlcil7XG4gICAgICAgIGNvbnN0IGV4aXN0c1VzZXJOYW1lPSBBY2NvdW50cy5maW5kVXNlckJ5VXNlcm5hbWUobmV3VXNlck5hbWUpO1xuICAgICAgICBpZiAoaWRVc2VyKXsgLy8gYWN0dWFsaXphY2lvbiBkZSB1c3VhcmlvLy9cbiAgICAgICAgICAgIGNvbnN0IG9sZFVzZXI9IE1ldGVvci51c2Vycy5maW5kT25lKGlkVXNlcik7XG4gICAgICAgICAgICBpZihvbGRVc2VyLnVzZXJuYW1lIT09bmV3VXNlck5hbWUgJiYgZXhpc3RzVXNlck5hbWUpe1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzQwMycsICdFbCBub21icmUgZGUgdXN1YXJpbyAgeWEgZXN0YSBzaWVuZG8gdXRpbGl6YWRvJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfWVsc2UgaWYoZXhpc3RzVXNlck5hbWUpeyAvLyBFbCBub21icmUgZGUgTlVFVk8gdXN1YXJpbyB5YSBleGlzdGVcbiAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzQwMycsICdFbCBub21icmUgZGUgdXN1YXJpbyAgeWEgZXN0YSBzaWVuZG8gdXRpbGl6YWRvJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIGNyZWF0ZVVzZXIodXNlcixwaG90b0ZpbGVVc2VyKXtcbiAgICAgICAgY29uc3QgaWRVc2VyPSBBY2NvdW50cy5jcmVhdGVVc2VyKHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiB1c2VyLnVzZXJuYW1lLFxuICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWxzWzBdLmFkZHJlc3MsXG4gICAgICAgICAgICBwcm9maWxlOiB1c2VyLnByb2ZpbGVcbiAgICAgICAgICAgIC8vLCAgQUwgQ1JFQVIgVVNVQVJJTyBubyBzZSBmaWphIGVsIHBhc3N3b3JkIHBvcnF1ZSBzZSBpbXBsZW1lbnRhcmEgdW4gZW52aW8gZGUgdW5hIFVSTCBwYXJhIHF1ZSBlbCB1c3VhcmlvIGxvIGZpamVcbiAgICAgICAgICAgIC8vcGFzc3dvcmQ6IHVzZXIucGFzc3dvcmRcbiAgICAgICAgfSk7XG4gICAgICAgIGlmKGlkVXNlcil7XG4gICAgICAgICAgICBQcm9maWxlc1NlcnYuc2V0VXNlcnNSb2xlcyhpZFVzZXIsdXNlci5wcm9maWxlLnByb2ZpbGUpO1xuICAgICAgICAgICAgQWNjb3VudHMuc2VuZEVucm9sbG1lbnRFbWFpbChpZFVzZXIsdXNlci5lbWFpbHNbMF0uYWRkcmVzcyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGF2YXRhclNyYz0gbnVsbDtcblxuICAgICAgICBpZihwaG90b0ZpbGVVc2VyKXtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlPSBhd2FpdCBGaWxlT3BlcmF0aW9ucy5zYXZlRmlsZUZyb21CYXNlNjRUb0dvb2dsZVN0b3JhZ2UocGhvdG9GaWxlVXNlciwnYXZhdGFyJyxcbiAgICAgICAgICAgICAgICBQQVRIX1VTRVJTX0ZJTEVOQU1FK2lkVXNlcik7XG4gICAgICAgICAgICBpZighcmVzcG9uc2UuZGF0YS5zdWNjZXNzKXtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc0MDMnLCdFcnJvciBhbCBzdWJpciBsYSBmb3RvJyk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBhdmF0YXJTcmM9IHJlc3BvbnNlLmRhdGEuZmlsZVVybDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBNZXRlb3IudXNlcnMudXBkYXRlKGlkVXNlcix7XG4gICAgICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgICAgICAgJ3Byb2ZpbGUucGF0aCc6IGF2YXRhclNyY1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG4gICAgfSxcbiAgICBhc3luYyB1cGRhdGV1c2VyKHVzZXIscGhvdG9GaWxlVXNlcil7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRVc2VyPU1ldGVvci51c2Vycy5maW5kT25lKHVzZXIuX2lkKTtcblxuICAgICAgICBpZihjdXJyZW50VXNlciE9PXVuZGVmaW5lZCl7XG4gICAgICAgICAgICBpZihjdXJyZW50VXNlci5lbWFpbHNbMF0uYWRkcmVzcyE9PXVzZXIuZW1haWxzWzBdLmFkZHJlc3MgKXtcbiAgICAgICAgICAgICAgICBBY2NvdW50cy5yZW1vdmVFbWFpbChjdXJyZW50VXNlci5faWQsIGN1cnJlbnRVc2VyLmVtYWlsc1swXS5hZGRyZXNzKTtcbiAgICAgICAgICAgICAgICBBY2NvdW50cy5hZGRFbWFpbChjdXJyZW50VXNlci5faWQsdXNlci5lbWFpbHNbMF0uYWRkcmVzcyk7XG4gICAgICAgICAgICAgICAgQWNjb3VudHMuc2VuZFZlcmlmaWNhdGlvbkVtYWlsKHVzZXIuX2lkLHVzZXIuZW1haWxzWzBdLmFkZHJlc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoY3VycmVudFVzZXIudXNlcm5hbWUhPT11c2VyLnVzZXJuYW1lICl7XG4gICAgICAgICAgICAgICAgQWNjb3VudHMuc2V0VXNlcm5hbWUoY3VycmVudFVzZXIuX2lkLHVzZXIudXNlcm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgTWV0ZW9yLnVzZXJzLnVwZGF0ZSh1c2VyLl9pZCx7XG4gICAgICAgICAgICAgICAgJHNldDp7XG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGU6e1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZTogdXNlci5wcm9maWxlLnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB1c2VyLnByb2ZpbGUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IGN1cnJlbnRVc2VyLnByb2ZpbGUucGF0aFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBQcm9maWxlc1NlcnYuc2V0VXNlcnNSb2xlcyh1c2VyLl9pZCx1c2VyLnByb2ZpbGUucHJvZmlsZSk7XG4gICAgICAgICAgICBpZihwaG90b0ZpbGVVc2VyKXtcbiAgICAgICAgICAgICAgICBpZihjdXJyZW50VXNlci5wcm9maWxlLnBhdGgpe1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBGaWxlT3BlcmF0aW9ucy5kZWxldGVGaWxlRnJvbUdvb2dsZVN0b3JlSWZFeGlzdHMoY3VycmVudFVzZXIucHJvZmlsZS5wYXRoXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3Vic3RyaW5nKGN1cnJlbnRVc2VyLnByb2ZpbGUucGF0aC5sYXN0SW5kZXhPZihQQVRIX1VTRVJTX0ZJTEVOQU1FKSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZT0gYXdhaXQgRmlsZU9wZXJhdGlvbnMuc2F2ZUZpbGVGcm9tQmFzZTY0VG9Hb29nbGVTdG9yYWdlKHBob3RvRmlsZVVzZXIsJ2F2YXRhcicsXG4gICAgICAgICAgICAgICAgICAgIFBBVEhfVVNFUlNfRklMRU5BTUUrdXNlci5faWQpO1xuICAgICAgICAgICAgICAgIGlmKCFyZXNwb25zZS5kYXRhLnN1Y2Nlc3Mpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc0MDMnLCdFcnJvciBhbCBzdWJpciBsYSBmb3RvJyk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIE1ldGVvci51c2Vycy51cGRhdGUodXNlci5faWQse1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNldDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwcm9maWxlLnBhdGgnOiByZXNwb25zZS5kYXRhLmZpbGVVcmxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignNDAzJywgJ0VsIHVzdWFyaW8gcG9yIGFjdHVhbGl6YXIgbm8gZXN0w6EgZW4gbGEgQkQnKTtcbiAgICAgICAgfVxuXG4gICAgfSxcbiAgIGFzeW5jICBkZWxldGVVc2VyKGlkVXNlcil7XG4gICAgICAgIE1ldGVvci51c2Vycy5yZW1vdmUoaWRVc2VyKTtcbiAgICAgICAgTWV0ZW9yLnJvbGVBc3NpZ25tZW50LnJlbW92ZSh7J3VzZXIuX2lkJzppZFVzZXJ9KTtcbiAgICAgICAgYXdhaXQgRmlsZU9wZXJhdGlvbnMuZGVsZXRlRmlsZXNPZkZvbGRlckZyb21Hb29nbGVTdG9yYWdlKFBBVEhfVVNFUlNfRklMRU5BTUUraWRVc2VyKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgTW9uZ28gfSBmcm9tICdtZXRlb3IvbW9uZ28nO1xuXG5leHBvcnQgY29uc3QgV2FyZWhvdXNlUmVwb3NpdG9yeSA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCd3YXJlaG91c2VzJyk7XG4iLCJpbXBvcnQge2NoZWNrLCBNYXRjaH0gZnJvbSBcIm1ldGVvci9jaGVja1wiO1xuaW1wb3J0IHtWYWxpZGF0ZWRNZXRob2R9IGZyb20gJ21ldGVvci9tZGc6dmFsaWRhdGVkLW1ldGhvZCc7XG5pbXBvcnQge1Jlc3BvbnNlTWVzc2FnZX0gZnJvbSBcIi4uLy4uL3N0YXJ0dXAvc2VydmVyL3V0aWxpdGllcy9SZXNwb25zZU1lc3NzYWdlXCI7XG5pbXBvcnQgQXV0aEd1YXJkIGZyb20gXCIuLi8uLi9taWRkbGV3YXJlcy9BdXRoR3VhcmRcIjtcbmltcG9ydCBQZXJtaXNzaW9ucyBmcm9tIFwiLi4vLi4vc3RhcnR1cC9zZXJ2ZXIvUGVybWlzc2lvbnNcIjtcbmltcG9ydCB7V2FyZWhvdXNlUmVwb3NpdG9yeX0gZnJvbSAnLi9XYXJlaG91c2UnXG5pbXBvcnQgV2FyZWhvdXNlU2VydiBmcm9tIFwiLi9XYXJlaG91c2VTZXJ2XCI7XG5cbm5ldyBWYWxpZGF0ZWRNZXRob2Qoe1xuICAgIG5hbWU6J3dhcmVob3VzZS5zYXZlJyxcbiAgICAgbWl4aW5zOltNZXRob2RIb29rc10sXG4gICAgIHBlcm1pc3Npb25zOiBbUGVybWlzc2lvbnMuV0FSRUhPVVNFUy5DUkVBVEUuVkFMVUUsUGVybWlzc2lvbnMuV0FSRUhPVVNFUy5VUERBVEUuVkFMVUVdLCAgXG4gICAgIGJlZm9yZUhvb2tzOiBbQXV0aEd1YXJkLmNoZWNrUGVybWlzc2lvbl0sXG4gICAgdmFsaWRhdGUod2FyZWhvdXNlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2hlY2sod2FyZWhvdXNlLHtcbiAgICAgICAgICAgICAgICBfaWQ6IE1hdGNoLk9uZU9mKFN0cmluZywgbnVsbCksXG4gICAgICAgICAgICAgICAgbmFtZTogU3RyaW5nLFxuICAgICAgICAgICAgICAgIG5hbWVfZnVsbDogU3RyaW5nLFxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBTdHJpbmdcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1jYXRjaCAoIGV4Y2VwdGlvbil7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCd3YXJlaG91c2Uuc2F2ZScsIGV4Y2VwdGlvbik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc0MDMnLCAnTGEgaW5mb3JtYWNpb24gaW50cm9kdWNpZGEgbm8gZXMgdmFsaWRhJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVmFsaWRhciBxdWUgbm8gaGF5YSBhbG1hY2VuZXMgY29uIGVsIG1pc21vIG5vbWJyZSAgIFxuICAgICAgICBcbiAgICAgICAgV2FyZWhvdXNlU2Vydi52YWxpZGF0ZVdhcmVob3VzZU5hbWUod2FyZWhvdXNlLm5hbWUsd2FyZWhvdXNlLl9pZCk7XG4gICAgfSxcbiAgICBydW4od2FyZWhvdXNlKXtcbiAgICAgICAgY29uc3QgcmVzcG9uc2VNZXNzYWdlID0gbmV3IFJlc3BvbnNlTWVzc2FnZSgpOyBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmKHdhcmVob3VzZS5faWQgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFdhcmVob3VzZVJlcG9zaXRvcnkudXBkYXRlKHdhcmVob3VzZS5faWQse1xuICAgICAgICAgICAgICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHdhcmVob3VzZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBuYW1lX2Z1bGw6IHdhcmVob3VzZS5uYW1lX2Z1bGwsXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiB3YXJlaG91c2UubG9jYXRpb25cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VNZXNzYWdlLmNyZWF0ZSgnU2UgYWN0dWFsaXrDsyBlbCBhbG1hY2VuIGV4aXRvc2FtZW50ZScpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgV2FyZWhvdXNlUmVwb3NpdG9yeS5pbnNlcnQoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiB3YXJlaG91c2UubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZV9mdWxsOiB3YXJlaG91c2UubmFtZV9mdWxsLFxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogd2FyZWhvdXNlLmxvY2F0aW9uXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXNwb25zZU1lc3NhZ2UuY3JlYXRlKCdTZSBpbnNlcnTDsyBlbCBhbG1hY2VuIGV4aXRvc2FtZW50ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9Y2F0Y2ggKCBleGNlcHRpb24pe1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignd2FyZWhvdXNlLnNhdmUnLCBleGNlcHRpb24pO1xuICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignNTAwJywgJ0hhIG9jdXJyaWRvIHVuIGVycm9yIGFsIGd1YXJkYXIgZWwgYWxtYWNlbicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZU1lc3NhZ2U7XG4gICAgfVxuIH0pO1xuXG5uZXcgVmFsaWRhdGVkTWV0aG9kKHtcbiAgICBuYW1lOiAnd2FyZWhvdXNlLmRlbGV0ZScsXG4gICAgbWl4aW5zOiBbTWV0aG9kSG9va3NdLFxuICAgIHBlcm1pc3Npb25zOiBbUGVybWlzc2lvbnMuV0FSRUhPVVNFUy5ERUxFVEUuVkFMVUVdLFxuICAgIGJlZm9yZUhvb2tzOiBbQXV0aEd1YXJkLmNoZWNrUGVybWlzc2lvbl0sICAvLyBBcXVpIHNlIHZlcmlmaWNhIHNpIGxvcyBwZXJtaXNvcyBkZSB1c3VhcmlvIHNvbiBhZGVjdWFkb3MgcGFyYSBlc3RhIGFjY2lvblxuICAgIGFmdGVySG9va3M6IFtdLFxuICAgIHZhbGlkYXRlKHsgaWRXYXJlaG91c2UgfSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaWRXYXJlaG91c2UgJywgaWRXYXJlaG91c2UpO1xuICAgICAgICAgICAgY2hlY2soaWRXYXJlaG91c2UgLCBTdHJpbmcpO1xuICAgICAgICB9Y2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignd2FyZWhvdXNlLmRlbGV0ZScsIGV4Y2VwdGlvbik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc0MDMnLCAnT2N1cnJpbyB1biBlcnJvciBhbCBlbGltaW5hciBlbCBhbG1hY2VuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdmFsaWRhciBxdWUgbm8gc2VhIHBvc2libGUgZWxpbWluYXIgdW4gYWxtYWNlbiBzaSBoYXkgdW4gcHJvZHVjdG8gdXRpbGl6YW5kb2xvLlxuICAgICAgICBjb25zdCB3YXJlaG91c2VXaXRoUHJvZHVjdCA9IFdhcmVob3VzZVNlcnYudmFsaWRhdGVXYXJlaG91c2VCdXN5KGlkV2FyZWhvdXNlKTtcbiAgICAgICAgaWYgKHdhcmVob3VzZVdpdGhQcm9kdWN0ID4gMCl7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc0MDMnLCdObyBlcyBwb3NpYmxlIGVsaW1pYXIgZWwgYWxtYWNlbicsXG4gICAgICAgICAgICAgICAgJ0hheSBhbCBtZW5vcyB1biBwcm9kdWN0byB1dGlsaXphbmRvbG8nKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcnVuKHsgaWRXYXJlaG91c2UgfSl7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlTWVzc2FnZSA9IG5ldyBSZXNwb25zZU1lc3NhZ2UoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIFdhcmVob3VzZVJlcG9zaXRvcnkucmVtb3ZlKGlkV2FyZWhvdXNlKTtcbiAgICAgICAgICAgICAgICByZXNwb25zZU1lc3NhZ2UuY3JlYXRlKCdBbG1hY2VuIGVsaW1pbmFkbyBleGl0b3NhbWVudGUnKTtcbiAgICAgICAgfWNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3dhcmVob3VzZS5kZWxldGUnLCBleGNlcHRpb24pO1xuICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignNTAwJywgJ09jdXJyaW8gdW4gZXJyb3IgYWwgZWxpbWluYXIgZWwgYWxtYWNlbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlTWVzc2FnZTtcbiAgICB9XG59KTtcbiIsImltcG9ydCB7IFdhcmVob3VzZVJlcG9zaXRvcnkgfSBmcm9tICcuL1dhcmVob3VzZSc7XG5pbXBvcnQgeyBQZXJtaXNzaW9uTWlkZGxld2FyZSB9IGZyb20gJy4uLy4uL21pZGRsZXdhcmVzL1Blcm1pc3Npb25NaWRkbGV3YXJlJztcbmltcG9ydCBQZXJtaXNzaW9ucyBmcm9tICcuLi8uLi9zdGFydHVwL3NlcnZlci9QZXJtaXNzaW9ucyc7XG5cbmNvbnN0IHdhcmVob3VzZVB1YmxpY2F0aW9uPW5ldyBQdWJsaXNoRW5kcG9pbnQoJ3dhcmVob3VzZS5saXN0JyxmdW5jdGlvbihwYXJhbTEpe1xuICAgICAgICByZXR1cm4gV2FyZWhvdXNlUmVwb3NpdG9yeS5maW5kKHt9LHt9KTtcbn0pO1xuXG53YXJlaG91c2VQdWJsaWNhdGlvbi51c2UobmV3IFBlcm1pc3Npb25NaWRkbGV3YXJlKFBlcm1pc3Npb25zLldBUkVIT1VTRVMuTElTVC5WQUxVRSkpOyIsImltcG9ydCBQZXJtaXNzaW9ucywge3Blcm1pc3Npb25zQXJyYXl9IGZyb20gJy4uLy4uL3N0YXJ0dXAvc2VydmVyL1Blcm1pc3Npb25zJztcbmltcG9ydCB7V2FyZWhvdXNlUmVwb3NpdG9yeX0gZnJvbSBcIi4vV2FyZWhvdXNlXCI7XG5cbldhcmVob3VzZVJlcG9zaXRvcnkucmF3Q29sbGVjdGlvbigpLmNyZWF0ZUluZGV4KHsnbmFtZSc6MX0se3VuaXF1ZTogdHJ1ZX0pO1xuXG4iLCJpbXBvcnQge01ldGVvcn0gZnJvbSBcIm1ldGVvci9tZXRlb3JcIjtcbmltcG9ydCB7V2FyZWhvdXNlUmVwb3NpdG9yeX0gZnJvbSAnLi9XYXJlaG91c2UnXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgdmFsaWRhdGVXYXJlaG91c2VOYW1lKG5ld1dhcmVob3VzZU5hbWUsaWRXYXJlaG91c2Upe1xuICAgICAgICBjb25zdCBleGlzdHNXYXJlaG91c2VMaXN0PSBXYXJlaG91c2VSZXBvc2l0b3J5LmZpbmQoe25hbWU6bmV3V2FyZWhvdXNlTmFtZX0pLmZldGNoKCk7XG4gICAgICAgIC8vIHJlY29ycmVyIGxhIGxpc3RhIHkgY29tcGFyYXIgcXVlIHVubyBkaWZlcmVudGUgZGUgbWkgdGVuZ2EgZWwgbWlzbW8gbm9tYnJlXG4gICAgICAgIGV4aXN0c1dhcmVob3VzZUxpc3QuZmlsdGVyKFxuICAgICAgICAgICAgd2FyZWhvdXNlPT57XG4gICAgICAgICAgICAgICAgaWYgKHdhcmVob3VzZS5uYW1lPT1uZXdXYXJlaG91c2VOYW1lICYmIHdhcmVob3VzZS5faWQhPT1pZFdhcmVob3VzZSl7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzQwMycsICdFbCBub21icmUgZGVsIGFsbWFjZW4geWEgZXN0YSBzaWVuZG8gdXRpbGl6YWRvJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH0sXG4gICAgdmFsaWRhdGVXYXJlaG91c2VCdXN5KGlkV2FyZWhvdXNlKXtcblxuICAgICAgICAvLyBUb0RvIEJ1c2NhciBwcm9kdWN0b3MgY29uIGFsbWFjZW4gaWQgXG4gICAgICAgIHJldHVybiAwO1xuXG4gICAgfVxufSIsImltcG9ydCB7IE1vbmdvIH0gZnJvbSAnbWV0ZW9yL21vbmdvJztcbmV4cG9ydCBjb25zdCBXb3Jrc3RhdGlvblJlcG9zaXRvcnkgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbignd29ya3N0YXRpb25zJyk7IiwiaW1wb3J0IHtjaGVjaywgTWF0Y2h9IGZyb20gXCJtZXRlb3IvY2hlY2tcIjtcbmltcG9ydCB7VmFsaWRhdGVkTWV0aG9kfSBmcm9tICdtZXRlb3IvbWRnOnZhbGlkYXRlZC1tZXRob2QnO1xuaW1wb3J0IHtSZXNwb25zZU1lc3NhZ2V9IGZyb20gXCIuLi8uLi9zdGFydHVwL3NlcnZlci91dGlsaXRpZXMvUmVzcG9uc2VNZXNzc2FnZVwiO1xuaW1wb3J0IEF1dGhHdWFyZCBmcm9tIFwiLi4vLi4vbWlkZGxld2FyZXMvQXV0aEd1YXJkXCI7XG5pbXBvcnQgUGVybWlzc2lvbnMgZnJvbSBcIi4uLy4uL3N0YXJ0dXAvc2VydmVyL1Blcm1pc3Npb25zXCI7XG5pbXBvcnQge1dvcmtzdGF0aW9uUmVwb3NpdG9yeX0gZnJvbSAnLi9Xb3JrU3RhdGlvbidcbmltcG9ydCBXb3JrU3RhdGlvblNlcnYgZnJvbSBcIi4vV29ya1N0YXRpb25TZXJ2XCI7XG5cbm5ldyBWYWxpZGF0ZWRNZXRob2Qoe1xuICAgIG5hbWU6J3dvcmtzdGF0aW9uLnNhdmUnLFxuICAgICBtaXhpbnM6W01ldGhvZEhvb2tzXSxcbiAgICAgcGVybWlzc2lvbnM6IFtQZXJtaXNzaW9ucy5XT1JLU1RBVElPTlMuQ1JFQVRFLlZBTFVFLFBlcm1pc3Npb25zLldPUktTVEFUSU9OUy5VUERBVEUuVkFMVUVdLCAgXG4gICAgIGJlZm9yZUhvb2tzOiBbQXV0aEd1YXJkLmNoZWNrUGVybWlzc2lvbl0sXG4gICAgdmFsaWRhdGUod29ya3N0YXRpb24pe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKCd3b3Jrc3RhdGlvbiAnICwgd29ya3N0YXRpb24pO1xuICAgICAgICAgICAgY2hlY2sod29ya3N0YXRpb24se1xuICAgICAgICAgICAgICAgIF9pZDogTWF0Y2guT25lT2YoU3RyaW5nLCBudWxsKSxcbiAgICAgICAgICAgICAgICBuYW1lOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgbmFtZV9mdWxsOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IFN0cmluZyxcbiAgICAgICAgICAgICAgICBwcm9kdWN0aW9ubGluZToge1xuICAgICAgICAgICAgICAgICAgICBfaWQ6TWF0Y2guT25lT2YoU3RyaW5nLCBudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogTWF0Y2guT25lT2YoU3RyaW5nLCBudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246TWF0Y2guT25lT2YoU3RyaW5nLCBudWxsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1jYXRjaCAoIGV4Y2VwdGlvbil7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCd3b3Jrc3RhdGlvbi5zYXZlJywgZXhjZXB0aW9uKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzQwMycsICdMYSBpbmZvcm1hY2lvbiBpbnRyb2R1Y2lkYSBubyBlcyB2YWxpZGEnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBWYWxpZGFyIHF1ZSBubyBoYXlhIGVzdGFjaW9uZXMgZGUgdHJhYmFqbyBjb24gZWwgbWlzbW8gbm9tYnJlICAgXG4gICAgICAgIFxuICAgICAgICBXb3JrU3RhdGlvblNlcnYudmFsaWRhdGVXb3Jrc3RhdGlvbk5hbWUod29ya3N0YXRpb24ubmFtZSx3b3Jrc3RhdGlvbi5faWQpO1xuICAgIH0sXG4gICAgcnVuKHdvcmtzdGF0aW9uKXtcbiAgICAgICAgY29uc3QgcmVzcG9uc2VNZXNzYWdlID0gbmV3IFJlc3BvbnNlTWVzc2FnZSgpOyBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmKHdvcmtzdGF0aW9uLl9pZCAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgV29ya1N0YXRpb25TZXJ2LnZhbGlkYXRlV29ya3N0YXRpb25DaGFuZ2VQcm9kdWN0aW9uTGluZSh3b3Jrc3RhdGlvbik7XG4gICAgICAgICAgICAgICAgV29ya3N0YXRpb25SZXBvc2l0b3J5LnVwZGF0ZSh3b3Jrc3RhdGlvbi5faWQse1xuICAgICAgICAgICAgICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHdvcmtzdGF0aW9uLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWVfZnVsbDogd29ya3N0YXRpb24ubmFtZV9mdWxsLFxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogd29ya3N0YXRpb24ubG9jYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3Rpb25saW5lOiB3b3Jrc3RhdGlvbi5wcm9kdWN0aW9ubGluZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICByZXNwb25zZU1lc3NhZ2UuY3JlYXRlKCdTZSBhY3R1YWxpesOzIGxhIGVzdGFjaW9uIGRlIHRyYWJham8gZXhpdG9zYW1lbnRlJyk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBXb3Jrc3RhdGlvblJlcG9zaXRvcnkuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogd29ya3N0YXRpb24ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZV9mdWxsOiB3b3Jrc3RhdGlvbi5uYW1lX2Z1bGwsXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiB3b3Jrc3RhdGlvbi5sb2NhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdGlvbmxpbmU6IHdvcmtzdGF0aW9uLnByb2R1Y3Rpb25saW5lXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBUb0RvIGFjdHVhbGl6YXIgbGEgTGluZWEgZGUgcHJvZHVjY2lvblxuXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VNZXNzYWdlLmNyZWF0ZSgnU2UgaW5zZXJ0w7MgbGEgZXN0YWNpb24gZGUgdHJhYmFqbyBleGl0b3NhbWVudGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWNhdGNoICggZXhjZXB0aW9uKXtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3dvcmtzdGF0aW9uLnNhdmUnLCBleGNlcHRpb24pO1xuICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignNTAwJywgJ0hhIG9jdXJyaWRvIHVuIGVycm9yIGFsIGd1YXJkYXIgbGEgZXN0YWNpb24gZGUgdHJhYmFqbycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZU1lc3NhZ2U7XG4gICAgfVxuIH0pO1xuXG5uZXcgVmFsaWRhdGVkTWV0aG9kKHtcbiAgICBuYW1lOiAnd29ya3N0YXRpb24uZGVsZXRlJyxcbiAgICBtaXhpbnM6IFtNZXRob2RIb29rc10sXG4gICAgcGVybWlzc2lvbnM6IFtQZXJtaXNzaW9ucy5XT1JLU1RBVElPTlMuREVMRVRFLlZBTFVFXSxcbiAgICBiZWZvcmVIb29rczogW0F1dGhHdWFyZC5jaGVja1Blcm1pc3Npb25dLCAgLy8gQXF1aSBzZSB2ZXJpZmljYSBzaSBsb3MgcGVybWlzb3MgZGUgdXN1YXJpbyBzb24gYWRlY3VhZG9zIHBhcmEgZXN0YSBhY2Npb25cbiAgICBhZnRlckhvb2tzOiBbXSxcbiAgICB2YWxpZGF0ZSh7IGlkV29ya3N0YXRpb24gfSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjaGVjayhpZFdvcmtzdGF0aW9uICwgU3RyaW5nKTtcbiAgICAgICAgfWNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3dvcmtzdGF0aW9uLmRlbGV0ZScsIGV4Y2VwdGlvbik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc0MDMnLCAnT2N1cnJpbyB1biBlcnJvciBhbCBlbGltaW5hciBsYSBlc3RhY2lvbiBkZSB0cmFiYWpvJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdmFsaWRhciBxdWUgbm8gc2VhIHBvc2libGUgZWxpbWluYXIgdW5hIGVzdGFjaW9uIHNpIGhheSB1bmEgbGluZWEgdXRpbGl6YW5kb2xvLlxuICAgICAgICBjb25zdCB3b3Jrc3RhdGlvbldpdGhQcm9kdWN0aW9uTGluZSA9IFdvcmtTdGF0aW9uU2Vydi52YWxpZGF0ZVdvcmtzdGF0aW9uQnVzeShpZFdvcmtzdGF0aW9uKTtcbiAgICAgICAgaWYgKHdvcmtzdGF0aW9uV2l0aFByb2R1Y3Rpb25MaW5lID4gMCl7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc0MDMnLCdObyBlcyBwb3NpYmxlIGVsaW1pYXIgbGEgZXN0YWNpb24gZGUgdHJhYmFqbycsXG4gICAgICAgICAgICAgICAgJ0hheSBhbCBtZW5vcyB1bmEgbGluZWEgZGUgcHJvZHVjY2lvbiB1dGlsaXphbmRvbGEnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcnVuKHsgaWRXb3Jrc3RhdGlvbiB9KXtcbiAgICAgICAgY29uc3QgcmVzcG9uc2VNZXNzYWdlID0gbmV3IFJlc3BvbnNlTWVzc2FnZSgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgV29ya3N0YXRpb25SZXBvc2l0b3J5LnJlbW92ZShpZFdvcmtzdGF0aW9uKTtcbiAgICAgICAgICAgICAgICByZXNwb25zZU1lc3NhZ2UuY3JlYXRlKCdFc3RhY2lvbiBkZSB0cmFiYWpvIGVsaW1pbmFkYSBleGl0b3NhbWVudGUnKTtcbiAgICAgICAgfWNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3dvcmtzdGF0aW9uLmRlbGV0ZScsIGV4Y2VwdGlvbik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCc1MDAnLCAnT2N1cnJpbyB1biBlcnJvciBhbCBlbGltaW5hciBsYSBlc3RhY2lvbiBkZSB0cmFiYWpvJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzcG9uc2VNZXNzYWdlO1xuICAgIH1cbn0pO1xuIiwiaW1wb3J0IHsgV29ya3N0YXRpb25SZXBvc2l0b3J5IH0gZnJvbSAnLi9Xb3JrU3RhdGlvbic7XG5pbXBvcnQgeyBQZXJtaXNzaW9uTWlkZGxld2FyZSB9IGZyb20gJy4uLy4uL21pZGRsZXdhcmVzL1Blcm1pc3Npb25NaWRkbGV3YXJlJztcbmltcG9ydCBQZXJtaXNzaW9ucyBmcm9tICcuLi8uLi9zdGFydHVwL3NlcnZlci9QZXJtaXNzaW9ucyc7XG5cbmNvbnN0IHdvcmtzdGF0aW9uUHVibGljYXRpb249bmV3IFB1Ymxpc2hFbmRwb2ludCgnd29ya3N0YXRpb24ubGlzdCcsZnVuY3Rpb24ocGFyYW0xKXtcbiAgICAgICAgcmV0dXJuIFdvcmtzdGF0aW9uUmVwb3NpdG9yeS5maW5kKHt9LHtcbiAgICAgICAgICAgICAgICBzb3J0OntjcmVhdGVkQXQ6IC0xfVxuICAgICAgICB9KTtcbn0pO1xuXG53b3Jrc3RhdGlvblB1YmxpY2F0aW9uLnVzZShuZXcgUGVybWlzc2lvbk1pZGRsZXdhcmUoUGVybWlzc2lvbnMuV09SS1NUQVRJT05TLkxJU1QuVkFMVUUpKTsiLCJpbXBvcnQge01ldGVvcn0gZnJvbSBcIm1ldGVvci9tZXRlb3JcIjtcbmltcG9ydCB7V29ya3N0YXRpb25SZXBvc2l0b3J5fSBmcm9tICcuL1dvcmtTdGF0aW9uJ1xuaW1wb3J0IHtQcm9kdWN0aW9uTGluZVJlcG9zaXRvcnl9IGZyb20gJy4uL1Byb2R1Y3Rpb25MaW5lcy9Qcm9kdWN0aW9uTGluZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgdmFsaWRhdGVXb3Jrc3RhdGlvbk5hbWUobmV3V29ya3N0YXRpb25OYW1lLGlkV29ya3N0YXRpb24pe1xuICAgICAgICBjb25zdCBleGlzdHNXb3Jrc3RhdGlvbkxpc3Q9IFdvcmtzdGF0aW9uUmVwb3NpdG9yeS5maW5kKHtuYW1lOm5ld1dvcmtzdGF0aW9uTmFtZX0pLmZldGNoKCk7XG4gICAgICAgIC8vIHJlY29ycmVyIGxhIGxpc3RhIHkgY29tcGFyYXIgcXVlIHVubyBkaWZlcmVudGUgZGUgbWkgdGVuZ2EgZWwgbWlzbW8gbm9tYnJlXG4gICAgICAgIGV4aXN0c1dvcmtzdGF0aW9uTGlzdC5maWx0ZXIoXG4gICAgICAgICAgICB3b3Jrc3RhdGlvbj0+e1xuICAgICAgICAgICAgICAgIGlmICh3b3Jrc3RhdGlvbi5uYW1lPT1uZXdXb3Jrc3RhdGlvbk5hbWUgJiYgd29ya3N0YXRpb24uX2lkIT09aWRXb3Jrc3RhdGlvbil7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzQwMycsICdFbCBub21icmUgZGUgbGEgZXN0YWNpb24gZGUgdHJhYmFqbyAgeWEgZXN0YSBzaWVuZG8gdXRpbGl6YWRvJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH0sXG4gICAgdmFsaWRhdGVXb3Jrc3RhdGlvbkJ1c3koaWRXb3Jrc3RhdGlvbil7XG4gICAgICAgIGNvbnN0IGV4aXN0c1dvcmtzdGF0aW9uTnVtYmVyPSBQcm9kdWN0aW9uTGluZVJlcG9zaXRvcnkuZmluZCh7J3dvcmtzdGF0aW9ucy5faWQnOmlkV29ya3N0YXRpb259KS5jb3VudCgpO1xuICAgICAgICByZXR1cm4gZXhpc3RzV29ya3N0YXRpb25OdW1iZXI7XG4gICAgfSxcbiAgICB2YWxpZGF0ZVdvcmtzdGF0aW9uQ2hhbmdlUHJvZHVjdGlvbkxpbmUod29ya3N0YXRpb24pe1xuICAgICAgICAvLyBhY3R1YWxpemFyIGxhIExpbmVhIGRlIHByb2R1Y2Npb24gc2kgZXMgZGlmZXJlbnRlIGRlIGxhIGFjdHVhbFxuICAgICAgICAgICAgICAgIC8vIFZhbGlkYXIgcXVlIGxhIGxpbmVhIG51ZXZhIGVzIGRpZmVyZW50ZSBkZSBsYSB2aWVqYS5cbiAgICAgICAgICAgICAgICAvLyBTaSBlcyBkaWZlcmVudGUgaGF5IHF1ZSByZW1vdmVybGEgZGUgbGEgbGluZWEgZGUgcHJvZHVjY2lvbiB2aWVqYS5cbiAgICAgICAgICAgICAgICBjb25zdCBvbGRXb3Jrc3RhdGlvbiA9IFdvcmtzdGF0aW9uUmVwb3NpdG9yeS5maW5kT25lKHdvcmtzdGF0aW9uLl9pZCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYob2xkV29ya3N0YXRpb24pe1xuICAgICAgICAgICAgICAgICAgICBpZihvbGRXb3Jrc3RhdGlvbi5wcm9kdWN0aW9ubGluZS5faWQgIT09IHdvcmtzdGF0aW9uLnByb2R1Y3Rpb25saW5lLl9pZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGRQcm9kdWN0aW9uTGluZSA9IFByb2R1Y3Rpb25MaW5lUmVwb3NpdG9yeS5maW5kT25lKG9sZFdvcmtzdGF0aW9uLnByb2R1Y3Rpb25saW5lLl9pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGRQcm9kdWN0aW9uTGluZVdvcmtzdGF0aW9uc1VwZGF0ZWQgPSBvbGRQcm9kdWN0aW9uTGluZS53b3Jrc3RhdGlvbnMuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdzID0+IHdzLl9pZCAgIT09IHdvcmtzdGF0aW9uLl9pZFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFByb2R1Y3Rpb25MaW5lUmVwb3NpdG9yeS51cGRhdGUob2xkUHJvZHVjdGlvbkxpbmUuX2lkLHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtzdGF0aW9uczogb2xkUHJvZHVjdGlvbkxpbmVXb3Jrc3RhdGlvbnNVcGRhdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgIH1cbn0iLCJjb25zdCBjaGVja1Blcm1pc3Npb249ZnVuY3Rpb24obWV0aG9kQXJncyxtZXRob2RPcHRpb25zKXtcbiAgICAgICAgY29uc3QgaWRVc2VyPSB0aGlzLnVzZXJJZDtcbiAgICAgICAgY29uc3QgcGVybWlzc2lvbnM9IG1ldGhvZE9wdGlvbnMucGVybWlzc2lvbnM7XG4gICAgICAgIGxldCBoYXNQZXJtaXNzaW9uPWZhbHNlO1xuICAgICAgICBpZihpZFVzZXIhPT0gbnVsbCl7XG4gICAgICAgICAgICBjb25zdCBwcm9maWxlTmFtZT1NZXRlb3IudXNlcigpLnByb2ZpbGUucHJvZmlsZTtcbiAgICAgICAgICAgIGhhc1Blcm1pc3Npb249Um9sZXMudXNlcklzSW5Sb2xlKGlkVXNlcixwZXJtaXNzaW9ucyxwcm9maWxlTmFtZSlcbiAgICAgICAgfVxuICAgICAgICBpZighaGFzUGVybWlzc2lvbil7XG4gICAgICAgICAgIHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJzQwMycsICdBY2Nlc28gZGVuZWdhZG8uJywgJ05vIHRpZW5lcyBwZXJtaXNvIHBhcmEgZWplY3V0YXIgZXN0YSBhY2Npb24nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWV0aG9kQXJncztcbn07XG5cbmNvbnN0IGlzVXNlckxvZ2dlZD1mdW5jdGlvbihtZXRob2RBcmdzLG1ldGhvZE9wdGlvbnMpe1xuICBpZighdGhpcy51c2VySWQpe1xuICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcignNDAzJywnQWNjZXNvIGRlbmVnYWRvLicsICdObyB0aWVuZXMgcGVybWlzbyBwYXJhIGVqZWN1dGFyIGVzdGEgb3BjaW9uJyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZEFyZ3M7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7Y2hlY2tQZXJtaXNzaW9uLGlzVXNlckxvZ2dlZH07IiwiZXhwb3J0IGNsYXNzIFBlcm1pc3Npb25NaWRkbGV3YXJlIGV4dGVuZHMgUHVibGlzaE1pZGRsZXdhcmUge1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHBlcm1pc3Npb25zKXtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLl9wZXJtaXNzaW9ucyA9IHBlcm1pc3Npb25zO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc29sbyBhIGVzdGUgZXZlbnRvIG5vIGxlIHZlcmlmaWNhbW9zIHBlcm1pc29zIHBhcmEgbm8gc29icmUgY2FyZ2FyIGVsIHByb2Nlc29cbiAgICAgICAgLy8geWEgcXVlIGVuIHVuYSBsaXN0YSBwb3IgY2FkYSBlbGVtZW50byBhZ3JlZ2FkbyBlcyBsbGFtYWRhIGVzdGEgZnVuY2lvblxuICAgICAgICBhZGRlZChwdWJsaXNoLGNvbGxlY3Rpb24saWQsZmllbGRzKXtcbiAgICAgICAgICAgIGlmKHB1Ymxpc2gudXNlcklkKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwZXIuYWRkZWQoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwdWJsaXNoLnJlYWR5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBjaGFuZ2VkKHB1Ymxpc2gsY29sbGVjdGlvbixpZCxmaWVsZHMpe1xuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tQZXJtaXNzaW9uKHB1Ymxpc2gudXNlcklkKSl7XG4gICAgICAgICAgICAgIHJldHVybiBzdXBlci5jaGFuZ2VkKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHVibGlzaC5yZWFkeSgpO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVkKHB1Ymxpc2gsY29sbGVjdGlvbixpZCl7XG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja1Blcm1pc3Npb24ocHVibGlzaC51c2VySWQpKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwZXIucmVtb3ZlZCguLi5hcmd1bWVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHB1Ymxpc2gucmVhZHkoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgb25SZWFkeShwdWJsaXNoKXtcbiAgICAgICAgICAgIGlmIChwdWJsaXNoLnVzZXJJZCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1cGVyLm9uUmVhZHkoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwdWJsaXNoLnJlYWR5KCk7XG5cbiAgICAgICAgfVxuICAgICAgICBvblN0b3AocHVibGlzaCl7XG4gICAgICAgICAgICBpZiAocHVibGlzaC51c2VySWQpe1xuICAgICAgICAgICAgICAgIHJldHVybiBzdXBlci5vblN0b3AoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwdWJsaXNoLnJlYWR5KCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIG9uRXJyb3IocHVibGlzaCxlcnJvcil7XG4gICAgICAgICAgICBpZiAocHVibGlzaC51c2VySWQpe1xuICAgICAgICAgICAgICAgIHJldHVybiBzdXBlci5vbkVycm9yKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHVibGlzaC5yZWFkeSgpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGNoZWNrUGVybWlzc2lvbihpZFVzZXIpe1xuICAgICAgICAgICAgY29uc3QgcHJvZmlsZU5hbWU9Um9sZXMuZ2V0U2NvcGVzRm9yVXNlcihpZFVzZXIpWzBdO1xuICAgICAgICAgICAgcmV0dXJuIFJvbGVzLnVzZXJJc0luUm9sZShpZFVzZXIsIHRoaXMuX3Blcm1pc3Npb25zLCBwcm9maWxlTmFtZSk7XG4gICAgICAgIH1cblxufSIsImltcG9ydCBcIi9pbXBvcnRzL3N0YXJ0dXAvc2VydmVyXCI7XG5pbXBvcnQgXCIvaW1wb3J0cy9zdGFydHVwL2JvdGhcIiJdfQ==
