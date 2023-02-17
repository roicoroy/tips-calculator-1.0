import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Point } from 'src/app/models';
import { Waiter } from 'src/app/models/waiters.type';
import { PointsState } from 'src/app/store/points/point.state';
import { WaitersState } from 'src/app/store/waiters/waiter.state';

export interface ICalculatorFacadeModel {
    waitersList: Waiter[] | any;
    points: Point[];
}

@Injectable({
    providedIn: 'root'
})
export class CalculatorFacade {

    @Select(WaitersState.getWaiterList) waitersList$: Observable<Waiter>;

    readonly viewState$: Observable<any>;

    constructor(

    ) {
        this.viewState$ = combineLatest(
            [
                this.waitersList$,
            ]
        ).pipe(
            map(([
                waitersList,
            ]) => ({
                waitersList,
            }))
        );
    }
}
