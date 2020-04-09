import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFilter'
})
export class PriceFilterPipe implements PipeTransform {

  transform(value: any, filterNum: number, propName: string): any {
    if(!filterNum || value.length === 0){
      return value;
    }

    const res = [];


    if (propName === 'connections') {
      for (const item of value) {
        if (item[propName].length <= filterNum) {
          res.push(item);
        }
      }
    } 
    else if(propName === 'seats')
    {
      for(const item of value){
        let counter = 0;
        for(const seat of item['seats']){
          if(!seat['occupied'])
          {
            counter++;
          }
        }
        if(counter >= filterNum){
          res.push(item);
        }
      }
    }
    else {
      for (const item of value) 
      {
        if (item[propName] <= filterNum) {
          res.push(item);
        }
      }
    }

    return res;
  }

}
