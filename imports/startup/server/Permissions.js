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
    COMPANYADMIN:{
        LIST:{VALUE:'companyuser-view',TEXT:'Listar usuarios de la empresa'},
        CREATE:{VALUE:'companyuser-create',TEXT:'Crear Usuario de la empresa'},
        UPDATE:{VALUE:'companyuser-edit',TEXT:'Editar Usuario de la empresa'},
        DELETE:{VALUE:'companyuser-delete',TEXT:'Borrar Usuario de la empresa'},
        LISTROLES:{VALUE:'companyuser-view',TEXT:'Listar roles de usuarios de la empresa'},
    
    },
    COMPANYUSER:{
        LIST:{VALUE:'companyvisitor-view',TEXT:'Listar visitantes de la empresa'},
        CREATE:{VALUE:'companyvisitor-create',TEXT:'Crear visitantes de la empresa'},
        UPDATE:{VALUE:'companyvisitor-edit',TEXT:'Editar visitantes de la empresa'},
        DELETE:{VALUE:'companyvisitor-delete',TEXT:'Borrar visitantes de la empresa'}
    },
    COMPANYVISITOR:{
        LIST:{VALUE:'companyvisitortag-view',TEXT:'Listar tag de la empresa , usuario y acceso'},
        CREATE:{VALUE:'companyvisitortag-create',TEXT:'Crear tag de la empresa , usuario y acceso'},
        UPDATE:{VALUE:'companyvisitortag-edit',TEXT:'Editar tag de la empresa , usuario y acceso'},
        DELETE:{VALUE:'companyvisitortag-delete',TEXT:'Borrar tag de la empresa , usuario y acceso'}
    },
    COMPANYBARRIER:{
        LIST:{VALUE:'companybarrier-view',TEXT:'Listar barreras de la empresa'},
        CREATE:{VALUE:'companybarrier-create',TEXT:'Crear barreras de la empresa'},
        UPDATE:{VALUE:'companybarrier-edit',TEXT:'Editar barreras de la empresa'},
        DELETE:{VALUE:'companybarrier-delete',TEXT:'Borrar barreras de la empresa'}
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
    VERSION:{
        LIST:{VALUE:'version-view',TEXT:'Listar Version del aplicativo'}
    },
    REPORTS:{
        SUPPLYREQUESTSOLDSYSTEM_LIST:{VALUE:'supplyrequestsoldsystem-view',TEXT:'Reporte de solicitudes de suministro sistema antiguo'},
        SUPPLYREQUESTSOLDSYSTEM_CREATE:{VALUE:'supplyrequestsoldsystem-create',TEXT:'Cargar Reporte de sol. de sum. sistema antiguo'},
        SUPPLYREQUESTSOLDSYSTEM_UPDATE:{VALUE:'supplyrequestsoldsystem-edit',TEXT:'Editar Reporte de sol. de sum. sistema antiguo'},
        SUPPLYREQUESTSOLDSYSTEM_DELETE:{VALUE:'supplyrequestsoldsystem-delete',TEXT:'Borrar Reporte de sol. de sum. sistema antiguo'},
        SUPPLYREQUESTSOLDSYSTEM_DOWNLOAD:{VALUE:'supplyrequestsoldsystem-download',TEXT:'Descargar Reporte de sol. de sum. sistema antiguo'}
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
if( Meteor.settings.private.REFRESH_PERMISSIONS){
    console.log(' Updating permissions...en la tabla roles');
    const currentRoles= Roles.getAllRoles().fetch();
    console.log('currentRoles en la coleccion roles', currentRoles);
    for(let permission of permissionsArray){
        let exists= currentRoles.find(_role=> _role._id==permission.VALUE)
        //console.log('Permission value',permission.VALUE);
        if(!exists){
            try{
                console.log('El permiso'+ permission.VALUE+' se inserto en la coleccion roles');
                Roles.createRole(permission.VALUE);
            }catch(ex){
                console.log('No se pudo insertar el permiso '+permission.VALUE+' en la coleccion roles')
            }
            
        }else{
            try{
                console.log('El permiso'+ permission.VALUE+' se actualizo en la tabla roles');
                Meteor.roles.update(permission.VALUE, {
                    $set:{
                        publicName:permission.TEXT
        
                    }
                });
            }catch{
                console.log('El permiso'+ permission.VALUE+' NO se actualizo en la tabla roles');
            }          
        }  
    }
    const updatedRoles= Roles.getAllRoles().fetch();
    console.log('updatedRoles en la coleccion roles', updatedRoles);
    
}
export default Permissions;

// https://github.com/Meteor-Community-Packages/meteor-roles