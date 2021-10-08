import { Roles } from 'meteor/alanning:roles';


const Permissions={
    USERS:{
        LIST:{VALUE:'users-view',TEXT:'Listar usuarios'},
        CREATE:{VALUE:'users-create',TEXT:'Crear Usuario'},
        UPDATE:{VALUE:'users-edit',TEXT:'Editar Usuario'},
        DELETE:{VALUE:'users-delete',TEXT:'Borrar Usuario'}
    },
    PROFILES:{
        LIST:{VALUE:'profiles-view',TEXT:'Listar perfil'},
        CREATE:{VALUE:'profiles-create',TEXT:'Crear perfil'},
        UPDATE:{VALUE:'profiles-edit',TEXT:'Editar perfil'},
        DELETE:{VALUE:'profiles-delete',TEXT:'Borrar perfil'}
    },
    PERMISSIONS:{
        LIST:{VALUE:'permissions-view',TEXT:'Listar permisos'}
    },
    ADMINS:{
        LIST_ADMINS:{VALUE:'admins-view',TEXT:'Listar administrador'},
        CREATE_ADMIN:{VALUE:'admins-create',TEXT:'Crear administrador'},
        UPDATE_ADMIN:{VALUE:'admins-edit',TEXT:'Editar administrador'},
        DELETE_ADMIN:{VALUE:'admins-delete',TEXT:'Borrar administrador'}
    },
    SUPERADMINS:{
        LIST_SUPER_ADMINS:{VALUE:'superadmins-view',TEXT:'Listar super administrador'},
        CREATE_SUPER_ADMIN:{VALUE:'superadmins-create',TEXT:'Crear super administrador'},
        UPDATE_SUPER_ADMIN:{VALUE:'superadmins-edit',TEXT:'Editar super administrador'},
        DELETE_SUPER_ADMIN:{VALUE:'superadmins-delete',TEXT:'Borrar super administrador'}

    },
    CHAT: {
        CREATE: { VALUE: 'message-create', TEXT: 'Enviar mensaje de chat'},
        LIST: { VALUE: 'message-view', TEXT: 'Ver mensajes de chat'}
    },
    COMPANIES:{
        LIST:{VALUE:'companies-view',TEXT:'Listar compañias'},
        CREATE:{VALUE:'companies-create',TEXT:'Crear compañias'},
        UPDATE:{VALUE:'companies-edit',TEXT:'Editar compañias'},
        DELETE:{VALUE:'companies-delete',TEXT:'Borrar compañias'}

    },
    CUSTOMERS:{
        LIST:{VALUE:'customers-view',TEXT:'Listar clientes'},
        CREATE:{VALUE:'customers-create',TEXT:'Crear clientes'},
        UPDATE:{VALUE:'customers-edit',TEXT:'Editar clientes'},
        DELETE:{VALUE:'customers-delete',TEXT:'Borrar clientes'}

    },
    PRODUCTIONLINES:{
        LIST:{VALUE:'productionlines-view',TEXT:'Listar linea de produccion'},
        CREATE:{VALUE:'productionlines-create',TEXT:'Crear linea de produccion'},
        UPDATE:{VALUE:'productionlines-edit',TEXT:'Editar linea de produccion'},
        DELETE:{VALUE:'productionlines-delete',TEXT:'Borrar linea de produccion'}

    },
    PRODUCTIONORDERS:{
        LIST:{VALUE:'productionorders-view',TEXT:'Listar orden de produccion'},
        CREATE:{VALUE:'productionorders-create',TEXT:'Crear ordenes de produccion'},
        UPDATE:{VALUE:'productionorders-edit',TEXT:'Editar orden de produccion'},
        DELETE:{VALUE:'productionorders-delete',TEXT:'Borrar orden de produccion'}

    },
    PRODUCTS:{
        LIST:{VALUE:'products-view',TEXT:'Listar productos'},
        CREATE:{VALUE:'products-create',TEXT:'Crear productos'},
        UPDATE:{VALUE:'products-edit',TEXT:'Editar producto'},
        DELETE:{VALUE:'products-delete',TEXT:'Borrar producto'}

    },
    SUPPLIES:{
        LIST:{VALUE:'supplies-view',TEXT:'Listar suministros'},
        CREATE:{VALUE:'supplies-create',TEXT:'Crear suministros'},
        UPDATE:{VALUE:'supplies-edit',TEXT:'Editar suministros'},
        DELETE:{VALUE:'supplies-delete',TEXT:'Borrar suministros'}

    },
    WAREHOUSES:{
        LIST:{VALUE:'warehouses-view',TEXT:'Listar almacenes'},
        CREATE:{VALUE:'warehouses-create',TEXT:'Crear almacen'},
        UPDATE:{VALUE:'warehouses-edit',TEXT:'Editar almacen'},
        DELETE:{VALUE:'warehouses-delete',TEXT:'Borrar almacen'}

    },
    WORKSTATIONS:{
        LIST:{VALUE:'workstations-view',TEXT:'Listar estaciones de trabajo'},
        CREATE:{VALUE:'workstations-create',TEXT:'Crear estacion de trabajo'},
        UPDATE:{VALUE:'workstations-edit',TEXT:'Editar estacion de trabajo'},
        DELETE:{VALUE:'workstations-delete',TEXT:'Borrar estacion de trabajo'}

    },
    WORKSTATIONSETUP:{
        LIST:{VALUE:'workstationsetup-view',TEXT:'Listar configuraciones de estacion de trabajo'},
        CREATE:{VALUE:'workstationsetup-create',TEXT:'Crear configuraciones de estacion de trabajo'},
        UPDATE:{VALUE:'workstationsetup-edit',TEXT:'Editar configuraciones de estacion de trabajo'},
        DELETE:{VALUE:'workstationsetup-delete',TEXT:'Borrar configuraciones de estacion de trabajo'}

    },
    OPERATINGSTATION:{
        LIST:{VALUE:'operatingstation-view',TEXT:'Ver Estacion de operacion'},
        CREATE:{VALUE:'operatingstation-view',TEXT:'Guardar acciones de la Estación de operación'},
    },
    PROVIDERS:{
        LIST:{VALUE:'providers-view',TEXT:'Listar proveedores'},
        CREATE:{VALUE:'providers-create',TEXT:'Crear proveedore'},
        UPDATE:{VALUE:'providers-edit',TEXT:'Editar proveedore'},
        DELETE:{VALUE:'providers-delete',TEXT:'Borrar proveedore'}

    },
    UNITOFMEASUREMENT:{
        LIST:{VALUE:'unitofmeasurement-view',TEXT:'Listar unidad de medida'},
        CREATE:{VALUE:'unitofmeasurement-create',TEXT:'Crear unidad de medida'},
        UPDATE:{VALUE:'unitofmeasurement-edit',TEXT:'Editar unidad de medida'},
        DELETE:{VALUE:'unitofmeasurement-delete',TEXT:'Borrar unidad de medida'}

    },
    

};

export const permissionsArray= Object.keys(Permissions).reduce((accumulator, systemModuleName)=>{
    const systemModuleObject= Permissions[systemModuleName];
    const modulePermissions= Object.keys(systemModuleObject).map(permission=> systemModuleObject[permission]);
    return accumulator.concat(modulePermissions);
},[]);

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
if(Meteor.settings.private && Meteor.settings.private.REFRESH_PERMISSIONS){
    console.log(' Updating permissions...');
    const currentRoles= Roles.getAllRoles().fetch();
    console.log('currentRoles ', currentRoles);
    for(let permission of permissionsArray){
        let exists= currentRoles.find(_role=> _role._id==permission.VALUE)
        //console.log('Permission value',permission.VALUE);
        if(!exists){
            Roles.createRole(permission.VALUE);
        }else{
            Meteor.roles.update(permission.VALUE, {
                $set:{
                    publicName:permission.TEXT
    
                }
            });
        }
        
    }
}else{
    console.log('Not Updating permissions...');
}

export default Permissions;

// https://github.com/Meteor-Community-Packages/meteor-roles