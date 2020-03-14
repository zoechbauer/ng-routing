import { Injectable } from '@angular/core';
import { resolve } from 'dns';

@Injectable()
export class AuthService {
  loggedIn = false;

  isAuthenticated() {
    const promise = new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });
    return promise;
  }

  login() {
    this.loggedIn = true;
  }

  Logout() {
    this.loggedIn = false;
  }
}
