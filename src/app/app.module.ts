import { DialogService } from './services/dialog-service';
import { AuthGuard } from './services/auth-guard';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TicketService } from './services/ticket.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserNewComponent } from './user-new/user-new.component';
import { UserListComponent } from './user-list/user-list.component';
import { TicketNewComponent } from './ticket-new/ticket-new.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { SummaryComponent } from './summary/summary.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    UserNewComponent,
    UserListComponent,
    TicketNewComponent,
    TicketListComponent,
    TicketDetailsComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'user/new', component: UserNewComponent, canActivate: [AuthGuard] },
      { path: 'user/new/:id', component: UserNewComponent, canActivate: [AuthGuard] },
      { path: 'user/list', component: UserListComponent, canActivate: [AuthGuard] },
      { path: 'ticket/new', component: TicketNewComponent, canActivate: [AuthGuard] },
      { path: 'ticket/new/:id', component: TicketNewComponent, canActivate: [AuthGuard] },
      { path: 'ticket/list', component: TicketListComponent, canActivate: [AuthGuard] },
      { path: 'ticket/details/:id', component: TicketDetailsComponent, canActivate: [AuthGuard] },
      { path: 'summary', component: SummaryComponent, canActivate: [AuthGuard] }
    ])
  ],
  providers: [
    UserService,
    AuthService,
    AuthGuard,
    DialogService,
    TicketService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
