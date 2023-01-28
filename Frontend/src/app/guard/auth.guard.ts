import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {

  constructor(private storageService: StorageService, private router: Router,private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(route, url);
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.storageService.isLoggedIn()) {
      const userRole = this.storageService.decryptRole();
      if (route.data['role'] && route.data['role'] != userRole) {
        if(userRole == "atelier"){
          this.router.navigate(['/atelier/diagnostique']);

        }
        if(userRole == "finance"){
          this.router.navigate(['/finance/home']);

        }
        if(userRole== "client"){
          this.router.navigate(['/client/voiture']);
        }
        if(userRole == ""){
          if(route.data['role'] == "atelier"){
            this.authService.logout().subscribe({
              next: res => {
                this.storageService.clean();
                this.router.navigate(['/login-atelier']);
              },
              error: err => {
                console.log(err);
              }
            });
          }
          if(route.data['role'] == "finance"){
      
            this.authService.logout().subscribe({
              next: res => {
                this.storageService.clean();
                this.router.navigate(['/login-finance']);   
              },
              error: err => {
                console.log(err);
              }
            });
          }
          if(route.data['role'] == "client"){
      
            this.authService.logout().subscribe({
              next: res => {
                this.storageService.clean();
                this.router.navigate(['/login-client']);   
              },
              error: err => {
                console.log(err);
              }
            });
      
          }

        }
        return false;
      }
      return true;
    }

    if(route.data['role'] == "atelier"){
      this.authService.logout().subscribe({
        next: res => {
          this.storageService.clean();
          this.router.navigate(['/login-atelier']);
        },
        error: err => {
          console.log(err);
        }
      });
    }
    if(route.data['role'] == "finance"){

      this.authService.logout().subscribe({
        next: res => {
          this.storageService.clean();
          this.router.navigate(['/login-finance']);   
        },
        error: err => {
          console.log(err);
        }
      });
    }
    if(route.data['role'] == "client"){

      this.authService.logout().subscribe({
        next: res => {
          this.storageService.clean();
          this.router.navigate(['/login-client']);   
        },
        error: err => {
          console.log(err);
        }
      });

    }
    return false;
  }
}
