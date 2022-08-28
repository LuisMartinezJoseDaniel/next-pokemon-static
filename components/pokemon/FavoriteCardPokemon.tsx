import React, { FC } from 'react'
import { Grid, Card } from '@nextui-org/react';
import { useRouter } from 'next/router';

interface FavoriteCardPokemonProps{
  pokemonId: number;
}

const FavoriteCardPokemon: FC<FavoriteCardPokemonProps> = ({pokemonId}) => {
  const router = useRouter();

  const onFavoriteClicked = () => {
    router.push(`/pokemon/${pokemonId}`);
  }
  
  return (
    <Grid xs={12} sm={6} md={3}>
      <Card
        onPress={onFavoriteClicked}
        isHoverable
        isPressable
        css={{ padding: 10 }}
      >
        <Card.Image
          width={"100%"}
          height={140}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
        ></Card.Image>
      </Card>
    </Grid>
  );
}

export default FavoriteCardPokemon