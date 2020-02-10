import { Component, OnInit } from '@angular/core';
import {Scooter} from "../../../models/scooter";
import {ScootersService} from "../../../services/scooters.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Scooters2Service} from "../../../services/scooters2.service";

@Component({
  selector: 'app-scooter-query-overview',
  templateUrl: './scooter-query-overview.component.html',
  styleUrls: ['./scooter-query-overview.component.css']
})
export class ScooterQueryOverviewComponent implements OnInit {
  private scooters: Scooter[];
  private selectedScooter: Scooter;
  private activeIndex: number;
  private sortingBoolean: boolean;

  private detectedChanges: boolean;

  constructor(private scooterService: ScootersService, private router: Router, private activatedRoute: ActivatedRoute) {
    console.log(this.activatedRoute);

    this.sortingBoolean = false;
    this.detectedChanges = false;
    this.scooters = this.scooterService.getScooters();
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
          this.selectedScooter = Scooter.trueCopy(this.scooters[index]);
          this.activeIndex = index;
          this.detectedChanges = false;
          this.router.navigate(['edit'],
            {
              relativeTo: this.activatedRoute,
              queryParams: {tag: this.selectedScooter.tag}
            });
          break;
        case false:
          console.log("Selection not changed");
      }
    } else {
      this.detectedChanges = false;
      this.activeIndex = index;
      this.selectedScooter = Scooter.trueCopy(this.scooters[index]);
      this.router.navigate(['edit'],
        {
          relativeTo: this.activatedRoute,
          queryParams: {tag: this.selectedScooter.tag}
        });
    }
  }

  onSaveRequest(event){
    console.log("Handling a save request..");
    this.scooterService.update(event, this.activeIndex);
    this.activeIndex = null;
    this.detectedChanges = false;
  }

  onDeleteRequest() {
    console.log("Handling a delete request..");
    this.scooterService.remove(this.activeIndex, this.selectedScooter.tag);
    this.scooters = this.scooterService.getScooters();
    this.activeIndex = null;
    this.router.navigate(['/simple-route4'])
  }

  onCancelRequest(){
    console.log("Handling a cancel request..");
    this.router.navigate(['/simple-route4'])
    this.detectedChanges = false;
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
          break;
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
