import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { IonStorageService } from './ionstorage.service';
export const DARK_MODE = 'dark_mode';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public darkMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public darkModeIcon: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private ionStorage: IonStorageService
  ) { }

  themeInit() {
    this.ionStorage.getKeyAsObservable(DARK_MODE)
      .subscribe((darkMode: any) => {
        if (darkMode) {
          this.document.body.classList.toggle('dark', true);
          this.darkMode.next(true);
          this.darkModeIcon.next('moon');
        }
        if (!darkMode) {
          this.document.body.classList.toggle('dark', false);
          this.darkMode.next(false);
          this.darkModeIcon.next('sunny');
        }
      });
  }
  changeTheme(ev: any) {
    this.ionStorage.storageSet(DARK_MODE, ev.detail.checked).then(() => {
      if (ev.detail.checked) {
        this.document.body.classList.toggle('dark', ev.detail.checked);
        this.darkModeIcon.next('moon');
        this.darkMode.next(true);
      }
      if (!ev.detail.checked) {
        this.document.body.classList.toggle('dark', ev.detail.checked);
        this.darkModeIcon.next('sunny');
        this.darkMode.next(false);
      }
    });
  }
}
