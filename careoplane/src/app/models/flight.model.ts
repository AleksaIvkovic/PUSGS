import { Seat } from './seat.model';

export class Flight {
    public conCount: number;
        
    constructor(
        public airlineName: string,
        public id: number,
        public origin: string,
        public destination: string,
        public departure: Date,
        public arrival: Date, 
        public duration: number,
        public distance: number, 
        public connections: string[],
        public seats: Seat[] = new Array<Seat>(),
        public rating: number = 0,
        public pricess: number[] = []){
            this.conCount = connections.length;
        }
}
