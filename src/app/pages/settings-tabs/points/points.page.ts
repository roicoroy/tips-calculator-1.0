import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Point } from 'src/app/models';
import { NavigationService } from 'src/app/services/navigation.service';
import { PointActions } from 'src/app/store/points/point.action';
import { PointsModalComponent } from './points-modal/points-modal.component';
import { PointsFacade } from './points.facade';

@Component({
  selector: 'app-points',
  templateUrl: './points.page.html',
  styleUrls: ['./points.page.scss'],
})
export class PointsPage implements OnInit {

  viewState$: Observable<any>;

  constructor(
    public modalController: ModalController,
    private store: Store,
    private facade: PointsFacade,
    private navigation: NavigationService,
  ) {
    this.viewState$ = this.facade.viewState$;
    // this.viewState$.subscribe((vs: any) => {
    //   console.log(vs.pointsList);
    // });
  }

  ngOnInit() {
    // this.store.dispatch(new PointActions.GetPoints());

  }
  ionViewWillEnter() {
  }
  async addPoint() {
    const modal = await this.modalController.create({
      component: PointsModalComponent,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.store.dispatch(new PointActions.AddPoint(data));
    }
  }
  async editPoint(point: any) {
    const modal = await this.modalController.create({
      component: PointsModalComponent,
      cssClass: 'modal-class',
      componentProps: {
        point,
      }
    });
    await modal.present();
    const {
      data
    } = await modal.onWillDismiss();
    if (data) {
      // console.log(data);
      const editedPoint: Point = {
        id: data.id,
        label: data.label,
        type: data.type,
        value: data.value,
      };
      this.store.dispatch(new PointActions.UpdatePoint(editedPoint, editedPoint.id));
    }
  }
  delete(point:Point) {
    this.store.dispatch(new PointActions.DeletePoint(point));
  }
  homePage() {
    this.navigation.navigateForward('home');
  }
}
