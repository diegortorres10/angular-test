import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PokemonModel, RequestCreatePokemon, RequestUpdatePokemon } from '../models/pokemon.model';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, HttpClientModule ],
      providers: [ DataService ]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get pokemons list', async () => {
    const dummyPokemon : PokemonModel[] = [
      {
        name: 'Test pokemon',
        attack: 50,
        image: 'https://www.kindpng.com/picc/m/223-2239529_transparent-metapod-png-pokemon-butterfree-png-download.png',
        hp: 50,
        defense: 50,
        idAuthor: 1,
        id: 1,
        type: 'normal',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Test pokemon 2',
        attack: 50,
        image: 'https://www.kindpng.com/picc/m/223-2239529_transparent-metapod-png-pokemon-butterfree-png-download.png',
        hp: 50,
        defense: 50,
        idAuthor: 1,
        id: 2,
        type: 'normal',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
    
    service.getPokemonsList().subscribe(pokemonList => {
      expect(pokemonList.length).toBe(2);
      expect(pokemonList).toEqual(dummyPokemon);
    });

    const request = httpMock.expectOne(service.BASE_API_URL + '/pokemons/?idAuthor=1');
    expect(request.request.method).toBe('GET');
    request.flush(dummyPokemon);
  });

  it('should create pokemon', async () => {
    const dummyNewPokemon : RequestCreatePokemon = {
      name: 'Test pokemon',
      attack: 50,
      image: 'https://www.kindpng.com/picc/m/223-2239529_transparent-metapod-png-pokemon-butterfree-png-download.png',
      hp: 50,
      defense: 50,
      idAuthor: 1,
      type: 'normal'
    };

    const dummyPokemon : PokemonModel = {
      name: 'Test pokemon',
      attack: 50,
      image: 'https://www.kindpng.com/picc/m/223-2239529_transparent-metapod-png-pokemon-butterfree-png-download.png',
      hp: 50,
      defense: 50,
      idAuthor: 1,
      id: 1,
      type: 'normal',
      created_at: new Date(),
      updated_at: new Date()
    }

    service.createPokemon(dummyNewPokemon).subscribe((pokemonCreated: any) => {
      expect(pokemonCreated).toBe(dummyPokemon);
    });

    const request = httpMock.expectOne(service.BASE_API_URL + '/pokemons/?idAuthor=1');
    expect(request.request.method).toBe('POST');
    request.flush(dummyPokemon);
  });

  
  it('should update pokemon', async () => {
    const dummyUpdatePokemon : RequestUpdatePokemon = {
      name: 'Test pokemon',
      attack: 50,
      image: 'https://www.kindpng.com/picc/m/223-2239529_transparent-metapod-png-pokemon-butterfree-png-download.png',
      defense: 50
    };

    const pokemonId = '1';

    const dummyPokemon : PokemonModel = {
      name: 'Test pokemon',
      attack: 50,
      image: 'https://www.kindpng.com/picc/m/223-2239529_transparent-metapod-png-pokemon-butterfree-png-download.png',
      hp: 50,
      defense: 50,
      idAuthor: 1,
      id: 1,
      type: 'normal',
      created_at: new Date(),
      updated_at: new Date()
    }

    service.updatePokemon(pokemonId, dummyUpdatePokemon).subscribe((pokemonUpdated: any) => {
      expect(pokemonUpdated).toBe(dummyPokemon);
    });

    const request = httpMock.expectOne(service.BASE_API_URL + '/pokemons/' + pokemonId);
    expect(request.request.method).toBe('PUT');
    request.flush(dummyPokemon);
  });

  it('should delete pokemon', async () => {
    const pokemonId = '1';

    const dummyPokemon : PokemonModel = {
      name: 'Test pokemon',
      attack: 50,
      image: 'https://www.kindpng.com/picc/m/223-2239529_transparent-metapod-png-pokemon-butterfree-png-download.png',
      hp: 50,
      defense: 50,
      idAuthor: 1,
      id: 1,
      type: 'normal',
      created_at: new Date(),
      updated_at: new Date()
    }

    service.deletePokemon(pokemonId).subscribe((pokemonDeleted: any) => {
      expect(pokemonDeleted).toBe(dummyPokemon);
    });

    const request = httpMock.expectOne(service.BASE_API_URL + '/pokemons/' + pokemonId);
    expect(request.request.method).toBe('DELETE');
    request.flush(dummyPokemon);
  });

  afterEach(() => {
    httpMock.verify();
  });

});