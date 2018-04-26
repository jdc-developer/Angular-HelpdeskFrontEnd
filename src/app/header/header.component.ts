import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public auth: AuthService;

  constructor(private router: Router) {
    this.auth = AuthService.getInstance();
    this.auth.user = new User(null, '', '', '');
  }

  ngOnInit() {
  }

  signOut() {
    this.auth.token = null;
    this.auth.user = null;
    this.router.navigate(['/login']);
  }

}
