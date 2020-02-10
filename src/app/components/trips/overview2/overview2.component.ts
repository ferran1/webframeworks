import {Component, OnInit} from '@angular/core';
import { Trip } from 'src/app/models/trip';

@Component({
  selector: 'app-overview2',
  templateUrl: './overview2.component.html',
  styleUrls: ['./overview2.component.css']
})
export class Overview2Component implements OnInit {
  public trips: Trip[];
  private activeIndex;
  private selectedTrip: Trip;

  constructor() {
    this.trips = [new Trip("12/11/2019 02:30:15", "12/11/2019 06:04:43", "Landsmeer", "Amsterdam-West", 1.97, 1.06, "A001"), new Trip("08/29/2019 16:10:14", "08/29/2019 18:19:54", "Amsterdam-West", "Vlaggemast", 14.74, 9.20, "A002"), new Trip("08/16/2019 01:56:42", "08/16/2019 03:23:26", "Amsterdam-Zuid", "Amsterdam-Noord", 7.88, 7.61, "A003"), new Trip("03/25/2019 04:01:27", "03/25/2019 09:58:27", "NDSM-Plein", "Amsterdam-Zuid", 5.49, 5.01, "A004"), new Trip("12/23/2018 14:27:06", "12/23/2018 18:47:34", "Westpoort", "Schakelstraat", 2.00, 1.9, "A005"), new Trip("12/10/2018 12:26:56", "12/23/2018 14:39:29", "Ijdok", "Amsterdam-Oost", 3.46, 2.47, "A006"), new Trip("07/03/2018 11:20:39", "07/03/2018 13:37:51", "Amsterdam-Noord", "Huidekoperstraat", 7.66, 5.22, "A007"), new Trip("05/19/2018 22:41:39", "05/20/2018 03:29:20", "Amsterdam Nieuw-West", "Amsterdam-Centrum", 13.32, 6.93, "A008"), new Trip("04/21/2018 08:37:04", "04/21/2018 15:24:38", "Buiksloterweg", "Amsterdam-Noord", 13.72, 13.13, "A009")
    ]
  }

  saveRequest($event){
    this.trips[this.activeIndex] = $event;
    console.log(this.trips[this.activeIndex]);
  }

  deleteRequest($event){
    this.trips = this.trips.filter($event => $event !== this.trips[this.activeIndex]);
    console.log(this.trips)
  }

  onAddTrip(){
    this.activeIndex = this.trips.length;
    let newTrip: Trip = this.generateRandomTrip();
    this.trips.push(newTrip);
    this.onSelected(this.activeIndex)
  }

  public generateRandomTrip(): Trip{
    let randomNumber =  Math.floor(Math.random() * (this.trips.length - 1) );
    console.log(randomNumber);
    return this.trips[randomNumber];
  }

  onSelected(tripIndex){
    this.activeIndex = tripIndex;
    this.selectedTrip = Trip.trueCopy(this.trips[tripIndex]);
  }

  ngOnInit() {

  }

}
