import { TOFastTicket } from './t-o-fast-ticket.model';
import { TOFlight } from './t-o-flight.model';
import { TOPrimaryObject } from './t-o-primary-object.model';
import { Airline } from '../models/airline.model';
import { FastTicket } from '../models/fast-ticket.model';

export class TOAirline {
    public convert(): Airline {
        let airline = new Airline();

        airline.name = this.name;
        airline.address = this.address;
        airline.description = this.description;
        airline.destinations = this.destinations;
        airline.picture = this.picture;
        airline.prices = this.prices;
        airline.rating = this.rating;
        airline.seatingArrangement = this.seatingArrangements;
        airline.segments = this.segmentLengths;

        for(let flight of this.flights){
            let toFlight: TOFlight = Object.assign(new TOFlight(),flight);
            airline.flights.push(toFlight.convert(airline.prices));
        }

        for(let fastTicket of this.fastTickets){
            let flight;
            let seat;
            for(let flightTemp of airline.flights){
                if(fastTicket.flightId == flight.id){
                    flight = flightTemp;
                    for(let seatTemp of flightTemp.seats){
                        if(seatTemp.id == fastTicket.seatId){
                            seat = seatTemp;
                        }
                    }
                }
            }
            airline.fastTickets.push(new FastTicket(fastTicket.fastTicketId, seat, flight));
        }

        return airline;
    }

    constructor(
        public name: string = null, 
        public address: string = null,
        public description: string = null, 
        public prices : TOPrimaryObject[] = [],
        public seatingArrangements: TOPrimaryObject[] = [],
        public segmentLengths: TOPrimaryObject[] = [],
        public flights: TOFlight[] = [],
        public picture: string = "",
        public rating: number = 0,
        public destinations: TOPrimaryObject[] = [],
        public fastTickets: TOFastTicket[] = []){
    }
}