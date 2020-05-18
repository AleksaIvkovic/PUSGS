import { TOVehicle } from './t-o-vehicle.model';

export class TOVehicleReservation {
    constructor(
        public vehicle: TOVehicle,
        public fromDate: string,
        public fromLocation: string,
        public toDate: string,
        public toLocation: string,
        public numOfDays: number,
        public price: number,
        public type = 'vehicle'
    ) {}
}