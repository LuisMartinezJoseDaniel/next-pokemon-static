import { FC } from "react"
import Head from "next/head"
import { useRouter } from 'next/router';
import { Navbar } from '../ui/Navbar';

interface LayoutProps {
  children: React.ReactNode,
  title?: string;
}

// Obtener del window el path absoluto
// utilizado para obtener el banner para el SEO en social media
const origin = typeof window === 'undefined' ? '' :window.location.origin;

export const Layout: FC<LayoutProps> = ( {children, title} ) => {
 
 
  
  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>

        <meta name="author" content="Jose Daniel" />
        <meta
          name="description"
          content={`Información sobre el pokemon - ${title}`}
        />
        <meta name="keywords" content={`${title}, Pokemon, pokedex`} />
        {/** Compartir en redes sociales  */}
        <meta
          property="og:title"
          content={`Información sobre el pokemon ${title}`}
        />
        <meta
          property="og:description"
          content={`Esta es la página sobre ${title}`}
        />
        {/* banner -> path statico */}
        <meta
          property="og:image"
          content={`${origin}/img/banner.png`}
        />
      </Head>
      {/* Navbar */}
      <Navbar />
      <main style={{ padding: "0 2rem" }}>{children}</main>
    </>
  );
}
