import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WaitersPage } from './waiters.page';
import { WaiterModalComponent } from './waiters/waiter-modal/waiter-modal.component';
import { WaitersPageRoutingModule } from './waiters-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { KeypadModule } from 'src/app/services/keypad/keypad.module';
import { IonicSelectableModule } from 'src/app/components/ionic-selectable/ionic-selectable.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    WaitersPageRoutingModule,
    ComponentsModule,
    KeypadModule
  ],
  declarations: [
    WaitersPage,
    WaiterModalComponent
  ],
  exports: [
    WaitersPage,
    WaiterModalComponent
  ]
})
export class WaitersPageModule { }
