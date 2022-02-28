import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestCreatePokemon } from 'src/shared/models/pokemon.model';
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
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) { }

  
  ngOnInit(): void {
    this.newPokemonForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
      attack: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      defense: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
    })
  }

  onSubmit() {
    if (this.newPokemonForm.invalid) {
      window.alert('Por favor verifique los datos ingresados y vuelva a intentarlo')
    } else {
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
  }

  goToMainPage() {
    this.route.navigate([''], {relativeTo: this.activatedRoute})
  }
}