import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResultState } from 'src/app/store/result/result.state';

export interface ISelectedResultsModel {
    selectedResult: any;
}

@Injectable({
    providedIn: 'root'
})
export class SelectedResultFacade {

    @Select(ResultState.getSelectedResult) selectedResult$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor() {
        this.viewState$ = combineLatest(
            [
                this.selectedResult$
            ]
        ).pipe(
            map((selectedResult) => ({
                selectedResult
            }))
        );
    }
}
