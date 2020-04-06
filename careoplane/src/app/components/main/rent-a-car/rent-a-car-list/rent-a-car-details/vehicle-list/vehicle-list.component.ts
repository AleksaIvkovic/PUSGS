import { Component, OnInit, Input } from '@angular/core';
import { RentACar } from 'src/app/models/rent-a-car.model';
import { RentACarService } from 'src/app/services/rent-a-car.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  @Input() rentACar: RentACar;
  vehicleTypes = [];
  type: string = 'Any';

  constructor(
    private rentACarService: RentACarService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.rentACar.locations.unshift('Any');
    this.route.params
    .subscribe(
      (params: Params) => {
        this.vehicleTypes = this.rentACarService.getVehicleTypes(this.rentACar.name);
      }
    );
  }

}
