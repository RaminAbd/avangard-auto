import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersUserComponent } from '../orders-user.component';
import { OrderResponse } from '../../../../models/OrderResponse.model';
import { ChangeResponseForOrders } from '../../../../Helpers/ChangeResponseForOrders';

@Component({
  selector: 'app-user-pendings',
  templateUrl: './user-pendings.component.html',
  styleUrls: ['./user-pendings.component.scss']
})
export class UserPendingsComponent extends OrdersUserComponent implements OnInit, OnDestroy {

  PendindOrders: OrderResponse[] = [];
  override ngOnInit(): void {
    this.setCols();
    this.getAllUsersPendingOrders(localStorage.getItem('userId') as string)
    this.subscription = this.translate.onLangChange.subscribe((lang) => {
      this.getAllUsersPendingOrders(localStorage.getItem('userId') as string)
    });
  }
  getAllUsersPendingOrders(userId:string) {
    this.service.GetAllUsersPendingOrder(userId).subscribe(resp => {
      this.PendindOrders = ChangeResponseForOrders.ChangeResponseForOrders(resp.data, this.translate.currentLang);
    })
  }

}
