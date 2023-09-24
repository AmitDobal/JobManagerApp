import app from "firebase/compat/app";
import "firebase/compat/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyDUn7jchRuaCXP8BDXt4vKJnQPyULd1XKk",
    authDomain: "job-listing-34bee.firebaseapp.com",
    projectId: "job-listing-34bee",
    storageBucket: "job-listing-34bee.appspot.com",
    messagingSenderId: "53318484856",
    appId: "1:53318484856:web:50be81db92d2229a517e8d"
  };
// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const firestore = firebase.firestore();

export {firebase, firestore, app}






/*
const firebaseConfig = {
  apiKey: "AIzaSyDUn7jchRuaCXP8BDXt4vKJnQPyULd1XKk",
  authDomain: "job-listing-34bee.firebaseapp.com",
  projectId: "job-listing-34bee",
  storageBucket: "job-listing-34bee.appspot.com",
  messagingSenderId: "53318484856",
  appId: "1:53318484856:web:50be81db92d2229a517e8d"
};


*/