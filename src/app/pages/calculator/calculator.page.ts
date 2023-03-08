import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController, IonAccordionGroup, IonDatetime, PickerController, PickerOptions } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Entry, Waiter } from 'src/app/models';
import { scaleHeight, slideUp } from 'src/app/services/animations/animations';
import { NavigationService } from 'src/app/services/navigation.service';
import { ResultActions } from 'src/app/store/result/result.action';
import { WaiterActions } from 'src/app/store/waiters/waiter.action';
import { CalculatorFacade, ICalculatorFacadeModel } from './calculator.facade';
import { CalculatorService } from './calculator.service';
import { SumPointsArrayPipe } from './sum-array.pipe';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
  providers: [
    SumPointsArrayPipe,
    CalculatorService
  ],
  animations: [
    slideUp(),
    scaleHeight()
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorPage {

  @ViewChild('accordionGroup', { static: true }) accordionGroup: IonAccordionGroup;

  @ViewChild('dateTimeRef', { static: false }) dateTimeRef: ElementRef<IonDatetime>;

  viewState$: Observable<ICalculatorFacadeModel>;

  entryForm: FormGroup;

  validationMessages = {
    tipsAmount: [
      { type: 'required', message: 'tipsAmount is required' }
    ],
    date: [
      { type: 'required', message: 'Date is required' }
    ],
  };

  dateToday = new Date().toISOString();

  selectedHours = null;

  constructor(
    private navigation: NavigationService,
    private facade: CalculatorFacade,
    private formBuilder: FormBuilder,
    private store: Store,
    private pickerController: PickerController,
    private alertController: AlertController,
    private calculatorService: CalculatorService
  ) {
    this.viewState$ = this.facade.viewState$;
    this.entryForm = this.formBuilder.group({
      date: new FormControl(this.dateToday),
      tipsAmount: new FormControl(null, Validators.required),
    });
  }
  calculate(waitersList: Waiter[]) {
    if (this.entryForm.value.date && this.entryForm.value.tipsAmount) {
      const teamEntry: Entry = this.calculatorService.calculateWaiterEntryObject(waitersList, this.entryForm.value.date, this.entryForm.value.tipsAmount);
      if (teamEntry) {
        this.store.dispatch(new ResultActions.SetResult(teamEntry));
        this.store.dispatch(new ResultActions.SetSelectedResult(teamEntry));
        this.navigation.navigateForward('result');
      }
    } else {
      this.presentAlert('Add Tips Amount');
    }
  }
  async presentAlert(message: any) {
    const alert = await this.alertController.create({
      message: message,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
        },
      ],
    });
    await alert.present();
  }
  submitButtonState(waitersList: Waiter[]): boolean {
    let resultB = waitersList.every((el: Waiter, index: number, arr: Waiter[]) => {
      let myArray: Waiter[] = [];
      arr.forEach((waiter: any) => {
        waiter.hours;
        myArray.push(waiter.hours);
      });
      return el.hours === arr[index].hours && myArray[index] != null;
    }
    );
    return resultB;
  }
  async showPicker(w: Waiter, i: number) {
    const settings: PickerOptions = {
      cssClass: 'custom-picker',
      buttons: [
        {
          text: 'Reset',
          role: 'cancel',
          handler: (e: any) => {
            this.selectedHours = null;
            const waiters: Waiter[] = this.store.selectSnapshot<any>((state: any) => state.waiter?.waiters);
            const waiter = new Waiter({
              id: waiters[i].id,
              name: waiters[i].name,
              pointsList: waiters[i].pointsList,
              avatar: waiters[i].avatar,
              hours: null,
            });
            this.store.dispatch(new WaiterActions.Update(waiter, waiter.id));
          }
        },
        {
          text: 'Ok',
          handler: (e: any) => {
            const hours = e.hours.value;
            const quarters = e.quarters.value;
            const hoursString: any = [`${hours}.${quarters}`];
            const hoursNumber: number = parseFloat(hoursString);
            const waiters: Waiter[] = this.store.selectSnapshot<any>((state: any) => state.waiter?.waiters);
            const waiter = new Waiter({
              id: waiters[i].id,
              name: waiters[i].name,
              pointsList: waiters[i].pointsList,
              avatar: waiters[i].avatar,
              hours: hoursNumber,
            });
            this.store.dispatch(new WaiterActions.Update(waiter, waiter.id));
          },
        }
      ],
      columns: [
        {
          name: 'hours',
          options: [
            {
              text: '1',
              value: 1
            },
            {
              text: '2',
              value: 2
            },
            {
              text: '3',
              value: 3
            },
            {
              text: '4',
              value: 4
            },
            {
              text: '5',
              value: 5
            },
            {
              text: '6',
              value: 6
            },
            {
              text: '7',
              value: 7
            },
            {
              text: '8',
              value: 8
            },
            {
              text: '9',
              value: 9
            },
            {
              text: '10',
              value: 10
            },
            {
              text: '11',
              value: 11
            },
            {
              text: '12',
              value: 12
            },
            {
              text: '13',
              value: 13
            },
          ]
        },
        {
          name: 'quarters',
          options: [
            {
              text: '00',
              value: 0
            },
            {
              text: '25',
              value: 25
            },
            {
              text: '50',
              value: 50
            },
            {
              text: '75',
              value: 75
            },
          ]
        }
      ],
    };
    const picker = await this.pickerController.create(settings);
    picker.present();
  }
  toggleAccordion = () => {
    const nativeEl = this.accordionGroup;
    if (nativeEl.value) {
      nativeEl.value = undefined;
    }
    else {
      nativeEl.value = '';
    }
  };
  onDateTimeChange() {
    this.dateTimeRef.nativeElement.confirm();
  }
  async result() {
    await this.navigation.navigateForward('result');
  }
  async home() {
    await this.navigation.navigateFadeOut('home');
  }
}
