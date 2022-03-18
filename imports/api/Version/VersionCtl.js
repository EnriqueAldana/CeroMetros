import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../middlewares/AuthGuard";

import Version from "../../startup/server/Version";
import {check, Match} from "meteor/check";
import  Utilities from "../../startup/both/Utilities";
import APMServ from "../AppPerformanceManagement/APMServ"
import { APMstatus } from "../../startup/both/APMStatus";
import APMlog from "../../startup/both/APMLog"
import APMTemplate from "../../startup/both/APMTemplate"

// el valor asignado permanece la vida del servidor
let versionRequested="Initial login at StartUp Server"
new ValidatedMethod({
    name:'version.app',
     mixins:[MethodHooks], 
     beforeHooks: [AuthGuard.isUserLogged],
    validate(version){
        let logTemplate= new APMTemplate('Info',APMstatus.SUCC.STATUSKEY,'Controller','version.app',
             'version: ', 'Obteniendo version del aplicativo','');
        let log = new APMlog('-',this.userId,logTemplate);
        try {
            
            logTemplate.dateRunStart=Utilities.getDateTimeNowUTC();
            check(version,{
                appVersion: Match.OneOf(String, null),
            });
            logTemplate.dateRunEnd=Utilities.getDateTimeNowUTC();
            logTemplate.componentParameters='version: ' +versionRequested
            logTemplate.msg= "Version del aplicativo: "+versionRequested
            log.log=logTemplate
            APMServ.logToDB(log)
        
        }catch ( exception){
            console.error('version.app', exception);
            logTemplate.type='Error'
            logTemplate.statusKeyLog=APMstatus.FAIL.STATUSKEY
            logTemplate.error=exception
            log.log=logTemplate
            APMServ.logToDB(log)
            throw new Meteor.Error('403', 'La informacion introducida no es valida para obtener la VERSION DEL APP');
        }
        
    },
    run(version){
        const responseMessage = new ResponseMessage(); 
        try {
            //console.log("User logeed",this.userId)
            versionRequested= Version.getAppVersion() + " - " +Version.getAppEnvironment()
            
            responseMessage.create("Version del aplicativo","Version codigo del servidor",versionRequested);
            
        }catch ( exception){
            console.error('version.app', exception);
            throw new Meteor.Error('403', 'Ha ocurrido un error al obtener la version del Aplicativo','Valor de la variable de entorno ZERO_METERS_VERSION');
        }
        return responseMessage;
    }
 });
