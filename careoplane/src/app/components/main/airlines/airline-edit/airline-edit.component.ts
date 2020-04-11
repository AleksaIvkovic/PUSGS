import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { matFormFieldAnimations } from '@angular/material/form-field';
import { Airline } from 'src/app/models/airline.model';
import { AirlineService } from 'src/app/services/airline.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-airline-edit',
  templateUrl: './airline-edit.component.html',
  styleUrls: ['./airline-edit.component.css']
})
export class AirlineEditComponent implements OnInit {
  airline: Airline;
  addressControl: FormControl;
  nameControl: FormControl;
  seats: number[] = [];
  edit: boolean 
  group: FormGroup;
  
  constructor(private activeRoute: ActivatedRoute, private router: Router, private airlineService: AirlineService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params:Params)=>{
      if(params['alid'])
      {
        this.airline = this.airlineService.getAirline(params['alid']);
        this.edit = true;
      }
      else{
        this.airline = new Airline();
      }
    });

    this.addressControl = new FormControl(this.airline.address,Validators.required);
    this.nameControl = new FormControl(this.airline.name,[Validators.required,this.verifyName.bind(this)]);
    this.formInit();

    if(this.airline.name != null){
      this.nameControl.disable({onlySelf: true});
    }
  }

  formInit(){
    this.group = new FormGroup({
      'name': this.nameControl,
      'address': this.addressControl,
      'description': new FormControl(this.airline.description,Validators.required),
      'priceFirstClass': new FormControl(this.airline.pricess[0],Validators.required),
      'priceBusinessClass': new FormControl(this.airline.pricess[1],Validators.required),
      'priceEconomyClass': new FormControl(this.airline.pricess[2],Validators.required),
      'rowsFirstClass': new FormControl(this.airline.segments[0],Validators.required),
      'rowsBusinessClass': new FormControl(this.airline.segments[1],Validators.required),
      'rowsEconomyClass': new FormControl(this.airline.segments[2],Validators.required)
    });
  }

  verifyAddress(){

  }

  verifyName(control:FormControl): {[s: string]: boolean}{
    if(control.value){
      if(!this.airlineService.verifyName(control.value)){
        return {'Name all ready exists': true};
      } 
    }
    return null;
  }

  onSubmit(){
    this.airline.address = this.group.controls['address'].value;
    this.airline.description = this.group.controls['description'].value;
    this.airline.pricess = [];
    this.airline.pricess.push(this.group.controls['priceFirstClass'].value);
    this.airline.pricess.push(this.group.controls['priceBusinessClass'].value);
    this.airline.pricess.push(this.group.controls['priceEconomyClass'].value);
    this.airline.segments = [];
    this.airline.segments.push(this.group.controls['rowsFirstClass'].value);
    this.airline.segments.push(this.group.controls['rowsBusinessClass'].value);
    this.airline.segments.push(this.group.controls['rowsEconomyClass'].value);
    if(!this.edit){
      this.airlineService.addAirline(this.airline);
    }
    else{
      this.airlineService.editAirline();
    }
    this.router.navigate(['../../',this.airline.name,'details'],{relativeTo : this.activeRoute});
  }
}
