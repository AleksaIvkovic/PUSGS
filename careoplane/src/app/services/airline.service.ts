import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Airline } from '../models/airline.model';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {
  private flight1: Flight = new Flight("Belgrade","London",new Date(2020,5,5,14,23,22,0), new Date(2020,5,5,14,23,22,0), 20, 2500, ["BB", "AA", "CC"], 1500);
  private flight2: Flight = new Flight("Belgrade","Moscow",new Date(2020,5,5,14,23,22,0), new Date(2020,5,5,14,23,22,0), 20, 2500, ["BB", "DD"], 1500);
  private airlines: Airline[] = [
    {name: "Jat",
    address: "Beograd",
    description: "Manji jaci bolji",
    destinations: [],
    flights: [this.flight1, this.flight2],
    cheapFlights: [],
    airplane: [],
    pricess: [],
  },
    {name: "Lufthansa",
    address: "Berlin",
    description: "Sehr gut",
    destinations: [],
    flights: [this.flight2],
    cheapFlights: [],
    airplane: [],
    pricess: [],
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
