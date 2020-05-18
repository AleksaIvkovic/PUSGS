import { TOSeat } from './t-o-seat.model';
import { TOPrimaryObject } from './t-o-primary-object.model';

export class TOFlight {
    constructor(
        public airlineName: string = null,
        public origin: string = null,
        public destination: string = null,
        public departure: string = null,
        public arrival: string = null, 
        public durationHours: number = null,
        public durationMinutes: number = null,
        public distance: number = null, 
        public connections: TOPrimaryObject[] = [],
        public id: number = null,
        public seats: TOSeat[] = []
        ){
        }
}
