import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RentACar } from 'src/app/models/rent-a-car.model';
import { RentACarService } from 'src/app/services/rent-a-car.service';
import { Url } from 'url';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit, OnDestroy {
  vehicle: Vehicle;
  idRentACar: number;
  idVehicle: number;
  subscription: Subscription;

  constructor(
    private rentACarService: RentACarService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.params
    .subscribe(
      (params: Params) => {
        // this.idRentACar = +params['id'];
        this.idRentACar = +(this.router.url.split('/')[3])
        this.idVehicle = +params['idv'];
        this.vehicle = this.rentACarService.getVehicleForRentACar(this.idRentACar, this.idVehicle);
      }
    );
  }

  onReserve() {
    this.router.navigate(['../', 'reserve'], {relativeTo: this.route})
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
