import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  private errorMessage: string;
  constructor() {
    this.errorMessage = "Page not found!"
  }

  ngOnInit() {
  }

}
