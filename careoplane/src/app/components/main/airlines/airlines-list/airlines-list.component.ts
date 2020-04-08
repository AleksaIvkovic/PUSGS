import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Airline } from 'src/app/models/airline.model';
import { AirlineService } from 'src/app/services/airline.service';
import { Subscription } from 'rxjs';
import { Flight } from 'src/app/models/flight.model';

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

  minDateDep: Date = new Date();
  minDateRet: Date = new Date();

  searchForm: FormGroup;
  search: boolean = false;
  twoWay: boolean = false;

  airlineName: string;
  sortBy: string = 'price';
  way:boolean = false;
  
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
        this.initForm();
      }
    )
    this.airlineService.getAirlines();
    this.airlineService.getAllFlights();
    console.log(this.airlines);
    console.log(this.flights);
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
      'type': this.typeControl
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
    this.type = this.searchForm.value['typeControl'];
    this.departure = this.searchForm.value['departure'];
    this.ret = this.searchForm.value['retControl'];
    this.num = this.searchForm.value['num'];

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
}
