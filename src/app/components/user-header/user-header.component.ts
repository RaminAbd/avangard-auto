import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {
  selectedLanguageForUI: string;
  showLangs: boolean = false;
  userInfo: any;
  constructor(public translate: TranslateService, private router: Router, private storage: LocalStorage) { };

  ngOnInit() {
    switch (this.translate.currentLang) {
      case 'ka-Geo':
        this.selectedLanguageForUI = 'KA'
        break;
      case 'ru-Ru':
        this.selectedLanguageForUI = 'RU'
        break;
      case 'en-Us':
        this.selectedLanguageForUI = 'EN'
        break;
      default:
        break;
    }
    this.storage.getItem('userInfo').subscribe((info) => {
      this.userInfo = info;
    });
  }
  changeLanguage(value: string, forUI: string) {
    localStorage.setItem('systemLanguage', value);
    this.translate.use(value);
    this.selectedLanguageForUI = forUI;
  }
  logout() {
    this.router.navigate(['login']);
  }
}
