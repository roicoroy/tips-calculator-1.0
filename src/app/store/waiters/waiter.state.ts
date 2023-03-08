import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Waiter } from 'src/app/models';
import { WaiterActions } from './waiter.action';

export class WaiterStateModel {
    waiters: Waiter[];
}
@State<WaiterStateModel>({
    name: 'waiter',
    defaults: {
        waiters: [],
    }
})
@Injectable()
export class WaitersState {
    private waitersList: Waiter[] = [];
    private mockData: Waiter[] = [
        new Waiter({
            id: Math.floor(Math.random() * 100),
            name: 'Jose',
            tipsShare: null,
            hours: null,
            totalPoints: null,
            avatar: 'assets/shapes.svg',
        }),
        new Waiter({
            id: Math.floor(Math.random() * 100),
            name: 'Mary',
            tipsShare: null,
            hours: null,
            totalPoints: null,
            avatar: 'assets/shapes.svg',
        }),
        new Waiter({
            id: Math.floor(Math.random() * 100),
            name: 'Joe',
            tipsShare: null,
            hours: null,
            totalPoints: null,
            avatar: 'assets/shapes.svg',
        }),
    ];

    constructor() {
    }
    @Selector()
    static getWaiterList(state: WaiterStateModel): Waiter[] {
        return state.waiters;
    }
    @Action(WaiterActions.SetWaitersList)
    async setWaitersList(ctx: StateContext<WaiterStateModel>) {
        return ctx.patchState({
            waiters: this.waitersList,
        });

    }
    @Action(WaiterActions.GetWaitersList)
    async getWaitersList(ctx: StateContext<WaiterStateModel>) {
        const state = ctx.getState();
        return ctx.setState({
            ...state,
            waiters: [...state.waiters],
        });
    }
    @Action(WaiterActions.AddWaiter)
    addWaiter(ctx: StateContext<WaiterStateModel>, { payload }: WaiterActions.AddWaiter) {
        const state = ctx.getState();
        // console.log(state);
        ctx.patchState({
            waiters: [
                ...state.waiters,
                payload
            ]
        });
    }
    @Action(WaiterActions.Update)
    updateWaiter(ctx: StateContext<WaiterStateModel>, { payload, id }: WaiterActions.Update) {
        const state = ctx.getState();
        const waiters = [...state.waiters];
        const index = waiters.findIndex((item) => item.id === id);
        waiters[index] = payload;
        return ctx.patchState({
            waiters: [...waiters],
        });
    }
    @Action(WaiterActions.Delete)
    deleteWaiter(ctx: StateContext<WaiterStateModel>, { waiter, index }: WaiterActions.Delete): any {
        const state = ctx.getState();
        return state.waiters.forEach((value: any, index: any) => {
            if (value == waiter) {
                state.waiters.splice(index, 1);
            }
        });
    }
}
