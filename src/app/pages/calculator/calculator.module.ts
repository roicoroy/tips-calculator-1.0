import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalculatorPageRoutingModule } from './calculator-routing.module';

import { CalculatorPage } from './calculator.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { SumPointsArrayPipe } from './sum-array.pipe';
import { KeypadModule } from 'src/app/services/keypad/keypad.module';
import { CalculatorService } from './calculator.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalculatorPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    ComponentsModule,
    KeypadModule
  ],
  declarations: [
    CalculatorPage,
    SumPointsArrayPipe,
  ],
  providers: [
    SumPointsArrayPipe,
    CalculatorService
  ],
})
export class CalculatorPageModule { }
