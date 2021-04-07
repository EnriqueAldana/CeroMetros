
import {Meteor} from 'meteor/meteor';
import {ProductionLineRepository} from "./ProductionLine";

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
    }
}