import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Vehicle } from '../models/vehicle.model';
import { Subject } from 'rxjs';
import { VehicleReservation } from '../models/vehicle-reservation.model';
import { RentACar } from '../models/rent-a-car.model';

@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    constructor(private http: HttpClient) {
        
    }

    vehicleListChanged = new Subject<Vehicle[]>();

    getVehiclesForCompany(company: string) {
        let address = 'http://localhost:' + localStorage.getItem('port') + '/api/Vehicles/ForCompany';
        var params = new HttpParams().append('company', company);
        return this.http.get(address, {params: params});
    }

    getReservationsForVehicles(vehicleIds: number[]) {
        let address = 'http://localhost:' + localStorage.getItem('port') + '/api/VehicleReservations/ForVehicles';
        let ids: string = '';
        vehicleIds.forEach(id => ids+=id.toString() + ',');
        var params = new HttpParams().append('vehicleIds', ids);
        
        return this.http.get(address, {params: params});
    }

    postVehicle(newVehicle: Vehicle) {
        let address = 'http://localhost:' + localStorage.getItem('port') + '/api/Vehicles';
        return this.http
        .post(
            address,
            newVehicle.ToTO()
        );
    }

    deleteVehicle(vehicle: Vehicle) {
        let address = 'http://localhost:' + localStorage.getItem('port') + '/api/Vehicles/' + vehicle.vehicleId;
        return this.http
        .delete(
            address
        );
    }

    putVehicle(updatedVehicle: Vehicle) {
        let address = 'http://localhost:' + localStorage.getItem('port') + '/api/Vehicles/' + updatedVehicle.vehicleId;
        return this.http
        .put(
            address,
            updatedVehicle.ToTO()
        );
    }

    reserveVehicle(reservation: VehicleReservation, rentACar: RentACar) {
        let address = 'http://localhost:' + localStorage.getItem('port') + '/api/VehicleReservations';
        return this.http
        .post(
            address,
            reservation.ToTO(rentACar)
        );
    }
}