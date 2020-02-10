import { Injectable } from '@angular/core';
import {Scooter, ScooterStatus} from "../models/scooter";

@Injectable({
  providedIn: 'root'
})
export class ScootersService {
  private scooters: Scooter[];


  constructor() {
    this.scooters = [];
    for (let i = 0; i < 9; i++) {
      this.scooters.push(this.generateRandomScooter());
    }
  }

  getScooters():Scooter[]{
    return this.scooters;
  }

  add(EScooter: Scooter){
      this.scooters.push(EScooter);
  }

  remove(index: number, tag: string){
      this.scooters = this.scooters.filter(Scooter => Scooter.tag != this.scooters[index].tag)
      return this.scooters;
  }

  update(EScooter: Scooter, index: number){
    this.scooters[index] = EScooter;
  }

  generateRandomScooter(): Scooter{
    let statusKeys = Object.keys(ScooterStatus);
    let propertyNameStatus = statusKeys[Math.floor(Math.random() * 3)];
    let randomScooterTag = this.generateScooterTag();

    let randomLongitude = Math.round((Math.random() * 500)  * 100) / 100;
    let randomLatitude = Math.round((Math.random() * 500)  * 100) / 100;
    let gpsLocation = "lng: " + randomLongitude.toString() + ", lat: " + randomLatitude;

    let randomMileage = Math.round((Math.random() * 90000) * 100) / 100;
    let randomBattery = Math.round((Math.random() * 100) * 100) / 100;
    return new Scooter(randomScooterTag, ScooterStatus[propertyNameStatus], gpsLocation, randomBattery, randomMileage);
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
