import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PointsPageRoutingModule } from './points-routing.module';

import { PointsPage } from './points.page';
import { PointsModalComponent } from './points-modal/points-modal.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PointsPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    PointsPage,
    PointsModalComponent,
  ]
})
export class PointsPageModule {}
