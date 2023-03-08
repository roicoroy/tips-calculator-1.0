import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { IonSelect, ModalController } from '@ionic/angular';
import { Point } from 'src/app/models/point.type';
import { scaleHeight } from 'src/app/services/animations/animations';
import { generateId, titleCaseWord, numberize } from 'src/app/services/utils';

@Component({
  selector: 'app-points-modal',
  templateUrl: './points-modal.component.html',
  styleUrls: ['./points-modal.component.scss'],
  animations: [
    scaleHeight()
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PointsModalComponent implements OnInit, AfterViewInit {
  @ViewChild('createPointFormRef', { static: false }) createPointFormRef!: NgForm;
  @ViewChild('selectRef', { static: false }) selectRef!: IonSelect;
  @Input() point: Point;
  values = [
    {
      value: 0.5,
    },
    {
      value: 1,
    },
    {
      value: 1.5,
    },
    {
      value: 2.0,
    },
  ];

  createPointsForm: FormGroup;
  pointData: Point;

  pointId: any;

  isEdit: any = null;

  constructor(
    public modalController: ModalController,
  ) { }

  get labelFormControl() {
    return this.createPointsForm?.get('label') as FormControl;
  }
  get valueFormControl() {
    return this.createPointsForm?.get('value') as FormControl;
  }
  ngOnInit() {
    this.createPointsForm = new FormGroup({
      label: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
    });
  }
  ngAfterViewInit(): void {
    if (this.point === null || this.point === undefined) {
      this.isEdit = false;
      this.labelFormControl.setValue('');
      this.valueFormControl.setValue('');
    } else {
      this.isEdit = true;
      this.pointId = this.point.id;
      this.labelFormControl.setValue(this.point.label);
      this.valueFormControl.setValue(this.point.value);
    }
  }
  dismiss() {
    this.modalController.dismiss();
  }
  addNewPoint() {
    const newPoint = new Point({
      id: generateId(),
      label: titleCaseWord(this.createPointsForm.value.label),
      value: numberize(this.valueFormControl.value),
      type: 'checkbox'
    })
    if (this.createPointsForm.valid) {
      this.modalController.dismiss(newPoint);
    }
  }
  saveEditedPoint() {
    const editPoint = new Point({
      id: this.pointId,
      label: titleCaseWord(this.createPointsForm.value.label),
      value: numberize(this.valueFormControl.value),
      type: 'checkbox'
    });
    if (this.createPointsForm.valid) {
      this.modalController.dismiss(editPoint);
    }
  }

}
