import AuthGuard from "../../middlewares/AuthGuard";
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";

new ValidatedMethod({
    name: 'apm.logger',
    mixins: [MethodHooks],
    beforeHooks: [AuthGuard.isUserLogged],
    validate(log){
        try{
            check(log,String);
        }catch(exception){
            console.error('apm.logger',exception);
            throw new Meteor.Error('403', 'La información introducida no es valida.');
        }       
    },
    run(log){
        const responseMessage = new ResponseMessage();
        try{

            const scope = Roles.getScopesForUser(this.userId)[0];
            const hasPermission=Roles.userIsInRole(this.userId,permission,scope);
            responseMessage.create(` El usuario {$hasPermission?'si','no'} el permiso`,null,{hasPermission});
        }catch(exception){
            console.error('apm.logger',exception);
            throw new Meteor.Error('500', ' Ha ocurrido un error al verificar el permiso ');
        }
        return responseMessage;
    }
});