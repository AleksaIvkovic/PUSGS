export class Vehicle {
    constructor(
        public brand: string,
        public type: string,
        public numOfSeats: number,
        public unavailableDates: Date[] = []
    ) {}
}