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
  dateValue: any = '';
  earnings: number = 0;
  numberOfReservations: number = 0;

  constructor(
    private rentACarService: RentACarService,
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  sampleData: any[] = [
    { Day: '', NumOfReservations: this.numberOfReservations },
  ];

  getWidth() : any {
    if (document.body.offsetWidth < 850) {
      return '90%';
    }
    return 500;
  }

  padding: any = { left: 5, top: 5, right: 5, bottom: 5 };

  titlePadding: any = { left: 90, top: 0, right: 0, bottom: 10 };

  xAxis: any =
  {
      dataField: 'Day',
      showGridLines: true
  };
  
  seriesGroups: any[] =
  [
      {
        type: 'column',
        columnsGapPercent: 50,
        seriesGapPercent: 0,
        valueAxis:
        {
            unitInterval: 2,
            minValue: 0,
            maxValue: 20,
            displayValueAxis: true,
            description: 'Number of reservations',
            axisSize: 'auto',
            tickMarksColor: '#888888'
        },
        series: [
            { dataField: 'NumOfReservations' },
        ]
      }
  ];

  public OnDateChange(event): void {
    this.dateValue = (<Date>event).toDateString();
    this.earnings = 0;
    this.reservations.forEach(reservation => {
      this.numberOfReservations++;
    })
    this.sampleData = [
      { Day: this.dateValue, NumOfReservations: this.numberOfReservations },
    ]
  }

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
