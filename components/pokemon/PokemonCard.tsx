import { Grid, Card, Row, Text } from "@nextui-org/react";
import { FC } from "react";
import { SmallPokemon } from "../../interfaces";
import { useRouter } from "next/router";

interface PokemonCardProps {
  pokemon: SmallPokemon;
}

export const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  const { id, name, img } = pokemon;
  const router = useRouter();
  const onClick = () => {
    router.push(`/name/${name}`);
  };

  return (
    <Grid xs={12} sm={6} md={2} xl={1} key={id}>
      <Card isHoverable={true} isPressable onClick={onClick}>
        <Card.Body>
          <Card.Image src={img} width={"100%"} height={140} />
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text transform="capitalize"> {name} </Text>
            <Text> {id} </Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
