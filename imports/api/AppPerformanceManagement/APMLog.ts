
import Utilities from "../../startup/both/Utilities"
import { DateTime } from "luxon";
import APMTemplate from "../../startup/both/APMTemplate";

export default class APMlog  {
    
        _id: String;
        userId: String;
        readonly dateLogCreated: DateTime;  // Solo puede ser asignada en el constructor
        log : APMTemplate    
        
        constructor(_id?:"",userId?:"",apmTemplate?:APMTemplate) {
            this._id=_id
            this.userId=userId
            this.log=apmTemplate;
            this.dateLogCreated  = Utilities.getDateTimeNowUTC();
          };
    
        
       
    };
