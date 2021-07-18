import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/database";
import "firebase/storage";

let db = firebase.database();
let auth = firebase.auth();
const storage = firebase.storage().ref();

// db.useEmulator("localhost", 9000)
// useAuthEmulator(auth, "http://localhost:9099")

// collection references
const eventsCollection = db.ref("events/");
const ticketsCollection = db.ref("tickets/");
const bannersCollection = db.ref("banners/");

export {
  auth,
  firebase,
  db,
  storage,
  eventsCollection,
  ticketsCollection,
  bannersCollection
};