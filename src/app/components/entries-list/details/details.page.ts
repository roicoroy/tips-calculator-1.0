import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { ResultActions } from 'src/app/store/result/result.action';
import { ISelectedResultsModel, SelectedResultFacade } from './details.facade';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  viewState$: Observable<any>;

  constructor(
    private navigation: NavigationService,
    private facade: SelectedResultFacade,
    private store: Store,
    readonly sanitizer: DomSanitizer,
  ) {
    this.viewState$ = this.facade.viewState$;
  }

  ngOnInit() {
  }
  async home() {
    this.navigation.navigateForward('home');
    this.store.dispatch(new ResultActions.RemoveSelectedResult());
  }

  async shareContent() {

    const shrare = await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });

    console.log(shrare);
  }
}
