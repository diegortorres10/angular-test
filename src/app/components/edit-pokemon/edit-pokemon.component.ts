import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RequestUpdatePokemon } from 'src/shared/models/pokemon.model';
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
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // Subscribir a cambios en la ruta y obtener id
    this.subscription = this.activatedRoute.params.subscribe(params => { 
      this.pokemonId = params['id'];
      this.getPokemonData();
    });

    this.updatePokemonForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
      attack: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      defense: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
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
    if (this.updatePokemonForm.invalid) {
      window.alert('Por favor verifique los datos ingresados y vuelva a intentarlo')
    } else {
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
  }

  goToMainPage() {
    this.route.navigate([''], {relativeTo: this.activatedRoute})
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
