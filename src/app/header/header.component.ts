import {Component, OnInit} from '@angular/core';
import {PontomaisService} from "../pontomais.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  now!: Date;

  constructor(private api: PontomaisService, private router: Router) {
  }

  ngOnInit(): void {
    this.now = new Date;
  }

  refresh(): void {
    this.api.request();
  }

  logout(): void {
    this.api.clearCredentials();
    this.router.navigateByUrl('login');
  }
}
