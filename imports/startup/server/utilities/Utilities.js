import { DateTime } from "luxon";
export default {

    generateNumberToken(min, max) {
        //console.log('min ', min);
        //console.log('max ',max);
        const num= Math.floor(Math.random() * (max+1-min) +min );
        //console.log('random ' , num);
        return num;
    },
    setStatusToObject(object,status,statusOrigin){
        const obj={
            // INI Inicial , PAR - Parcial , COM Completa, CAN Cancelado 
            statusDate: new Date(),
            statusKey: status.STATUSKEY,
            statusDescription: status.STATUSDESCRIPTION,
            statusOrigin: statusOrigin,
          }
          if(status.STATUSKEY==='INI')
            Object.assign(object, {status:[]});
          object.status.push(obj);
          return object;
    },
    dateTimeFromString_dd_MM_YYYY(strDate){
       // console.info("Cadena por convertir", strDate)
       // const day = strDate.substr(0, 2)
       // console.info("Day", day)
       // const month= strDate.substr(3,2)
       // console.info("Month", month)
       // const year= strDate.substr(6,4)
       // console.info("Year", year)
        var dt = DateTime.fromFormat(strDate, "dd/MM/yyyy", { locale: 'es_MX' })
       // console.info("dt usuario", dt.toString())
        var local = DateTime.local();
       // console.info("dt local", local.toString())
        var rezoned = local.setZone("America/Chihuahua");
      //  console.info("dt Chihuahua", rezoned.toString())
       // console.info("dt local y chihuahua son iguales ", local.valueOf() === rezoned.valueOf())
    return dt;
    },
    getFolio(){
      const dateFolio =DateTime.now().toISO({ format: 'basic' }) //=> '20210923T175537.004-0500'
      return dateFolio.substr(2, 2) + dateFolio.substr(6, 2)+dateFolio.substr(4, 2)+dateFolio.substr(9, 6)+dateFolio.substr(16, 3)
    },
    

};

