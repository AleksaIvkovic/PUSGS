import { Component, OnInit, OnDestroy } from '@angular/core';
import { RentACar } from 'src/app/models/rent-a-car.model';
import { RentACarService } from 'src/app/services/rent-a-car.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rent-a-car-list',
  templateUrl: './rent-a-car-list.component.html',
  styleUrls: ['./rent-a-car-list.component.css']
})
export class RentACarListComponent implements OnInit, OnDestroy {
  rentACars: RentACar[];
  subscription: Subscription;
  filteredName: string = '';
  filteredLocation: string = '';

  constructor(
    private rentACarService: RentACarService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.rentACarService.rentACarChanged
    .subscribe(
      (rentACars: RentACar[]) => {
        this.rentACars = rentACars;
      }
    );
    this.rentACars = this.rentACarService.getMockUp();
  }

  // onDetails(index: number) {
  //   this.router.navigate([index, 'details'], {relativeTo: this.activeRoute});
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
