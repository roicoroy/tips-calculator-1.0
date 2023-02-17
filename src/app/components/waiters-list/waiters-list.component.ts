import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { IWaitersListModel, WaitersListFacade } from './waiters-list.facade';

@Component({
  selector: 'app-waiters-list',
  templateUrl: './waiters-list.component.html',
  styleUrls: ['./waiters-list.component.scss'],
})
export class WaitersListComponent {

  viewState$: Observable<IWaitersListModel>;

  constructor(
    private readonly waitersListFacade: WaitersListFacade,
    readonly sanitizer: DomSanitizer,
  ) {
    this.viewState$ = this.waitersListFacade.viewState$;
  }
}
