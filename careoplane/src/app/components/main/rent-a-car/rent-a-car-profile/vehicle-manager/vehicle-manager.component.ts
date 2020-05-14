import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RentACarService } from 'src/app/services/rent-a-car.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RentACar } from 'src/app/models/rent-a-car.model';
import { UserService } from 'src/app/services/user.service';
import { Vehicle } from 'src/app/models/vehicle.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-vehicle-manager',
  templateUrl: './vehicle-manager.component.html',
  styleUrls: ['./vehicle-manager.component.css']
})
export class VehicleManagerComponent implements OnInit, OnDestroy {
  rentACar: RentACar;
  addForm: FormGroup;
  maxYear: Date;
  vehicleTypes: string[];
  locations: string[];
  vehicleIndex: number;
  isEdit: boolean = true;
  isNew = false;
  vehicle: Vehicle;
  indexLocation: number;
  indexType: number;
  subscribtion: Subscription;

  constructor(
    private rentACarService: RentACarService,
    private userService: UserService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.router.url.includes('new')) {
      this.vehicleTypes = this.rentACarService.getVehicleTypes();
      this.vehicleTypes.splice(0, 1);
      if (!this.router.url.includes('edit')) {
        this.isEdit = false;
      } else {
        this.indexLocation = 0;
        this.vehicleIndex = +this.router.url.split('/')[3];
        this.vehicle = this.rentACarService.getTempVehicle(this.vehicleIndex);
      }
      this.locations = ['HQ'];
      this.isNew = true;
    } else {
      this.rentACar = this.rentACarService.getRentACarByName(this.userService.getMockUpRentACarAdmin().company);
      this.vehicleTypes = this.rentACarService.getVehicleTypes();
      this.vehicleTypes.splice(0, 1);
      this.locations = this.rentACar.locations;
      this.subscribtion = this.activeRoute.params
      .subscribe(
        (params: Params) => {
          this.vehicleIndex = +params['idvh'];
          if (this.vehicleIndex === undefined || Number.isNaN(this.vehicleIndex)) {
            this.isEdit = false;
          } else {
            this.vehicle = this.rentACarService.getVehicleForRentACarByName(this.rentACar.name, this.vehicleIndex);
            this.indexLocation = this.locations.indexOf(this.vehicle.location);
            this.indexType = this.vehicleTypes.indexOf(this.vehicle.type);
          }
      });
    }
    
    this.initForm();
  }

  initForm() {
    this.addForm = new FormGroup({
      'brand': this.isEdit ? new FormControl(this.vehicle.brand, Validators.required) : new FormControl(null, Validators.required),
      'year': this.isEdit ? new FormControl(this.vehicle.year, Validators.required) : new FormControl(null, Validators.required),
      'type': this.isEdit ? new FormControl(this.vehicleTypes[this.indexType], Validators.required) : new FormControl(null, Validators.required),
      'seats': this.isEdit ? new FormControl(this.vehicle.numOfSeats, Validators.required) : new FormControl(null, Validators.required),
      'price': this.isEdit ? new FormControl(this.vehicle.pricePerDay, Validators.required) : new FormControl(null, Validators.required),
      'location': this.isEdit ? new FormControl(this.locations[this.indexLocation], Validators.required) : new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (!this.isEdit) {
      // let year = <Date>this.addForm.value['pickerYear'];
    
      let vehicle = new Vehicle(
        this.addForm.value['brand'], 
        this.addForm.value['type'],
        this.addForm.value['seats'],
        this.addForm.value['year'],
        this.addForm.value['price'],
        this.addForm.value['location']
      );

      if (this.isNew) {
        this.rentACarService.addTempVehicle(vehicle);
      } else {
        this.rentACarService.addVehicle(this.rentACar, vehicle);
      }
      
      this._snackBar.open('Vehicle added successfully', 'OK', {
        duration: 5000,
      });
      this.router.navigate(['../'], {relativeTo: this.activeRoute});
    } else {
      if (this.isNew) {
        this.rentACarService.editTempVehicle(this.vehicleIndex, this.addForm.value['brand'], this.addForm.value['seats'], this.addForm.value['price'], this.addForm.value['location']);
      } else {
        this.rentACarService.editVehicle(this.rentACar, this.vehicleIndex, this.addForm.value['brand'], this.addForm.value['seats'], this.addForm.value['price'], this.addForm.value['location']);
      }
      
      this._snackBar.open('Vehicle edited successfully', 'OK', {
        duration: 5000,
      });
      this.router.navigate(['../../'], {relativeTo: this.activeRoute});
    }
  }

  onCancel() {
    if (this.isEdit) {
      this.router.navigate(['../../'], {relativeTo: this.activeRoute});
    } else {
      this.router.navigate(['../'], {relativeTo: this.activeRoute});
    }
  }

  ngOnDestroy() {
    if (!this.isNew) {
      this.subscribtion.unsubscribe();
    }
  }

}
