import { useState } from "react";

import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Button, Card, Container, Grid, Text, Image } from "@nextui-org/react";

import confetti from "canvas-confetti";


import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";
import { localFavorites } from "../../utils";
import { getPokemonInfo } from "../../utils";

interface PokemonPageProps {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<PokemonPageProps> = ( { pokemon } ) => {

  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );  

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite( pokemon.id );
    setIsInFavorites( localFavorites.existInFavorites( pokemon.id ) );
    if ( isInFavorites ) return;
    confetti( {
      zIndex: 2,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1, 
        y: 0
      }
    })
  }


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
              css={{ display: "flex", justifyContent: "space-between" }}
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

//* Utilizar rutas dinamicas en un componente que utiliza getStaticProps
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
// getStaticPaths solo se ejecuta en el build, en produccion solo una vez
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  // crear array de undefined, luego transformarlo a string, ya que params debe ser string
  // array de 1 a 151, para los id del poke API
  const pokemons151: string[] = [...Array( 151 )].map(
    (value, index) => `${index + 1}`
  );

  return {
    // Numero de paginas que se van a generar estaticamente
    // las paths deben ser un array de objetos

    paths: pokemons151.map((id) => ({
      params: { id }, // deben nombrarse igual que la pg. dinamica y deben ser string
    })),

    // fallback ->  blocking | boolean -> si es blocking se renderiza, si es false muestra 404
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // ctx -> contexto, recibe los params de getStaticPaths automaticamente
  // casting con 'as'
  const { id } = params as { id: string };

  return {
    props: {
      pokemon: await getPokemonInfo(id),
    },
  };
};

export default PokemonPage;
