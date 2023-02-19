import { AfterViewInit, Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, MenuController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { NavigationService } from 'src/app/services/navigation.service';
import { TutorialActions } from 'src/app/store/tutorial/tutorial.action';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit, AfterViewInit {
  slidesOptions: any = {
    zoom: {
      toggle: false // Disable zooming to prevent weird double tap zomming on slide images
    }
  };
  @ViewChild(IonSlides, { static: true }) slides: IonSlides;

  @HostBinding('class.first-slide-active') isFirstSlide = true;

  @HostBinding('class.last-slide-active') isLastSlide = false;

  constructor(
    public menu: MenuController,
    private router: Router,
    private store: Store,
    private navigation: NavigationService,

  ) { }

  ngOnInit(): void {
    this.menu.enable(false);
  }
  onClickMeWithEvent($event: any) {
    // MouseEvent {isTrusted: true, screenX: 234, ...
    console.log(event);
  }
  ngAfterViewInit(): void {
    this.slides.isBeginning().then(isBeginning => {
      this.isFirstSlide = isBeginning;
    });
    this.slides.isEnd().then(isEnd => {
      this.isLastSlide = isEnd;
    });
    this.slides.ionSlideWillChange.subscribe(changes => {
      this.slides.isBeginning().then(isBeginning => {
        this.isFirstSlide = isBeginning;
      });
      this.slides.isEnd().then(isEnd => {
        this.isLastSlide = isEnd;
      });
    });
  }
  skipWalkthrough(): void {
    this.slides.length().then(length => {
      this.slides.slideTo(length);
    });
  }
  async finish() {
    this.store.dispatch(new TutorialActions.SetTutorialComplete(true));
    await this.navigation.navigateFlip('/home');
  }

}
