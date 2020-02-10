import {Component, OnInit} from '@angular/core';
import {Scooter, ScooterStatus} from "../../../models/scooter";
import {ScootersService} from "../../../services/scooters.service";

@Component({
  selector: 'app-scooter-overview',
  templateUrl: './scooter-overview.component.html',
  styleUrls: ['./scooter-overview.component.css']
})
export class ScooterOverviewComponent implements OnInit {
  private scooters: Scooter[];
  private selectedScooter: Scooter;
  private scooterCopy: Scooter;
  private activeIndex: number;
  private sortingBoolean: boolean;

  private detectedChanges: boolean;

  constructor(private scooterService: ScootersService) {
    this.sortingBoolean = false;
    this.detectedChanges = false;
    this.scooters = scooterService.getScooters();
  }

  onDetectedChanges(event){
    this.detectedChanges = event;
  }

  onAdd(){
    this.scooterService.add(this.scooterService.generateRandomScooter());
    this.scooters = this.scooterService.getScooters();
  }

  onSelected(index) {
    if (this.detectedChanges) {
      let confirmation = confirm("Are you sure you want to discard unsaved changes?");
      switch (confirmation) {
        case true:
          this.selectedScooter = this.scooterCopy;
          this.activeIndex = index;
          this.detectedChanges = false;
        case false:
          console.log("Selection not changed");
      }
    } else {
      this.detectedChanges = false;
      this.activeIndex = index;
      this.selectedScooter = Scooter.trueCopy(this.scooters[index]);
      this.scooterCopy = Scooter.trueCopy(this.selectedScooter);
      console.log(this.scooters[index]);
    }
  }

  onSaveRequest(){
    console.log("Handling a save request..");
    this.scooterService.update(this.selectedScooter, this.activeIndex);
    this.activeIndex = null;
    this.detectedChanges = false;
  }

  onDeleteRequest() {
    console.log("Handling a delete request..");
    this.scooterService.remove(this.activeIndex, this.selectedScooter.tag);
    this.scooters = this.scooterService.getScooters();
    this.activeIndex = null;
  }

  onCancelRequest(){
    console.log("Handling a cancel request..");
    this.activeIndex = null;
  }

  sortStatus() {
    if (this.sortingBoolean == true) {
      this.sortingBoolean = false;
      this.orderByStatus();
      console.log("Sorting status: descending");
    } else if (this.sortingBoolean == false) {
      this.sortingBoolean = true;
      this.orderByStatus();
      console.log("Sorting status: ascending");
    }
  }

    orderByStatus(){
        this.scooters = this.scooters.sort((a: any, b: any) => {
        switch(this.sortingBoolean){
        case true:
            if(a.status.valueOf() < b.status.valueOf()){
              return 1;
            } else if (a.status.valueOf() == b.status.valueOf()){
              return 0;
            }
            else if (a.status.valueOf() > b.status.valueOf()){
              return -1;
            }

          case false:
            if(a.status.valueOf() > b.status.valueOf()){
              return 1;
            } else if (a.status.valueOf() == b.status.valueOf()){
              return 0;
            }
            else if (a.status.valueOf() < b.status.valueOf()){
              return -1;
            }
          }
        });
    }

  ngOnInit() {
  }

}
