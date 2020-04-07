import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-flight-reservation',
  templateUrl: './flight-reservation.component.html',
  styleUrls: ['./flight-reservation.component.css']
})
export class FlightReservationComponent implements OnInit, OnDestroy {
  paramsSub: Subscription;

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramsSub = this.activeRoute.params.subscribe((params: Params) => {
    })
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

}
