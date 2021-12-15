import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from './header/header.component';
import {SharedModule} from "./shared/shared.module";
import {LocalstorageCredentialsRepositoryService} from "./services/localstorage-credentials-repository.service";
import {CredentialsRepositoryService} from "./services/credentials-repository.service";
import {DatePipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    DatePipe,
    {
      provide: CredentialsRepositoryService,
      useExisting: LocalstorageCredentialsRepositoryService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
