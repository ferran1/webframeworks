import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../../services/session.service";

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component implements OnInit {
  private currentDate: number;

  constructor(private sessionService: SessionService) {
    this.currentDate = Date.now();
  }

  ngOnInit() {
  }

}
