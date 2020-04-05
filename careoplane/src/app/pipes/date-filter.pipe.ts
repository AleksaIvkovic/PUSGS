import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {
  
  transform(value: any, startDate: Date, endDate: Date): any {
    if(!startDate && !endDate){
      return value;
    }

    let result = [];

    let sDate: Date = new Date(startDate);
    let eDate: Date = new Date(endDate);

    if(!endDate){
      value.forEach(element => {
        if(element.departure.getTime() === sDate.getTime())
          result.push(element);
      });
    }
    else if(!startDate){
      value.forEach(element => {
        if(element.arrival.getTime() === eDate.getTime())
          result.push(element);
      });
    }
    else{
      value.forEach(element => {
        if(element.departure.getTime() === sDate.getTime()
         && element.arrival.getTime() === eDate.getTime())
          result.push(element);
      });
    }

    return null;
  }

}
