export default {
    getAppVersion(){
        let ver='No definida'
        if(!process.env.SHOW_ZERO_METERS_VERSION){
            if(Meteor.settings.private && Meteor.settings.private.SHOW_ZERO_METERS_VERSION ){
                process.env.SHOW_ZERO_METERS_VERSION= Meteor.settings.private.SHOW_ZERO_METERS_VERSION;
            }else{
                console.warn("SHOW_ZERO_METERS_VERSION no ha sido configurado ");
            }   
        }
        if(!process.env.ZERO_METERS_VERSION){
            if(Meteor.settings.private && Meteor.settings.private.ZERO_METERS_VERSION ){
                process.env.ZERO_METERS_VERSION= Meteor.settings.private.ZERO_METERS_VERSION;
            }else{
                console.warn("ZERO_METERS_VERSION no ha sido configurado ");
            } 
        }
        if(!process.env.ZERO_METERS_USER){
            if(Meteor.settings.private && Meteor.settings.private.ZERO_METERS_USER ){
                process.env.ZERO_METERS_USER= Meteor.settings.private.ZERO_METERS_USER;
            }else{
                console.warn("ZERO_METERS_USER no ha sido configurado ");
            } 
        }
        if(process.env.SHOW_ZERO_METERS_VERSION){
            if(process.env.ZERO_METERS_USER && process.env.ZERO_METERS_VERSION){
                ver= process.env.ZERO_METERS_USER + 
                " - "+ process.env.ZERO_METERS_VERSION
            }else if(process.env.ZERO_METERS_USER){
                ver= process.env.ZERO_METERS_USER
            }else if(process.env.ZERO_METERS_VERSION){
                ver=  process.env.ZERO_METERS_VERSION
            }
        }

        return ver;
    },
    
}


