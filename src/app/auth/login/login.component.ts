import { Component } from '@angular/core';
import { SigninRequest } from '../../models/SignInRequest.model';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  passwordShow:boolean = false;
  signinRequest: SigninRequest = new SigninRequest();
  constructor(private service:UsersService, private router:Router) { }

  ngOnInit(): void {
  }
  Signin(){
    console.log(this.signinRequest);
    this.service.SignIn(this.signinRequest).subscribe(resp=>{
      if(resp.succeeded){
        localStorage.setItem('token', resp.data.accessToken);
        localStorage.setItem('userId', resp.data.id);
        localStorage.setItem('isAdmin', resp.data.isAdmin);
        if(resp.data.isAdmin){
          this.router.navigate(['admin'])
        }
        else{
          this.router.navigate(['user'])
        }
      }
      else{
        alert('Something went wrong. Please try again!')
      }
    })
  }
}
