import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { KeyboardService } from './services/keypad/keyboard.service';
import { LanguageService } from './services/language/language.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    public readonly language: LanguageService,
    private readonly theme: ThemeService,
    private readonly keyboardService: KeyboardService,
    private readonly platform: Platform,
  ) {
    this.initializeApp();
  }
  async initializeApp() {
    try {
      this.language.initTranslate();
      this.theme.themeInit();

      if (this.platform.is('android') || this.platform.is('ios')) {
        this.keyboardService.setAccessoryBarVisible(true).catch(() => { });
        this.keyboardService.initKeyboardListeners();
      }
    } catch (err) {
      console.log('This is normal in a browser', err);
    }
  }
}
