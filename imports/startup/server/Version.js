export default {
    getAppVersion(){
        let ver='No definida'

        if(Meteor.settings.private.SHOW_ZERO_METERS_VERSION){
            if(Meteor.settings.private.ZERO_METERS_USER && Meteor.settings.private.ZERO_METERS_VERSION){
                ver= Meteor.settings.private.ZERO_METERS_USER + 
                " - "+Meteor.settings.private.ZERO_METERS_VERSION
            }else if(Meteor.settings.private.ZERO_METERS_USER){
                ver= Meteor.settings.private.ZERO_METERS_USER
            }else if(Meteor.settings.private.ZERO_METERS_VERSION){
                ver=  Meteor.settings.private.ZERO_METERS_VERSION
            }
        }

        return ver;
    },
    getAppEnvironment(){
        return Meteor.settings.private.ROOT_URL=="http://localhost:3000/"?"DES":"PRD"
         
    },
    
}


