import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersUserComponent } from '../orders-user.component';
import { OrderResponse } from '../../../../models/OrderResponse.model';
import { ChangeResponseForOrders } from '../../../../Helpers/ChangeResponseForOrders';

@Component({
  selector: 'app-user-completeds',
  templateUrl: './user-completeds.component.html',
  styleUrls: ['./user-completeds.component.scss']
})
export class UserCompletedsComponent extends OrdersUserComponent implements OnInit, OnDestroy {
  CompletedOrders: OrderResponse[] = [];
  override ngOnInit(): void {
    this.setCols();
    this.getAllUsersCompletedOrders(localStorage.getItem('userId') as string)
    this.subscription = this.translate.onLangChange.subscribe((lang) => {
      this.getAllUsersCompletedOrders(localStorage.getItem('userId') as string);
    });
  }
  getAllUsersCompletedOrders(userId: string) {
    this.service.GetAllUsersCompletedOrder(userId).subscribe(resp => {
      this.CompletedOrders = ChangeResponseForOrders.ChangeResponseForOrders(resp.data, this.translate.currentLang);
    })
  }
  override getDetail(orderId: any) {
    this.router.navigate(['user/orders/completed-orders', orderId]);
  }

}
