import { Zone } from "luxon";
import { Duration } from "luxon";
import { DateTime, Settings } from "luxon";

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
    addSuppliesRequested(obj,suppliedSelected){
      // Este metodo actualiza 
      console.info("suppliedSelected",suppliedSelected.selectedSupplies.length)
      for(let i=0; i<obj.products.length;i++){
      
          for(let j=0; j<obj.products[i].components.length;j++){
              console.info("Componente",obj.products[i].components[j])
              for(let k=0; k<suppliedSelected.selectedSupplies.length; k++){
                console.info("suministro",suppliedSelected.selectedSupplies[k])
                if(
                  obj.products[i]._id === suppliedSelected.selectedSupplies[k].productId &&
                  obj.products[i].components[j]._id === suppliedSelected.selectedSupplies[k]._id && 
                  obj.products[i].components[j].workstationId === suppliedSelected.selectedSupplies[k].workstationId &&
                  obj.products[i].components[j].configurationId === suppliedSelected.selectedSupplies[k].configurationId)
                  {
                    console.info("component agregado", obj.products[i].components[j])
                    obj.products[i].components[j].requested.push(
                    {
                      requestCompleted: false,
                      requestedDate: new Date(), 
                      requestedAmount:suppliedSelected.selectedSupplies[k].amountRequested, 
                      dispatch:[{
                        requestedDispatchDate:"", 
                        requestedDispatchAmount:""
                      }]
                      }
                    );
                  }
              }  
          }
        
      }
      return obj;

    },
    dateTimeToISO(strDate){
      //console.log(strDate)
      var dt = DateTime.fromFormat(strDate, "yyyy-MM-dd", { locale: 'es_MX' })
      //console.log(dt.toISO())
      return dt.toISO();
    },
    todayDateTimeISOString(){
      return  DateTime.now().toUTC().toISO().toString()
      
    },
    dateTimeToISOEndDay(strDate){
      //console.log(strDate)
      var dt = DateTime.fromISO(strDate+"T23:59:59")
      //console.log(dt.toISO())
      return dt.toISO();
    }
    ,
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
    getDateDayMonthYearTime(){
      const dateFolio =DateTime.now().toISO({ format: 'basic' }) //=> '20210923T175537.004-0500'
      return dateFolio.substr(6, 2)+dateFolio.substr(4, 2)+dateFolio.substr(0, 4)+dateFolio.substr(9, 6)
     
    },
    getDateTimeNowUTC(){
      return DateTime.now().toUTC();
    },
    getDateTimeNowUTCString(){
      return DateTime.now().toUTC().toString();
    },
    getDateTimeLocalZone(zone,dateTime){
      let ret=null
      try{
          ret = dateTime.setZone(zone).toISO();
      }catch(e){

      }
      return ret;
    },
    getDataTimeDiff_Seconds(dateTimeStart:DateTime,dateTimeEnd:DateTime){
        let ret:number=0
        
        try{
            if (this.isValidDateTime(dateTimeEnd) && this.isValidDateTime(dateTimeStart))
             ret= dateTimeEnd.diff(dateTimeStart).milliseconds/1000
        }catch(e){
              console.error("Error en Utilities.getDataTimeDiff_Seconds" + e )
        }finally{
          return ret
        }
      

    },
    getDataTimeNowDiff_Seconds(dateTimeStart){
          return DateTime.now().toUTC().diff(dateTimeStart).seconds
    }
    ,
    setDefaultZone(defaultZone){
      //"America/Mexico_City";
     // Settings.defaultZoneName = defaultZone
    },
    setDefaultLocale(defaultLocale){
      // 'es_MX'
      Settings.defaultLocale=defaultLocale
    },
    // Probada
    createDateTimeUTC_from_Millis(millisecondP:number,options: {zoneP:string,localeP?:string,outputCalendarP?:string,numberingSystemP?:string}){
        let ret:DateTime=DateTime.now()
        try{
          ret = DateTime.fromMillis(millisecondP,{'zone':options.zoneP,'locale':options.localeP,'outputCalendar':options.outputCalendarP,'numberingSystem':options.numberingSystemP})
        }catch(e){
          console.error("Error en Utilities.createDateTimeUTC_from_Millis",e)
        }finally{
          return ret
        }
    },
    createrDateTimeUTC(yearP: number, monthP: number, dayP: number, hourP: number, minuteP: number, secondP: number, millisecondP=0, options?: {localeP:string,outputCalendarP:string,numberingSystemP:string}){

        let ret: DateTime
        try{
          ret=DateTime.utc(
            yearP, monthP, dayP, hourP, minuteP,secondP,millisecondP,
             { locale: options.localeP,outputCalendar:options.outputCalendarP,numberingSystem:options.numberingSystemP })
        }catch(e){

        }
        
        return ret
    },
    createDateTimeLocalZone(dayP:number,monthP:number,yearP:number,hourP:number=0,minuteP:number=0,secondP:number=0){
      ////"America/Mexico_City";
      let ret=null
      try{
        ret =DateTime.fromObject({
          day: dayP,
          month: monthP,
          year: yearP,
          hour: hourP,
          minute:minuteP,
          second: secondP
        });
      }catch(e){

      }
      return ret;
    },
    isValidDateTime(datetime:DateTime){
      return datetime.isValid; //
    }
    

};

