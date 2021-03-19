
import AuthGuard from "../../middlewares/AuthGuard";
import Permissions from "../../startup/server/Permissions"
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";
import {check, Match} from "meteor/check";
import {Meteor} from "meteor/meteor";
import {Profile} from "../Profiles/Profile";

new ValidatedMethod({
    name:'permissions.list',
    mixins: [MethodHooks],
    permissions: [Permissions.PERMISSIONS.LIST.VALUE],
    beforeHooks: [AuthGuard.checkPermission],
    validate: null,
    run() {
        const responseMessage = new ResponseMessage();
        try{
            const permissions = Meteor.roles.find().fetch();
            responseMessage.create('Permisos disponibles del sistema',null,permissions);
        }catch(ex){
            console.log('permissions.list: ', ex);
            throw new Meteor.Error('500','Ocurrió un error al obtener la lista de permisos');
        }

        return responseMessage;
    }

});

new ValidatedMethod({
    name:'permissions.listByIdProfile',
    mixins: [MethodHooks],
    permissions: [Permissions.PERMISSIONS.LIST.VALUE],
    beforeHooks: [AuthGuard.checkPermission],
    validate({idProfile}) {
            try{
                check('idProfile',String);
            }catch (exception) {
                    console.error('user.remove', exception);
                    throw new Meteor.Error('403','La informacion proporcionada no es correcta');
            }
    },
    run(idProfile) {
        const responseMessage = new ResponseMessage();
        try{
            let permissions= [];
            const profile= Profile.findOne({'_id':idProfile.idProfile});
            if(profile){
                permissions=Meteor.roles.find({'_id':{$in:profile.permissions}}).fetch();
            }
            responseMessage.create('Permisos asociados al perfil','Permisos incluidos en el perfil',permissions);
        }catch(ex){
            console.log('permissions.listByIdProfile: ', ex);
            throw new Meteor.Error('500','Ocurrió un error al obtener la lista de permisos asociados a un perfil');
        }

        return responseMessage;
    }

});

new ValidatedMethod({
    name:'permissions.listOfOthers',
    mixins: [MethodHooks],
    permissions: [Permissions.PERMISSIONS.LIST.VALUE],
    beforeHooks: [AuthGuard.checkPermission],
    validate({idProfile}) {
        try{
            check('idProfile',String);
        }catch (exception) {
            console.error('permissions.listOfOthers', exception);
            throw new Meteor.Error('403','La informacion proporcionada no es correcta');
        }
    },
    run(idProfile) {
        const responseMessage = new ResponseMessage();
        try{
            let permissions= [];
            const profile= Profile.findOne({'_id':idProfile.idProfile});
            if(profile){
                permissions=Meteor.roles.find({'_id':{$nin:profile.permissions}}).fetch();
            }
            responseMessage.create('Permisos NO asociados al perfil','Permisos NO incluidos en el perfil',permissions);
        }catch(ex){
            console.log('permissions.listOfOthers: ', ex);
            throw new Meteor.Error('500','Ocurrió un error al obtener la lista de permisos NO asociados a un perfil');
        }

        return responseMessage;
    }

});

new ValidatedMethod({
    name: 'permissions.check',
    mixins: [MethodHooks],
    beforeHooks: [AuthGuard.isUserLogged],
    validate(permission){
        try{
            check(permission,String);
        }catch(exception){
            console.error('permissions.check',exception);
            throw new Meteor.Error('403', 'La información introducida no es valida.');
        }       
    },
    run(permission){
        const responseMessage = new ResponseMessage();
        try{

            const scope = Roles.getScopesForUser(this.userId)[0];
            const hasPermission=Roles.userIsInRole(this.userId,permission,scope);
            responseMessage.create(` El usuario {$hasPermission?'si','no'} el permiso`,null,{hasPermission});
        }catch(exception){
            console.error('permissions.check',exception);
            throw new Meteor.Error('500', ' Ha ocurrido un error al verificar el permiso ');
        }
        return responseMessage;
    }
});