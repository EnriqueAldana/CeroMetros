import firebaseAdmin from 'firebase-admin';

import serviceAccount from '../../../../settings/cerometros-firebase-adminsdk-ublo1-0e93050736.json';;

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    storageBucket: 'gs://cerometros.appspot.com'
});

export const firebaseAdminsStorage = firebaseAdmin.storage().bucket('gs://cerometros.appspot.com');
export const BASE_URL_STORAGE='http://storage.googleapis.com';


