import {Profile} from './Profile';
import {Meteor} from 'meteor/meteor'
import {StaticProfiles} from "./ProfileSeeder";

export default {

    getUsersByprofile(idPrtofile){
            const profile = Profile.findOne(idPrtofile);
            return Meteor.users.find({'profile.profile':profile.name}).fetch();
        },
    setUsersRoles(idUser, profileName){
        const permissions= Profile.findOne({'name':profileName}).permissions;
         Meteor.roleAssignment.remove({'user._id': idUser});
         Roles.setUserRoles(idUser,permissions,profileName);
        },
    updateProfileUsers(users,profile){
      users.forEach(user => {
                this.setUsersRoles(user._id,profile.name);
           });
    },validateProfileName(newProfileName,idProfile){
        const query = { name: newProfileName };
        const existsProfileName= Profile.findOne(query);
        if (idProfile){ // actualizacion de usuario//
            const oldProfile= Profile.findOne(idProfile);
            if(oldProfile.name !== newProfileName && existsProfileName){
                throw new Meteor.Error('403', 'El nombre del Perfil  ya esta siendo utilizado');
            }

        }else if(existsProfileName){ // El nombre de NUEVO profile ya existe
            throw new Meteor.Error('403', 'El nombre del Perfil  ya esta siendo utilizado');
        }
    },
    getStaticprofilesName(){

        return Object.keys(StaticProfiles).map(staticprofileName => {
            return StaticProfiles[staticprofileName].name;
        });
    }


}