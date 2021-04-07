import {Meteor} from "meteor/meteor";
import {WarehouseRepository} from './Warehouse'


export default {

    validateWarehouseName(newWarehouseName,idWarehouse){
        const existsWarehouseList= WarehouseRepository.find({name:newWarehouseName}).fetch();
        // recorrer la lista y comparar que uno diferente de mi tenga el mismo nombre
        existsWarehouseList.filter(
            warehouse=>{
                if (warehouse.name==newWarehouseName && warehouse._id!==idWarehouse){
                    throw new Meteor.Error('403', 'El nombre del almacen ya esta siendo utilizado');
                }
            }
        );
    },
    validateWarehouseBusy(idWarehouse){

        // ToDo Buscar productos con almacen id 
        return 0;

    }
}