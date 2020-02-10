import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../../services/session.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-sign-on',
  templateUrl: './sign-on.component.html',
  styleUrls: ['./sign-on.component.css']
})
export class SignOnComponent implements OnInit{
  private email: string;
  private password: string;
  private returnUrl: string;
  private error: string;

  constructor(private sessionService: SessionService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe( params => this.returnUrl = params['return'] || '/');
  }

  authenticate() {
    console.log(this.email, this.password);
    this.sessionService.signIn(this.email, this.password).subscribe(
      (data) => {
        console.log("Processing data: " + data);
      },
      error => {
        this.error = "Authentication error: " + error
      },
      () => {
        this.router.navigateByUrl(this.returnUrl)
      }
    );
  }

}
