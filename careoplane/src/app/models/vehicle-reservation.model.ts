import { Vehicle } from './vehicle.model';

export class VehicleReservation {
    constructor(
        public vehicle: Vehicle,
        public fromDate: Date,
        public fromLocation: string,
        public toDate: Date,
        public toLocation: string,
        public numOfDays: number,
        public price: number,
        public type = 'vehicle'
    ) {}
}