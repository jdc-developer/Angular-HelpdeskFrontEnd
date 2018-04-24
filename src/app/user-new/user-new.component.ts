import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user';
import { ActivatedRoute } from '@angular/router';
import { ResponseApi } from '../models/response-api';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  @ViewChild('form')
  form: NgForm;

  user = new User(null, '', '', '');
  auth: AuthService;
  message: {};
  classCss: {};

  constructor(
    private service: UserService,
    private route: ActivatedRoute) {
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
      this.user = response.data;
      this.user.password = '';
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errprs'][0]
      });
    });
  }

  register() {
    this.message = {};
    this.service.createOrUpdate(this.user).subscribe((response: ResponseApi) => {
      this.user = new User(null, '', '', '');
      const userRet: User = response.data;
      this.form.resetForm();
      this.showMessage({
        type: 'success',
        text: `Cadastrado ${userRet.email} com sucesso`
      });
     } , err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errprs'][0]
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

  getFormGroupClass(invalid: boolean, isDirty: boolean) {
    return {
      'form-group' : true,
      'has-error': invalid && isDirty,
      'has-success' : !invalid && isDirty
    };
  }

}
