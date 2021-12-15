import {Component, OnDestroy, OnInit} from '@angular/core';
import {differenceInMinutes, differenceInSeconds} from "date-fns";
import {Response, TimeCard} from "../../types";
import {interval, Subject} from "rxjs";
import {PontomaisService} from "../services/pontomais.service";
import {zonedTimeToUtc} from "date-fns-tz";
import {takeUntil} from "rxjs/operators";
import {Title} from "@angular/platform-browser";
import * as _ from "lodash";
import {DatePipe} from "@angular/common";

export type Time = {
  time: string;
  modified: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  shiftDuration = 0;
  shiftWorked = 0;
  shiftProgress = 0;

  distance = '';

  cards: TimeCard[] = [];
  times: Time[] = [];
  periods: Time[][] = [];
  replacements: Record<string, string> = {};
  extras: string[] = [];

  inShift = false;

  loading: boolean = true;

  response?: Response;
  notifier = new Subject;

  constructor(private title: Title, private pontomais: PontomaisService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    interval(1000)
      .pipe(takeUntil(this.notifier))
      .subscribe(this.tick.bind(this));

    this
      .pontomais
      .response
      .subscribe(data => {
        this.response = data;
        this.boot();
        this.tick();
        this.loading = false;
      });

    this.pontomais.request();
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  boot() {
    this.shiftDuration = this.response!.work_day.shift_time;
    this.cards = this.response!.work_day.time_cards;
    this.recomputePeriods();
  }

  tick() {
    this.recomputeTimeWorked();
    this.recomputeDistance();
    this.updateTitle();
  }

  getDate() {
    return this.cards[0].date;
  }

  private recomputePeriods() {
    this.times = this.cards.map(card => {
      const time = this.zonedHoursToDate(card.time);
      const replace = this.replacements[time];

      if (replace) {
        return {
          time: this.hoursToDate(replace),
          modified: true,
        }
      }

      return {
        time: time,
        modified: false,
      }
    })

    this.extras.forEach(extra => {
      this.times.push({
        time: extra,
        modified: true,
      })
    })

    this.times = this.times.sort((a, b) => a.time.localeCompare(b.time));
    this.periods = _.chunk(this.times, 2);
    this.inShift = this.times.length % 2 !== 0;
  }

  private recomputeTimeWorked() {
    this.shiftWorked = _.sum(this.periods.map(this.cardToSecondsWorked.bind(this)));
    this.shiftProgress = this.shiftWorked / this.shiftDuration;
  }

  private updateTitle() {
    this.title.setTitle([
      !this.inShift && '!',
      Math.round(this.shiftProgress * 1000) / 10,
      '% - ',
      this.distance
    ].filter(Boolean).join(''));
  }

  cardToSecondsWorked(period: Time[]) {
    const from = this.timeToDate(period[0]);
    const to = period.length === 1 ? new Date : this.timeToDate(period[1]);

    return differenceInSeconds(to, from);
  }

  zonedTimeToDate(time: Time) {
    return zonedTimeToUtc(`${this.getDate()}T${time.time}:00`, 'America/Sao_Paulo');
  }

  timeToDate(time: Time) {
    return zonedTimeToUtc(`${this.getDate()}T${time.time}:00`, 'America/Campo_Grande');
  }

  recomputeDistance() {
    const secondsRemaining = this.shiftDuration - this.shiftWorked;
    const minutesRemaining = Math.abs(secondsRemaining / 60);
    const extra = minutesRemaining < 0 ? '+' : '';

    const hours = Math.floor(minutesRemaining / 60);
    const minutes = Math.round((minutesRemaining / 60 - hours) * 60);

    if (hours > 0) {
      this.distance = extra + hours + 'h' + minutes + 'm';
    } else {
      this.distance = extra + minutes + 'm';
    }
  }

  addTime() {
    const extra = prompt('Time to add') as string;

    if (this.extras.includes(extra)) {
      this.extras = this.extras.filter(e => e !== extra)
    } else {
      this.extras.push(extra);
    }

    this.recomputePeriods();
  }

  fixTime() {
    const from = prompt('Time to update');
    const to = prompt('New value');

    if (typeof from !== 'string' || typeof to !== 'string') {
      return
    }

    if (!this.isValidHours(from) || !this.isValidHours(to)) {
      return
    }

    this.replacements[from] = to;
    this.recomputePeriods();
  }

  getInterval(i: number): number | undefined {
    const current = this.periods[i];
    const next = this.periods[i + 1];

    if (!next) {
      return undefined;
    }

    const end = current[1];
    const start = next[0];

    const endDate = this.zonedTimeToDate(end);
    const startDate = this.zonedTimeToDate(start);

    return differenceInMinutes(startDate, endDate);
  }

  zonedHoursToDate(hour: string) {
    const date = this.zonedTimeToDate({modified: false, time: hour});

    return this.toTimeString(date);
  }

  hoursToDate(hour: string) {
    const date = this.timeToDate({modified: false, time: hour});

    return this.toTimeString(date);
  }

  toTimeString(date: Date) {
    return this.datePipe.transform(date, 'HH:mm', 'America/Campo_Grande') as string;
  }

  isValidHours(hours: string) {
    return hours.match(/\d\d:\d\d/);
  }
}
