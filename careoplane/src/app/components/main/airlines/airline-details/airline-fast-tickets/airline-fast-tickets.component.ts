import { Component, OnInit, Input } from '@angular/core';
import { AirlineService } from 'src/app/services/airline.service';
import { ActivatedRoute } from '@angular/router';
import { Airline } from 'src/app/models/airline.model';
import { Seat } from 'src/app/models/seat.model';

@Component({
  selector: 'app-airline-fast-tickets',
  templateUrl: './airline-fast-tickets.component.html',
  styleUrls: ['./airline-fast-tickets.component.css']
})
export class AirlineFastTicketsComponent implements OnInit {
  @Input() airline: Airline;
  @Input() back: string;
  @Input() admin: boolean;

  constructor() { }
  
  ngOnInit(): void {
  }
}
