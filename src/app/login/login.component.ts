import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { CurrentUser } from '../models/current-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User(null, '', '', '');
  auth: AuthService;
  message: string;

  constructor(private userService: UserService, private router: Router) {
    this.auth = AuthService.getInstance();
  }

  ngOnInit() {
  }

  login() {
    this.message = '';
    this.userService.login(this.user).subscribe((userAuth: CurrentUser) => {
      this.auth.token = userAuth.token;
      this.auth.user = userAuth.user;
      this.auth.user.profile = this.auth.user.profile.substring(5);
      this.auth.showTemplate.emit(true);
      this.router.navigate(['/']);
    }, err => {
      this.auth.token = null;
      this.auth.user = null;
      this.auth.showTemplate.emit(false);
      this.message =  'Erro';
    });
  }

  cancelLogin() {
    this.message = '';
    this.user = new User(null, '', '', '');
    window.location.reload();
  }

}
