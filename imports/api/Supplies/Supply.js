import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../middlewares/AuthGuard";
import Permissions from "../../startup/server/Permissions";
import { Supplies } from './Supplies';
import SupplyServ from "./SupplyServ";
import {check, Match} from "meteor/check";

new ValidatedMethod({
    name:'supply.save',
     mixins:[MethodHooks],
     permissions: [Permissions.SUPPLIES.CREATE.VALUE,Permissions.SUPPLIES.UPDATE.VALUE],  
     beforeHooks: [AuthGuard.checkPermission],
    validate(supply){
        try {
            console.info('supply ', supply)
            check(supply,{
                _id: Match.OneOf(String, null),
                name: String,
                name_full: String,
                unit: {
                    _id: String,
                    name: String,
                    symbol: String
                },
                stock: String
                ,
                provider: {
                    _id: String,
                    name: String
                },
                location: String,
                sku: String,
                warehouse: {
                    _id: String,
                    name: String,
                    name_full: String,
                    location: String
                },
                isAvailable: Boolean
            });

        }catch ( exception){
            console.error('supply.save', exception);
            throw new Meteor.Error('403', 'La informacion introducida no es valida');
        }
        // Validar que no haya suministro con el mismo nombre
        SupplyServ.validateSupplyName(supply.name,supply._id);
    },
    run(supply){
        const responseMessage = new ResponseMessage(); 
        try {
            if(supply._id !== null){
                // ToDO
                // agregar registro en kardex si se ha cambiado el valor de stock
                Supplies.update(supply._id,{
                    $set: {
                    name: supply.name,
                    name_full: supply.name_full,
                    unit: supply.unit,
                    stock: supply.stock,
                    location: supply.location,
                    sku: supply.sku,
                    warehouse: supply.warehouse,
                    provider: supply.provider,
                    isAvailable: supply.isAvailable
                    }
                });
                responseMessage.create('Se actualizó el suministro exitosamente');
            }else{
                Supplies.insert({
                    name: supply.name,
                    name_full: supply.name_full,
                    unit: supply.unit,
                    stock: supply.stock,
                    location: supply.location,
                    sku: supply.sku,
                    warehouse: supply.warehouse,
                    provider: supply.provider,
                    isAvailable: supply.isAvailable
                });
                responseMessage.create('Se insertó el suministro exitosamente');
            }
        }catch ( exception){
            console.error('supply.save', exception);
            throw new Meteor.Error('500', 'Ha ocurrido un error al guardar el suministro');
        }
        return responseMessage;
    }
 });

new ValidatedMethod({
    name: 'supply.delete',
    mixins: [MethodHooks],
    permissions: [Permissions.SUPPLIES.DELETE.VALUE],
    beforeHooks: [AuthGuard.checkPermission],  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
    afterHooks: [],
    validate({ idSupply }){
        try {
            check(idSupply, String);
        }catch (exception) {
            console.error('supply.delete', exception);
            throw new Meteor.Error('403', 'Ocurrio un error al eliminar el suministro');
        }
        // validar que no sea posible eliminar un suministro si hay un producto utilizandolo.
        // ToDo
        try{
            validateSupplyBusy(idSupply);
        }catch(exception ){
            throw new Meteor.Error('403','No es posible elimiar el suministro',
            'Hay al menos un almacen utilizando el suministro');
        }
        
    },
    run({ idSupply }){
        const responseMessage = new ResponseMessage();
        try {
            Supplies.remove(idSupply);
                responseMessage.create('Suministro eliminado exitosamente');
        }catch (exception) {
            console.error('supply.delete', exception);
            throw new Meteor.Error('500', 'Ocurrio un error al eliminar el suministro');
        }

        return responseMessage;
    }
});
