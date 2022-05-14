import recivedMsgToDB from './recivedMsgToDB'
import logger from '../logger/logger'
import {pendingMsgToPublish} from "../../api/tagTemporal/pendingMsgToPublishRepository"
logger=logger.logger()
logger.log('Inicio aplicacion tagTemporal plataforma componente sucriptor');
const mqtt = require('mqtt')


const host = 'cerometros.com'
const port = '1883'
//const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const clientId = `tagTemporalServer Suscriptor`

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'tagtemporal',
    password: 'Enrique1937$',
    reconnectPeriod: 1000,
})

const topic = 'tagTemporal'
const sendKeepMsg= {
    device_name: "tagTemporalServer Suscriptor",
    iDCommand: "12345678",
    command:["KeepAliveKeep","UP"]
   }
client.on('connect', () => {
    logger.log('Conectado al servicor de mensajes...')
    client.subscribe([topic], () => {
        logger.log(`Suscripcion al topico:  '${topic}'`)
    })
    client.publish(topic, JSON.stringify(sendKeepMsg), { qos: 0, retain: false }, (error) => {
        if (error) {
            logger.error(error)
        }else{
            logger.log('Publicacion exitosa desde el servidor de la plataforma tagTemporal')
            logger.log('Mensaje enviado al topico ' + topic + ' ' + JSON.stringify(sendKeepMsg))
        }
    })
})
client.on('message', (topic, payload) => {
    //logger.log('Recibiendo mensajes:', topic, payload.toString())
    // Aqui actualizar la base de datos sobre eventos recibidos
    recivedMsgToDB.saveRecivedMsgToDB(payload.toString());

})

client.on("error", function(err) {
    logger.error("Error: " + err)
    if(err.code == "ENOTFOUND") {
        logger.error("Error en la red, asegurarse que se tenga una conexion activa a internet.")
    }
})

client.on("close", function() {
    logger.log("Conexion cerrada al servidor de mensajes mediante suscripcion")
})

client.on("reconnect", function() {
    logger.log("Intentando una reconexion para suscripcion al topico tagTemporal")
})

client.on("offline", function() {
    logger.log("La conexion al servidor de mensajes esta ahora fuera de linea.")
})  