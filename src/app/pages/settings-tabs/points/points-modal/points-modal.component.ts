import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
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
export class PointsModalComponent implements OnInit {
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

  createPointsForm: FormGroup | any;

  labelField: FormControl | any;

  valueField: FormControl | any;

  pointData: Point | any;

  pointId: number | any;

  isEdit: any = null;

  constructor(
    public modalController: ModalController,
  ) {
  }
  get labelFormControl() {
    return this.createPointsForm.get('points').value as FormControl;
  }
  get valueFormControl() {
    return this.createPointsForm.get('value').value as FormControl;
  }
  ngOnInit() {
    this.setupForm();
    if (this.point === null || this.point === undefined) {
      this.isEdit = false;
      this.labelField.setValue('');
      this.valueField.setValue('');
    } else {
      this.isEdit = true;
      this.pointId = this.point.id;
      this.labelField.setValue(this.point.label);
      this.valueField.setValue(this.point.value);
    }
  }
  setupForm() {
    this.labelField = new FormControl('', Validators.required);
    this.valueField = new FormControl('', Validators.required);
    return this.createPointsForm = new FormGroup({
      label: this.labelField,
      value: this.valueField,
    });
  }
  dismiss() {
    this.modalController.dismiss();
  }
  addNewPoint() {
    const newPoint = {
      id: generateId(),
      label: titleCaseWord(this.createPointsForm.value.label),
      value: numberize(this.valueField.value),
      type: 'checkbox'
    };
    if (this.createPointsForm.valid) {
      this.modalController.dismiss(newPoint);
    }
  }
  saveEditedPoint() {
    const editPoint = {
      id: this.pointId,
      label: titleCaseWord(this.createPointsForm.value.label),
      value: numberize(this.valueField.value),
      type: 'checkbox'
    };
    if (this.createPointsForm.valid) {
      this.modalController.dismiss(editPoint);
    }
  }

}
