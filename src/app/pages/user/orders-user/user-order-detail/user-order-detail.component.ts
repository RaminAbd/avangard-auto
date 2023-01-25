import { Component } from '@angular/core';
import { OrderDetails } from '../../../../models/OrderDetails.model';
import { AdminOrderDetailComponent } from '../../../admin/orders-admin/admin-order-detail/admin-order-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../../../services/orders.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-user-order-detail',
  templateUrl: './user-order-detail.component.html',
  styleUrls: ['./user-order-detail.component.scss']
})
export class UserOrderDetailComponent extends AdminOrderDetailComponent {
  override setCols() {
    this.cols = [
      { field: 'productCode', header: 'productCode' },
      { field: 'name', header: 'name' },
      { field: 'qty', header: 'qty' },
      { field: 'price', header: 'price' },
      { field: 'status', header: 'status' },
    ];
  }

  rejectOrder(component:any) {
    component.service.RejectDeal(component.orderId).subscribe((resp:any) => {
      component.router.navigate(['user/orders', component.Type]);
    })
  }

  acceptOrder(component:any) {
    component.service.AcceptDeal(component.orderId).subscribe((resp:any) => {
      component.router.navigate(['user/orders', component.Type]);
    })
  }

}
