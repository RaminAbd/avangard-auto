import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
@Injectable()
export class tokenInterceptor implements HttpInterceptor {
  token: string;
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = localStorage.getItem("token") as string;
    if (this.token) {
      const req1 = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.token)
      });
      return next.handle(req1);
    }
    else {
      return next.handle(req);
    }
  }
}
