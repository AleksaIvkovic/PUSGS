import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import { Flight } from 'src/app/models/flight.model';
import { AirlineService } from 'src/app/services/airline.service';
import { FlightReservation } from 'src/app/models/flight-reservation.model';
import { UserService } from 'src/app/services/user.service';
import { TOFlight } from 'src/app/t-o-models/t-o-flight.model';
import { User } from 'src/app/models/user.model';
import { FlightReservationDetails } from 'src/app/models/flight-reservation-details.model';
import { PassengersSeat } from 'src/app/models/passengers-seat.model';


@Component({
  selector: 'app-flight-reservation',
  templateUrl: './flight-reservation.component.html',
  styleUrls: ['./flight-reservation.component.css']
})
export class FlightReservationComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  passengersControl: FormArray;
  passengersControl2: FormArray;
  flight1: Flight;
  flight2: Flight = null;
  tickets = [] as any;
  tickets2 = [] as any;
  passengers: number;
  checked: boolean = true;
  checked2: boolean = true;
  classType: string;
  friends: string[] = [];
  secondFlight: boolean = false;

  constructor(private userService: UserService, private router: Router, private _formBuilder: FormBuilder, private activeRoute: ActivatedRoute, private airlineService: AirlineService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      response => {
        let user = Object.assign(new User("","","","","","","",""),response);
        this.friends.push('')

        for(let friend of user.tOFriendsA){
          if(friend.status != "pending")
            this.friends.push(friend.friendB.userName);
        }

        for(let friend of user.tOFriendsB){
          if(friend.status != "pending")
            this.friends.push(friend.friendA.userName);
        }

        this.friends.push(user.userName);
      }
    )

    this.activeRoute.queryParams.subscribe(
      (params: Params) => {
          if(params['flight2']){
            this.secondFlight = true;
          }
          if(params['flight1']){
            this.airlineService.getFlightDB(+params['flight1']).subscribe(
              response => {
                this.flight1 = Object.assign(new TOFlight(), response).convert();
                this.airlineService.flightLoaded(this.flight1);
              },
              error => {
                console.log(error);
              }
            )
          }
          if(params['flight2']){
            this.airlineService.getFlightDB(+params['flight2']).subscribe(
              response => {
                this.flight2 = Object.assign(new TOFlight(), response).convert();
                this.airlineService.flightLoaded2(this.flight2);
              },
              error => {
                console.log(error);
              }
            )
          }
          this.classType = params['classType'];
          this.passengers = params['passengers'];
      }
    );
  
    this.airlineService.ticketsChanged.subscribe((tickets:any) => {
      this.tickets = tickets;
      this.checkTickets();
      if(!this.checked)
        this.fillSeats();
    });

    this.airlineService.ticketsChanged2.subscribe((tickets:any) => {
      this.tickets2 = tickets;
      this.checkTickets2();
      if(!this.checked2)
        this.fillSeats2();
    });
    
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['']
    });

    this.thirdFormGroup = this._formBuilder.group({
      firstCtrl: ['']
    });

    this.passengersControl = new FormArray([]);
    this.passengersControl2 = new FormArray([]);

    for(let i = 0; i < this.passengers; i++){
      this.passengersControl.push(new FormGroup({
        'id': new FormControl(''),
        'username': new FormControl(''),
        'full name': new FormGroup({
          'name': new FormControl(''),
          'surname': new FormControl(''),
          'passport': new FormControl('')
        })
      }, this.checkForm))
      this.passengersControl2.push(new FormGroup({
        'id': new FormControl(''),
        'username': new FormControl(''),
        'full name': new FormGroup({
          'name': new FormControl(''),
          'surname': new FormControl(''),
          'passport': new FormControl('')
        })
      }, this.checkForm))
    }

    this.secondFormGroup = new FormGroup({
      'passengersControl': this.passengersControl
    });
    this.fourthFormGroup = new FormGroup({
      'passengersControl': this.passengersControl2
    });
  }

  Done(){
    let reservation: FlightReservation = new FlightReservation();
    let flightReservationDetails: FlightReservationDetails = new FlightReservationDetails();
    flightReservationDetails.flight = new TOFlight(this.flight1.airlineName,this.flight1.origin,this.flight1.destination,this.flight1.departure.toString(),this.flight1.arrival.toString(),this.flight1.distance,this.flight1.connections,this.flight1.id,[],[],[],[]);
    let counter = 0;
    for(let passenger of (<FormArray>this.secondFormGroup.controls['passengersControl']).controls){
      flightReservationDetails.passengerSeats.push(


        new PassengersSeat(this.tickets.seatstoStore[counter],
        (<FormGroup>passenger).controls['username'].value,
        (<FormGroup>(<FormGroup>passenger).controls['full name']).controls['name'].value,
        (<FormGroup>(<FormGroup>passenger).controls['full name']).controls['surname'].value,
        (<FormGroup>(<FormGroup>passenger).controls['full name']).controls['passport'].value)
      );
      counter++;
    }

    reservation.flightReservationDetails.push(flightReservationDetails);

    this.airlineService.makeReservation(reservation).subscribe(
      result =>
      {
        this.router.navigate(['../../../'], {relativeTo: this.activeRoute});
      },
      error =>
      {
        console.log(error);
      }
    )
  }

  checkTickets(){
    if(this.tickets != []){
      if(this.tickets.selectedSeats.length == this.passengers){
        this.checked = false;
        return;
      }
    }
    this.checked = true;
  }

  checkTickets2(){
    if(this.tickets2 != []){
      if(this.tickets2.selectedSeats.length == this.passengers){
        this.checked2 = false;
        return;
      }
    }
    this.checked2 = true;
  }

  Reset(){
    this.airlineService.resetTickets(this.tickets);
  }

  getList(){
    return (<FormArray>this.secondFormGroup.get('passengersControl')).controls
  }

  getList2(){
    return (<FormArray>this.fourthFormGroup.get('passengersControl')).controls
  }

  fillSeats(){
    let i = 0;
    for(let seat of this.tickets.selectedSeats){
      (<FormGroup>(<FormArray>this.secondFormGroup.get('passengersControl')).controls[i]).controls['id'].setValue(seat);
      (<FormGroup>(<FormArray>this.secondFormGroup.get('passengersControl')).controls[i]).controls['id'].disable({onlySelf: true});
      i++;
    }
  }

  fillSeats2(){
    let i = 0;
    for(let seat of this.tickets2.selectedSeats){
      (<FormGroup>(<FormArray>this.fourthFormGroup.get('passengersControl')).controls[i]).controls['id'].setValue(seat);
      (<FormGroup>(<FormArray>this.fourthFormGroup.get('passengersControl')).controls[i]).controls['id'].disable({onlySelf: true});
      i++;
    }
  }

  checkForm(control: FormArray): {[s:string]:boolean}
  {
    if(!control){
      return null;
    }

    console.log((<FormControl>(control.controls['username'])).value === '');
    console.log(!(<FormGroup>control.controls['full name']).valid);

    if(
      ((<FormControl>(control.controls['username'])).value === '') 
      && ((<FormControl>(<FormGroup>(control.controls['full name'])).controls['name']).value === ''
      || (<FormControl>(<FormGroup>(control.controls['full name'])).controls['surname']).value === '' 
      || (<FormControl>(<FormGroup>(control.controls['full name'])).controls['passport']).value === '' )
    )
    {
      return {'': true};
    }

    return null;
  }

  CheckSecondStep(){
    return !this.secondFormGroup.valid;
  }

  CheckFourthStep(){
    return !this.fourthFormGroup.valid;
  }
}
