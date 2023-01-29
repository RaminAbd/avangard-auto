import { Component } from '@angular/core';
import { SigninRequest } from '../../models/SignInRequest.model';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { LangType } from 'src/app/Helpers/LangType.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  passwordShow: boolean = false;
  signinRequest: SigninRequest = new SigninRequest();
  constructor(
    private service: UsersService,
    private router: Router,
    private storage: LocalStorage,
    private messageService: MessageService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    localStorage.clear();
  }
  Signin() {
    this.service.SignIn(this.signinRequest).subscribe(resp => {
      if (resp.succeeded) {
        this.storage.setItem('userInfo', resp.data).subscribe(() => { });
        localStorage.setItem('token', resp.data.accessToken);
        localStorage.setItem('userId', resp.data.id);
        localStorage.setItem('isAdmin', resp.data.isAdmin);
        if (resp.data.isAdmin) {
          this.router.navigate(['admin'])
        }
        else {
          this.router.navigate(['user'])
        }
      }
      else {
        this.showError();
      }
    }, (error) => {
      this.showError();
    })
  }
  showError() {
    this.messageService.add({
      severity: 'error',
      summary: this.getLanguagedError().summary[this.translate.currentLang as keyof LangType],
      detail: this.getLanguagedError().detail[this.translate.currentLang as keyof LangType],
    });
  }
  getLanguagedError() {
    var obj = {
      summary: { 'ka-Geo': 'შეცდომა', 'en-Us': 'Error', 'ru-Ru': 'Ошибка' },
      detail: {
        'ka-Geo': 'მომხმარებლის სახელი ან პაროლი არასწორია',
        'en-Us': 'The username or password is incorrect',
        'ru-Ru': 'Имя пользователя или пароль неверны'
      },
    }
    return obj;
  }
}
