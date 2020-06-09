import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import { VehicleReservation } from 'src/app/models/vehicle-reservation.model';
import { TOVehicleReservation } from 'src/app/t-o-models/t-o-vehicle-reservation.model';

@Component({
  selector: 'app-vehicle-reservation-details',
  templateUrl: './vehicle-reservation-details.component.html',
  styleUrls: ['./vehicle-reservation-details.component.scss']
})
export class VehicleReservationDetailsComponent implements OnInit {
  reservation: VehicleReservation;

  constructor(
    private ratingDialog: MatDialog, 
    private activeRoute: ActivatedRoute, 
    private router: Router,
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.reservation = new VehicleReservation(0, null, '', null, '', 0, 0);

    this.activeRoute.params.subscribe(
      params => {
        this.vehicleService.getReservation(+params['id']).subscribe(
          (response: any) => {
            this.reservation = response;
          },
          error => {
            console.log(error);
          }
        );
      }
    );
  }

}
