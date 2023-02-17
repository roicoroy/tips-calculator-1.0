import { Component } from '@angular/core';
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
  ) {
    this.initializeApp();
  }
  async initializeApp() {
    try {
      this.language.initTranslate();
      this.theme.themeInit();
      this.keyboardService.setAccessoryBarVisible(true).catch(() => { });
      this.keyboardService.initKeyboardListeners();
    } catch (err) {
      console.log('This is normal in a browser', err);
    }
  }
}
