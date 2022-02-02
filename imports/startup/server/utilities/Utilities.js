import { DateTime } from "luxon";
import { createModuleResolutionCache } from "typescript";
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

