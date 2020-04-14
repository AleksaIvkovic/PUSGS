import { Component, OnInit, Input } from '@angular/core';
import { Airline } from 'src/app/models/airline.model';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { AirlineService } from 'src/app/services/airline.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-flights',
  templateUrl: './admin-flights.component.html',
  styleUrls: ['./admin-flights.component.css']
})
export class AdminFlightsComponent implements OnInit {
  @Input() airline: Airline;
  @Input() back: string;
  @Input() admin: boolean;

  origin: string;
  destination: string;
  departure: Date;
  sortBy: string = 'price';
  sortWay:boolean = false;
  classType: string;

  cities: string[] = [];
  filteredOptionsOrigin: Observable<string[]>; 
  filteredOptionsDestination: Observable<string[]>; 
  
  minDateDep: Date = new Date();
  minDateRet: Date = new Date();

  filterForm: FormGroup;
  
  constructor(private airlineService: AirlineService) { }

  ngOnInit(): void {
    for(let city of this.airline.destinations){
      if(!this.cities.includes(city)){
        this.cities.push(city);
      }
    }

    this.initForm()

    this.filteredOptionsOrigin = this.filterForm.controls['origin'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.filteredOptionsDestination = this.filterForm.controls['destination'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  initForm() {
    this.filterForm = new FormGroup({
      'origin': new FormControl(null),
      'destination': new FormControl(null),
      'departure': new FormControl(null),
      'classType': new FormControl('any'),
      'sortBy': new FormControl('price'),
      'sortWay': new FormControl(null),
    });

    this.filterForm.valueChanges.subscribe((values:any) => {
      this.origin = this.filterForm.controls['origin'].value;
      this.destination = this.filterForm.controls['destination'].value;
      this.departure = this.filterForm.controls['departure'].value;
      this.classType = this.filterForm.controls['classType'].value;
      this.sortBy = this.filterForm.controls['sortBy'].value;
      this.sortWay = this.filterForm.controls['sortWay'].value;

      this.minDateRet = this.departure;
      this.airlineService.updateClassType(this.classType);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
