import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/storage";

let db = firebase.firestore();
let auth = firebase.auth();
const storage = firebase.storage().ref();

export { auth, firebase, db, storage };
