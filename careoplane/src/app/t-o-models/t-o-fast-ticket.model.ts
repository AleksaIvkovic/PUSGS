import { TOSeat } from './t-o-seat.model';
import { TOFlight } from './t-o-flight.model';

export class TOFastTicket{
 
    constructor(public seat: TOSeat = null,public flight: TOFlight = null)
    {
    }
}