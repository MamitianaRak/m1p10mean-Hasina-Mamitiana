import { Injectable } from '@angular/core';
import  * as CryptoJS  from "crypto-js";

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private code = 'role123-secret-456';
  
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  decryptRole(){
    const user = window.sessionStorage.getItem(USER_KEY);
    const role = JSON.parse(user!).role;
    const bytes  =  CryptoJS.AES.decrypt(role,this.code);
    return  bytes.toString(CryptoJS.enc.Utf8);
  }
 

  decrypt(data:any){
    const bytes  =  CryptoJS.AES.decrypt(data,this.code);
    return  bytes.toString(CryptoJS.enc.Utf8);
  }

  
}
