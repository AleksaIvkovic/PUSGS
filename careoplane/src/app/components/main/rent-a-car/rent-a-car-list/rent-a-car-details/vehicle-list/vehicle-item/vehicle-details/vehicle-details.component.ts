import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RentACar } from 'src/app/models/rent-a-car.model';
import { RentACarService } from 'src/app/services/rent-a-car.service';
import { Url } from 'url';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit, OnDestroy {
  @Output() reserveClicked = new EventEmitter();

  vehicle: Vehicle;
  idRentACar: number;
  idVehicle: number;
  subscription: Subscription;
  adminVehicleId: number;
  isAdmin: boolean = false;

  // displayedColumns: string[] = ['brand', 'year', 'type', 'seats', 'price', 'location', 'rating'];

  constructor(
    private rentACarService: RentACarService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.params
    .subscribe(
      (params: Params) => {
        // this.idRentACar = +params['id'];
        this.adminVehicleId = +params['idvh'];
        if (this.adminVehicleId === undefined) {
          this.idRentACar = +(this.router.url.split('/')[3])
          this.idVehicle = +params['idv'];
          this.vehicle = this.rentACarService.getVehicleForRentACar(this.idRentACar, this.idVehicle);
        } else {
          // let rentACar: RentACar = this.rentACarService.getRentACarByName(this.userService.getMockUpRentACarAdmin().company);
          this.isAdmin = true;
          this.vehicle = this.rentACarService.getVehicleForRentACarByName(this.userService.getMockUpRentACarAdmin().company, this.adminVehicleId);
        }
      }
    );
  }

  onReserve() {
    // this.rentACarService.doNextOnReserve(new Date(), 'A', new Date(), 'B');
    this.router.navigate(['../', 'reserve'], {relativeTo: this.route});
  }

  onEditVehicle() {
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
