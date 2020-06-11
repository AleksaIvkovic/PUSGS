import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle.model';

@Component({
  selector: 'app-vehicle-sale-item',
  templateUrl: './vehicle-sale-item.component.html',
  styleUrls: ['./vehicle-sale-item.component.scss']
})
export class VehicleSaleItemComponent implements OnInit {
  @Input() vehicle: Vehicle;
  @Input() discount: number;

  constructor() { }

  ngOnInit(): void {
  }

}
