import { TOSeat } from './t-o-seat.model';
import { TOFlight } from './t-o-flight.model';
import { FastTicket } from '../models/fast-ticket.model';

export class TOFastTicket{
 
    constructor(public seatId: number = 0,public flightId: number = 0, public airlineName: string = null)
    {
    }
}