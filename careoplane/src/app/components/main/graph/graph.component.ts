import { Component, OnInit } from '@angular/core';
import { RentACarService } from 'src/app/services/rent-a-car.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TOVehicle } from 'src/app/t-o-models/t-o-vehicle.model';
import { TOVehicleReservation } from 'src/app/t-o-models/t-o-vehicle-reservation.model';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  isRentACar: boolean;
  reservations: any[] = [];

  constructor(
    private rentACarService: RentACarService,
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isRentACar = this.router.url.includes('rent');
    if (this.isRentACar) { //Rent a car servis
      this.vehicleService.getVehiclesForCompany(localStorage.getItem('company')).subscribe(
        (response: number[]) => {
          let vehicleIds: number[] = response;
          this.vehicleService.getReservationsForVehicles(vehicleIds).subscribe(
            (response: TOVehicleReservation[]) => {
              response.forEach(vehicleReservation => 
                  this.reservations.push({
                    'price': vehicleReservation.price,
                    'fromDate': vehicleReservation.fromDate,
                    'toDate': vehicleReservation.toDate,
                    'numOfDays': vehicleReservation.numOfDays
                  }))
            },
            error => {
              console.log(error);
            }
          );
        },
        error => {
          console.log(error);
        }
      );
    } else { //Avio kompanija

    }
  }

}
