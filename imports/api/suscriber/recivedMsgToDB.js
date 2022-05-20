import {receivedDeviceMsgs} from "../tagTemporal/receivedDeviceMsgsRepository"
import logger from '../logger/logger'
import log from '../logger/logger'
logger=log.logger()
const { DateTime } = require("luxon");
export default {
    async saveRecivedMsgToDB(msg){
        try{
            let jsonOBJ= JSON.parse(msg)
            logger.log(DateTime.utc().toISO() + " Mensaje por guardar a la BD: " ,jsonOBJ)
            let id= receivedDeviceMsgs.insert({
                insertedAt: DateTime.utc(),
                device:jsonOBJ
            });
            //logger.log("Mensaje guardado con el _id: ", id);
        }catch(exception){
            logger.error(DateTime.utc().toISO() + ' Error al guardar mensaje recibido ',exception);
            logger.error(DateTime.utc().toISO() +' Mensaje por guardar a la BD: ' + msg)
        }
    }
}