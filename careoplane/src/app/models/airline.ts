import { Flight } from './flight';
import { StringifyOptions } from 'querystring';

export class Airline {
    public name: string;
    public address: string; //lokacija treba ovde da bude cela cuvana
    public description: string;
    public destinations: string[];
    public flights: Flight[];
    //ima jos za sada dosta

    constructor(name: string, address: string, description: string, destinations: string[], flights: Flight[]){
        this.name = name;
        this.address = address;
        this.description = description;
        this.destinations = destinations;
        this.flights = flights;
    }
}
