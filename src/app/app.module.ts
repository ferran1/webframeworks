import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/mainpage/header/header.component';
import { HomeComponent } from './components/mainpage/home/home.component';
import { NavBarComponent } from './components/mainpage/nav-bar/nav-bar.component';
import { TripsComponent } from './components/trips/trips.component';
import { Overview2Component } from './components/trips/overview2/overview2.component';
import { Detail2Component } from './components/trips/detail2/detail2.component';
import { Overview3Component } from './components/trips/overview3/overview3.component';
import { Detail3Component } from './components/trips/detail3/detail3.component';
import { ScooterOverviewComponent } from './components/scooters/scooter-overview/scooter-overview.component';
import { ScooterDetailComponent } from './components/scooters/scooter-detail/scooter-detail.component';
import { ErrorComponent } from './components/mainpage/error/error.component';
import { ScooterQueryOverviewComponent } from './components/scooters/scooter-query-overview/scooter-query-overview.component';
import { ScooterQueryDetailComponent } from './components/scooters/scooter-query-detail/scooter-query-detail.component';
import { ScooterQueryDetailAformComponent } from './components/scooters/scooter-query-detail-aform/scooter-query-detail-aform.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ScooterHttpOverviewComponent } from './components/scooters/scooter-http-overview/scooter-http-overview.component';
import { ScooterHttpDetailComponent } from './components/scooters/scooter-http-detail/scooter-http-detail.component';
import {Header2Component} from "./components/mainpage/header2/header2.component";
import { SignOnComponent } from './components/mainpage/sign-on/sign-on.component';
import {AuthInterceptor} from "./auth-interceptor";
import {SessionService} from "./services/session.service";
import { SignUpComponent } from './components/mainpage/sign-up/sign-up.component';
import { ScooterSpringOverviewComponent } from './components/scooters/scooter-spring-overview/scooter-spring-overview.component';
import { ScooterSpringDetailComponent } from './components/scooters/scooter-spring-detail/scooter-spring-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavBarComponent,
    HomeComponent,
    TripsComponent,
    Overview2Component,
    Detail2Component,
    Overview3Component,
    Detail3Component,
    ScooterOverviewComponent,
    ScooterDetailComponent,
    ErrorComponent,
    ScooterQueryOverviewComponent,
    ScooterQueryDetailComponent,
    ScooterQueryDetailAformComponent,
    ScooterHttpOverviewComponent,
    ScooterHttpDetailComponent,
    Header2Component,
    SignOnComponent,
    SignUpComponent,
    ScooterSpringOverviewComponent,
    ScooterSpringDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [SessionService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})



export class AppModule { }
