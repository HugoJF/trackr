import {Injectable} from '@angular/core';
import {Response222} from "../types";

@Injectable({
  providedIn: 'root'
})
export class PontomaisService {

  constructor() {
  }

  request(): Response222 {
  }

  hasCredentials(): boolean {
    return true;
  }
}
