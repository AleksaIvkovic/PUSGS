import { Injectable } from '@angular/core';
import { RentACar } from '../models/rent-a-car.model';
import { Vehicle } from '../models/vehicle.model';
import { Subject, Observable } from 'rxjs';
import { VehicleReservation } from '../models/vehicle-reservation.model';
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class RentACarService {
    constructor(private http: HttpClient) {

    }

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
        new RentACar('UNI LINE TTR', 'Bulevar Patrijarha Pavla 17, Novi Sad, Serbia', 'Description 1', [new Vehicle('BMW','Car', 5, 2019, 200, '', 0.5, [new Date()], true), new Vehicle('Mercedes-Benz', 'Van', 3, 2015, 150, '', 0.5, [new Date()], true), new Vehicle('FAP', 'Truck', 2, 2014, 200, '', 0.5, [new Date()]),], ['Novi Sad']),
        new RentACar('Europcar', 'Bulevar Jase Tomica 2, Novi Sad, Serbia', 'Description 2', [new Vehicle('BMW','Car', 5, 2019, 200, '', 0.5, [new Date()]), new Vehicle('Mercedes-Benz', 'Van', 3, 2015, 150), new Vehicle('FAP', 'Truck', 2, 2014, 200),], ['Novi Sad', 'Beograd']),
        new RentACar('INEX', 'Micurinova 68A, Novi Sad, Serbia', 'Description 3', [new Vehicle('BMW','Car', 5, 2019, 200), new Vehicle('Mercedes-Benz', 'Van', 3, 2015, 150), new Vehicle('FAP', 'Truck', 2, 2014, 200),], ['Novi Sad']),
        new RentACar('Union', 'Brankova 12, Beograd, Serbia', 'Description 4', [new Vehicle('BMW','Car', 5, 2019, 200), new Vehicle('Mercedes-Benz', 'Van', 3, 2015, 150), new Vehicle('FAP', 'Truck', 2, 2014, 200),], ['Beograd']),
        new RentACar('Rent A Car 29', 'Vojvode Stepe 29, Indjija, Serbia', 'Description 5', [new Vehicle('BMW','Car', 5, 2019, 200), new Vehicle('Mercedes-Benz', 'Van', 3, 2015, 150), new Vehicle('FAP', 'Truck', 2, 2014, 200),], ['Indjija']),
        new RentACar('Avis', 'Mose Pijade 18, Pancevo, Serbia', 'Description 6', [new Vehicle('BMW','Car', 5, 2019, 200), new Vehicle('Mercedes-Benz', 'Van', 3, 2015, 150), new Vehicle('FAP', 'Truck', 2, 2014, 200),], ['Pancevo', 'Indjija'])
    ];

    discount: number = 10;

    rentACarsChanged = new Subject<RentACar[]>();
    vehicleListChanged = new Subject<Vehicle[]>();
    rentACarChanged = new Subject<RentACar>();
    reservationMade = new Subject<any>();
    onSaleClicked = new Subject<boolean>();
    vehicleSwaped = new Subject<boolean>();

    newVehicleListChanged = new Subject<Vehicle[]>();
    newVehicles: Vehicle[] = [];

    getRentACars() {
        return this.rentACars.slice();
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
        return this.vehicleTypes.slice();
    }

    getTempVehicle(indexVehicle: number) {
        return this.newVehicles[indexVehicle];
    }

    addRentACar(newRentACar: RentACar) {
        for (let rentACar of this.rentACars) {
            if (rentACar.name.toLocaleLowerCase() === newRentACar.name.toLowerCase()) {
                return null;
            }
        }

        this.rentACars.push(newRentACar);
        this.rentACarsChanged.next(this.rentACars.slice());
        return this.http
        .post(
            'http://localhost:52075/api/RentACars',
            newRentACar.ToTO()
        );
    }

    editRentACar(rentACarName: string, newAddress: string, newDescription: string, newCarPrice: number, newVanPrice: number, newTruckPrice: number, newLocations: string[]) {
        let indexRentACar = this.rentACars.indexOf(this.getRentACarByName(rentACarName));
        this.rentACars[indexRentACar].address = newAddress;
        this.rentACars[indexRentACar].description = newDescription;
        this.rentACars[indexRentACar].prices[0] = newCarPrice;
        this.rentACars[indexRentACar].pricelist['Car'] = newCarPrice;
        this.rentACars[indexRentACar].prices[1] = newVanPrice;
        this.rentACars[indexRentACar].pricelist['Van'] = newVanPrice;
        this.rentACars[indexRentACar].prices[2] = newTruckPrice;
        this.rentACars[indexRentACar].pricelist['Truck'] = newTruckPrice;
        this.rentACars[indexRentACar].locations = newLocations;
        this.rentACarsChanged.next(this.rentACars.slice());
    }

    addTempVehicle(vehicle: Vehicle) {
        this.newVehicles.push(vehicle);
        this.newVehicleListChanged.next(this.newVehicles.slice());
    }

    addVehicle(rentACar: RentACar, vehicle: Vehicle) {
        let index = this.getRentACarIndex(rentACar);
        vehicle.rentACar = rentACar.name;
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

    reserveVehicle(rentACar: RentACar, vehicleIndex: number, reservation: VehicleReservation) {
        let index = this.getRentACarIndex(rentACar);
        for (let i = 0; i < reservation.numOfDays; i++) {
            let day = new Date();
            day.setDate(reservation.fromDate.getDate() + i);
            this.rentACars[index].vehicles[vehicleIndex].unavailableDates.push(day);
        }
        this.rentACarChanged.next(this.rentACars[index]);
        this.vehicleListChanged.next(this.rentACars[index].vehicles.slice());
        this.reservationMade.next();
    }

    swapVehicleList(rentACar: RentACar, vehicleIndex: number) {
        let index = this.getRentACarIndex(rentACar);
        this.rentACars[index].vehicles[vehicleIndex].isOnSale = !this.rentACars[index].vehicles[vehicleIndex].isOnSale;
        this.vehicleSwaped.next(!this.rentACars[index].vehicles[vehicleIndex].isOnSale);
    }

    editTempVehicle(vehicleIndex: number, newBrand: string, newSeats: number, newPrice: number, newLocation: string) {
        this.newVehicles[vehicleIndex].brand = newBrand;
        this.newVehicles[vehicleIndex].numOfSeats = newSeats;
        this.newVehicles[vehicleIndex].pricePerDay = newPrice;
        this.newVehicles[vehicleIndex].location = newLocation;
        this.newVehicleListChanged.next(this.newVehicles.slice());
    }

    getVehiclesOnSale(): Vehicle[] {
        let vehiclesOnSale: Vehicle[] = [];

        for (let rentACar of this.rentACars) {
            for (let vehicle of rentACar.vehicles) {
                if (vehicle.isOnSale) {
                    vehiclesOnSale.push(vehicle);
                }
            }
        }

        return vehiclesOnSale;
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
