export default {
    getAppVersion(){
        let ver='No definida'
        if(Meteor.settings.private && Meteor.settings.private.SHOW_ZERO_METERS_VERSION ){
            ver= Meteor.settings.private.ZERO_METERS_USER + " - "+ Meteor.settings.private.ZERO_METERS_VERSION;
            console.log('Version en ejecución: ', ver)
        }else{
            console.log('Version en ejecución NO DEFINIDA: ', ver)
        }

        return ver;
    },
    
}


