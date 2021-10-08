import {Meteor} from "meteor/meteor";
import {WorkstationRepository} from './OperatingStation'
import {ProductionLineRepository} from '../ProductionLines/ProductionLine'

export default {

    validateWorkstationName(newWorkstationName,idWorkstation){
        const existsWorkstationList= WorkstationRepository.find({name:newWorkstationName}).fetch();
        // recorrer la lista y comparar que uno diferente de mi tenga el mismo nombre
        existsWorkstationList.filter(
            workstation=>{
                if (workstation.name==newWorkstationName && workstation._id!==idWorkstation){
                    throw new Meteor.Error('403', 'El nombre de la estacion de trabajo  ya esta siendo utilizado');
                }
            }
        );
    },
    validateWorkstationBusy(idWorkstation){
        const existsWorkstationNumber= ProductionLineRepository.find({'workstations._id':idWorkstation}).count();
        return existsWorkstationNumber;
    },
    validateWorkstationChangeProductionLine(workstation){
        // actualizar la Linea de produccion si es diferente de la actual
                // Validar que la linea nueva es diferente de la vieja.
                // Si es diferente hay que removerla de la linea de produccion vieja.
                const oldWorkstation = WorkstationRepository.findOne(workstation._id);
                
                if(oldWorkstation){
                    if(oldWorkstation.productionline._id !== workstation.productionline._id){
                        const oldProductionLine = ProductionLineRepository.findOne(oldWorkstation.productionline._id);
                        const oldProductionLineWorkstationsUpdated = oldProductionLine.workstations.filter(
                            ws => ws._id  !== workstation._id
                        );
                        ProductionLineRepository.update(oldProductionLine._id,{
                            $set: {
                             workstations: oldProductionLineWorkstationsUpdated
                            }
                        });
                    }

                }

    }
}