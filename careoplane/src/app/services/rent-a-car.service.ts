import { Injectable } from '@angular/core';
import { RentACar } from '../models/rent-a-car.model';
import { Vehicle } from '../models/vehicle.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RentACarService {
    vehicleTypes: string[] = [
        'Any',
        'Car',
        'Van',
        'Truck'
    ];

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
        new RentACar('UNI LINE TTR', 'Bulevar Patrijarha Pavla 17, Novi Sad, Serbia', 'Description 1', [new Vehicle('BMW','Car', 5, 2019, 200, '', 0.5, [new Date()]), new Vehicle('Mercedes-Benz', 'Van', 3, 2015, 150, '', 0.5, [new Date()]), new Vehicle('FAP', 'Truck', 2, 2014, 200, '', 0.5, [new Date()]),], ['Novi Sad']),
        new RentACar('Europcar', 'Bulevar Jase Tomica 2, Novi Sad, Serbia', 'Description 2', [new Vehicle('BMW','Car', 5, 2019, 200, '', 0.5, [new Date()]), new Vehicle('Mercedes-Benz', 'Van', 3, 2015, 150), new Vehicle('FAP', 'Truck', 2, 2014, 200),], ['Novi Sad', 'Beograd']),
        new RentACar('INEX', 'Micurinova 68A, Novi Sad, Serbia', 'Description 3', [new Vehicle('BMW','Car', 5, 2019, 200), new Vehicle('Mercedes-Benz', 'Van', 3, 2015, 150), new Vehicle('FAP', 'Truck', 2, 2014, 200),], ['Novi Sad']),
        new RentACar('Union', 'Brankova 12, Beograd, Serbia', 'Description 4', [new Vehicle('BMW','Car', 5, 2019, 200), new Vehicle('Mercedes-Benz', 'Van', 3, 2015, 150), new Vehicle('FAP', 'Truck', 2, 2014, 200),], ['Beograd']),
        new RentACar('Rent A Car 29', 'Vojvode Stepe 29, Indjija, Serbia', 'Description 5', [new Vehicle('BMW','Car', 5, 2019, 200), new Vehicle('Mercedes-Benz', 'Van', 3, 2015, 150), new Vehicle('FAP', 'Truck', 2, 2014, 200),], ['Indjija']),
        new RentACar('Avis', 'Mose Pijade 18, Pancevo, Serbia', 'Description 6', [new Vehicle('BMW','Car', 5, 2019, 200), new Vehicle('Mercedes-Benz', 'Van', 3, 2015, 150), new Vehicle('FAP', 'Truck', 2, 2014, 200),], ['Pancevo', 'Indjija'])
    ];
    rentACarsChanged = new Subject<RentACar[]>();
    vehicleListChanged = new Subject<Vehicle[]>();
    rentACarChanged = new Subject<RentACar>();

    newVehicleListChanged = new Subject<Vehicle[]>();
    newVehicles: Vehicle[] = [];

    getRentACars() {
        //slice
    }

    getRentACarByName(name: string): RentACar {
        for (var rentACar of this.rentACars) {
            if (rentACar.name === name) {
                return rentACar;
            }
        }
    }

    getRentACarIndex(rentACar: RentACar): number {
        return this.rentACars.indexOf(rentACar);
    }

    getRentACarByIndex(index: number): RentACar {
        return this.rentACars[index];
    }

    getVehicleForRentACar(indexRentACar: number, indexVehicle: number) {
        return this.rentACars[indexRentACar].vehicles[indexVehicle];
    }

    getVehicleForRentACarByName(rentACarName: string, indexVehicle: number) {
        let index = this.getRentACarIndex(this.getRentACarByName(rentACarName));
        return this.getVehicleForRentACar(index, indexVehicle);
    }

    getVehicleTypes(): string[] {
        // const rentACar = this.getRentACarByName(rentACarName);
        // const ret: string[] = [];

        // for (let vehicle of rentACar.vehicles) {
        //     if (!(ret.indexOf(vehicle.type) > -1)) {
        //         ret.push(vehicle.type);
        //     }
        // }

        // if (ret.length !== 1) {
        //     ret.unshift('Any');
        // }

        // return ret;
        return this.vehicleTypes.slice();
    }

    getMockUp(): RentACar[] {
        // const vehicles: Vehicle[] = [
        //     new Vehicle('BMW', 'Car', 5, 2019, 200),
        //     new Vehicle('Mercedes-Benz', 'Van', 3, 2015, 150),
        //     new Vehicle('FAP', 'Truck', 2, 2014, 200),
        //     new Vehicle('BMW', 'Car', 5, 2016, 220),
        //     new Vehicle('Mercedes-Benz', 'Van', 3, 2018, 180),
        //     new Vehicle('FAP', 'Truck', 2, 2020, 170),
        //     new Vehicle('BMW', 'Car', 5, 2016, 130),
        //     new Vehicle('Mercedes-Benz', 'Van', 3, 2019, 140),
        //     new Vehicle('FAP', 'Truck', 2, 2015, 100),
        // ];

        // this.rentACars = [
        //     new RentACar('UNI LINE TTR', 'Bulevar Patrijarha Pavla 17, Novi Sad', 'Description 1', [new Vehicle('BMW','Car', 5, 2019, 200, '', 0.5, [new Date()]), new Vehicle('Mercedes-Benz', 'Van', 3, 2015, 150, '', 0.5, [new Date()]), new Vehicle('FAP', 'Truck', 2, 2014, 200, '', 0.5, [new Date()]),], ['Novi Sad']),
        //     new RentACar('Europcar', 'Bulevar Jase Tomica 2, Novi Sad', 'Description 2', [new Vehicle('BMW','Car', 5, 2019, 200), new Vehicle('Mercedes-Benz', 'Van', 3, 2015, 150), new Vehicle('FAP', 'Truck', 2, 2014, 200),], ['Novi Sad', 'Beograd']),
        //     new RentACar('INEX', 'Micurinova 68A, Novi Sad', 'Description 3', [new Vehicle('BMW','Car', 5, 2019, 200), new Vehicle('Mercedes-Benz', 'Van', 3, 2015, 150), new Vehicle('FAP', 'Truck', 2, 2014, 200),], ['Novi Sad']),
        //     new RentACar('Union', 'Brankova 12, Beograd', 'Description 4', [new Vehicle('BMW','Car', 5, 2019, 200), new Vehicle('Mercedes-Benz', 'Van', 3, 2015, 150), new Vehicle('FAP', 'Truck', 2, 2014, 200),], ['Beograd']),
        //     new RentACar('Rent A Car 29', 'Vojvode Stepe 29, Indjija', 'Description 5', [new Vehicle('BMW','Car', 5, 2019, 200), new Vehicle('Mercedes-Benz', 'Van', 3, 2015, 150), new Vehicle('FAP', 'Truck', 2, 2014, 200),], ['Indjija']),
        //     new RentACar('Avis', 'Mose Pijade 18, Pancevo', 'Description 6', [new Vehicle('BMW','Car', 5, 2019, 200), new Vehicle('Mercedes-Benz', 'Van', 3, 2015, 150), new Vehicle('FAP', 'Truck', 2, 2014, 200),], ['Pancevo', 'Indjija'])
        // ];

        return this.rentACars;
    }

    getTempVehicle(indexVehicle: number) {
        return this.newVehicles[indexVehicle];
    }

    addRentACar(newRentACar: RentACar): boolean {
        for (let rentACar of this.rentACars) {
            if (rentACar.name.toLocaleLowerCase() === newRentACar.name.toLowerCase()) {
                return false;
            }
        }

        this.rentACars.push(newRentACar);
        this.rentACarsChanged.next(this.rentACars.slice());
        return true;
    }

    editRentACar(rentACarName: string, newAddress: string, newDescription: string, newLocations: string[]) {
        let indexRentACar = this.rentACars.indexOf(this.getRentACarByName(rentACarName));
        this.rentACars[indexRentACar].address = newAddress;
        this.rentACars[indexRentACar].description = newDescription;
        this.rentACars[indexRentACar].locations = newLocations;
        this.rentACarsChanged.next(this.rentACars.slice());
    }

    addTempVehicle(vehicle: Vehicle) {
        this.newVehicles.push(vehicle);
        this.newVehicleListChanged.next(this.newVehicles.slice());
    }

    addVehicle(rentACar: RentACar, vehicle: Vehicle) {
        let index = this.getRentACarIndex(rentACar);
        this.rentACars[index].vehicles.push(vehicle);
        this.vehicleListChanged.next(this.rentACars[index].vehicles.slice());
        this.rentACarChanged.next(this.rentACars[index]);
    }

    removeVehicle(rentACar: RentACar, vehicleIndex: number) {
        let index = this.getRentACarIndex(rentACar);
        this.rentACars[index].vehicles.splice(vehicleIndex, 1);
        this.vehicleListChanged.next(this.rentACars[index].vehicles.slice());
        this.rentACarChanged.next(this.rentACars[index]);
    }

    removeTempVehicle(vehicleIndex: number) {
        this.newVehicles.splice(vehicleIndex, 1);
        this.newVehicleListChanged.next(this.newVehicles.slice());
    }

    editVehicle(rentACar: RentACar, vehicleIndex: number, newBrand: string, newSeats: number, newPrice: number, newLocation: string) {
        let index = this.getRentACarIndex(rentACar);
        this.rentACars[index].vehicles[vehicleIndex].brand = newBrand;
        this.rentACars[index].vehicles[vehicleIndex].numOfSeats = newSeats;
        this.rentACars[index].vehicles[vehicleIndex].pricePerDay = newPrice;
        this.rentACars[index].vehicles[vehicleIndex].location = newLocation;
        this.vehicleListChanged.next(this.rentACars[index].vehicles.slice());
        this.rentACarChanged.next(this.rentACars[index]);
    }

    editTempVehicle(vehicleIndex: number, newBrand: string, newSeats: number, newPrice: number, newLocation: string) {
        this.newVehicles[vehicleIndex].brand = newBrand;
        this.newVehicles[vehicleIndex].numOfSeats = newSeats;
        this.newVehicles[vehicleIndex].pricePerDay = newPrice;
        this.newVehicles[vehicleIndex].location = newLocation;
        this.newVehicleListChanged.next(this.newVehicles.slice());
    }

    reserveObservable: Observable<any>;

    doNextOnReserve( 
        pickUpDate: Date,
        pickUpLocation: string,
        returnDate: Date,
        returnLocation: string) {
        this.reserveObservable = Observable.create(
            observer => {
              observer.next({
                  'pickUpDate': pickUpDate,
                  'pickUpLocation': pickUpLocation,
                  'returnDate': returnDate,
                  'returnLocation': returnLocation,
              })
            }
          );
    }
}
