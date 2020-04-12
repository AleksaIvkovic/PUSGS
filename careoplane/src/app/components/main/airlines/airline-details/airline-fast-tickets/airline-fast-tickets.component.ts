import { Component, OnInit } from '@angular/core';
import { AirlineService } from 'src/app/services/airline.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-airline-fast-tickets',
  templateUrl: './airline-fast-tickets.component.html',
  styleUrls: ['./airline-fast-tickets.component.css']
})
export class AirlineFastTicketsComponent implements OnInit {

  constructor(private airlineService: AirlineService, private activeRoute: ActivatedRoute) { }
  

  ngOnInit(): void {

  }

}
