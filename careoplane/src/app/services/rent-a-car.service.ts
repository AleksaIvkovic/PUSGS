import { Injectable } from '@angular/core';
import { RentACar } from '../models/rent-a-car.model';
import { Vehicle } from '../models/vehicle.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RentACarService {
    pricelist: number[] = [
        100, 150, 250
    ];
    vehicles: Vehicle[] = [
        new Vehicle('Brand 1', 'Car', 4),
        new Vehicle('Brand 2', 'Van', 3),
        new Vehicle('Brand 3', 'Truck', 2),
    ];
    locations: string[] = [
        'Location 1', 'Location 2', 'Location 3'
    ];
    private rentACars: RentACar[] = [
        new RentACar('Rent A Car 1', 'Address 1', 'Description 1', this.vehicles, this.locations),
        new RentACar('Rent A Car 2', 'Address 12', 'Description 2', this.vehicles, this.locations),
        new RentACar('Rent A Car 3', 'Address 3', 'Description 3', this.vehicles, this.locations),
        new RentACar('Rent A Car 4', 'Address 4', 'Description 4', this.vehicles, this.locations),
        new RentACar('Rent A Car 5', 'Address 5', 'Description 5', this.vehicles, this.locations),
        new RentACar('Rent A Car 6', 'Address 6', 'Description 6', this.vehicles, this.locations)
    ];
    rentACarChanged = new Subject<RentACar[]>();

    getRentACars() {
        //slice
    }

    getRentACar(name: string) {
        for (var rentACar of this.rentACars) {
            if (rentACar.name === name) {
                return rentACar;
            }
        }
    }

    getVehicleForRentACar(indexRentACar: number, indexVehicle: number) {
        return this.rentACars[indexRentACar].vehicles[indexVehicle];
    }

    getMockUp(): RentACar[] {
        // const pricelist: number[] = [
        //     100, 150, 250
        // ];
        const vehicles: Vehicle[] = [
            new Vehicle('Brand 1', 'Car', 4),
            new Vehicle('Brand 2', 'Van', 3),
            new Vehicle('Brand 3', 'Truck', 2),
        ];
        const locations: string[] = [
            'Location 1', 'Location 2', 'Location 3'
        ];

        let r1 = new RentACar('Rent A Car 1', 'Address 1', 'Description 1', vehicles, locations);
        let r2 = new RentACar('Rent A Car 12', 'Address 2', 'Description 2', vehicles, locations);
        let r3 = new RentACar('Rent A Car 3', 'Address 23', 'Description 3', vehicles, locations);
        let r4 = new RentACar('Rent A Car 4', 'Address 4', 'Description 4', vehicles, locations);
        let r5 = new RentACar('Rent A Car 5', 'Address 5', 'Description 5', vehicles, locations);
        let r6 = new RentACar('Rent A Car 6', 'Address 6', 'Description 6', vehicles, locations);

        this.rentACars = [
            r1, r2, r3, r4, r5, r6
        ];

        return this.rentACars;
    }

    addRentACar() {
        //this.rentACarChanged.next(this.rentACars.slice());
    }
}
