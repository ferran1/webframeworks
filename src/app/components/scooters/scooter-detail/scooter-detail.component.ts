import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Scooter, ScooterStatus} from "../../../models/scooter";

@Component({
  selector: 'app-scooter-detail',
  templateUrl: './scooter-detail.component.html',
  styleUrls: ['./scooter-detail.component.css']
})
export class ScooterDetailComponent implements OnInit {
  @Input() activeIndex;
  @Input() editedScooter: Scooter;
  @Input() scooterCopy: Scooter;

  @Output() saveScooter = new EventEmitter<Scooter>();
  @Output() deleteScooter = new EventEmitter<Scooter>();
  @Output() cancelSelection = new EventEmitter<number>();

  @Input() unsavedChanges: boolean;
  @Output() detectedChanges = new EventEmitter<boolean>();

  keys = Object.keys;
  private ScooterStatus = ScooterStatus;

  constructor() {
    this.unsavedChanges = false;
    console.log(this.ScooterStatus)
  }

  onChanges(){
    this.unsavedChanges = true;
    this.detectedChanges.emit(true);
  }

  onSave(){
    console.log("Save button clicked!");
    let confirmation = confirm("Are you sure you want to save this scooter?");
    switch(confirmation){
      case true:
        this.saveScooter.emit(this.editedScooter);
        this.activeIndex = null;
        this.unsavedChanges = false;
      case false:
        console.log("Saving cancelled");
    }
  }

  onDelete(){
    console.log("Delete button clicked!");
    let confirmation = confirm("Are you sure you want to delete this scooter?")
    switch(confirmation) {
      case true: {
        this.deleteScooter.emit(this.activeIndex);
        this.activeIndex = null;
      } case false: {
        console.log("Scooter not deleted")
      }
    }
  }

  onClear(){
    let confirmation = confirm("Are you sure you want to discard unsaved changes?");
    switch(confirmation){
      case true:
        for(let value of Object.keys(this.editedScooter)){
          this.editedScooter[value] = null;
        }
      case false:
        console.log("Scooter info not cleared")
    }
  }

  onReset(){
    let tempScooterCopy: Scooter = Scooter.trueCopy(this.scooterCopy);
    if(JSON.stringify(this.scooterCopy) != JSON.stringify(this.editedScooter)){
    let confirmation = confirm("Are you sure you want to discard unsaved changes?");
    switch(confirmation) {
      case true:
        console.log("Reset button clicked!");
        this.editedScooter = tempScooterCopy;
      case false:
        console.log("Scooter not reset");
    }
    } else console.log("Not reset")
  }

  onCancel() {
    let tempScooterCopy: Scooter = Scooter.trueCopy(this.scooterCopy);
    let confirmation = confirm("Are you sure you want to discard unsaved changes?");
    console.log("Cancel button clicked");
    switch(confirmation){
      case true:
        //this.editedScooter = tempScooterCopy;
        this.activeIndex = null;
        this.cancelSelection.emit(this.activeIndex);
      case false: console.log("Scooter not cancelled")

    }

  }



  ngOnInit() {
  }

}
