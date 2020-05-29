import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {COMMA, ENTER, DASH} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Flight } from 'src/app/models/flight.model';
import { Airline } from 'src/app/models/airline.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AirlineService } from 'src/app/services/airline.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TOPrimaryObject } from 'src/app/t-o-models/t-o-primary-object.model';
import { TOFlight } from 'src/app/t-o-models/t-o-flight.model';
import { UserService } from 'src/app/services/user.service';
import { Admin } from 'src/app/models/admin.model';
import { TOAirline } from 'src/app/t-o-models/t-o-airline.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css']
})
export class FlightEditComponent implements OnInit {
  flight: Flight = new Flight();
  group: FormGroup;
  connectionsForm: FormArray = new FormArray([]);
  visible = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  airline: Airline = new Airline();
  minArrivalDate = new Date();
  minDepartureDate = new Date();
  edit: boolean;

  constructor(private datePipe: DatePipe, private router: Router, private activeRoute: ActivatedRoute, private airlineService: AirlineService, private userService: UserService) { }

  ngOnInit(): void {
    this.InitForm();

    let admin: Admin = <Admin>this.userService.getLoggedInUser();
    this.airlineService.getAirlineDB(admin.company).subscribe(
      result => {
        this.airline = Object.assign(new TOAirline(), result).convert();

        this.activeRoute.params.subscribe((params: Params) => {
          if(params['fid']){
            for(let flight of this.airline.flights){
              if(flight.id == +params['fid']){
                this.flight = flight;
                this.edit = true;
                this.InitForm();
              }
            }
          }
        });
      },
      error => {console.log(error);}
    );
  }

  InitForm(){
    if(this.edit){
      for(let connection of this.flight.connections){
        this.connectionsForm.push(
          new FormGroup({
            'city': new FormControl(connection.value, Validators.required),
            'id': new FormControl(connection.id)
          })
        )
      }

      this.group = new FormGroup({
        'origin': new FormControl(this.flight.origin,Validators.required),
        'destination': new FormControl(this.flight.destination, [Validators.required, this.checkDestination.bind(this)]),
        'departure': new FormControl(this.datePipe.transform(this.flight.departure, 'dd.MM.yyyy HH:mm'), [Validators.required, this.checkDepartureDate.bind(this)]),
        'arrival': new FormControl(this.datePipe.transform(this.flight.arrival, 'dd.MM.yyyy HH:mm'), [Validators.required, this.checkArrivalDate.bind(this)]),
        'distance': new FormControl(this.flight.distance, Validators.required),
        'connectionsForm': this.connectionsForm
      });

      this.group.controls['origin'].disable({onlySelf: true});
      this.group.controls['destination'].disable({onlySelf: true});
      this.group.controls['distance'].disable({onlySelf: true});
      this.group.controls['connectionsForm'].disable({onlySelf: true});
    }
    else{
      this.group = new FormGroup({
        'origin': new FormControl(this.flight.origin,Validators.required),
        'destination': new FormControl(this.flight.destination, [Validators.required, this.checkDestination.bind(this)]),
        'departure': new FormControl(this.flight.departure, [Validators.required, this.checkDepartureDate.bind(this)]),
        'arrival': new FormControl(this.flight.arrival, [Validators.required, this.checkArrivalDate.bind(this)]),
        'distance': new FormControl(this.flight.distance, Validators.required),
        'connectionsForm': this.connectionsForm
      });
    }

    this.group.controls['departure'].valueChanges.subscribe(value => {
      this.minArrivalDate = new Date(value);
      this.checkArrivalDate(<FormControl>this.group.controls['arrival']);
    });
  }

  onSubmit(){
    if(!this.edit){
      this.flight.origin = this.group.controls['origin'].value;
      this.flight.destination = this.group.controls['destination'].value;
      this.flight.departure = this.group.controls['departure'].value;
      this.flight.arrival = this.group.controls['arrival'].value;
      this.flight.distance = this.group.controls['distance'].value;
      this.flight.connections = new Array<TOPrimaryObject>();
      
      for(let connection of this.connectionsForm.controls){
        this.flight.connections.push(new TOPrimaryObject(0,connection.value['city'],0));this.flight.connections.push(new TOPrimaryObject(connection.value['id'],connection.value['city'],this.flight.id));
      }
  
      for(let price of this.airline.prices){
        this.flight.prices.push(price.value * this.flight.distance);
      }
  
      this.flight.conCount = this.flight.connections.length;

      this.flight.airlineName = this.airline.name;
      this.airlineService.AddFlgiht(this.flight).subscribe(
        response => {
          this.router.navigate(['../'],{relativeTo: this.activeRoute});
        },
        error => {
          console.log(error);
        }
      )
    }
    else{
      this.flight.departure = this.group.controls['departure'].value;
      this.flight.arrival = this.group.controls['arrival'].value;

      this.airlineService.EditFlight(this.flight).subscribe(
        response => {
          this.router.navigate(['../../'],{relativeTo: this.activeRoute});
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  checkDepartureDate(control: FormControl): {[s: string]: boolean} 
  {
    if(new Date(control.value).valueOf() <= new Date().valueOf()){
      return {'Date is incorrect': true};
    }
    return null; 
  }

  checkArrivalDate(control: FormControl): {[s: string]: boolean} 
  {
    if(new Date(control.value).valueOf() <= new Date(this.minArrivalDate).valueOf()){
      return {'Date is incorrect': true};
    }
    return null; 
  }
  
  checkDestination(control: FormControl): {[s: string]: boolean}{
    if(!this.group){
      return null;
    }
    if(this.group.controls['origin'].value === control.value){
      return {'Destination is incorrect': true};
    }
    return null; 
  }

  onAddConnection(){
    this.connectionsForm.push(
      new FormGroup({
        'city': new FormControl(null, Validators.required),
      }));
  }

  onDeleteConnection(i: number){
    this.connectionsForm.removeAt(i);
  }

  drop(event: CdkDragDrop<FormGroup[]>) {
    const dir = event.currentIndex > event.previousIndex ? 1 : -1;

    const from = event.previousIndex;
    const to = event.currentIndex;

    const temp = this.connectionsForm.at(from);
    for (let i = from; i * dir < to * dir; i = i + dir) {
      const current = this.connectionsForm.at(i + dir);
      this.connectionsForm.setControl(i, current);
    }
    this.connectionsForm.setControl(to, temp);
  }

  getList(){
    return (<FormArray>this.group.get('connectionsForm')).controls
  }

  Cancel(){
    if(this.edit)
      this.router.navigate(['../../'],{relativeTo: this.activeRoute});
    else
      this.router.navigate(['../'],{relativeTo: this.activeRoute});
  }
}
