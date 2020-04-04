import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { AirlinesComponent } from './main/airlines/airlines.component';
import { AirlinesListComponent } from './main/airlines/airlines-list/airlines-list.component';
import { AirlineDetailsComponent } from './main/airlines/airline-details/airline-details.component';
import { AirlineComponent } from './main/airlines/airlines-list/airline/airline.component';
import { FlightComponent } from './main/airlines/airline-details/flight/flight.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AirlinesComponent,
    AirlinesListComponent,
    AirlineDetailsComponent,
    AirlineComponent,
    FlightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
