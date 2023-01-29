import { Component, OnInit } from '@angular/core';
import { ReparationPage } from 'src/app/models/voiture';
import { ReparationService } from 'src/app/services/reparation/reparation.service';
declare var $: any;

@Component({
  selector: 'app-reparation',
  templateUrl: './reparation.component.html',
  styleUrls: ['./reparation.component.scss']
})

export class ReparationComponent implements OnInit {

  voitures!:ReparationPage;
   keyword:string="";
   currentPage:number=1;
   pageSize:number=8;
   pages!:Array<number>;
   ajouter = false;

  isLoading = true;
  isSearch = false;
  isNodata = false;

constructor(private service:ReparationService){};

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
      else{
        this.isNodata =false;
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
  this.isNodata =false;
  this.isLoading=true;
this.keyword=data.keyword;
console.log(this.keyword,this.currentPage,this.pageSize);
this.Ongetvoiture(true);
}

}
