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
    new Airline("Jat","Beograd","Manji jaci bolji",[2,1.5,1],[3,3],[1,1,2]),
    new Airline("Lufthansa","Berlin","Sehr gut",[4,3,2],[2,4,2],[5,10,40]),
  ];

  private flight1: Flight = new Flight("Jat",0,"Belgrade","London",new Date(2020,5,5,14,23,22,0), new Date(2020,5,5,14,23,22,0), 20, 2500, ["BB", "AA", "CC"]);
  private flight2: Flight = new Flight("Jat",1,"Belgrade","Moscow",new Date(2020,5,5,14,23,22,0), new Date(2020,5,5,14,23,22,0), 16, 2500, ["BB", "DD"]);
  private flight3: Flight = new Flight("Lufthansa",2,"Belgrade","Moscow",new Date(2020,5,5,14,23,22,0), new Date(2020,5,5,14,23,22,0), 18, 2500, ["BB"]);
  private flight4: Flight = new Flight("Lufthansa",3,"Moscow","Belgrade",new Date(2020,5,15,14,23,22,0), new Date(2020,5,5,14,23,22,0), 15, 2500, ["BB", "DD", "CC", "EE"]);
  
  airlinesChanged = new Subject<Airline[]>()
  flightsChanged = new Subject<Flight[]>()
  ticketsChanged = new Subject<any>();
  emptyTickets = new Subject<any>();

  public updateTickes(tickets: any){
    this.ticketsChanged.next(tickets);
  }

  public resetTickets(tickets: any){
    this.emptyTickets.next(tickets);
  }
  
  private flights: Flight[] = [
    this.flight1,
    this.flight2,
    this.flight3,
    this.flight4
  ];
  
  constructor() {
    for(let flight of this.flights){

      for(let airline of this.airlines){
      
        if(flight.airlineName == airline.name){
          for(let i = 0; i < airline.pricess.length; i++){
            flight.pricess.push(flight.distance * airline.pricess[i]);
          }

          let count = 1;
          let characters: string[] = ['A','B','C','D','E','F','G','H','I','J'];
          let sum = 0;
      
          for(let i = 0;i < airline.seatingArrangement.length;i++){
            sum += airline.seatingArrangement[i];
          }
      
          for(let i = 0;i < airline.segments.length;i++){
            let type: string;
            
            if(i == 0){
              type = "first";
            }
            else if(i == 1){
              type == "bussines";
            }
            else{
              type == "economy";
            }

            for(let j = 0;j < airline.segments[i];j++){
              for(let k= 0;k < sum;k++){
                flight.seats.push(new Seat(airline.name,flight.id,count + ' ' + characters[k],type));
              }
              count++;
            }
          }
        }
      }
    }

    this.airlines[0].flights.push(this.flight1);
    this.airlines[0].flights.push(this.flight2);
    this.airlines[0].picture = "https://seeklogo.com/images/J/JAT_Jugoslovenski_Aero_Transport-logo-04390D0687-seeklogo.com.png";
    this.airlines[1].flights.push(this.flight3);
    this.airlines[1].flights.push(this.flight4);
    this.airlines[1].picture="https://www.logo-designer.co/wp-content/uploads/2018/02/2018-new-lufthansa-logo-design-airplane-livery.png";
  }
  
  getAirlines(){
    this.airlinesChanged.next(this.airlines.slice());
  }

  getAllFlights(){
    this.flightsChanged.next(this.flights.slice())
  }

  getAirline(name: string): Airline{
    for(let airline of this.airlines){
      if(airline.name === name){
        return airline;
      }
    }
  }

  addAirline(airline: Airline): void {
    this.airlines.push(airline);
    this.airlinesChanged.next(this.airlines.slice());
  }

  editAirline() {
    this.airlinesChanged.next(this.airlines.slice());
  }

  getFlight(id: number): Flight {
    return this.flights[id];
  }

  verifyName(value: string) {
    for(let tempAirline of this.airlines){
      if(tempAirline.name.toLowerCase() === value.toLowerCase()){
        return false;
      }
    }

    return true;
  }
}
