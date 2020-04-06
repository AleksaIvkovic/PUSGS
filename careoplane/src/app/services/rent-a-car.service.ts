import { Injectable } from '@angular/core';
import { RentACar } from '../models/rent-a-car.model';
import { Vehicle } from '../models/vehicle.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RentACarService {
    vehicles: Vehicle[] = [
        new Vehicle('BMW', 'Car', 5, 2019, 200),
        new Vehicle('Mercedes-Benz', 'Van', 3, 2015, 150),
        new Vehicle('FAP', 'Truck', 2, 2014, 200),
        new Vehicle('BMW', 'Car', 5, 2016, 220),
        new Vehicle('Mercedes-Benz', 'Van', 3, 2018, 180),
        new Vehicle('FAP', 'Truck', 2, 2020, 170),
        new Vehicle('BMW', 'Car', 5, 2016, 130),
        new Vehicle('Mercedes-Benz', 'Van', 3, 2019, 140),
        new Vehicle('FAP', 'Truck', 2, 2015, 100),
    ];
    
    private rentACars: RentACar[] = [
        new RentACar('UNI LINE TTR', 'Bulevar Patrijarha Pavla 17, Novi Sad', 'Description 1', this.vehicles, ['Novi Sad']),
        new RentACar('Europcar', 'Bulevar Jase Tomica 2, Novi Sad', 'Description 2', this.vehicles, ['Novi Sad', 'Beograd']),
        new RentACar('INEX', 'Micurinova 68A, Novi Sad', 'Description 3', this.vehicles, ['Novi Sad']),
        new RentACar('Union', 'Brankova 12, Beograd', 'Description 4', this.vehicles, ['Beograd']),
        new RentACar('Rent A Car 29', 'Vojvode Stepe 29, Indjija', 'Description 5', this.vehicles, ['Indjija']),
        new RentACar('Avis', 'Mose Pijade 18, Pancevo', 'Description 6', this.vehicles, ['Pancevo', 'Indjija'])
    ];
    rentACarChanged = new Subject<RentACar[]>();

    getRentACars() {
        //slice
    }

    getRentACar(name: string): RentACar {
        for (var rentACar of this.rentACars) {
            if (rentACar.name === name) {
                return rentACar;
            }
        }
    }

    getVehicleForRentACar(indexRentACar: number, indexVehicle: number) {
        return this.rentACars[indexRentACar].vehicles[indexVehicle];
    }

    getVehicleTypes(rentACarName: string): string[] {
        const rentACar = this.getRentACar(rentACarName);
        const ret: string[] = [];

        for (let vehicle of rentACar.vehicles) {
            if (!(ret.indexOf(vehicle.type) > -1)) {
                ret.push(vehicle.type);
            }
        }

        return ret;
    }

    getMockUp(): RentACar[] {
        const vehicles: Vehicle[] = [
            new Vehicle('BMW', 'Car', 5, 2019, 200),
            new Vehicle('Mercedes-Benz', 'Van', 3, 2015, 150),
            new Vehicle('FAP', 'Truck', 2, 2014, 200),
            new Vehicle('BMW', 'Car', 5, 2016, 220),
            new Vehicle('Mercedes-Benz', 'Van', 3, 2018, 180),
            new Vehicle('FAP', 'Truck', 2, 2020, 170),
            new Vehicle('BMW', 'Car', 5, 2016, 130),
            new Vehicle('Mercedes-Benz', 'Van', 3, 2019, 140),
            new Vehicle('FAP', 'Truck', 2, 2015, 100),
        ];

        this.rentACars = [
            new RentACar('UNI LINE TTR', 'Bulevar Patrijarha Pavla 17, Novi Sad', 'Description 1', this.vehicles, ['Novi Sad']),
            new RentACar('Europcar', 'Bulevar Jase Tomica 2, Novi Sad', 'Description 2', this.vehicles, ['Novi Sad', 'Beograd']),
            new RentACar('INEX', 'Micurinova 68A, Novi Sad', 'Description 3', this.vehicles, ['Novi Sad']),
            new RentACar('Union', 'Brankova 12, Beograd', 'Description 4', this.vehicles, ['Beograd']),
            new RentACar('Rent A Car 29', 'Vojvode Stepe 29, Indjija', 'Description 5', this.vehicles, ['Indjija']),
            new RentACar('Avis', 'Mose Pijade 18, Pancevo', 'Description 6', this.vehicles, ['Pancevo', 'Indjija'])
        ];

        return this.rentACars;
    }

    addRentACar() {
        //this.rentACarChanged.next(this.rentACars.slice());
    }
}
