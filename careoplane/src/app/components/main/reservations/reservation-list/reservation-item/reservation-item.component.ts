import { Component, OnInit, Input } from '@angular/core';
import { VehicleReservation } from 'src/app/models/vehicle-reservation.model';
import { AirlineService } from 'src/app/services/airline.service';

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

  constructor(private airlineService: AirlineService) { }

  ngOnInit(): void {
    if (this.reservation.type === 'vehicle') {
      this.fromDate = (<VehicleReservation>this.reservation).fromDate;
      this.toDate = (<VehicleReservation>this.reservation).toDate;
      this.fromLocation = (<VehicleReservation>this.reservation).fromLocation;
      this.toLocation = (<VehicleReservation>this.reservation).toLocation;
    } else if (this.reservation.type === 'flight') {
      let flight = this.airlineService.getFlight(this.reservation.flightId);
      this.fromDate = flight.departure;
      this.toDate = flight.arrival;
      this.fromLocation = flight.origin;
      this.toLocation = flight.destination;
    }
  }

}
