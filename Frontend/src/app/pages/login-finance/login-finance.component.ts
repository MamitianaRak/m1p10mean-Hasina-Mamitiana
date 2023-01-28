import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';
@Component({
  selector: 'app-login-finance',
  templateUrl: './login-finance.component.html',
  styleUrls: ['./login-finance.component.scss']
})
export class LoginFinanceComponent {
  user: any = {
    email: "jean@yahoo.com",
    password: "0000"
  };
  errorMessage = '';
  private role = "finance";
  isLoggedIn = false;
  isLoginFailed = false;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.user.email != "" && this.user.password != "") {
      this.isLoading = true;
      this.authService.login(this.user, this.role).subscribe({
        next: data => {
          this.storageService.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.isLoading = false;
          this.router.navigateByUrl("/finance");
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
          this.isLoading = false;
        }
      });
    }
  }
}
