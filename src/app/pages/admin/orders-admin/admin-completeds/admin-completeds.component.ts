import { Component, OnInit } from '@angular/core';
import { OrdersAdminComponent } from '../orders-admin.component';
import { OrderResponse } from '../../../../models/OrderResponse.model';
import { ChangeResponseForOrders } from '../../../../Helpers/ChangeResponseForOrders';

@Component({
  selector: 'app-admin-completeds',
  templateUrl: './admin-completeds.component.html',
  styleUrls: ['./admin-completeds.component.scss']
})
export class AdminCompletedsComponent extends OrdersAdminComponent implements OnInit {
  CompletedOrders: OrderResponse[] = [];
  override ngOnInit(): void {
    this.setCols();
    this.getAllCompletedOrders()
  }
  getAllCompletedOrders() {
    this.service.GetAllCompletedOrders().subscribe(resp => {
      this.CompletedOrders = ChangeResponseForOrders.ChangeResponseForOrders(resp.data);
    })
  }
  override getDetail(orderId: any){
    this.router.navigate(['admin/orders/completed-orders', orderId]);
  }
}
