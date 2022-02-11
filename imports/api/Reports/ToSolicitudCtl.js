import { check, Match } from "meteor/check";
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ResponseMessage } from "../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../middlewares/AuthGuard";
import Permissions from "../../startup/server/Permissions";
import { ToSolicitudRepository } from "./ToSolicitud"
import toSolicitudServ from "./ToSolicitudServ"
import  Utilities from "../../startup/server/utilities/Utilities";
import APMServ from "../AppPerformanceManagement/APMServ"
import { APMstatus } from "../AppPerformanceManagement/APMStatus";
import APMlog from "../AppPerformanceManagement/APMLog"
import { DateTime } from "luxon";

new ValidatedMethod({
    name: 'toSolicitud.list',
    mixins: [MethodHooks],
    permissions: [Permissions.REPORTS.SUPPLYREQUESTSOLDSYSTEM.VALUE],
    beforeHooks: [AuthGuard.checkPermission],  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
    afterHooks: [],
    validate({ dateQuery }) {
        try {
            //console.log("dateQuery", dateQuery)
            APMlog.controller.methodName='toSolicitud.list'
            APMlog.userId=Meteor.user();
            const logId=APMServ.loggerDB(APMlog)
            APMlog._id=logId
            //console.log("logId de la insercion ",logId)
            check(dateQuery, 
                {
                    dateStart: String,
                    dateEnd: String}
                );
            APMlog.controller.validate.status=APMstatus.SUCC
            APMlog.controller.validate.dateValidate=DateTime.local({ locale: 'es_MX' });
            APMlog.controller.validate.msg='validacion completa para parametros ' + { dateQuery }
            APMServ.loggerDB(APMlog)
        } catch (exception) {
            console.error('toSolicitud.list', exception);
            APMlog.controller.validate.status=APMstatus.FAIL
            APMlog.controller.validate.dateValidate=DateTime.local({ locale: 'es_MX' });
            APMlog.controller.validate.msg='validacion NO completa para parametros '+ { dateQuery }
            APMlog.controller.validate.error=exception
            APMServ.loggerDB(APMlog)
            throw new Meteor.Error('403', 'Ocurrio un error al obtener las solicitudes',exception);
        }
    },
    run({ dateQuery }) {

        const responseMessage = new ResponseMessage();
        try {
            const dateStartISO= Utilities.dateTimeToISO(dateQuery.dateStart)
            const dateEndISO= Utilities.dateTimeToISOEndDay(dateQuery.dateEnd)
            const dateStart=DateTime.local({ locale: 'es_MX' });
            APMlog.controller.run.status=APMstatus.SUCC
            APMlog.controller.run.dateRunStart=dateStart
            APMlog.controller.run.msg='Parametros usados para la consulta '+ 'dateStartISO '+dateStartISO+'dateEndISO '+dateEndISO
            APMlog.controller.run.timeUsed=0
            // Si error Mongo code 96 hay que aumentar memoria para ordenamiento al servidor de 32MB a mas
            // Ejecutar en la ventana de comando de MongoDb
            // mongo -u "root" -p CeroM3tros --authenticationDatabase "admin"
            // db.adminCommand ({setParameter: 1, internalQueryExecMaxBlockingSortBytes: 335544320}) // No recomendado
            // Se debe obtener algo asi
            //db.adminCommand ({setParameter: 1, internalQueryExecMaxBlockingSortBytes: 335544320})
            // { "was" : 33554432, "ok" : 1 }
            APMServ.loggerDB(APMlog)
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
                const dateEnd=DateTime.local({ locale: 'es_MX' });
                APMlog.controller.run.dateRunEnd=dateEnd
                APMlog.controller.run.timeUsed=(dateEnd.diff(dateStart))/1000 // Segundos
                APMServ.loggerDB(APMlog)
                const dateRunStartProcess= DateTime.local({ locale: 'es_MX' });
                APMlog.controller.run.dateRunStartProcess=dateRunStartProcess
                APMlog.controller.run.timeUsedOnProcess=0
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
           const dateRunEndProcess=DateTime.local({ locale: 'es_MX' });
           APMlog.controller.run.dateRunEndProcess=dateRunEndProcess
           APMlog.controller.run.timeUsedOnProcess=(dateRunEndProcess.diff(dateRunStartProcess))/1000
           APMServ.loggerDB(APMlog)
            responseMessage.create('Se ha obtenido la lista de solicitudes ', 'Solicitudes sistema Escritorio', respuesta);
        } catch (exception) {
            let errorDescription=''
            if (exception.code==96)
                    errorDescription= 'MongoError: Executor error during find command :: caused by :: Sort operation used more than the maximum 33554432 bytes of RAM. Add an index, or specify a smaller limit'
            APMlog.controller.run.status=APMstatus.FAIL
            APMlog.controller.run.error={exception, errorDescription}
            APMServ.loggerDB(APMlog)
            console.error('toSolicitud.list', exception);
            throw new Meteor.Error('toSolicitud.list', 'Ocurrió un error al obtener la lista de solicitudes');
        }
       
        return responseMessage;
    }
});