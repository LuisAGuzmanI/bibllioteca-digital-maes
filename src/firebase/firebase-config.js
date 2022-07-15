
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyALBNCMdSWnDRsqRpXACCi4bDuA1VN5LZg",
    authDomain: "biblioteca-digital-maes.firebaseapp.com",
    projectId: "biblioteca-digital-maes",
    storageBucket: "biblioteca-digital-maes.appspot.com",
    messagingSenderId: "564628702811",
    appId: "1:564628702811:web:4b10d817b69ad84a8e217e",
    measurementId: "G-SW1BTZR1G6"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// console.log(await getUsers(db))

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional