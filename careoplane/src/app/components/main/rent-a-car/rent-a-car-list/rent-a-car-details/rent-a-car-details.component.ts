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
  name: string;

  constructor(
    private rentACarService: RentACarService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.name = params['name'];
        this.rentACar = this.rentACarService.getRentACar(this.name);
      }
    );
  }

}
