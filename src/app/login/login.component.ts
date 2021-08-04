import {Component, OnInit} from '@angular/core';
import {PontomaisService} from "../services/pontomais.service";
import {Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";
import {CredentialsRepositoryService} from "../services/credentials-repository.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  code = "const a=JSON.parse(localStorage.getItem('auth_headers'));btoa(JSON.stringify({token:a['access-token'],client:a.client,uid:a.uid}));"

  token = new FormControl('', [
    Validators.required,
  ]);

  client = new FormControl('', [
    Validators.required,
  ]);

  uid = new FormControl('', [
    Validators.required,
  ]);

  quicksetup = new FormControl('', []);

  constructor(
    private api: PontomaisService,
    private credentials: CredentialsRepositoryService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.credentials.hasCredentials()) {
      this.router.navigateByUrl('/')
    }
    this.quicksetup.valueChanges.subscribe(value => {
      try {
        const {token, client, uid} = JSON.parse(atob(value))
        if (!token || !client || !uid) throw new Error;
        this.client.setValue(client);
        this.uid.setValue(uid);
        this.token.setValue(token);
      } catch (e) {
        console.error(e)
      }
    })
  }

  login(): void {
    this.credentials.setCredentials({
      uid: this.uid.value.toString(),
      client: this.client.value.toString(),
      token: this.token.value.toString(),
    });
    this.router.navigateByUrl('');
  }
}
