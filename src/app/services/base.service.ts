import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  // protected BaseUrl = "https://parts-app-api.azurewebsites.net/api/";
  protected BaseUrl = "https://avangardapi-test.azurewebsites.net/api/";
  langObj:any;
  http: HttpClient;
  constructor(http: HttpClient){
    this.http = http;
  }
  get(url?:string, parameter?:any, paramsObj?:any){
    if(parameter!==null) {
     return this.http.get<any>(this.BaseUrl + url+ parameter)
    }
    else{
      return this.http.get<any>(this.BaseUrl + url, {params:paramsObj})
    }
  }
  post(url?:string, object?:any){
    return this.http.post<any>(this.BaseUrl + url, object);
  }
  delete(url?:string, parameter?:any){
    return this.http.delete<any>(this.BaseUrl + url + parameter)
  }
}
