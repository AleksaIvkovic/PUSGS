import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

import { Airline } from 'src/app/models/airline.model';
import { AirlineService } from 'src/app/services/airline.service';

@Component({
  selector: 'app-airline-details',
  templateUrl: './airline-details.component.html',
  styleUrls: ['./airline-details.component.css']
})
export class AirlineDetailsComponent implements OnInit {
  id: number;
  airline: Airline;
  
  departure: Date;
  arrival : Date;
  duration : Date;
  distance : number;
  connections : number;
  price : number;

  constructor(private activeRoute: ActivatedRoute, private airlineService: AirlineService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params: Params) => {
          this.id = params['id'];
          this.airline = this.airlineService.getAirline(this.id);
      }
    );
  }

  
}
