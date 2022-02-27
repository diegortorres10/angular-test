import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { PokemonModel, RequestCreatePokemon, RequestUpdatePokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public BASE_API_URL = "https://pokemon-pichincha.herokuapp.com";

  constructor(private httpClient: HttpClient) { }

  /**
   * Obtener todos los pokemons by author
   * TODO: ¿quitar el author?
   * @returns Listado de pokemons
   */
  public getPokemonsList(): Observable<PokemonModel[]>{
    let url_ = this.BASE_API_URL + "/pokemons/?idAuthor=1";
    url_ = url_.replace(/[?&]$/, "");

    return this.httpClient.get<PokemonModel[]>(url_).pipe(catchError(this.handleError));
  }

  /**
   * Obtener data de pokemon by id
   * @param id Identificador del pokemon
   * @returns Data de pokemon
   */
   public getPokemonById(id: string): Observable<PokemonModel>{
    let url_ = this.BASE_API_URL + "/pokemons/{id}";
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace(/[?&]$/, "");

    return this.httpClient.get<PokemonModel>(url_).pipe(catchError(this.handleError));
  }

  /**
   * Crear un nuevo pokemon
   * @param requestCreate Objecto con datos de pokemon.
   * @returns Nuevo pokemon creado
   */
   public createPokemon(requestCreate: RequestCreatePokemon): Observable<PokemonModel>{
    let url_ = this.BASE_API_URL + "/pokemons/?idAuthor=1";
    url_ = url_.replace(/[?&]$/, "");

    return this.httpClient.post<PokemonModel>(url_, requestCreate).pipe(catchError(this.handleError));
  }

  /**
   * Actualizar data de pokemon
   * @param id Identificador del pokemon a actualizar
   * @param requestUpdate Objeto con datos de pokemon a actualizar
   * @returns Pokemon actualizado
   */
  public updatePokemon(id: string, requestUpdate: RequestUpdatePokemon): Observable<PokemonModel>{
    let url_ = this.BASE_API_URL + "/pokemons/{id}";
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace(/[?&]$/, "");

    return this.httpClient.put<PokemonModel>(url_, requestUpdate).pipe(catchError(this.handleError));
  }
  
  /**
   * Eliminar un pokemon
   * @param id Identificador del pokemon a eliminar
   * @returns 
   */
  public deletePokemon(id: string): Observable<any>{
    let url_ = this.BASE_API_URL + "/pokemons/{id}";
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace(/[?&]$/, "");

    return this.httpClient.delete(url_).pipe(catchError(this.handleError));
  }

  /**
   * Manejo de excepciones
   */
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un problema, por favor vuelva a intentarlo';
    if (error.error instanceof ErrorEvent) {
      // Client error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server error
      errorMessage = `Codigo: ${error.status}\n${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

}
