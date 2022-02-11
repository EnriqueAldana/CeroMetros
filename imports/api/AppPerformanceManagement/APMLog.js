
import { DateTime } from "luxon";

export default APMlog = {
        userId: null,
        dateLogCreated:DateTime.now().toUTC(),
        view: {
            status: null, //success / fail;
            dateViewCreated: null,
            viewComponentName: null,
            viewComponentParameters: null,
            msg: null, // null || result
            error: null  //error.messag
        },
        controller: {
            methodName: null,
            validate:{
                status: null,
                dateValidate:null,
                msg: null, // null || result
                error: null  //error.message
            },
            run:{
                status: null,
                dateRunStart:null,
                dateRunEnd:null,
                timeUsed:null,
                dateRunStartProcess:null,
                dateRunEndProcess:null,
                timeUsedOnProcess:null,
                msg: null, // null || result
                error: null  //error.message
            }
            
        }
    };
