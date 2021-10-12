import {check, Match} from "meteor/check";
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../middlewares/AuthGuard";
import Permissions from "../../startup/server/Permissions";
import {WorkstationRepository} from './WorkStation'
import WorkStationServ from "./WorkStationServ";
import {WorkstationSetupRepository} from '../WorkStationSetup/WorkstationSetup';

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
                },
                configurations: [
                     {
                    _id: String,
                    name: String,
                    description: String,
                    instructions: String
                    } 
                ]

            });

        }catch ( exception){
            console.error('workstation.save', exception);
            throw new Meteor.Error('403', 'La informacion introducida no es valida');
        }

        // Validar que haya al menos una configuracion
        try {
            const checkFn = Match.Where(function(x) {
                if(x.length > 0)
                    return true
                return false;
            });
            check(workstation.configurations,checkFn)
        }catch ( exception){
            console.error('workstation.save', exception);
            throw new Meteor.Error('500', 'Es necesaria una configuración para la estación al menos');
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
                    productionline: workstation.productionline,
                    configurations: workstation.configurations
                    }
                });
                responseMessage.create('Se actualizó la estacion de trabajo exitosamente');
            }else{
                WorkstationRepository.insert({
                    name: workstation.name,
                    name_full: workstation.name_full,
                    location: workstation.location,
                    productionline: workstation.productionline,
                    configurations: workstation.configurations
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

new ValidatedMethod({
    name: 'workstation.configurations.list',
    mixins: [MethodHooks],
    permissions: [Permissions.WORKSTATIONSETUP.LIST.VALUE],
    beforeHooks: [AuthGuard.checkPermission],  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
    afterHooks: [],
    validate() {
    },
    run() {
        console.log('workstation.configurations.list');
        const responseMessage= new ResponseMessage();
            try{
            const workstationConfigurations = WorkstationSetupRepository.find().fetch();
                responseMessage.create('Se ha obtenido la lista de configuraciones para estaciones de trabajo',null,workstationConfigurations);
            }catch (exception) {
                console.error('productionline.save', exception);
                throw new Meteor.Error('500', 'Ocurrió un error al obtener la lista de configuraciones para estaciones de trabajo');
            }
        
        return responseMessage;
    }
});
new ValidatedMethod({
    name: 'workstation.configurationsExcludingWS',
    mixins: [MethodHooks],
    permissions: [Permissions.WORKSTATIONSETUP.LIST.VALUE],
    beforeHooks: [AuthGuard.checkPermission],  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
    afterHooks: [],
     validate({ iDWorkStation }) {
         
        try {
            check(iDWorkStation , String);
        }catch (exception) {
            console.error('workstation.configurationsExcludingWS', exception);
            throw new Meteor.Error('403', 'Ocurrio un error al obtener las configuraciones excluidas por Estacion de trabajo');
        }
    },
    run({iDWorkStation}) {
        const responseMessage= new ResponseMessage();
            try{
            const workstationConfig = WorkstationRepository.findOne({_id:iDWorkStation},{fields:{configurations:1}});
            const workstationConfigurations = workstationConfig.configurations
            const workstationConfigurationsAll = WorkstationSetupRepository.find().fetch();
            const filteredWorkstationConfigurations =  workstationConfigurationsAll.filter(configuration=>{
                let res = workstationConfigurations.filter(wsConfig=>wsConfig._id===configuration._id);
                return res.length>0 ? false: true;
            });
            responseMessage.create('Se ha obtenido la lista de configuraciones excluidas para estaciones de trabajo',null,filteredWorkstationConfigurations);
            }catch (exception) {
                console.error('workstation.configurationsExcludingWS', exception);
                throw new Meteor.Error('500', 'Ocurrió un error al obtener la lista de configuraciones excluidas para estaciones de trabajo');
            }
        
        return responseMessage;
    }
});
new ValidatedMethod({
    name: 'workstation.configurations.byWS',
    mixins: [MethodHooks],
    permissions: [Permissions.WORKSTATIONSETUP.LIST.VALUE],
    beforeHooks: [AuthGuard.checkPermission],  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
    afterHooks: [],
    validate({iDWorkStation}) {
        try {
            check(iDWorkStation , String);
        }catch (exception) {
            console.error('workstation.configurations.byWS', exception);
            throw new Meteor.Error('403', 'Ocurrio un error al obtener las configuraciones  por Estacion de trabajo');
        }
    },
    run({iDWorkStation}) {

        const responseMessage= new ResponseMessage();
            try{
            
                const workstationConfigurations = WorkstationRepository.findOne({_id:iDWorkStation},{fields:{configurations:1}});
                 responseMessage.create('Se ha obtenido la lista de configuraciones para estaciones de trabajo',null,workstationConfigurations.configurations);
            }catch (exception) {
                console.error('workstation.configurations.byWS', exception);
                throw new Meteor.Error('500', 'Ocurrió un error al obtener la lista de configuraciones para estaciones de trabajo');
            }
        
        return responseMessage;
    }
});