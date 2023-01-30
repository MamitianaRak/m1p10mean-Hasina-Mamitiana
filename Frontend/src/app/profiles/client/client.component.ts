import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, Event } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  private code = 'role123-secret-456';
  constructor(private storageService: StorageService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.storageService.getUser().nom == undefined) {
      this.router.navigateByUrl("/login-client");
    }
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
