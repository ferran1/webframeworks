import {Injectable} from '@angular/core';
import * as firebase from "firebase";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {User} from "../models/user";
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly REST_BASE_URL = "http://localhost:8080";
  private token: string;
  public name: string;
  private authenticated: boolean;

  constructor(private httpClient: HttpClient) {
  }

  public signIn(email: string, password: string, targetUrl?: string) {
    console.log("login " + email + "/" + password);
    let Observable = this.httpClient.post<HttpResponse<User>>(
      this.REST_BASE_URL + "/authenticate/login", {eMail: email, passWord: password},
      {observe: "response"});
    Observable
      .subscribe(
        response => {
          this.setToken(response.headers.get('Authorization'),
            ((response.body as unknown) as User).name
          );
        },
        error => {
          console.log(error);
          this.setToken(null, null);
        },
        () => {
          console.log("Login succeeded");
        }
      );
    return Observable;
  }

  public signOff(){
  }

  private setToken(token: string, name: string): void {
    this.token = token;
    this.token = this.token.replace("Bearer ", "");
    this.name = name;
    console.log(this.token, this.name);
    sessionStorage.setItem("Token", this.token);
    localStorage.setItem("Token", this.token);
  }

  public getToken(): string {
    let token = sessionStorage.getItem("Token");
    if(token == null){
      token = localStorage.getItem("Token");
      sessionStorage.setItem("Token", token);
    }
    return token;
  }

  public getName(): string {
    return this.name;
  }

  public isAuthenticated() {
    return this.authenticated;
  }

  // Firebase session service version
  /*public displayEmail: string;
  token: string;
  public authenticated: boolean;
  constructor(){
    this.authenticated = false;
  }
  public signOn(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password).then(
      response => {
        firebase.auth().currentUser.getIdToken().then(
          token => this.token = token);
        this.authenticated = true;
        this.displayEmail = firebase.auth().currentUser.email;
        return response;
      }
    )
  }
  public isAuthenticated(){
    return this.authenticated;
  }
  signOff(){
    this.token = null;
    this.displayEmail = null;
    this.authenticated = false;
    return firebase.auth().signOut();
  }
  getToken(){
    return this.token;
  }*/
  ngOnInit() {
    // Firebase configuration
    /* const firebaseConfig = {
       apiKey: "AIzaSyBhVboi410cL1nlwxniWfw3dh-ckRG6GI0",
       authDomain: "webframeworksdb.firebaseapp.com",
       databaseURL: "https://webframeworksdb.firebaseio.com",
       projectId: "webframeworksdb",
       storageBucket: "webframeworksdb.appspot.com",
       messagingSenderId: "414149548461",
       appId: "1:414149548461:web:229c9222660393cb736924"
     };
     // Initialize Firebase
     firebase.initializeApp(firebaseConfig);*/
  }
}
