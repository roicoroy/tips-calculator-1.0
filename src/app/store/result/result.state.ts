import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Entry } from 'src/app/models';
import { IStates } from '../../models/states.interface';
import { ResultActions } from './result.action';

export class WaiterResultStateModel {
    results: Entry[];
    selectedResult: any;
}
@State<WaiterResultStateModel>({
    name: 'resultList',
    defaults: {
        results: [],
        selectedResult: null
    }
})
@Injectable()
export class ResultState {
    constructor(
        private store: Store
    ) { }

    @Selector()
    static getResultList(state: WaiterResultStateModel) {
        return state.results;
    }
    @Selector()
    static getSelectedResult(state: WaiterResultStateModel) {
        return state.selectedResult;
    }
    @Action(ResultActions.SetResult)
    setResult(ctx: StateContext<WaiterResultStateModel>, { payload }: ResultActions.SetResult) {
        const addResults: any = [];
        const savedResults = this.store.selectSnapshot<any>((state: IStates) => state.resultList?.results);
        if (savedResults != null) {
            savedResults.push(payload);
            ctx.patchState({
                results: savedResults,
            });
        } else {
            addResults.push(payload);
            ctx.patchState({
                results: addResults,
            });
        }
    }
    @Action(ResultActions.RemoveResult)
    removeResult(ctx: StateContext<WaiterResultStateModel>, { payload }: ResultActions.RemoveResult) {
        const state = ctx.getState();
        return state.results.forEach((value: any, index: any) => {
            if (value == payload) {
                state.results.splice(index, 1);
            }
        });
    }
    @Action(ResultActions.SetSelectedResult)
    setSelectedResult(ctx: StateContext<WaiterResultStateModel>, { payload }: ResultActions.SetSelectedResult) {
        ctx.patchState({
            selectedResult: payload,
        });
    }
    @Action(ResultActions.RemoveSelectedResult)
    removeSelectedResult(ctx: StateContext<WaiterResultStateModel>) {
        ctx.patchState({
            selectedResult: null,
        });
    }
}
