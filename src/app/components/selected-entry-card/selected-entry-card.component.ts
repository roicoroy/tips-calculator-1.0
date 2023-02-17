import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Entry } from 'src/app/models';

@Component({
  selector: 'selected-entry-card',
  templateUrl: './selected-entry-card.component.html',
  styleUrls: ['./selected-entry-card.component.scss'],
})
export class SelectedEntryCardComponent {

  @Input() selectedEntry: Entry;

  constructor(
    readonly sanitizer: DomSanitizer,
  ) { }

  ionViewDidEnter() {
    console.log(this.selectedEntry);
  }
}
