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
    }

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
    console.log('Updating permissions...');
    const currentRoles= Roles.getAllRoles().fetch();
    for(let permission of permissionsArray){
        if(!currentRoles.find(_role=> _role==permission.VALUE)){
            Roles.createRole(permission.VALUE);
        }
        Meteor.roles.update(permission.VALUE, {
            $set:{
                publicName:permission.TEXT

            }
        });
    }
}else{
    console.log('Not Updating permissions...');
}

export default Permissions;

// https://github.com/Meteor-Community-Packages/meteor-roles