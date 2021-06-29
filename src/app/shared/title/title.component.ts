import {Component, Input} from '@angular/core';

export type TitleType = 'super' | 'header' | 'subheader';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html'
})
export class TitleComponent {
  @Input() type: TitleType = 'super';

  constructor() {
  }

}
