import { Component, OnInit } from '@angular/core';
import { Airline } from 'src/app/models/airline.model';
import { AirlineService } from 'src/app/services/airline.service';

@Component({
  selector: 'app-airlines-list',
  templateUrl: './airlines-list.component.html',
  styleUrls: ['./airlines-list.component.css']
})
export class AirlinesListComponent implements OnInit {
  airlines: Airline[];

  constructor(private airlineService: AirlineService) { }

  ngOnInit(): void {
    this.airlineService.airlinesChanged.subscribe(
      (airlines:Airline[])=> {
        this.airlines = airlines;
      }
    )
    this.airlineService.getAirlines();
  }

}
