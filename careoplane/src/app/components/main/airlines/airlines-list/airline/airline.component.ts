import { Component, OnInit, Input } from '@angular/core';
import { Airline } from 'src/app/models/airline.model';

@Component({
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.css']
})
export class AirlineComponent implements OnInit {
  @Input() airline: Airline;
  @Input() id: number;

  constructor() { }

  ngOnInit(): void {
  }

}
