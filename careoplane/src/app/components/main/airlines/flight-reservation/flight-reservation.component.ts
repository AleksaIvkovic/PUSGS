import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import { Flight } from 'src/app/models/flight.model';
import { AirlineService } from 'src/app/services/airline.service';
import { FlightReservation } from 'src/app/models/flight-reservation.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-flight-reservation',
  templateUrl: './flight-reservation.component.html',
  styleUrls: ['./flight-reservation.component.css']
})
export class FlightReservationComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  passengersControl: FormArray;

  flight1: Flight;
  

  tickets = [] as any;

  passengers: number;
  
  checked: boolean = true;
  classType: string;

  constructor(private userService: UserService, private router: Router, private _formBuilder: FormBuilder, private activeRoute: ActivatedRoute, private airlineService: AirlineService) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params: Params) => {
          if(params['fid']){
            this.flight1 = this.airlineService.getFlight(+params['fid']);
            this.classType = params['type'];
            this.passengers = params['passengers'];
          }
      }
    );
  
    this.airlineService.ticketsChanged.subscribe((tickets:any) => {
      this.tickets = tickets;
      this.checkTickets();
      this.fillSeats();
    });
    
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['']
    });

    this.passengersControl = new FormArray([]);

    for(let i = 0; i < this.passengers; i++){
      this.passengersControl.push(new FormGroup({
        'id': new FormControl(''),
        'username': new FormControl(''),
        'full name': new FormGroup({
          'name': new FormControl(''),
          'surname': new FormControl('')
        })
      }, this.checkForm))
    }

    this.secondFormGroup = new FormGroup({
      'passengersControl': this.passengersControl
    });
  }

  Done(){
    let reservation: FlightReservation = new FlightReservation(this.flight1.id);
    
    let i = 0;
    for(let ticket of this.tickets.seatstoStore){
      this.flight1.seats[ticket].occupied = true;
      reservation.seats.push(ticket);
      reservation.people.push({
        name: (<FormGroup>((<FormGroup>(this.passengersControl.controls[i])).controls['full name'])).controls['name'].value,
        surname: (<FormGroup>((<FormGroup>(this.passengersControl.controls[i])).controls['full name'])).controls['surname'].value,
        id: i
      });
      i++;
    }

    this.userService.addReservation(reservation);

    this.router.navigate(['../../../../'], {relativeTo: this.activeRoute});
  }

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

  getList(){
    return (<FormArray>this.secondFormGroup.get('passengersControl')).controls
  }

  fillSeats(){
    let i = 0;
    for(let seat of this.tickets.selectedSeats){
      (<FormGroup>(<FormArray>this.secondFormGroup.get('passengersControl')).controls[i]).controls['id'].setValue(seat);
      (<FormGroup>(<FormArray>this.secondFormGroup.get('passengersControl')).controls[i]).controls['id'].disable({onlySelf: true});
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
      || (<FormControl>(<FormGroup>(control.controls['full name'])).controls['surname']).value === '')
    )
    {
      return {'': true};
    }

    return null;
  }

  CheckSecondStep(){
    return !this.secondFormGroup.valid;
  }
}
