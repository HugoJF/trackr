import {Component, OnDestroy, OnInit} from '@angular/core';
import {Response, TimeCard} from "../../types";
import {interval, Subject} from "rxjs";
import {Title} from "@angular/platform-browser";
import {PontomaisService} from "../pontomais.service";
import {takeUntil} from "rxjs/operators";
import * as _ from "lodash";
import {addSeconds, differenceInSeconds, formatDistance} from "date-fns";
import {zonedTimeToUtc} from "date-fns-tz";

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
      .request()
      .subscribe(data => {
        this.response = data;
        this.boot();
        this.tick();
        this.loading = false;
      });

  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  boot() {
    this.shiftDuration = this.response!.work_day.shift_time;
    this.cards = this.response!.work_day.time_cards;
    this.periods = _.chunk(this.cards, 2);
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
    this.title.setTitle(`${Math.round(this.shiftProgress * 100)}% - ${this.distance}`);
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
    const from = new Date;
    const to = addSeconds(new Date, this.shiftDuration - this.shiftWorked);

    this.distance = formatDistance(from, to);
  }
}
