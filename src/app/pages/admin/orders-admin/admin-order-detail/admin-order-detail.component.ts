import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { OrderDetails } from '../../../../models/OrderDetails.model';
import { ChangeResponseForOrderDetails } from '../../../../Helpers/ChangeResponseForOrderDetails';
import { ConfirmationService } from 'primeng/api';
import { OrderDealRequest } from '../../../../models/OrderDealRequest.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-order-detail',
  templateUrl: './admin-order-detail.component.html',
  styleUrls: ['./admin-order-detail.component.scss']
})
export class AdminOrderDetailComponent implements OnInit, OnDestroy {
  orderId: string;
  Type:string;
  OrderDetail: OrderDetails = new OrderDetails();
  cols: any[] = [];
  protected subscription:any;
  constructor(
    protected route: ActivatedRoute,
    protected service: OrdersService,
    protected router: Router,
    protected translate: TranslateService,
    protected confirmationService: ConfirmationService
  ) {
    this.orderId = this.route.snapshot.paramMap.get('id') as string;
    this.Type = this.route.snapshot.paramMap.get('type') as string;
  };

  ngOnInit(): void {
    this.getOrderDetails(this.orderId);

    this.subscription = this.translate.onLangChange.subscribe((lang) => {
      this.getOrderDetails(this.orderId);
    });
  }

  getOrderDetails(orderId: string) {
    this.service.GetDetails({ OrderId: orderId, Lang: this.translate.currentLang }).subscribe(resp => {
      this.OrderDetail = ChangeResponseForOrderDetails.ChangeResponseForOrderDetails(resp.data, this.translate.currentLang);
      this.setCols();
    });
  }

  setCols() {
    this.cols = [
      { field: 'productCode', header: 'ProductID' },
      { field: 'name', header: 'ProductName' },
      { field: 'qty', header: 'Quantity' },
      { field: 'price', header: 'Price' },
      { field: 'status', header: 'Status' },
    ];
    if(this.OrderDetail.statusCode === 2 || this.OrderDetail.statusCode === 1){
      this.cols[4] = { field: 'select', header: 'Action', width: '150px' };
    }
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
      message: this.getConfirmationMessageWithLang(this.translate.currentLang),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        callBack(component);
      },
      reject: () => { }
    });
  }
  getConfirmationMessageWithLang(lang: any) {
    switch (lang) {
      case 'en-Us': return 'Are you sure?';
      case 'ka-Geo': return 'დარწმუნებული ხარ?';
      case 'ru-Ru': return 'Вы уверены?';
      default: return 'Are you sure?';
    }
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
  RejectDeal(component:any){
    console.log(component);
    component.service.RejectDeal(component.orderId).subscribe((resp:any)=>{
      component.router.navigate(['admin/orders', component.Type]);
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
