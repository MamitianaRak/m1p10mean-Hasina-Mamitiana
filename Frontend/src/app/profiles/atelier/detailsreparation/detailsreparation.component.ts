import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Reparation } from 'src/app/models/voiture';
import { ReparationService } from 'src/app/services/reparation/reparation.service';

@Component({
  selector: 'app-detailsreparation',
  templateUrl: './detailsreparation.component.html',
  styleUrls: ['./detailsreparation.component.scss']
})
export class DetailsreparationComponent implements OnInit {
  
  voiture!:Reparation;

  dateTemp! : Array<Date>;
  dateTempf! : Array<Date>;
  control!: Array<boolean>;
  control1!: Array<boolean>;
  controlf!: Array<boolean>;
  controlf1!: Array<boolean>;
  controlDebut! :Array<boolean>;

  controlD8h! : Array<boolean>;
  controlD16h! : Array<boolean>;

  controlF16h! : Array<boolean>;


  isLoading = true;
  tarif!:number;

  constructor(private service:ReparationService,private route: ActivatedRoute,private router:Router){};
  ngOnInit(): void {
    this.getreparationDetails();
  }

  getreparationDetails(){
    this.service.getdetailsreparation(this.route.snapshot.paramMap.get("imm")!).subscribe({
      next: (data) => {
        if(data.reparation.length == 0) this.router.navigateByUrl('/atelier/reparation');
        else {
          this.isLoading=false;
          this.voiture=data.reparation[0];
          this.tarif = data.tarif;
          this.dateTemp =new Array(this.voiture!.reparation!.composants!.length).fill(null);
          this.dateTempf =new Array(this.voiture!.reparation!.composants!.length).fill(null);
          this.control =new Array(this.voiture!.reparation!.composants!.length).fill(false);
          this.control1 =new Array(this.voiture!.reparation!.composants!.length).fill(false);
          this.controlf =new Array(this.voiture!.reparation!.composants!.length).fill(false);
          this.controlf1 =new Array(this.voiture!.reparation!.composants!.length).fill(false);
          this.controlDebut =new Array(this.voiture!.reparation!.composants!.length).fill(false);
          this.controlD8h =new Array(this.voiture!.reparation!.composants!.length).fill(false);
          this.controlD16h =new Array(this.voiture!.reparation!.composants!.length).fill(false);
          this.controlF16h =new Array(this.voiture!.reparation!.composants!.length).fill(false);
        };
      },
      error: (err) => {
        
        this.router.navigateByUrl('/atelier/reparation');
      },
    });
  }

  changed(eventDate: any,index:any) : void {
    this.dateTemp[index] =  new Date(eventDate.target.value);
    this.control[index] = false;
    this.control1[index] = false;
    this.controlDebut[index] = false;
    this.controlD8h[index] = false;
    this.controlD16h[index] = false;
  }

  changedf(eventDate: any,index:any) : void {
    this.controlf[index] = false;
    this.controlf1[index] = false;
    this.controlF16h[index] = false;
    this.dateTempf[index] =  new Date(eventDate.target.value);
    if(this.dateTempf[index]<this.voiture.reparation!.composants![index].dateDebut!){this.controlf1[index] = true;}
  }

  updateDateDebut(index:any) {
    if(this.dateTemp[index] == null){this.control[index] = true;return};
    if(this.dateTemp[index].getHours()< 8){
      this.controlD8h[index] = true;
    }
    if(this.dateTemp[index].getHours() > 16){
      this.controlD16h[index] = true;
    }
    if(this.dateTemp[index].getHours()  == 16 && this.dateTemp[index].getMinutes() > 0 ){
      this.controlD16h[index] = true;
    }
    if(this.dateTemp[index] != null && this.dateTemp[index]< new Date(this.voiture.depots!.dateDepot)){
      this.control1[index] = true;
    }
    if(this.voiture.reparation?.dateEntree != null && new Date(this.voiture.reparation?.dateEntree) > this.dateTemp[index] ){
      this.controlDebut[index] = true;
    }
    if(!this.control[index] && !this.control1[index] && !this.controlDebut[index] && !this.controlD8h[index] && !this.controlD16h[index]){
      this.voiture.reparation!.composants![index].dateDebut = this.dateTemp[index];
      let dataupdate = {};
      if(this.calculavancement()==0){
        this.voiture.reparation!.dateEntree = this.voiture.reparation!.composants![index].dateDebut;
        dataupdate = {nom:this.voiture.reparation!.composants![index].nom,dateDebut:this.voiture.reparation!.composants![index].dateDebut,dateEntree:this.voiture.reparation!.composants![index].dateDebut};
      }else{
        dataupdate = {nom:this.voiture.reparation!.composants![index].nom,dateDebut:this.voiture.reparation!.composants![index].dateDebut};
      }
      this.service.updateCompDateDeb(this.voiture.immatriculation,dataupdate).subscribe({
        next: (data) => {
          
        },
        error: (err) => {console.log(err)},
      });
    }
 
  }

