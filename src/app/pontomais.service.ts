import {Injectable} from '@angular/core';
import {PontomaisCredentials, Response} from "../types";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {format} from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class PontomaisService {
  private credentials?: PontomaisCredentials;

  constructor(private readonly http: HttpClient, private readonly router: Router) {
  }

  request(): Observable<Response> {
    const date = format(new Date, 'yyyy-L-dd');
    const url = `https://api.pontomais.com.br/api/time_card_control/current/work_days/${date}`;

    return this.http.get<Response>(url, {
      headers: {
        'access-token': this.credentials!.token,
        'client': this.credentials!.client,
        'uid': this.credentials!.uid,
      }
    })
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
