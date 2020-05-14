import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RentACar } from 'src/app/models/rent-a-car.model';
import { RentACarService } from 'src/app/services/rent-a-car.service';
import { Url } from 'url';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  isLoggedIn: boolean = false;
  rentACar: RentACar;
  discount = this.rentACarService.discount;

  // displayedColumns: string[] = ['brand', 'year', 'type', 'seats', 'price', 'location', 'rating'];

  constructor(
    private rentACarService: RentACarService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.getLoggedInUser() === undefined ? false : true;
    this.subscription = this.route.params
    .subscribe(
      (params: Params) => {
        // this.idRentACar = +params['id'];
        this.adminVehicleId = +params['idvh']; //U pitanju je profil servisa
        if (this.adminVehicleId === undefined || Number.isNaN(this.adminVehicleId)) {
          this.idRentACar = +(this.router.url.split('/')[3])
          this.idVehicle = +params['idv'];
          this.vehicle = this.rentACarService.getVehicleForRentACar(this.idRentACar, this.idVehicle);
        } else {
          if (this.router.url.includes('new')) {
            this.vehicle = this.rentACarService.newVehicles[this.adminVehicleId];
          } else {
            this.rentACar = this.rentACarService.getRentACarByName(this.userService.getLoggedInUser().company);
            this.vehicle = this.rentACarService.getVehicleForRentACarByName(this.userService.getLoggedInUser().company, this.adminVehicleId);
          }
          this.isAdmin = true;
        }
      }
    );
  }

  onReserve() {
    // this.rentACarService.doNextOnReserve(new Date(), 'A', new Date(), 'B');
    this.router.navigate(['../', 'reserve'], {relativeTo: this.route});
  }

  onEditVehicle() {
    this.router.navigate(['../', 'edit'], {relativeTo: this.route});
  }

  onRemoveVehicle() {
    if (this.router.url.includes('new')) {
      this.rentACarService.removeTempVehicle(this.adminVehicleId);
    } else {
      let index = +this.router.url.split('/')[3];
      this.rentACarService.removeVehicle(this.rentACar, index);
    }
    
    this._snackBar.open('Vehicle removed successfully', 'OK', {
      duration: 5000,
    });
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  onSwapVehicle() {
    let index = +this.router.url.split('/')[3];
    this.rentACarService.swapVehicleList(this.rentACar, index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
