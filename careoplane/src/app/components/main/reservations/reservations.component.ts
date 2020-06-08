import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FlightReservation } from 'src/app/models/flight-reservation.model';
import { AirlineService } from 'src/app/services/airline.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  loggedInUser: User;
  flightReservationsLoaded: boolean = false;
  flightReservations: FlightReservation[] = [];
  flightInvitations: FlightReservation[] = [];
  flightHistory: FlightReservation[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private airlineService: AirlineService
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.userService.getLoggedInUser();

    this.airlineService.getReservations().subscribe(
      result => {
        for(let flightReservation of result){
          if(new Date(flightReservation.flightReservationDetails[0].flight.arrival).valueOf() < new Date().valueOf()){
            if(!this.checkReservations(flightReservation.reservationId,this.flightHistory))
              this.flightHistory.push(flightReservation);
          }
          else{
            for(let flightDetails of flightReservation.flightReservationDetails){
              for(let passengerSeat of flightDetails.passengerSeats){
                if(passengerSeat.username == localStorage.getItem('username')){
                  if(passengerSeat.accepted){
                    if(!this.checkReservations(flightReservation.reservationId,this.flightReservations))
                      this.flightReservations.push(flightReservation);
                  }
                  else{
                    if(!this.checkReservations(flightReservation.reservationId,this.flightInvitations))
                      this.flightInvitations.push(flightReservation);
                  }
                }
              }
            }
          }
        }
        this.flightReservationsLoaded = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  checkReservations(id: number, reservations: FlightReservation[]){
    for(let reservation of reservations){
      if(id == reservation.reservationId)
        return true;
    }
    return false;
  }
}
