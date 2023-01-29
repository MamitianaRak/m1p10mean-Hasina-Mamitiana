import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { VoitureService } from 'src/app/services/voiture/voiture.service';

@Component({
  selector: 'app-ajout-voiture',
  templateUrl: './ajout-voiture.component.html',
  styleUrls: ['./ajout-voiture.component.scss']
})
export class AjoutVoitureComponent implements OnInit {

  immatriculation?: String;
  marque?: String;
  errorMessage = '';
  message = '';
  ajoutErreur = false;
  constructor(private storageService: StorageService, private voitureService: VoitureService, private router: Router) { }
  ngOnInit(): void {
    console.log(this.storageService.getUser().nom);
  }

  onSubmit(): void {
    if (this.immatriculation != null && this.marque != null) {
      this.voitureService.creationVoiture(this.immatriculation, this.marque, this.storageService.getUser().nom, this.storageService.getUser().prenom, this.storageService.getUser().email).subscribe({
        next: data => {
          
          if (data.immatriculation == "0") {
            this.errorMessage = "L'immatriculation de la voiture existe dans la base de données";
          } else {
            this.ajoutErreur = false;
            this.immatriculation = "";
            this.marque = "";
            this.message = "La voiture a été enregistrer!";
          }

        }
      });
    }
  }
}
