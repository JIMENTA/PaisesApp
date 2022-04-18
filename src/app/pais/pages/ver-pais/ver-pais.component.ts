import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais !: Country; //! puede ser null

  constructor(
    private aactivateRoute : ActivatedRoute, 
    private paisService : PaisService) { }

  ngOnInit(): void {

   this.aactivateRoute.params
   .pipe(
     switchMap(({id}) => this.paisService.paisPorAlpha(id)),
     tap(console.log)
   )
   .subscribe(pais => this.pais = pais)

    // this.aactivateRoute.params
    // .subscribe(({id})=>{
    //   console.log(id); // {id: "CR"} -> lo saca del routing, 
    
    // this.paisService.paisPorAlpha(id)
    // .subscribe(pais =>
    //   console.log(pais))
    // })
  }



}
