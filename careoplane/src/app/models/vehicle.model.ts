export class Vehicle {
    constructor(
        public brand: string,
        public type: string,
        public numOfSeats: number,
        public year: number,
        public pricePerDay: number,
        public location: string = '',
        public rating: number = 0,
        public unavailableDates: Date[] = []
    ) {}
}