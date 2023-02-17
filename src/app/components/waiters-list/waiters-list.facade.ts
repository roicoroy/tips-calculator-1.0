import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Waiter } from 'src/app/models';
import { WaitersState } from 'src/app/store/waiters/waiter.state';

export interface IWaitersListModel {
    waiters: any;
}

@Injectable({
    providedIn: 'root'
})
export class WaitersListFacade {

    @Select(WaitersState.getWaiterList) waiters$: Observable<Waiter[]>;

    readonly viewState$: Observable<IWaitersListModel>;

    constructor() {
        this.viewState$ = combineLatest(
            [this.waiters$]
        ).pipe(
            map((waiters) => ({
                waiters
            }))
        );
    }
}