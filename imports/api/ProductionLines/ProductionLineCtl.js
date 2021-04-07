import {check, Match} from "meteor/check";
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";
import Permissions from "../../startup/server/Permissions";
import AuthGuard from "../../middlewares/AuthGuard";
import {ProductionLineRepository} from "./ProductionLine";
import ProductionLinesServ from "./ProductionLinesServ";
import {WorkstationRepository} from '../Workstations/WorkStation'

new ValidatedMethod({
    name: 'productionline.save',
    mixins: [MethodHooks],
    permissions: [Permissions.PRODUCTIONLINES.CREATE.VALUE,Permissions.PRODUCTIONLINES.UPDATE.VALUE],
    beforeHooks: [AuthGuard.checkPermission],  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
    afterHooks: [],
    validate(productionline) {
        console.info('productionline', productionline);
        try {
            // Valida que la estructura del objeto user este conforme a la definicion.
            check(productionline, {
                _id: Match.OneOf(String, null),
                name: String,
                description: String,
                workstations: [
                    {
                        _id: Match.OneOf(String, null),
                        name: String,
                        name_full: String,
                        location: String,
                        productionline: {
                            description : String,
                            name : String,
                            _id : String
                        }
                    }
                ]
            });
        } catch (exception) {
            console.error('productionline.save', exception);
            throw new Meteor.Error('403', 'La informacion introducida no es válida.');
        }
        ProductionLinesServ.validateProductionLineName(productionline.name,productionline._id);
    
     
    },
    run(productionline) {
        console.log('productionline.save');
        const responseMessage= new ResponseMessage();
        if(productionline._id !==null){
            try{
                ProductionLineRepository.update(productionline._id,{
                    $set:{
                        name: productionline.name,
                        description: productionline.description,
                        workstations: productionline.workstations
                    }
                });

                console.log('Se ha actualizado la linea de produccion');
                responseMessage.create('Se ha actualizado la linea de produccion');
            }catch (exception) {
                console.error('productionline.save', exception);
                throw new Meteor.Error('500', 'Ocurrió un error al actualizar la linea de produccion');
            }
        }else{
            console.log('productionline: ',productionline);
            try{
                ProductionLineRepository.insert({
                    name: productionline.name,
                    description: productionline.description,
                    workstations: productionline.workstations
                });
                console.log('Se ha guardado la linea de produccion');
                responseMessage.create('Se ha guardado la linea de produccion');
            }catch (exception) {
                console.error('productionline.save', exception);
                throw new Meteor.Error('500', 'Ocurrió un error al guardar la linea de produccion');
            }
        }
        return responseMessage;
    }
});

new ValidatedMethod({
    name: 'productionline.list',
    mixins: [MethodHooks],
    permissions: [Permissions.PRODUCTIONLINES.LIST.VALUE],
    beforeHooks: [AuthGuard.checkPermission],  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
    afterHooks: [],
    validate() {
    },
    run() {
        console.log('productionline.list');
        const responseMessage= new ResponseMessage();
            try{
            const productionlines = ProductionLineRepository.find().fetch();
                responseMessage.create('Se ha obtenido la lista de lineas de produccion',null,productionlines);
            }catch (exception) {
                console.error('productionline.save', exception);
                throw new Meteor.Error('500', 'Ocurrió un error al obtener las linea de produccion');
            }
        
        return responseMessage;
    }
});

new ValidatedMethod({
    name: 'productionline.delete',
    mixins: [MethodHooks],
    permissions: [Permissions.PRODUCTIONLINES.DELETE.VALUE],
    beforeHooks: [AuthGuard.checkPermission],  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
    afterHooks: [],
    validate({ idProductionline }){
        try {
            check(idProductionline, String);
        }catch (exception) {
            console.error('productionline.delete', exception);
            throw new Meteor.Error('403', 'Ocurrio un error al eliminar la linea de produccion');
        }
        // validar que no sea posible eliminar una linea de produccion si hay una orden de produccion ACTIVA utilizandolo.
        
    },
    run({ idProductionline }){
        const responseMessage = new ResponseMessage();
        try {
            ProductionLineRepository.remove(idProductionline);
            responseMessage.create('Linea de produccion eliminada exitosamente');
        }catch (exception) {
            console.error('profile.delete', exception);
            throw new Meteor.Error('500', 'Ocurrio un error al eliminar la linea de produccion');
        }
        return responseMessage;
    }
});

