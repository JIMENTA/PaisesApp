import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
  button {
    margin:5px;  
  }`
  ]
})
export class PorRegionComponent  {
  public countries : Country[] = [];

  public regiones : Region [] = [ 
  'Africa',
  'Americas', 
  'Asia', 
  'Europe', 
  'Oceania'
   ];
 
  public regionActiva : string = '';
  public selectedRegion? : Region

  constructor(private paisService : PaisService) { }


  getClaseCSS(region:string){
    return (region === this.regionActiva) ? 'btn btn-primary' :  'btn btn-outline-primary';
  }
  
  activarRegion(region: Region){

    if( region === this.regionActiva ) {return};

    this.regionActiva = region;
    this.countries =[];

    this.paisService.buscarPorRegion(region).subscribe(paises => this.countries = paises)

  }

}
