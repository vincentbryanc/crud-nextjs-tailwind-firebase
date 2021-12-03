// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCIuHEEg6eUTsMfcpMYu2HqWIMQie9palc",
	authDomain: "crud-dbf13.firebaseapp.com",
	projectId: "crud-dbf13",
	storageBucket: "crud-dbf13.appspot.com",
	messagingSenderId: "11496552689",
	appId: "1:11496552689:web:58ad8588bab2aa8dd65150"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
export { db, auth, provider }