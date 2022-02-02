import {Meteor} from "meteor/meteor";

export default {

    getDateAsString(fecha){
        var dateTimeObj;
        if (fecha != null){
            try{
                dateTimeObj=new Date(fecha);
                return dateTimeObj.getDate()+ "/" + (parseInt(dateTimeObj.getMonth())+1) + "/" + dateTimeObj.getFullYear()
   
            }catch(ex){
                return "";
            }
            
        }else{
            return "";
        }
         },
}