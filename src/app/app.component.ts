import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { PokemonModel } from 'src/shared/models/pokemon.model';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Listado de Pokemon';
  searchForm: FormGroup;
  searchText: string = '';
  showForm: boolean = false;
  pokemonsList: PokemonModel[];
  pokemonListAux: PokemonModel[];

  constructor(
    private dataService: DataService,
    private router: Router
  ){
    // Escuchando cambios en la ruta, para enviar a actualizar la data
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getPokemonsList();
      }
    });
  }

  ngOnInit(): void {
    this.getPokemonsList();
    this.searchForm = new FormGroup({
      searchText: new FormControl('')
    });

    // Subscibir a cambios en el input de busqueda
    this.searchForm.valueChanges.subscribe((selectedValue) => {
      this.searchText = selectedValue.searchText;
      if (this.searchText.length > 0){
        this.searchPokemon();
      } else {
        this.pokemonsList = this.pokemonListAux;
      }
    });
  }

  getPokemonsList(){
    this.dataService.getPokemonsList().subscribe({
      next: (data: PokemonModel[]) => {
        if (data.length > 0){
          this.pokemonsList = data;

          // Guardar respaldo del arreglo original, 
          this.pokemonListAux = data;
        } else {
          window.alert('No existen registros');
        }
      }, error: (err: any) => {
        window.alert('¡Ocurrió un error, vuelva a intentarlo!')
      }
    });
  }

  searchPokemon() {
    // Setear a vacio
    this.pokemonsList = [];

    // Recorrer el arreglo aux y push elementos con coincidencia en el arreglo original
    this.pokemonListAux.filter((pokemon) => {
      if (pokemon.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1) {
        this.pokemonsList.push(pokemon);
      };
    })
  }
}
