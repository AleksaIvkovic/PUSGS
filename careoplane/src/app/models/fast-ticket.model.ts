import { Seat } from './seat.model';
import { Flight } from './flight.model';

export class FastTicket{
    public newPrice: number
    constructor(public seat: Seat = null, public flight: Flight = null, public airlineName: string = null){
        this.newPrice = Math.fround(seat.price * (1 - (0.01 * seat.discount)));
    }
}