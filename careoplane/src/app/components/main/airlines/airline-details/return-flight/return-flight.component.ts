import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';
import { AirlineService } from 'src/app/services/airline.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-return-flight',
  templateUrl: './return-flight.component.html',
  styleUrls: ['./return-flight.component.css']
})
export class ReturnFlightComponent implements OnInit, OnDestroy {
  @Input() flight: Flight;
  @Input() back: string;
  @Input() ret: Date;
  @Input() num: number;
  backStr: string;
  
  flights: Flight[];
  flightsSubscription: Subscription;

  constructor(private airlineService: AirlineService) { }

  ngOnInit(): void {
    this.flightsSubscription = this.airlineService.flightsChanged.subscribe(
      (flights:Flight[])=> {
        this.flights = flights;
      }
    );
    this.airlineService.getAllFlights();

    if(this.back == 'one'){
        this.backStr = '../';
    }
    else{
      this.backStr = '../../';
    }
  }

  ngOnDestroy(): void {
    this.flightsSubscription.unsubscribe();
  }
}
