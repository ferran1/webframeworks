import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Trip} from "../../../models/trip";
import {TripsService} from "../../../services/trips.service";

@Component({
  selector: 'app-detail3',
  templateUrl: './detail3.component.html',
  styleUrls: ['./detail3.component.css']
})
export class Detail3Component implements OnInit {
  @Input() activeIndex: number;
  @Input() editedTrip: Trip;
  @Input() copyTrip: Trip;
  @Input() changesDetected: boolean;

  @Output() saveTrip = new EventEmitter<Trip>();
  @Output() deleteTrip = new EventEmitter<Trip>();
  @Output() cancelTrip = new EventEmitter<number>();
  @Output() unsavedChanges = new EventEmitter<boolean>();

  constructor(private tripsService: TripsService) {
    this.activeIndex = null;
    this.changesDetected = false;
  }

  onChanges(){
    this.unsavedChanges.emit(true);
  }

  onSave() {
    console.log("Trip is saved!")
    this.saveTrip.emit(this.editedTrip);
  }

  onDelete() {
    let confirmation = confirm("Are you sure you want to delete this trip?");
    if (confirmation == true) {
      this.deleteTrip.emit(this.editedTrip);
    } else console.log("Trip not deleted!")
  }

  onClear() {
    let confirmation = confirm("Are you sure you want to discard edited changes?")
    if (confirmation == true) {
      console.log(this.editedTrip)
      Object.keys(this.editedTrip).forEach(index => this.editedTrip[index] = null);
    } else console.log("Trip data not cleared")
  }

  onReset() {
    console.log("Reset button clicked!")
    let confirmation = confirm("Are you sure you want to discard edited changes?");
    if (confirmation == true) {
      let trips = this.tripsService.getTrips();
      this.editedTrip = Trip.trueCopy(trips[this.activeIndex]);
    }
  }

  onCancel() {
    console.log("Cancel button clicked!")
    let copyOfTrip = Trip.trueCopy(this.copyTrip);
    if (JSON.stringify(copyOfTrip) != JSON.stringify(this.editedTrip)) {
      let confirmation = confirm("Are you sure you want to discard edited changes?");
      if (confirmation == true) {
        this.editedTrip = copyOfTrip;
        this.cancelTrip.emit(this.activeIndex);
        this.activeIndex = null;
      }
    }
  }


  ngOnInit() {
  }

}
