import { Component} from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';


@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `li {
      cursor : pointer;
    }
    `
  ]
})
export class PorPaisComponent {
  termino:string = '';
  errorEncontrado:boolean =false; 
  paises : Country[]=[];

  paisesSugeridos : Country[]=[];
  mostrarSugerencias:boolean = false;


  constructor(private paisService: PaisService) { }

  buscar(termino:string){
    this.mostrarSugerencias = false;
    this.errorEncontrado = false;
    this.termino = termino;
  
  
    this.paisService.buscarPais(termino)
    .subscribe((paises) => {
      console.log(paises);
      this.paises = paises;
    }, (err)=>{
      this.errorEncontrado = true;
      this.paises =[];
    });
  }

  sugerencias(termino : string){
  this.errorEncontrado =false;
  this.termino = termino;
  this.mostrarSugerencias = true;
   
  this.paisService.buscarPais(termino)
  .subscribe( 
  paises => this.paisesSugeridos = paises.splice(0,5))
  // (err) => this.paisesSugeridos = []
  
  }

  buscarSugerencia(termino:string){
    this.buscar(termino);
  }
}
