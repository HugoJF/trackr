import {Injectable} from '@angular/core';
import {CredentialsRepositoryService} from "./credentials-repository.service";
import {PontomaisCredentials} from "../../types";

@Injectable({
  providedIn: 'root'
})
export class LocalstorageCredentialsRepositoryService extends CredentialsRepositoryService {

  constructor() {
    super();
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
  }

  setCredentials(credentials: PontomaisCredentials) {
    localStorage.setItem('credentials', JSON.stringify(credentials));

    this.credentials = credentials;
  }

  getCredentials(): PontomaisCredentials | undefined {
    return this.credentials;
  }
}
