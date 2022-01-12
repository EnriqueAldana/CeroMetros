import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../middlewares/AuthGuard";
import Permissions from "../../startup/server/Permissions";
import Version from "../../startup/server/Version";
import {check, Match} from "meteor/check";

new ValidatedMethod({
    name:'version.app',
     mixins:[MethodHooks],
    validate(version){
        try {
            console.log("Objeto version", version);
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
                responseMessage.create('Se ha obtenido la version del aplicativo','Version del servidor',version.appVersion);
            
        }catch ( exception){
            console.error('version.app', exception);
            throw new Meteor.Error('500', 'Ha ocurrido un error al guardar la empresa');
        }
        return responseMessage;
    }
 });


