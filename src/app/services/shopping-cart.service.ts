import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }
  GetShoppingCart(userId: string, lang:any) {
    var obj = {
      UserId: userId,
      Lang:lang
    }
    return this.get('ShoppingCarts/GetShoppingCart', null, obj);
  }
  UpdateShoppingCart(obj: any) {
    return this.post('ShoppingCarts/UpdateShoppingCart', obj);
  }
  RemoveFromCart(obj: any) {
    return this.post('ShoppingCarts/RemoveFromCart', obj);
  }
}
