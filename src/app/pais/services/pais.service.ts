import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of , tap} from 'rxjs';
import { Country } from '../interfaces/pais.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl:string ='https://restcountries.com/v2';

  public cacheStore : CacheStore={
    byCapital: {term: '', countries: []},
    byCountrie: {term: '', countries: []},
    byRegion: {region: '', countries: []},

  }

  get httpParams(){
    return new HttpParams().set('fields','name,capital,alpha2Code,population' )
  }
  
  constructor( private http: HttpClient) { 
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
  }

  private loadFromLocalStorage(){
    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore') !)
   }

  private getCountriesRequest ( url: string): Observable<Country[]>{
    return this.http.get<Country[]>(url)
    .pipe(
      catchError( () => of ([]))
    )
  }

  buscarCapital(term : string): Observable<Country[]>{
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(  countries => this.cacheStore.byCapital = { term , countries } ),
      tap ( () => this.saveToLocalStorage())
    );
  }

  buscarPais( term : string): Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(  countries => this.cacheStore.byCountrie = { term , countries } ),
      tap ( () => this.saveToLocalStorage())
    );
  }
  
  buscarPorRegion(region:Region):Observable<Country[]>{
    const url = `${this.apiUrl}/regionalbloc/${region}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(  countries => this.cacheStore.byRegion = { region , countries } )
    )
  }
  
  getPaisPorAlpha(id : string): Observable<Country>{
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country>( url )
  }
}
