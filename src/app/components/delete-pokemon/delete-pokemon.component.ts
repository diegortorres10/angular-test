import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PokemonModel } from 'src/shared/models/pokemon.model';
import { DataService } from 'src/shared/services/data.service';

@Component({
  selector: 'app-delete-pokemon',
  templateUrl: './delete-pokemon.component.html',
  styleUrls: ['./delete-pokemon.component.scss']
})
export class DeletePokemonComponent implements OnInit, OnDestroy {

  pokemonId: string;
  pokemonData: PokemonModel;
  subscription: Subscription;

  constructor(
    private dataService: DataService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Subscribir a cambios en la ruta y obtener id
    this.subscription = this.activatedRoute.params.subscribe(params => { 
      this.pokemonId = params['id'];
      this.getPokemonData();
      // let products = this._productService.getProducts();
      // this.product=products.find(p => p.productID==this.id);
    });
  }

  getPokemonData() {
    if (this.pokemonId) {
      // Obtener data del pokemon para presentar
      this.dataService.getPokemonById(this.pokemonId).subscribe({
        next: (data) => {
          console.log(data);
          this.pokemonData = data;
        },
        error: (err: any) => {
          // Volver a main
          window.alert('El pokemon ingresado no existe. Verifique la información y vuelva a intentarlo');
          this.goToMainPage();
        }
      });
    }
  }

  deletePokemon() {
    this.dataService.deletePokemon(this.pokemonId).subscribe({
      next: (data) => {
        // eliminado
        console.log(data);
        this.goToMainPage();
      },
      error: (err: any) => {
        // volver a main
        window.alert('¡Ocurrió un error, vuelva a intentarlo!');
      }
    })
  }

  goToMainPage() {
    this.route.navigate([''], {relativeTo: this.activatedRoute})
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
