import { Mongo } from 'meteor/mongo';

export const receivedDeviceMsgs = new Mongo.Collection('receivedDeviceMsgs');