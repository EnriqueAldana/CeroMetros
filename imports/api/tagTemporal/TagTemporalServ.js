// http://www.steves-internet-guide.com/using-node-mqtt-client/
import {DateTime} from 'luxon'
import logger from '../logger/logger'
logger=logger.logger()
const mqtt = require('mqtt')
const hostPub = Meteor.settings.private.HOST_MQTT
const portPub = Meteor.settings.private.PORT_MQTT
const clientIdPub = Meteor.settings.private.CLIENT_ID_MQTT

const connectUrlPub = `mqtt://${hostPub}:${portPub}`
//the client id is used by the MQTT broker to keep track of clients and and their // state
//const clientId = 'mqttjs_' + Math.random().toString(8).substr(2, 4)
let clientPub  = mqtt.connect(connectUrlPub, {
    clientIdPub,
    clean: true,
    connectTimeout: 4000,
    username: Meteor.settings.private.USER_NAME_MQTT,
    password: Meteor.settings.private.USER_PASSWORD_MQTT,
    reconnectPeriod: 1000,});

const options={
    retain:false,  // Que no retenga el mensaje para que cuando reinicie el dispositivo no vuelva a leer
    qos:1};


//publish function
function publish(topic,msg,options){
   //clientPub  = mqtt.connect(connectUrlPub, {clientId: clientIdPub, clean: false});
    console.log("publishing",msg);
    console.log(clientPub.connected)
  if (clientPub.connected == true){
    clientPub.publish(topic,JSON.stringify(msg),options,(error) => {
        if (error) {
            logger.error(DateTime.utc().toISO() +" El Msg: " + JSON.stringify(msg) + " " + " no ha sido publicado para el topico : "+ topic+ " " +error)
            return false
        }else{
            logger.log(DateTime.utc().toISO() +' Publicacion exitosa desde el servidor de la plataforma tagTemporal')
            logger.log(DateTime.utc().toISO() + ' Mensaje enviado al topico ' + topic + ' ' + JSON.stringify(msg))
            return true
        } 
       // clientPub.end()  
    });
  }else{
    logger.error(DateTime.utc().toISO()+" No hay conexion con el servidor de mensajes " )
    logger.error(DateTime.utc().toISO() +" El Msg: " + JSON.stringify(msg) + " " + " no ha sido publicado para el topico : "+ topic)
    return false
}
    
  
}
clientPub.on("connect",function(){
    logger.log(DateTime.utc().toISO()+" Conectado con la cola de mensajes para publicar: " + clientPub.connected)	
    console.log(DateTime.utc().toISO()+ " Conectado con la cola de mensajes para publicar:  "+ clientPub.connected);
    
})
//handle errors
clientPub.on("error",function(error){
logger.log(DateTime.utc().toISO()+" No puede conectarse con la cola de mensajes: " + error)	
console.log(DateTime.utc().toISO()+ " Can't connect" + error);
process.exit(1)}
);
clientPub.on("close", function() {
    logger.log(DateTime.utc().toISO()+ " Conexion cerrada al servidor de mensajes mediante suscripcion")
})

clientPub.on("reconnect", function() {
    logger.log(DateTime.utc().toISO()+ " Intentando una reconexion para suscripcion al topico tagTemporal")
})

clientPub.on("offline", function() {
    logger.log(DateTime.utc().toISO()+ " La conexion al servidor de mensajes esta ahora fuera de linea.")
})  
export default {

    publishMsg(topic, msg){
           const isSuccesfull = publish(topic, msg,options)
            return isSuccesfull
         },
}