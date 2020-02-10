import { Component, OnInit } from '@angular/core';
import {Scooter, ScooterStatus} from "../../../models/scooter";
import {Scooters2Service} from "../../../services/scooters2.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SpringScootersService} from "../../../services/spring-scooters.service";

@Component({
  selector: 'app-scooter-spring-overview',
  templateUrl: './scooter-spring-overview.component.html',
  styleUrls: ['./scooter-spring-overview.component.css']
})
export class ScooterSpringOverviewComponent implements OnInit {

  private scooters: Scooter[];
  private selectedScooter: Scooter;
  protected activeIndex: number;
  private sortingToggle: boolean;
  private detectedChanges: boolean;
  private scooterStatus;

  constructor(private scooterService: SpringScootersService,
              private router: Router, private activatedRoute: ActivatedRoute) {
    this.sortingToggle = false;
    this.detectedChanges = false;
    this.scooterStatus = ScooterStatus;
    this.scooters = scooterService.getScooters();
  }

  onDetectedChanges(event){
    this.detectedChanges = event;
  }

  onAdd(){
    this.scooterService.add(this.scooterService.generateRandomScooter());
  }

  onResetRequest(){
    this.detectedChanges = false;
  }

  onSelected(index) {
    if (this.detectedChanges) {
      let confirmation = confirm("Are you sure you want to discard unsaved changes?");
      switch (confirmation) {
        case true:
          console.log(this.scooters[index]);
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
    this.router.navigate(['/spring-scooters'])
  }

  onCancelRequest(){
    console.log("Handling a cancel request..");
    this.router.navigate(['/spring-scooters'])
    this.detectedChanges = false;
  }

  sortStatus() {
    if (this.sortingToggle == true) {
      this.sortingToggle = false;
      this.orderByStatus();
      console.log("Sorting status: descending");
    } else if (this.sortingToggle == false) {
      this.sortingToggle = true;
      this.orderByStatus();
      console.log("Sorting status: ascending");
    }
  }

  orderByStatus(){
    this.scooters = this.scooters.sort((a: any, b: any) => {
      switch(this.sortingToggle){
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
    this.scooters = this.scooterService.getScooters();
    console.log(this.scooters);
  }

}
