import { Mongo } from 'meteor/mongo';

export const sendDeviceMsgs = new Mongo.Collection('sentDeviceMsgs');