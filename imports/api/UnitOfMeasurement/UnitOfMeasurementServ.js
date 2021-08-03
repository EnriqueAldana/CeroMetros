import {Meteor} from "meteor/meteor";
import {UnitOfMeasurementRepository} from './UnitOfMeasurement';
import { Product } from "../Products/Product";

export default {

    validateUnitOfMeasurement(newUnitOfMeasurementName,newSymbol,idUnitOfMeasurement){


        const unitOfMeasurementName= UnitOfMeasurementRepository.find({name:newUnitOfMeasurementName}).fetch();
        const unitOfMeasurementSymbol= UnitOfMeasurementRepository.find({symbol:newSymbol}).fetch();

        if(idUnitOfMeasurement){ // Si es actualizacion
            if (unitOfMeasurementName.length > 1){   
                    throw new Meteor.Error('403', 'El nombre de la unidad de medida ya esta siendo utilizado');
            }
            if (unitOfMeasurementSymbol.length >1){   
                    throw new Meteor.Error('403', 'El simbolo de la unidad de medida ya esta siendo utilizado');
            }
            
        }else{
            // si es nuevo
            if (unitOfMeasurementName.length > 0){   
                throw new Meteor.Error('403', 'El nombre de la unidad de medida ya esta siendo utilizado');
            }
            if (unitOfMeasurementSymbol.length > 0 ){   
                throw new Meteor.Error('403', 'El simbolo de la unidad de medida ya esta siendo utilizado');
            }
        }
        
    },
    validateUnitOfMeasurementBusy(idUnitOfMeasurement){

        // Buscar productos con unidad de medida
        console.log('Id de una UM', idUnitOfMeasurement);
        // db.getCollection('products').find({'unit._id' : 'SfyPuuA9ZMYS95gFt'})
        const existsProduct= Product.findOne({'unit._id':idUnitOfMeasurement});
        if(existsProduct){  // Hay un producto que está usando la unidad de medida 
            throw new Meteor.Error('403', 'La unidad de medida no puede ser eliminada porque al menos un producto la esta usando');
        }

    }
}