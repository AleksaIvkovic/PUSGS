import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle.model';
import { RentACar } from 'src/app/models/rent-a-car.model';
import { RentACarService } from 'src/app/services/rent-a-car.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vehicle-reserve',
  templateUrl: './vehicle-reserve.component.html',
  styleUrls: ['./vehicle-reserve.component.css']
})
export class VehicleReserveComponent implements OnInit, OnDestroy {
  vehicle: Vehicle;
  rentACar: RentACar;
  subscription: Subscription;

  constructor(
    private rentACarService: RentACarService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.params
    .subscribe(
      (params: Params) => {
        const indexRentACar = +(this.router.url.split('/')[3]);
        const indexVehicle = +(this.router.url.split('/')[5]);
        this.rentACar = this.rentACarService.getRentACarByIndex(indexRentACar);
        this.vehicle = this.rentACar.vehicles[indexVehicle];
    });
  }

  onCancel() {
    this.router.navigate(['../', 'details'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
