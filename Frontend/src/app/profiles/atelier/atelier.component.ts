import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-atelier',
  templateUrl: './atelier.component.html',
  styleUrls: ['./atelier.component.scss']
})
export class AtelierComponent implements OnInit {

  constructor(private storageService: StorageService, private authService: AuthService, private router: Router) {
  
  }

  ngOnInit(): void {
    
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        
        const role = this.storageService.decrypt(this.storageService.getUser().role);
        this.storageService.clean();
        document.getElementById("ModalClose")?.click();
        if (role == "client") {
          this.router.navigateByUrl("/login-client");
        }
        if (role == "finance") {
          this.router.navigateByUrl("/login-finance");
        }
        if (role == "atelier") {
          this.router.navigateByUrl("/login-atelier");
        }
      },
      error: err => {
        
      }
    });
  }

  scrollToTop(): void {
    // scroll to the top of the body
    document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start'
    });
  }
}
