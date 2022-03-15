
import { Meteor } from "meteor/meteor";
import { Base64 } from 'meteor/ostrio:base64';
import Utilities from "../../startup/both/Utilities"
/*
Docuemntacion 
https://nodejs.dev/learn/writing-files-with-nodejs
Banderas para el archivo
r+ open the file for reading and writing
w+ open the file for reading and writing, positioning the stream at the beginning of the file. The file is created if it does not exist
a open the file for writing, positioning the stream at the end of the file. The file is created if it does not exist
a+ open the file for reading and writing, positioning the stream at the end of the file. The file is created if it does not exist
*/
const fs = require('fs')
import { mkdir } from 'fs';
const path = require('path')
const nativeB64 = new Base64({ useNative: true });

export default {

    saveFileOnLocalFS(docFile) {
        if (docFile.dataBaseName != null) {
            docFile.storedDate = Utilities.getDateTimeNowUTC();
            docFile.storePath = process.env.FILES_LOCAL_PATH
            docFile.extensionWithDot = require('path').extname(docFile.name) // '.txt'
            docFile.extension = docFile.extensionWithDot.slice(1);
            // Decodificar docFile.data
            // Remover cabecera de docFile.data
            // //comma is the charater which seperates the prefix and the Base64 String
            const i = docFile.data.indexOf(",");
            const datafileToDecode = docFile.data.substring(i + 1);
            //Now, that we have just the Base64 encoded String, we can decode it
            const dataFile=nativeB64.decode(datafileToDecode);
                const nameFileWithExt=docFile.dataBaseName+docFile.extensionWithDot
                const fileNameWithPath=path.join(docFile.storePath,nameFileWithExt )
                const fileNamePath=path.join(docFile.storePath)
                const fileComponents= path.parse(fileNameWithPath);
                console.info("Componentes del archivo y ruta: ", fileComponents)
                /*fs.writeFile(fileNameWithPath,dataFile,{ flag: 'a+' }, 
                    err => { 
                        if(err){
                            console.error("Error al gurdar el archivo:" + fileNameWithPath)
                            console.error("error trace:" + err)
                            return false
                        }   
                    }) 
                */  console.info("fileNamePath:", fileNamePath)
                    console.info("fileNameWithPath:",fileNameWithPath)
                    const dir = fs.statSync('fileNamePath');
                    let isDirectory=false
                    let isFile=false
                    let isThereDirectrory= false
                    try{
                        isDirectory=dir.isDirectory()
                        isFile=dir.isFile
        
                        if(isDirectory){
                            console.info("El path " + fileNamePath + " es un direcrorio")
                        }else{
                            console.info("El path " + fileNamePath + " NO es un direcrorio")
                        }
                        
                    }catch(r){
                        console.error(r)
                    }
                    // To check file path exist
                        try{
                            isThereDirectrory= fs.existsSync(dir)
                            if (!isThereDirectrory) {
                                console.warn("No existe el directorio:" + fileNamePath + " será creado...")
                                mkdir(fileNamePath, { recursive: true }, (err) => {
                                    if (err) {
                                        throw err;
                                    }else{
                                        console.info("El directorio "+ fileNamePath+ " fué creado")
                                    }
                                  });
                                
                            }else{
                                console.warn("El directorio:" + fileNamePath + " existe.")
                            }
                        }catch(er){
                            console.error("No se ha conseguido crear el directorio:", dir)
                        }
                    try {
                        // Si el directorio existe
                        const existDir= fs.statSync('fileNamePath');
                        if(existDir.isDirectory()){
                            fs.writeFileSync(fileNameWithPath, dataFile)
                            console.info("El archivo "+ fileNameWithPath + " ha sido guardado...")
                        }else{
                            console.info("El archivo "+ fileNameWithPath + " NO ha sido guardado porque no existe el directorio o no se tienen permisos")
                        }
                        
                        //file written successfully
                        return true
                      } catch (err) {
                        console.error("Error al escribir el archivo en el sistema",err)
                        return false
                      }   
            }
    },
    getFileOnLocalFS(fileMetaData) {
        let data
        // process.env.FILES_LOCAL_PATH
        try {
            let pathFull=fileMetaData.storePath + path.sep + fileMetaData.dataBaseName + fileMetaData.extensionWithDot
            console.info("pathFull", pathFull)
            fs.readFileSync(pathFull,'utf8', (err, data) => {
                if (err) {
                    console.error(err)
                    return
                }
                console.log(data)
            })
        } catch (e) {
            console.error(e)
        }
        return data
    },
    removeFileOnLocalFS(docFile) {

        let ret = false
        try {
            fs.unlinkSync(docFile.storePath
                + path.sep + docFile.dataBaseName
                + docFile.extensionWithDot,
                (err) => {
                    if (err) {
                        console.error(err)
                        return false
                    }
                    //file removed
                })
            ret = true
        } catch (e) {
            console.error('removeFileOnLocalFS(docFile)', e);
            throw new Meteor.Error('500', 'Ocurrio un error al eliminar el archivo del sistema');
        }
        return ret

    }

}