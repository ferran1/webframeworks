import { Injectable } from '@angular/core';
import {SessionService} from "./session.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, public sessionService: SessionService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(!this.sessionService.isAuthenticated()){
      this.router.navigate(['/login'], {queryParams: {return: state.url}});
      return false;
    }
    return true;
  }

}

