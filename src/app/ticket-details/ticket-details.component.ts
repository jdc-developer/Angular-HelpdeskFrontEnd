import { ActivatedRoute } from '@angular/router';
import { TicketService } from './../services/ticket.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Ticket } from '../models/ticket';
import { ResponseApi } from '../models/response-api';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  ticket = new Ticket(null, null, '', '', '', '', '', null, null, null, '', null);
  auth: AuthService;
  message: {};
  classCss: {};

  constructor(
    private service: TicketService,
    private router: ActivatedRoute
  ) {
    this.auth = AuthService.getInstance();
   }

  ngOnInit() {
    const id = this.router.snapshot.params['id'];
    if (id !== undefined) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.service.findById(id).subscribe((response: ResponseApi) => {
      this.ticket = response.data;
      this.ticket.date = new Date(this.ticket.date).toISOString();
    }, err => {
      this.showMessage({
        type: 'error',
        text: err.error['message']
      });
    });
  }

  changeStatus(status: string): void {
    this.service.changeStatus(status, this.ticket).subscribe((response: ResponseApi) => {
      this.ticket = response.data;
      this.ticket.date = new Date(this.ticket.date).toISOString();
      this.showMessage({
        type: 'success',
        text: 'Status alterado com sucesso'
      });
    }, err => {
      this.showMessage({
        type: 'error',
        text: err.error['message']
      });
    });
  }

  private showMessage(message: { type: string, text: string }): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    };
    this.classCss['alert-' + type] = true;
  }

}
