import admin from "firebase-admin";
import { ServiceAccount, getApps } from "firebase-admin/app";

const serviceAccount = JSON.parse(
    process.env.SERVICE_ACCOUNT as string
) as ServiceAccount;

if (!getApps().length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const adminDb = admin.firestore();

export { adminDb };
