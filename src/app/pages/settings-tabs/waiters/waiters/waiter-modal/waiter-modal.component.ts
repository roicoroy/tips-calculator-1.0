import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Waiter } from 'src/app/models';
import { TitleCasePipe } from '@angular/common';
import { generateId } from 'src/app/services/utils';
import { slideUp, scaleHeight } from 'src/app/services/animations/animations';

@Component({
  selector: 'app-waiter-modal',
  templateUrl: './waiter-modal.component.html',
  styleUrls: ['./waiter-modal.component.scss'],
  providers: [TitleCasePipe],
  animations: [
    slideUp(),
    scaleHeight()
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaiterModalComponent implements OnInit {

  @Input() waiter: Waiter;

  createWaiterForm: FormGroup;

  waiterId: number;

  isEdit: any = null;

  avatar: string = '';

  constructor(
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    private titleCasePipe: TitleCasePipe
  ) {
    this.createWaiterForm = new FormGroup({
      name: new FormControl(null),
      avatar: new FormControl(this.avatar),
    });
  }

  async ngOnInit() {
    this.setupForm();
    if (this.waiter === null || this.waiter === undefined) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
      this.waiterId = this.waiter.id;
      this.createWaiterForm.get('name')?.setValue(this.waiter.name);
      this.createWaiterForm.get('avatar')?.setValue(this.waiter.avatar);
      this.avatar = this.waiter.avatar;
    }
  }
  setupForm() {
    return this.createWaiterForm = new FormGroup({
      name: new FormControl(null),
      avatar: new FormControl(this.avatar),
    });
  }
  addNewWaiter() {
    const newWaiter = new Waiter({
      id: generateId(),
      name: this.titleCasePipe.transform(this.createWaiterForm.value.name),
      avatar: this.avatar,
    });
    if (this.createWaiterForm.valid) {
      this.modalController.dismiss(newWaiter);
    }
  }
  saveEWaiter() {
    const editedWaiter = new Waiter({
      id: this.waiterId,
      name: this.titleCasePipe.transform(this.createWaiterForm.value.name),
      avatar: this.avatar,
      pointsList: this.waiter.pointsList
    });
    if (this.createWaiterForm.valid) {
      this.modalController.dismiss(editedWaiter);
    }
  }
  async onImagePicked(imageData: string) {
    this.createWaiterForm.get('avatar')?.setValue(imageData);
    this.avatar = imageData;
  }
  dismiss() {
    this.modalController.dismiss();
  }
}
