import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePokemonComponent } from './components/create-pokemon/create-pokemon.component';
import { DeletePokemonComponent } from './components/delete-pokemon/delete-pokemon.component';
import { EditPokemonComponent } from './components/edit-pokemon/edit-pokemon.component';

const routes: Routes = [
  { path: 'create', component: CreatePokemonComponent },
  { path: 'edit/:id', component: EditPokemonComponent },
  { path: 'delete/:id', component: DeletePokemonComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
