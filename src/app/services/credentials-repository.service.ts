import {Injectable} from '@angular/core';
import {PontomaisCredentials} from "../../types";

@Injectable({
  providedIn: 'root'
})
export abstract class CredentialsRepositoryService {
  protected credentials?: PontomaisCredentials;

  abstract hasCredentials(): boolean;

  abstract clearCredentials(): void;

  abstract setCredentials(credentials: PontomaisCredentials): void;

  abstract getCredentials(): PontomaisCredentials | undefined;
}
