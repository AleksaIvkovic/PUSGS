import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { RentACarService } from 'src/app/services/rent-a-car.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RentACar } from 'src/app/models/rent-a-car.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rent-a-car-details',
  templateUrl: './rent-a-car-details.component.html',
  styleUrls: ['./rent-a-car-details.component.css']
})
export class RentACarDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;
  lat = 40.730610;
  lng = -73.935242;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 16,
  };
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });

  rentACar: RentACar;
  index: number;
  subscription: Subscription;

  constructor(
    private rentACarService: RentACarService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.route.params
    .subscribe(
      (params: Params) => {
        this.index = params['id'];
        this.rentACar = this.rentACarService.getRentACarByIndex(this.index);
      }
    );
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
   }

   ngAfterViewInit() {
    this.mapInitializer();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
