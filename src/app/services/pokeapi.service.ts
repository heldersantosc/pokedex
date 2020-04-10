import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

interface PokeListResponse {
  created: string;
  modified: string;
  name: string;
  pokemon: any[];
  resource_uri: string;
}

@Injectable({
  providedIn: "root",
})
export class PokeapiService {
  private url = "//dev.treinaweb.com.br/pokeapi/";
  pokeList = [];
  /*pokeList = [
    { name: "Bulbasaur", number: 1 },
    { name: "Charmander", number: 4 },
    { name: "Squirtle", number: 7 },
    { name: "Pikachu", number: 25 },
  ];
  */

  constructor(private http: HttpClient) {}

  listAll() {
    this.http
      .get<PokeListResponse>(`${this.url}/pokedex/1`)
      .subscribe((response) => {
        response.pokemon.forEach((pokemon) => {
          pokemon.number = this.getNumberFromUrl(pokemon.resource_uri);
        });
        this.pokeList = this.sortPokemon(response.pokemon).filter(
          (pokemon) => pokemon.number < 1000
        );
      });

    console.log();
  }

  private getNumberFromUrl(url) {
    return parseInt(url.replace(/.*\/(\d+)\/$/, "$1"));
  }

  private sortPokemon(pokemonList) {
    return pokemonList.sort((a, b) => {
      return a.number > b.number ? 1 : -1;
    });
  }
}
