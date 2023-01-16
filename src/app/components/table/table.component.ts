import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() cols: any[];
  @Input() ArrModel: any[];
  @Output() Action: any = new EventEmitter();
  showPasswords: boolean = false;
  constructor(private confirmationService: ConfirmationService) {

  };

  RemoveAction(e: any) {
    this.confirmationService.confirm({
      target: e.event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.Action.emit(e)
      },
      reject: () => { }
    });
  }

}
