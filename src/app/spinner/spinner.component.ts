import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})

export class SpinnerComponent implements OnInit {

  strokeWidth = 4;
  diameter = 60;
  isLoading: boolean;
  spinnerSubscription: Subscription;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.spinnerSubscription = this.spinnerService.spinner$.subscribe(isLoading => {
      this.isLoading = isLoading;

    });
    this.spinnerService.emitShow();
  }
  ngOnDestroy(): void {
    this.spinnerSubscription.unsubscribe();
  }

}
