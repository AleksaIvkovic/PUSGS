import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Input, Inject } from '@angular/core';
import { RentACarService } from 'src/app/services/rent-a-car.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RentACar } from 'src/app/models/rent-a-car.model';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Vehicle } from 'src/app/models/vehicle.model';

@Component({
  selector: 'app-rent-a-car-details',
  templateUrl: './rent-a-car-details.component.html',
  styleUrls: ['./rent-a-car-details.component.css']
})
export class RentACarDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() admin: Admin;
  isAdmin: boolean = false;
  vehicleType = 'regular';
  isOnSaleClicked = false;

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
  vehicleListSubscription: Subscription;
  rentACarSubscription: Subscription;

  constructor(
    private rentACarService: RentACarService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.rentACarSubscription = this.rentACarService.rentACarChanged
    .subscribe(
      (rentACar: RentACar) => {
        this.rentACar = rentACar;
      }
    );
    this.vehicleListSubscription = this.rentACarService.vehicleListChanged
    .subscribe(
      (vehicles: Vehicle[]) => {
        this.rentACar.vehicles = vehicles;
      }
    );
    this.subscription = this.route.params
    .subscribe(
      (params: Params) => {
        if (this.admin) {
          this.isAdmin = true;
          this.rentACar = this.rentACarService.getRentACarByName(this.admin.company);
        } else {
          this.index = params['id'];
          this.rentACar = this.rentACarService.getRentACarByIndex(this.index);
        }
      }
    );
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onAddVehicle() {
    this.router.navigate(['/main/rent-a-car-profile/add-vehicle']);
  }

  onSale() {
    this.isOnSaleClicked = !this.isOnSaleClicked;
    //this.router.navigate(['/main/rent-a-car-profile']);
    this.rentACarService.onSaleClicked.next(this.isOnSaleClicked);
  }

  ngAfterViewInit() {
    this.mapInitializer();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.vehicleListSubscription.unsubscribe();
  }

}