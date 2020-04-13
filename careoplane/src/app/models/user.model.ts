import { VehicleReservation } from './vehicle-reservation.model';

export class User {
    constructor(
        public username: string,
        public email: string,
        public password: string,
        public name: string,
        public surname: string,
        public city: string,
        public phoneNumber: string,
        public vehicleReservations: VehicleReservation[] = []
    ) {}
}