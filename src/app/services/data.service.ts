import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
// import { WaiterActions } from '../states/waiters/waiter.action';
import { TEAM_ENTRY } from './entries.service';
import { IonStorageService } from './ionstorage.service';
import { POINTS_LIST_KEY } from './points.service';
import { WAITERS_LIST_KEY } from './waiters.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private storageService: IonStorageService,
    private store: Store,
  ) { }

  // On app start we need to check teamEntry, waitersList and  pointsList
  // from the storage if exists, and place them on the app state

  checkTeamEntry() {
    const key = TEAM_ENTRY;
  }
  checkWaitersList() {
    const key = WAITERS_LIST_KEY;
    this.storageService.getKeyAsObservable(key).subscribe((waiters) => {
      if (waiters) {
        // this.store.dispatch(new WaiterActions.UpdateWaiterState(waiters));
      }
    });
  }
  checkPointsList() {
    const key = POINTS_LIST_KEY;
  }
}
