import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Scooter, ScooterStatus} from "../../../models/scooter";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Scooters2Service} from "../../../services/scooters2.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-scooter-http-detail',
  templateUrl: './scooter-http-detail.component.html',
  styleUrls: ['./scooter-http-detail.component.css']
})
export class ScooterHttpDetailComponent implements OnInit {
  @Input() activeIndex;
  private editedScooter: Scooter;
  private scooterCopy: Scooter;

  @Output() saveScooter = new EventEmitter<Scooter>();
  @Output() deleteScooter = new EventEmitter<Scooter>();
  @Output() cancelSelection = new EventEmitter<number>();

  @Input() unsavedChanges: boolean;
  @Output() detectedChanges = new EventEmitter<boolean>();

  keys = Object.keys;
  private ScooterStatus = ScooterStatus;

  queryParamSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private scooterService: Scooters2Service) {
    this.unsavedChanges = false;
    console.log(this.ScooterStatus)
  }

  onChanges() {
    this.unsavedChanges = true;
    this.detectedChanges.emit(true);
  }

  onSave() {
    console.log("Save button clicked!");
    let confirmation = confirm("Are you sure you want to save this scooter?");
    switch (confirmation) {
      case true:
        this.saveScooter.emit(this.editedScooter);
        this.activeIndex = null;
        this.unsavedChanges = false;
        this.router.navigate(['/http-route']);
        break;
      case false:
        console.log("Saving cancelled");
    }
  }

  onDelete() {
    console.log("Delete button clicked!");
    let confirmation = confirm("Are you sure you want to delete this scooter?")
    switch (confirmation) {
      case true:
        this.deleteScooter.emit(this.activeIndex);
        this.activeIndex = null;
        break;
      case false:
        console.log("Scooter not deleted")

    }
  }

  onClear() {
    let confirmation = confirm("Are you sure you want to discard unsaved changes?");
    switch (confirmation) {
      case true:
        for (let value of Object.keys(this.editedScooter)) {
          this.editedScooter[value] = null;
        }
        break;
      case false:
        console.log("Scooter info not cleared");
    }

  }

  onReset() {
    let tempScooterCopy: Scooter = Scooter.trueCopy(this.scooterCopy);
    if (JSON.stringify(this.scooterCopy) != JSON.stringify(this.editedScooter)) {
      let confirmation = confirm("Are you sure you want to discard unsaved changes?");
      switch (confirmation) {
        case true:
          console.log("Reset button clicked!");
          this.editedScooter = tempScooterCopy;
          this.unsavedChanges = false;
          this.detectedChanges.emit(false);
          break;
        case false: {
          console.log("Scooter not reset");
        }
      }
    } else console.log("Not reset");
  }

  onCancel() {
    let tempScooterCopy: Scooter = Scooter.trueCopy(this.scooterCopy);
    let confirmation = confirm("Are you sure you want to discard unsaved changes?");
    console.log("Cancel button clicked");
    switch (confirmation) {
      case true:
        this.editedScooter = tempScooterCopy;
        this.activeIndex = null;
        this.cancelSelection.emit(this.activeIndex);
        break;
      case false:
        console.log("Scooter not cancelled");

    }

  }

  ngOnInit() {
    this.queryParamSubscription =
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        const tag = params.tag;
        for (let i = 0; i < this.scooterService.getScooters().length; i++) {
          let scooter = this.scooterService.getScooters()[i];
          if (scooter.tag == tag) {
            this.editedScooter = Scooter.trueCopy(scooter);
            this.scooterCopy = Scooter.trueCopy(this.editedScooter);
            console.log(scooter);
          }
        }
      });
  }

  @ViewChild('editForm', {static: false})
  private detailForm: NgForm;

  ngOnDestroy() {
    this.queryParamSubscription.unsubscribe();
  }

}
