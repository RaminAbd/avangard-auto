import { Component, OnInit } from '@angular/core';
import { OrderDetails } from '../../../../models/OrderDetails.model';
import { AdminOrderDetailComponent } from '../../../admin/orders-admin/admin-order-detail/admin-order-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../../../services/orders.service';
import { ConfirmationService } from 'primeng/api';
import { ChangeResponseForOrderDetails } from '../../../../Helpers/ChangeResponseForOrderDetails';

@Component({
  selector: 'app-user-order-detail',
  templateUrl: './user-order-detail.component.html',
  styleUrls: ['./user-order-detail.component.scss']
})
export class UserOrderDetailComponent extends AdminOrderDetailComponent implements OnInit {
  override ngOnInit(): void {
    this.getOrderDetails(this.orderId);
    this.setCols();
    this.subscription = this.translate.onLangChange.subscribe((lang) => {
      this.getOrderDetails(this.orderId);
    });
  }
  override setCols() {
    this.cols = [
      { field: 'productCode', header: 'ProductID' },
      { field: 'name', header: 'Name' },
      { field: 'qty', header: 'AmountOfItems' },
      { field: 'price', header: 'Price' },
      { field: 'status', header: 'Status' },
    ];
  }
  override getOrderDetails(orderId: string) {
    this.service.GetDetails({ OrderId: orderId, Lang: this.translate.currentLang }).subscribe(resp => {
      this.OrderDetail = ChangeResponseForOrderDetails.ChangeResponseForOrderDetails(resp.data, this.translate.currentLang);
    });
  }
  rejectOrder(component: any) {
    component.service.RejectDeal(component.orderId).subscribe((resp: any) => {
      component.router.navigate(['user/orders', component.Type]);
    })
  }

  acceptOrder(component: any) {
    component.service.AcceptDeal(component.orderId).subscribe((resp: any) => {
      component.router.navigate(['user/orders', component.Type]);
    })
  }

}
