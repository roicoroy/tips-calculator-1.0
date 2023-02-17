import { Pipe, PipeTransform } from '@angular/core';
import { Point } from 'src/app/models';

@Pipe({
  name: 'sumPointsArray'
})
export class SumPointsArrayPipe implements PipeTransform {
  transform(array: []) {
    if (array.length > 0) {
      const totalPoints: any = [];
      array.forEach((point: Point) => {
        totalPoints.push(point.value);
      });
      const sum = totalPoints.reduce((a: any, b: any) => a + b, 0);
      return sum;
    }
  }
}
