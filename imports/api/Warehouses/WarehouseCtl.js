import {check, Match} from "meteor/check";
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../middlewares/AuthGuard";
import Permissions from "../../startup/server/Permissions";
import {WarehouseRepository} from './Warehouse'
import WarehouseServ from "./WarehouseServ";

new ValidatedMethod({
    name:'warehouse.save',
     mixins:[MethodHooks],
     permissions: [Permissions.WAREHOUSES.CREATE.VALUE,Permissions.WAREHOUSES.UPDATE.VALUE],  
     beforeHooks: [AuthGuard.checkPermission],
    validate(warehouse){
        try {
            
            check(warehouse,{
                _id: Match.OneOf(String, null),
                name: String,
                name_full: String,
                location: String
            });

        }catch ( exception){
            console.error('warehouse.save', exception);
            throw new Meteor.Error('403', 'La informacion introducida no es valida');
        }
        // Validar que no haya almacenes con el mismo nombre   
        
        WarehouseServ.validateWarehouseName(warehouse.name,warehouse._id);
    },
    run(warehouse){
        const responseMessage = new ResponseMessage(); 
        try {
            if(warehouse._id !== null){
                
                WarehouseRepository.update(warehouse._id,{
                    $set: {
                    name: warehouse.name,
                    name_full: warehouse.name_full,
                    location: warehouse.location
                    }
                });
                

                responseMessage.create('Se actualizó el almacen exitosamente');
            }else{
                WarehouseRepository.insert({
                    name: warehouse.name,
                    name_full: warehouse.name_full,
                    location: warehouse.location
                });

                responseMessage.create('Se insertó el almacen exitosamente');
            }
        }catch ( exception){
            console.error('warehouse.save', exception);
            throw new Meteor.Error('500', 'Ha ocurrido un error al guardar el almacen');
        }
        return responseMessage;
    }
 });

new ValidatedMethod({
    name: 'warehouse.delete',
    mixins: [MethodHooks],
    permissions: [Permissions.WAREHOUSES.DELETE.VALUE],
    beforeHooks: [AuthGuard.checkPermission],  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
    afterHooks: [],
    validate({ idWarehouse }){
        try {
            console.log('idWarehouse ', idWarehouse);
            check(idWarehouse , String);
        }catch (exception) {
            console.error('warehouse.delete', exception);
            throw new Meteor.Error('403', 'Ocurrio un error al eliminar el almacen');
        }
        // validar que no sea posible eliminar un almacen si hay un producto utilizandolo.
        const warehouseWithProduct = WarehouseServ.validateWarehouseBusy(idWarehouse);
        if (warehouseWithProduct > 0){
            throw new Meteor.Error('403','No es posible elimiar el almacen',
                'Hay al menos un producto utilizandolo');
        }
    },
    run({ idWarehouse }){
        const responseMessage = new ResponseMessage();
        try {
            WarehouseRepository.remove(idWarehouse);
                responseMessage.create('Almacen eliminado exitosamente');
        }catch (exception) {
            console.error('warehouse.delete', exception);
            throw new Meteor.Error('500', 'Ocurrio un error al eliminar el almacen');
        }

        return responseMessage;
    }
});
