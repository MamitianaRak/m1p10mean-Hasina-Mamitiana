import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private service:AuthService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.service.verifyUser(this.route.snapshot.paramMap.get("confirmationCode")).subscribe({
      next: (data) => {
        
      },
      error: (err) => {console.log(err)},
    })
  }
}
