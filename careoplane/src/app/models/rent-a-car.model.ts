import { Vehicle } from './vehicle.model';

export class RentACar {
    public constructor(
        public name: string, 
        public address: string,
        public description: string,
        public vehicles: Vehicle[] = [],
        public locations: string[] = [],
        public rating: number = 0,
        public prices: number[] = [0, 0, 0],
        public pricelist: { [service: string] : number; } = {}) {
            pricelist['Car'] = prices[0];
            pricelist['Van'] = prices[1];
            pricelist['Truck'] = prices[2];

            let location: string = this.address.split(',')[1];
            this.vehicles.forEach(
                v => {
                    v.location = location.substr(1);
                    v.rentACar = name;
                });
        }
}