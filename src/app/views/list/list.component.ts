import { Component, OnInit } from "@angular/core";
import { PokeapiService } from "src/app/services/pokeapi.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.sass"],
})
export class ListComponent implements OnInit {
  nameFilter = "";
  selectedPkm = null;
  get pokemonList() {
    return this.pokeapi.pokeList.filter((pokemon) => {
      return (
        pokemon.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) !== -1
      );
    });
  }

  /*pokemonList = [
    { name: "Bulbasaur", number: 1 },
    { name: "Charmander", number: 4 },
    { name: "Squirtle", number: 7 },
    { name: "Pikachu", number: 25 },
  ];*/

  get pkmSprite() {
    const number = ("000" + this.selectedPkm.number).slice(-3);
    return `//serebii.net/sunmoon/pokemon/${number}.png`;
  }

  enderecoImagem = "//serebii.net/pokedex-xy/icon/";
  nome = "Helder";
  nomeForm = "";

  constructor(private pokeapi: PokeapiService) {}

  ngOnInit(): void {
    this.pokeapi.listAll();
  }

  selectPokemon(pkm) {
    this.selectedPkm = pkm;
  }

  handleClick() {
    alert("hi");
  }
}
