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
import { AirlineEditComponent } from './components/main/airlines/airline-edit/airline-edit.component';
import { VehicleManagerComponent } from './components/main/rent-a-car/rent-a-car-profile/vehicle-manager/vehicle-manager.component';
import { FlightEditComponent } from './components/main/airlines/flight-edit/flight-edit.component';
import { RentACarManagerComponent } from './components/main/rent-a-car/rent-a-car-manager/rent-a-car-manager.component';
import { UserAuthentificationComponent } from './components/user-authentification/user-authentification.component';
import { AirlineFastTicketsComponent } from './components/main/airlines/airline-details/airline-fast-tickets/airline-fast-tickets.component';
import { SeatsEditComponent } from './components/main/airlines/flight-edit/seats-edit/seats-edit.component';
import { SeatDetailsComponent } from './components/main/airlines/flight-edit/seat-details/seat-details.component';
import { SeatStarterComponent } from './components/main/airlines/flight-edit/seat-starter/seat-starter.component';
import { ReservationsComponent } from './components/main/reservations/reservations.component';
import { DiscountsComponent } from './components/main/discounts/discounts.component';
import { FriendsComponent } from './components/main/friends/friends.component';
import { EmailConfirmationComponent } from './components/main/email-confirmation/email-confirmation.component';
import { GraphComponent } from './components/main/graph/graph.component';
import { FlightReservation } from './models/flight-reservation.model';
import { FlightReservationDetailsComponent } from './components/main/reservations/flight-reservation-details/flight-reservation-details.component';


const routes: Routes = [
  {path: '', redirectTo:'main', pathMatch: 'full'},
  {path: 'main', component: MainComponent, children: [
    {path:'', redirectTo: 'airlines', pathMatch: 'full'},
    {path: 'airlines', component: AirlinesComponent, children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list', component: AirlinesListComponent},
      {path: ':id/details', component: AirlineDetailsComponent},
      {path: 'reservation', component: FlightReservationComponent}
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
      {path: 'add-vehicle', component: VehicleManagerComponent},
    ]},
    {path: 'rent-a-car-profile/edit', component: RentACarManagerComponent},
    {path: 'rent-a-car-profile/statistic', component: GraphComponent},
    {path: 'airline-profile', component: AirlinesComponent, children:[
      {path: '', redirectTo: 'details', pathMatch: 'full'},
      {path: 'details', component: AirlineDetailsComponent},
      {path: 'edit', component: AirlineEditComponent},
      {path: 'new', component: AirlineEditComponent},
      {path: ':fid/edit-flight', component: FlightEditComponent},
      {path: 'add-flight', component: FlightEditComponent},
      {path: ':fid/edit-seats', component: SeatsEditComponent, children:[
        {path: '', component:SeatStarterComponent, pathMatch:'full'},
        {path: ':id/seat', component: SeatDetailsComponent}
      ]}
    ]},
    {path: 'new-rent-a-car-profile', component: RentACarManagerComponent, children: [
      {path: 'add-vehicle', component: VehicleManagerComponent},
      {path: ':idvh/details', component: VehicleDetailsComponent},
      {path: ':idvh/edit', component: VehicleManagerComponent},
    ]},
    {path: 'user-profile', component: UserAuthentificationComponent},
    {path: 'reservations', component: ReservationsComponent},
    {path: ':id/:type/flight-reservation-details', component: FlightReservationDetailsComponent},
    {path: 'flight-reservation-details', component: FlightReservationDetailsComponent},
    {path: 'discounts', component: DiscountsComponent},
    {path: 'add-admin', component: UserAuthentificationComponent},
    {path: 'friends', component: FriendsComponent},
    {path: 'confirmation', component: EmailConfirmationComponent}
  ]},
  {path: 'user-authentification', component: UserAuthentificationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
