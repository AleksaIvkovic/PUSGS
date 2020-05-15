import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { matFormFieldAnimations } from '@angular/material/form-field';
import { Airline } from 'src/app/models/airline.model';
import { AirlineService } from 'src/app/services/airline.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GeoCodingServiceService } from 'src/app/services/geo-coding-service.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Admin } from 'src/app/models/admin.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-airline-edit',
  templateUrl: './airline-edit.component.html',
  styleUrls: ['./airline-edit.component.css']
})
export class AirlineEditComponent implements OnInit {
  airline: Airline;
  addressControl: FormControl;
  nameControl: FormControl;
  seats: FormArray;
  edit: boolean 
  addressValid: boolean = false;
  group: FormGroup;
  visible = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private userService: UserService, private activeRoute: ActivatedRoute, private router: Router, private airlineService: AirlineService,private geocoderService: GeoCodingServiceService) { }

  ngOnInit(): void {
    if(this.router.url.includes('edit')){
      let admin: Admin = <Admin>this.userService.getLoggedInUser();
      this.airline = this.airlineService.getAirline(admin.company);
      this.edit = true;
    }
    else{
      this.airline = new Airline();
    }

    this.addressControl = new FormControl(this.airline.address,Validators.required);
    this.nameControl = new FormControl(this.airline.name,[Validators.required,this.verifyName.bind(this)]);
    this.formInit();

    if(this.edit){
      this.nameControl.disable({onlySelf: true});
    }
  }

  formInit(){
    this.seats = new FormArray([],this.checkArray.bind(this));

    if(this.edit){
      for(let seat of this.airline.seatingArrangement){
        this.seats.push(new FormGroup({
          'seat': new FormControl(seat,Validators.required)
        }))
      }
    }

    this.group = new FormGroup({
      'name': this.nameControl,
      'address': this.addressControl,
      'description': new FormControl(this.airline.description,Validators.required),
      'priceFirstClass': new FormControl(this.airline.prices[0],Validators.required),
      'priceBusinessClass': new FormControl(this.airline.prices[1],Validators.required),
      'priceEconomyClass': new FormControl(this.airline.prices[2],Validators.required),
      'rowsFirstClass': new FormControl(this.airline.segments[0],Validators.required),
      'rowsBusinessClass': new FormControl(this.airline.segments[1],Validators.required),
      'rowsEconomyClass': new FormControl(this.airline.segments[2],Validators.required),
      'seats': this.seats
    });

    this.addressControl.valueChanges.subscribe(value => {
      this.addressValid = false;
    });
  }

  verifyAddress(){
    this.addressValid = true;//this.geocoderService.checkAddress(this.group.controls['address'].value);
  }

  verifyName(control:FormControl): {[s: string]: boolean}{
    if(control.value){
      if(!this.airlineService.verifyName(control.value)){
        return {'Name all ready exists': true};
      } 
    }
    return null;
  }

  onSubmit()
  {
    if(this.edit && this.group.controls['address'].touched){
      if(!this.addressValid){
        return;
      }
    }
    else{
      if(!this.edit){
        if(!this.addressValid){
          return;
        }
      }
    } 

    this.airline.name = this.group.controls['name'].value;
    this.airline.address = this.group.controls['address'].value;
    this.airline.description = this.group.controls['description'].value;
    this.airline.prices = [];
    this.airline.prices.push(this.group.controls['priceFirstClass'].value);
    this.airline.prices.push(this.group.controls['priceBusinessClass'].value);
    this.airline.prices.push(this.group.controls['priceEconomyClass'].value);
    this.airline.segments = [];
    this.airline.segments.push(this.group.controls['rowsFirstClass'].value);
    this.airline.segments.push(this.group.controls['rowsBusinessClass'].value);
    this.airline.segments.push(this.group.controls['rowsEconomyClass'].value);
    this.airline.seatingArrangement = new Array<number>();
    
    for(let seat of this.seats.controls){
      this.airline.seatingArrangement.push(seat.value['seat']);
    }
    
    console.log(this.airline);
    if(!this.edit){
      this.airlineService.addAirline(this.airline)
      .subscribe(
        responseData => {
          this.router.navigate(['../../'],{relativeTo : this.activeRoute});
        },
        error => {
          console.log(error);
        }
      )
    }
    else{
      this.airlineService.editAirline(this.airline);
    }
  }

  onAddConnection(){
    this.seats.push(
      new FormGroup({
        'seat': new FormControl(null)
      }));
  }

  onDeleteConnection(i: number){
    this.seats.removeAt(i);
  }

  drop(event: CdkDragDrop<FormGroup[]>) {
    const dir = event.currentIndex > event.previousIndex ? 1 : -1;

    const from = event.previousIndex;
    const to = event.currentIndex;

    const temp = this.seats.at(from);
    for (let i = from; i * dir < to * dir; i = i + dir) {
      const current = this.seats.at(i + dir);
      this.seats.setControl(i, current);
    }
    this.seats.setControl(to, temp);
  }

  getList(){
    return (<FormArray>this.group.get('seats')).controls
  }

  checkArray(control: FormArray): {[s:string]:boolean}{
    if(control.length == 0){
      return {'can not be 0': true}
    }
    else{
      for(let item of control.controls){
        if(!item.value['seat'] || item.value['seat'] == null || item.value['seat'] <= 0){
          return {'can not be 0': true}
        }
      }
    }
    return null;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.airline.destinations.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.airlineService.editAirline(this.airline);
  }

  remove(destination: string): void {
    const index = this.airline.destinations.indexOf(destination);

    if (index >= 0) {
      this.airline.destinations.splice(index, 1);
      this.airlineService.editAirline(this.airline);
    }
  }

  Cancel(){
    this.router.navigate(['../../'],{relativeTo : this.activeRoute});
  }
}
