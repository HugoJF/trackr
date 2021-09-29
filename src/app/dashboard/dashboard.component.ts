import {Component, OnDestroy, OnInit} from '@angular/core';
import {differenceInMinutes, differenceInSeconds} from "date-fns";
import {Response, TimeCard} from "../../types";
import {interval, Subject} from "rxjs";
import {PontomaisService} from "../services/pontomais.service";
import {zonedTimeToUtc} from "date-fns-tz";
import {takeUntil} from "rxjs/operators";
import {Title} from "@angular/platform-browser";
import * as _ from "lodash";

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
  periods: TimeCard[][] = [];

  inShift = false;

  loading: boolean = true;

  response?: Response;
  notifier = new Subject;

  constructor(private title: Title, private pontomais: PontomaisService) {
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
    this.periods = _.chunk(this.cards, 2);
    this.inShift = this.cards.length % 2 === 0;
  }

  tick() {
    this.recomputeTimeWorked();
    this.recomputeDistance();
    this.updateTitle();
  }

  private recomputeTimeWorked() {
    this.shiftWorked = _.sum(this.periods.map(this.cardToSecondsWorked.bind(this)));
    this.shiftProgress = this.shiftWorked / this.shiftDuration;
  }

  private updateTitle() {
    this.title.setTitle([
      this.inShift && '!',
      Math.round(this.shiftProgress * 100),
      '% - ',
      this.distance
    ].filter(Boolean).join(''));
  }

  cardToSecondsWorked(period: TimeCard[]) {
    const from = this.cardToDate(period[0]);
    const to = period.length === 1 ? new Date : this.cardToDate(period[1]);

    return differenceInSeconds(to, from);
  }

  cardToDate(card: TimeCard) {
    return zonedTimeToUtc(`${card.date}T${card.time}:00`, 'America/Sao_Paulo');
  }

  recomputeDistance() {
    const secondsRemaining = this.shiftDuration - this.shiftWorked;
    const minutesRemaining = Math.abs(secondsRemaining / 60);
    const extra = minutesRemaining < 0 ? '+' : '';

    if (minutesRemaining < 100) {
      this.distance = extra + Math.round(minutesRemaining) + 'min';
    } else {
      this.distance = extra + Math.round(minutesRemaining / 60) + 'h';
    }
  }

  getInterval(i: number): number | undefined {
    const current = this.periods[i];
    const next = this.periods[i + 1];

    if (!next) {
      return undefined;
    }

    const end = current[1];
    const start = next[0];

    const endDate = zonedTimeToUtc(`${end.date}T${end.time}:00`, 'America/Sao_Paulo');
    const startDate = zonedTimeToUtc(`${start.date}T${start.time}:00`, 'America/Sao_Paulo');

    return differenceInMinutes(startDate, endDate);
  }
}
