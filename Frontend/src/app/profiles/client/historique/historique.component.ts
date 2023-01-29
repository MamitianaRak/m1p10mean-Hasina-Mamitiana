import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReparationPage } from 'src/app/models/voiture';
import { ReparationService } from 'src/app/services/reparation/reparation.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent {

  reparations!:ReparationPage;
  keyword!:string;
  currentPage:number=1;
  pageSize:number=8;
  pages!:Array<number>;
  ajouter = false;
  imm!:string;

  isLoading = true;
  isSearch = false;
  isNodata = false;

constructor(private service:ReparationService,private route: ActivatedRoute){};

ngOnInit(): void {
  this.imm = this.route.snapshot.paramMap.get("imm")!;
   this.Ongetreparation(false);
}

Ongetreparation(search:boolean){
  if(this.keyword == null){
    this.service.gethistorique(this.imm,'',this.currentPage,this.pageSize).subscribe({
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
        this.reparations=data;
        if(data != null) {this.pages=new Array<number>(data.totalPages)}; 
      },
      error: (err) => {console.log(err)},
    });

  }else{
    this.service.gethistorique(this.imm,this.keyword,this.currentPage,this.pageSize).subscribe({
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
        this.reparations=data;
        if(data != null) {this.pages=new Array<number>(data.totalPages)}; 
      },
      error: (err) => {console.log(err)},
    });

  }
 
}

onPageReparations(i:number) {
  this.isLoading=true
 this.currentPage=i+1;
 console.log(this.keyword,this.currentPage,this.pageSize);
 this.Ongetreparation(false);
 }

onSearch(data:any) {
  this.isNodata =false;
  this.isLoading=true
this.keyword=data.keyword;
console.log(this.keyword,this.currentPage,this.pageSize);
this.Ongetreparation(true);
}

}
