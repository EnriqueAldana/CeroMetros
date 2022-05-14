import Permissions, {permissionsArray} from '../../startup/server/Permissions';
import {Profile} from "./Profile";

Profile.rawCollection().createIndex({'name':1},{unique: true});


export const StaticProfiles={
    admin: {
        name: 'admin',
        description: 'Administrador',
        permissions: permissionsArray.map(p=>p.VALUE)
    }
};

if(Meteor.isDevelopment){
    if( Meteor.settings.private.REFRESH_STATIC_PROFILES){
        console.log('Actualizando la coleccion de profile')
        Object.keys(StaticProfiles).forEach(staticprofileName => {
            // Actualiza la coleccion de Profile con los perfiles estaticos 
            // definidos en la variable anterior StaticProfiles
            // insertandole todos los permisos definidos en Permissions
            Profile.upsert({name:StaticProfiles[staticprofileName].name},{
               $set:{
                   description:StaticProfiles[staticprofileName].description,
                   permissions:StaticProfiles[staticprofileName].permissions
               }
            });
            // Busca todos los usuarios que tengan el perfil definidos en StaticProfiles
            // y les asigna el rol insertando el permiso rol en la coleccion role-assignment
            // De esta tabla se obtienen los permisos para el MENU DE OPCIONES DEL APLICATIVO
            // 
            
            Meteor.users.find({'profile.profile':StaticProfiles[staticprofileName].name}).fetch().forEach(user => {
                try{
                    
                    //Meteor.roleAssignments.remove({'user._id':user._id});
                //RoleAssignment.remove({'user._id':user._id});
               
                }catch(ex){
                    console.log('No ex posible remover de la coleccion de role-assignment para el usuario ' + user._id)
                }
                try{
                    if(StaticProfiles[staticprofileName].permissions.length>0){
                        Roles.setUserRoles(user._id,StaticProfiles[staticprofileName].permissions,StaticProfiles[staticprofileName].name);
                    }
                }catch(ex1){
                    console.log('No ex posible fijar en la coleccion de roles para el usuario ' + user._id)
                }
            });
        });
    }
}