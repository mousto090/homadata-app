import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StepperComponent } from './stepper/stepper.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CdkStepperModule } from '@angular/cdk/stepper';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon';
import { EstimationRecapComponent } from './estimation-recap/estimation-recap.component';
import { StepsComponent } from './steps/steps.component'
import { EstimationService } from './services/estimation.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EstimationResultComponent } from './estimation-result/estimation-result.component';
import { RouterModule, Routes } from '@angular/router';
import { SpinnerService } from './services/spinner.service';
import { SpinnerInterceptor } from './interceptors/spinner.Interceptor';
import { SpinnerComponent } from './spinner/spinner.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const appRoutes: Routes = [
  { path: 'estimation-result', component: EstimationResultComponent },
  { path: '', component: StepsComponent },
  { path: '**', redirectTo: '/' },
];
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StepperComponent,
    EstimationRecapComponent,
    StepsComponent,
    EstimationResultComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MatToolbarModule,
    CdkStepperModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatRadioModule,
    MatCardModule,

    HttpClientModule,
    RouterModule.forRoot(appRoutes),

  ],
  providers: [
    EstimationService,
    SpinnerService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
