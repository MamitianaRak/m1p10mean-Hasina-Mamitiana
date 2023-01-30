import { Component, OnInit } from '@angular/core';
import { Composant } from 'src/app/models/composant';
import { Voiture } from 'src/app/models/voiture';
import { VoitureService } from 'src/app/services/voiture/voiture.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-diagnostique',
  templateUrl: './diagnostique.component.html',
  styleUrls: ['./diagnostique.component.scss']
})
export class DiagnostiqueComponent implements OnInit {

  listeVoiture: Voiture[] = [];
  listeComposant: Composant[] = [];
  immatriculation!: String;
  todo: string[] = [];
  listeComposantReparer: Composant[] = [];
  done: string[] = [];
  selectedValues = [];
  composantDiagnostique: Composant[] = [];
  prixPiece: number[][] = [];
  messageErreur?: String;
  messageSuccess?: String;
  loading: boolean = true;
  voiture?: Voiture;

  constructor(private voitureService: VoitureService) { }

  ngOnInit(): void {
    this.voitureService.getListeVoitureDepot().subscribe({
      next: (data: Voiture[]) => {
        if (data) {
          this.loading = false;
          for (let i = 0; i < data.length; i++) {
            if (data[i].depots[data[i].depots.length - 1].validation == 0) {
              this.listeVoiture.push(data[i]);
            }
          }
        }
      }
    });
    this.voitureService.getComposant().subscribe({
      next: (data: Composant[]) => {
        this.listeComposant = data;
        for (let i = 0; i < data.length; i++) {
          this.todo.push(data[i].nom);
        }
      }
    })
  }

  diagnostique(idVoiture: String): void {
    this.immatriculation = idVoiture;
  }

  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.getComposant(event.container.data[0]);
      this.messageErreur = "";
    }
  }

  getComposant(nom: string) {
    for (let i = 0; i < this.listeComposant.length; i++) {
      if (nom === this.listeComposant[i].nom) {
        this.listeComposantReparer.unshift(this.listeComposant[i]);
      };
    }
    for (let i = 0; i < this.listeComposantReparer.length; i++) {
      this.prixPiece[i] = new Array(this.listeComposant[i].pieces.length);
    }
  }

  deleteComposant(item: Composant) {
    for (let i = 0; i < this.listeComposantReparer.length; i++) {
      this.prixPiece[i] = new Array(this.listeComposant[i].pieces.length);
      if (this.listeComposantReparer[i].nom === item.nom) {
        this.todo.push(item.nom);
        this.listeComposantReparer.splice(i, 1);
      }
    }
    for (let i = 0; i < this.composantDiagnostique.length; i++) {
      if (this.composantDiagnostique[i].nom === item.nom) {
        this.composantDiagnostique.splice(i, 1);
      }
    }
  }

  getPiece(event: any, piece: any, composant: string, firstIndex: number, secondIndex: number) {
    let count = 0;
    let temp: Composant = {
      nom: composant,
      pieces: [{
        nom: piece,
        prix: this.prixPiece[firstIndex][secondIndex]
      }]
    };
    let pieceAdd: any = {
      nom: piece,
      prix: this.prixPiece[firstIndex][secondIndex]
    }
    if (event.target.checked) {
      for (let j = 0; j < this.composantDiagnostique.length; j++) {
        count++;
        if (this.composantDiagnostique[j].nom === composant) {
          this.composantDiagnostique[j].pieces.push(pieceAdd);
          count--;
        }
      }
      if (count == this.composantDiagnostique.length) this.composantDiagnostique.push(temp);
    }
    else {
      for (let i = 0; i < this.composantDiagnostique.length; i++) {
        if (this.composantDiagnostique[i].nom === composant) {
          if (this.composantDiagnostique[i].pieces.length > 0) {
            for (let j = 0; j < this.composantDiagnostique[i].pieces.length; j++) {
              if (this.composantDiagnostique[i].pieces[j].nom === pieceAdd.nom) {

                this.composantDiagnostique[i].pieces.splice(j, 1);
                if (this.composantDiagnostique[i].pieces == undefined) {
                  this.composantDiagnostique.splice(i, 1);
                }
              }
            }
          }
        }
      }
    }
  }

  valider(): void {
    if (this.composantDiagnostique.length == 0) {
      this.messageErreur = "Identifier le composant à réparer";
    } else {
      let count = 0;
      for (let i = 0; i < this.composantDiagnostique.length; i++) {
        for (let j = 0; j < this.composantDiagnostique[i].pieces.length; j++) {
          if (this.composantDiagnostique[i].pieces[j].prix < 0) {
            count++;
          }
        }
      }
      if (count == 0) {
        for (let i = 0; i < this.listeVoiture.length; i++) {
          if (this.listeVoiture[i].immatriculation == this.immatriculation) {
            this.voiture = this.listeVoiture[i];
          }
        }
        this.voitureService.diagnostique(this.immatriculation, this.voiture!.marque, this.voiture!.client.nom, this.voiture!.client.prenom, this.voiture!.client.email, this.composantDiagnostique).subscribe({
          next: (data: Voiture) => {

            this.immatriculation = "";
            this.messageSuccess = "Diagnostique validé.";
          }
        });
        for (let i = 0; i < this.listeVoiture.length; i++) {
          if (this.listeVoiture[i].immatriculation == this.immatriculation) {
            this.listeVoiture.splice(i, 1);
          }
        }
      } else {
        this.messageErreur = "Pix négative n'est pas acceptée.";
      }
    }
  }
}
