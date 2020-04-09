import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {
  
  transform(value: any, myDate: Date): any {
    if(!myDate){
      return value;
    }

    let result = [];

    let sDate: Date = new Date(myDate);
    
    value.forEach(element => {
      let myDateWT: Date = new Date(element.departure);
      myDateWT.setHours(0, 0, 0, 0);

      if(myDateWT.getTime() === myDate.getTime())
        result.push(element);
    });
    
    return result;
  }

}
