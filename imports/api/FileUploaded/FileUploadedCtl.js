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
    beforeHooks: [AuthGuard.isUserLogged],
    validate(docFile){
        try {
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
                    const isUpdated=UploadedFiles.update(insertKey,{
                        $set: {
                        dataBaseName: insertKey
                        }
                    });
                   // console.info("isUpdated "+ insertKey + " num "+isUpdated)
                }
                if(!FileUploadedServ.saveFileOnLocalFS(docFile)){
                    const isDeleted=UploadedFiles.remove(insertKey)
                    //console.info("Se borro el archivo?:" +insertKey + " num"+isDeleted)
                    throw new Meteor.Error('403', 'Ha ocurrido un error al guardar el archivo en el sistema: ');
                 }
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
    beforeHooks: [AuthGuard.isUserLogged],
    afterHooks: [],
    validate({ idReport }){
        try {
            check(idReport, String);
        }catch (exception) {
            console.error('uploadedFile.delete', exception);
            throw new Meteor.Error('403', 'Ocurrio un error al eliminar el archivo cargado');
        }
        // validar que no sea posible eliminar una empresa si hay un usuario utilizandolo.
       
    },
    run({ idReport }){
        const responseMessage = new ResponseMessage();
        console.log("id de archivo a borrar",idReport)
        try {
            // Traer el registro de la base de datos
            const docFile=UploadedFiles.findOne(idReport)
            const isDeleted=FileUploadedServ.removeFileOnLocalFS(docFile)
            if(isDeleted){
                UploadedFiles.remove(idReport);
            }
                responseMessage.create('Archivo eliminado exitosamente');
        }catch (exception) {
            console.error('uploadedFile.delete', exception);
            throw new Meteor.Error('500', 'Ocurrio un error al eliminar el archivo');
        }

        return responseMessage;
    }
});