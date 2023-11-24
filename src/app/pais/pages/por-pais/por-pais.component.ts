import { Component, OnInit} from '@angular/core';
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
export class PorPaisComponent implements OnInit{
  public termino:string = '';
  public errorEncontrado:boolean =false; 
  public countries : Country[]=[];

  public paisesSugeridos : Country[]=[];
  public mostrarSugerencias:boolean = false;
  public initialValue: string = '';

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.countries = this.paisService.cacheStore.byCountrie.countries;
    this.initialValue =  this.paisService.cacheStore.byCountrie.term;

  }

  buscar(termino:string){
    this.mostrarSugerencias = false;
    this.errorEncontrado = false;
    this.termino = termino;
  
  
    this.paisService.buscarPais(termino)
    .subscribe((paises) => {
      console.log(paises);
      this.countries = paises;
    }, (err)=>{
      this.errorEncontrado = true;
      this.countries =[];
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
