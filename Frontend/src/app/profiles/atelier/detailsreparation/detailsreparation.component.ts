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
  isLoading = true;

  constructor(private service:ReparationService,private route: ActivatedRoute,private router:Router){};
  ngOnInit(): void {
    this.getreparationDetails();
  }

  getreparationDetails(){
    this.service.getdetailsreparation(this.route.snapshot.paramMap.get("imm")!).subscribe({
      next: (data) => {
        if(data.length == 0) this.router.navigateByUrl('/atelier/reparation');
        else {
          this.isLoading=false;
          this.voiture=data[0];
          this.dateTemp =new Array(this.voiture!.reparation!.composants!.length).fill(null);
          this.dateTempf =new Array(this.voiture!.reparation!.composants!.length).fill(null);
          this.control =new Array(this.voiture!.reparation!.composants!.length).fill(false);
          this.control1 =new Array(this.voiture!.reparation!.composants!.length).fill(false);
          this.controlf =new Array(this.voiture!.reparation!.composants!.length).fill(false);
          this.controlf1 =new Array(this.voiture!.reparation!.composants!.length).fill(false);
          this.controlDebut =new Array(this.voiture!.reparation!.composants!.length).fill(false);
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
  }

  changedf(eventDate: any,index:any) : void {
    this.controlf[index] = false;
    this.controlf1[index] = false;
    this.dateTempf[index] =  new Date(eventDate.target.value);
    if(this.dateTempf[index]<this.voiture.reparation!.composants![index].dateDebut!){this.controlf1[index] = true;}
  }

  updateDateDebut(index:any) {
    if(this.dateTemp[index] != null && this.dateTemp[index]< new Date(this.voiture.depots!.dateDepot)){
      this.control1[index] = true;
    }
    if(this.dateTemp[index] == null) this.control[index] = true;
    if(this.voiture.reparation?.dateEntree != null && new Date(this.voiture.reparation?.dateEntree) > this.dateTemp[index] ){
      this.controlDebut[index] = true;
    }

    if(!this.control[index] && !this.control1[index] && !this.controlDebut[index]){
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
    if(this.dateTempf[index] != null && this.dateTempf[index]<new Date(this.voiture.reparation!.composants![index].dateDebut!)){this.controlf1[index] = true;}
    if(this.dateTempf[index] == null) this.controlf[index] = true;
     if(!this.controlf[index]  && !this.controlf1[index]){
      this.voiture.reparation!.composants![index].dateFin = this.dateTempf[index];
      this.voiture.reparation!.avancement = this.calculavancement();
      let dataupdate = {};
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
        dataupdate = {nom:this.voiture.reparation!.composants![index].nom,dateFin:this.voiture.reparation!.composants![index].dateFin,avancement:this.voiture.reparation!.avancement,dateSortie:max,user:this.voiture.client,marque:this.voiture.marque};
      }else{
        dataupdate = {nom:this.voiture.reparation!.composants![index].nom,dateFin:this.voiture.reparation!.composants![index].dateFin,avancement:this.voiture.reparation!.avancement};
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
      this.voiture.reparation!.composants![index].dateFin = null;
      this.voiture.reparation!.avancement = this.calculavancement();
      dataupdate = {nom:this.voiture.reparation!.composants![index].nom,dateFin:null,avancement:this.voiture.reparation!.avancement};
    }
    this.service.updateCompDateFin(this.voiture.immatriculation,dataupdate).subscribe({
      next: (data) => {
        
      },
      error: (err) => {console.log(err)},
    });
  }

}


