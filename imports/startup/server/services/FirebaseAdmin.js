import firebaseAdmin from 'firebase-admin';

import serviceAccount from '../../../../settings/cerometros-firebase-adminsdk-ublo1-0e93050736.json';;

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    storageBucket: Meteor.settings.private.STORAGE_BUCKET
});

export const firebaseAdminsStorage = firebaseAdmin.storage().bucket(Meteor.settings.private.STORAGE_BUCKET);

// Depende del valor de la variable de ambiente
//
export const BASE_URL_STORAGE= Meteor.settings.private.BASE_URL_STORAGE
//'http://storage.googleapis.com';


