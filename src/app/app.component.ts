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
  search: FormGroup;
  showForm: boolean = false;
  pokemonsList: PokemonModel[];

  constructor(
    private dataService: DataService,
    private router: Router
  ){
    this.pokemonsList = [];

    // Escuchando cambios en la ruta, para enviar a actualizar la data
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getPokemonsList();
      }
    });
  
  }

  ngOnInit(): void {
    this.getPokemonsList();
    this.search = new FormGroup({
      searchText: new FormControl('')
    });
  }

  getPokemonsList(){
    this.dataService.getPokemonsList().subscribe((data : PokemonModel[]) => {
      this.pokemonsList = data;
    });

  }

  keyEvent(event:any) {
    console.log(event, event.keyCode, event.keyIdentifier);
  }
}
