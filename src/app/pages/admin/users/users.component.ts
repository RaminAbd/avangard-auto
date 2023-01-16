import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { UsersResponse } from '../../../models/UsersResponse.model';
import { CreateUserRequest } from 'src/app/models/CreateUserRequest.model';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  Users: UsersResponse[] = []
  cols: any[] = [];
  Request: CreateUserRequest = new CreateUserRequest();
  constructor(private service: UsersService, private confirmationService: ConfirmationService) {

  };
  ngOnInit(): void {
    this.getAll()
    this.setCols();
  }
  getAll() {
    this.service.GetUsers().subscribe(resp => {
      this.Users = resp.data;
    })
  }
  setCols() {
    this.cols = [
      { field: 'firstName', header: 'Name' },
      { field: 'lastName', header: 'Surname' },
      { field: 'country', header: 'Country' },
      { field: 'phoneNumber', header: 'Phone number' },
      { field: 'userName', header: 'Username' },
      { field: 'password', header: 'Password', width:'200px' },
      { field: 'remove', header: 'Action' },
    ];
  }
  Action(e: any) {
    if (e.type === 'remove') {
      this.service.Delete(e.data.id).subscribe(resp => {
        this.getAll()
      })
    }
  }
  CreateUser() {
    this.service.CreateUser(this.Request).subscribe(resp => {
      if (resp.succeeded) {
        this.getAll();
        this.Request = new CreateUserRequest();
      }
      else {
        alert(resp.error);
      }
    })
  }

}
