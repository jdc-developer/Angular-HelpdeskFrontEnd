import { Ticket } from './../models/ticket';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HELP_DESK_API } from './helpdesk.api';
import { tick } from '@angular/core/testing';

@Injectable()
export class TicketService {

  constructor(private http: HttpClient) { }

  createOrUpdate(ticket: Ticket) {
    if (ticket.id != null && ticket.id !== 0) {
      return this.http.put(`${HELP_DESK_API}/api/ticket`, ticket);
    } else {
      ticket.id = null;
      ticket.status = 'NEW';
      return this.http.post(`${HELP_DESK_API}/api/ticket`, ticket);
    }
  }

  findAll(page: number, count: number) {
    return this.http.get(`${HELP_DESK_API}/api/ticket/${page}/${count}`);
  }

  findById(id: number) {
    return this.http.get(`${HELP_DESK_API}/api/ticket/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${HELP_DESK_API}/api/ticket/${id}`);
  }

  findByParameters(page: number, count: number, assigned: boolean, t: Ticket) {
    t.number = t.number == null ? 0 : t.number;
    t.title = t.title === '' ? 'uninformed' : t.title;
    t.status = t.status === '' ? 'uninformed' : t.status;
    t.priority = t.priority === '' ? 'uninformed' : t.priority;

    return this.http.get(`${HELP_DESK_API}/api/ticket/${page}/${count}/${t.number}/${t.title}/${t.status}/${t.priority}/${assigned}`);
  }

  changeStatus(status: string, t: Ticket) {
    return this.http.put(`${HELP_DESK_API}/api/ticket/${t.id}/${status}`, t);
  }

  summary() {
    return this.http.get(`${HELP_DESK_API}/api/ticket/summary`);
  }
}
