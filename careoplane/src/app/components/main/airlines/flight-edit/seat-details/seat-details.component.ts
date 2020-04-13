import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Flight } from 'src/app/models/flight.model';
import { AirlineService } from 'src/app/services/airline.service';
import { Seat } from 'src/app/models/seat.model';

@Component({
  selector: 'app-seat-details',
  templateUrl: './seat-details.component.html',
  styleUrls: ['./seat-details.component.css']
})
export class SeatDetailsComponent implements OnInit {
  seatForm: FormGroup
  flight: Flight;
  seat: Seat;

  constructor(private activeRoute: ActivatedRoute,private router: Router, private airlineService: AirlineService) { }

  ngOnInit(): void {
    let fid = +this.router.url.split('/')[3];
    this.flight = this.airlineService.getFlight(fid);
    this.activeRoute.params.subscribe((params:Params)=>{
      this.seat = this.flight.seats[+params['id']];
      this.initForm();
    });

    this.initForm();
  }

  initForm(){
    this.seatForm = new FormGroup({
      'id': new FormControl(this.seat.id),
      'category': new FormControl(this.seat.type),
      'price': new FormControl(this.seat.price),
      'discount': new FormControl(this.seat.discount, [Validators.required,Validators.min(0)])
    });

    this.seatForm.controls['id'].disable({onlySelf: true});
    this.seatForm.controls['category'].disable({onlySelf: true});
    this.seatForm.controls['price'].disable({onlySelf: true});
  }

  Change(){
    this.seat.discount = this.seatForm.controls['discount'].value;
    this.airlineService.changeSeatDiscount(this.seat);
    this.router.navigate(['../../'], {relativeTo: this.activeRoute});
  }
}
