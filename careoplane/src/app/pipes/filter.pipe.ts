import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0 || filterString === '') {
      return value;
    }

    const res = [];

    if (propName === 'locations') {
      for (const item of value) {
        for (const loc of item.locations) {
          if (loc.toLowerCase().includes(filterString.toLowerCase())) {
            res.push(item);
            break;
          }
        }
      }
    } else if (propName === 'type' && filterString === 'Any') {
      return value;
    } else {
      for (const item of value) {
        if (item[propName].toLowerCase().includes(filterString.toLowerCase())) {
          res.push(item);
        }
      }
    }
    return res;
  }

}
