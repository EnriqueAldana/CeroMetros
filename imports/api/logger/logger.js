import { Meteor } from 'meteor/meteor';

const Console = require('console').Console;
const path = require('path')
//const receivedDeviceMsgs= new Mongo.Collection('receivedDeviceMsgs');
let fs = require('fs');

const output = fs.createWriteStream(Meteor.settings.private.STD_OUT_FILE);
const errorOutput = fs.createWriteStream(Meteor.settings.private.STD_ERR_FILE);
const logger = new Console(output, errorOutput);
export default {

    logger(){
        return logger
    },

}