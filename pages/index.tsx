import { Grid } from "@nextui-org/react";
import type { NextPage, GetStaticProps } from "next";

import { pokeApi } from "../api";

import { Layout } from "../components/layouts";
import { PokemonCard } from "../components/pokemon";
import { PokemonListResponse, SmallPokemon } from "../interfaces";

interface NextPageProps {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<NextPageProps> = ({ pokemons }) => {
  return (
    <Layout title="Home page">
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon}/>
        ))}
      </Grid.Container>
    </Layout>
  );
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

//* Solo se ejecuta en tiempo de construccion una UNICA VEZ, en desarrollo se ejecuta multiples veces
//* Solo se puede usar en las Pages de Next
//* Siempre se ejecuta en el lado del servidor
//* Cuando hace el fetch, ya tiene toda la data, no hace nuevas peticiones
export const getStaticProps: GetStaticProps = async (ctx) => {
  const {
    data: { results },
  } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const url =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world";

  const pokemons: Array<SmallPokemon> = results.map((pokemon, index) => {
    return {
      ...pokemon,
      id: index + 1,
      img: `${url}/${index + 1}.svg`,
    };
  } );
  
 

  return {
    props: {
      pokemons: pokemons,
    },
  };
};

export default HomePage;
