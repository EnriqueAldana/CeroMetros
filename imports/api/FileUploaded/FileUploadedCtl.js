import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../middlewares/AuthGuard";
import Permissions from "../../startup/server/Permissions";
import {UploadedFiles} from "./FileUploaded";
import FileUploadedServ from "./FileUploadedServ";
import {check, Match} from "meteor/check";
import Utilities from '../../startup/both/Utilities'


new ValidatedMethod({
    name:'uploadedFile.save',
     mixins:[MethodHooks],
     permissions: [Permissions.UPLOADEDFILES.CREATE.VALUE,Permissions.UPLOADEDFILES.UPDATE.VALUE],  
     beforeHooks: [AuthGuard.checkPermission],
    validate(docFile){
        try {
            console.log("Archivo a cargar ",docFile);
            check(docFile,{
                _id: Match.OneOf(String, null),
                name: String,
                dataBaseName:Match.OneOf(String, null),
                size: Match.OneOf(Match.Integer, String),
                lastModifiedDate: Match.OneOf(Date,String),
                storedDate: Match.OneOf(Date, null,String),
                storePath: Match.OneOf(String, null),
                group: String,
                type: String,
                data: Match.OneOf(String, null),
                annotations: Match.OneOf(String, null),
                extension: Match.OneOf(String, null),
                extensionWithDot: Match.OneOf(String, null),
                expireDate: String

            });

        }catch ( exception){
            console.error('uploadedFile.save', exception);
            throw new Meteor.Error('403', 'La informacion introducida no es valida');
        }
        // Validar que no haya compañias con el mismo nombre y BussinesID
        
    },
    run(docFile){
        const responseMessage = new ResponseMessage(); 
        try {
            if(docFile._id !== null){
                const expD = Utilities.dateTimeFrom_yyyy_MM_ddTo_UTC(docFile.expireDate)
                UploadedFiles.update(docFile._id,{
                    $set: {
                    annotations: docFile.annotations,
                    expireDate:expD
                    }
                });
                responseMessage.create('Se actualizó el archivo exitosamente');
            }else{
                // Guardar en disco el archivo de acuerdo a : process.env.FILES_LOCAL_PATH

                let expDate = Utilities.dateTimeFrom_yyyy_MM_ddTo_UTC(docFile.expireDate)
                let insertKey=''
                insertKey=UploadedFiles.insert({
                    name: docFile.name,
                    dataBaseName: docFile.dataBaseName,
                    size: docFile.size,
                    lastModifiedDate: docFile.lastModifiedDate,
                    storedDate: Utilities.getDateTimeNowUTC(),
                    storePath: process.env.FILES_LOCAL_PATH,
                    group: docFile.group,
                    type: docFile.type,
                    annotations: docFile.annotations,
                    extension:require('path').extname(docFile.name).slice(1),
                    extensionWithDot: require('path').extname(docFile.name),
                    expireDate: expDate
                });
                if(insertKey.length>0){
                    docFile.dataBaseName=insertKey
                    UploadedFiles.update(insertKey,{
                        $set: {
                        dataBaseName: insertKey
                        }
                    });
                }
                FileUploadedServ.saveFileOnLocalFS(docFile)
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
            UploadedFiles.remove(idUploadedFile);
                responseMessage.create('Archivo eliminado exitosamente');
        }catch (exception) {
            console.error('uploadedFile.delete', exception);
            throw new Meteor.Error('500', 'Ocurrio un error al eliminar el archivo');
        }

        return responseMessage;
    }
});

new ValidatedMethod({
    name: 'uploadedFile.get',
    mixins: [MethodHooks],
    beforeHooks: [AuthGuard.isUserLogged],
    afterHooks: [],
    validate({ idUploadedFile }){
        try {
            console.log("idUploadedFile : ",idUploadedFile)
            check(idUploadedFile, String);
        }catch (exception) {
            console.error('uploadedFile.get', exception);
            throw new Meteor.Error('403', 'Ocurrio un error al obtener el archivo cargado');
        }
        // validar que no sea posible eliminar una empresa si hay un usuario utilizandolo.
       
    },
    run({ idUploadedFile }){
        const responseMessage = new ResponseMessage();
        try {
            const fileMetaData= UploadedFiles.findOne({"_id":idUploadedFile})
            console.info("MetaDatos del archivo",fileMetaData)
            const fileData= FileUploadedServ.getFileOnLocalFS(fileMetaData)
            console.info("Datos del archivo",fileData)
            responseMessage.create('Archivo obtenido exitosamente','se descargó archivo'+fileMetaData.name, fileData);
        }catch (exception) {
            console.error('uploadedFile.get', exception);
            throw new Meteor.Error('500', 'Ocurrio un error al obtener el archivo');
        }

        return responseMessage;
    }
});