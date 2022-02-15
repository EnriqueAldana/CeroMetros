import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../middlewares/AuthGuard";
import Permissions from "../../startup/server/Permissions";
import Version from "../../startup/server/Version";
import {check, Match} from "meteor/check";

import APMServ from "../AppPerformanceManagement/APMServ"
import { APMstatus } from "../AppPerformanceManagement/APMStatus";
import APMlog from "../AppPerformanceManagement/APMLog"
import { DateTime } from "luxon";

new ValidatedMethod({
    name:'version.app',
     mixins:[MethodHooks], 
     beforeHooks: [AuthGuard.isUserLogged],
    validate(version){
        try {
            APMlog.controller.methodName='version.app'
            APMlog.user=Meteor.user();
            const logId=APMServ.loggerDB(APMlog)
            console.log("logId",logId)
            APMlog._id=logId
            check(version,{
                appVersion: Match.OneOf(String, null),
            });
            APMlog.controller.validate.status=APMstatus.SUCC
            APMlog.controller.validate.dateValidate=DateTime.local({ locale: 'es_MX' });
            APMlog.controller.validate.msg='validacion completa para parametros ' + version.appVersion
            APMServ.loggerDB(APMlog)
        }catch ( exception){
            console.error('version.app', exception);
            APMlog.controller.validate.status=APMstatus.FAIL
            APMlog.controller.validate.dateValidate=DateTime.local({ locale: 'es_MX' });
            APMlog.controller.validate.msg='validacion NO completa para parametros '+ version.appVersion
            APMlog.controller.validate.error=exception
            throw new Meteor.Error('403', 'La informacion introducida no es valida para obtener la VERSION DEL APP');
        }
        
    },
    run(version){
        const responseMessage = new ResponseMessage(); 
        try {
            const dateStart=DateTime.local({ locale: 'es_MX' });
            APMlog.controller.run.status=APMstatus.SUCC
            APMlog.controller.run.dateRunStart=dateStart
            APMlog.controller.run.timeUsed=0
            APMServ.loggerDB(APMlog)
            version.appVersion= Version.getAppVersion();
            const dateEnd=DateTime.local({ locale: 'es_MX' });
            APMlog.controller.run.dateRunEnd=dateEnd
            APMlog.controller.run.timeUsed=(dateEnd.diff(dateStart))/1000 // Segundos
            APMlog.controller.run.msg="Version del aplicativo "+version.appVersion
            APMServ.loggerDB(APMlog)
            //console.log("version.appVersion",version.appVersion)
            responseMessage.create("Version del aplicativo","Version codigo del servidor",version.appVersion);
            
        }catch ( exception){
            console.error('version.app', exception);
            let errorDescription='Error al obtener la version del App desde la variable de entorno SHOW_ZERO_METERS_VERSION'
            APMlog.controller.run.status=APMstatus.FAIL
            APMlog.controller.run.error={exception, errorDescription}
            APMServ.loggerDB(APMlog)
            throw new Meteor.Error('500', 'Ha ocurrido un error al guardar la empresa');
        }
        return responseMessage;
    }
 });


