import { Vehicle } from './vehicle.model';

export class RentACar {
    constructor(
        public name: string, 
        public adress: string,
        public description: string,
        public pricelist: string[],
        public vehicles: Vehicle[],
        public locations: string[]) {}
}