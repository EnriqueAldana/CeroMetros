
import { APM } from "./APM";
import APMLog from "./APMLog"
import Utilities from "../../startup/both/Utilities"
export default {

    logToDB(apmlog:APMLog) {
        let response = null;
       
        try {
            if (apmlog._id == "") {
                response = APM.insert(
                    {
                        userId: apmlog.userId,
                        type: apmlog.log.type,
                        statusKeyLog: apmlog.log.statusKeyLog,
                        dateCreated: apmlog.log.dateCreated,
                        componentType: apmlog.log.componentType, // View, Controller, File, DataBase, etc
                        componentName: apmlog.log.componentName,
                        componentParameters: apmlog.log.componentParameters,
                        msg: apmlog.log.msg, // null || result
                        error: apmlog.log.error,   //error.messag
                        dateRunStart: apmlog.log.dateRunStart,
                        dateRunEnd: apmlog.log.dateRunEnd,
                        timeUsed: Utilities.getDataTimeDiff_Seconds(apmlog.log.dateRunStart,apmlog.log.dateRunEnd), // Segundos;
                        dateRunStartProcess: apmlog.log.dateRunStartProcess,
                        dateRunEndProcess: apmlog.log.dateRunEndProcess,
                        timeUsedOnProcess: Utilities.getDataTimeDiff_Seconds(apmlog.log.dateRunStartProcess,apmlog.log.dateRunEndProcess), // Segundos;
                    }

                );
            } else {

                response = APM.update(apmlog._id, {
                    $set: {
                        userId: apmlog.userId,
                        type: apmlog.log.type,
                        statusKeyLog: apmlog.log.statusKeyLog,
                        dateCreated: apmlog.log.dateCreated,
                        componentType: apmlog.log.componentType, // View, Controller, File, DataBase, etc
                        componentName: apmlog.log.componentName,
                        componentParameters: apmlog.log.componentParameters,
                        msg: apmlog.log.msg, // null || result
                        error: apmlog.log.error,   //error.messag
                        dateRunStart: apmlog.log.dateRunStart,
                        dateRunEnd: apmlog.log.dateRunEnd,
                        timeUsed: Utilities.getDataTimeDiff_Seconds(apmlog.log.dateRunStart,apmlog.log.dateRunEnd), // Segundos;
                        dateRunStartProcess: apmlog.log.dateRunStartProcess,
                        dateRunEndProcess: apmlog.log.dateRunEndProcess,
                        timeUsedOnProcess: Utilities.getDataTimeDiff_Seconds(apmlog.log.dateRunStartProcess,apmlog.log.dateRunEndProcess), // Segundos;
                    }
                });
            }

        } catch (e) {
            console.error('APMServ.loggerDB', e);
        } finally {

        }
        return response;
    },

}