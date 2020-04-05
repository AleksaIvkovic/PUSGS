import { Injectable } from '@angular/core';
import { RentACarService } from './rent-a-car.service';

@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    constructor(private rentACarService: RentACarService) {}

    getVehicleForRentACar(indexRentACar: number, indexVehicle: number) {
        let rentACar = this.rentACarService.getRentACar(indexRentACar);
        return rentACar.vehicles[indexVehicle];
    }
}