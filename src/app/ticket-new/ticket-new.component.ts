import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Ticket } from '../models/ticket';
import { TicketService } from '../services/ticket.service';
import { AuthService } from './../services/auth.service';
import { ResponseApi } from '../models/response-api';

@Component({
  selector: 'app-ticket-new',
  templateUrl: './ticket-new.component.html',
  styleUrls: ['./ticket-new.component.css']
})
export class TicketNewComponent implements OnInit {

  @ViewChild('f')
  form: NgForm;

  ticket = new Ticket(null, null, '', '', '', '', null, null, '', null);
  auth: AuthService;
  message: {};
  classCss: {};

  constructor(
    private service: TicketService,
    private route: ActivatedRoute
  ) {
    this.auth = AuthService.getInstance();
  }

  ngOnInit() {
    const id: number = this.route.snapshot.params['id'];
    if (id !== undefined) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.service.findById(id).subscribe((response: ResponseApi) => {
      this.ticket = response.data;
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  register() {
    this.message = {};
    this.service.createOrUpdate(this.ticket).subscribe((response: ResponseApi) => {
      this.ticket = new Ticket(null, null, '', '', '', '', null, null, '', null);
      const ticketRet: Ticket = response.data;
      this.form.resetForm();
      this.showMessage({
        type: 'success',
        text: `Cadastrado ${ticketRet.title} com sucesso`
      });
     } , err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
    });
  }

  onFileChange(event): void {
    if (event.target.files[0].size > 2000000) {
      this.showMessage({
        type: 'error',
        text: 'Tamanho máximo de arquivo excedido'
      });
    } else {
      this.ticket.image = '';
      const reader = new FileReader();
      reader.onloadend = (e: Event) => {
        this.ticket.image = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
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

  getFormGroupClass(invalid: boolean, isDirty: boolean) {
    return {
      'form-group' : true,
      'has-error': invalid && isDirty,
      'has-success' : !invalid && isDirty
    };
  }

}
