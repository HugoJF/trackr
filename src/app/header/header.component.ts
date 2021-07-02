import {Component, OnInit} from '@angular/core';
import {PontomaisService} from "../services/pontomais.service";
import {Router} from "@angular/router";
import {CredentialsRepositoryService} from "../services/credentials-repository.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  now!: Date;

  constructor(
    private api: PontomaisService,
    private credentials: CredentialsRepositoryService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.now = new Date;
  }

  refresh(): void {
    this.api.request();
  }

  logout(): void {
    this.credentials.clearCredentials();
    this.router.navigateByUrl('login');
  }
}
