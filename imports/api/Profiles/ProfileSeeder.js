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
    if(Meteor.settings.private && Meteor.settings.private.REFRESH_STATIC_PROFILES){
        console.log('Updating static profiles');
        Object.keys(StaticProfiles).forEach(staticprofileName => {
            Profile.upsert({name:StaticProfiles[staticprofileName].name},{
               $set:{
                   description:StaticProfiles[staticprofileName].description,
                   permissions:StaticProfiles[staticprofileName].permissions
               }
            });
            Meteor.users.find({'profile.profile':StaticProfiles[staticprofileName].name}).fetch().forEach(user => {

               // Meteor.roleAssignments.remove({'user._id':user._id});
                //RoleAssignment.remove({'user._id':user._id});
               if(StaticProfiles[staticprofileName].permissions.length>0){
                   Roles.setUserRoles(user._id,StaticProfiles[staticprofileName].permissions,StaticProfiles[staticprofileName].name);
               }
            });
        });
    }
}