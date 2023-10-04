import * as admin from 'firebase-admin';
import serviceAccount from '../../onnuri-snstech-iwill-firebase-adminsdk-kc3od-541872202d.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const firebaseAdmin = admin;
