export class Seat {
    constructor(
        public flightId: number = 0,
        public name: string = null,
        public type: string = null,
        public occupied: boolean = false,
        public price: number = 0,
        public discount: number = 0,
        public id: number = 0){}
}
