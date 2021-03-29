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
            check(workstation,{
                _id: Match.OneOf(String, null),
                name: String,
                name_full: String,
                location: String,
            });

        }catch ( exception){
            console.error('workstation.save', exception);
            throw new Meteor.Error('403', 'La informacion introducida no es valida');
        }
        // Validar que no haya estaciones de trabajo con el mismo nombre   
        WorkStationServ.validateWorkstationName(workstation.name);
    },
    run(workstation){
        const responseMessage = new ResponseMessage(); 
        try {
            if(workstation._id !== null){
                WorkstationRepository.update(workstation._id,{
                    $set: {
                    name: workstation.name,
                    name_full: workstation.name_full,
                    location: workstation.location
                    }
                });
                responseMessage.create('Se actualizó la estacion de trabajo exitosamente');
            }else{
                WorkstationRepository.insert({
                    name: workstation.name,
                    name_full: workstation.name_full,
                    location: workstation.location
                });
                responseMessage.create('Se insertó la estacion de trabajo exitosamente');
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
        // TODO
        //const workstationWithProductionLine = CompanyServ.validateWorkstationName(idCompany);
        const workstationWithProductionLine =0;
        if (workstationWithProductionLine.length > 0){
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
            console.error('profile.delete', exception);
            throw new Meteor.Error('500', 'Ocurrio un error al eliminar la estacion de trabajo');
        }

        return responseMessage;
    }
});
