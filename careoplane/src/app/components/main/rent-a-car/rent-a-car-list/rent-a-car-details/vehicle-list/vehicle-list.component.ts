import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { RentACar } from 'src/app/models/rent-a-car.model';
import { RentACarService } from 'src/app/services/rent-a-car.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Vehicle } from 'src/app/models/vehicle.model';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() rentACar: RentACar;

  dataSource;
  displayedColumns: string[] = ['brand', 'year', 'type', 'seats', 'price', 'rating'];

  vehicleTypes = [];
  type: string = 'Any';
  pickUpLocations: string[] = [];
  returnToLocations: string[] = [];
  pickUpLocation: string = 'Any';
  returnToLocation: string = '';
  subscription: Subscription;
  searchPerformed = false;
  numOfDays = 1;

  minPickUpDate: Date = new Date();
  minReturnDate: Date = new Date();
  searchForm: FormGroup;
  pickUpDateFormControl: FormControl = new FormControl(null, Validators.required);
  returnDateFormControl: FormControl = new FormControl(null, Validators.required);

  constructor(
    private rentACarService: RentACarService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.pickUpLocations = this.rentACar.locations.slice();
    if (this.pickUpLocations.length !== 1) {
      this.pickUpLocations.unshift('Any');
    }
    this.returnToLocations = this.rentACar.locations.slice();
    this.returnToLocation = this.returnToLocations[0];
    this.vehicleTypes = this.rentACarService.getVehicleTypes(this.rentACar.name);
    this.initForm();
    // this.rentACar.locations.unshift('Any');
    this.subscription = this.route.params
    .subscribe(
      (params: Params) => {
        this.vehicleTypes = this.rentACarService.getVehicleTypes(this.rentACar.name);
      }
    );

    this.dataSource = this.rentACar.vehicles.slice();
    this.dataSource.sort = this.sort;
  }

  initForm() {
    this.searchForm = new FormGroup({
      'pickUpLocation': new FormControl(this.pickUpLocations[0]),
      'pickerPickUp': this.pickUpDateFormControl,
      'returnToLocation': new FormControl(this.returnToLocations[0]),
      'pickerReturn': this.returnDateFormControl,
      'type':  new FormControl(this.vehicleTypes[0]),
    });
    this.pickUpDateFormControl.valueChanges.subscribe(
      (newPickUpDate: Date) => {
        this.minReturnDate = newPickUpDate;
        if (this.returnDateFormControl.value === null)
          this.returnDateFormControl.setValue(newPickUpDate);
      }
    );
    this.returnDateFormControl.valueChanges.subscribe(
      (newReturnDate: Date) => {
        if (this.pickUpDateFormControl.value === null)
          this.pickUpDateFormControl.setValue(newReturnDate);
      }
    );
  }

  onSearch() {
    this.rentACarService.doNextOnReserve(this.searchForm.value['pickerPickUp'], this.searchForm.value['pickUpLocation'], this.searchForm.value['pickerReturn'], this.searchForm.value['returnToLocation']);
    this.searchPerformed = true;
    const searchedVehicles: Vehicle[] = this.rentACar.vehicles.slice();
    let indexesToRemove: number[] = [];

    for (let vehicle of this.rentACar.vehicles) {
      if (this.searchForm.value['pickUpLocation'] !== 'Any') {
        if (!vehicle.location.toLowerCase().includes(this.searchForm.value['pickUpLocation'].toLowerCase())) {
          indexesToRemove.push(searchedVehicles.indexOf(vehicle));
        }
      }

      if (this.searchForm.value['type'] !== 'Any') {
        if (!indexesToRemove.includes(searchedVehicles.indexOf(vehicle))) {
          if (!vehicle.type.toLowerCase().includes(this.searchForm.value['type'].toLowerCase())) {
            indexesToRemove.push(searchedVehicles.indexOf(vehicle));
          }
        }
      }

      if (this.searchForm.value['pickerPickUp'] !== null) {
        this.numOfDays = (this.searchForm.value['pickerReturn'] - this.searchForm.value['pickerPickUp'])  / 1000 / 60 / 60 / 24 + 1;
        if (!indexesToRemove.includes(searchedVehicles.indexOf(vehicle))) {
          let keep = true;
          for (let takenDate of vehicle.unavailableDates) {
            if (takenDate.getDate() >= this.searchForm.value['pickerPickUp'].getDate() && takenDate.getDate() <= this.searchForm.value['pickerReturn'].getDate()) {
              keep = false;
            }
          }
          if (!keep) {
            indexesToRemove.push(searchedVehicles.indexOf(vehicle));
          }
        }
      }
    }

    indexesToRemove.sort(function(a,b){ return b - a; });
    for (var i = 0; i <= indexesToRemove.length - 1; i++) {
      searchedVehicles.splice(indexesToRemove[i], 1);
    }
      
    this.dataSource = searchedVehicles;
  }

  onCancelSearch() {
    this.searchPerformed = false;
  }

  sortData(sort: Sort) {
    const data = this.rentACar.vehicles.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
      return;
    }

    this.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'price': return this.compare(a.pricePerDay * this.numOfDays + this.rentACar.pricelist[a.type], b.pricePerDay * this.numOfDays + this.rentACar.pricelist[b.type], isAsc);
        case 'year': return this.compare(a.year, b.year, isAsc);
        case 'seats': return this.compare(a.numOfSeats, b.numOfSeats, isAsc);
        case 'rating': return this.compare(a.rating, b.rating, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a <= b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
