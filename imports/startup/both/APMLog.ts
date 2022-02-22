
import Utilities from "./Utilities"
import { DateTime } from "luxon";
import APMTemplate from "./APMTemplate";
export default class APMlog  {
    
        _id: String;
        userId: String;
        readonly dateLogCreated: DateTime;  // Solo puede ser asignada en el constructor
        log : APMTemplate    
        
        constructor(_id:string,userId:string,apmTemplate?:APMTemplate) {
            this._id=_id
            this.userId=userId
            this.log=apmTemplate;
            apmTemplate?this.log=apmTemplate: new APMTemplate()
            this.dateLogCreated  = Utilities.getDateTimeNowUTC();
          };
    
        
       
    };
