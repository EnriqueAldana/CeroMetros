
import {Meteor} from "meteor/meteor";
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
export default {

   saveFileOnLocalFS(docFile){
    let ret= false
    // process.env.FILES_LOCAL_PATH
    const fs = require('fs')
    const path = require('path')

    try{
        docFile.storedDate=Utilities.getDateTimeNowUTC();
        docFile.storePath=process.env.FILES_LOCAL_PATH
        docFile.extensionWithDot=require('path').extname(docFile.name) // '.txt'
        docFile.extension=docFile.extensionWithDot.slice(1);
        if (docFile.dataBaseName != null){
            fs.writeFile(docFile.storePath + path.sep + docFile.dataBaseName+docFile.extensionWithDot, 
            docFile.data, 
            { flag: 'a+' }, err => {})

        }
        
    }catch(e){
        console.error(e)
    }

   },
}