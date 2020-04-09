import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';
import { Airline } from 'src/app/models/airline.model';
import { AirlineService } from 'src/app/services/airline.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-seat-selector',
  templateUrl: './seat-selector.component.html',
  styleUrls: ['./seat-selector.component.scss']
})
export class SeatSelectorComponent implements OnInit {
  @Input() flight: Flight;
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

  constructor(private airlineService: AirlineService){
  }

  private seatConfigFun(){
    this.seatConfig = [];
    let temp = [] as  any;
    let count = 1;
    let row:string = "";
    let rowLength = 0;
    for(let k = 0;k < this.airline.seatingArrangement.length;k++)
    {
      for(let q = 0;q < this.airline.seatingArrangement[k];q++){
        row += "g";
        rowLength++;
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
    this.airline = this.airlineService.getAirline(this.flight.airlineId);

    this.seatConfigFun();
    this.processSeatChart(this.seatConfig);
  }

  public processSeatChart ( map_data : any[] )
  {
      let myCounter: number = 0;
      let chars: string[] = ['','A','B','C','D','E','F','G','H','I','J'];
      if( map_data.length > 0 )
      {
        var seatNoCounter = 1;
        for (let __counter = 0; __counter < map_data.length; __counter++) {
          var row_label = "";
          var item_map = map_data[__counter].seat_map;

          //Get the label name and price
          row_label = "Row "+item_map[0].seat_label + " - ";
          if( item_map[ item_map.length - 1].seat_label != " " )
          {
            row_label += item_map[ item_map.length - 1].seat_label;
          }
          else
          {
            row_label += item_map[ item_map.length - 2].seat_label;
          }
          row_label += " : € " + map_data[__counter].seat_price;
          
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
              var seatObj = {
                "key" : myCounter, //sam racunaj
                "price" : map_data[__counter]["seat_price"],
                "status" : "available" // podesiti da se iscitava
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
}
