import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../middlewares/AuthGuard";

import Version from "../../startup/server/Version";
import {check, Match} from "meteor/check";
import  Utilities from "../../startup/both/Utilities";
import APMServ from "../AppPerformanceManagement/APMServ"
import { APMstatus } from "../../startup/both/APMStatus";
import APMlog from "../AppPerformanceManagement/APMLog"
import APMTemplate from "../../startup/both/APMTemplate"

new ValidatedMethod({
    name:'version.app',
     mixins:[MethodHooks], 
     beforeHooks: [AuthGuard.isUserLogged],
    validate(version){
        let logTemplate= new APMTemplate('Info',APMstatus.SUCC.STATUSKEY,'Controller','version.app',
             'version: '+version.appVersion, 'Obteniendo version del aplicativo','');
        let log = new APMlog('',Meteor.user().id,logTemplate);
        try {
            
            // actualizamos el Id del registro del log
            log._id=APMServ.logToDB(log)
            check(version,{
                appVersion: Match.OneOf(String, null),
            });
            
        }catch ( exception){
            console.error('version.app', exception);
            logTemplate.type='Error'
            logTemplate.status=APMstatus.FAIL.STATUSKEY
            logTemplate.error=exception
            log.log=logTemplate
            log._id=APMServ.logToDB(log)
            throw new Meteor.Error('403', 'La informacion introducida no es valida para obtener la VERSION DEL APP');
        }
        
    },
    run(version,logTemplate,log){
        const responseMessage = new ResponseMessage(); 
        try {
            
            version.appVersion= Version.getAppVersion();
            logTemplate.dateRunEnd=Utilities.getDateTimeNowUTC();
            logTemplate.msg= "Version del aplicativo: "+version.appVersion
            log.log=logTemplate
            log._id=APMServ.logToDB(log)
            //console.log("version.appVersion",version.appVersion)
            responseMessage.create("Version del aplicativo","Version codigo del servidor",version.appVersion);
            
        }catch ( exception){
            console.error('version.app', exception);
            logTemplate.status=APMstatus.FAIL.STATUSKEY
            logTemplate.error=exception
            log.log=logTemplate
            log._id=APMServ.logToDB(log)
            throw new Meteor.Error('500', 'Ha ocurrido un error al guardar la empresa');
        }
        return responseMessage;
    }
 });


