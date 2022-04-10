import React, { useEffect, useState } from 'react'
import PokemonThumb from './components/PokemonThumnail'


const App = () => {

   const[allPokemons, setAllPokemons] = useState([])
   const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

  const getAllPokemons = async () => {
    // realizamos la petición y la pasamos a formato JSON
    const res = await fetch(loadMore)
    const data = await res.json()
    
    setLoadMore(data.next)

    function createPokemonObject(results)  {
      // dentro del array results que contiene toda la data hacemos una iteración con forEach
      results.forEach( async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data =  await res.json()
      // el spread operator constituye un array alojando todos los pokemons   
        setAllPokemons( currentList => [...currentList, data])
      // await con sort nos permite que cada pokemon esté ordenado por su id, logrando que
      // si un pokemon carga antes que otro anterior, logren organizarse nuevamente
        await allPokemons.sort((a, b) => a.id - b.id)
      })
    }
    createPokemonObject(data.results)
  }

 useEffect(() => {
  getAllPokemons()
 }, [])

  return (
    <div className="app-contaner">
      <h1>The original Pokemons</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map( (pokemonStats, index) => 
            <PokemonThumb
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
            />)}
          
        </div>
          <button className="load-more" onClick={() => getAllPokemons()}>Load more</button>
      </div>
    </div>
  );
}

export default App;