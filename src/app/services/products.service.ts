import { Injectable } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseCrudService {

  constructor(http: HttpClient) {
    super(http);
  }
  Filter(obj: any) {
    return this.get('Products/Filter/', null, obj);
  }
  UpdateProductQty(obj: any) {
    return this.post('Products/UpdateProductQty', obj);
  }
  UpdateProductPrice(obj: any) {
    return this.post('Products/UpdateProductPrice', obj);
  }
  GetProductDetails(obj: any) {
    return this.get('Products/GetProductDetails/', null, obj);
  }
  Correlate(obj: any) {
    return this.post('Products/Correlate', obj);
  }
  ConvertToExcel(lang: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'xlsx');
    return this.http.get(this.BaseUrl + `Products/ConvertToExcel/${lang}`, { headers: headers, responseType: 'blob' });

  }
}
