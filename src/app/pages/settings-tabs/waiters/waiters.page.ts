import { Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IonicSelectableComponent } from 'src/app/components/ionic-selectable/ionic-selectable.component';
import { Waiter } from 'src/app/models';
import { NavigationService } from 'src/app/services/navigation.service';
import { WaiterActions } from 'src/app/store/waiters/waiter.action';
import { WaitersPageFacade } from './waiters.facade';
import { WaiterModalComponent } from './waiters/waiter-modal/waiter-modal.component';

@Component({
  selector: 'app-waiters',
  templateUrl: './waiters.page.html',
  styleUrls: ['./waiters.page.scss'],
})
export class WaitersPage {

  viewState$: Observable<any>;

  @ViewChild('selectPointsComponent') selectPointsComponent!: IonicSelectableComponent;

  constructor(
    public modalController: ModalController,
    private store: Store,
    private navigation: NavigationService,
    private facade: WaitersPageFacade,
  ) {
    this.viewState$ = this.facade.viewState$;
  }
  async addWaiter() {
    const modal = await this.modalController.create({
      component: WaiterModalComponent,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.store.dispatch(new WaiterActions.AddWaiter(data));
    }
  }
  async editWaiter(waiter: any, i: any) {
    const modal = await this.modalController.create({
      component: WaiterModalComponent,
      cssClass: 'modal-class',
      componentProps: {
        waiter,
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.store.dispatch(new WaiterActions.Update(data, data.id));
    }
  }

  onSelectTableChange($event: any, i: number): void {
    const waiters = this.store.selectSnapshot<any>((state: any) => state.waiter?.waiters);
    const waiter = new Waiter({
      id: waiters[i].id,
      name: waiters[i].name,
      pointsList: $event.value,
      avatar: waiters[i].avatar,
    });
    this.store.dispatch(new WaiterActions.Update(waiter, waiter.id));
  }
  deleteWaiter(waiter: any, i: number) {
    this.store.dispatch(new WaiterActions.Delete(waiter, i));
  }
  async homePage() {
    await this.navigation.navigateFadeOut('home');
  }
}
