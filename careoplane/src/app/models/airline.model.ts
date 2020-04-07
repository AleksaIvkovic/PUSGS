import { Flight } from './flight.model';
import { StringifyOptions } from 'querystring';

export class Airline {

    constructor(
        public name: string, 
        public address: string, 
        public description: string, 
        public destinations: string[], 
        public flights: Flight[],
        public cheapFlights: string[],
        public airplane: [],
        public pricess : []){
    }
}
