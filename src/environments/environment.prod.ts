import * as firebase from "firebase";

var firebaseConfig = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBhVboi410cL1nlwxniWfw3dh-ckRG6GI0",
    authDomain: "webframeworksdb.firebaseapp.com",
    databaseURL: "https://webframeworksdb.firebaseio.com",
    projectId: "webframeworksdb",
    storageBucket: "webframeworksdb.appspot.com",
    messagingSenderId: "414149548461",
    appId: "1:414149548461:web:53e9f4830acb2a66736924"
  }
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
