import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../middlewares/AuthGuard";
import Permissions from "../../startup/server/Permissions";
import {FileUploaded} from "./FileUploaded";
import FileUploadedServ from "./FileUploadedServ";
import {check, Match} from "meteor/check";

new ValidatedMethod({
    name:'uploadedFile.save',
     mixins:[MethodHooks],
     permissions: [Permissions.UPLOADEDFILES.CREATE.VALUE,Permissions.UPLOADEDFILES.UPDATE.VALUE],  
     beforeHooks: [AuthGuard.checkPermission],
    validate({fileDoc}){
        try {
            console.log("Archivo a cargar ",fileDoc);
            check();

        }catch ( exception){
            console.error('uploadedFile.save', exception);
            throw new Meteor.Error('403', 'La informacion introducida no es valida');
        }
        // Validar que no haya compañias con el mismo nombre y BussinesID
        
    },
    run({fileDoc}){
        const responseMessage = new ResponseMessage(); 
        try {
            if(fileDoc._id !== null){
                
                responseMessage.create('Se actualizó la empresa exitosamente');
            }else{
                FileUploaded.insert({
                    fileDoc
                });
                responseMessage.create('Se cargó el archivo exitosamente');
            }
        }catch ( exception){
            console.error('uploadedFile.save', exception);
            throw new Meteor.Error('403', 'Ha ocurrido un error al cargar el archivo');
        }
        return responseMessage;
    }
 });

new ValidatedMethod({
    name: 'uploadedFile.delete',
    mixins: [MethodHooks],
    permissions: [Permissions.UPLOADEDFILES.DELETE.VALUE],
    beforeHooks: [AuthGuard.checkPermission],  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
    afterHooks: [],
    validate({ idUploadedFile }){
        try {
            check(idUploadedFile, String);
        }catch (exception) {
            console.error('uploadedFile.delete', exception);
            throw new Meteor.Error('403', 'Ocurrio un error al eliminar el archivo cargado');
        }
        // validar que no sea posible eliminar una empresa si hay un usuario utilizandolo.
       
    },
    run({ idUploadedFile }){
        const responseMessage = new ResponseMessage();
        try {
            FileUploaded.remove(idUploadedFile);
                responseMessage.create('Archivo eliminado exitosamente');
        }catch (exception) {
            console.error('uploadedFile.delete', exception);
            throw new Meteor.Error('500', 'Ocurrio un error al eliminar el archivo');
        }

        return responseMessage;
    }
});
