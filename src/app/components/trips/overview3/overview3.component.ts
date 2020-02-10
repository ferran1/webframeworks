import {Component, OnInit, Output} from '@angular/core';
import {TripsService} from "../../../services/trips.service";
import {Trip} from "../../../models/trip";

@Component({
  selector: 'app-overview3',
  templateUrl: './overview3.component.html',
  styleUrls: ['./overview3.component.css']
})

export class Overview3Component implements OnInit {
  private trips: Trip[];
  private activeIndex: number;

  private unsavedChanges: boolean;

  private selectedTrip: Trip;
  private copyTrip: Trip;

  constructor(private tripsServices: TripsService) {
    this.trips = tripsServices.getTrips();
    this.unsavedChanges = false;
    console.log(this.trips)
  }

  onAdd(){
    let trip = this.tripsServices.createRandomTrip();
    this.tripsServices.add(trip);
    console.log("Trip added!");
  }

  deleteRequest(){
    this.tripsServices.remove(this.trips[this.activeIndex].scooterTag);
    this.trips = this.tripsServices.getTrips();
    this.activeIndex = null;
    this.unsavedChanges = false;
    console.log("Delete request handled!")
  }

  saveRequest($event){
    this.tripsServices.update(this.activeIndex, $event);
    this.trips = this.tripsServices.getTrips();
    this.unsavedChanges = false;
    console.log("Save request handled!")
  }

  changesDetected(boolean){
    console.log("Overview detected changes!");
    this.unsavedChanges = boolean;
  }

  cancelRequest(){
    this.activeIndex = null;
    console.log("Cancel request handled!");
  }

  onSelected(index){
    console.log(this.trips[index])
    if(this.unsavedChanges == false) {
      this.activeIndex = index;
      this.selectedTrip = Trip.trueCopy(this.trips[index]);
      this.copyTrip = Trip.trueCopy(this.selectedTrip);
    } else if(this.unsavedChanges == true){
      console.log("There are still unsaved changes!");
      let confirmation = confirm("Are you sure you want to discard edited changes?");
      switch (confirmation){
        case true: {
          this.activeIndex = index;
          this.selectedTrip = Trip.trueCopy(this.trips[index]);
          this.copyTrip = Trip.trueCopy(this.selectedTrip);
          this.unsavedChanges = false;
          break;}
        case false: { console.log("Selection change cancelled!")}
      }
    }

  }

  ngOnInit() {
  }

}
