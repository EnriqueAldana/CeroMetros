import AuthGuard from "../../middlewares/AuthGuard";
import { ResponseMessage } from "../../startup/server/utilities/ResponseMesssage";
import APMServ from "../AppPerformanceManagement/APMServ"
import { APMstatus } from "../../startup/both/APMStatus";
import APMlog from "../../startup/both/APMLog"
import Utilities from "../../startup/both/Utilities";
let log
new ValidatedMethod({
    name: 'apm.logger',
    mixins: [MethodHooks],
    beforeHooks: [AuthGuard.isUserLogged],
    validate(logView ) {
        try {
            log=logView
            
            //check(logObj,);
            // Ajustar objetos de fecha a tipos DataTime
            log.dateLogCreated=Utilities.createDateTimeUTC_from_Millis(
                logView.dateLogCreated.ts, {'zone':'default'}
            )
            log.log.dateCreated=Utilities.createDateTimeUTC_from_Millis(
                logView.log.dateCreated.ts, {'zone':'default'}
            )
            log.log.dateRunStart=Utilities.createDateTimeUTC_from_Millis(
                logView.log.dateRunStart.ts, {'zone':'default'}
            )
            log.log.dateRunEnd=Utilities.createDateTimeUTC_from_Millis(
                logView.log.dateRunEnd.ts, {'zone':'default'}
            )
            log.log.dateRunStartProcess=Utilities.createDateTimeUTC_from_Millis(
                logView.log.dateRunStartProcess.ts, {'zone':'default'}
            )
            log.log.dateRunEndProcess=Utilities.createDateTimeUTC_from_Millis(
                logView.log.dateRunEndProcess.ts, {'zone':'default'}
            )

            log._id=APMServ.logToDB(log)
            
           
        } catch (exception) {
            console.error('apm.logger', exception);
            log.log.type='Error'
            log.log.status=APMstatus.FAIL.STATUSKEY
            log.log.error=exception
            APMServ.logToDB(log)
            //throw new Meteor.Error('403', 'La información introducida no es valida para apm.logger');
        }
    },
    run() {
        const responseMessage = new ResponseMessage();
        try {
            
            APMServ.logToDB(log)
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