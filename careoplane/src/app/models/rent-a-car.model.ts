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
            pricelist['Rent a car'] = 100;
            pricelist['Rent a van'] = 200;
            pricelist['Rent a truck'] = 300;
        }
}