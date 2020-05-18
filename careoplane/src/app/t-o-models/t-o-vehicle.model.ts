export class TOVehicle {
    constructor(
        public brand: string,
        public type: string,
        public numOfSeats: number,
        public year: number,
        public pricePerDay: number,
        public location: string = '',
        public rating: number = 0,
        public unavailableDates: TOPrimaryObject[] = [],
        public isOnSale: boolean = false,
        public rentACar: string = ''
    ) {}
}