import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.scss']
})
export class OrdersAdminComponent implements OnInit {
  constructor(protected service:OrdersService, protected router:Router) { };
  cols:any[]=[]
  ngOnInit(): void {
    this.setCols()
  }
  setCols() {
    this.cols = [
      { field: 'orderCode', header: 'orderCode'},
      { field: 'createdAt', header: 'createdAt' },
      { field: 'amountOfItems', header: 'amountOfItems' },
      { field: 'totalPrice', header: 'totalPrice' },
      { field: 'status', header: 'status'},
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
}
