import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonModel, RequestCreatePokemon } from 'src/shared/models/pokemon.model';
import { DataService } from 'src/shared/services/data.service';

@Component({
  selector: 'app-create-pokemon',
  templateUrl: './create-pokemon.component.html',
  styleUrls: ['./create-pokemon.component.scss']
})
export class CreatePokemonComponent implements OnInit {

  newPokemonForm: FormGroup;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) { }

  
  ngOnInit(): void {
    this.newPokemonForm = new FormGroup({
      name: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      attack: new FormControl('', Validators.required),
      defense: new FormControl('', Validators.required)
    })
  }

  onSubmit() {   
    const newPokemon: RequestCreatePokemon = {
      ...this.newPokemonForm.value,
      idAuthor: 1,
      type: 'normal',
      hp: 0
    };

    this.dataService.createPokemon(newPokemon).subscribe({
      next: (data) => {
        // Se creo el pokemon
        window.alert('¡Pokemon registrado!');
        this.goToMainPage();
        // console.log(newPokemon);
      },
      error: (err: any) => {
        // Volver a main
        window.alert('¡Ocurrió un error, vuelva a intentarlo!');
      }
    });
  }

  goToMainPage() {
    this.route.navigate([''], {relativeTo: this.activatedRoute})
  }
}