import { FC } from "react";
import { Grid, Card } from "@nextui-org/react";
import FavoriteCardPokemon from "./FavoriteCardPokemon";

interface FavoritePokemons{
  pokemons: number[];
}

export const FavoritePokemons: FC<FavoritePokemons> = ({pokemons}) => {
  return (
    <Grid.Container gap={2} justify="flex-start">
      {pokemons.map((id) => (
        <FavoriteCardPokemon pokemonId={id} key={ id } />
      ))}
    </Grid.Container>
  );
}
