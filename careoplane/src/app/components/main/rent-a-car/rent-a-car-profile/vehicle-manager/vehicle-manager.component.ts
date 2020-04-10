import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RentACarService } from 'src/app/services/rent-a-car.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RentACar } from 'src/app/models/rent-a-car.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-vehicle-manager',
  templateUrl: './vehicle-manager.component.html',
  styleUrls: ['./vehicle-manager.component.css']
})
export class VehicleManagerComponent implements OnInit {
  rentACar: RentACar;
  addForm: FormGroup;
  maxYear: Date;
  vehicleTypes: string[];
  locations: string[];

  constructor(
    private rentACarService: RentACarService,
    private userService: UserService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.rentACar = this.rentACarService.getRentACarByName(this.userService.getMockUpRentACarAdmin().company);
    this.vehicleTypes = this.rentACarService.getVehicleTypes(this.rentACar.name);
    this.vehicleTypes.splice(0, 1);
    this.locations = this.rentACar.locations;
    this.initForm();
  }

  initForm() {
    this.addForm = new FormGroup({
      'brand': new FormControl(null, Validators.required),
      'pickerYear': new FormControl(null, Validators.required),
      'type': new FormControl(this.vehicleTypes[0]),
      'seats': new FormControl('1'),
      'price': new FormControl(null, Validators.required),
      'location': new FormControl(this.locations[0]),
    });
  }

  onAdd() {

  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.activeRoute});
  }

}
