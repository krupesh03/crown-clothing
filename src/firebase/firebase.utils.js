/**
 * Web version 9 (modular)
 */
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword } from "firebase/auth";

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

export const createUserProfileDocument = async ( userAuth, additionalData ) => {

    if( !userAuth ) return;

    const UserRef = doc(firestore, `users/${userAuth.uid}`);
    const snapShot = await getDoc(UserRef);
    //console.log(snapShot);
    if( !snapShot.exists() ) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(UserRef, { //always set data in userRef
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch( error ) {
            console.log(`error creating user ${error.message}`);
        }
    } 

    return UserRef;
};

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt : 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const GooglesignOut = () => signOut(auth);

export const onSnapshotDoc = (docRef, doc) => onSnapshot(docRef, doc);

export const createGoogleUserWithEmailAndPassword = (auth, email, password) => createUserWithEmailAndPassword(auth, email, password);

export default app;