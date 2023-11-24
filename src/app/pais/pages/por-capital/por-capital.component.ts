import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent implements OnInit{

  public countries : Country[]=[];
  public termino:string = '';
  public errorEncontrado:boolean =false; 
  public initialValue: string = '';

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  this.countries = this.paisService.cacheStore.byCapital.countries;
  this.initialValue =  this.paisService.cacheStore.byCapital.term;
  }

  buscar(termino:string){
    this.errorEncontrado = false;
    this.termino = termino;
    this.paisService.buscarCapital(this.termino)
    .subscribe((paises) => {
      this.countries = paises;
    }, (err)=>{
      this.errorEncontrado = true;
      this.countries =[];
    });
  }
}
