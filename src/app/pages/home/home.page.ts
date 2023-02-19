import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  constructor(
    private navigation: NavigationService,
  ) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
  }
  async settings() {
    await this.navigation.navigateFadeOut('settings/tabs/waiters');
  }
  async calculator() {
    await this.navigation.navigateFlip('calculator');
  }
  async details($event: Event) {
    await this.navigation.navigateFadeOut('home/details');
  }
}
