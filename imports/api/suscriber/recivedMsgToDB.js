import {receivedDeviceMsgs} from "../tagTemporal/tagTemporalRepository"
import logger from '../logger/logger'
import log from '../logger/logger'
logger=log.logger()
const { DateTime } = require("luxon");
export default {
    async saveRecivedMsgToDB(msg){
        try{
            let jsonOBJ= JSON.parse(msg)
            logger.log("Mensaje por guardar: " ,jsonOBJ)
            let id= receivedDeviceMsgs.insert({
                insertedAt: DateTime.utc(),
                device:jsonOBJ
            });
            //logger.log("Mensaje guardado con el _id: ", id);
        }catch(exception){
            logger.error('Error al guardar mensaje recibido ',exception);
            logger.error('mensaje ' + msg)
        }
    }
}