import {Component, Input} from '@angular/core';
import {TimeCard} from "../../../types";

@Component({
  selector: 'app-time-card[period]',
  templateUrl: './time-card.component.html'
})
export class TimeCardComponent {
  @Input() period!: TimeCard[];
}
