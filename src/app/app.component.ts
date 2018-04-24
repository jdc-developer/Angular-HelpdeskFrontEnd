import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showTemplate = false;
  public auth: AuthService;

  constructor() {
    this.auth = AuthService.getInstance();
  }

  ngOnInit() {
    this.auth.showTemplate.subscribe(
      show => this.showTemplate = show
    );
  }

  showContentWrapper() {
    return {
      'content-wrapper': this.auth.isLogged()
    };
  }
}
