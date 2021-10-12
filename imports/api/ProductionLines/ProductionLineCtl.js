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
       // console.info("Entrando en guardar linea de produccion")
       // console.info('productionline', productionline);
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
                            description : Match.OneOf(String, null),
                            name : Match.OneOf(String, null),
                            _id : Match.OneOf(String, null)
                        },
                        configurations : [ 
                            {
                                _id : String,
                                name : String,
                                description : String,
                                instructions : String
                            }
                        ] 
                    }
                ]
            });
        }catch ( exception){
            console.error('productionline.save', exception);
            throw new Meteor.Error('500', 'Ocurrió un error al guardar el perfil');  
        }
        
        ProductionLinesServ.validateProductionLineName(productionline.name,productionline._id);
    
     
    },
    run(productionline) {
        
        const responseMessage= new ResponseMessage();
        if(productionline._id !==null){
            try{
                
                    // Aqui traer las estaciones anteriores y actualizar con Null
                   const pLine = ProductionLineRepository.findOne({"_id":productionline._id});
                    ProductionLinesServ.updateWorkStationWithProductionLine(
                        pLine.workstations,
                        {"_id": null,
                        "name":null,
                        "description": null
                        } 
                    );
                ProductionLineRepository.update(productionline._id,{
                    $set:{
                        name: productionline.name,
                        description: productionline.description,
                        workstations: productionline.workstations
                    }
                });
                // Actualizar las estaciones de trabajo asignadas
                ProductionLinesServ.updateWorkStationWithProductionLine(
                    productionline.workstations,{"_id": productionline._id,
                    "name":productionline.name,
                    "description": productionline.description
                } 
                );
                 // Actualizar la linea de produccion con la estacion de trabajo actualizada
                 ProductionLinesServ.updateProductionLineWithWorkstation(productionline._id)
                
                responseMessage.create('Se ha actualizado la linea de produccion');
            }catch (exception) {
                console.error('productionline.save', exception);
                throw new Meteor.Error('500', 'Error al actualizar la linea de produccion','Ocurrió un error al actualizar la linea de produccion');
            }
        }else{
           // console.log('productionline: ',productionline);
            try{
                const iDProductionLine=ProductionLineRepository.insert({
                    name: productionline.name,
                    description: productionline.description,
                    workstations: productionline.workstations
                });
                // Actualizar las estaciones de trabajo asignadas con el Id de la linea de produccion
                ProductionLinesServ.updateWorkStationWithProductionLine(
                    productionline.workstations,{"_id": iDProductionLine,
                    "name":productionline.name,
                    "description": productionline.description
                } 
                ); 
                // Actualizar la linea de produccion con la estacion de trabajo actualizada
                ProductionLinesServ.updateProductionLineWithWorkstation(iDProductionLine)
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
        ProductionLinesServ.validateNoEraseProductionLine(idProductionline);
        },
    run({ idProductionline }){
        const responseMessage = new ResponseMessage();
        try {
            // Liberar estaciones de trabajo
            const pLine = ProductionLineRepository.findOne({"_id":idProductionline});
            ProductionLinesServ.updateWorkStationWithProductionLine(
                        pLine.workstations,
                        {"_id": null,
                        "name":null,
                        "description": null
                        } 
                    );
            ProductionLineRepository.remove(idProductionline);
            responseMessage.create('Linea de produccion eliminada exitosamente');
        }catch (exception) {
            console.error('productionline.delete', exception);
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

new ValidatedMethod({
    name:'productionline.workstations.availables',
    mixins: [MethodHooks],
    permissions: [Permissions.PRODUCTIONLINES.LIST.VALUE],
    beforeHooks: [AuthGuard.checkPermission],
    validate() {
    },
    run() {
        const responseMessage = new ResponseMessage();
        try{
            
            const workstationsAvaiulables= WorkstationRepository.find({'productionline._id':null}).fetch();
            responseMessage.create('Estaciones de trabajo disponibles para la linea de produccion','Estaciones disponibles',workstationsAvaiulables);
        }catch(ex){
            console.log('productionline.workstations.availables: ', ex);
            throw new Meteor.Error('500','Ocurrió un error al obtener la lista de estaciones de trabajo disponibles para una linea de produccion');
        }

        return responseMessage;
    }

});
