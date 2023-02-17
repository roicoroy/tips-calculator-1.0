import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResultState } from 'src/app/store/result/result.state';

@Injectable({
    providedIn: 'root'
})
export class ResultPageFacade {

    @Select(ResultState.getSelectedResult) result$: Observable<any> | any;

    readonly viewState$: Observable<any>;

    constructor(

    ) {
        this.viewState$ = combineLatest(
            [
                this.result$,
            ]
        ).pipe(
            map(([
                result,
            ]) => ({
                result,
            }))
        );
    }
}
