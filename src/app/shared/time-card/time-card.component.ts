import {Component, Input, OnInit} from '@angular/core';
import {TimeCard} from "../../../types";
import {zonedTimeToUtc} from "date-fns-tz";

@Component({
  selector: 'app-time-card[period]',
  templateUrl: './time-card.component.html',
  host: {class: 'contents'}
})
export class TimeCardComponent implements OnInit {
  @Input() period!: TimeCard[];
  @Input() interval?: number;

  from!: Date;
  to?: Date;

  ngOnInit(): void {
    this.from = zonedTimeToUtc(`${this.period[0].date}T${this.period[0].time}:00`, 'America/Sao_Paulo');
    if (this.period[1]) {
      this.to = zonedTimeToUtc(`${this.period[1].date}T${this.period[1].time}:00`, 'America/Sao_Paulo');
    }
  }

}
