import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Flight } from 'src/app/models/flight.model';
import { AirlineService } from 'src/app/services/airline.service';

@Component({
  selector: 'app-seats-edit',
  templateUrl: './seats-edit.component.html',
  styleUrls: ['./seats-edit.component.css']
})
export class SeatsEditComponent implements OnInit {
  flight: Flight;

  constructor(private activeRoute: ActivatedRoute, private airlineServie: AirlineService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.flight = this.airlineServie.getFlight(+params['fid']);
    });
  }

}
