import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() cols: any[];
  @Input() ArrModel: any[];
  @Output() Action: any = new EventEmitter();

  constructor(private confirmationService: ConfirmationService, private translate: TranslateService) { };

  RemoveAction(e: any) {
    this.confirmationService.confirm({
      target: e.event.target,
      message: this.getConfirmationMessageWithLang(this.translate.currentLang),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.Action.emit(e)
      },
      reject: () => { }
    });
  }
  getConfirmationMessageWithLang(lang: any) {
    switch (lang) {
      case 'en-Us': return 'Are you sure?';
      case 'ka-Geo': return 'დარწმუნებული ხარ?';
      case 'ru-Ru': return 'Вы уверены?';
      default: return 'Are you sure?';
    }
  }
}
