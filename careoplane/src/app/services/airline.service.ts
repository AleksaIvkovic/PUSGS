import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Airline } from '../models/airline.model';
import { Flight } from '../models/flight.model';
import { Seat } from '../models/seat.model';
import { FastTicket } from '../models/fast-ticket.model';
import { AirlineFastTicketsComponent } from '../components/main/airlines/airline-details/airline-fast-tickets/airline-fast-tickets.component';
import { FlightReservation } from '../models/flight-reservation.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TOPrimaryObject } from '../t-o-models/t-o-primary-object.model';
import { TOAirline } from '../t-o-models/t-o-airline.model';
import { TOFlight } from '../t-o-models/t-o-flight.model';
import { TOSeat } from '../t-o-models/t-o-seat.model';
import { TOFastTicket } from '../t-o-models/t-o-fast-ticket.model';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {
  private airlines: Airline[] = [];
  private flights: Flight[] = [];
  airlinesChanged = new Subject<Airline[]>()
  flightsChanged = new Subject<Flight[]>()
  ticketsChanged = new Subject<any>();
  emptyTickets = new Subject<any>();
  classType = new Subject<string>();
  ticketDone = new Subject<string>();
  flightListChange = new Subject<number>();
  airlineFlightList = new Subject<Airline>();
  airlineFastTicketList = new Subject<Airline>();
  flightSeatsEdit = new Subject<Flight>();
  flightChosenSeat = new Subject<Flight>();
  reservations: FlightReservation[] = []
  images: { [airline : string] : string; } = {}


  public airlineLoaded(airline :Airline){
    this.airlineFlightList.next(airline);
    this.airlineFastTicketList.next(airline);
  }

  public flightLoaded(flight : Flight){
    this.flightSeatsEdit.next(flight);
  }

  public flightChosen(flight: Flight){
    this.flightChosenSeat.next(flight);
  }

  public ticketDoneChange(){
    this.ticketDone.next('');
  }

  public flightListChanged(id: number){
    this.flightListChange.next(id);
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
  
  constructor(private http: HttpClient, private datePipe: DatePipe) {
  }
  
  //treba obrisati
  getAirlines(){
    this.airlinesChanged.next(this.airlines.slice());
  }

  getAirlinesDB(){
    let address ='http://localhost:' + localStorage.getItem('port') + '/api/Airlines';
    return this.http.get<TOAirline[]>(address);
  }

  //treba obrisati
  getAllFlights(){
    this.flightsChanged.next(this.flights.slice())
  }

  getAllFlightsDB(){
    let address ='http://localhost:' + localStorage.getItem('port') + '/api/Flights';
    return this.http.get<TOFlight[]>(address);
  }

  getSearchedFlightsDB(origin: string, destination: string,  departure: Date, num: number, classType: string){
    let address ='http://localhost:' + localStorage.getItem('port') + '/api/Flights/Searched';
    var params = new HttpParams()
      .append('origin',origin)
      .append('destination',destination)
      .append('departure', this.datePipe.transform(departure, 'dd.MM.yyyy HH:mm'))
      .append('numPassengers',num.toString())
      .append('classType',classType);

    return this.http.get<TOFlight[]>(address, {params: params});
  }

  //treba obrisati
  getAirline(name: string) : Airline{
    for(let airline of this.airlines){
      if(airline.name === name){
        return airline;
      }
    }
  }

  getAirlineDB(name : string){
    let address ='http://localhost:' + localStorage.getItem('port') + '/api/Airlines/' + name;
    return this.http.get<TOAirline>(address);
  }

  addAirline(airline: Airline) {
    let tempAirline = new TOAirline(airline.name,airline.address,airline.description,airline.prices,airline.seatingArrangement,airline.segments,[],airline.picture,airline.rating,airline.destinations,[]);
    let address ='http://localhost:' + localStorage.getItem('port') + '/api/Airlines';
    return this.http.post(address,tempAirline);
  }

  editAirline(airline: Airline) {
    let tempAirline = new TOAirline(airline.name,airline.address,airline.description,airline.prices,airline.seatingArrangement,airline.segments,[],airline.picture,airline.rating,airline.destinations,[]);
    for(let flight of airline.flights){
      let tempFlight = new TOFlight(flight.airlineName,flight.origin,flight.destination,flight.departure.toString(),flight.arrival.toString(),flight.distance,flight.connections,flight.id,[]);
      for(let seat of flight.seats){
        tempFlight.seats.push(new TOSeat(seat.id,seat.name,seat.type,seat.occupied,seat.price,seat.discount,seat.id));
      }
      tempAirline.flights.push(tempFlight);
    }
    
    for(let fastTicket of airline.fastTickets){
      tempAirline.fastTickets.push(new TOFastTicket(fastTicket.seat.id,fastTicket.flight.id));
    }

    let address ='http://localhost:' + localStorage.getItem('port') + '/api/Airlines/' + tempAirline.name;
    for(let airlineI of this.airlines){
      if(airlineI.name == airline.name){
        airlineI = airline;
      }
    }
    return this.http.put(address,tempAirline);
  }

  //treba obrisati
  getFlight(id: number): Flight {
    return this.flights[id];
  }

  getFlightDB(id: number){
    let address ='http://localhost:' + localStorage.getItem('port') + '/api/Flights/' + id;
    return this.http.get<TOFlight>(address); 
  }

  //treba obrisati
  verifyName(value: string) {
    for(let tempAirline of this.airlines){
      if(tempAirline.name.toLowerCase() === value.toLowerCase()){
        return false;
      }
    }
    return true;
  }

  //treba obrisati
  getCurrentAirline(): Airline {
    return this.airlines[1];
  }

  //izmeni da radi sa DB
  EditFlight(flight: Flight) {
    let address ='http://localhost:' + localStorage.getItem('port') + '/api/Flights/' + flight.id.toString();
    let tempFlight = new TOFlight(flight.airlineName,flight.origin,flight.destination,flight.departure.toString(),flight.arrival.toString(),flight.distance,flight.connections,flight.id,[]);
    return this.http.put(address,tempFlight);
  }

  //izmeni da radi sa DB
  AddFlgiht(flight: Flight) {
    let address ='http://localhost:' + localStorage.getItem('port') + '/api/Flights';
    let tempFlight = new TOFlight(flight.airlineName,flight.origin,flight.destination,flight.departure.toString(),flight.arrival.toString(),flight.distance,flight.connections,flight.id,[]);
    return this.http.post(address,tempFlight);
  }

  DeleteFlight(id: number){
    let address ='http://localhost:' + localStorage.getItem('port') + '/api/Flights/' + id.toString();
    return this.http.delete(address);
  }

  //izmeni da radi sa DB
  changeSeatDiscount(seat: Seat) {
    let flight = this.getFlight(seat.flightId)
    let airline = this.getAirline(flight.airlineName);
    if(seat.discount != 0){
      airline.fastTickets.push(new FastTicket(0,seat,this.getFlight(seat.flightId)));
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
}
