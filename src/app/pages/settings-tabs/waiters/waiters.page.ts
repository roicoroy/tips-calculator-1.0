/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Observable } from 'rxjs';
import { slideAnimation } from 'src/app/animations/nav-animation';
import { IWaitersListModel, WaitersListFacade } from 'src/app/components/waiters-list/waiters-list.facade';
import { Point, Waiter } from 'src/app/models';
import { NavigationService } from 'src/app/services/navigation.service';
import { PointActions } from 'src/app/states/points/point.action';
import { PointsState } from 'src/app/states/points/point.state';
import { WaiterActions } from 'src/app/states/waiters/waiter.action';
import { WaitersState } from 'src/app/states/waiters/waiter.state';
import { WaiterModalComponent } from './waiters/waiter-modal/waiter-modal.component';

@Component({
  selector: 'app-waiters',
  templateUrl: './waiters.page.html',
  styleUrls: ['./waiters.page.scss'],
})
export class WaitersPage implements OnInit {
  viewState$: Observable<IWaitersListModel>;
  @Select(WaitersState.getWaiterList) waitersList: Observable<Waiter[]>;
  @Select(PointsState.getPointsList) pointsListState: Observable<Point[]>;
  @ViewChild('selectPointsComponent') selectPointsComponent: IonicSelectableComponent;
  selectPointList = [];
  showAddButton = null;
  constructor(
    public modalController: ModalController,
    private store: Store,
    private navigation: NavigationService,
  ) { }

  ngOnInit() {
    this.store.dispatch(new PointActions.Get());
    this.store.dispatch(new WaiterActions.Get());
    this.pointsListState.subscribe((response) => {
      if (response.length === 0) {
        this.showAddButton = true;
      }
      else {
        this.showAddButton = false;
      }
      this.selectPointList = response;
    });
  }
  async addWaiter() {
    const modal = await this.modalController.create({
      component: WaiterModalComponent,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data) {
      const newWaiter = {
        name: data.name,
        avatar: !data.avatar.imageData ? data.avatar : data.avatar.imageData,
      };
      this.store.dispatch(new WaiterActions.Add(newWaiter));
    }
  }
  async editWaiter(waiter, i) {
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
      let editedWaiter;
      this.waitersList.subscribe((wlist: any) => {
        editedWaiter = {
          id: wlist[i].id,
          name: data.name,
          hours: wlist[i].hours,
          pointsList: wlist[i].pointsList,
          avatar: !data.avatar.imageData ? data.avatar : data.avatar.imageData,
        };
      });
      this.store.dispatch(new WaiterActions.Update(editedWaiter, editedWaiter.id));
    }
  }

  onSelectTableChange($event, i) {
    const waiter = new Waiter({});
    this.waitersList.subscribe((response: any) => {
      waiter.id = response[i].id;
      waiter.name = response[i].name;
      waiter.pointsList = $event.value;
      waiter.avatar = response[i].avatar;
    });
    console.log(waiter);
    this.store.dispatch(new WaiterActions.Update(waiter, waiter.id));
  }
  deleteWaiter(id: number) {
    this.store.dispatch(new WaiterActions.Delete(id));
  }
  async homePage() {
    await this.navigation.navigateForward('home');
  }
  togglePoints() {
    this.selectPointsComponent.toggleItems(this.selectPointsComponent.itemsToConfirm.length ? false : true);
  }
  confirm() {
    this.selectPointsComponent.confirm();
    this.selectPointsComponent.close();
  }
}
