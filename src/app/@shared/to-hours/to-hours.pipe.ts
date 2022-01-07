import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toHours'
})
export class ToHoursPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let hours = Math.floor(value / 60);
    let minutes = Math.floor(value % 60);

    var format = args[0];

    if(format === 'HH:mm Hrs') 
      return this.padLeadingZeros(hours, 2) + ':' + this.padLeadingZeros(minutes, 2) + " Hrs";
    else
      return hours + ' Hour(s) ' + minutes + ' Minutes';
  }

  private padLeadingZeros = (num: number, size: number) => {
    let s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
  };
}
