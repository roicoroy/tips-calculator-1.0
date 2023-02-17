import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entry } from 'src/app/models';
import { ResultState } from 'src/app/store/result/result.state';

export interface IResultsListModel {
    results: any[];
}

@Injectable({
    providedIn: 'root'
})
export class ResultsFacade {

    @Select(ResultState.getResultList) results$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor() {
        this.viewState$ = combineLatest(
            [
                this.results$
            ]
        ).pipe(
            map((results) => ({
                results
            }))
        );
    }
}
