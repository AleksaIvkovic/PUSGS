import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RentACar } from 'src/app/models/rent-a-car.model';
import { RentACarService } from 'src/app/services/rent-a-car.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit, OnDestroy {
  @Input() rentACar: RentACar;
  vehicleTypes = [];
  type: string = 'Any';
  pickUpLocations: string[] = [];
  returnToLocations: string[] = [];
  pickUpLocation: string = 'Any';
  returnToLocation: string = '';
  subscription: Subscription;

  constructor(
    private rentACarService: RentACarService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.pickUpLocations = this.rentACar.locations.slice();
    this.pickUpLocations.unshift('Any');
    this.returnToLocations = this.rentACar.locations.slice();
    this.returnToLocation = this.returnToLocations[0];
    // this.rentACar.locations.unshift('Any');
    this.subscription = this.route.params
    .subscribe(
      (params: Params) => {
        this.vehicleTypes = this.rentACarService.getVehicleTypes(this.rentACar.name);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
