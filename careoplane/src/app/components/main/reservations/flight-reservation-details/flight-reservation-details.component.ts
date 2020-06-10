import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AirlineService } from 'src/app/services/airline.service';
import { FlightReservation } from 'src/app/models/flight-reservation.model';
import { MatDialog } from '@angular/material/dialog';
import { RatingComponent } from 'src/app/components/rating/rating.component';

@Component({
  selector: 'app-flight-reservation-details',
  templateUrl: './flight-reservation-details.component.html',
  styleUrls: ['./flight-reservation-details.component.scss']
})
export class FlightReservationDetailsComponent implements OnInit {
  reservation: FlightReservation;
  type : string = null;
  username: string;
  expired: boolean = false;
  canCancel: boolean = false;
  flightScored: boolean[] = [];
  airlineScored: boolean[] = [];
  constructor(private ratingDialog: MatDialog, private activeRoute: ActivatedRoute, private router: Router, private airlineService: AirlineService) { }

  ngOnInit(): void {
    this.reservation = new FlightReservation();
    
    this.activeRoute.params.subscribe(
      params => {
        if(params['id']){
          this.username = localStorage.getItem('username');
          this.airlineService.getReservation(+params['id'], this.username).subscribe(
            result => {
              this.reservation = result;
              this.CheckTime();

              for(let details of this.reservation.flightReservationDetails){
                for(let passengerSeat of details.passengerSeats){
                  if(passengerSeat.username == this.username){
                    this.flightScored.push(passengerSeat.flightScored);
                    this.airlineScored.push(passengerSeat.airlineScored);
                  }
                }
              }
            },
            error => {
              console.log(error);
              this.expired = true;
            }
          )
          this.type = params['type'];
        }
      }
    )

    this.activeRoute.queryParams.subscribe(
      params => {
        if(params['id']){
          this.username = params['username'];
          this.airlineService.getReservation(+params['id'],this.username).subscribe(
            result => {
              this.reservation = result;
            },
            error => {
              console.log(error);
              this.expired = true;
            }
          )
          this.type = 'invitation';
        }
      }
    )
  }

  ScoreFlight(id: number, passengerSeatId: number, index: number){
    let dialogRef = this.ratingDialog.open(
      RatingComponent, {
      }
    );

    dialogRef.afterClosed()
    .subscribe(
      (result) => {
        if(result != undefined){
          this.airlineService.rateFlight(result, id, this.username, passengerSeatId, this.reservation.reservationId).subscribe(
            params => {
              this.flightScored[index] = true;
            },
            error => {
              console.log(error)
            }
          )
        }
      })
  }

  ScoreAirline(id: string, passengerSeatId: number, index: number){
    let dialogRef = this.ratingDialog.open(
      RatingComponent, {
      }
    );
    
    dialogRef.afterClosed()
    .subscribe(
      (result) => {
        if(result != undefined){
          this.airlineService.rateAirline(result, id, this.username, passengerSeatId, this.reservation.reservationId).subscribe(
            params => {
              this.airlineScored[index] = true;
            },
            error => {
              console.log(error)
            }
          )
        }
      })
  }

  Accept(){
    this.airlineService.acceptInvitation(this.reservation, this.username).subscribe(
      result => {
        this.router.navigate(['../../../','reservations'],{relativeTo:this.activeRoute});
      },
      error => {
        console.log(error);
      }
    )
  }

  Cancel(){
    this.airlineService.declineInvitation(this.reservation, this.username).subscribe(
      result => {
        this.router.navigate(['../../../','reservations'],{relativeTo:this.activeRoute});
      },
      error => {
        console.log(error);
      }
    )
  }

  CheckTime(){
    if(this.reservation.flightReservationDetails != null && this.reservation.flightReservationDetails != []){
      if(new Date(this.reservation.flightReservationDetails[0].flight.departure).valueOf() - (3*60*60*1000) < (new Date().valueOf()))
        this.canCancel = false;
      else
        this.canCancel = true;
    }
    else
      this.canCancel = false;
  }
}
