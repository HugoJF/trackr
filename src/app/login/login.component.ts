import {Component, OnDestroy, OnInit} from '@angular/core';
import {PontomaisService} from "../services/pontomais.service";
import {Router} from "@angular/router";
import {CredentialsRepositoryService} from "../services/credentials-repository.service";
import {SuperFormBuilder} from "../super-form-builder";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  code = "const a=JSON.parse(localStorage.getItem('auth_headers'));btoa(JSON.stringify({token:a['access-token'],client:a.client,uid:a.uid}));"

  // tempo restante com minutos
  // até que horas preciso ir
  // edição de pontos
  // 00.0%

  formBuilder = new SuperFormBuilder({
    token: {
      required: true,
      disabled: form => form.quicksetup,
    },
    client: {
      required: true,
      disabled: form => form.quicksetup,
    },
    uid: {
      required: true,
      disabled: form => form.quicksetup,
    },
    quicksetup: {
      disabled: form => form.uid || form.token || form.client,
      // flags: {
      //   valid: form => form.client === 'me',
      //   tamanho: form => form?.client?.length ?? 0,
      // }
    },
  })

  form = this.formBuilder.getFormGroup()

  constructor(
    private api: PontomaisService,
    private credentials: CredentialsRepositoryService,
    private router: Router
  ) {
  }

  ngOnDestroy(): void {
    this.formBuilder.unsubscribe();
  }

  get(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  ngOnInit(): void {
    if (this.credentials.hasCredentials()) {
      this.router.navigateByUrl('/')
    }
    this.form.controls.quicksetup.valueChanges.subscribe(value => {
      try {
        const {token, client, uid} = JSON.parse(atob(value))
        if (!token || !client || !uid) {
          throw new Error;
        }
        this.form.setValue({
          client, uid, token,
        })
      } catch (e) {
      }
    })
  }

  login(): void {
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return
    }

    this.credentials.setCredentials(this.form.value);
    this.router.navigateByUrl('');
  }
}
