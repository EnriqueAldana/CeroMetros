import {check, Match} from "meteor/check";
import {Profile} from "./Profile";
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";
import ProfileServ from "./ProfilesServ";
import Permissions from "../../startup/server/Permissions";
import AuthGuard from "../../middlewares/AuthGuard";


new ValidatedMethod({
    name: 'profile.save',
    mixins: [MethodHooks],
    permissions: [Permissions.PROFILES.CREATE.VALUE,Permissions.PROFILES.UPDATE.VALUE],
    beforeHooks: [AuthGuard.checkPermission],  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
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
        ProfileServ.validateProfileName(profile.name,profile._id);
    },
    run(profile) {
        console.log('profile.save');
        const responseMessage= new ResponseMessage();
        if(profile._id !==null){
            try{
                const oldProfile= Profile.findOne(profile._id);
                const users = ProfileServ.getUsersByprofile(profile._id);
                Profile.update(profile._id,{
                    $set:{
                        name: profile.name,
                        description: profile.description,
                        permissions: profile.permissions
                    }
                });
                // Aqui debemos actualizar a los usuarios con el perfil anterior por el nuevo
                if(oldProfile.name !== profile.name){
                  Meteor.users.update({'profile.profile':oldProfile.name},{
                          $set: {
                                  'profile.profile': profile.name
                          }
                      },{multi: true})
                }
                // Actualizamos los permisos para el nuevo rol a todos los usuarios en la tabla de relacion
                // role-assignment
                ProfileServ.updateProfileUsers(users,profile);
                console.log('Se ha actualizado el perfil');
                responseMessage.create('Se ha actualizado el perfil');
            }catch (exception) {
                console.error('profile.save', exception);
                throw new Meteor.Error('500', 'Ocurrió un error al actualizar el perfil');
            }
        }else{
            console.log('perfil: ',profile);
            try{
                Profile.insert({
                    name: profile.name,
                    description: profile.description,
                    permissions: profile.permissions
                });
                console.log('Se ha guardado el perfil');
                responseMessage.create('Se ha guardado el perfil');
            }catch (exception) {
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
    beforeHooks: [AuthGuard.checkPermission],  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
    afterHooks: [],
    validate({ idProfile }){
        try {
            check(idProfile, String);
        }catch (exception) {
            console.error('profile.delete', exception);
            throw new Meteor.Error('403', 'Ocurrio un error al eliminar el perfil');
        }
        // validar que no sea posible eliminar un perfil si hay un usuario utilizandolo.
        const userWithProfile = ProfileServ.getUsersByprofile(idProfile);
        console.log('idProfile', idProfile);
        console.log('userWithProfile', userWithProfile)
        if (userWithProfile.length > 0){
            throw new Meteor.Error('403','No es posible elimiar el perfil',
                'Hay al menos un usuario utilizando el perfil');
        }
    },
    run({ idProfile }){
        const responseMessage = new ResponseMessage();
        try {
                Profile.remove(idProfile);
                responseMessage.create('Perfil eliminado exitosamente');
        }catch (exception) {
            console.error('profile.delete', exception);
            throw new Meteor.Error('500', 'Ocurrio un error al eliminar el perfil');
        }


        return responseMessage;
    }
});