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
import { VehicleDetailsComponent } from './components/main/rent-a-car/rent-a-car-list/rent-a-car-details/vehicle-list/vehicle-item/vehicle-details/vehicle-details.component';
import { VehicleStartComponent } from './components/main/rent-a-car/rent-a-car-list/rent-a-car-details/vehicle-list/vehicle-start/vehicle-start.component';
import { VehicleReserveComponent } from './components/main/rent-a-car/rent-a-car-list/rent-a-car-details/vehicle-list/vehicle-item/vehicle-details/vehicle-reserve/vehicle-reserve.component';
import { RentACarProfileComponent } from './components/main/rent-a-car/rent-a-car-profile/rent-a-car-profile.component';
import { AirlineProfileComponent } from './components/main/airlines/airline-profile/airline-profile.component';
import { AirlineEditComponent } from './components/main/airlines/airline-edit/airline-edit.component';
import { VehicleManagerComponent } from './components/main/rent-a-car/rent-a-car-profile/vehicle-manager/vehicle-manager.component';


const routes: Routes = [
  {path: '', redirectTo:'main', pathMatch: 'full'},
  {path: 'main', component: MainComponent, children: [
    {path:'', redirectTo: 'airlines', pathMatch: 'full'},
    {path: 'airlines', component: AirlinesComponent, children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list', component: AirlinesListComponent},
      {path: ':id/details', component: AirlineDetailsComponent},
      {path: ':alid/:fid/reservation', component: FlightReservationComponent},
      {path: ':alid1/:fid1/:alid2/:fid2/reservation', component: FlightReservationComponent}
    ]},
    {path: 'rent-a-car', component: RentACarComponent, children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list', component: RentACarListComponent},
      {path: ':id/details', component: RentACarDetailsComponent, children: [
        {path: '', component: VehicleStartComponent, pathMatch: 'full'},
        {path: ':idv/details', component: VehicleDetailsComponent},
        {path: ':idv/reserve', component: VehicleReserveComponent}
      ]},
    ]},
    {path: 'rent-a-car-profile', component: RentACarProfileComponent, children: [
      {path: ':idvh/details', component: VehicleDetailsComponent},
      {path: ':idvh/edit', component: VehicleManagerComponent},
      {path: 'add-vehicle', component: VehicleManagerComponent}
    ]},
    {path: 'airline-profile', component: AirlineProfileComponent, children:[
      {path: ':alid/details', component: AirlineDetailsComponent},
      {path: ':alid/edit', component: AirlineEditComponent},
      {path: 'new', component: AirlineEditComponent},
      
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
