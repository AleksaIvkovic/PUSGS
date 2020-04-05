import { Component, OnInit, Input } from '@angular/core';
import { RentACar } from 'src/app/models/rent-a-car.model';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  @Input() rentACar: RentACar;

  constructor() { }

  ngOnInit(): void {
  }

}
