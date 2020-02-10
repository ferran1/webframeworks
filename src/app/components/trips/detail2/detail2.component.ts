import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Trip} from "../../../models/trip";

@Component({
  selector: 'app-detail2',
  templateUrl: './detail2.component.html',
  styleUrls: ['./detail2.component.css']
})
export class Detail2Component implements OnInit {
  @Input() activeIndex2;
  @Input() editedTrip: Trip;

  @Output() savedTrip = new EventEmitter<Trip>();
  @Output() deleteTrip = new EventEmitter<Trip>();


  constructor() {

  }

  onSave() {
    console.log("Save")
    this.savedTrip.emit(this.editedTrip);
  }

  onDelete() {
    console.log("Deleting")
    this.deleteTrip.emit(this.editedTrip);
  }

  ngOnInit() {
  }
}
