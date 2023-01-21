import { Component } from '@angular/core';
import { OrderDetails } from '../../../../models/OrderDetails.model';
import { AdminOrderDetailComponent } from '../../../admin/orders-admin/admin-order-detail/admin-order-detail.component';

@Component({
  selector: 'app-user-order-detail',
  templateUrl: './user-order-detail.component.html',
  styleUrls: ['./user-order-detail.component.scss']
})
export class UserOrderDetailComponent extends AdminOrderDetailComponent {
 override setCols(){
  this.cols = [
    { field: 'productCode', header: 'productCode' },
    { field: 'name', header: 'name' },
    { field: 'qty', header: 'qty' },
    { field: 'price', header: 'price' },
    { field: 'status', header: 'status' },
  ];
 }
}
