import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EstimationValue } from '../types';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EstimationService {

  propertyTypes: any[] = ['Maison', 'Appartement'];
  propertyStates: any[] = ['​Nécessite des travaux', 'Bon état', 'Refait à neuf'];
  private estimationData: EstimationValue | any;
  estimationData$ = new Subject<EstimationValue>();

  constructor(private httpClient: HttpClient) { }

  emitEstimation() {
    this.estimationData$.next({ ...this.estimationData });
  }

  setEstimationData(data: EstimationValue) {
    this.estimationData = data;
    this.emitEstimation();//notify changes
  }

  
  estimate(): Observable<EstimationValue> {
    const {apiURL} = environment;
    return this.httpClient.post<EstimationValue>(apiURL, this.estimationData);
  }
}