new ValidatedMethod({
    name:'productionline.workstations.availables.to.include',
    mixins: [MethodHooks],
    permissions: [Permissions.PRODUCTIONLINES.LIST.VALUE],
    beforeHooks: [AuthGuard.checkPermission],
    validate(idProductionLine) {
            try{
                console.info('idProductionLine',idProductionLine);
                check('idProductionLine',String);
            }catch (exception) {
                    console.error('productionline.workstations', exception);
                    throw new Meteor.Error('403','La informacion proporcionada no es correcta');
            }
    },
    run(idProductionLine) {
        const responseMessage = new ResponseMessage();
        try{
            let workstationsAssigned= [];
            let workstationsIncluded= [];
            const productionline= ProductionLineRepository.findOne({'_id':idProductionLine});
            if(productionline){
                workstationsAssigned=  WorkstationRepository.find({'productionline._id':idProductionLine}).fetch();
                workstationsIncluded=  WorkstationRepository.find({'_id': {$in: productionline.workstations.map(workstation => workstation._id)}}).fetch();
            }
            let workstationsAvailablesToInclude=[];
            var found = false;
            for(var i = 0; i < workstationsAssigned.length; i++) {
                for(var j = 0; j < workstationsIncluded.length; j++){
                    if (workstationsAssigned[i]._id == workstationsIncluded[j]._id){
                        found =true;
                        break;
                    }   
                }
                if(!found){
                    workstationsAvailablesToInclude.push(workstationsAssigned[i]);
                }
                found = false;
            }
            
           // console.info('workstationsAssigned',workstationsAssigned);
           // console.info('workstationsIncluded',workstationsIncluded);
           //  console.info('workstationsAvailablesToInclude', workstationsAvailablesToInclude);
            
            // El tercer parametro equivaldra al objeto data en el response
            responseMessage.create('Estaciones de trabajo asociadas a la linea de produccion disponibles para incluir','Estaciones disponibles para incluir en la linea de prod',workstationsAvailablesToInclude);
        }catch(ex){
            console.log('workstations.listByIdProductionLine: ', ex);
            throw new Meteor.Error('500','Ocurrió un error al obtener la lista de estaciones de trabajo asociadas a una linea de produccion disponibles para incluir');
        }

        return responseMessage;
    }

});

/*
* Aqui devolver las estaciones de trabajo que esten
* incluidas en la linea
*/
new ValidatedMethod({
    name:'productionline.workstations.included',
    mixins: [MethodHooks],
    permissions: [Permissions.PRODUCTIONLINES.LIST.VALUE],
    beforeHooks: [AuthGuard.checkPermission],
    validate(idProductionLine) {
    },
    run(idProductionLine) {
        const responseMessage = new ResponseMessage();
        try{
            let workstationsIncluded=[];
            const productionline= ProductionLineRepository.findOne({'_id':idProductionLine});

            if(productionline){
                //db.getCollection('workstations').find({'_id':{$in:['gMdEx5QjaGsxwekwY', 'P2CB6iverfv7E8eGp']}})
                workstationsIncluded= productionline.workstations;
               //workstationsIncluded= WorkstationRepository.find({'_id': {$in: productionline.workstations }  }).fetch();
            }
           
            // El tercer parametro equivaldra al objeto data en el response
        
            responseMessage.create('Estaciones de trabajo incluidas a la linea de produccion','Estaciones incluidas en la linea de prod',workstationsIncluded);
        }catch(ex){
            console.log('productionline.workstations.included: ', ex);
            throw new Meteor.Error('500','Ocurrió un error al obtener la lista de estaciones de trabajo incluidas a una linea de produccion');
        }

        return responseMessage;
    }

});