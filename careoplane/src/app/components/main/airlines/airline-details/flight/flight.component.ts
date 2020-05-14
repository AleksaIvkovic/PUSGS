import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';
import { AirlineService } from 'src/app/services/airline.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FastTicket } from 'src/app/models/fast-ticket.model';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  @Input() flight: Flight;
  @Input() fastTicket: FastTicket = null;
  @Input() back: string;
  @Input() admin:boolean;
  @Input() classType: string = 'any';
  @Input() roundTrip: boolean = false;
  @Input() passengers: number;
  backStr: string;
  price: any;
  constructor(private airlineService: AirlineService, private router: Router, private activeRoute: ActivatedRoute) { }

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

    if(this.fastTicket){
      this.flight = this.fastTicket.flight;
    }

    this.airlineService.classType.subscribe(newClass => {
      this.classType = newClass;

      if(this.classType === 'first'){
        this.price = this.flight.pricess[0];
      }
      else{
        if(this.classType === 'business'){
          this.price = this.flight.pricess[1];
        }
        else{
          this.price = this.flight.pricess[2];
        }
      }
    });

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

  Edit(){
    this.router.navigate(['../',this.flight.id,'edit-flight'],{relativeTo:this.activeRoute});
  }

  EditSeats(){
    this.router.navigate(['../',this.flight.id,'edit-seats'],{relativeTo:this.activeRoute});
  }

  Reserve(){
    this.router.navigate([this.backStr,this.flight.id,this.classType,this.passengers,'reservation'],{relativeTo:this.activeRoute});
  }

  FastReservation(){
    this.fastTicket.seat.occupied = true;
  }

  EditFastReservation(){
    let id = this.flight.seats.indexOf(this.fastTicket.seat);
    this.router.navigate(['../',this.fastTicket.flight.id,'edit-seats',id,'seat'],{relativeTo:this.activeRoute});
  }

  DeleteFastReservation(){
    
  }
}
