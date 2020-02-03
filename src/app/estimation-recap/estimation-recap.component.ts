import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import { EstimationService } from '../services/estimation.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EstimationValue } from '../types';

@Component({
  selector: 'app-estimation-recap',
  templateUrl: './estimation-recap.component.html',
  styleUrls: ['./estimation-recap.component.scss']
})
export class EstimationRecapComponent implements OnInit{

  propertyType: any = {};
  propertyState: any = {};
  estimationSubscription: Subscription;
  recapData: EstimationValue ;

  constructor(private estimationService: EstimationService, private router: Router) { }

  ngOnInit(){
    this.propertyType = this.estimationService.propertyTypes;
    this.propertyState = this.estimationService.propertyStates;
    this.estimationSubscription = this.estimationService.estimationData$.subscribe(data=> {
      this.recapData = data;
    });
    this.estimationService.emitEstimation();
  }

  ngOnDestroy(): void {
    this.estimationSubscription.unsubscribe();
  }

  onEstimateClick() {    
    this.router.navigate(['estimation-result']);
  }
}
