import { Vehicle } from '../models/vehicle.model';

export class TORentACar {
    public constructor(
        public name: string, 
        public address: string,
        public description: string,
        public vehicles: TOVehicle[] = [],
        public locations: TOPrimaryObject[] = [],
        public rating: number = 0,
        public prices: TOPrimaryObject[] = [0, 0, 0],
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