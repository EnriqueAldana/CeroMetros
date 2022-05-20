import recivedMsgToDB from './recivedMsgToDB'
import {DateTime} from 'luxon'
import logger from '../logger/logger'
logger=logger.logger()
logger.log(DateTime.utc().toISO() + ' Inicio aplicacion tagTemporal plataforma componente sucriptor');
const mqtt = require('mqtt')


const host = Meteor.settings.private.HOST_MQTT
const port = Meteor.settings.private.PORT_MQTT
const clientId = Meteor.settings.private.CLIENT_ID_MQTT

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: Meteor.settings.private.USER_NAME_MQTT,
    password: Meteor.settings.private.USER_PASSWORD_MQTT,
    reconnectPeriod: 1000,
})

const topic = Meteor.settings.private.MAIN_TOPIC
const sendKeepMsg= {
    device_name: Meteor.settings.private.CLIENT_ID_MQTT + " Suscriptor",
    iDCommand: DateTime.utc().toISO(),
    command:["KeepAliveKeep","UP"]
   }
client.on('connect', () => {
    logger.log(DateTime.utc().toISO() + ' Conectado al servidor de mensajes...')
    client.subscribe([topic], () => {
        logger.log(DateTime.utc().toISO() + ` Suscripcion al topico:  '${topic}'`)
    })
    client.publish(topic, JSON.stringify(sendKeepMsg), { qos: 0, retain: false }, (error) => {
        if (error) {
            logger.error(DateTime.utc().toISO() + " Error al publicar KeepAlive desde el suscriptor" +error)
        }else{
            logger.log(DateTime.utc().toISO() +' KeepAlive desde el suscriptor del servidor de la plataforma tagTemporal')
            logger.log(DateTime.utc().toISO() +' Mensaje enviado al topico ' + topic + ' ' + JSON.stringify(sendKeepMsg))
        }
    })
})
client.on('message', (topic, payload) => {
    //logger.log('Recibiendo mensajes:', topic, payload.toString())
    // Aqui actualizar la base de datos sobre eventos recibidos
    logger.log(DateTime.utc().toISO() +' Recibiendo mensaje desde el servidor de mensajes')
    logger.log(DateTime.utc().toISO() +payload.toString())
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