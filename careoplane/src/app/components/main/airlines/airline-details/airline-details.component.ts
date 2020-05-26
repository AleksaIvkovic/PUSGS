import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
/// <reference types=”@types/googlemaps” />

import { Airline } from 'src/app/models/airline.model';
import { AirlineService } from 'src/app/services/airline.service';
import { Subscription } from 'rxjs';
import { GeoCodingServiceService } from 'src/app/services/geo-coding-service.service';
import { UserService } from 'src/app/services/user.service';
import { Admin } from 'src/app/models/admin.model';
import { TOAirline } from 'src/app/t-o-models/t-o-airline.model';

@Component({
  selector: 'app-airline-details',
  templateUrl: './airline-details.component.html',
  styleUrls: ['./airline-details.component.css']
})
export class AirlineDetailsComponent implements OnInit, AfterViewInit{
  name: string;
  admin: boolean = false;
  
  airline: Airline;
  paramsSub: Subscription;
  address: string= "";

  origin: string = '';
  destination: string = '';
  departure: Date;
  arrival : Date;
  connections : number;
  price : number;

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;
  mapOptions: google.maps.MapOptions;
  marker: google.maps.Marker;

  constructor(private userService: UserService, private geocodingService: GeoCodingServiceService,private router: Router,private activeRoute: ActivatedRoute, private airlineService: AirlineService) { }

  ngOnInit(): void {
    this.airline = new Airline();
    this.activeRoute.params.subscribe(
      (params: Params) => {
          if(params['id']){
            this.name = params['id'];
          }
          else{
            this.name = localStorage.getItem('company');
            this.admin = true;
          }
          this.airlineService.getAirlineDB(this.name).subscribe(
            result => {
              this.airline = Object.assign(new TOAirline(), result).convert();
              this.address = this.airline.address;
              this.airlineService.airlineLoaded(this.airline);
            },
            error => {console.log(error);}
          );
      }
    );
  }

  ngAfterViewInit(){
    this.mapInitializer();
  }

  mapInitializer() {
    this.geocodingService.LatLon(this.address, this.map, this.gmap);
  }

  ngOnDestroy(): void {
  }

  onEdit(): void{
    this.router.navigate(['../edit'], { relativeTo: this.activeRoute });
  }

  AddFlight(){
    this.router.navigate(['../add-flight'], { relativeTo: this.activeRoute });
  }

  Back(){
    this.router.navigate(['../../','list'], { relativeTo: this.activeRoute }); 
  }
}
