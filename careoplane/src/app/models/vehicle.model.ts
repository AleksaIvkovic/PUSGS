export class Vehicle {
    constructor(
        public brand: string,
        public type: string,
        public numOfSeats: number,
        public year: number,
        public pricePerDay: number,
        public rating: number = 0,
        public unavailableDates: Date[] = []
    ) {}
}