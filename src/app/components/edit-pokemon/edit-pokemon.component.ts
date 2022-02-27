import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PokemonModel, RequestUpdatePokemon } from 'src/shared/models/pokemon.model';
import { DataService } from 'src/shared/services/data.service';

@Component({
  selector: 'app-edit-pokemon',
  templateUrl: './edit-pokemon.component.html',
  styleUrls: ['./edit-pokemon.component.scss']
})
export class EditPokemonComponent implements OnInit, OnDestroy {

  pokemonId: string;
  updatePokemonForm: FormGroup;
  subscription: Subscription;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    // Subscribir a cambios en la ruta y obtener id
    this.subscription = this.activatedRoute.params.subscribe(params => { 
      this.pokemonId = params['id'];
      this.getPokemonData();
    });

    this.updatePokemonForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      attack: new FormControl('', [Validators.required]),
      defense: new FormControl('', [Validators.required])
    })
  }

  getPokemonData() {
    if (this.pokemonId) {
      // Obtener data del pokemon para presentar
      this.dataService.getPokemonById(this.pokemonId).subscribe({
        next: (data) => {
          console.log(data);
          this.updatePokemonForm.patchValue(data);
        },
        error: (err: any) => {
          // Volver a main
          window.alert('El pokemon ingresado no existe. Verifique la información y vuelva a intentarlo');
          this.goToMainPage();
        }
      });
    }
  }

  updatePokemon() {
    const updatePokemon: RequestUpdatePokemon = {
      ...this.updatePokemonForm.value
    };

    this.dataService.updatePokemon(this.pokemonId, updatePokemon).subscribe({
      next: (data) => {
        // eliminado
        console.log(data);
        window.alert('¡Pokemon actualizado!');
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
