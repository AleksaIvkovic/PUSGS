import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Airline } from '../models/airline.model';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {
  private flight: Flight = new Flight(new Date(2020,5,5,14,23,22,0), new Date(2020,5,5,14,23,22,0), new Date(2020,5,5,14,23,22,0), ["BB"], 1500);
  private airlines: Airline[] = [
    {name: "Jat",
    address: "Beograd",
    description: "Manji jaci bolji",
    destinations: [],
    flights: [this.flight]
  },
    {name: "Lufthansa",
    address: "Berlin",
    description: "Sehr gut",
    destinations: [],
    flights: []
  },];
  
  airlinesChanged = new Subject<Airline[]>()

  constructor() { }

  getAirlines(){
    this.airlinesChanged.next(this.airlines.slice());
  }

  getAirline(id: number): Airline{
    return this.airlines[id];
  }
}
