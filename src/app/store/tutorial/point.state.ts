import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { TutorialActions } from './tutorial.action';


export class TutorialStateModel {
    isTutorialComplete: boolean;
}

@State<TutorialStateModel>({
    name: 'tutorial',
    defaults: {
        isTutorialComplete: false
    }
})
@Injectable()
export class TutorialState {


    @Selector()
    static getPointsList(state: TutorialStateModel): any {
        return state.isTutorialComplete;
    }

    @Action(TutorialActions.SetTutorialComplete)
    addPoint(ctx: StateContext<TutorialStateModel>, { payload }: TutorialActions.SetTutorialComplete) {
        const state = ctx.getState();
        return ctx.patchState({
            isTutorialComplete: payload
        });
    }
}
