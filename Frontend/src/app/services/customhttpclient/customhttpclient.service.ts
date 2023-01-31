import { Injectable } from '@angular/core';
import { HttpClient,HttpBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomhttpclientService {

  customHttpClient : HttpClient;
  constructor(private backend:HttpBackend) { this.customHttpClient = new HttpClient(backend);}
}
