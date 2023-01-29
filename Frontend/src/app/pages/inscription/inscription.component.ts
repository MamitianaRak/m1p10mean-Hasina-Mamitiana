import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  
  form: any = {
    nom: null,
    prenom: null,
    email: null,
    password: null,
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  isnotLoading = true;

  private role = "client";

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this. isnotLoading = false;
    const { nom ,prenom , email, password } = this.form;

    this.authService.register(nom,prenom, email, password,this.role).subscribe({
      next: data => {
        this. isnotLoading = true;
        
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this. isnotLoading = true;
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

}
