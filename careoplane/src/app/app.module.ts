import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { AirlinesComponent } from './components/main/airlines/airlines.component';
import { AirlinesListComponent } from './components/main/airlines/airlines-list/airlines-list.component';
import { AirlineDetailsComponent } from './components/main/airlines/airline-details/airline-details.component';
import { AirlineComponent } from './components/main/airlines/airlines-list/airline/airline.component';
import { FlightComponent } from './components/main/airlines/airline-details/flight/flight.component';
import { FlightReservationComponent } from './components/main/airlines/flight-reservation/flight-reservation.component';
import { DateFilterPipe } from './pipes/date-filter.pipe';
import { PriceFilterPipe } from './pipes/price-filter.pipe';
import { HeaderComponent } from './components/main/header/header.component';
import { RentACarComponent } from './components/main/rent-a-car/rent-a-car.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RentACarListComponent } from './components/main/rent-a-car/rent-a-car-list/rent-a-car-list.component';
import { RentACarDetailsComponent } from './components/main/rent-a-car/rent-a-car-list/rent-a-car-details/rent-a-car-details.component';
import { RentACarItemComponent } from './components/main/rent-a-car/rent-a-car-list/rent-a-car-item/rent-a-car-item.component';
import { RentACarStartComponent } from './components/main/rent-a-car/rent-a-car-start/rent-a-car-start.component';
import { VehicleListComponent } from './components/main/rent-a-car/rent-a-car-list/rent-a-car-details/vehicle-list/vehicle-list.component';
import { VehicleItemComponent } from './components/main/rent-a-car/rent-a-car-list/rent-a-car-details/vehicle-list/vehicle-item/vehicle-item.component';
import { VehicleDetailsComponent } from './components/main/rent-a-car/rent-a-car-list/rent-a-car-details/vehicle-list/vehicle-item/vehicle-details/vehicle-details.component';
import { VehicleStartComponent } from './components/main/rent-a-car/rent-a-car-list/rent-a-car-details/vehicle-list/vehicle-start/vehicle-start.component';
import { FilterPipe } from './pipes/filter.pipe';
import { VehicleReserveComponent } from './components/main/rent-a-car/rent-a-car-list/rent-a-car-details/vehicle-list/vehicle-item/vehicle-details/vehicle-reserve/vehicle-reserve.component';
import { MatNativeDateModule, GestureConfig } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OrderByPipe } from './pipes/order-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AirlinesComponent,
    AirlinesListComponent,
    AirlineDetailsComponent,
    AirlineComponent,
    FlightComponent,
    FlightReservationComponent,
    DateFilterPipe,
    PriceFilterPipe,
    HeaderComponent,
    RentACarComponent,
    RentACarListComponent,
    RentACarDetailsComponent,
    RentACarItemComponent,
    RentACarStartComponent,
    VehicleListComponent,
    VehicleItemComponent,
    VehicleDetailsComponent,
    VehicleStartComponent,
    FilterPipe,
    VehicleReserveComponent,
    OrderByPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTabsModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
