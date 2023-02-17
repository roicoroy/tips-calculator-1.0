import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PointsState } from 'src/app/store/points/point.state';
import { WaitersState } from 'src/app/store/waiters/waiter.state';

@Injectable({
    providedIn: 'root'
})
export class WaitersPageFacade {

    @Select(WaitersState.getWaiterList) waitersList$: Observable<any> | any;
    @Select(PointsState.getPointsList) pointsList$: Observable<any> | any;


    readonly viewState$: Observable<any>;

    constructor(

    ) {
        this.viewState$ = combineLatest(
            [
                this.waitersList$,
                this.pointsList$
            ]
        ).pipe(
            map(([
                waitersList,
                pointsList = 0
            ]) => ({
                waitersList,
                pointsList
            }))
        );
    }
}
