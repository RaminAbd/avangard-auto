import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.scss']
})
export class OrdersAdminComponent implements OnInit, OnDestroy {
  protected subscription:any;
  constructor(
    protected service:OrdersService,
    protected router:Router,
    protected translate:TranslateService
    ) { };
  cols:any[]=[]
  ngOnInit(): void {
    this.setCols();
    this.subscription = this.translate.onLangChange.subscribe((lang) => {});
  }
  setCols() {
    this.cols = [
      { field: 'orderCode', header: 'ProductID'},
      { field: 'createdAt', header: 'Date' },
      { field: 'amountOfItems', header: 'AmountOfItems' },
      { field: 'totalPrice', header: 'TotalPrice' },
      { field: 'status', header: 'Status'},
      { field: 'detView', header: 'Action', width: '150px' },
    ];
  }
  Action(e:any){
    if(e.type === 'detail'){
      this.getDetail(e.data.id);
    }
  }
  getDetail(orderId:string){
    this.router.navigate(['admin/orders/pending-orders', orderId]);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
