import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {check} from 'meteor/check';
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";
import UsersServ from "./UsersServ";
import AuthGuard from "../../middlewares/AuthGuard";
import Permissions from "../../startup/server/Permissions";
import {Meteor} from 'meteor/meteor'
import './UserPresenceConfig'

// se inserta usuario mediante un listener para agregar el Schema
Accounts.onCreateUser( (options,user) => {
    const customizedUser = Object.assign({
        status: {
            online: false
        }
    }, user);
    if(options.profile){
        customizedUser.profile = options.profile;
    }
    return customizedUser;
    
});

// Aqui removemos los rgistros de tokens del objeto user en la BD
Accounts.validateLoginAttempt( loginAttempt=>{
   //console.log('loginAttempt ' , loginAttempt);
   // console.log('allowed' , loginAttempt.allowed);
   // console.log('correo verificado' , loginAttempt.user.emails[0].verified);
    if(loginAttempt.allowed){
        if(!loginAttempt.user.emails[0].verified){
            throw new Meteor.Error('403', 'El correo del usuario no ha sido verificado aún');
        }
        const loginTokensOfuser=loginAttempt.user.services.resume?.loginTokens || [];
        //console.log('loginTokensOfuser ', loginTokensOfuser)
        if(loginTokensOfuser.length > 1){
            Meteor.users.update(loginAttempt.user._id,{
                $set:{
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
    permissions: [Permissions.USERS.CREATE.VALUE,Permissions.USERS.UPDATE.VALUE],
    beforeHooks: [AuthGuard.checkPermission],  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
    afterHooks: [],
    validate({user}) {
        try {
            // Valida que la estructura del objeto user este conforme a la definicion.
            console.log("Usuario ",user);
            check(user, {
                _id: Match.OneOf(String, null),
                username: String,
                emails: [{address: String, verified: Boolean}],
                profile: {
                    profile: String,
                    name: String,
                    path: Match.OneOf(String, null)
                }
                //,
                //password:String
            });
        } catch (exception) {
            console.error('user.save', exception);
            throw new Meteor.Error('403', 'La informacion introducida no es válida.');
        }
        // Validar que no haya usuarios con el mismo correo y nombre de usuario en la BD.
        UsersServ.validateEmail(user.emails[0].address,user._id);
        UsersServ.validateUserName(user.username,user._id);

    },
    async run({user,photoFileUser}) {
     //   async run(user) {
        console.log('user.save');
        console.log('Usuario logeado ', this.userId);
        const responseMessage= new ResponseMessage();
        if(user._id !==null){
            console.log('Actualizando usuario a la BD');
            try {
                await UsersServ.updateuser(user,photoFileUser);
            }catch(exception){
                console.error('user.save',exception);
                throw new Meteor.Error('500','Ocurrió un error al actualizar los datos del usuario');
            }
            console.log('Se actualizaron los datos del usuario exitosamente');
            responseMessage.create('Se actualizaron los datos del usuario exitosamente');
        }else{
            console.log('Agregando usuario a la BD');
            try{
                await UsersServ.createUser(user,photoFileUser);
               //await UsersServ.createUser(user,null);
                console.log('Se ha guardado el usuario');
                responseMessage.create('Se ha guardado el usuario');
            }catch (exception) {
                console.error('user.save', exception);
                throw new Meteor.Error('500', 'Ocurrió un error al guardar el usuario');
            }
        }


        return responseMessage;
    }
});


new ValidatedMethod({
    name:'user.delete',
    mixins: [MethodHooks],
    permissions: [Permissions.USERS.DELETE.VALUE],
    beforeHooks: [AuthGuard.checkPermission],
    validate({idUser}){
        try{
            check('idUser',String);
        }catch (exception) {
            console.error('user.remove', exception);
            throw new Meteor.Error('403','La informacion proporcionada no es correcta');
        }

    },
    async run({idUser}){
        console.log('user.remove');
        console.log('idUser', idUser);
        const responseMessage = new ResponseMessage;

        try{
                console.log('Eliminando usuario a la BD');
               await UsersServ.deleteUser(idUser);

        }catch(exception){
            console.error('user.remove','Ocurrió un error al eliminar al usaurio');
            throw new Meteor.Error('500', 'ocurrió un error al eliminar al usaurio');
        }

        responseMessage.create('Usuario eliminado exitosamente');
        return responseMessage;
    }
});

new ValidatedMethod({
    name: 'user.updatePersonalData',
    mixins: [MethodHooks],
    beforeHooks: [AuthGuard.isUserLogged],  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
    afterHooks: [],
    validate({user}) {
        try {
            // Valida que la estructura del objeto user este conforme a la definicion.
            check(user, {
                _id: Match.OneOf(String, null),
                username: String,
                emails: [{address: String, verified: Boolean}],
                profile: {
                    profile: String,
                    name: String,
                    path: Match.OneOf(String, null)
                }
            });
        } catch (exception) {
            console.error('user.updatePersonalData', exception);
            throw new Meteor.Error('403', 'La informacion introducida no es válida.');
        }
        // Validar que no haya usuarios con el mismo correo y nombre de usuario en la BD.
        UsersServ.validateEmail(user.emails[0].address,user._id);
        UsersServ.validateUserName(user.username,user._id);

    },
    async run({user,photoFileUser}) {
        console.log('user.updatePersonalData');
        //console.log('Usuario logeado ', this.userId);
        const responseMessage= new ResponseMessage();
        if(user._id !==null){
            try {
                await UsersServ.updateuser(user,photoFileUser);
            }catch(exception){
                console.error('user.updatePersonalData',exception);
                throw new Meteor.Error('500','Ocurrió un error al actualizar los datos del usuario');
            }
            console.log('Se actualizaron los datos del usuario exitosamente');
            responseMessage.create('Se actualizaron los datos del usuario exitosamente');
        }

        return responseMessage;
    }
});