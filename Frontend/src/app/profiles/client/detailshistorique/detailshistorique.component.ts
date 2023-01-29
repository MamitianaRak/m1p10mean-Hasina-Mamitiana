import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reparation } from 'src/app/models/voiture';
import { ReparationService } from 'src/app/services/reparation/reparation.service';

@Component({
  selector: 'app-detailshistorique',
  templateUrl: './detailshistorique.component.html',
  styleUrls: ['./detailshistorique.component.scss']
})
export class DetailshistoriqueComponent {

  voiture!:Reparation;
  imm!:string;

  isLoading = true;


  constructor(private service:ReparationService,private route: ActivatedRoute,private router:Router){};
  ngOnInit(): void {
    this.imm = this.route.snapshot.paramMap.get("imm")!;
    this.gethistoriqueDetails();
  }

  gethistoriqueDetails(){
    this.service.gethistoriqueDetails(this.imm,this.route.snapshot.paramMap.get("date")!).subscribe({
      next: (data) => {
        if(data.length == 0) this.router.navigate(['/voiture',this.voiture.immatriculation,'historique']);
        else {
          this.isLoading=false;
          this.voiture=data[0];
          
        };
      },
      error: (err) => {
        
        this.router.navigate(['/voiture',this.voiture.immatriculation,'historique']);
      },
    });
  }

  totalPieces(index:any): number{
    let total = 0;
    this.voiture.reparation!.composants![index].pieces.forEach(piece => {
      total = total+piece.prix;
    });

    return total;
    }

}
