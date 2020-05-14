import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Airline } from '../models/airline.model';
import { Flight } from '../models/flight.model';
import { Seat } from '../models/seat.model';
import { FastTicket } from '../models/fast-ticket.model';
import { AirlineFastTicketsComponent } from '../components/main/airlines/airline-details/airline-fast-tickets/airline-fast-tickets.component';
import { FlightReservation } from '../models/flight-reservation.model';
import { Http2ServerRequest } from 'http2';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {
  private airlines: Airline[] = [
    new Airline("WizzAir","31 Oxford street, London, UK", "Why wait for a perfecr moment to travel, with us, every moment is perfect",
  [0.5,0.35,0.25],[2,4,2],[3,5,10],[],"",1,["Berlin","Rome","Belgrade","New York","Paris"],[]),
    new Airline("Jat","Beograd","Still going strong",[0.2,0.1,0.05],[3,3],[1,1,15],[],
    "",1,["Belgrade","Paris","New York","London","Rome"]),
  ];

  private flight1: Flight = new Flight("Jat","Belgrade","New York",new Date(2020,5,5,14,23,22,0), new Date(2020,5,5,16,23,22,0), 20, 12, 2000, ["Paris","London"],0);
  private flight2: Flight = new Flight("Jat","Paris","Belgrade",new Date(2020,3,25,14,23,22,0), new Date(2020,3,25,18,23,22,0),16, 12, 1200, ["Rome"],1);
  private flight3: Flight = new Flight("WizzAir","Berlin","Belgrade",new Date(2020,4,6,14,23,22,0), new Date(2020,4,6,16,23,22,0), 18, 12, 1300, ["Rome"],2);
  private flight4: Flight = new Flight("WizzAir","Rome","Berlin",new Date(2020,4,12,14,23,22,0), new Date(2020,4,12,15,23,22,0), 15, 12, 2800, ["Paris", "Belgrade"],3);
  private flight5: Flight = new Flight("Jat","New York","Belgrade",new Date(2020,5,15,14,23,22,0), new Date(2020,5,15,19,23,22,0), 20, 12, 2900, ["London","Paris"],4);

  airlinesChanged = new Subject<Airline[]>()
  flightsChanged = new Subject<Flight[]>()
  ticketsChanged = new Subject<any>();
  emptyTickets = new Subject<any>();
  classType = new Subject<string>();
  ticketDone = new Subject<string>();

  public reservations: FlightReservation[] = []

  public ticketDoneChange(){
    this.ticketDone.next('');
  }

  public updateClassType(newClass: string){
    this.classType.next(newClass);
  }

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
    this.flight4,
    this.flight5
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
              type = "business";
            }
            else{
              type = "economy";
            }

            for(let j = 0;j < airline.segments[i];j++){
              for(let k= 0;k < sum;k++){
                flight.seats.push(new Seat(airline.name,flight.id,count + characters[k],type,false,flight.pricess[i],0));
              }
              count++;
            }
          }
        }
      }
    }

    this.airlines[1].flights.push(this.flight1);
    this.airlines[1].flights.push(this.flight2);
    this.airlines[1].flights.push(this.flight5);
    this.airlines[1].picture = "https://seeklogo.com/images/J/JAT_Jugoslovenski_Aero_Transport-logo-04390D0687-seeklogo.com.png";
    this.airlines[0].flights.push(this.flight3);
    this.airlines[0].flights.push(this.flight4);
    this.airlines[0].picture="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wizz_Air_logo.svg/1280px-Wizz_Air_logo.svg.png";
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

  editAirline(airline: Airline) {
    for(let tempAirline of this.airlines){
      if(tempAirline.name === airline.name){
        tempAirline=airline;
      }
    }
    this.airlinesChanged.next(this.airlines.slice())
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

  getCurrentAirline(): Airline {
    return this.airlines[1];
  }

  EditFlight(flight: Flight) {
    for(let flightTemp of this.flights){
      if(flight.id == flightTemp.id){
        flightTemp = flight;
      }
    }
  }

  AddFlgiht(flight: Flight) {
    flight.id= this.flights.length;
    this.generateSeats(flight);
    for(let airline of this.airlines){
      if(airline.name == flight.airlineName){
        airline.flights.push(flight);
      }
    }
  }

  changeSeatDiscount(seat: Seat) {
    let airline = this.getAirline(seat.airlineName);
    if(seat.discount != 0){
      airline.fastTickets.push(new FastTicket(seat,this.getFlight(seat.FlightId)));
    }
    else{
      for(let fastTicket of airline.fastTickets){
        if(fastTicket.seat.name === seat.name){
          airline.fastTickets.splice(airline.fastTickets.indexOf(fastTicket),1);
          return;
        }
      }
    }
  }

  generateSeats(flight: Flight) {
    for(let airline of this.airlines){
      
      if(flight.airlineName == airline.name){
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
            type = "business";
          }
          else{
            type = "economy";
          }

          for(let j = 0;j < airline.segments[i];j++){
            for(let k= 0;k < sum;k++){
              flight.seats.push(new Seat(airline.name,flight.id,count + characters[k],type,false,flight.pricess[i]));
            }
            count++;
          }
        }
      }
    }
  }
}
