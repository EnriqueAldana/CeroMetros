import AuthGuard from "../../middlewares/AuthGuard";
import { ResponseMessage } from "../../startup/server/utilities/ResponseMesssage";
import APMServ from "../AppPerformanceManagement/APMServ"
import { APMstatus } from "../../startup/both/APMStatus";
import APMlog from "../AppPerformanceManagement/APMLog"
import { DateTime } from "luxon";

new ValidatedMethod({
    name: 'apm.logger',
    mixins: [MethodHooks],
    beforeHooks: [AuthGuard.isUserLogged],
    validate({ logObj }) {
        let logTemplate= new APMTemplate('Info',APMstatus.SUCC.STATUSKEY,'View','apm.logger',
        '', 'Guardando log APM','');
        let log = new APMlog('',Meteor.user().id,logTemplate);
        try {
            log._id=APMServ.logToDB(log)
        

            check(logObj, {
                _id:Match.OneOf(String, null),
                viewComponentName: String,
                status: {
                    STATUSKEY: String,
                    STATUSDESCRIPTION: String
                },
                dateViewCreated: String,
                viewComponentParameters: [String],
                msg: String,
                error: Match.OneOf({}, null)

            },
            );
            logTemplate.componentName=logObj.viewComponentName
            logTemplate.componentParameter=logObj.viewComponentParameters
        } catch (exception) {
            console.error('apm.logger', exception);
            logTemplate.type='Error'
            logTemplate.status=APMstatus.FAIL.STATUSKEY
            logTemplate.error=exception
            log.log=logTemplate
            log._id=APMServ.logToDB(log)
            //throw new Meteor.Error('403', 'La información introducida no es valida para apm.logger');
        }
    },
    run(logObj,logTemplate,log) {
        const responseMessage = new ResponseMessage();
        try {
            
            logTemplate.dateRunEnd=Utilities.getDateTimeNowUTC();
            log.log=logTemplate
            log._id=APMServ.logToDB(log)
            responseMessage.create('Se guardó la informacion de un registro de monitoreo del aplicativo ', 'Log Id',log._id);
        } catch (exception) {
            console.error('apm.logger', exception);
            let errorDescription = ''
            if (exception.code == 96)
                errorDescription = 'MongoError: Executor error during find command :: caused by :: Sort operation used more than the maximum 33554432 bytes of RAM. Add an index, or specify a smaller limit'
                responseMessage.create('No Se guardó la informacion de un registro de monitoreo del aplicativo ', 'Log Id',log._id);
            //throw new Meteor.Error('500', ' Ha ocurrido un error al registrar el log en apm.logger ');
        }
        return responseMessage;
    }
});