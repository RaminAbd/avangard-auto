import { Injectable } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModelsService extends BaseCrudService{

  constructor(http:HttpClient) {
    super(http);
  }
  GetModelsInManufactuer(manufacturerId:string){
    return this.get('Models/GetModelsInManufactuer/',manufacturerId, null);
  }
  GetModelsInType(typeId:string){
    return this.get('Models/GetModelsInType/',typeId, null);
  }
}
