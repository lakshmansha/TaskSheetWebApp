import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(value: any[], order = '', column: string = ''): any[] {
    if (!value || order === '' || !order) {
      return value;
    } // no array
    if (value.length <= 1) {
      return value;
    } // array with only one item
    if (!column || column === '') {
      if (order === 'asc') {
        return value.sort();
      } else {
        return value.sort().reverse();
      }
    } // sort 1d array
    const _order: any[] = [];
    _order.push(order);

    return orderBy(value, [column], _order);
  }
  // transform(array: any[], order = '', field: string): any[] {
  //   if (!array || order === '' || !order) { return array; } // no array
  //   if (!Array.isArray(array)) {
  //     return;
  //   }
  //   array.sort((a: any, b: any) => {
  //     if (a[field] < b[field]) {
  //       return -1;
  //     } else if (a[field] > b[field]) {
  //       return 1;
  //     } else {
  //       return 0;
  //     }
  //   });
  //   return array;
  // }
}
