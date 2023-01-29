import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Composant } from 'src/app/models/composant';
import { Voiture } from 'src/app/models/voiture';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { VoitureService } from 'src/app/services/voiture/voiture.service';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.scss']
})
export class DepotComponent implements OnInit {
  voituresNonDepot!: Voiture[];
  listeSingnalement: any[] = [];
  immatriculation: String = "";
  errorMessage = '';
  message = '';
  ajoutErreur = false;
  depotValider = false;

  options: string[] = [];
  filteredOptions: string[] = [];
  input$ = new Subject<string>();
  inputValue!: string;
  status: number = 0;

  constructor(private storageService: StorageService, private voitureService: VoitureService) { }

  ngOnInit(): void {
    this.voitureService.getVoitureNoDepot(this.storageService.getUser().email).subscribe({
      next: (data: Voiture[]) => {
        this.voituresNonDepot = data;
        
      }
    });

    this.voitureService.getComposant().subscribe({
      next: (data: Composant[]) => {
        for (let i = 0; i < data.length; i++) {
          this.options.push(data[i].nom);
        }
      }
    })
    this.input$.subscribe(val => {
      this.filteredOptions = this.options.filter(option => option.includes(val));
    });
  }

  ajoutSignalement(): void {
    this.listeSingnalement.push(this.inputValue);
    
  }

  depotVoiture(): void {
    if (this.immatriculation != "") {
      this.voitureService.depotVoiture(this.immatriculation, this.listeSingnalement).subscribe({
        next: data => {
          
          this.message = "Votre voiture a été déposé";
          this.listeSingnalement = [];
          for (let i = 0; i < this.voituresNonDepot.length; i++) {
            if (this.voituresNonDepot[i].immatriculation == this.immatriculation) {
              this.voituresNonDepot.splice(i, 1);
            }
          }
        },
        error: err => {
          this.ajoutErreur = true;
          this.errorMessage = "Il y a une erreur de déposition";
        }
      })
    } else {
      this.errorMessage = "Entrer votre plaque d'immatriculation!";
    }
  }

  onInputChange() {
    this.input$.next(this.inputValue);
  }

  selectOption(option: string) {
    this.inputValue = option;
  }

  majuscule() {
    this.inputValue = this.inputValue.charAt(0).toUpperCase() + this.inputValue.slice(1);
  }

  checkDouble(value: String): number {
    let retour = 0;
    for (let i = 0; i < this.listeSingnalement.length; i++) {
      if (this.listeSingnalement[i] == value) {
        retour++;
      }
    }
    return retour;
  }

}
