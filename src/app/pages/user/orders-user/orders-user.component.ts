import { Component } from '@angular/core';
import { OrdersAdminComponent } from '../../admin/orders-admin/orders-admin.component';

@Component({
  selector: 'app-orders-user',
  templateUrl: './orders-user.component.html',
  styleUrls: ['./orders-user.component.scss']
})
export class OrdersUserComponent extends OrdersAdminComponent {
  override getDetail(orderId: string) {
    this.router.navigate(['user/orders/pending-orders', orderId]);
  }
}
