// Utilizar ctrl + shift + p -> Seleccionar el JSON y Paste JSON as a code para generar las interfaces

export interface PokemonListResponse {
  count:    number;
  next?:     string;
  previous?: string;
  results:  SmallPokemon[];
}

export interface SmallPokemon {
  name: string;
  url: string;
  id: number;
  img: string;
}
