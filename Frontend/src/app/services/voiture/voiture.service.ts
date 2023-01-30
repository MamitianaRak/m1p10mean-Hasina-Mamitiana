import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global.constants';
import { Voiture } from 'src/app/models/voiture';
import { Composant } from 'src/app/models/composant';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  constructor(private http: HttpClient) { }

  public creationVoiture(immatriculation: String, marque: String, nom: String, prenom: String, email: String): Observable<Voiture> {
    let data = {
      immatriculation: immatriculation,
      marque: marque,
      nom: nom,
      prenom: prenom,
      email: email
    }
    return this.http.post<Voiture>(GlobalConstants.apiURL + "/voiture/creation", data);
  }

  public getVoitureNoDepot(email: string): Observable<Voiture[]> {
    let data = { email: email };
    return this.http.post<Voiture[]>(GlobalConstants.apiURL + "/voiture/findDepot", data);
  }

  public depotVoiture(immatriculation: String, signalement: any[]): Observable<any> {
    let depot = {
      immatriculation: immatriculation,
      signalement: signalement
    }
    return this.http.post<Voiture[]>(GlobalConstants.apiURL + "/voiture/depot", depot);
  }

  public getListeVoiture(email: String): Observable<Voiture[]> {
    let data = { email: email };
    return this.http.post<Voiture[]>(GlobalConstants.apiURL + "/voiture/liste", data);
  }

  public getComposant(): Observable<Composant[]> {
    return this.http.get<Composant[]>(GlobalConstants.apiURL + "/atelier/composant");
  }

  public getListeVoitureDepot(): Observable<Voiture[]> {
    return this.http.get<Voiture[]>(GlobalConstants.apiURL + "/atelier/diagnostique/liste");
  }

  public diagnostique(immatriculation: String, marque:String, nom: String, prenom: String, email: String, listeComposant: Composant[]): Observable<Voiture> {
    let prixMo = 2500 * listeComposant.length;
    let data = {
      marque:marque,
      nom: nom,
      prenom: prenom,
      email: email,
      immatriculation: immatriculation,
      composant: listeComposant,
      prixMo: prixMo
    }
    return this.http.post<Voiture>(GlobalConstants.apiURL + "/atelier/diagnostique", data);
  }

  testFlux(): Observable<String[]> {
    return new Observable(observer => {
      setInterval(() => {
        observer.next();
      }, 1000);
    })
  }

  public deleteComposant(immatriculation: String, composant: String): Observable<Voiture> {
    let data = {
      immatriculation: immatriculation,
      composant: composant
    }
    return this.http.post<Voiture>(GlobalConstants.apiURL + "/voiture/deleteComposant", data);
  }

  public validationAttente(immatriculation: String): Observable<Voiture> {
    let data = { immatriculation: immatriculation };
    return this.http.post<Voiture>(GlobalConstants.apiURL + "/voiture/validationAttente", data);
  }
  public getvoiturePage(email: string, kw: string, page: number, limit: number): Observable<any> {
    return this.http.post<any>(GlobalConstants.apiURL + "/client/voiture?kw=" + kw + "&page=" + page + "&limit=" + limit, { email: email });
  }

  public recuperation(immatriculation: String): Observable<Voiture> {
    let data = { immatriculation: immatriculation };
    return this.http.post<Voiture>(GlobalConstants.apiURL + "/voiture/recuperation", data);
  }



}
