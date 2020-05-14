import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';
import { AirlineService } from 'src/app/services/airline.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

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
  @Input() classType: string;
  @Input() admin: boolean;
  backStr: string;
  
  flights: Flight[];
  flightsSubscription: Subscription;

  constructor(private airlineService: AirlineService, private router: Router, private activeRoute: ActivatedRoute) { }

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

  public Reserve(id1: number, id2: number){
    let flights = [id1.toString(),id2.toString()];

    this.router.navigate([this.backStr,flights,this.classType,this.num,'reservation'],{relativeTo:this.activeRoute})
  }
}
