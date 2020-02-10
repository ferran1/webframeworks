import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/mainpage/home/home.component";
import {TripsComponent} from "./components/trips/trips.component";
import {ScooterOverviewComponent} from "./components/scooters/scooter-overview/scooter-overview.component";
import {ErrorComponent} from "./components/mainpage/error/error.component";
import {ScooterQueryOverviewComponent} from "./components/scooters/scooter-query-overview/scooter-query-overview.component";
import {ScooterQueryDetailComponent} from "./components/scooters/scooter-query-detail/scooter-query-detail.component";
import {ScooterQueryDetailAformComponent} from "./components/scooters/scooter-query-detail-aform/scooter-query-detail-aform.component";
import {ScooterHttpOverviewComponent} from "./components/scooters/scooter-http-overview/scooter-http-overview.component";
import {ScooterHttpDetailComponent} from "./components/scooters/scooter-http-detail/scooter-http-detail.component";
import {SignOnComponent} from "./components/mainpage/sign-on/sign-on.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {SignUpComponent} from "./components/mainpage/sign-up/sign-up.component";
import {ScooterSpringOverviewComponent} from "./components/scooters/scooter-spring-overview/scooter-spring-overview.component";
import {ScooterSpringDetailComponent} from "./components/scooters/scooter-spring-detail/scooter-spring-detail.component";


const routes: Routes = [
  {path: 'simple-route1', component: HomeComponent },
  {path: '', redirectTo:'simple-route1', pathMatch:'full'},
  {path: 'simple-route2', component: TripsComponent },
  {path: 'simple-route3', component: ScooterOverviewComponent},
  {path: 'simple-route4', component: ScooterQueryOverviewComponent, children: [
  {path: ':edit', component: ScooterQueryDetailComponent}]},
  {path: 'overview-aform', component: ScooterQueryOverviewComponent, children: [
      {path: ':edit', component: ScooterQueryDetailAformComponent}
    ]},
  {path: 'http-route', component: ScooterHttpOverviewComponent, canActivate: [AuthGuardService], children: [
    {path: ':edit', component: ScooterHttpDetailComponent }]},
  {path: 'spring-scooters', component: ScooterSpringOverviewComponent, children: [
      {path: ':edit', component: ScooterSpringDetailComponent }]},
  {path: 'login', component: SignOnComponent},
  {path: 'signup', component: SignUpComponent},
  {path: '**', component: ErrorComponent, data: {message: "Page not found"}},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
