import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutVoitureComponent } from './ajout-voiture/ajout-voiture.component';
import { ClientComponent } from './client.component';
import { DepotComponent } from './depot/depot.component';
import { DetailshistoriqueComponent } from './detailshistorique/detailshistorique.component';
import { EtatPaiementComponent } from './etat-paiement/etat-paiement.component';
import { FactureComponent } from './facture/facture.component';
import { HistoriqueComponent } from './historique/historique.component';
import { ListeVoitureComponent } from './liste-voiture/liste-voiture.component';
import { VoitureComponent } from './voiture/voiture.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: 'ajout',
        component: AjoutVoitureComponent,
        title :'Ajout voiture'
      },
      {
        path: 'depot',
        component: DepotComponent,
        title :'Dépot voiture'
      },
      {
        path: 'liste',
        component: ListeVoitureComponent,
        title :'Atelier | Voitures'
      },
      {
        path: 'voiture',
        component: VoitureComponent,
        title :'Mes voitures'
      },
      {
        path: 'voiture/:imm/historique',
        component: HistoriqueComponent,
        title :'Voitures | Historique'
      },
      {
        path: 'voiture/:imm/historique/:date',
        component: DetailshistoriqueComponent,
        title :'Historique | Details'
      },
      {
        path: 'voiture/:imm/facture/:date',
        component: FactureComponent,
        title :'Voiture | Facture'
      },
      {
        path: 'etat',
        component: EtatPaiementComponent,
        title: 'Etat de paiement'
      },
      {
        path: '',
        redirectTo: 'voiture',
        pathMatch: 'full'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
