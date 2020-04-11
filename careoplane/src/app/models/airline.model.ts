import { Flight } from './flight.model';
import { StringifyOptions } from 'querystring';
import { Seat } from './seat.model';

export class Airline {
    constructor(
        public name: string = null, 
        public address: string = null,
        public description: string = null, 
        public pricess : number[] = [],
        public seatingArrangement: number[] = [],
        public segments: number[] = [],
        public flights: Flight[] = new Array<Flight>(),
        public picture: string = "",
        public rating: number = null,
        public destinations: string[] = []){
    }
}
