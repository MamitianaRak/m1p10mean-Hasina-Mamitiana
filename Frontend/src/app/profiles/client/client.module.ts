import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ClientComponent } from './client.component';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { TopbarModule } from 'src/app/components/topbar/topbar.module';
import { SidebarModule } from 'src/app/components/sidebar/sidebar.module';
import { AjoutVoitureComponent } from './ajout-voiture/ajout-voiture.component';
import { FormsModule } from '@angular/forms';
import { DepotComponent } from './depot/depot.component';
import { ListeVoitureComponent } from './liste-voiture/liste-voiture.component';
import { VoitureComponent } from './voiture/voiture.component';
import { HistoriqueComponent } from './historique/historique.component';
import { DetailshistoriqueComponent } from './detailshistorique/detailshistorique.component';
import { FactureComponent } from './facture/facture.component';
import { EtatPaiementComponent } from './etat-paiement/etat-paiement.component';


@NgModule({
  declarations: [
    ClientComponent,
    AjoutVoitureComponent,
    DepotComponent,
    ListeVoitureComponent,
    VoitureComponent,
    HistoriqueComponent,
    DetailshistoriqueComponent,
    FactureComponent,
    EtatPaiementComponent,

  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SidebarModule,
    TopbarModule,
    FooterModule,
    FormsModule
  ]
})
export class ClientModule { }
