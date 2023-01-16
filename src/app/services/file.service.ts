import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService extends BaseService{

  constructor( http: HttpClient ) { super(http); }

  UploadFile(file:any){
    return this.post('Files/UploadFile/', file)
  }
}
