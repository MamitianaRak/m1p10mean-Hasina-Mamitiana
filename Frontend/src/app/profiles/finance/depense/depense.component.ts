import { Component, OnInit ,ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ComposantService } from 'src/app/services/composant/composant.service';
import { DepenseService } from 'src/app/services/depense/depense.service';


@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.scss']
})
export class DepenseComponent implements OnInit {
 
  listpieces = [{ nom: '', quantite: 1, prixUnitaire:1 }];

  form!: FormGroup;

  isPiece = false;

  submitted = false;

  ajout = false;

  listapieces = [];

  prixV = false;

  ajoutUn = false;


  constructor(private formBuilder: FormBuilder,private service:DepenseService,private serviceC:ComposantService) {}

   ngOnInit() {
    this.getlistpieces();
    this.form = this.formBuilder.group({
      motif: ["",Validators.required],
      pieces:  this.formBuilder.array([]),
      montant: [1,[Validators.min(1),Validators.required]],
      dateDepense: [null,Validators.required]
    });
  }

  get pieces(): FormArray {
    return this.form.get('pieces') as FormArray;
  }

  buildPieces(pieces: { nom: string; quantite: number ,prixUnitaire:number}[] = []) {
    return this.formBuilder.array(
      pieces.map( (piece) =>  {
         return this.formBuilder.group({
           nom: [piece.nom,Validators.required], quantite: [piece.quantite,[Validators.min(1),Validators.required]], prixUnitaire:[piece.prixUnitaire,[Validators.min(1),Validators.required]]
         }
          )}
    ))
  }

  addPieceField() {
    this.pieces.push(
      this.formBuilder.group({nom: ['',Validators.required], quantite: [1,[Validators.min(1),Validators.required]] ,prixUnitaire:[1,[Validators.min(1),Validators.required]]})
    );
  }

  removePieceField(index: number): void {
    if (this.pieces.length > 1) this.pieces.removeAt(index);
    else this.pieces.patchValue([{ nom: '', quantite: 1, prixUnitaire:1 }]);
  }

  submit(value: any): void {
    this.ajoutUn = false;
    this.ajout =false;
    this.prixV = false;
    this.submitted = true;
    if (this.form.invalid) {
      return;
  }
  
    if(!this.isPiece){
      
      value.pieces = null;
      this.addDepense(value);
      this.submitted =false;
      this.reset();
    }

    else{
      if(value.pieces.length == 0){
        this.ajoutUn = true;
        return;
      }
      if(!this.eqValidator(value)){
        this.prixV = true;
        return;
      } 
      else{
        //
         this.addDepense(value);
        this.prixV = false;
        this.submitted =false;
        this.reset();
      }
    }

  }

  reset(): void {
    this.submitted =false;
    this.form.reset();
    this.pieces.clear();
    
  }


  handleSelected($event:any) {
    if ($event.target.checked === false) {
      this.pieces.clear();
    }
    else{
      this.addPieceField();
    }
 }

  getlistpieces(){
    this.serviceC.getallpieces().subscribe(
      {
        next: (data) => {
          this.listapieces = data;
        },
        error: (err) => { },
        
      }

    )
  }

  eqValidator(value:any){
    let sum = 0;
    for (let index = 0; index < value.pieces.length; index++) {
      sum += value.pieces[index].prixUnitaire*value.pieces[index].quantite;
    }
    if(sum == value.montant) return true;
    return false;
  }

 // Into your component.ts file
// objectComparisonFunction = function (option: string, value: string): boolean {
//   return option === value;
// }

prixchanged(){
  let sum = 0;
  this.pieces.controls.forEach(piece =>{
    sum = sum +piece.get("quantite")!.value*piece.get("prixUnitaire")!.value;
  })
  this.form.get("montant")!.setValue(sum);
  
}



  addDepense(data:any){
      this.service.addDepense(data).subscribe({
        next: (data) => {
          this.ajout = true;
        },
        error: (err) => {console.log(err)},
      }

      )
  }
}
