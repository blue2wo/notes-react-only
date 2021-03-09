import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBpNZMZK__4AV3KcO90XsJWOzmr8TtD0bA",
  authDomain: "knotes-d2406.firebaseapp.com",
  databaseURL: "https://knotes-d2406-default-rtdb.firebaseio.com",
  projectId: "knotes-d2406",
  storageBucket: "knotes-d2406.appspot.com",
  messagingSenderId: "403538804380",
  appId: "1:403538804380:web:9603ced94b9d2d5d0b7759",
  measurementId: "G-RNDPW35TFS"
};

function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

initFirebase();

export { firebase };