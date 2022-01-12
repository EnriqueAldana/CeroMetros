let Version={
    appVersion:"---"
}
if(Meteor.settings.private && Meteor.settings.private.SHOW_ZERO_METERS_VERSION ){
    Version.appVersion= Meteor.settings.private.ZERO_METERS_USER + " - "+ Meteor.settings.private.ZERO_METERS_VERSION;
    console.log('Version en ejecución: ', Version.appVersion)
}else{
    console.log('Version en ejecución NO DEFINIDA: ', Version.appVersion)
}

export default Version;