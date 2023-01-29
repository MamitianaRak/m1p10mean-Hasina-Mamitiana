import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Voiture } from 'src/app/models/voiture';
import { StorageService } from 'src/app/services/storage/storage.service';
import { VoitureService } from 'src/app/services/voiture/voiture.service';
@Component({
  selector: 'app-liste-voiture',
  templateUrl: './liste-voiture.component.html',
  styleUrls: ['./liste-voiture.component.scss']
})
export class ListeVoitureComponent implements OnInit, OnDestroy {

  listeVoiture: Voiture[] = [];
  validation?: number;
  voiture!: Voiture;
  subscription!: Subscription;
  listeComposant?: any[];
  prixTotal: number = 0;
  listeSignalement!: any[];
  messageErreur!: String;
  messageDepot!: String;
  messageRecuperation!: String;

  
  loading: boolean = true;

  constructor(private voitureService: VoitureService, private storageService: StorageService) { }
  ngOnInit(): void {
    
    this.voitureService.getListeVoiture(this.storageService.getUser().email).subscribe({
      next: (data: Voiture[]) => {
        if (data) {
          this.loading = false;
          this.listeVoiture = data;
          
        }
      }
    });
  }

  attente(immatriculation: String): void {
    this.validation = 1;
    for (let i = 0; i < this.listeVoiture.length; i++) {
      if (this.listeVoiture[i].immatriculation == immatriculation) {
        this.voiture = this.listeVoiture[i];
      }
    }

    this.listeSignalement = this.voiture.depots[this.voiture.depots.length - 1].signalements;
    this.listeComposant = this.voiture.reparation[this.voiture.reparation.length - 1].composants;
    for (let i = 0; i < this.listeComposant.length; i++) {
      for (let j = 0; j < this.listeComposant[i].pieces.length; j++) {
        this.prixTotal += this.listeComposant[i].pieces[j].prix;
      }
    }
    this.prixTotal = this.voiture.reparation[this.voiture.reparation.length - 1].prixMo + this.prixTotal;
  }

  reparation(immatriculation: String): void {
    this.validation = 2;
    for (let i = 0; i < this.listeVoiture.length; i++) {
      if (this.listeVoiture[i].immatriculation == immatriculation) {
        this.voiture = this.listeVoiture[i];
      }
    }
  }





  disabled(nom: String): Number {
    let compte = 0;
    if (this.listeSignalement.length == 0) return compte + 1;
    for (let i = 0; i < this.listeSignalement.length; i++) {
      if (this.listeSignalement[i] == nom) {
        compte++;
      }
    }
    return compte;
  }

  deleteComposant(nom: String): void {
    this.voitureService.deleteComposant(this.voiture.immatriculation, nom).subscribe({
      next: (data: Voiture) => {
      }
    });
    for (let i = 0; i < this.voiture.reparation[this.voiture.reparation.length - 1].composants.length; i++) {
      if (this.voiture.reparation[this.voiture.reparation.length - 1].composants[i].nom == nom) {
        for (let j = 0; j < this.voiture.reparation[this.voiture.reparation.length - 1].composants[i].pieces.length; j++) {
          this.prixTotal -= this.voiture.reparation[this.voiture.reparation.length - 1].composants[i].pieces[j].prix;
        }
        this.voiture.reparation[this.voiture.reparation.length - 1].composants.splice(i, 1);
      }
    }
  }
  valider(): void {
    this.voitureService.validationAttente(this.voiture.immatriculation).subscribe({
      next: (data: Voiture) => {
      }
    });
    for (let i = 0; i < this.listeVoiture.length; i++) {
      if (this.listeVoiture[i].immatriculation == this.voiture.immatriculation) {
        this.listeVoiture[i].depots[this.listeVoiture[i].depots.length - 1].validation = 2;
      }
    }
    this.validation = -1;
  }

  listePieces(composant: String): String {
    let retour = "";
    for (let i = 0; i < this.voiture.reparation[this.voiture.reparation.length - 1].composants.length; i++) {
      if (composant == this.voiture.reparation[this.voiture.reparation.length - 1].composants[i].nom) {
        for (let j = 0; j < this.voiture.reparation[this.voiture.reparation.length - 1].composants[i].pieces.length; j++) {
          retour += this.voiture.reparation[this.voiture.reparation.length - 1].composants[i].pieces[j].nom + "\n ";
        }
      }
    }
    return retour;
  }

  dateDebut(titre: Date): String {
    let retour = "";
    if (titre != null) {
      retour = titre.toString().substring(10, 0);
    } else {
      retour = "Pas commencer";
    }
    return retour;
  }

  dateFin(titre: Date): String {
    let retour = "";
    if (titre != null) {
      retour = titre.toString().substring(10, 0);
    } else {
      retour = "Pas terminer";
    }
    return retour;
  }

  signalement(immatriculation: String): String {
    let retour = "";
    for (let i = 0; i < this.listeVoiture.length; i++) {
      if (immatriculation == this.listeVoiture[i].immatriculation) {
        for (let j = 0; j < this.listeVoiture[i].depots[this.listeVoiture[i].depots.length - 1].signalements.length; j++) {
          retour += this.listeVoiture[i].depots[this.listeVoiture[i].depots.length - 1].signalements[j] + "\n ";
        }
      }
    }
    if (retour == "") {
      retour = "-";
    } else {
      retour = retour.slice(0, -2);
    }
    return retour;
  }

  etatReparation(immatriculation: String): String {
    let retour = "";
    for (let i = 0; i < this.listeVoiture.length; i++) {
      if (immatriculation == this.listeVoiture[i].immatriculation) {
        if (this.listeVoiture[i].reparation[this.listeVoiture[i].reparation.length - 1].avancement == 100) {
          retour = "Reparation terminer";
        } else {
          retour = "Reparation en cours";
        }
      }
    }
    return retour;
  }
  depots(): void {
    this.messageDepot = "Votre voiture est en attente de diagnostique";
    this.validation = 0;
  }

  changeValidation(): void {
    this.validation = -2;
  }
  recuperation(immatriculation: String): void {
    this.validation = 3;
    for (let i = 0; i < this.listeVoiture.length; i++) {
      if (this.listeVoiture[i].immatriculation == immatriculation) {
        this.voiture = this.listeVoiture[i];
      }
    }
  }

  recuperationValide(): void {
    this.changeValidation();
    this.voitureService.recuperation(this.voiture.immatriculation).subscribe({
      next: (data: Voiture) => { }
    });
    for (let i = 0; i < this.listeVoiture.length; i++) {
      if (this.listeVoiture[i].immatriculation == this.voiture.immatriculation) {
        this.listeVoiture.splice(i, 1);
      }
    }
    this.messageRecuperation = "Vous pouviez à présent récuperer votre voiture, merci de votre confiance.";
  }
  ngOnDestroy(): void {

  }
}

