export class Seat {
    constructor(
        public flightId: number,
        public name: string,
        public type: string,
        public occupied: boolean = false,
        public price: number = 0,
        public discount: number = 0,
        public id: number = 0){}
}
