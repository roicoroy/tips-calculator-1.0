import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { ResultActions } from 'src/app/store/result/result.action';
import { ResultPageFacade } from './result.facade';
@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {

  viewState$: Observable<any>;

  sub: Subscription;

  constructor(
    private navigation: NavigationService,
    private facade: ResultPageFacade,
    private store: Store,
  ) {
    this.viewState$ = this.facade.viewState$;
  }
  ngOnInit() {
  }
  async home() {
    await this.navigation.navigateFadeOut('/home');
  }
  ionViewDidLeave() {
    this.sub?.unsubscribe();
    this.store.dispatch(new ResultActions.RemoveSelectedResult());
  }
}
