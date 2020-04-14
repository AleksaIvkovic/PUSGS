import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {COMMA, ENTER, DASH} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Flight } from 'src/app/models/flight.model';
import { Airline } from 'src/app/models/airline.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AirlineService } from 'src/app/services/airline.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css']
})
export class FlightEditComponent implements OnInit {
  flight: Flight;
  group: FormGroup;
  connectionsForm: FormArray;
  visible = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  airline: Airline;
  minArrivalDate = new Date();
  minDepartureDate = new Date();
  edit: boolean;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private airlineService: AirlineService) { }

  ngOnInit(): void {
    this.minArrivalDate = new Date();

    this.activeRoute.params.subscribe((params: Params) => {
      if(params['fid']){
        this.flight = this.airlineService.getFlight(params['fid']);
        this.edit = true;
      }
      else{
        this.flight = new Flight();
      }
    });

    this.airline = this.airlineService.getCurrentAirline();

    this.connectionsForm = new FormArray([]);

    if(this.edit){
      for(let connection of this.flight.connections){
        this.connectionsForm.push(
          new FormGroup({
            'city': new FormControl(connection, Validators.required)
          })
        )
      }
    }

    this.group = new FormGroup({
      'origin': new FormControl(this.flight.origin, Validators.required),
      'destination': new FormControl(this.flight.destination, [Validators.required, this.checkDestination.bind(this)]),
      'departure': new FormControl(this.flight.departure, [Validators.required, this.checkDepartureDate.bind(this)]),
      'arrival': new FormControl(this.flight.arrival, [Validators.required, this.checkArrivalDate.bind(this)]),
      'distance': new FormControl(this.flight.distance, Validators.required),
      'connectionsForm': this.connectionsForm
    });

    this.group.controls['departure'].valueChanges.subscribe(value => {
      this.minArrivalDate = new Date(value);
      this.checkArrivalDate(<FormControl>this.group.controls['arrival']);
    })
  }
  
  onSubmit(){
    this.flight.origin = this.group.controls['origin'].value;
    this.flight.destination = this.group.controls['destination'].value;
    this.flight.departure = this.group.controls['departure'].value;
    this.flight.arrival = this.group.controls['arrival'].value;
    let time = new Date(this.group.controls['arrival'].value).valueOf() - new Date(this.group.controls['departure'].value).valueOf();
    this.flight.durationHours = Math.floor(time/36e5);
    this.flight.durationMinutes = Math.floor(((time/36e5) -  Math.floor(time/36e5))*60);
    this.flight.distance = this.group.controls['distance'].value;
    this.flight.connections = new Array<string>();
    
    for(let seat of this.connectionsForm.controls){
      this.flight.connections.push(seat.value['city']);
    }

    for(let price of this.airline.pricess){
      this.flight.pricess.push(price * this.flight.distance);
    }

    this.flight.conCount = this.flight.connections.length;

    if(!this.edit){
      this.flight.airlineName = this.airline.name;
      this.airlineService.AddFlgiht(this.flight);
      return;
    }
    
    this.airlineService.EditFlight(this.flight);

    this.router.navigate(['../../'],{relativeTo: this.activeRoute});
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
        'city': new FormControl(null, Validators.required)
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
    this.router.navigate(['../../'],{relativeTo: this.activeRoute});
  }
}
