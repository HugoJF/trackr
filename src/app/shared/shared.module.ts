import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from "./input/input.component";
import {FieldComponent} from "./field/field.component";
import {TitleComponent} from "./title/title.component";
import {ProgressBarComponent} from "./progress-bar/progress-bar.component";
import {AlertComponent} from "./alert/alert.component";
import {TimeCardComponent} from "./time-card/time-card.component";
import {ReactiveFormsModule} from "@angular/forms";
import { AircraftComponent } from './aircraft/aircraft.component';

@NgModule({
  declarations: [
    InputComponent,
    FieldComponent,
    TitleComponent,
    ProgressBarComponent,
    AlertComponent,
    TimeCardComponent,
    AircraftComponent
  ],
  exports: [
    InputComponent,
    FieldComponent,
    TitleComponent,
    ProgressBarComponent,
    AlertComponent,
    TimeCardComponent,
    AircraftComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule {
}
