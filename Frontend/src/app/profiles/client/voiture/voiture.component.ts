import { Component, OnInit } from '@angular/core';
import { VoiturePage } from 'src/app/models/voiture';
import { StorageService } from 'src/app/services/storage/storage.service';
import { VoitureService } from 'src/app/services/voiture/voiture.service';

@Component({
  selector: 'app-voiture',
  templateUrl: './voiture.component.html',
  styleUrls: ['./voiture.component.scss']
})
export class VoitureComponent implements OnInit {

  voitures!:VoiturePage;
   keyword:string="";
   currentPage:number=1;
   pageSize:number=8;
   pages!:Array<number>;
   ajouter = false;

   isLoading = true;
  isSearch = false;
  isNodata = false;

constructor(private service:VoitureService,private serviceStorage:StorageService){};

ngOnInit(): void {
    this.Ongetvoiture(false);
}

Ongetvoiture(search:boolean){
  this.service.getvoiturePage(this.serviceStorage.getUser().email,this.keyword,this.currentPage,this.pageSize).subscribe({
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
  this.isLoading=true
  this.currentPage=i+1;
  
  this.Ongetvoiture(false);
  }

onSearch(data:any) {
  this.isNodata =false;
  this.isLoading=true;
this.keyword=data.keyword;

this.Ongetvoiture(true);
}
}
