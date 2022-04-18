import { Component} from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';


@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent {
  termino:string = '';
  errorEncontrado:boolean =false; 
  paises : Country[]=[];

  constructor(private paisService: PaisService) { }

  buscar(termino:string){
    this.errorEncontrado = false;
    this.termino = termino
  
    this.paisService.buscarPais(this.termino)
    // .subscribe({
     
    //   next:(resp) => console.log(resp),
      
    //   error:() =>  this.errorEncontrado,
     
    // })
    .subscribe((paises) => {
      console.log(paises);
      this.paises = paises;
    }, (err)=>{
      this.errorEncontrado = true;
      this.paises =[];
    });
  }

  sugerencias(termino : string){
  this.errorEncontrado =false
  }
}
