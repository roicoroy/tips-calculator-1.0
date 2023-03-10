import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PointsPageRoutingModule } from './points-routing.module';

import { PointsPage } from './points.page';
import { PointsModalComponent } from './points-modal/points-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { KeypadModule } from 'src/app/services/keypad/keypad.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PointsPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    ComponentsModule,
    KeypadModule
  ],
  declarations: [
    PointsPage,
    PointsModalComponent,
  ]
})
export class PointsPageModule {}
