import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../middlewares/AuthGuard";
import Permissions from "../../startup/server/Permissions";
import Version from "../../startup/server/Version";
import {check, Match} from "meteor/check";

new ValidatedMethod({
    name:'version.app',
     mixins:[MethodHooks], 
     beforeHooks: [AuthGuard.isUserLogged],
    validate(version){
        try {
            
            check(version,{
                appVersion: Match.OneOf(String, null),
            });

        }catch ( exception){
            console.error('version.app', exception);
            throw new Meteor.Error('403', 'La informacion introducida no es valida para obtener la VERSION DEL APP');
        }
        
    },
    run(version){
        const responseMessage = new ResponseMessage(); 
        try {
           
            version.appVersion= Version.appVersion;
            //console.log("version.appVersion",version.appVersion)
            responseMessage.create("Version del aplicativo","Version codigo del servidor",version.appVersion);
            
        }catch ( exception){
            console.error('version.app', exception);
            throw new Meteor.Error('500', 'Ha ocurrido un error al guardar la empresa');
        }
        return responseMessage;
    }
 });


