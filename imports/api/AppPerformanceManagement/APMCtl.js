import AuthGuard from "../../middlewares/AuthGuard";
import { ResponseMessage } from "../../startup/server/utilities/ResponseMesssage";
import APMServ from "../AppPerformanceManagement/APMServ"
import { APMstatus } from "../AppPerformanceManagement/APMStatus";
import APMlog from "../AppPerformanceManagement/APMLog"
import { DateTime } from "luxon";

new ValidatedMethod({
    name: 'apm.logger',
    mixins: [MethodHooks],
    beforeHooks: [AuthGuard.isUserLogged],
    validate({ log }) {
       
        try {
            
            APMlog.view.viewComponentName = log.viewComponentName
            APMlog.user = Meteor.user();
            if(log._id==null){
                APMlog._id= APMServ.loggerDB(APMlog)
            }else{
                APMlog._id=log._id 
            }

            check(log, {
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
            APMlog.view.status = log.status
            APMlog.view.dateViewCreated = DateTime.fromISO(log.dateViewCreated)
            APMlog.view.viewComponentParameters = log.viewComponentParameters
            APMlog.view.msg = log.msg
            APMlog.view.error = log.error
            APMServ.loggerDB(APMlog)
        } catch (exception) {
            console.error('apm.logger', exception);
            APMlog.view.msg = 'validacion NO completa para parametros ' + log.viewComponentName
            APMlog.view.error = exception
            APMServ.loggerDB(APMlog)
            throw new Meteor.Error('403', 'La información introducida no es valida para apm.logger');
        }
    },
    run(log) {
        const responseMessage = new ResponseMessage();
        try {
            
            responseMessage.create('Se guardó la informacion de un registro de monitoreo del aplicativo ', 'Log Id',APMlog._id);
        } catch (exception) {
            console.error('apm.logger', exception);
            let errorDescription = ''
            if (exception.code == 96)
                errorDescription = 'MongoError: Executor error during find command :: caused by :: Sort operation used more than the maximum 33554432 bytes of RAM. Add an index, or specify a smaller limit'
            APMlog.controller.run.status = APMstatus.FAIL
            APMlog.controller.run.error = { exception, errorDescription }
            APMServ.loggerDB(APMlog)
            throw new Meteor.Error('500', ' Ha ocurrido un error al registrar el log en apm.logger ');
        }
        return responseMessage;
    }
});