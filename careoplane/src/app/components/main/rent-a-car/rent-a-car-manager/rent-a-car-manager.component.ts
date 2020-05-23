import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { RentACarService } from 'src/app/services/rent-a-car.service';
import { Vehicle } from 'src/app/models/vehicle.model';
import { RentACar } from 'src/app/models/rent-a-car.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { Admin } from 'src/app/models/admin.model';

@Component({
  selector: 'app-rent-a-car-manager',
  templateUrl: './rent-a-car-manager.component.html',
  styleUrls: ['./rent-a-car-manager.component.css']
})
export class RentACarManagerComponent implements OnInit {
  addForm: FormGroup;
  public locations: string[] = [];
  locationOfRentACar: string;
  displayedColumns = ['locations', 'delete']
  isEdit = false;
  rentACar: RentACar;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private userService: UserService,
    private rentACarService: RentACarService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.isEdit = true;
      this.rentACar = this.rentACarService.getRentACarByName(this.userService.getMockUpRentACarAdmin().company);
      this.locationOfRentACar = this.rentACar.address; //address, city, state
    }
    this.initForm();
  }

  initForm() {
    this.addForm = new FormGroup({
      'name': this.isEdit ?  new FormControl({'value': this.rentACar.name, disabled: true}) : new FormControl(null, Validators.required),
      'address': this.isEdit ?  new FormControl(this.rentACar.address.split(',')[0], Validators.required) : new FormControl(null, Validators.required),
      'city': this.isEdit ?  new FormControl(this.rentACar.address.split(',')[1].substr(1), Validators.required) : new FormControl(null, Validators.required),
      'state': this.isEdit ?  new FormControl(this.rentACar.address.split(',')[2].substr(1), Validators.required) : new FormControl(null, Validators.required),
      'description': this.isEdit ?  new FormControl(this.rentACar.description, Validators.required) : new FormControl(null, Validators.required),
      'locations': this.isEdit ?  new FormControl(null, Validators.required) : new FormControl(null, Validators.required),
      'car': this.isEdit ?  new FormControl(this.rentACar.prices[0], Validators.required) : new FormControl(null, Validators.required),
      'van': this.isEdit ?  new FormControl(this.rentACar.prices[1], Validators.required) : new FormControl(null, Validators.required),
      'truck': this.isEdit ?  new FormControl(this.rentACar.prices[2], Validators.required) : new FormControl(null, Validators.required),
    });
    if (this.isEdit) {
      for (let location of this.rentACar.locations) {
        this.locations.push(location.trim());
      }
    }
  }

  onVerifyAddress() {
    this.locationOfRentACar = this.addForm.value['address'] + ', ' + this.addForm.value['city'] + ', ' + this.addForm.value['state'];
    this.locations.push(this.addForm.value['city'].trim());
  }

  onAddLocation(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.locations.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  onRemoveLocation(location: string) {
    this.locations.splice(this.locations.indexOf(location), 1);
  }

  onAddVehicle() {
    this.router.navigate(['add-vehicle'], {relativeTo: this.route});
  }

  onCancel() {
    this.router.navigate(['main/rent-a-car-profile']);
  }

  onSubmit() {
    if (this.isEdit) {
      this.rentACarService.editRentACar(
        this.rentACar.name,
        this.locationOfRentACar,
        this.addForm.value['description'],
        this.addForm.value['car'],
        this.addForm.value['van'],
        this.addForm.value['truck'],
        this.locations
      );
      this._snackBar.open('Information updated successfully', 'OK', {
        duration: 5000,
      });
      this.router.navigate(['main/rent-a-car-profile']);
    } else {
      let prices = [];
      prices.push(this.addForm.value['car']);
      prices.push(this.addForm.value['van']);
      prices.push(this.addForm.value['truck']);
      let rentACar = new RentACar(
        this.addForm.value['name'],
        this.locationOfRentACar,
        this.addForm.value['description'],
        [],
        this.locations,
        0,
        prices
      );

      this.rentACarService.addRentACar(rentACar).subscribe(
        response => {
          this.userService.updateCompanyName(response['name']);
          this.router.navigate(['main/rent-a-car-profile']);
        },
        error => {
          console.log(error);
          this.addForm.patchValue({
            name: ''
          }) 
          this._snackBar.open('Rent a car service with that name already exists', 'OK', {
            duration: 5000,
          });
        }
      )
      // if (this.rentACarService.addRentACar(rentACar)) {
      //   this.router.navigate(['main/rent-a-car-profile']);
      // } else {
      //   this.addForm.patchValue({
      //     name: ''
      //   }) 
      //   this._snackBar.open('Rent a car service with that name already exists', 'OK', {
      //     duration: 5000,
      //   });
      // }
    }
  }

}
