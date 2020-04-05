export class Vehicle {
    constructor(
        public brand: string,
        public numOfSeats: number,
        public color: string,
        public available: boolean = true
    ) {}
}