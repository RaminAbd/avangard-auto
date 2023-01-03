import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { ChangeUserCredentialsRequest } from '../models/ChangeUserCredentialsRequest.model';
import { CreateUserRequest } from '../models/CreateUserRequest.model';
import { SigninRequest } from '../models/SignInRequest.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }
  ChangeUserCredentials(obj:ChangeUserCredentialsRequest){
    return this.post('Users/ChangeUserCredentials', obj);
  }
  CreateUser(obj:CreateUserRequest){
    return this.post('Users/CreateUser', obj);
  }
  GetUsers(){
    return this.get('Users/GetUsers', null, null);
  }
  SignIn(obj:SigninRequest){
    return this.post('Users/SignIn', obj);
  }
  Delete(userId:string){
    return this.delete('Users/Delete/', userId);
  }
}
