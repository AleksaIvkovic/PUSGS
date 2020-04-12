import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';
import { Subscription, Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AirlineService } from 'src/app/services/airline.service';
import { startWith, map } from 'rxjs/operators';
import { Airline } from 'src/app/models/airline.model';

@Component({
  selector: 'app-airline-flights-list',
  templateUrl: './airline-flights-list.component.html',
  styleUrls: ['./airline-flights-list.component.css']
})
export class AirlineFlightsListComponent implements OnInit {
  flights: Flight[];
  flightsSubscription: Subscription;
  airline: Airline;

  typeControl: FormControl = new FormControl('one way', Validators.required);
  retControl: FormControl = new FormControl(null);
  departureControl: FormControl = new FormControl(null, Validators.required);

  travelType:string='one way';
  exs: boolean = true;
  exf: boolean = false;

  origin: string;
  destination: string;
  type: string;
  departure: Date;
  ret: Date;
  num: number;

  cities: string[] = [];
  filteredOptionsOrigin: Observable<string[]>; 
  filteredOptionsDestination: Observable<string[]>; 
  
  minDateDep: Date = new Date();
  minDateRet: Date = new Date();

  searchForm: FormGroup;
  search: boolean = false;
  twoWay: boolean = false;

  sortBy: string = 'price';
  sortWay:boolean = false;
  classType: string;
  
  constructor(private airlineService: AirlineService) { }

  ngOnInit(): void {
    this.initForm();

    this.airline = this.airlineService.getCurrentAirline();
    this.flights = this.airline.flights;

    for(let city of this.airline.destinations){
      if(!this.cities.includes(city)){
        this.cities.push(city);
      }
    }

    this.filteredOptionsOrigin = this.searchForm.controls['origin'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.filteredOptionsDestination = this.searchForm.controls['destination'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnDestroy(): void {
    this.flightsSubscription.unsubscribe();
  }

  private initForm() {
    let origin = '';
    let destination = '';
    let departure = null;
    let num = 1;
    

    this.searchForm = new FormGroup({
      'origin': new FormControl(origin, Validators.required),
      'destination': new FormControl(destination, Validators.required),
      'departure': this.departureControl,
      'ret': this.retControl,
      'num': new FormControl(num, [Validators.required, Validators.min(1)]),
      'type': this.typeControl,
      'classType': new FormControl('any')
    });

    this.typeControl.valueChanges.subscribe(type => {
      if (type==="round trip") {
        this.retControl.setValidators(Validators.required);
      } else {
        this.retControl.setValidators(null);
      }
      this.retControl.updateValueAndValidity();
    });

    this.departureControl.valueChanges.subscribe(newDate => {
      this.minDateRet = newDate;
    })
  }

  onSearch(){
    this.origin = this.searchForm.value['origin']; 
    this.destination = this.searchForm.value['destination'];
    this.type = this.searchForm.value['type'];
    this.departure = this.searchForm.value['departure'];
    this.ret = this.searchForm.value['retControl'];
    this.num = this.searchForm.value['num'];
    this.classType = this.searchForm.value['classType'];

    this.airlineService.updateClassType(this.classType);

    if(this.travelType === "round trip"){
      this.twoWay = true;
      this.search = false;
    }
    else{
      this.twoWay = false;
      this.search = true;
    }

    this.exs = false;
    this.exf = true;
  }

  toggleControl = new FormControl();
  onToggleChange() {
    this.sortWay = this.toggleControl.value;
  } 

}
