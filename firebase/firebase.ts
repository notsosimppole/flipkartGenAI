import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDT1f9YLYSG1Zp24c2FTe544DY-52v_DQU",
    authDomain: "flipkart-gen-ai.firebaseapp.com",
    projectId: "flipkart-gen-ai",
    storageBucket: "flipkart-gen-ai.appspot.com",
    messagingSenderId: "490610675156",
    appId: "1:490610675156:web:2f20295c72f71acfd25a41",
    measurementId: "G-52355NNMD6",
};

// Initialize Firebase using Singleton Pattern
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
