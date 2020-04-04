import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Airline } from 'src/app/models/airline';
import { AirlineService } from 'src/app/services/airline.service';

@Component({
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.css']
})
export class AirlineComponent implements OnInit {
  @Input() airline: Airline;
  @Input() id: number;

  constructor(private activeRoute: ActivatedRoute, private airlineService: AirlineService) { }

  ngOnInit(): void {
    console.log(this.airline);
  }

}
