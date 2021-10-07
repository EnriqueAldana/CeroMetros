import {check, Match} from "meteor/check";
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../middlewares/AuthGuard";
import Permissions from "../../startup/server/Permissions";
import WorkstationSetupServ from "./WorkstationSetupServ";
import {WorkstationSetupRepository} from "./WorkstationSetup";
      
new ValidatedMethod({
    name:'workstationSetup.save',
     mixins:[MethodHooks],
     permissions: [Permissions.WORKSTATIONSETUP.CREATE.VALUE,Permissions.WORKSTATIONSETUP.UPDATE.VALUE],  
     beforeHooks: [AuthGuard.checkPermission],
    validate(workstationsetup){
        try {
            
            check(workstationsetup,{
                _id: Match.OneOf(String, null),
                name: String,
                description: String,
                instructions: String
            });

        }catch ( exception){
            console.error('workstationSetup.save', exception);
            throw new Meteor.Error('403', 'La informacion introducida no es valida');
        }
        // Validar que no haya unidades de medida con el mismo nombre o simbolo
        WorkstationSetupServ.validateWorkstationSetup(workstationsetup.name,workstationsetup._id);
    },
    run(workstationsetup){
        const responseMessage = new ResponseMessage(); 
        
            if(workstationsetup._id !== null){
                try{
                    WorkstationSetupRepository.update(workstationsetup._id,{
                        $set: {
                        name: workstationsetup.name,
                        description: workstationsetup.description,
                        instructions: workstationsetup.instructions
                        }
                    });
                    responseMessage.create('Se actualizó la configuracion de la estacion de trabajo exitosamente');
                }catch(exception){
                    console.error('workstationSetup.save', exception);
                    throw new Meteor.Error('500', 'Ha ocurrido un error al actualizar la configuracion de la estacion de trabajo');
                }
                
            }else{
                try{
                    WorkstationSetupRepository.insert({
                        name: workstationsetup.name,
                        description: workstationsetup.description,
                        instructions: workstationsetup.instructions
                    });
                    responseMessage.create('Se insertó la configuracion de la estacion de trabajo exitosamente');
                }catch (exception){
                    console.error('workstationSetup.save', exception);
                    throw new Meteor.Error('500', 'Ha ocurrido un error al guardar la configuracion de la estacion de trabajo');
                }
             
            }
      
        return responseMessage;
    }
 });

new ValidatedMethod({
    name: 'workstationSetup.delete',
    mixins: [MethodHooks],
    permissions: [Permissions.WORKSTATIONSETUP.DELETE.VALUE],
    beforeHooks: [AuthGuard.checkPermission],  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
    afterHooks: [],
    validate({ idWorkstationsetup }){
        try {
            check(idWorkstationsetup , String);
        }catch (exception) {
            console.error('workstationSetup.delete', exception);
            throw new Meteor.Error('403', 'Ocurrio un error al eliminar la configuracion de la estacion de trabajo');
        }
        // validar que no sea posible eliminar una unidad de medida si hay un producto utilizandolo.
        WorkstationSetupServ.validateWorkstationSetupBusy(idWorkstationsetup);
        
    },
    run({ idWorkstationsetup }){
        const responseMessage = new ResponseMessage();
        try {
            WorkstationSetupRepository.remove(idWorkstationsetup);
                responseMessage.create('Configuración de la estación de trabajo eliminada exitosamente');
        }catch (exception) {
            console.error('workstationSetup.delete', exception);
            throw new Meteor.Error('500', 'Ocurrio un error al eliminar la configuración de la estación de trabajo');
        }

        return responseMessage;
    }
});
