
import {Meteor} from "meteor/meteor";
import { Provider } from "./Provider";

export default {

    validateProviderBussinessId(newProviderBussinesId,idProvider){

        const existsProvider= Provider.findOne({providerBussinessId:newProviderBussinesId});
        if(idProvider !== null){  // actualizacion de Proveedor
            const oldProvider= Provider.findOne(idProvider);
            if(oldProvider.providerBussinessId !== newProviderBussinesId && existsProvider){
                throw new Meteor.Error('403', 'El nuevo RFC del proveedor ya esta siendo usado');
            }
        }else if(existsProvider){ // es compañia nuevo pero el ProviderBussinesId  ya existe.
                throw new Meteor.Error('403', 'El nuevo RFC del proveedor ya esta siendo utilizado');

        }

    },
    validateProviderName(newProviderName,idProvider){
        const existsProvider= Provider.findOne({name:newProviderName});
        if(idProvider !== null){  // actualizacion de proveedor
            const oldProvider= Provider.findOne(idProvider);
            if(oldProvider.name !== newProviderName && existsProvider){
                throw new Meteor.Error('403', 'El nuevo nombre del proveedor ya esta siendo usado');
            }
        }else if(existsProvider){ // es proveedor nuevo pero el name  ya existe.
                throw new Meteor.Error('403', 'El nuevo nombre del proveedor ya esta siendo utilizado');

        }
    }
}