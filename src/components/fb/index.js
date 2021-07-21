import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/storage";

/* code from our Firebase console */
const firebaseConfig = {
    apiKey: "AIzaSyByLZLzrhmlJAIcLHs8kLFVJ-_cRFQ8mm4",
    authDomain: "gigs-58afb.firebaseapp.com",
    projectId: "gigs-58afb",
    storageBucket: "gigs-58afb.appspot.com",
    messagingSenderId: "609449032341",
    appId: "1:609449032341:web:70a806c6960dae0bb6b99c",
    measurementId: "G-KNKVCTJC20"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

let db = firebase.firestore();
let auth = firebase.auth();
const storage = firebase.storage().ref();

export { auth, firebase, db, storage };
