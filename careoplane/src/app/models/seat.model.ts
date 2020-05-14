export class Seat {
    constructor(
        public airlineName: string,
        public FlightId: number,
        public name: string,
        public type: string,
        public occupied: boolean = false,
        public price: number = 0,
        public discount: number = 0,
        public id: number = 0){}
}
