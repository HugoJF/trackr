import { Component, OnInit } from '@angular/core';
import {PontomaisService} from "../pontomais.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private api: PontomaisService, private router: Router) { }

  ngOnInit(): void {
    if (this.api.hasCredentials()) {
      this.router.navigateByUrl('/')
    }
  }

}
