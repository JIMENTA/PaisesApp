import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  termino:string = '';
  errorEncontrado:boolean =false; 
  paises : Country[]=[];


  constructor(private paisService: PaisService) { }

  buscar(termino:string){
    this.errorEncontrado = false;
    this.termino = termino
  
    this.paisService.buscarCapital(this.termino)
 
    .subscribe((paises) => {
      this.paises = paises;
    }, (err)=>{
      this.errorEncontrado = true;
      this.paises =[];
    });
  }
}
