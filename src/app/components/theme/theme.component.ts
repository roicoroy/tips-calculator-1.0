import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
})
export class ThemeComponent implements OnInit {
  appDarkMode$: Observable<any>;
  appDarkModeIcon$: Observable<any>;

  constructor(
    private theme: ThemeService
  ) { }

  ngOnInit() {
    this.theme.themeInit();
    this.appDarkMode$ = this.theme.darkMode;
    this.appDarkModeIcon$ = this.theme.darkModeIcon;
  }
  onChangeTheme(ev: any) {
    this.theme.changeTheme(ev);
  }

}