  updateDateFin(index:any) {
    if(this.dateTempf[index] == null) {this.controlf[index] = true;return};
    if(this.dateTempf[index].getHours() > 16){
      this.controlF16h[index] = true;
    }
    if(this.dateTempf[index].getHours()  == 16 && this.dateTempf[index].getMinutes() > 0 ){
      this.controlF16h[index] = true;
    }
    if(this.dateTempf[index] != null && this.dateTempf[index]<new Date(this.voiture.reparation!.composants![index].dateDebut!)){this.controlf1[index] = true;}
     if(!this.controlf[index]  && !this.controlf1[index] && !this.controlF16h[index]){
      console.log("tonag ato");
      this.voiture.reparation!.composants![index].dateFin = this.dateTempf[index];
      this.voiture.reparation!.avancement = this.calculavancement();
      let dataupdate = {};
      const prixMo = this.calculprixMoComposant(this.voiture.reparation!.composants![index].dateDebut,this.voiture.reparation!.composants![index].dateFin!);
      this.voiture.reparation!.prixMo = this.voiture.reparation!.prixMo! + prixMo;
      this.voiture.reparation!.prixTotal = this.voiture.reparation!.prixTotal! + prixMo;
      if(this.voiture.reparation!.avancement==100){
       const maxDateTemp = new Date(
        Math.max(
          ...(this.voiture.reparation!.composants!).map(element => {
            return new Date(element.dateFin!).getTime();
          }),
        ),
      );
      const max: Date = maxDateTemp > this.voiture.reparation!.composants![index].dateFin! ? maxDateTemp : this.voiture.reparation!.composants![index].dateFin!;
      this.voiture.reparation!.dateSortie =  max ;
        dataupdate = {nom:this.voiture.reparation!.composants![index].nom,dateFin:this.voiture.reparation!.composants![index].dateFin,avancement:this.voiture.reparation!.avancement,dateSortie:max,user:this.voiture.client,marque:this.voiture.marque,prixMo:this.voiture.reparation!.prixMo,prixTotal: this.voiture.reparation!.prixTotal};
      }else{
        dataupdate = {nom:this.voiture.reparation!.composants![index].nom,dateFin:this.voiture.reparation!.composants![index].dateFin,avancement:this.voiture.reparation!.avancement,prixMo:this.voiture.reparation!.prixMo,prixTotal: this.voiture.reparation!.prixTotal};
      }
      this.service.updateCompDateFin(this.voiture.immatriculation,dataupdate).subscribe({
        next: (data) => {
          
        },
        error: (err) => {
           console.log(err)
        },
      });
    }
 
  }

  calculavancement(): number{
    const count = this.voiture.reparation!.composants?.length;
    let fin =0;
    this.voiture.reparation!.composants?.forEach(composant => {
      if(composant.dateFin !=null){
        fin = fin+1;
      }
    });

    return Math.round((100*fin/count!)*100)/100;
    }

    totalPieces(index:any): number{
      let total = 0;
      this.voiture.reparation!.composants![index].pieces.forEach(piece => {
        total = total+piece.prix;
      });
  
      return total;
      }

  annuler(index:any):void{
    let dataupdate = {};
    if(this.calculavancement()==100){
      this.voiture.reparation!.composants![index].dateFin = null;
      this.voiture.reparation!.avancement = this.calculavancement();
      this.voiture.reparation!.dateSortie =  null ;
      dataupdate = {nom:this.voiture.reparation!.composants![index].nom,dateFin:null,avancement:this.voiture.reparation!.avancement,dateSortie:null};
    }else{
      const prixMo = this.calculprixMoComposant(this.voiture.reparation!.composants![index].dateDebut,this.voiture.reparation!.composants![index].dateFin!);
      this.voiture.reparation!.prixMo = this.voiture.reparation!.prixMo! -  prixMo;
      this.voiture.reparation!.prixTotal = this.voiture.reparation!.prixTotal! - prixMo;
      this.voiture.reparation!.composants![index].dateFin = null;
      this.voiture.reparation!.avancement = this.calculavancement();
      dataupdate = {nom:this.voiture.reparation!.composants![index].nom,dateFin:null,avancement:this.voiture.reparation!.avancement,prixMo:this.voiture.reparation!.prixMo,prixTotal: this.voiture.reparation!.prixTotal};
    }
    this.service.updateCompDateFin(this.voiture.immatriculation,dataupdate).subscribe({
      next: (data) => {
        
      },
      error: (err) => {console.log(err)},
    });
  }

  calculprixMoComposant(dateD:Date,dateF:Date){
    if (typeof dateD === "string") {
      dateD = new Date(dateD);
  }
    const diff = this.dateDiffInDays(dateD,dateF);
    if(diff == 0){
      return this.diff_hours(dateD,dateF)*this.tarif;
    }
    else{
      const date16h = new Date(dateD.getTime());
      date16h.setHours(16,0,0);
      const diffD = this.diff_hours(dateD,date16h);
      const date8h = new Date(dateF.getTime());
      date8h.setHours(8,0,0);
      const diffF = this.diff_hours(date8h,dateF);
      const middle = (diff -1)*8;
      const finalH = diffD+diffF+middle; 
      return this.tarif*finalH;

    }

  }

    dateDiffInDays(a:Date, b:Date) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  diff_hours(dt2:Date, dt1:Date) 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff));
  
 }

 diff_hours1(date1:Date, date2:Date){
  return Math.abs(date1.getTime() - date2.getTime()) / 3600000;
 }

}


