import { Component, OnInit, Input } from '@angular/core';
import { VehicleReservation } from 'src/app/models/vehicle-reservation.model';

@Component({
  selector: 'app-reservation-item',
  templateUrl: './reservation-item.component.html',
  styleUrls: ['./reservation-item.component.css']
})
export class ReservationItemComponent implements OnInit {
  @Input() reservation: any;
  fromDate: Date;
  toDate: Date;
  fromLocation: string;
  toLocation: string;

  constructor() { }

  ngOnInit(): void {
    if (this.reservation.type === 'vehicle') {
      this.fromDate = (<VehicleReservation>this.reservation).fromDate;
      this.toDate = (<VehicleReservation>this.reservation).toDate;
      this.fromLocation = (<VehicleReservation>this.reservation).fromLocation;
      this.toLocation = (<VehicleReservation>this.reservation).toLocation;
    } else if (this.reservation.type === 'flight') {

    }
  }

}
