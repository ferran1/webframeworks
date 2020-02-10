import{Component, OnInit}from '@angular/core';
import {SessionService} from "../../../services/session.service";


@Component({
selector: 'app-navbar',
templateUrl: './nav-bar.component.html',
styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {


constructor(private sessionService: SessionService){


}

ngOnInit(){

}
}
