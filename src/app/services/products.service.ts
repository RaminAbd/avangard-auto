import { Injectable } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseCrudService {

  constructor(http:HttpClient) {
    super(http);
  }
  Filter(obj:any){
    return this.get('Products/Filter/',null, obj);
  }
  UpdateProductQty(obj:any){
    return this.post('Products/UpdateProductQty', obj);
  }
  GetProductDetails(obj:any){
    return this.get('Products/GetProductDetails/',null, obj);
  }
  Correlate(obj:any){
    return this.post('Products/Correlate', obj);
  }
}
