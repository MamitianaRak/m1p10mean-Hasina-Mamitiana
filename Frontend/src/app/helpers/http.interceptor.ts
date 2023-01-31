import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage/storage.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private storage:StorageService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storage.getJWT();
    if(token){
      req = req.clone({
        setHeaders : {Authorization : token},
        withCredentials: true,
      });
    }


    return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];