import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html'
})
export class FieldComponent {
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() error?: string;

  constructor() {
  }

}
