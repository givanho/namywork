import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import {FIRE_API,FIRE_AUTH,FIRE_PROJECT,
    FIRE_STORAGE,FIRE_MESSAGING,
    FIRE_APP_ID,FIRE_MEASUREMENT} from "@env"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: `${FIRE_API}`,
    authDomain:`${FIRE_AUTH}`,
    projectId: `${FIRE_PROJECT}`,
    storageBucket: `${FIRE_STORAGE}`,
    messagingSenderId: `${FIRE_MESSAGING}`,
    appId: `${FIRE_APP_ID}`,
    measurementId: `${FIRE_MEASUREMENT}`
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app);