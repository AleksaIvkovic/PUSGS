import { PriceSegmentSeat } from '../models/price-segment-seat.model';

export class TOPriceSegmentSeat {
    constructor(
        public id: number = 0,
        public value: number = 0,
        public ordinal: number = 0,
        public airline: string = null
        ){}

    public convert(): PriceSegmentSeat{
        let pSS = new PriceSegmentSeat();

        pSS.airline = this.airline;
        pSS.id = this.id;
        pSS.ordinal = this.ordinal;
        pSS.value = this.value;
        
        return pSS;
    }
}