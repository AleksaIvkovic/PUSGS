import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Airline } from '../models/airline.model';
import { Flight } from '../models/flight.model';
import { Seat } from '../models/seat.model';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {
  private airlines: Airline[] = [
    new Airline(0,"Jat","Beograd","Manji jaci bolji",[],0,[],[],[5,5,20]),
    new Airline(1,"Lufthansa","Berlin","Sehr gut",[],0,[],[],[]),
  ];
  
  private flight1: Flight = new Flight(this.airlines[0].id,0,"Belgrade","London",new Date(2020,5,5,14,23,22,0), new Date(2020,5,5,14,23,22,0), 20, 2500, ["BB", "AA", "CC"]);
  private flight2: Flight = new Flight(this.airlines[0].id,1,"Belgrade","Moscow",new Date(2020,5,5,14,23,22,0), new Date(2020,5,5,14,23,22,0), 20, 2500, ["BB", "DD"]);
  private flight3: Flight = new Flight(this.airlines[1].id,2,"Belgrade","Moscow",new Date(2020,5,5,14,23,22,0), new Date(2020,5,5,14,23,22,0), 20, 2500, ["BB", "DD"]);
  
  airlinesChanged = new Subject<Airline[]>()
  flightsChanged = new Subject<Flight[]>()
  
  private flights: Flight[] = [
    this.flight1,
    this.flight2,
    this.flight3
  ];
  
  constructor() {
    this.airlines[0].flights.push(this.flight1);
    this.airlines[0].flights.push(this.flight2);
    this.airlines[0].picture = "https://seeklogo.com/images/J/JAT_Jugoslovenski_Aero_Transport-logo-04390D0687-seeklogo.com.png";
    this.airlines[1].flights.push(this.flight3);
    this.airlines[1].picture="https://www.logo-designer.co/wp-content/uploads/2018/02/2018-new-lufthansa-logo-design-airplane-livery.png";
  }
  
  getAirlines(){
    this.airlinesChanged.next(this.airlines.slice());
  }

  getAllFlights(){
    this.flightsChanged.next(this.flights.slice())
  }

  getAirline(id: number): Airline{
    return this.airlines[id];
  }
}
