import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
      let forAdmin = route.data.forAdmin as string;
      var result: boolean = false;
      var token = localStorage.getItem('token') as string;
      if (!token) {
        this.router.navigate(['/login']);
        result = false;
      }
      else{
        var isAdmin =  localStorage.getItem('isAdmin') as string;
        if(forAdmin === isAdmin){
          result = true;
        }
        else{
          result = false;
          if(isAdmin==='true'){
            this.router.navigate(['/admin']);
          }
          else{
            this.router.navigate(['/user']);
          }
        }
      }
    return result;
  }

}
