import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';
import { Airline } from 'src/app/models/airline.model';
import { AirlineService } from 'src/app/services/airline.service';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seat-selector',
  templateUrl: './seat-selector.component.html',
  styleUrls: ['./seat-selector.component.scss']
})
export class SeatSelectorComponent implements OnInit {
  @Input() flight: Flight;
  @Input() type:string = 'any';
  @Input() admin: boolean = false;

  airline: Airline;

  private seatConfig: any = null;
  seatmap = [];
  
  seatChartConfig = {
    showRowsLabel : true,
    showRowWisePricing : true,
    newSeatNoForRow : true
  }
  
  cart = {
    selectedSeats : [],
    seatstoStore : [],
    totalamount : 0,
    cartId : "",
    eventId : 0
  };
  

  title = 'seat-chart-generator';
  rowLength: number;
  lastSeat: any;

  constructor(private airlineService: AirlineService,private router: Router, private activeRoute: ActivatedRoute){
  }

  private seatConfigFun(){
    this.seatConfig = [];
    let temp = [] as  any;
    let count = 1;
    let row:string = "";
    this.rowLength = 0;
    for(let k = 0;k < this.airline.seatingArrangement.length;k++)
    {
      for(let q = 0;q < this.airline.seatingArrangement[k];q++){
        row += "g";
        this.rowLength++;
      }
      if(k != this.airline.seatingArrangement.length - 1){
        row +="_";
      }
    }
    
    for(let segment = 0; segment < this.airline.segments.length; segment++)
    {
      let price = this.airline.pricess[segment] * this.flight.distance;
      temp = [];
      for(let i = 0; i < this.airline.segments[segment];i++)
      {
          let tempObj = {
            "seat_label": count.toString(),
            "layout": row
          }

          temp.push(tempObj);
          count++
      }
      let seatCon = {
        "seat_price": price,
        "seat_map": temp
      }

      this.seatConfig.push(seatCon);
    }
  }

  ngOnInit(): void {
    this.airlineService.emptyTickets.subscribe((tickets:any) => {
      while(tickets.selectedSeats.length != 0){
        for(let i = 0; i < this.seatmap.length;i++){
          for(let j = 0; j < this.seatmap[i].seats.length;j++){
            if(this.seatmap[i].seats[j].seatLabel === tickets.selectedSeats[0]){
              this.selectSeat(this.seatmap[i].seats[j]);
            }
          }
        }
      }
    });
    //Process a simple bus layout
    this.airline = this.airlineService.getAirline(this.flight.airlineName);
    

    this.seatConfigFun();
    this.processSeatChart(this.seatConfig);
  }

