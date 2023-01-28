import { Component,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reparation } from 'src/app/models/voiture';
import { ReparationService } from 'src/app/services/reparation/reparation.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent {

  @ViewChild('content', { static: false }) content!:ElementRef;

  voiture!:Reparation;
  imm!:string;

  isLoading = true;

  constructor(private service:ReparationService,private route: ActivatedRoute,private router:Router){};
  ngOnInit(): void {
    this.gethistoriqueDetails();
  }

  gethistoriqueDetails(){
    this.service.gethistoriqueDetails(this.route.snapshot.paramMap.get("imm")!,this.route.snapshot.paramMap.get("date")!).subscribe({
      next: (data) => {
        if(data.length == 0) this.router.navigate(['/voiture',this.route.snapshot.paramMap.get("imm")!,'historique']);
        else {
          this.isLoading=false;
          this.voiture=data[0];
          this.imm = this.route.snapshot.paramMap.get("imm")!;
          console.log(this.voiture);
        };
      },
      error: (err) => {
        console.log(err);
        this.router.navigate(['/voiture',this.route.snapshot.paramMap.get("imm")!,'historique']);
      },
    });
  }

   SavePDF():void{ 
    // let pdf = new jsPDF('p', 'pt', [1000, 565]);
    // pdf.html(this.content.nativeElement, {
    //   callback: (pdf) => {
    //     pdf.save("sample.pdf")
    //   }
    // })
    html2canvas(this.content.nativeElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg");
 
      const pdf = new jsPDF({
        orientation:"portrait"
      });
 
      const imageProps = pdf.getImageProperties(imgData);
 
      const pdfw = pdf.internal.pageSize.getWidth();
 
      const pdfh = (imageProps.height * pdfw) / imageProps.width;
 
      pdf.addImage(imgData, 'PNG', 0, 0, pdfw, pdfh);
      
      pdf.save("Facture_"+this.imm+"_"+new Date().toLocaleString()+".pdf");
    })
   
  }
}
