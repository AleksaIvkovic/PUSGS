import { Seat } from './seat.model';
import { TOPrimaryObject } from '../t-o-models/t-o-primary-object.model';

export class Flight {
    public conCount: number;
        
    constructor(
        public airlineName: string = null,
        public origin: string = null,
        public destination: string = null,
        public departure: Date = null,
        public arrival: Date = null, 
        public durationHours: number = null,
        public durationMinutes: number = null,
        public distance: number = null, 
        public connections: TOPrimaryObject[] = [],
        public id: number = null,
        public seats: Seat[] = [],
        public prices: TOPrimaryObject[] = []
        ){
            this.conCount = connections.length;
        }
}
