import {check, Match} from "meteor/check";
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../middlewares/AuthGuard";
import Permissions from "../../startup/server/Permissions";
import {WorkstationRepository} from './OperatingStation'
import WorkStationServ from "./OperatingStationServ";
import {WorkstationSetupRepository} from '../WorkStationSetup/WorkstationSetup';

new ValidatedMethod({
    name:'operatingstation.save',
     mixins:[MethodHooks],
     permissions: [Permissions.OPERATINGSTATION.CREATE.VALUE],  
     beforeHooks: [AuthGuard.checkPermission],
    validate(operatingstation){
        try {
            console.info('operatingstation' , workstation);
            check(operatingstation,{
                _id: Match.OneOf(String, null),
                name: String,
                name_full: String,
                location: String,
                productionline: {
                    _id:Match.OneOf(String, null),
                    name: Match.OneOf(String, null),
                    description:Match.OneOf(String, null)
                },
                configurations: [ {
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

