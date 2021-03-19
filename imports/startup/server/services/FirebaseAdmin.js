import firebaseAdmin from 'firebase-admin';
import serviceAccount from '../../../../settings/zmeters-firebase-adminsdk-tvr24-c63a9c26ec.json';

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    storageBucket: 'gs://zmeters.appspot.com'
});

export const firebaseAdminsStorage = firebaseAdmin.storage().bucket('gs://zmeters.appspot.com');
export const BASE_URL_STORAGE='http://storage.googleapis.com';


