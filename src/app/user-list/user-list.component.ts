import { ResponseApi } from './../models/response-api';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DialogService } from '../services/dialog-service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  page = 0;
  count = 10;
  pages: Array<number>;
  auth: AuthService;
  message: {};
  classCss: {};
  listUser = [];

  constructor(
    private dialogService: DialogService,
    private userService: UserService,
    private router: Router
  ) {
    this.auth = AuthService.getInstance();
  }

  ngOnInit() {
    this.findAll(this.page, this.count);
  }

  findAll(page: number, count: number) {
    this.userService.findAll(page, count).subscribe((response: ResponseApi) => {
      this.listUser = response['data']['content'];
      this.pages = new Array(response['data']['totalPages']);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  edit(id: number) {
    this.router.navigate(['/user/new', id]);
  }

  delete(id: number) {
    this.dialogService.confirm('Tem certeza que deseja deletar este usuário?')
    .then((canDelete: boolean) => {
      if (canDelete) {
        this.message = {};
        this.userService.delete(id).subscribe((response: ResponseApi) => {
          this.showMessage({
            type: 'success',
            text: 'Usuário excluído com sucesso'
          });
          this.findAll(this.page, this.count);
        }, err => {
          this.showMessage({
            type: 'error',
            text: err['error']['errors'][0]
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
