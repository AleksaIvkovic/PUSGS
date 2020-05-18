import { Seat } from './seat.model';
import { TOPrimaryObject } from '../t-o-models/t-o-primary-object.model';

export class Flight {
    public conCount: number;
    public durationHours: number;
    public durationMinutes: number;
            
    constructor(
        public airlineName: string = null,
        public origin: string = null,
        public destination: string = null,
        public departure: Date = null,
        public arrival: Date = null, 
        public distance: number = null, 
        public connections: TOPrimaryObject[] = [],
        public id: number = null,
        public seats: Seat[] = [],
        public prices: TOPrimaryObject[] = []
        ){
            this.conCount = connections.length;
            let time = new Date(arrival).valueOf() - new Date(departure).valueOf();
            this.durationHours = Math.floor(time/36e5);
            this.durationMinutes = Math.floor(((time/36e5) -  Math.floor(time/36e5))*60);
        }
}
