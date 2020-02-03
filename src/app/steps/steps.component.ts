import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { EstimationService } from '../services/estimation.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Subscription } from 'rxjs';

const integerValidator = (control: FormControl) => {
  return Number.isInteger(control.value) ? null : { isInteger: false };
}

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {

  selectedPropertyType: number;
  propertyTypes: any[] = [];
  propertyStates: any[] = [];
  estimationDataSubscription: Subscription;
  form: FormGroup;

  constructor(private _formBuilder: FormBuilder, private estimationService: EstimationService) { }

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.form.get('formArray'); }


  ngOnInit() {

    this.propertyTypes = this.estimationService.propertyTypes;
    this.propertyStates = this.estimationService.propertyStates;

    this.form = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          prix: ['', [Validators.required, Validators.min(1)]],
          surface: ['', [Validators.required, Validators.min(1)]],
          nbPieces: ['', [Validators.required, Validators.min(1), integerValidator]],
        }),
        this._formBuilder.group({
          type: ['', Validators.required]
        }),
        this._formBuilder.group({
          state: ['', Validators.required]
        }),
      ])
    });
  }

  /**
   * Listing to property type change to set style classes 
   * accordingly
   */
  selectedPropertyTypeChange() {
    const { formArray } = this.form.value;
    this.selectedPropertyType = +formArray[1].type;
  }


  stepperSelectionChange($event?: StepperSelectionEvent) {

    const { selectedStep } = $event;
    //update only when we are in the recap step
    if (!this.form.valid || selectedStep.label !== 'recap') {
      return;
    }
    const { formArray } = this.form.value;
    const formData = Object.assign({}, ...formArray);
    this.estimationService.setEstimationData(formData);
  }


}
