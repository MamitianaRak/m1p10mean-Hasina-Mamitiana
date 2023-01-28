import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-login-atelier',
  templateUrl: './login-atelier.component.html',
  styleUrls: ['./login-atelier.component.scss']
})
export class LoginAtelierComponent {
  user: any = {
    email: "atelier@gmail.com",
    password: "azerty"
  };
  errorMessage = '';
  private role = "atelier";
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
          this.router.navigateByUrl("/atelier");
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

