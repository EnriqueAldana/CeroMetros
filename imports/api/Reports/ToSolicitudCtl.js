import { check, Match } from "meteor/check";
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ResponseMessage } from "../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../middlewares/AuthGuard";
import Permissions from "../../startup/server/Permissions";
import { ToSolicitudRepository } from "./ToSolicitud"
import toSolicitudServ from "./ToSolicitudServ"
import  Utilities from "../../startup/both/Utilities";
import APMServ from "../AppPerformanceManagement/APMServ"
import { APMstatus } from "../../startup/both/APMStatus";
import APMlog from "../../startup/both/APMLog"
import APMTemplate from "../../startup/both/APMTemplate"
let logTemplate
let log
new ValidatedMethod({
    name: 'toSolicitud.list',
    mixins: [MethodHooks],
    permissions: [Permissions.REPORTS.SUPPLYREQUESTSOLDSYSTEM_LIST.VALUE],
    beforeHooks: [AuthGuard.checkPermission],  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
    afterHooks: [],
    validate({ dateQuery }) {
        
        try {
            logTemplate= new APMTemplate('Info',APMstatus.SUCC.STATUSKEY,'Controller','toSolicitud.list',
             'dateStart: ', 'Obteniendo lista de solicitudes','');
            logTemplate.componentParameters= 'dateStart: '+dateQuery.dateStart+' dateEnd:'+dateQuery.dateEnd
            logTemplate.dateRunStart=Utilities.getDateTimeNowUTC();
            log = new APMlog('-',this.userId,logTemplate);
            
            // actualizamos el Id del registro del log
            log._id=APMServ.logToDB(log)
           
            check(dateQuery, 
                {
                    dateStart: String,
                    dateEnd: String}
                );
            
        } catch (exception) {
            console.error('toSolicitud.list', exception);
            logTemplate.type='Error'
            logTemplate.statusKeyLog=APMstatus.FAIL.STATUSKEY
            logTemplate.error=exception
            log.log=logTemplate
            APMServ.logToDB(log)
            throw new Meteor.Error('403', 'Ocurrio un error al validar los parametros para traer la lista de solicitudes',exception);
        }
    },
    run({ dateQuery }) {

        const responseMessage = new ResponseMessage();
        try {
            const dateStartISO= Utilities.dateTimeToISO(dateQuery.dateStart)
            const dateEndISO= Utilities.dateTimeToISOEndDay(dateQuery.dateEnd)
    
            // Si error Mongo code 96 hay que aumentar memoria para ordenamiento al servidor de 32MB a mas
            // Ejecutar en la ventana de comando de MongoDb
            // mongo -u "root" -p CeroM3tros --authenticationDatabase "admin"
            // db.adminCommand ({setParameter: 1, internalQueryExecMaxBlockingSortBytes: 335544320}) // No recomendado
            // Se debe obtener algo asi
            //db.adminCommand ({setParameter: 1, internalQueryExecMaxBlockingSortBytes: 335544320})
            // { "was" : 33554432, "ok" : 1 }
            
                const toSol = ToSolicitudRepository.find(
                    {
                        'FechaSolicitud': { $gte: new Date(dateStartISO),
                                            $lte: new Date(dateEndISO) }
                    },
                    {
                        fields:{
                            
                            IdSolicitud: 1,
                            IdMaquina: 1,
                            IdUsuario: 1,
                            IdCaja: 1,
                            CantidadCaja: 1,
                            CantidadTapa: 1,  
                            FechaSolicitud: 1,
                            FechaDespachoTotal: 1,
                            FechaDespachoParcial: 1,
                            FechaEspectativaDespacho:1,
                            EstatusSolicitud:1,
                            SurtirEnDucto:1,
                            GrupoOperador:1,
                            numordprod:1,
                            TipoSol:1,
                            Medida:1,
                            Resistencia:1,
                            Borde:1,
                            Suministro:1,
                            SumTipo:1,
                            Actividad:1,
                            FechaPreSolicitud:1,
                            UPDATE_TS:1
   
                        },
                        sort:{IdSolicitud: -1}
                    }
                ).fetch();
 
                logTemplate.dateRunEnd=Utilities.getDateTimeNowUTC();
                logTemplate.dateRunStartProcess=Utilities.getDateTimeNowUTC();

                const respuesta= toSol.filter(sol => {
                    sol._id=sol._id._str
                    sol.FechaSolicitud = toSolicitudServ.getDateAsString(sol.FechaSolicitud)
                    sol.FechaDespachoTotal=toSolicitudServ.getDateAsString(sol.FechaDespachoTotal)
                    sol.FechaDespachoParcial = toSolicitudServ.getDateAsString(sol.FechaDespachoParcial);  
                    sol.FechaEspectativaDespacho= toSolicitudServ.getDateAsString(sol.FechaEspectativaDespacho); 
                    sol.FechaPreSolicitud= toSolicitudServ.getDateAsString(sol.FechaPreSolicitud);  
                    sol.UPDATE_TS= toSolicitudServ.getDateAsString(sol.UPDATE_TS);
                    // JSON no acepta datos considerados DECIMALES que vengan de MongoDB
                    sol.CantidadCaja= ((sol.CantidadCaja * 10 )/10 ).toString() 
                    sol.CantidadTapa= ((sol.CantidadTapa * 10 )/10).toString()
                    if(sol.Actividad== null) sol.Actividad=''  
                    if(sol.Borde == null) sol.Borde=''
                    if(sol.Medida == null ) sol.Medida='' 
                    if(sol.Resistencia == null ) sol.Resistencia='' 
                    if(sol.SumTipo == null ) sol.SumTipo='' 
                    if(sol.Suministro == null ) sol.Suministro=''
            return true
           });
           logTemplate.dateRunEndProcess=Utilities.getDateTimeNowUTC();
           log.log=logTemplate
           
           APMServ.logToDB(log)
           
            responseMessage.create('Se ha obtenido la lista de solicitudes ', log._id, respuesta);
        } catch (exception) {
            let errorDescription=''
            if (exception.code==96)
                    errorDescription= 'MongoError: Executor error during find command :: caused by :: Sort operation used more than the maximum 33554432 bytes of RAM. Add an index, or specify a smaller limit'
            logTemplate.statusKeyLog=APMstatus.FAIL.STATUSKEY
            logTemplate.error=exception
            log.log=logTemplate
            APMServ.logToDB(log)
            console.error('toSolicitud.list', exception);
            throw new Meteor.Error('403', 'Ocurrió un error al obtener la lista de solicitudes',exception);
        }
       
        return responseMessage;
    }
});