import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input[name][label]',
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() name!: string;
  @Input() label!: string;
  @Input() type: string = '';

  @Input() control!: FormControl;

  hasBlurred = false;

  constructor() {
  }

  canDisplayErrors() {
    return this.hasBlurred && (this.control.touched || this.control.dirty);
  }

  getErrorMessage() {
    if (!this.control.errors || !this.canDisplayErrors()) {
      return;
    }

    if (this.control.errors?.required) {
      return `Campo ${this.name} é obrigatório'!`;
    }

    if (this.control.errors?.minlength) {
      return `Campo ${this.name} exige um tamanho mínimo de ${this.control.errors.minlength.requiredLength} caracteres`;
    }

    if (this.control.errors?.mustEqual) {
      return `Campo ${this.name} precisa ser igual ao campo ${this.control.errors.mustEqual}`;
    }

    if (this.control.errors?.email) {
      return `Campo ${this.name} precisa ser um email válido`;
    }

    // FIXME
    console.log(this.control.errors);

    return 'Invalid field';
  }
}
