import {Injectable, OnDestroy} from '@angular/core';
import {PontomaisCredentials, Response} from "../types";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {format} from 'date-fns';
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PontomaisService implements OnDestroy {
  private credentials?: PontomaisCredentials;
  readonly response: Subject<Response> = new Subject<Response>();

  constructor(private readonly http: HttpClient, private readonly router: Router) {
  }

  ngOnDestroy(): void {
    this.response.complete();
  }

  request(): void {
    const date = format(new Date, 'yyyy-L-dd');
    const url = `https://api.pontomais.com.br/api/time_card_control/current/work_days/${date}`;
    const options = {
      headers: {
        'access-token': this.credentials!.token,
        'client': this.credentials!.client,
        'uid': this.credentials!.uid,
      }
    };

    this
      .http
      .get<Response>(url, options)
      .pipe(take(1))
      .subscribe(data => {
        this.response.next(data)
      });
  }

  hasCredentials(): boolean {
    const storage = localStorage.getItem('credentials');

    if (storage) {
      this.credentials = JSON.parse(storage);
    }

    return Boolean(this.credentials);
  }

  clearCredentials(): void {
    localStorage.removeItem('credentials');
    this.credentials = undefined;
    this.router.navigateByUrl('login');
  }

  setCredentials(credentials: PontomaisCredentials) {
    localStorage.setItem('credentials', JSON.stringify(credentials));

    this.credentials = credentials;
  }
}
