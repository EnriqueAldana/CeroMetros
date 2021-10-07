
import {Meteor} from 'meteor/meteor';
import {ProductionLineRepository} from "./ProductionLine";
import {WorkstationRepository} from '../Workstations/WorkStation'
import {ProductionOrders} from '../ProductionOrders/ProductionOrder'
export default {

validateProductionLineName(newProductionLine,idProductionLine){

    const existsProductionLineName= ProductionLineRepository.find({name:newProductionLine}).fetch();
        // recorrer la lista y comparar que uno diferente de mi tenga el mismo nombre
        existsProductionLineName.filter(
            productionline=>{
                if (productionline.name==newProductionLine && productionline._id!==idProductionLine){
                    throw new Meteor.Error('403', 'El nombre de la nueva linea de produccion  ya esta siendo utilizado');
                }
            }
        );
    },
    updateWorkStationWithProductionLine(workstationList,productionLineOBJ){
        console.info("Actualizando estaciones de trabajo para LP", productionLineOBJ);
        console.info("Lista de estaciones", workstationList)
        workstationList.filter(ws=>{
            try{
                
                WorkstationRepository.update(ws._id,{
                    $set:{     
                        productionline: productionLineOBJ,
                    }
                });
            }catch (exception) {
                    console.error('updateWorkStationWithProductionLine', exception);
                    throw new Meteor.Error('500', null,'Ocurrió un error al actualizar las estaciones de trabajo de la linea de produccion');
            }
           
        });

    },
    updateProductionLineWithWorkstation(iDProductionLine){
        
      
            try{
                const productionLine= ProductionLineRepository.findOne({_id:iDProductionLine});
                const wsIdList= productionLine.workstations.map(ws=>ws._id);
                console.info("wsIdList",wsIdList)
                const workstationList= WorkstationRepository.find({_id: { $in: wsIdList }}).fetch();
                ProductionLineRepository.update(iDProductionLine,{
                    $set:{     
                        workstations: workstationList,
                    }
                });
            }catch (exception) {
                    console.error('updateProductionLineWithWorkstation', exception);
                    throw new Meteor.Error('500', null,'Ocurrió un error al actualizar la linea de produccion con las estaciones de trabajo ');
            }
           

    },
    validateNoEraseProductionLine(iDproductionLine){
        console.info("iDproductionLine",iDproductionLine);
        const existProductionOrder= ProductionOrders.find({products:{production_line:{_id:iDproductionLine}}}).fetch()
        console.info("existProductionOrder",existProductionOrder)
        if(existProductionOrder.length>0)
        throw new Meteor.Error('403', 'La linea de produccion no puede ser eliminada porquehay al menos una orden de produccion que la está utilizado');
    },
}