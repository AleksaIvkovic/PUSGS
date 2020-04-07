import { Component, OnInit, OnDestroy } from '@angular/core';
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
      }
    )
    this.airlineService.getAirlines();
    this.airlineService.getAllFlights();
  }

  ngOnDestroy(): void {
    this.airlinesSubscription.unsubscribe();
  }
}
