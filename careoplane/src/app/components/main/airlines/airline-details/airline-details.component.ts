import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
/// <reference types=”@types/googlemaps” />

import { Airline } from 'src/app/models/airline.model';
import { AirlineService } from 'src/app/services/airline.service';
import { Subscription } from 'rxjs';
import { GeoCodingServiceService } from 'src/app/services/geo-coding-service.service';

@Component({
  selector: 'app-airline-details',
  templateUrl: './airline-details.component.html',
  styleUrls: ['./airline-details.component.css']
})
export class AirlineDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  name: string;
  admin: boolean = false;
  
  airline: Airline;
  paramsSub: Subscription;

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

  constructor(private geocodingService: GeoCodingServiceService,private router: Router,private activeRoute: ActivatedRoute, private airlineService: AirlineService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params: Params) => {
          if(params['id']){
            this.name = params['id'];
          }
          else{
            this.name = params['alid'];
            this.admin = true;
          }
          this.airline = this.airlineService.getAirline(this.name);
      }
    );
  }

  mapInitializer() {
    this.geocodingService.LatLon(this.airline.address,this.map, this.gmap);
  }

  ngAfterViewInit() {
    this.mapInitializer();
  }

  ngOnDestroy(): void {
  }

  onEdit(): void{
    this.router.navigate(['../../',this.name,'edit'], { relativeTo: this.activeRoute });
  }

  Back(){
    this.router.navigate(['../../','list'], { relativeTo: this.activeRoute }); 
  }
}
