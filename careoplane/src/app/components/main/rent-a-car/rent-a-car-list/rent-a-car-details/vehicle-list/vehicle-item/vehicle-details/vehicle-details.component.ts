import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RentACar } from 'src/app/models/rent-a-car.model';
import { RentACarService } from 'src/app/services/rent-a-car.service';
import { Url } from 'url';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
  vehicle: Vehicle;
  idRentACar: number;
  idVehicle: number;

  constructor(
    private rentACarService: RentACarService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.idRentACar = +params['id'];
        this.idVehicle = +params['idv'];
        this.vehicle = this.rentACarService.getVehicleForRentACar(0, this.idVehicle);
      }
    );
  }

  onReserve() {
    console.log(this.vehicle);
  }

}
