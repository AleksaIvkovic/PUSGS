import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { RentACar } from 'src/app/models/rent-a-car.model';
import { RentACarService } from 'src/app/services/rent-a-car.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() rentACar: RentACar;

  dataSource;
  displayedColumns: string[] = ['brand', 'year', 'seats', 'price', 'rating'];

  vehicleTypes = [];
  type: string = 'Any';
  pickUpLocations: string[] = [];
  returnToLocations: string[] = [];
  pickUpLocation: string = 'Any';
  returnToLocation: string = '';
  subscription: Subscription;
  searchPerformed = false;

  minPickUpDate: Date = new Date();
  minReturnDate: Date = new Date();
  searchForm: FormGroup;
  pickUpDateFormControl: FormControl = new FormControl(null);
  returnDateFormControl: FormControl = new FormControl(null);

  constructor(
    private rentACarService: RentACarService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
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

    this.dataSource = this.rentACar.vehicles.slice();
    this.dataSource.sort = this.sort;
  }

  initForm() {
    this.searchForm = new FormGroup({
      'pickUpLocation': new FormControl('Any'),
      'pickerPickUp': this.pickUpDateFormControl,
      'returnToLocation': new FormControl('Any'),
      'pickerReturn': this.returnDateFormControl,
      'type':  new FormControl('Any'),
    });
    this.pickUpDateFormControl.valueChanges.subscribe(
      (newPickUpDate: Date) => {
        this.minReturnDate = newPickUpDate;
        if (this.returnDateFormControl.value === null)
          this.returnDateFormControl.setValue(newPickUpDate);
      }
    );
  }

  onSearch() {
    this.searchPerformed = true;
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
        case 'price': return this.compare(a.pricePerDay + this.rentACar.pricelist[a.type], b.pricePerDay + this.rentACar.pricelist[b.type], isAsc);
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
