import { Seat } from './seat.model';
import { Flight } from './flight.model';

export class FastTicket{
    public newPrice: number
    constructor(public fastTicketId:number = 0, public seat: Seat = null,public flight: Flight = null){
        this.newPrice = Math.fround(seat.price * (1 - (0.01 * seat.discount)));
    }
}