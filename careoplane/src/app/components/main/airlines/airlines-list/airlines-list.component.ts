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

  origin: string;
  destination: string;
  type: string;
  departure: Date;
  ret: Date;
  num: number;

  searchForm: FormGroup;
  search: boolean = false;

  constructor(private airlineService: AirlineService) { }

  ngOnInit(): void {
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
    this.initForm();
  }

  ngOnDestroy(): void {
    this.airlinesSubscription.unsubscribe();
    this.flightsSubscription.unsubscribe();
  }

  private initForm() {
    let origin = '';
    let destination = '';
    let departure = null;
    let ret = null;
    let num = 1;
    let type = 'one way';
    let today = new Date();
    let typeControl: FormControl = new FormControl(type, Validators.required);
    let retControl: FormControl = new FormControl(ret);
    let departureControl: FormControl = new FormControl(departure);

    this.searchForm = new FormGroup({
      'origin': new FormControl(origin, Validators.required),
      'destination': new FormControl(destination, Validators.required),
      'departure': new FormControl(departure, Validators.required),
      retControl,
      'num' : new FormControl(num, [Validators.required, Validators.min(1)]),
      typeControl
    });

    typeControl.valueChanges.subscribe(type => {
      if (type==="round trip") {
        retControl.setValidators(Validators.required);
      } else {
        retControl.setValidators(null);
      }
      retControl.updateValueAndValidity();
    });
  }

  onSearch(){
    this.search = true;
    this.origin = this.searchForm.value['origin']; 
    this.destination = this.searchForm.value['destination'];
    this.type = this.searchForm.value['type'];
    this.departure = this.searchForm.value['departure'];
    this.ret = this.searchForm.value['ret'];
    this.num = this.searchForm.value['num'];
  }
}
