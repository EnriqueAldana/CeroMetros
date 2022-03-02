
import { Meteor } from 'meteor/meteor'


// On server startup, if the database is empty, create some initial data.
if (Meteor.isServer) {
    Meteor.startup(() => {
      console.log('Meteor version used: ', Meteor.release)
    });
  }