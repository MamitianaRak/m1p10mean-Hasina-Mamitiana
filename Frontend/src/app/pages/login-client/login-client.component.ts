import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.scss']
})
export class LoginClientComponent {

  user: any = {
    email: "steeveblues@gmail.com",
    password: "azerty"
  };
  errorMessage = '';
  private role = "client";
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
          this.router.navigateByUrl("/client");
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
