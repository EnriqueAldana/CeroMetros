import { check, Match } from "meteor/check";
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ResponseMessage } from "../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../middlewares/AuthGuard";
import Permissions from "../../startup/server/Permissions";
import { ToSolicitudRepository } from "./ToSolicitud"
import toSolicitudServ from "./ToSolicitudServ"
import  Utilities from "../../startup/server/utilities/Utilities";

new ValidatedMethod({
    name: 'toSolicitud.list',
    mixins: [MethodHooks],
    permissions: [Permissions.REPORTS.SUPPLYREQUESTSOLDSYSTEM.VALUE],
    beforeHooks: [AuthGuard.checkPermission],  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
    afterHooks: [],
    validate({ dateQuery }) {
        try {
            console.log("dateQuery", dateQuery)
            check(dateQuery, 
                {
                    dateStart: String,
                    dateEnd: String}
                );
        } catch (exception) {
            console.error('toSolicitud.list', exception);
            throw new Meteor.Error('403', 'Ocurrio un error al obtener las solicitudes');
        }
    },
    run({ dateQuery }) {

        const responseMessage = new ResponseMessage();
        try {
            const dateStartISO= Utilities.dateTimeToISO(dateQuery.dateStart)
            const dateEndISO= Utilities.dateTimeToISO(dateQuery.dateEnd)
            console.log("dateStartISO", dateStartISO)
            console.log("dateEndISO", dateEndISO)
            
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
        
           
            console.log("tosolicitudes", respuesta)

            responseMessage.create('Se ha obtenido la lista de solicitudes ', 'Solicitudes sistema Escritorio', respuesta);
        } catch (exception) {
            console.error('toSolicitud.list', exception);
            throw new Meteor.Error('500', 'Ocurrió un error al obtener la lista de solicitudes');
        }
       
        return responseMessage;
    }
});