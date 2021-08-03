import {check, Match} from "meteor/check";
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../middlewares/AuthGuard";
import Permissions from "../../startup/server/Permissions";
import UnitOfMeasurementServ from "./UnitOfMeasurementServ";
import {UnitOfMeasurementRepository} from "./UnitOfMeasurement";
      
new ValidatedMethod({
    name:'unitofmeasurement.save',
     mixins:[MethodHooks],
     permissions: [Permissions.UNITOFMEASUREMENT.CREATE.VALUE,Permissions.UNITOFMEASUREMENT.UPDATE.VALUE],  
     beforeHooks: [AuthGuard.checkPermission],
    validate(unitofmeasurement){
        try {
            
            check(unitofmeasurement,{
                _id: Match.OneOf(String, null),
                name: String,
                symbol: String
            });

        }catch ( exception){
            console.error('unitofmeasurement.save', exception);
            throw new Meteor.Error('403', 'La informacion introducida no es valida');
        }
        // Validar que no haya unidades de medida con el mismo nombre o simbolo
        UnitOfMeasurementServ.validateUnitOfMeasurement(unitofmeasurement.name,unitofmeasurement.symbol,unitofmeasurement._id);
    },
    run(unitofmeasurement){
        const responseMessage = new ResponseMessage(); 
        
            if(unitofmeasurement._id !== null){
                try{
                    UnitOfMeasurementRepository.update(unitofmeasurement._id,{
                        $set: {
                        name: unitofmeasurement.name,
                        symbol: unitofmeasurement.symbol
                        }
                    });
                    responseMessage.create('Se actualizó la unidad de medida exitosamente');
                }catch(exception){
                    console.error('unitofmeasurement.save', exception);
                    throw new Meteor.Error('500', 'Ha ocurrido un error al actualizar la unidad de medida');
                }
                
            }else{
                try{
                    UnitOfMeasurementRepository.insert({
                        name: unitofmeasurement.name,
                        symbol: unitofmeasurement.symbol
                    });
                    responseMessage.create('Se insertó la unidad de medida exitosamente');
                }catch (exception){
                    console.error('unitofmeasurement.save', exception);
                    throw new Meteor.Error('500', 'Ha ocurrido un error al guardar la unidad de medida');
                }
             
            }
      
        return responseMessage;
    }
 });

new ValidatedMethod({
    name: 'unitofmeasurement.delete',
    mixins: [MethodHooks],
    permissions: [Permissions.UNITOFMEASUREMENT.DELETE.VALUE],
    beforeHooks: [AuthGuard.checkPermission],  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
    afterHooks: [],
    validate({ idUnitofmeasurement }){
        try {
            check(idUnitofmeasurement , String);
        }catch (exception) {
            console.error('unitofmeasurement.delete', exception);
            throw new Meteor.Error('403', 'Ocurrio un error al eliminar la unidad de medida');
        }
        // validar que no sea posible eliminar una unidad de medida si hay un producto utilizandolo.
        UnitOfMeasurementServ.validateUnitOfMeasurementBusy(idUnitofmeasurement);
        
    },
    run({ idUnitofmeasurement }){
        const responseMessage = new ResponseMessage();
        try {
            UnitOfMeasurementRepository.remove(idUnitofmeasurement);
                responseMessage.create('Unidad de medida eliminada exitosamente');
        }catch (exception) {
            console.error('unitofmeasurement.delete', exception);
            throw new Meteor.Error('500', 'Ocurrio un error al eliminar la unidad de medida');
        }

        return responseMessage;
    }
});
