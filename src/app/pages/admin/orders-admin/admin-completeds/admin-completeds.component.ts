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
    this.subscription = this.translate.onLangChange.subscribe((lang) => {
      this.getAllCompletedOrders();
    });
  }
  getAllCompletedOrders() {
    this.service.GetAllCompletedOrders().subscribe(resp => {
      this.CompletedOrders = ChangeResponseForOrders.ChangeResponseForOrders(resp.data, this.translate.currentLang);
    })
  }
  override getDetail(orderId: any){
    this.router.navigate(['admin/orders/completed-orders', orderId]);
  }

  getExcel(){
    this.service.ConvertOrdersToExcel(this.CompletedOrders).subscribe((blob: Blob) => {
      const file1 = new Blob([blob], { type: '.xlsx' });
      const fileURL = URL.createObjectURL(file1);
      var a = document.createElement('a');
      a.href = fileURL;
      a.target = '_blank';
      a.download = 'completeds.xlsx';
      document.body.appendChild(a);
      a.click();
    });
  }
}
