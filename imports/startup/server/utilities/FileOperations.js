import mimetypes from 'mimetypes';
import Utilities from "./Utilities";
import { BASE_URL_STORAGE , firebaseAdminsStorage} from "../services/FirebaseAdmin";
import {ResponseMessage} from "./ResponseMesssage";

export default {
    async saveFileFromBufferToGoogleStorage(fileBuffer, name, path ,mimeType) {
        const responseMessage = new ResponseMessage();
        const versionFile= Utilities.generateNumberToken(10,99);
        const filename = `${ name }${ versionFile }.${ mimetypes.detectExtension(mimeType) }`;
        const file = firebaseAdminsStorage.file(`${ path}/${ filename}`);
        const fileUrl = `${ BASE_URL_STORAGE }/${ firebaseAdminsStorage.name }/${ path }/${ filename }`;
        try{
                await file.save(fileBuffer,{
                    metadata: {
                        contentType: mimeType
                    },
                    public: true
                });
                responseMessage.create('File uploaded',null,{success: true, fileUrl});

        }catch(exception){
            console.error('Error uploading file to Google Storage: ', exception);
            responseMessage.create('Error uploading file to Google Storage',null,{success: false});
        }
        return responseMessage;
    },
    async saveFileFromBase64ToGoogleStorage(base64file,name,path){
        const mimeType = base64file.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];
        const base64EncodedImageString= base64file.split(';base64,').pop();
        const fileBuffer= Buffer.from(base64EncodedImageString,'base64');
        return await this.saveFileFromBufferToGoogleStorage(fileBuffer,name,path,mimeType);
    },
    async deleteFileFromGoogleStoreIfExists(fileLocation){
        const file = firebaseAdminsStorage.file(fileLocation);
        try{
            const existsFile = await file.exists();
            if(existsFile[0]){
                    await file.delete();
            }
        }catch(exception){
            console.error('Ha habido un error al borrar archivo de Google Store', exception);
        }

    },
    async deleteFilesOfFolderFromGoogleStorage(userFolder) {
        try {
            await firebaseAdminsStorage.deleteFiles({prefix: userFolder + '/'});
        } catch (exception) {
            console.error('Error deleting files from Google Storage');
        }
    }
}
