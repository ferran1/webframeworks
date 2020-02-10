import { Component } from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-first-app';

  ngOnInit(){
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBhVboi410cL1nlwxniWfw3dh-ckRG6GI0",
      authDomain: "webframeworksdb.firebaseapp.com",
      databaseURL: "https://webframeworksdb.firebaseio.com",
      projectId: "webframeworksdb",
      storageBucket: "webframeworksdb.appspot.com",
      messagingSenderId: "414149548461",
      appId: "1:414149548461:web:229c9222660393cb736924"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
