import {Meteor} from "meteor/meteor";
import {WorkstationRepository} from './WorkStation'

export default {

    validateWorkstationName(newWorkstationName){
        const existsWorkstation= WorkstationRepository.findOne({name:newWorkstationName});
        if(existsWorkstation){ // es est de trabajo nuevo pero el name de est de trabajo  ya existe.
            throw new Meteor.Error('403', 'El nuevo nombre de la estacion de trabajo  ya esta siendo utilizado');
         } 
    }
}