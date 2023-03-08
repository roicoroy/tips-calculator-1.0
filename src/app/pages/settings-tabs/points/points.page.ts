import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Point } from 'src/app/models';
import { ModalAnimationsService } from 'src/app/services/animations/modal-animations.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { PointActions } from 'src/app/store/points/point.action';
import { TutorialActions } from 'src/app/store/tutorial/tutorial.action';
import { PointsModalComponent } from './points-modal/points-modal.component';
import { PointsFacade } from './points.facade';

@Component({
  selector: 'app-points',
  templateUrl: './points.page.html',
  styleUrls: ['./points.page.scss'],
})
export class PointsPage {

  viewState$: Observable<any>;

  constructor(
    public modalController: ModalController,
    private store: Store,
    private facade: PointsFacade,
    private navigation: NavigationService,
    private animations: ModalAnimationsService,
  ) {
    this.viewState$ = this.facade.viewState$;
  }
  async addPoint() {
    const modal = await this.modalController.create({
      component: PointsModalComponent,
      animated: true,
      enterAnimation: this.animations.enterAnimation,
      leaveAnimation: this.animations.leaveAnimation
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
      },
      animated: true,
      enterAnimation: this.animations.enterAnimation,
      leaveAnimation: this.animations.leaveAnimation
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.store.dispatch(new PointActions.UpdatePoint(data, data.id));
    }
  }
  delete(point: Point) {
    this.store.dispatch(new PointActions.DeletePoint(point));
  }
  homePage() {
    this.navigation.navigateForward('/home');
  }
  openTutorial() {
    this.store.dispatch(new TutorialActions.SetTutorialComplete(false));
    this.navigation.navigateForward('/home');
  }
}
