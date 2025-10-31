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
  @Output() RowPriceUpdated:any = new EventEmitter();
  @Output() RowInnerCodeUpdated:any = new EventEmitter();
  @Output() RowCodeUpdated:any = new EventEmitter();
  @Output() RowNameUpdated:any = new EventEmitter();
  @Input() loading:boolean = false;
  @Input() set Search(event:any) {
    this.dt.filterGlobal(event, 'contains');
  }

  updateRowQty(e:any){
    e.showInput = false;
    this.RowQtyUpdated.emit(e)
  }

  updateRowPrice(e:any){
    e.showPriceInput = false;
    this.RowPriceUpdated.emit(e)
  }


  updateRowInnerCode(e:any){
    e.showInnerCodeInput = false;
    this.RowInnerCodeUpdated.emit(e)
  }

  updateRowCode(e:any){
    e.showCodeInput = false;
    this.RowCodeUpdated.emit(e)
  }

  getNameChange(e: any) {
   this.RowNameUpdated.emit(e)
  }
}
