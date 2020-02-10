import {Component, OnInit} from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  private email: string;
  private samplePassword: string;
  private confirmPassword: string;
  private errorMessage: string;

  constructor() {
  }

  createUser() {
    if (this.samplePassword == this.confirmPassword) {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.confirmPassword)
        .then(() => this.errorMessage = null).catch(
        error => {
          this.errorMessage = error;
        });
    } else {
      this.errorMessage = "Error: Passwords do not match!";
      return console.log("Passwords do not match!");
    }
  }

  ngOnInit() {
  }

}
