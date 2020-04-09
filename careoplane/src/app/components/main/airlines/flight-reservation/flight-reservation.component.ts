import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Flight } from 'src/app/models/flight.model';
import { AirlineService } from 'src/app/services/airline.service';


@Component({
  selector: 'app-flight-reservation',
  templateUrl: './flight-reservation.component.html',
  styleUrls: ['./flight-reservation.component.css']
})
export class FlightReservationComponent implements OnInit, OnDestroy {
  paramsSub: Subscription;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  flight1: Flight;
  tickets = [] as any;
  passengers: number = 1;
  checked: boolean = true;

  constructor(private _formBuilder: FormBuilder, private activeRoute: ActivatedRoute, private airlineService: AirlineService) {}

  public checkTickets(): void{
    if(this.tickets != []){
      if(this.tickets.selectedSeats.length == this.passengers){
        this.checked = false;
        return;
      }
    }
    this.checked = true;
  }

  Reset(){
    this.airlineService.resetTickets(this.tickets);
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params: Params) => {
          this.flight1 = this.airlineService.getFlight(+params['fid']);
      }
    );

    this.airlineService.ticketsChanged.subscribe((tickets:any) => {
      this.tickets = tickets;
      this.checkTickets();
    });

    this.paramsSub = this.activeRoute.params.subscribe((params: Params) => {
    });
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['']
    });
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

}
