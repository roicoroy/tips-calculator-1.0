import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TutorialPageRoutingModule } from './tutorial-routing.module';

import { TutorialPage } from './tutorial.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ShellModule } from 'src/app/components/shell/shell.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TutorialPageRoutingModule,
    ComponentsModule,
    ShellModule
  ],
  declarations: [TutorialPage]
})
export class TutorialPageModule {}
