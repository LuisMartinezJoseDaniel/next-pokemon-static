import { Container, Text, Image } from '@nextui-org/react';
import React from 'react'

export const NoFavorites = () => {
  return (
    <Container
      display="flex"
      css={{
        flexDirection: "column",
        height: "calc(100vh - 100px)",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <Text h1>No hay favoritos</Text>
      <Image
        alt="Pokemon"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg`}
        width={150}
        height={150}
        css={{ opacity: 0.1 }}
      />
    </Container>
  );
}
