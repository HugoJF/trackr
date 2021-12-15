import {Component, Input, OnInit} from '@angular/core';
import {zonedTimeToUtc} from "date-fns-tz";
import {Time} from "../../dashboard/dashboard.component";

@Component({
  selector: 'app-time-card[period]',
  templateUrl: './time-card.component.html',
  host: {class: 'contents'}
})
export class TimeCardComponent implements OnInit {
  @Input() period!: Time[];
  @Input() interval?: number;
  @Input() date!: string;

  from!: Date;
  to?: Date;

  ngOnInit(): void {
    this.from = zonedTimeToUtc(`${this.date}T${this.period[0].time}:00`, 'America/Campo_Grande');
    if (this.period[1]) {
      this.to = zonedTimeToUtc(`${this.date}T${this.period[1].time}:00`, 'America/Campo_Grande');
    }
  }

}
