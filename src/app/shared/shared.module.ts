import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from "./input/input.component";
import {FieldComponent} from "./field/field.component";
import {TitleComponent} from "./title/title.component";
import {ProgressBarComponent} from "./progress-bar/progress-bar.component";
import {AlertComponent} from "./alert/alert.component";
import {TimeCardComponent} from "./time-card/time-card.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    InputComponent,
    FieldComponent,
    TitleComponent,
    ProgressBarComponent,
    AlertComponent,
    TimeCardComponent
  ],
  exports: [
    InputComponent,
    FieldComponent,
    TitleComponent,
    ProgressBarComponent,
    AlertComponent,
    TimeCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule {
}
