import { DateTime } from "luxon";
import {APMstatus} from "./APMStatus"
import Utilities from "../../startup/both/Utilities"
export default class APMTemplate  { 
    type: String;  // Info, Warning , Error, Performance, etc
    statusKeyLog: String //success / fail;
    dateCreated: DateTime
    componentType: String // View, Controller, File, DataBase, etc
    componentName: String
    componentParameters: String
    msg: String // null || result
    error: String   //error.messag
    dateRunStart:DateTime;
    dateRunEnd:DateTime;
    timeUsed:number;
    dateRunStartProcess:DateTime;
    dateRunEndProcess:DateTime;
    timeUsedOnProcess:number;

    constructor(
        type?:"Info",status?:'SUCC',componentType?:"Controller",
        componentName?:"", componentParameter?:"",
        msg?:"",error?:""
        ){  // Si no viene se aasigna "Info"
       this.type= type;  // Info, Warning , Error, Performance, etc
       this.statusKeyLog= status;//success / fail;
       this.dateCreated= Utilities.getDateTimeNowUTC();
       this.componentType= componentType // View, Controller, File, DataBase, etc
       this.componentName= componentName;
       this.componentParameters=componentParameter;
       this.msg= msg // null || result
       this.error= error   //error.messag
       this.dateRunStart=Utilities.getDateTimeNowUTC();
       this.dateRunEnd=Utilities.getDateTimeNowUTC();
       this.timeUsed=0;
       this.dateRunStartProcess=Utilities.getDateTimeNowUTC();
       this.dateRunEndProcess=Utilities.getDateTimeNowUTC();
       this.timeUsedOnProcess=0;
    };
    //constructor(s: string);
    //constructor(xs: any, y?: any) {
      // TBD
    //}
}

