import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent extends TableComponent{
  @ViewChild('dt1', { static: true }) dt: any;
  @Output() RowQtyUpdated:any = new EventEmitter();
  @Input() set Search(event:any) {
    this.dt.filterGlobal(event, 'contains');
  }
  showInput:boolean = false;
  updateRowQty(e:any){
    e.showInput = false;
    this.RowQtyUpdated.emit(e)
  }
}
