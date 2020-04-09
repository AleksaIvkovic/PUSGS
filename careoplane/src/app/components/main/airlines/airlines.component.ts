import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.css']
})
export class AirlinesComponent implements OnInit {
  flightId1: number;
  flightId2: number; 
  airlineId1: number; 
  airlineId2: number; 

  constructor(private route: Router,private  activeRotute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRotute.params.subscribe((params:Params) => {
       if(params['aliid']){
          this.flightId1 = params['fiid'];
          this.airlineId1 = params['alid'];
       }
       else{
          this.flightId1 = params['fiid1'];
          this.airlineId1 = params['alid1'];
          this.flightId2 = params['fiid2'];
          this.airlineId2 = params['alid2'];
       }
    })
  }
}
