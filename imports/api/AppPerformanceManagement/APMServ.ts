
import { APM } from "./APM";
import { DateTime } from "luxon";
export default {

    loggerDB(apmlog) {
        let response = null;
        
        try {
            if (apmlog._id==null) {
                console.log("Insertando")
                response = APM.insert(
                    {
                        user: apmlog.user,
                        dateLogCreated: apmlog.dateLogCreated,
                        view: {
                            status: apmlog.view.status, //success / fail;
                            dateViewCreated: apmlog.view.dateViewCreated,
                            viewComponentName: apmlog.view.viewComponentName,
                            viewComponentParameters: apmlog.view.viewComponentParameters,
                            msg: apmlog.view.msg, // null || result
                            error: apmlog.view.error  //error.messag
                        },
                        controller: {
                            methodName: apmlog.controller.methodName,
                            validate: {
                                status: apmlog.controller.validate.status,
                                dateValidate: apmlog.controller.validate.dateValidate,
                                msg: apmlog.controller.validate.msg, // null || result
                                error: apmlog.controller.validate.error  //error.message
                            },
                            run: {
                                status: apmlog.controller.run.status,
                                dateRunStart: apmlog.controller.run.dateRunStart,
                                dateRunEnd: apmlog.controller.run.dateRunEnd,
                                timeUsed: apmlog.controller.run.timeUsed,
                                dateRunStartProcess: apmlog.controller.run.dateRunStartProcess,
                                dateRunEndProcess: apmlog.controller.run.dateRunEndProcess,
                                timeUsedOnProcess: apmlog.controller.run.timeUsedOnProcess,
                                msg: apmlog.controller.run.msg, // null || result
                                error: apmlog.controller.run.error  //error.message
                            }

                        }
                    }

                );
            } else {
                
                response = APM.update(apmlog._id, {
                    $set: {
                        user: apmlog.user,
                        dateLogCreated: apmlog.dateLogCreated,
                        view: {
                            status: apmlog.view.status, //success / fail;
                            dateViewCreated: apmlog.view.dateViewCreated,
                            viewComponentName: apmlog.view.viewComponentName,
                            viewComponentParameters: apmlog.view.viewComponentParameters,
                            msg: apmlog.view.msg, // null || result
                            error: apmlog.view.error  //error.messag
                        },
                        controller: {
                            methodName: apmlog.controller.methodName,
                            validate: {
                                status: apmlog.controller.validate.status,
                                dateValidate: apmlog.controller.validate.dateValidate,
                                msg: apmlog.controller.validate.msg, // null || result
                                error: apmlog.controller.validate.error  //error.message
                            },
                            run: {
                                status: apmlog.controller.run.status,
                                dateRunStart: apmlog.controller.run.dateRunStart,
                                dateRunEnd: apmlog.controller.run.dateRunEnd,
                                timeUsed: apmlog.controller.run.timeUsed,
                                dateRunStartProcess: apmlog.controller.run.dateRunStartProcess,
                                dateRunEndProcess: apmlog.controller.run.dateRunEndProcess,
                                timeUsedOnProcess: apmlog.controller.run.timeUsedOnProcess,
                                msg: apmlog.controller.run.msg, // null || result
                                error: apmlog.controller.run.error  //error.message
                            }

                        }
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