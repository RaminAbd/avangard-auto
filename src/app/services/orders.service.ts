import { Injectable } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends BaseCrudService{

  constructor(http:HttpClient) { super(http); }
  AcceptDeal(orderId: string){
    return this.get('Orders/AcceptDeal/', orderId, null);
  }
  CompleteOrder(orderId: string){
    return this.get('Orders/CompleteOrder/', orderId, null);
  }
  CreateOrder(obj:any){
    return this.post('Orders/CreateOrder', obj);
  }
  GetAllCompletedOrders(){
    return this.get('Orders/GetAllCompletedOrders', null, null);
  }
  GetAllPendingOrders(){
    return this.get('Orders/GetAllPendingOrders', null, null);
  }
  GetAllUsersCompletedOrder(userId:any){
    return this.get('Orders/GetAllUsersCompletedOrder/', userId, null);
  }
  GetAllUsersPendingOrder(userId:any){
    return this.get('Orders/GetAllUsersPendingOrder/', userId, null);
  }
  GetDetails(obj:any){
    return this.get('Orders/GetDetails', null, obj)
  }
  MakeADeal(obj:any){
    return this.post('Orders/MakeADeal', obj);
  }
  RejectDeal(orderId:any){
    return this.get('Orders/RejectDeal/', orderId, null)
  }
  ConvertOrdersToExcel(arr:any){
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'xlsx');
    return this.http.post(this.BaseUrl + 'Orders/ConvertOrdersToExcel', arr, { headers: headers, responseType: 'blob' });
  }

  ConvertDetailsToExcel(req:any){
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'xlsx');
    return this.http.get(this.BaseUrl +`Orders/ConvertDetailsToExcel/`, {
      params:req,
      headers: headers,
      responseType: 'blob',
    });
  }
}
