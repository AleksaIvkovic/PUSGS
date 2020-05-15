import { Flight } from './flight.model';
import { StringifyOptions } from 'querystring';
import { Seat } from './seat.model';
import { FastTicket } from './fast-ticket.model';

export class Airline {
    name: string; 
    address: string;
    description: string; 
    prices : number[];
    seatingArrangement: number[];
    segments: number[];
    flights: Flight[];
    picture: string;
    rating: number;
    destinations: string[];
    fastTickets: FastTicket[];

    constructor(
        name: string = null, 
        address: string = null,
        description: string = null, 
        prices : number[] = [],
        seatingArrangement: number[] = [],
        segments: number[] = [],
        flights: Flight[] = new Array<Flight>(),
        picture: string = "",
        rating: number = 0,
        destinations: string[] = [],
        fastTickets: FastTicket[] = []){
            this.name = name;
            this.address = address;
            this.description = description;
            this.prices = prices;
            this.seatingArrangement = seatingArrangement;
            this.segments = segments;
            this.flights = flights;
            this.picture = picture;
            this.rating = rating;
            this.destinations = destinations;
            this.fastTickets = fastTickets;
    }
}
