import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { AirlinesListComponent } from './components/main/airlines/airlines-list/airlines-list.component';
import { AirlineDetailsComponent } from './components/main/airlines/airline-details/airline-details.component';
import { AirlinesComponent } from './components/main/airlines/airlines.component';
import { FlightReservationComponent } from './components/main/airlines/flight-reservation/flight-reservation.component';
import { RentACarComponent } from './components/main/rent-a-car/rent-a-car.component';
import { RentACarListComponent } from './components/main/rent-a-car/rent-a-car-list/rent-a-car-list.component';
import { RentACarDetailsComponent } from './components/main/rent-a-car/rent-a-car-list/rent-a-car-details/rent-a-car-details.component';
import { RentACarStartComponent } from './components/main/rent-a-car/rent-a-car-start/rent-a-car-start.component';


const routes: Routes = [
  {path: '', redirectTo:'/main', pathMatch: 'full'},
  {path: 'main', component: MainComponent, children: [
    {path: 'airlines', component: AirlinesComponent, children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list', component: AirlinesListComponent},
      {path: ':id/details', component: AirlineDetailsComponent},
      {path: ':alid/:fid/reservation', component: FlightReservationComponent}
    ]},
    {path: 'rent-a-car', component: RentACarComponent, children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list', component: RentACarListComponent},
      {path: ':id/details', component: RentACarDetailsComponent},
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
