/**
 * Web version 9 (modular)
 */
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAMNp9kjxMWzYUsPscX6T40h1II6kzWdgA",
    authDomain: "crown-clothing-db-6da3d.firebaseapp.com",
    projectId: "crown-clothing-db-6da3d",
    storageBucket: "crown-clothing-db-6da3d.appspot.com",
    messagingSenderId: "1045981809055",
    appId: "1:1045981809055:web:753fe6cd57d49e4b6855aa",
    measurementId: "G-1LV260ZWP0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt : 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default app;