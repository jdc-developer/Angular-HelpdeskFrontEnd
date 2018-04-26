import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ResponseApi } from '../models/response-api';
import { Ticket } from '../models/ticket';
import { AuthService } from './../services/auth.service';
import { DialogService } from './../services/dialog-service';
import { TicketService } from './../services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  assigned = false;
  page = 0;
  count = 10;
  pages: Array<number>;
  auth: AuthService;
  message: {};
  classCss: {};
  list = [];
  ticketFilter = new Ticket(null, null, '', '', '', '', '', null, null, null, '', null);

  constructor(
    private dialogService: DialogService,
    private ticketService: TicketService,
    private router: Router
  ) {
    this.auth = AuthService.getInstance();
  }

  ngOnInit() {
    this.findAll(this.page, this.count);
  }

  findAll(page: number, count: number) {
    this.ticketService.findAll(page, count).subscribe((response: ResponseApi) => {
      this.list = response['data']['content'];
      this.pages = new Array(response['data']['totalPages']);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err.error['message']
      });
    });
  }

  filter(): void {
    this.page = 0;
    this.count = 10;
    this.ticketService.findByParameters(this.page, this.count, this.assigned, this.ticketFilter)
    .subscribe((response: ResponseApi) => {
      this.ticketFilter.title = this.ticketFilter.title === 'uninformed' ? '' : this.ticketFilter.title;
      this.ticketFilter.number = this.ticketFilter.number === 0 ? null : this.ticketFilter.number;
      this.list = response['data']['content'];
      this.pages = new Array(response['data']['totalPages']);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err.error['message']
      });
    });
  }

  cleanFilter(): void {
    this.assigned = false;
    this.page = 0;
    this.count = 10;
    this.ticketFilter = new Ticket(null, null, '', '', '', '', '', null, null, null, '', null);
    this.findAll(this.page, this.count);
  }

  edit(id: number) {
    this.router.navigate(['/ticket/new', id]);
  }

  details(id: number) {
    this.router.navigate(['/ticket/details', id]);
  }

  delete(id: number) {
    this.dialogService.confirm('Tem certeza que deseja deletar este ticket?')
    .then((canDelete: boolean) => {
      if (canDelete) {
        this.message = {};
        this.ticketService.delete(id).subscribe((response: ResponseApi) => {
          this.showMessage({
            type: 'success',
            text: 'Ticket excluído com sucesso'
          });
          this.findAll(this.page, this.count);
        }, err => {
          this.showMessage({
            type: 'error',
            text: err.error['message']
          });
        });
      }
    });
  }

  setNextPage(event: any) {
    event.preventDefault();
    if (this.page + 1 < this.pages.length) {
      this.page++;
      this.findAll(this.page, this.count);
    }
  }

  setPrevPage(event: any) {
    event.preventDefault();
    if (this.page > 0) {
      this.page--;
      this.findAll(this.page, this.count);
    }
  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.findAll(this.page, this.count);
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
