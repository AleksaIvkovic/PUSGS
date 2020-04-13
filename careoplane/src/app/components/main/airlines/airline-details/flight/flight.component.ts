import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';
import { AirlineService } from 'src/app/services/airline.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  @Input() flight: Flight;
  @Input() back: string;
  @Input() showLink:boolean;
  classType: string = 'any';

  backStr: string;
  price: string;
  constructor(private airlineSerice: AirlineService) { }

  ngOnInit(): void {
    if(this.back == 'one'){
        this.backStr = '../';
    }
    else{
      if(this.back == 'two'){
        this.backStr = '../../';
      }
      else{
        this.backStr = '../../../';
      }
    }

    this.airlineSerice.classType.subscribe(newClass => {
      this.classType = newClass;

      if(this.classType === 'any')
      {
        this.price = this.flight.pricess[2] + '-' + this.flight.pricess[0];
      }
      else{
        if(this.classType === 'first'){
          this.price = this.flight.pricess[0].toString();
        }
        else{
          if(this.classType === 'business'){
            this.price = this.flight.pricess[1].toString();
          }
          else{
            this.price = this.flight.pricess[2].toString();
          }
        }
      }
    });

    if(this.classType === 'any')
      {
        this.price = this.flight.pricess[2] + '-' + this.flight.pricess[0];
      }
      else{
        if(this.classType === 'first'){
          this.price = this.flight.pricess[0].toString();
        }
        else{
          if(this.classType === 'business'){
            this.price = this.flight.pricess[1].toString();
          }
          else{
            this.price = this.flight.pricess[2].toString();
          }
        }
      }
  }

}
