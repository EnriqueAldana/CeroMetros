import {Meteor} from "meteor/meteor";
import {WorkstationSetupRepository} from './WorkstationSetup';
import {Product} from '../Products/Product';
export default {

    validateWorkstationSetup(workstationSetupName,idWorkstationSetup){


        const workstationsetupname= WorkstationSetupRepository.find({name:workstationSetupName}).fetch();
       
        if(idWorkstationSetup){ // Si es actualizacion
            if (workstationsetupname.length > 1){   
                    throw new Meteor.Error('403', 'El nombre de la configuracion de la estacion de trabajo ya esta siendo utilizado');
            }
            
        }else{
            // si es nuevo
            if (workstationsetupname.length > 0){   
                throw new Meteor.Error('403', 'El nombre de la configuracion de la estacion de trabajo ya esta siendo utilizado');
            }
        }
        
    },
    validateWorkstationSetupBusy(idWorkstationsetup){

        // Buscar productos con unidad de medida
        console.log('Id de la configuracion de la estacion de trabajo', idWorkstationsetup);
        // db.getCollection('products').find({'unit._id' : 'SfyPuuA9ZMYS95gFt'})
        const existsProduct= Product.findOne({'production_line.workstations.workstation_setup._id':idWorkstationsetup});
        if(existsProduct){  // Hay un producto que está usando la configuracion de la estacion de trabajo 
            throw new Meteor.Error('403', 'La configuracion de la estacion de trabajo no puede ser eliminada porque al menos un producto la esta usando');
        }

    }
}