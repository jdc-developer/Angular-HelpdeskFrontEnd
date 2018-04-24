import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../models/user';

@Injectable()
export class AuthService {

  public static auth: AuthService;
  user: User;
  token: string;
  showTemplate = new EventEmitter<boolean>();

  constructor() {
    return AuthService.auth = AuthService.auth || this;
  }

  public static getInstance() {
    if (this.auth == null) {
      this.auth = new AuthService();
    }
    return this.auth;
  }

  isLogged(): boolean {
    if (this.user == null) {
      return false;
    }
    return this.user.email !== '';
  }
}
