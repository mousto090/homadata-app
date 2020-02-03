import { Component, OnInit } from '@angular/core';
import { EstimationService } from '../services/estimation.service';
import { Router } from '@angular/router';
import { EstimationValue } from '../types';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-estimation-result',
  templateUrl: './estimation-result.component.html',
  styleUrls: ['./estimation-result.component.scss']
})
export class EstimationResultComponent implements OnInit {

  propertyType: any = {};
  propertyState: any = {};
  estimationData: EstimationValue;
  estimationSubscription: Subscription;
  spinnerSubscription: Subscription;
  error: boolean = false;
  isLoading: boolean = false;

  constructor(private estimationService: EstimationService, private router: Router,
    private _snackBar: MatSnackBar, private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.propertyType = this.estimationService.propertyTypes;
    this.propertyState = this.estimationService.propertyStates;
    this.estimationSubscription = this.estimationService.estimationData$.subscribe(data => {
      this.estimationData = data;
    });
    this.spinnerSubscription = this.spinnerService.spinner$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });

    this.estimationService.emitEstimation();
    if (!Object.values(this.estimationData).length) {
      return this.router.navigate(['/']);
    }
    this.estimate();
  }

  ngOnDestroy(): void {
    this.estimationSubscription.unsubscribe();
    this.spinnerSubscription.unsubscribe();
  }

  estimate() {
    this.estimationService.estimate().subscribe(res => {
      this.error = false;
      const { estimatedPrice } = res;
      this.estimationService.setEstimationData({ estimatedPrice, ...this.estimationData });
    }, err => {
      this.error = true;
      this._snackBar.open(err.message, 'Erreur', {
        duration: 4000,
      });
    });
  }

}
