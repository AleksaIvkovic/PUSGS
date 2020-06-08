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
  
  constructor(private ratingDialog: MatDialog, private activeRoute: ActivatedRoute, private router: Router, private airlineService: AirlineService) { }

  ngOnInit(): void {
    this.reservation = new FlightReservation();

    this.activeRoute.params.subscribe(
      params => {
        if(params['id']){
          this.airlineService.getReservation(+params['id']).subscribe(
            result => {
              this.reservation = result;
            },
            error => {
              console.log(error);
            }
          )
          this.type = params['type'];
          this.username = localStorage.getItem('username');
        }
      }
    )

    this.activeRoute.queryParams.subscribe(
      params => {
        if(params['id']){
          this.airlineService.getReservation(+params['id']).subscribe(
            result => {
              this.reservation = result;
            },
            error => {
              console.log(error);
            }
          )
          this.type = 'invitation';
          this.username = params['username'];
        }
      }
    )
  }

  ScoreFlight(){
    let dialogRef = this.ratingDialog.open(
      RatingComponent, {
      }
    );

    dialogRef.afterClosed()
    .subscribe(
      (result) => {
        if (result === "success") {
          
        }
    })
  }

  ScoreAirline(){
    let dialogRef = this.ratingDialog.open(
      RatingComponent, {
      }
    );
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
}
