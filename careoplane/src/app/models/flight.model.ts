import { Seat } from './seat.model';

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
        public connections: string[] = [],
        public id: number = null,
        public seats: Seat[] = new Array<Seat>(),
        public pricess: number[] = []
        ){
            this.conCount = connections.length;
        }
}
