import axios from "axios";

// crear cliente axios, solo para peticiones, no es el API de next
const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
} );

export default pokeApi;