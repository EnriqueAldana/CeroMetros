
import {Meteor} from "meteor/meteor";
import {Supplies} from "./Supplies";

export default {
    
    validateSupplyName(newSupplyName,idSupply){
        const existsSupply= Supplies.findOne({name:newSupplyName});
        if(idSupply !== null){  // actualizacion de suministro
            const oldSupply= Supplies.findOne(idSupply);
            if(oldSupply.name !== newSupplyName && existsSupply){
                throw new Meteor.Error('403', 'El nuevo nombre del suministro ya esta siendo usado');
            }
        }else if(existsSupply){ // es producto nuevo pero el nombre  ya existe.
                throw new Meteor.Error('403', 'El nombre del nuevo suministro  ya esta siendo utilizado');

        }
    },
    validateSupplyBusy(idSupply){

        // aqui validar si un producto lo esta refiriendo como un componente

    }
}