import { Flight } from './flight.model';
import { StringifyOptions } from 'querystring';
import { Seat } from './seat.model';

export class Airline {
    constructor(
        public id: number,
        public name: string, 
        public address: string, 
        public description: string, 
        public destinations: string[],
        public rating: number,
        public pricess : number[],
        public seatingArrangement: number[],
        public segments: number[],
        public flights: Flight[] = new Array<Flight>(),
        public picture: string = ""){
    }
}
