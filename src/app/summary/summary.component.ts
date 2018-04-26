import { TicketService } from './../services/ticket.service';
import { Component, OnInit } from '@angular/core';
import { Summary } from '../models/summary';
import { ResponseApi } from '../models/response-api';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  summary: Summary = new Summary();
  message: {};
  classCss: {};

  constructor(
    private service: TicketService
  ) { }

  ngOnInit() {
    this.service.summary().subscribe((response: ResponseApi) => {
      this.summary = response.data;
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
