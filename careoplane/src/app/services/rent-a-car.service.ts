import { Injectable } from '@angular/core';
import { RentACar } from '../models/rent-a-car.model';
import { Vehicle } from '../models/vehicle.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RentACarService {
    private rentACars: RentACar[] = [];
    rentACarChanged = new Subject<RentACar[]>();

    getRentACars() {
        //slice
    }

    getRentACar(index: number) {
        return this.rentACars[index];
    }

    getVehicleForRentACar(indexRentACar: number, indexVehicle: number) {
        return this.rentACars[indexRentACar].vehicles[indexVehicle];
    }

    getMockUp(): RentACar[] {
        const pricelist: string[] = [
            'Price 1', 'Price 2', 'Price 3'
        ];
        const vehicles: Vehicle[] = [
            new Vehicle('Brand 1', 'Car', 4),
            new Vehicle('Brand 2', 'Van', 3),
            new Vehicle('Brand 3', 'Truck', 2),
        ];
        const locations: string[] = [
            'Location 1', 'Location 2', 'Location 3'
        ];

        let r1 = new RentACar('Rent A Car 1', 'Adress 1', 'Description 1', pricelist, vehicles, locations);
        let r2 = new RentACar('Rent A Car 2', 'Adress 2', 'Description 2', pricelist, vehicles, locations);
        let r3 = new RentACar('Rent A Car 3', 'Adress 3', 'Description 3', pricelist, vehicles, locations);
        let r4 = new RentACar('Rent A Car 4', 'Adress 4', 'Description 4', pricelist, vehicles, locations);
        let r5 = new RentACar('Rent A Car 5', 'Adress 5', 'Description 5', pricelist, vehicles, locations);
        let r6 = new RentACar('Rent A Car 6', 'Adress 6', 'Description 6', pricelist, vehicles, locations);

        this.rentACars = [
            r1, r2, r3, r4, r5, r6
        ];

        return this.rentACars;
    }

    addRentACar() {
        //this.rentACarChanged.next(this.rentACars.slice());
    }
}
