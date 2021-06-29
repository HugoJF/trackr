import {Component, OnInit} from '@angular/core';
import {PontomaisService} from "../pontomais.service";
import {Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  token = new FormControl('', [
    Validators.required,
  ]);

  client = new FormControl('', [
    Validators.required,
  ]);

  uid = new FormControl('', [
    Validators.required,
  ]);

  constructor(private api: PontomaisService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.api.hasCredentials()) {
      this.router.navigateByUrl('/')
    }
  }

  login(): void {
    this.api.setCredentials({
      uid: this.uid.value.toString(),
      client: this.client.value.toString(),
      token: this.token.value.toString(),
    });
    this.router.navigateByUrl('');
  }
}
