import { Component, EventEmitter, Output } from '@angular/core';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent extends TableComponent{
  @Output() RowQtyUpdated:any = new EventEmitter();
  showInput:boolean = false;
  updateRowQty(e:any){
    e.showInput = false;
    this.RowQtyUpdated.emit(e)
  }
}
