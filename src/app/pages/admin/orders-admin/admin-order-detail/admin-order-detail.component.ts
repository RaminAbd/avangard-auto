import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { OrderDetails } from '../../../../models/OrderDetails.model';
import { ChangeResponseForOrderDetails } from '../../../../Helpers/ChangeResponseForOrderDetails';
import { ConfirmationService } from 'primeng/api';
import { OrderDealRequest } from '../../../../models/OrderDealRequest.model';

@Component({
  selector: 'app-admin-order-detail',
  templateUrl: './admin-order-detail.component.html',
  styleUrls: ['./admin-order-detail.component.scss']
})
export class AdminOrderDetailComponent implements OnInit {
  orderId: string;
  Type:string;
  OrderDetail: OrderDetails = new OrderDetails();
  cols: any[] = [];

  constructor(
    protected route: ActivatedRoute,
    protected service: OrdersService,
    protected router: Router,
    protected confirmationService: ConfirmationService
  ) {
    this.orderId = this.route.snapshot.paramMap.get('id') as string;
    this.Type = this.route.snapshot.paramMap.get('type') as string;
  };

  ngOnInit(): void {
    this.getOrderDetails(this.orderId);
    this.setCols();
  }

  getOrderDetails(orderId: string) {
    this.service.GetDetails({ OrderId: orderId, Lang: 'ka-Geo' }).subscribe(resp => {
      this.OrderDetail = ChangeResponseForOrderDetails.ChangeResponseForOrderDetails(resp.data);
    });
  }

  setCols() {
    this.cols = [
      { field: 'productCode', header: 'productCode' },
      { field: 'name', header: 'name' },
      { field: 'qty', header: 'qty' },
      { field: 'price', header: 'price' },
      { field: 'select', header: 'Action', width: '150px' },
    ];
  }

  calculateSelectedProducts() {
    var selecteds = this.OrderDetail.items.filter(item => item.selected);
    var selectedCount: number = 0;
    selecteds.forEach(item => {
      selectedCount += item.price * item.qty;
    })
    this.OrderDetail.selectedTotalPrice = selectedCount;
  }

  AskForDeal(e: any, callBack:any, component:any) {
    this.confirmationService.confirm({
      target: e.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        callBack(component);
      },
      reject: () => { }
    });
  }

  MakeADeal(component:any) {
    var request: OrderDealRequest = new OrderDealRequest();
    request.orderId = component.OrderDetail.id;
    request.accepts = component.OrderDetail.items.filter((item:any) => item.selected).map((a:any) => a.id);
    request.rejects = component.OrderDetail.items.filter((item:any) => !item.selected).map((a:any) => a.id);
    component.service.MakeADeal(request).subscribe((resp:any) => {
      if(resp.succeeded){
        component.router.navigate(['admin/orders', component.Type]);
      }
      else{
        alert(resp.error);
      }
    })
  }
  CompleteOrder(component:any){
    component.service.CompleteOrder(component.orderId).subscribe((resp:any)=>{
      component.router.navigate(['admin/orders', component.Type]);
    })
  }
}
