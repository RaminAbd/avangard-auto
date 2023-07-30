import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { OrderResponse } from '../../../../models/OrderResponse.model';
import { ChangeResponseForOrders } from '../../../../Helpers/ChangeResponseForOrders';
import { OrdersAdminComponent } from '../orders-admin.component';

@Component({
  selector: 'app-admin-pendings',
  templateUrl: './admin-pendings.component.html',
  styleUrls: ['./admin-pendings.component.scss']
})
export class AdminPendingsComponent extends OrdersAdminComponent implements OnInit {
  PendindOrders: OrderResponse[] = [];
  override ngOnInit(): void {
    this.setCols();
    this.getAllPendingOrders();
    this.subscription = this.translate.onLangChange.subscribe((lang) => {
      this.getAllPendingOrders();
    });
  }
  getAllPendingOrders() {
    this.service.GetAllPendingOrders().subscribe(resp => {
      this.PendindOrders = ChangeResponseForOrders.ChangeResponseForOrders(resp.data, this.translate.currentLang);
    })
  }

  getExcel(){
    this.service.ConvertOrdersToExcel(this.PendindOrders).subscribe((blob: Blob) => {
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
