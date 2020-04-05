import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import {MatSidenavModule} from '@angular/material/sidenav';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTabsModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
