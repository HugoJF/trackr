import {Injectable, OnDestroy} from '@angular/core';
import {Response} from "../../types";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {format} from 'date-fns';
import {take} from "rxjs/operators";
import {CredentialsRepositoryService} from "./credentials-repository.service";

@Injectable({
  providedIn: 'root'
})
export class PontomaisService implements OnDestroy {
  readonly response: Subject<Response> = new Subject<Response>();

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly credentials: CredentialsRepositoryService
  ) {
  }

  ngOnDestroy(): void {
    this.response.complete();
  }

  request(): void {
    const date = format(new Date, 'yyyy-L-dd');
    const url = `https://api.pontomais.com.br/api/time_card_control/current/work_days/${date}`;
    const options = {
      headers: {
        'access-token': this.credentials.getCredentials()!.token,
        'client': this.credentials.getCredentials()!.client,
        'uid': this.credentials.getCredentials()!.uid,
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

}
