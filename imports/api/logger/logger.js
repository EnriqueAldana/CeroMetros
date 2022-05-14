const Console = require('console').Console;
//const receivedDeviceMsgs= new Mongo.Collection('receivedDeviceMsgs');
let fs = require('fs');
//const Console = console.Console;
const output = fs.createWriteStream('/Users/enrique/DiscoDeEnrique/2022/Proyectos/CeroMetrosTagTemporal/imports/logs/stdout.log');
const errorOutput = fs.createWriteStream('/Users/enrique/DiscoDeEnrique/2022/Proyectos/CeroMetrosTagTemporal/imports/logs/stderr.log');
const logger = new Console(output, errorOutput);
export default {

    logger(){
        return logger
    },

}