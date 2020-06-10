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
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-flight-reservation',
  templateUrl: './flight-reservation.component.html',
  styleUrls: ['./flight-reservation.component.css']
})
export class FlightReservationComponent implements OnInit {

  firstFormGroup: FormGroup;
  firstfirstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  passengerChoiceControl: FormArray;
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
  passengersList: {
    username: string,
    name: string,
    surname: string,
    passport: string
  }[] = [];

  secondFlight: boolean = false;

  finalPrice: number = 0;

  constructor(private datePipe: DatePipe, private userService: UserService, private router: Router, private _formBuilder: FormBuilder, private activeRoute: ActivatedRoute, private airlineService: AirlineService) {}

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
      },
      error => {
        console.log(error);
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

        this.passengerChoiceControl = new FormArray([]);
        this.passengersControl = new FormArray([]);
        this.passengersControl2 = new FormArray([]);

        for(let i = 0; i < this.passengers; i++){
          this.passengerChoiceControl.push(new FormGroup({
            'username': new FormControl(''),
            'full name': new FormGroup({
              'name': new FormControl(''),
              'surname': new FormControl(''),
              'passport': new FormControl('')
            })
          }, this.checkPassengerInformationForm))
          this.passengersControl.push(new FormGroup({
            'id': new FormControl(''),
            'passenger': new FormControl('')
          }, this.checkPassengerForm))
          this.passengersControl2.push(new FormGroup({
            'id': new FormControl(''),
            'passenger': new FormControl('')
          }, this.checkPassengerForm))
        }

        this.firstfirstFormGroup = new FormGroup({
          'passengerChoiceControl': this.passengerChoiceControl
        });
        this.secondFormGroup = new FormGroup({
          'passengersControl': this.passengersControl
        });
        this.fourthFormGroup = new FormGroup({
          'passengersControl': this.passengersControl2
        });
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
  }

  Done(){
    let reservation: FlightReservation = new FlightReservation();
    let flightReservationDetails: FlightReservationDetails = new FlightReservationDetails();
    flightReservationDetails.flight = new TOFlight(this.flight1.airlineName,this.flight1.origin,
      this.flight1.destination,this.datePipe.transform(this.flight1.departure, 'dd.MM.yyyy HH:mm'),
      this.datePipe.transform(this.flight1.arrival, 'dd.MM.yyyy HH:mm'),this.flight1.distance,
      this.flight1.connections,this.flight1.id,[],[],[],[]);
    let counter = 0;
    for(let passenger of (<FormArray>this.secondFormGroup.controls['passengersControl']).controls){
      let seat;
      for(let tempSeat of this.flight1.seats){
        if(tempSeat.seatId == this.tickets.seatstoStore[counter])
          seat = tempSeat;
      }

      if((<FormGroup>passenger).controls['passenger'].value.name == ''){
        flightReservationDetails.passengerSeats.push(
          new PassengersSeat(seat,
          (<FormGroup>passenger).controls['passenger'].value.username,
          '',
          '',
          '')
        );
      }
      else{
        flightReservationDetails.passengerSeats.push(
          new PassengersSeat(seat,
            '',
            (<FormGroup>passenger).controls['passenger'].value.name,
            (<FormGroup>passenger).controls['passenger'].value.surname,
            (<FormGroup>passenger).controls['passenger'].value.passport)
        );
      }
      
      counter++;
    }

    reservation.flightReservationDetails.push(flightReservationDetails);

    if(this.flight2 != null){
      let flightReservationDetails2: FlightReservationDetails = new FlightReservationDetails();
      flightReservationDetails2.flight = new TOFlight(this.flight2.airlineName,this.flight2.origin,
        this.flight2.destination,this.datePipe.transform(this.flight2.departure, 'dd.MM.yyyy HH:mm'),
        this.datePipe.transform(this.flight2.arrival, 'dd.MM.yyyy HH:mm'),
        this.flight2.distance,this.flight2.connections,this.flight2.id,[],[],[],[]);
      let counter = 0;
      for(let passenger of (<FormArray>this.fourthFormGroup.controls['passengersControl']).controls){
        let seat;
        for(let tempSeat of this.flight2.seats){
          if(tempSeat.seatId == this.tickets2.seatstoStore[counter])
            seat = tempSeat;
        }

        if((<FormGroup>passenger).controls['passenger'].value.name == ''){
          flightReservationDetails2.passengerSeats.push(
            new PassengersSeat(seat,
            (<FormGroup>passenger).controls['passenger'].value.username,
            '',
            '',
            '')
          );
        }
        else{
          flightReservationDetails2.passengerSeats.push(
            new PassengersSeat(seat,
              '',
              (<FormGroup>passenger).controls['passenger'].value.name,
              (<FormGroup>passenger).controls['passenger'].value.surname,
              (<FormGroup>passenger).controls['passenger'].value.passport)
          );
        }
        counter++;
      }

      reservation.flightReservationDetails.push(flightReservationDetails2);
    }

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
    this.airlineService.resetTickets(this.tickets, this.tickets2);
  }

  getList(){
    return (<FormArray>this.secondFormGroup.get('passengersControl')).controls
  }

  getChoiceList(){
    return (<FormArray>this.firstfirstFormGroup.get('passengerChoiceControl')).controls
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

  checkPassengerInformationForm(control: FormArray): {[s:string]:boolean}
  {
    if(!control){
      return null;
    }

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

  checkPassengerForm(control: FormArray): {[s:string]:boolean}
  {
    if(!control){
      return null;
    }

    if((<FormControl>(control.controls['passenger'])).value === '')
    {
      return {'': true};
    }

    return null;
  }

  CheckFirstStep(){
    return !this.firstfirstFormGroup.valid;
  }

  CheckSecondStep(){
    return !this.secondFormGroup.valid;
  }

  CheckFourthStep(){
    return !this.fourthFormGroup.valid;
  }

  CalculatePrice(){
    if(this.flight2 == null){
      this.finalPrice = this.tickets.totalamount;
    }
    else{
      if(this.tickets2 != null){
        this.finalPrice = this.tickets.totalamount + this.tickets2.totalamount;
      }
    }
  }

  CreatePassengerList(){
    this.passengersList = [];
    for(let passenger of (<FormArray>this.firstfirstFormGroup.controls['passengerChoiceControl']).controls){
      let username = '';
      if((<FormGroup>passenger).controls['username'].value != ''){
        username = (<FormGroup>passenger).controls['username'].value;
        this.passengersList.push({
          'username': username,
          'name' : '',
          'surname' : '',
          'passport' : '',
        });
      }
      else{
        username = (<FormGroup>(<FormGroup>passenger).controls['full name']).controls['name'].value + ' ' + 
                  (<FormGroup>(<FormGroup>passenger).controls['full name']).controls['surname'].value; 
        this.passengersList.push({
          'username': username,
          'name' : (<FormGroup>(<FormGroup>passenger).controls['full name']).controls['name'].value,
          'surname' : (<FormGroup>(<FormGroup>passenger).controls['full name']).controls['surname'].value,
          'passport' : (<FormGroup>(<FormGroup>passenger).controls['full name']).controls['passport'].value,
        });
      }
    }
  }
}