  public processSeatChart ( map_data : any[] )
  {
      let start:number = 0;
      let end: number = map_data.length;

      if(this.type === 'first'){
        end = this.airline.segments[0];
      }
      else if(this.type === 'business'){
        start = this.airline.segments[0]
        end = this.airline.segments[0] + this.airline.segments[1];
      }
      else if(this.type ==='economy'){
        start = this.airline.segments[0] + this.airline.segments[1];
      }

      let myCounter: number = start * this.rowLength;
      let chars: string[] = ['','A','B','C','D','E','F','G','H','I','J'];
      let classes: string[] = ['First','Business','Economy'];
      let classCounter: number = 0;
      if( map_data.length > 0 )
      {
        var seatNoCounter = 1;
        for (let __counter = start; __counter < end; __counter++) {
          var row_label = "";
          var item_map = map_data[__counter].seat_map;

          //Get the label name and price
          row_label = classes[classCounter];
          classCounter++;
          
          item_map.forEach(map_element => {
            var mapObj = {
              "seatRowLabel" : map_element.seat_label,
              "seats" : [],
              "seatPricingInformation" : row_label
            };
            row_label = "";
            var seatValArr = map_element.layout.split('');
            if( this.seatChartConfig.newSeatNoForRow )
            {
              seatNoCounter = 1; //Reset the seat label counter for new row
            }
            var totalItemCounter = 1;
            seatValArr.forEach(item => {
              let status: string;
              if(this.flight.seats[myCounter].occupied || this.flight.seats[myCounter].discount != 0){
                if(this.admin && this.flight.seats[myCounter].discount != 0){
                  status = 'sale';
                }
                else{
                  status = 'unavailable';
                }
              }
              else{
                  status = 'available';
              }

              var seatObj = {
                "key" : myCounter, //sam racunaj
                "price" : map_data[__counter]["seat_price"],
                "status" : status
              };
               
              if( item != '_')
              {
                seatObj["seatLabel"] = map_element.seat_label+chars[seatNoCounter];
                if(seatNoCounter < 10)
                { seatObj["seatNo"] = chars[seatNoCounter]; }
                else { seatObj["seatNo"] = ""+chars[seatNoCounter]; }
                
                seatNoCounter++;
                myCounter++;
              }
              else
              {
                seatObj["seatLabel"] = "";
              }
              totalItemCounter++;
              mapObj["seats"].push(seatObj);
            });
            console.log(" \n\n\n Seat Objects " , mapObj);
            this.seatmap.push( mapObj );
          });
        }

        
        // for (let __counter = 0; __counter < map_data.length; __counter++) {
        //   var row_label = "";
        //   var rowLblArr = map_data[__counter]["seat_labels"];
        //   var seatMapArr = map_data[__counter]["seat_map"];
        //   for (let rowIndex = 0; rowIndex < rowLblArr.length; rowIndex++) {
        //     var rowItem = rowLblArr[rowIndex];
        //     var mapObj = {
        //       "seatRowLabel" : rowItem,
        //       "seats" : []
        //     };
        //     var seatValArr = seatMapArr[rowIndex].split('');
        //     var seatNoCounter = 1;
        //     var totalItemCounter = 1;
        //     seatValArr.forEach(item => {
        //       var seatObj = {
        //         "key" : rowItem+"_"+totalItemCounter,
        //         "price" : map_data[__counter]["seat_price"],
        //         "status" : "available"
        //       };
               
        //       if( item != '_')
        //       {
        //         seatObj["seatLabel"] = rowItem+" "+seatNoCounter;
        //         if(seatNoCounter < 10)
        //         { seatObj["seatNo"] = "0"+seatNoCounter; }
        //         else { seatObj["seatNo"] = ""+seatNoCounter; }
                
        //         seatNoCounter++;
        //       }
        //       else
        //       {
        //         seatObj["seatLabel"] = "";
        //       }
        //       totalItemCounter++;
        //       mapObj["seats"].push(seatObj);
        //     });
        //     console.log(" \n\n\n Seat Objects " , mapObj);
        //     this.seatmap.push( mapObj );
        //     console.log(" \n\n\n Seat Map " , this.seatmap);
            
        //   }
                   
        // }
      }
  }

  public selectSeat( seatObject : any )
  {
    if(!this.admin){
      console.log( "Seat to block: " , seatObject );
      if(seatObject.status == "available")
      {
        seatObject.status = "booked";
        this.cart.selectedSeats.push(seatObject.seatLabel);
        this.cart.seatstoStore.push(seatObject.key);
        this.cart.totalamount += seatObject.price;
  
      }
      else if( seatObject.status = "booked" )
      {
        seatObject.status = "available";
        var seatIndex = this.cart.selectedSeats.indexOf(seatObject.seatLabel);
        if( seatIndex > -1)
        {
          this.cart.selectedSeats.splice(seatIndex , 1);
          this.cart.seatstoStore.splice(seatIndex , 1);
          this.cart.totalamount -= seatObject.price;
        }
        
      }
      this.airlineService.ticketsChanged.next(this.cart);
    }
    else{
      if(seatObject.status == "available" || seatObject.status == "sale")
      {
        if(this.lastSeat){
          if(this.flight.seats[this.lastSeat.key].discount == 0){
            this.lastSeat.status = "available";
          }
          else{
            this.lastSeat.status = "sale";
          }
        }
        this.lastSeat = seatObject;
        seatObject.status = "booked";
        this.router.navigate([seatObject.key,'seat'],{relativeTo:this.activeRoute}); 
      }
    }
  }
}
