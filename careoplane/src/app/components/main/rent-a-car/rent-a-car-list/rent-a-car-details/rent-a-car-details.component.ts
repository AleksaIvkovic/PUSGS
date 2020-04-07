import { Component, OnInit } from '@angular/core';
import { RentACarService } from 'src/app/services/rent-a-car.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RentACar } from 'src/app/models/rent-a-car.model';

@Component({
  selector: 'app-rent-a-car-details',
  templateUrl: './rent-a-car-details.component.html',
  styleUrls: ['./rent-a-car-details.component.css']
})
export class RentACarDetailsComponent implements OnInit {
  rentACar: RentACar;
  index: number;

  constructor(
    private rentACarService: RentACarService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.index = params['id'];
        this.rentACar = this.rentACarService.getRentACarByIndex(this.index);
      }
    );
  }

}
