import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBO9wt1dj41g7HrQvOVSesga-0892BgghE',
    authDomain: 'nastya-tests.firebaseapp.com',
    projectId: 'nastya-tests',
    storageBucket: 'nastya-tests.appspot.com',
    messagingSenderId: '709751950933',
    appId: '1:709751950933:web:324971e330427524a20edc',
    measurementId: 'G-BKJFWY1B5X',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
