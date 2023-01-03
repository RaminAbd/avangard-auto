import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() cols: any[];
  @Input() ArrModel: any[];
  @Output() Action:any = new EventEmitter();
  showPasswords: boolean = false;
}
