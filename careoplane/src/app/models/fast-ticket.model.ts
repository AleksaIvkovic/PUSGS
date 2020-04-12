import { Seat } from './seat.model';
import { Flight } from './flight.model';

export class FastTicket{
    constructor(public seat: Seat = null,public flight: Flight = null){}
}