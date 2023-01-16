import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public translate: TranslateService,) {
    this.translate.addLangs(['ru-Ru', 'ka-Geo', 'en-Us']);
    const langExists: boolean = !!localStorage.getItem('systemLanguage');

    if (!langExists) {
      translate.setDefaultLang('ka-Geo');
      localStorage.setItem('systemLanguage', 'ka-Geo');
      translate.use('ka-Geo');
    } else {
      const value: string = localStorage.getItem('systemLanguage') as string;
      translate.setDefaultLang(value);
      translate.use(value);
    }
  };

}
