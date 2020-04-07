import { Component, OnInit, OnDestroy } from '@angular/core';
import { Airline } from 'src/app/models/airline.model';
import { AirlineService } from 'src/app/services/airline.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-airlines-list',
  templateUrl: './airlines-list.component.html',
  styleUrls: ['./airlines-list.component.css']
})
export class AirlinesListComponent implements OnInit, OnDestroy {
  airlines: Airline[];
  paramsSub: Subscription;

  constructor(private airlineService: AirlineService) { }

  ngOnInit(): void {
    this.paramsSub = this.airlineService.airlinesChanged.subscribe(
      (airlines:Airline[])=> {
        this.airlines = airlines;
      }
    )
    this.airlineService.getAirlines();
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }
}
