import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../middlewares/AuthGuard";
import {pendingMsgToPublish} from "../../api/tagTemporal/pendingMsgToPublishRepository"
import {DateTime} from 'luxon'
new ValidatedMethod({
    name:'tagTemporal.geoPosition',
    mixins:[MethodHooks], 
    beforeHooks: [AuthGuard.isUserLogged],
    afterHooks: [],                        // Aqui mandar datos a bitacora
    validate(geoPosition){
        try {
            console.log("Obj GeoPosition",geoPosition);
            // verificar quien esta logeado
            console.log("user Id de meteor",Meteor.userId())
            
            check(geoPosition,{
                latitude: String,
                longitude: String,
            });

        }catch ( exception){
            console.error('tagTemporal.geoPosition', exception);
            throw new Meteor.Error('403', 'La informacion introducida no es valida');
        }
        // Validar que los datos puedan ser representativos de coordenadas de geolocalizacion


    },
    run(geoPosition){
        const responseMessage = new ResponseMessage();
        try {
            
            // Validar que el usuario tenga tagTemporal vigente en este momento
            // y de ser cierto validar que la posicion GPS este dentro de las coordenadas del espejo de entrada o salida del
            // dispositivo de apertura coorespondiente al tagTemporal
            
            // El mensaje se configura de acuerdo a la RN deltagTemporal y las coordenadas
            let pendingMsg={
                device_name: "4c00:7500:2500:b00:6f00:7700",
                iDCommand: DateTime.utc().toISO(),
                command:["VehicularAccessBarrier","UP"]
            }
            let id= pendingMsgToPublish.insert({
                userId: Meteor.userId(),
                geoPosition: geoPosition,
                insertedAt: DateTime.utc(),
                isPublished:false,
                deviceMsg:pendingMsg
            });
            responseMessage.create('Se tomó la posicion GPS exitosamente','Se tomó la posicion GPS exitosamente y se configuro la accion del mensaje respectivo',id);

        }catch ( exception){
            console.error('tagTemporal.geoPosition', exception);
            throw new Meteor.Error('500', 'Ha ocurrido un error al tomar la posicion GPS');
        }
        return responseMessage;
    }
});