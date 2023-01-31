import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user';
import{ GlobalConstants } from '../../common/global.constants';
import { CustomhttpclientService } from '../customhttpclient/customhttpclient.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private custom:CustomhttpclientService) { }

  public login(user:any,role:any):Observable<User> {
    user.role=role;
    return this.custom.customHttpClient.post<User>(GlobalConstants.apiURL+"/signin",user);
  }

  logout(): Observable<any> {
    return this.custom.customHttpClient.post(GlobalConstants.apiURL+ '/signout', { });
  }

  verifyUser = (code:any) => {
    return this.custom.customHttpClient.get(GlobalConstants.apiURL+ "/confirm/" + code);
  }

  register(nom: string,prenom: string, email: string, password: string,role:string): Observable<any> {
    return this.custom.customHttpClient.post(GlobalConstants.apiURL + '/signup',{nom,prenom, email,password,role});
  }

}
