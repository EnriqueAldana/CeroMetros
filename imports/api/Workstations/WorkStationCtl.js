import {check, Match} from "meteor/check";
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../middlewares/AuthGuard";
import Permissions from "../../startup/server/Permissions";
import {WorkstationRepository} from './WorkStation'
import WorkStationServ from "./WorkStationServ";

new ValidatedMethod({
    name:'workstation.save',
     mixins:[MethodHooks],
     permissions: [Permissions.WORKSTATIONS.CREATE.VALUE,Permissions.WORKSTATIONS.UPDATE.VALUE],  
     beforeHooks: [AuthGuard.checkPermission],
    validate(workstation){
        try {
            console.info('workstation ' , workstation);
            check(workstation,{
                _id: Match.OneOf(String, null),
                name: String,
                name_full: String,
                location: String,
                productionline: {
                    _id:Match.OneOf(String, null),
                    name: Match.OneOf(String, null),
                    description:Match.OneOf(String, null)
                }
            });

        }catch ( exception){
            console.error('workstation.save', exception);
            throw new Meteor.Error('403', 'La informacion introducida no es valida');
        }
        // Validar que no haya estaciones de trabajo con el mismo nombre   
        
        WorkStationServ.validateWorkstationName(workstation.name,workstation._id);
    },
    run(workstation){
        const responseMessage = new ResponseMessage(); 
        try {
            if(workstation._id !== null){
                WorkStationServ.validateWorkstationChangeProductionLine(workstation);
                WorkstationRepository.update(workstation._id,{
                    $set: {
                    name: workstation.name,
                    name_full: workstation.name_full,
                    location: workstation.location,
                    productionline: workstation.productionline
                    }
                });
                

                responseMessage.create('Se actualiz?? la estacion de trabajo exitosamente');
            }else{
                WorkstationRepository.insert({
                    name: workstation.name,
                    name_full: workstation.name_full,
                    location: workstation.location,
                    productionline: workstation.productionline
                });

                // ToDo actualizar la Linea de produccion

                responseMessage.create('Se insert?? la estacion de trabajo exitosamente');
            }
        }catch ( exception){
            console.error('workstation.save', exception);
            throw new Meteor.Error('500', 'Ha ocurrido un error al guardar la estacion de trabajo');
        }
        return responseMessage;
    }
 });

new ValidatedMethod({
    name: 'workstation.delete',
    mixins: [MethodHooks],
    permissions: [Permissions.WORKSTATIONS.DELETE.VALUE],
    beforeHooks: [AuthGuard.checkPermission],  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
    afterHooks: [],
    validate({ idWorkstation }){
        try {
            check(idWorkstation , String);
        }catch (exception) {
            console.error('workstation.delete', exception);
            throw new Meteor.Error('403', 'Ocurrio un error al eliminar la estacion de trabajo');
        }
        // validar que no sea posible eliminar una estacion si hay una linea utilizandolo.
        const workstationWithProductionLine = WorkStationServ.validateWorkstationBusy(idWorkstation);
        if (workstationWithProductionLine > 0){
            throw new Meteor.Error('403','No es posible elimiar la estacion de trabajo',
                'Hay al menos una linea de produccion utilizandola');
        }
    },
    run({ idWorkstation }){
        const responseMessage = new ResponseMessage();
        try {
            WorkstationRepository.remove(idWorkstation);
                responseMessage.create('Estacion de trabajo eliminada exitosamente');
        }catch (exception) {
            console.error('workstation.delete', exception);
            throw new Meteor.Error('500', 'Ocurrio un error al eliminar la estacion de trabajo');
        }

        return responseMessage;
    }
});
