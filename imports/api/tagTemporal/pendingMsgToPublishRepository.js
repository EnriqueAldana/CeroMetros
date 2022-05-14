import { Mongo } from 'meteor/mongo';

export const pendingMsgToPublish = new Mongo.Collection('pendingToPublishDeviceMsgs');