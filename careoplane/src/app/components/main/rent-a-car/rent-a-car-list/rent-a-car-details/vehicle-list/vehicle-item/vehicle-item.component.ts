import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle.model';
import { RentACar } from 'src/app/models/rent-a-car.model';

@Component({
  selector: 'app-vehicle-item',
  templateUrl: './vehicle-item.component.html',
  styleUrls: ['./vehicle-item.component.css']
})
export class VehicleItemComponent implements OnInit {
  @Input() vehicle: Vehicle;
  @Input() index: number;
  @Input() rentACar: RentACar;

  constructor() { }

  ngOnInit(): void {
  }

}
