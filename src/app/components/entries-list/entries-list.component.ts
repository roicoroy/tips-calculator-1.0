import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { ResultActions } from 'src/app/store/result/result.action';
import { IResultsListModel, ResultsFacade } from './entries-list.facade';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.scss'],
})
export class EntriesListComponent implements OnInit {

  viewState$: Observable<any>;

  entriesListState: any;

  showAddMessage: any = null;

  constructor(
    private store: Store,
    private facade: ResultsFacade,
    private navigation: NavigationService,
  ) { }

  ngOnInit() {
    this.viewState$ = this.facade.viewState$;
  }

  details(selectedResult: any) {
    this.navigation.navigateForward('home/details');
    this.store.dispatch(new ResultActions.SetSelectedResult(selectedResult));
  }
  remove(result: any) {
    this.store.dispatch(new ResultActions.RemoveResult(result));
  }
}