//publisher.js
import logger from '../logger/logger'
import { DateTime } from "luxon";
import { pendingMsgToPublish } from '../tagTemporal/pendingMsgToPublishRepository';
logger=logger.logger()

const mqtt = require('mqtt')
//require('dotenv').config()
const hostPub = 'cerometros.com'
const portPub = '1883'
//const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const clientIdPub = `tagTemporalServer Publicador`

const connectUrlPub = `mqtt://${hostPub}:${portPub}`
//the client id is used by the MQTT broker to keep track of clients and and their // state
//const clientId = 'mqttjs_' + Math.random().toString(8).substr(2, 4)
const clientPub  = mqtt.connect(connectUrlPub, {clientId: clientIdPub, clean: false});

// console.log(process.env.BROKER_URL, 'client', clientId)

const topicName = '4c00:7500:2500:b00:6f00:7700'
let topicPub = '4c00:7500:2500:b00:6f00:7700'
// Variable global en el servidor
msgToPublish = {
    device_name: "4c00:7500:2500:b00:6f00:7700",
    iDCommand: "12345678",
    command:["VehicularAccessBarrier","DOWN"]
   }


Meteor.methods({
    test(){
        return 'tagTemporal funcionando'
    }
})
clientPub.on("connect",function(connack){
    logger.log("client connected to publish", connack);
// on client connection publish messages to the topic on the server/broker
    const payload = {1: "Hello world", 2: "Welcome to the test connection"}
    logger.log("Mensajes publicados   desde la conexion " + payload[2])
    // AQUI MANEJAR UNA COLA en NODE JS para publicar mensajes

    //assuming messages comes in every 3 seconds to our server and we need to publish or process these messages
    setInterval(() => {
        // Leer de la base de datos los mensajes pendientes por publicar
        let pendigMsg=pendingMsgToPublish.find({isPublished:false}).fetch();
        /*pendingMsgToPublish.forEach(item =>{
            logger.log("Mensaje x publicar " + JSON.stringify(item.deviceMsg))
        });
        */
        msgToPublish.iDCommand= DateTime.utc().toISO()
        // Leer de la base de datos los mensajes no publicados
        /*clientPub.publish(topicPub, JSON.stringify(msgToPublish), { qos: 0, retain: false }, (error) => {
            if (error) {
                logger.error(error)
            }else{
                logger.log('Publicacion exitosa desde el servidor de la plataforma tagTemporal')
                logger.log('Mensaje enviado al topico ' + topicPub + ' ' + JSON.stringify(msgToPublish))
            }
        })
        */
    }, 3000);
    
}) ;

clientPub.on("error", function(err) {
    logger.log("Error: " + err)
    if(err.code == "ENOTFOUND") {
        logger.log("Network error, make sure you have an active internet connection to client Pub")
    }
})

clientPub.on("close", function() {
    logger.log("Connection closed by client Pub")
})

clientPub.on("reconnect", function() {
    logger.log("Client Pub trying a reconnection")
})

clientPub.on("offline", function() {
    logger.log("Client Pub is currently offline")
})