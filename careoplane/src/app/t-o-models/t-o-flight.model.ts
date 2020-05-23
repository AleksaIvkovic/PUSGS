import { TOSeat } from './t-o-seat.model';
import { TOPrimaryObject } from './t-o-primary-object.model';
import { Flight } from '../models/flight.model';

export class TOFlight {
    constructor(
        public airlineName: string = null,
        public origin: string = null,
        public destination: string = null,
        public departure: string = null,
        public arrival: string = null, 
        public distance: number = null, 
        public connections: TOPrimaryObject[] = [],
        public flightId: number = null,
        public seats: TOSeat[] = []
        ){}

        public convert(prices: TOPrimaryObject[]): Flight {
            let flight: Flight = new Flight(this.airlineName,this.origin,this.destination,new Date(this.departure), new Date(this.arrival),this.distance,this.connections,this.flightId,[],prices);
    
            for(let seat of this.seats){
                let toSeat: TOSeat = Object.assign(new TOSeat(),seat);
                flight.seats.push(toSeat.convert());
            }
    
            return flight;
        }
}
