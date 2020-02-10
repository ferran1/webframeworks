import {Injectable} from '@angular/core';
import {Trip} from "../models/trip";


@Injectable({
  providedIn: 'root'
})
export class TripsService {

  public trips: Trip[];

  constructor() {
    this.trips = [];
    for (let i = 0; i < 9; i++) {
      this.trips.push(this.createRandomTrip());
    }
  }

  getTrips() {
    return this.trips;
  }

  add(ETrip: Trip) {
    // TODO append trip at the end of trips list
    // and return its index
    this.trips.push(ETrip);
  }

  remove(scooterTag: string): Trip[] {
    // TODO remove identified trip from the list
    // and return the removed instance
    for(let i = 0; i < this.trips.length; i++) {
      if (this.trips[i].scooterTag == scooterTag) {
        this.trips = this.trips.filter(scooterTag => scooterTag != this.trips[i]);
        console.log(this.trips);
      }
    }
    return this.trips;
  }

  update(tripsIndex: number, ETrip: Trip){
    this.trips[tripsIndex] = ETrip;
  }

  createRandomTrip() {
    let locationList: String[] = ["Amsterdam", "Rotterdam", "Westpoort", "Landsmeer", "Amsterdam-West", "Amsterdam-Oost", "Amsterdam-Zuid", "Amsterdam-Centrum", "Amsterdam-Noord", "Buiksloterweg"]

    let randomInt = Math.floor((Math.random() * 9) + 0);
    let randomInt2: number = Math.floor((Math.random() * 9) + 0);
    randomInt2 = this.isEqualNumber(randomInt, randomInt2)

    let randomStartDate: Date = new Date(2018, 1, 11 * Math.random() * (Date.now() - 2018, 1, 11));
    let randomEndDate: Date = new Date(randomStartDate.getFullYear(), randomStartDate.getMonth(), randomStartDate.getDate() * Math.random() + (randomStartDate.getFullYear(), randomStartDate.getMonth(), randomStartDate.getDate() + 2 - randomStartDate.getFullYear(), randomStartDate.getMonth(), randomStartDate.getDate()));
    randomStartDate.setHours(Math.random() * (1 - 24), Math.random() * (1 - 60), Math.random() * (1 - 60));
    randomEndDate.setHours(Math.random() * (randomStartDate.getHours() - 24), Math.random() * (randomStartDate.getMinutes() - 60), Math.random() * (randomStartDate.getSeconds() - 60));

    let randomMileage = Math.round((Math.random() * (30 - 2)) * 100) / 100;
    let randomCost = Math.round((randomMileage - (0 + Math.random())) * 100) / 100;

    if (randomMileage < 1.00) {
      randomCost = 0.50;
    }
    let scooterTag = this.generateScooterTag();
    let trip: Trip = new Trip(randomStartDate, randomEndDate, locationList[randomInt], locationList[randomInt2], randomMileage, randomCost, scooterTag);
    return trip;
  }

  isEqualNumber(randomNumber1, randomNumber2) {
    while (randomNumber1 == randomNumber2) {
      randomNumber2 = Math.floor((Math.random() * 9) + 0)
    }
    return randomNumber2;
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
