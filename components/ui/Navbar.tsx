import { Button, Link, Spacer, Text, useTheme } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";
export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        backgroundColor: theme?.colors.gray100.value,
      }}
    >
      {/* passHref-> pasa el href al Link de NextUI y muestra el enlace debajo en la pantalla(comportamiento comun del a) */}
      <NextLink href={"/"} passHref>
        <Link style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
            alt="Icono de la app"
            width={70}
            height={70}
          />
          <Text color="white" h2>
            P
          </Text>
          <Text color="white" h3>
            ókemon
          </Text>
        </Link>
      </NextLink>

      <Spacer css={{ flex: 1 }} />
      <NextLink href={"/favorites"} passHref>
        <Link>
          <Text color="white" h3 css={{ cursor: "pointer" }}>
            Favoritos
          </Text>
        </Link>
      </NextLink>
    </div>
  );
};
