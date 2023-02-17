import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PointsState } from 'src/app/store/points/point.state';

@Injectable({
    providedIn: 'root'
})
export class PointsFacade {

    @Select(PointsState.getPointsList) pointsList$: Observable<any> | any;

    readonly viewState$: Observable<any>;

    constructor() {
        this.viewState$ = combineLatest(
            [
                this.pointsList$
            ]
        ).pipe(
            map(([
                pointsList
            ]) => ({
                pointsList
            }))
        );
    }
}
