import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AirlineService } from 'src/app/services/airline.service';
import { Seat } from 'src/app/models/seat.model';
import { TOSeat } from 'src/app/t-o-models/t-o-seat.model';

@Component({
  selector: 'app-seat-details',
  templateUrl: './seat-details.component.html',
  styleUrls: ['./seat-details.component.css']
})
export class SeatDetailsComponent implements OnInit {
  seatForm: FormGroup
  seat: Seat = new Seat();

  constructor(private activeRoute: ActivatedRoute,private router: Router, private airlineService: AirlineService) { }

  ngOnInit(): void {
    this.initForm();

    this.activeRoute.params.subscribe(
      (params : Params) => {
        this.airlineService.getSeat(+params['id']).subscribe(
          result => {
            this.seat = Object.assign(new TOSeat(), result).convert();
            this.initForm();
          }
        )
      }
    )
  }

  initForm(){
    this.seatForm = new FormGroup({
      'name': new FormControl(this.seat.name),
      'category': new FormControl(this.seat.type),
      'price': new FormControl(this.seat.price),
      'discount': new FormControl(this.seat.discount, [Validators.required,Validators.min(0),Validators.max(100)])
    });


    this.seatForm.controls['name'].disable({onlySelf: true});
    this.seatForm.controls['category'].disable({onlySelf: true});
    this.seatForm.controls['price'].disable({onlySelf: true});
  }

  Cancel(){
    this.airlineService.ticketDoneChange(null);
    this.seatForm.reset();
    this.router.navigate(['../../'], {relativeTo: this.activeRoute});
  }

  Change(){
    this.seat.discount = this.seatForm.controls['discount'].value;
    this.airlineService.changeSeat(this.seat).subscribe(
      response => {
        this.seatForm.reset();
        this.airlineService.ticketDoneChange(this.seat);
        this.router.navigate(['../../'], {relativeTo: this.activeRoute});
      },
      error => {
        console.log(error);
      }
    )
  }

  canExit(){
    if(this.seatForm.dirty){
      return confirm("Are you sure?");
    }
    else{
      return true;
    }
  }
}
