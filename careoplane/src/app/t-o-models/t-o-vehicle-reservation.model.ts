import { TOVehicle } from './t-o-vehicle.model';
import { User } from '../models/user.model';
import { VehicleReservation } from '../models/vehicle-reservation.model';
import { TOUser } from './t-o-user.model';
import { TORentACar } from './t-o-rent-a-car.model';

export class TOVehicleReservation {
    constructor(
        public rentACar: TORentACar,
        public userName: string,
        public vehicleId: number,
        public fromDate: string,
        public fromLocation: string,
        public toDate: string,
        public toLocation: string,
        public numOfDays: number,
        public price: number,
        public type = 'vehicle'
    ) {}

    public ToRegular(): VehicleReservation {
        //Treba getovati vozilo po vehicleId-u
        return new VehicleReservation(
            this.vehicleId,
            new Date(this.fromDate),
            this.fromLocation,
            new Date(this.toDate),
            this.toLocation,
            this.numOfDays,
            this.price
        );
    }
}