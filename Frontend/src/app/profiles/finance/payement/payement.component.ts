import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReparationPage } from 'src/app/models/voiture';
import { PayementService } from 'src/app/services/payement/payement.service';

@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.scss']
})
export class PayementComponent implements OnInit {


   voitures!:ReparationPage;
   keyword:string="";
   keyword1:string="";
   currentPage:number=1;
   pageSize:number=2;
   pages!:Array<number>;
   ajouter = false;

   isLoading = true;
   isSearch = false;
   isNodata = false;

constructor(private service:PayementService,private router:Router){};

ngOnInit(): void {
    this.OngetnonPayer(false);
    console.log(this.pages);
}

OngetnonPayer(search:boolean){
  this.service.getNonpayer(this.keyword1,this.keyword,this.currentPage,this.pageSize).subscribe({
    next: (data) => {
      if(!data){
        this.isNodata =true;
        this.isSearch =false;
        if(search){
          this.isSearch = true;
        }
      }
      this.isLoading=false;
      this.voitures=data;
      if(data != null) this.pages=new Array<number>(data.totalPages);
    },
    error: (err) => {console.log(err)},
  })
}

  onPageVoitures(i:number) {
    this.isLoading=true;
    this.currentPage=i+1;
    console.log(this.keyword,this.currentPage,this.pageSize);
    this.OngetnonPayer(false);
    }

  onSearch(data:any) {
  this.isLoading=true;
  this.keyword=data.keyword;
  this.keyword1=data.keyword1;
  console.log(this.keyword1,this.keyword,this.currentPage,this.pageSize);
  this.OngetnonPayer(true);
  }

  validation(imm:any,index:any){
    this.isLoading=true;
    console.log(imm);
    if(this.voitures.docs[index].reparation!.datePayement! < this.voitures.docs[index].reparation!.dateSortie!){
      return;
    }
    if(this.voitures.docs[index].reparation!.datePayement! == null){
      return;
    }

    this.service.payer(imm,this.voitures.docs[index].reparation?.datePayement).subscribe({
      next: (data) => {
        console.log(data);
        document.getElementById("btnclos"+index)?.click();
        this.OngetnonPayer(false);
        this.ajouter = true;
        setTimeout(() => {
          this.ajouter = false;
        }, 4000);

      },
      error: (err) => {console.log(err)},
    });

  }

  
}
