import { TOFastTicket } from './t-o-fast-ticket.model';
import { TOFlight } from './t-o-flight.model';
import { TOPrimaryObject } from './t-o-primary-object.model';

export class TOAirline {
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