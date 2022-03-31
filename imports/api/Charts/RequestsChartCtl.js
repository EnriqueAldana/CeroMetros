import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../middlewares/AuthGuard";
import Utilities from '../../startup/both/Utilities';

import {check, Match} from "meteor/check";
import RequestsChartServ from './RequestsChartServ';
import { RequestsChartRepository } from './RequestsChart';

new ValidatedMethod({
    name:'requests.distributed',
     mixins:[MethodHooks],
     beforeHooks: [AuthGuard.isUserLogged],
    validate(period){
        try {
            console.log("Periodo",period);
            check(period, String);

        }catch ( exception){
            console.error('requests.distributed', exception);
            throw new Meteor.Error('403', 'No es posible obtener datos para la distribución de las solicitudes',
            "Ha ocurrido un error en la conexion con la fuente de datos");
        }
        // Validar que el identificador de periodo sea adecuado.
        RequestsChartServ.validatePeriod(period);
    },
    async run(period){
        const responseMessage = new ResponseMessage(); 
        try {
            let dataIni= Utilities.dateTimeIniDay()
            let dataEnd= Utilities.dateTimeEndDay()
            switch(period) {
                case "HY":
                  // Ultimo dia
                  break;
                case "US":
                  // Ultima semana
                  dataIni=Utilities.datetimeToISOAddDay(dataIni,-7)
                  break;
                case "UM":
                // Ultimos 30 dias
                dataIni=Utilities.datetimeToISOAddDay(dataIni,-30)
                break;
                case "U3M":
                // Ultimos 90 dias
                dataIni=Utilities.datetimeToISOAddDay(dataIni,-90)
                break;
                case "U6M":
                // Ultimos 60 meses
                dataIni=Utilities.datetimeToISOAddDay(dataIni,-180)
                break;
                case "UA":
                // ultimos 365 dias
                dataIni=Utilities.datetimeToISOAddDay(dataIni,-365)
                break;
                case "U2A":
                // Ultimos 2 años
                dataIni=Utilities.datetimeToISOAddDay(dataIni,-730)
                break;
                default:
                  // el dia de hoy
              } 
            
            let typeSolNumber=[]
            let typeSolDescription=[]
            let typeSolAccount=[]
            let typeSolAccountPercentage=[]
            let total=0
            console.log("DateIni ISO", Utilities.dateTimeToISOWithParameter(dataIni))
            console.log("DateEnd ISO", Utilities.dateTimeToISOWithParameter(dataEnd))
            typeSolNumber= await RequestsChartRepository.rawCollection().distinct("TipoSol")
            typeSolDescription= await RequestsChartRepository.rawCollection().distinct("TipoSolDescripcion")
            typeSolNumber.map(type => {
                let account= RequestsChartRepository.find( { $and: [ {FechaSolicitud: { $gte: dataIni, $lte: dataEnd}}, {TipoSol:type} ] } ).count()
               // console.log("Account", account)
                total= total + account
                typeSolAccount.push(account)
            }); 
            typeSolAccount.map(account => {
                let percentage=0
                if(account!=0 && total!=0)
                    percentage= (account/total)* 100
                // console.log("percentage", percentage)
                 typeSolAccountPercentage.push(percentage)
             }); 
            
           // console.log("typeSolNumber", typeSolNumber)
           // console.log("typeSolDescription", typeSolDescription)
           // console.log("typeSolAccount", typeSolAccount)
           // console.log("total", total)
          //  console.log("typeSolAccountPercentage", typeSolAccountPercentage)
             
            responseMessage.create('Se obtuvo la distribucion de solicitudes por periodo',"Datos para la grafica de Solicitudes en distribucion", {typeSolDescription,total,typeSolAccount,typeSolAccountPercentage});
            
        }catch ( exception){
            console.error('requests.distributed', exception);
            throw new Meteor.Error('500', 'No se obtuvieron los datos de distribuciones de solicitudes por periodo');
        }
        return responseMessage;
    }
 });

 new ValidatedMethod({
    name:'requests.trend',
     mixins:[MethodHooks],
     beforeHooks: [AuthGuard.isUserLogged],
    validate(period){
        try {
            console.log("Periodo para tendencia",period);
            check(period, String);

        }catch ( exception){
            console.error('requests.trend', exception);
            throw new Meteor.Error('403', 'No es posible obtener datos para la tendencia de las solicitudes',
            "Ha ocurrido un error en la conexion con la fuente de datos");
        }
        // Validar que el identificador de periodo sea adecuado.
        RequestsChartServ.validatePeriod(period);
    },
    async run(period){
        const responseMessage = new ResponseMessage(); 
        try {
            let dataIni= Utilities.dateTimeIniDay()
            let dataEnd= Utilities.dateTimeEndDay()
            switch(period) {
                case "HY":
                  // Ultimo dia
                  break;
                case "US":
                  // Ultima semana
                  dataIni=Utilities.datetimeToISOAddDay(dataIni,-7)
                  break;
                case "UM":
                // Ultimos 30 dias
                dataIni=Utilities.datetimeToISOAddDay(dataIni,-30)
                break;
                case "U3M":
                // Ultimos 90 dias
                dataIni=Utilities.datetimeToISOAddDay(dataIni,-90)
                break;
                case "U6M":
                // Ultimos 60 meses
                dataIni=Utilities.datetimeToISOAddDay(dataIni,-180)
                break;
                case "UA":
                // ultimos 365 dias
                dataIni=Utilities.datetimeToISOAddDay(dataIni,-365)
                break;
                case "U2A":
                // Ultimos 2 años
                dataIni=Utilities.datetimeToISOAddDay(dataIni,-730)
                break;
                default:
                  // el dia de hoy
              } 
            
            let typeSolNumber=[]
            let typeSolDescription=[]
            let typeSolAccount=[]
            let typeSolAccountPercentage=[]
            let total=0
            console.log("DateIni ISO", Utilities.dateTimeToISOWithParameter(dataIni))
            console.log("DateEnd ISO", Utilities.dateTimeToISOWithParameter(dataEnd))
            typeSolNumber= await RequestsChartRepository.rawCollection().distinct("TipoSol")
            typeSolDescription= await RequestsChartRepository.rawCollection().distinct("TipoSolDescripcion")
            typeSolNumber.map(type => {
                let account= RequestsChartRepository.find( { $and: [ {FechaSolicitud: { $gte: dataIni, $lte: dataEnd}}, {TipoSol:type} ] } ).count()
               // console.log("Account", account)
                total= total + account
                typeSolAccount.push(account)
            }); 
            typeSolAccount.map(account => {
                let percentage=0
                if(account!=0 && total!=0)
                    percentage= (account/total)* 100
                // console.log("percentage", percentage)
                 typeSolAccountPercentage.push(percentage)
             }); 
            
           // console.log("typeSolNumber", typeSolNumber)
           // console.log("typeSolDescription", typeSolDescription)
           // console.log("typeSolAccount", typeSolAccount)
           // console.log("total", total)
          //  console.log("typeSolAccountPercentage", typeSolAccountPercentage)
             
            responseMessage.create('Se obtuvo la distribucion de solicitudes por periodo',"Datos para la grafica de Solicitudes en distribucion", {typeSolDescription,total,typeSolAccount,typeSolAccountPercentage});
            
        }catch ( exception){
            console.error('requests.distributed', exception);
            throw new Meteor.Error('500', 'No se obtuvieron los datos de distribuciones de solicitudes por periodo');
        }
        return responseMessage;
    }
 });
