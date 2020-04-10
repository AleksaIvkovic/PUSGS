import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  @Input() flight: Flight;
  @Input() back: string;
  @Input() showLink:boolean;

  backStr: string;

  constructor() { }

  ngOnInit(): void {
    if(this.back == 'one'){
        this.backStr = '../';
    }
    else{
      this.backStr = '../../'
    }
  }

}
