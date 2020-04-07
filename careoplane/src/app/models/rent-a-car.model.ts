import { Vehicle } from './vehicle.model';

export class RentACar {
    constructor(
        public name: string, 
        public address: string,
        public description: string,
        public vehicles: Vehicle[],
        public locations: string[],
        public rating: number = 0.7,
        public pricelist: { [service: string] : number; } = {}) {
            pricelist['Car'] = 100;
            pricelist['Van'] = 200;
            pricelist['Truck'] = 300;

            this.vehicles.forEach(v => v.location = this.address.split(',')[1]);
            // for (let vehicle of this.vehicles) {
            //     vehicle.location = this.address.split(',')[1];
            // }
        }
}