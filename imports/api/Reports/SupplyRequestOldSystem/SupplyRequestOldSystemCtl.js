import { check, Match } from "meteor/check";
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ResponseMessage } from "../../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../../middlewares/AuthGuard";
import Permissions from "../../../startup/server/Permissions";
import FileUploadedServ from '../../FileUploaded/FileUploadedServ'
import {FileUploaded} from '../../FileUploaded/FileUploaded'
new ValidatedMethod({
    name: 'report.supply.request.old.system.delete',
    mixins: [MethodHooks],
    permissions: [Permissions.REPORTS.SUPPLYREQUESTSOLDSYSTEM_DELETE.VALUE],
    beforeHooks: [AuthGuard.checkPermission],  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
    afterHooks: [],
    validate({ idReport }){
        try {
            check(idReport, String);
        }catch (exception) {
            console.error('report.supply.request.old.system.delete', exception);
            throw new Meteor.Error('403', 'Ocurrio un error al eliminar el archivo del reporte de solicitudes de suministro');
        }

    },
    run({ idReport }){
        const responseMessage = new ResponseMessage();
        
            try{
                console.log("Archivo de reporte de sol de sum  por borrar", idReport);
                const fileMetaData= FileUploaded.findOne({"_id":idReport})
                console.info("Datos del archivo por borrar ",fileMetaData)
                let deletedFile=false
                if(fileMetaData){
                    deletedFile=FileUploadedServ.removeFileOnLocalFS(fileMetaData)
                }else{
                    throw new Meteor.Error('403','No es posible eliminar el archivo del reporte de solicitudes de suministro',
                        'No existe registro del archivo en el sistema'); 
                }
                if(deletedFile){
                    FileUploaded.remove(idUploadedFile);
                }else{
                    throw new Meteor.Error('403','No es posible eliminar el archivo del reporte de solicitudes de suministro',
                        'No existe el archivo físico en el sistema');
                }
                // aqui traer el registro de la base de datos
                // borrar el archivo, si Ok, borrar el registro
                responseMessage.create('Archivo y registro de solicitudes de suministro eliminado exitosamente');
            }catch(exception ){
                throw new Meteor.Error('403','No es posible eliminar el archivo del reporte de solicitudes de suministro',
                'No existe el archivo en el sistema');
            }
               
        

        return responseMessage;
    }
});
