import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TranslateComponent } from './translate/translate.component';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { WaitersListComponent } from './waiters-list/waiters-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { EntriesListComponent } from './entries-list/entries-list.component';
import { ThemeComponent } from './theme/theme.component';
import { SelectedEntryCardComponent } from './selected-entry-card/selected-entry-card.component';
import { ShellModule } from './shell/shell.module';
import { CardMenuComponent } from './card-menu/card-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ShellModule
  ],
  declarations: [
    TranslateComponent,
    ImagePickerComponent,
    WaitersListComponent,
    EntriesListComponent,
    SelectedEntryCardComponent,
    ThemeComponent,
    CardMenuComponent,
  ],
  exports: [
    TranslateComponent,
    ImagePickerComponent,
    WaitersListComponent,
    EntriesListComponent,
    TranslateModule,
    SelectedEntryCardComponent,
    ThemeComponent,
    CardMenuComponent,
  ]
})
export class ComponentsModule { }
