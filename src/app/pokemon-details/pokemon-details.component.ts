import { Component, OnInit } from '@angular/core';
import { PokemonDetails, PokemonTypeSkills } from '../model/pokemon';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PokemonApi } from '../pokemon-api.service';
import { List } from 'immutable';

@Component({
  selector: 'pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  pokemonDetails?: PokemonDetails;

  pokemonSkills?: List<PokemonTypeSkills>;

  constructor(private route: ActivatedRoute, private pokemonApi: PokemonApi) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.pokemonDetails = undefined;
      this.pokemonSkills = undefined;
      this.pokemonApi.getPokemonDetails(+params.get('id')).subscribe(details => this.pokemonDetails = details);
      this.pokemonApi.getPokemonSkills(+params.get('id')).subscribe(skills => this.pokemonSkills = skills);
    });

    
  }




}
