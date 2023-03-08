import { Injectable } from '@angular/core';
import { Waiter, Entry } from 'src/app/models';
import { generateId, sumPointsArray } from 'src/app/services/utils';
import { SumPointsArrayPipe } from './sum-array.pipe';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {

  constructor(
    private sumPointsArrayPipe: SumPointsArrayPipe
  ) { }

  calculateWaiterEntryObject(waitersList: Waiter[], date: Date, tips: number): Entry {
    const sumXValueArray: any[] = [];
    waitersList.forEach((waiter) => {
      waiter.xValue = this.sumPointsArrayPipe.transform(waiter.pointsList) + waiter.hours;
      sumXValueArray.push(waiter.xValue);
    });
    const aValue = sumPointsArray(sumXValueArray);
    const lWaiter: Waiter[] = [];
    waitersList.forEach((waiter) => {
      const yValue = tips / aValue;
      waiter.yValue = yValue,
        lWaiter.push(new Waiter({
          id: waiter?.id,
          name: waiter?.name,
          pointsList: waiter?.pointsList,
          totalPoints: this.sumPointsArrayPipe.transform(waiter.pointsList),
          hours: waiter?.hours,
          tipsShare: waiter.xValue * waiter.yValue,
          avatar: waiter?.avatar,
          xValue: this.sumPointsArrayPipe.transform(waiter.pointsList) + waiter.hours,
          yValue: yValue
        }));
    });
    return new Entry({
      id: generateId(),
      tipsMade: tips,
      date,
      waiters: lWaiter,
    });
  }
}
