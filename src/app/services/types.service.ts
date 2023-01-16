import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypesService extends BaseService {

  constructor(http:HttpClient) { super(http); }

  AddTypeToManufacturer(obj:any){
    return this.post('Types/AddTypeToManufacturer', obj);
  }
  CreateType(obj:any){
    return this.post('Types/CreateType', obj);
  }
  DeleteType(id:string){
    return this.delete('Types/DeleteType/', id);
  }
  GetAll(lang:string){
    return this.get('Types/GetAll/', lang, null);
  }
  GetAllTypesInManufacturer(obj:any){
    return this.get('Types/GetAllTypesInManufacturer', null ,obj);
  }
  GetForm(){
    return this.get('Types/GetForm', null, null);
  }
  GetType(id:string){
    return this.get('Types/GetType/', id, null);
  }
  RemoveTypeFromManufacturer(obj:any){
    return this.post('Types/RemoveTypeFromManufacturer', obj);
  }
  UpdateType(obj:any){
    return this.post('Types/UpdateType', obj);
  }
}
