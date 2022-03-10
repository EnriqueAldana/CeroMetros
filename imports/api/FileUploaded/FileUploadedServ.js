
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
const path = require('path')
const nativeB64 = new Base64({ useNative: true });

export default {

    saveFileOnLocalFS(docFile) {
        let ret = false
        // process.env.FILES_LOCAL_PATH


        try {
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
            if (docFile.dataBaseName != null) {
                fs.writeFile(docFile.storePath + path.sep + docFile.dataBaseName + docFile.extensionWithDot,
                    dataFile,
                    { flag: 'a+' }, err => { })

            }

        } catch (e) {
            console.error(e)
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
            fs.unlink(docFile.storePath
                + path.sep + docFile.name
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

        }
        return ret

    }

}