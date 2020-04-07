import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
/// <reference types=”@types/googlemaps” />

import { Airline } from 'src/app/models/airline.model';
import { AirlineService } from 'src/app/services/airline.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-airline-details',
  templateUrl: './airline-details.component.html',
  styleUrls: ['./airline-details.component.css']
})
export class AirlineDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  id: number;
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
  lat = 40.730610;
  lng = -73.935242;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8,
  };
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });

  constructor(private activeRoute: ActivatedRoute, private airlineService: AirlineService) { }

  ngOnInit(): void {
    this.paramsSub = this.activeRoute.params.subscribe(
      (params: Params) => {
          this.id = params['id'];
          this.airline = this.airlineService.getAirline(this.id);
      }
    );
    console.log(this.airline);
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
    this.mapOptions);
    this.marker.setMap(this.map);
  }

  ngAfterViewInit() {
    this.mapInitializer();
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

}
