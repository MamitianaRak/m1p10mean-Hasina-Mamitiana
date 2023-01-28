import { Component, OnInit } from '@angular/core';
import { Voiture } from 'src/app/models/voiture';
import { ReparationDetails } from 'src/app/models/reparation'
import { StorageService } from 'src/app/services/storage/storage.service';
import { VoitureService } from 'src/app/services/voiture/voiture.service';

@Component({
  selector: 'app-etat-paiement',
  templateUrl: './etat-paiement.component.html',
  styleUrls: ['./etat-paiement.component.scss']
})
export class EtatPaiementComponent implements OnInit {

  voiture!: Voiture;
  listeVoiture!: Voiture[];
  immatriculation!: String;
  debut!: Date;
  fin!: Date;
  etat: boolean = false;
  listeReparation: ReparationDetails[] = [];
  somme: number=0;

  constructor(public serviceStorage: StorageService, private voitureService: VoitureService) { }

  ngOnInit(): void {
    this.voitureService.getListeVoiture(this.serviceStorage.getUser().email).subscribe({
      next: (data: Voiture[]) => {
        this.listeVoiture = data;
      }
    });

  }

  recherche(): void {
    console.log(this.debut);
    if (this.immatriculation != "" && this.debut?.toString() != "" && this.fin?.toString() != "") {
      this.etat = true;
      for (let i = 0; i < this.listeVoiture.length; i++) {
        if (this.listeVoiture[i].immatriculation == this.immatriculation) this.voiture = this.listeVoiture[i];
      }
      for (let i = 0; i < this.voiture.reparation.length; i++) {
        if (this.voiture.reparation[i].bonSortie) {
          if ((new Date(this.voiture.reparation[i].datePayement!.toString().substring(10, 0)).getTime()) >= (new Date(this.debut.toString().substring(10, 0)).getTime()) && (new Date(this.voiture.reparation[i].datePayement!.toString().substring(10, 0)).getTime()) <= (new Date(this.fin.toString().substring(10, 0)).getTime())) {
            this.listeReparation.push(this.voiture.reparation[i]);
          }
        }
      }
      for (let i = 0; i < this.listeReparation.length; i++) {
        this.somme = this.listeReparation[i].prixTotal! + this.somme;
      }
    }
  }

}

