import { useState } from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";

import { Grid, Card, Button, Container, Image, Text } from "@nextui-org/react";
import confetti from "canvas-confetti";

import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon, PokemonListResponse } from "../../interfaces";
import { localFavorites } from "../../utils";
import { getPokemonInfo } from "../../utils";

interface PokemonByNamePageProps {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<PokemonByNamePageProps> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(localFavorites.existInFavorites(pokemon.id));
    if (isInFavorites) return;
    confetti({
      zIndex: 2,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  return (
    <Layout title={`${pokemon.name}`}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "30px" }}>
            <Card.Body>
              {/* la imagen puede retornar null */}
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                alt={`Pokemon ${pokemon.name}`}
                width={"100%"}
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              
              css={{
                display: 'flex',
                flexDirection: 'column',
                "@sm": {
                  flexDirection: "row",
                  justifyContent: "space-between"
                }

              }}
              
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button
                onPress={onToggleFavorite}
                color="gradient"
                ghost={!isInFavorites}
              >
                {isInFavorites ? "Quitar de favoritos" : "Guardar e favoritos"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites: </Text>
              <Container display="flex">
                <Image
                  width={100}
                  height={100}
                  alt={`Pokemon ${pokemon.name}`}
                  src={pokemon.sprites.front_default}
                />
                <Image
                  width={100}
                  height={100}
                  alt={`Pokemon ${pokemon.name}`}
                  src={pokemon.sprites.back_default}
                />
                <Image
                  width={100}
                  height={100}
                  alt={`Pokemon ${pokemon.name}`}
                  src={pokemon.sprites.front_shiny}
                />
                <Image
                  width={100}
                  height={100}
                  alt={`Pokemon ${pokemon.name}`}
                  src={pokemon.sprites.back_shiny}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
//* Esto se ejecuta en tiempo de construccion, cuando el usuario visita la url, ya esta toda la info necesaria
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  // Obtener la lista de los 151 pokemon
  const { data } = await pokeApi.get<PokemonListResponse>(
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  );
  // Mapear a un arreglo de strings
  const pokemonsByName151: string[] = data.results.map(
    (smallPokemon) => smallPokemon.name
  );

  return {
    // Mapear todos los paths
    paths: pokemonsByName151.map((name) => ({
      params: {
        name,
      },
    })),
    fallback: false,
  };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string }; //casteo

  return {
    props: {
      pokemon: await getPokemonInfo(name),
    },
  };
};

export default PokemonByNamePage;
