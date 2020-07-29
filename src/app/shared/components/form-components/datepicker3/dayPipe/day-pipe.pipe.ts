import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayPipe'
})
export class DayPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return parseInt(value.substring(6, 8));
  }
}
