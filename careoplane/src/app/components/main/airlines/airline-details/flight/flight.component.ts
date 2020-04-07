import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  @Input() flight: Flight;
  @Input() flightId: number;
  @Input() airlineId : number;
  @Input() back: string;
  @Input() airlineName: string = "";

  backStr: string;
  count: number;

  constructor() { }

  ngOnInit(): void {
    this.count = this.flight.connections.length;
    if(this.back == 'one'){
        this.backStr = '../';
    }
    else{
      this.backStr = '../../'
    }
  }

}
