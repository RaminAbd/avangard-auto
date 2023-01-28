import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  showLangs: boolean = false;
  constructor(private router: Router, private translate: TranslateService) {};
  LogOut() {
    localStorage.clear()
    this.router.navigate(['login']);
  }
  changeLanguage(value: string) {
    localStorage.setItem('systemLanguage', value);
    this.translate.use(value);
  }
}
