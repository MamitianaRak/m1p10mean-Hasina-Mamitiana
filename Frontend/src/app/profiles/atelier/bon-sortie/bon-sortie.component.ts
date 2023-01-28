import { Component, OnInit } from '@angular/core';
import { ReparationPage } from 'src/app/models/voiture';
import { BonsortieService } from 'src/app/services/bonsortie/bonsortie.service';

@Component({
  selector: 'app-bon-sortie',
  templateUrl: './bon-sortie.component.html',
  styleUrls: ['./bon-sortie.component.scss']
})
export class BonSortieComponent implements OnInit {

  voitures!:ReparationPage;
  keyword:string="";
  currentPage:number=1;
  pageSize:number=2;
  pages!:Array<number>;
  ajouter = false;

  isLoading = true;
  isSearch = false;
  isNodata = false;

  constructor(private service:BonsortieService){};

  ngOnInit(): void {
    this.Ongetvoiture(false);
  }

  Ongetvoiture(search:boolean){
    this.service.getvoiture(this.keyword,this.currentPage,this.pageSize).subscribe({
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
        if(data != null) {this.pages=new Array<number>(data.totalPages)}; 
      },
      error: (err) => {console.log(err)},
    })
  }
  
  onPageVoitures(i:number) {
    this.isLoading=true;
    this.currentPage=i+1;
    console.log(this.keyword,this.currentPage,this.pageSize);
    this.Ongetvoiture(false);
    }
  
  onSearch(data:any) {
    this.isLoading=true;
  this.keyword=data.keyword;
  console.log(this.keyword,this.currentPage,this.pageSize);
  this.Ongetvoiture(true);
  }

  
  validation(imm:any,index:any){
    this.isLoading=true;
    document.getElementById("btnclos"+index)?.click();
    this.service.validerBon(imm).subscribe({
      next: (data) => {
        this.Ongetvoiture(false);
        this.ajouter = true;
        setTimeout(() => {
          this.ajouter = false;
        }, 4000);

      },
      error: (err) => {console.log(err)},
    });

  }

}
