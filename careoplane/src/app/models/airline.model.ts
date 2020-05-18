import { Flight } from './flight.model';
import { StringifyOptions } from 'querystring';
import { Seat } from './seat.model';
import { FastTicket } from './fast-ticket.model';

export class Airline {

    constructor(
        public name: string = null, 
        public address: string = null,
        public description: string = null, 
        public prices : number[] = [],
        public seatingArrangement: number[] = [],
        public segments: number[] = [],
        public flights: Flight[] = [],
        public picture: string = "",
        public rating: number = 0,
        public destinations: string[] = [],
        public fastTickets: FastTicket[] = []){
    }
}