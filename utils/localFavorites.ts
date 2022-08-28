// NextJS se ejecuta del lado del cliente y del servidor
// para comprobar en que lado ejecuta el codigo -> typeof window => window | undefined
const toggleFavorite = ( id: number ) =>{
  
  let favorites : number[] = JSON.parse(localStorage.getItem('favorites') || '[]') ;

  if ( favorites.includes( id ) ) {
    favorites = favorites.filter(pokeId => pokeId !== id);
  } else {
    favorites.push( id );
  }

  localStorage.setItem( 'favorites', JSON.stringify(favorites) );
}

const existInFavorites = ( id: number ): boolean => {
  if ( !windowExists() ) {
    return false;
  }
  
  const favorites: number[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  
  return favorites.includes( id ); 
  

};

const windowExists = () => typeof window !== 'undefined';

const pokemons = (): number[] => {
  
  const favorites: number[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

  return favorites;
}

const localFavorites = {
  toggleFavorite,
  existInFavorites,
  windowExists,
  pokemons,
};

export default localFavorites;