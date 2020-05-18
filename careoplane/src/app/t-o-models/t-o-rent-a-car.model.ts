import { Vehicle } from '../models/vehicle.model';
import { TOPrimaryObject } from './t-o-primary-object.model';
import { TOVehicle } from './t-o-vehicle.model';

export class TORentACar {
    public constructor(
        public name: string, 
        public address: string,
        public description: string,
        public vehicles: TOVehicle[] = [],
        public locations: TOPrimaryObject[] = [],
        public rating: number = 0,
        public prices: TOPrimaryObject[] = []) {
        }
}