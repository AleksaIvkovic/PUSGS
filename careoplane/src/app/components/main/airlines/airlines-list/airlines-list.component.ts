import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Airline } from 'src/app/models/airline.model';
import { AirlineService } from 'src/app/services/airline.service';
import { Subscription, Observable } from 'rxjs';
import { Flight } from 'src/app/models/flight.model';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-airlines-list',
  templateUrl: './airlines-list.component.html',
  styleUrls: ['./airlines-list.component.css']
})
export class AirlinesListComponent implements OnInit, OnDestroy {
  airlines: Airline[];
  airlinesSubscription: Subscription;
  flights: Flight[];
  flightsSubscription: Subscription;

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

  airlineName: string;
  sortBy: string = 'price';
  sortWay:boolean = false;
  classType: string;
  
  constructor(private airlineService: AirlineService) { }

  ngOnInit(): void {
    this.initForm();
    this.airlinesSubscription = this.airlineService.airlinesChanged.subscribe(
      (airlines:Airline[])=> {
        this.airlines = airlines;
      }
    )
    this.flightsSubscription = this.airlineService.flightsChanged.subscribe(
      (flights:Flight[])=> {
        this.flights = flights;
      }
    )
    this.airlineService.getAirlines();
    this.airlineService.getAllFlights();

    for(let airline of this.airlines){
      for(let city of airline.destinations){
        if(!this.cities.includes(city.value)){
          this.cities.push(city.value);
        }
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
    this.airlinesSubscription.unsubscribe();
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
