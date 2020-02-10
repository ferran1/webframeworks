import {Injectable} from '@angular/core';
import {Scooter, ScooterStatus} from "../models/scooter";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpringScootersService {
  private scooters: Scooter[];

  private readonly DB_URL = "http://localhost:8080";
  private readonly DB_URL_SCOOTERS = 'http://localhost:8080/scooters';

  constructor(private httpClient: HttpClient) {
    this.scooters = [];
    this.getAllScooters();
  }

  getScooters(): Scooter[] {
    return this.scooters;
  }

  add(EScooter: Scooter) {
    this.scooters.push(EScooter);
    return this.httpClient.post(this.DB_URL_SCOOTERS, EScooter).subscribe(
      {
        error: err => {
          console.log(err);
        }
      }
    )
  }

  remove(index: number, tag: string): Observable<any>  {
    this.scooters = this.scooters.filter(Scooter => Scooter.tag != this.scooters[index].tag);

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };

    const url = `${this.DB_URL_SCOOTERS}/${tag}`;
    return this.httpClient.delete(url + httpOptions)
      .pipe(
        catchError(this.handleError)
      );

    // this.saveAllScooters(this.scooters);
  }

  update(EScooter: Scooter, index: number) {
    this.scooters[index] = EScooter;

    // this.saveAllScooters(this.scooters);
  }

  getAllScooters() {
    return this.httpClient.get<Scooter[]>(this.DB_URL_SCOOTERS).subscribe(
      (data: Scooter[]) => {
        console.log(data);
        data.map(o => {
          o ? this.scooters.push(o) : []
        });
        //this.scooters.push(Scooter.trueCopy(data[i]));
      }
    );
  }

  // saveAllScooters(scooters: Scooter[]) {
  //   return this.httpClient.put<Scooter[]>(this.DB_URL_SCOOTERS, scooters).subscribe(
  //     {
  //       error: err => {
  //         console.log(err)
  //       }
  //     }
  //   );
  // }

  // Method to handle the HTTP errors
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


  generateRandomScooter(): Scooter {
    let statusKeys = Object.keys(ScooterStatus);
    let propertyNameStatus = statusKeys[Math.floor(Math.random() * 3)];
    let randomScooterTag = this.generateScooterTag();

    let randomLongitude = Math.round((Math.random() * 500) * 100) / 100;
    let randomLatitude = Math.round((Math.random() * 500) * 100) / 100;
    let gpsLocation = "lng: " + randomLongitude.toString() + ", lat: " + randomLatitude;

    let randomMileage = Math.round((Math.random() * 90000) * 100) / 100;
    let randomBattery = Math.round((Math.random() * 100) * 100) / 100;
    return new Scooter(randomScooterTag, propertyNameStatus, gpsLocation, randomBattery, randomMileage);
  }

  generateScooterTag() {
    let scooterTag: string = '';
    let characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for (let i = 0; i < 4; i++) {
      if (i == 0) {
        let firstCharacter: string = characters.charAt(Math.floor(Math.random() * 26));
        scooterTag += firstCharacter;
      } else if (i > 0) {
        scooterTag += Math.floor(Math.random() * 9);
      }
    }
    return scooterTag;
  }

}
