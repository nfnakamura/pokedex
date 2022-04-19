import React, { useState } from 'react'
import { useGet } from "./hooks/useGet";
import { styles } from './styles/styles';


const Pokedex = () => {   
    
    
  const [nombrePokemon, setNombrePokemon] = useState({
        nombre:"charmander"
      })


  const [pokemon, errorPokemon, loadingPokemon, isLoad , getPokemon] = useGet(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon.nombre.toLowerCase()}`)    
     
  const handleChange = (evento) => {        
    setNombrePokemon({
        ...nombrePokemon,
       [evento.target.name]: evento.target.value,
    })  
    
    return (evento.target.value);
    
};

  const handleSubmit = (evento) => {
    evento.preventDefault();
 
    const inputPokemon = createFormData();    

     if(inputPokemon.get('nombre')!==""){

        getPokemon();

    }else{      

         getPokemon({
           ...pokemon,
           error: true,
         });  
     
    }     

};

    const createFormData = () => {
        const inputPokemon = new FormData();
        inputPokemon.append("nombre", nombrePokemon.nombre);
        return inputPokemon;
    }

    function nombrepokemonCapital (){  

        const nombre = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);  
        return nombre;
       
     };
   
    return (
    <>

    <div style={styles.container}>

    <h1>Pokedex</h1>

    <div style={styles.pokedex}>

        {loadingPokemon &&
              <div style={styles.card}>
                <div style={styles.cardDetails}>
                  <img src='' alt='Loading...' style={styles.imagenDesconocido}></img>                   
                </div>     
              </div>               
       }

        
        <div>
          {isLoad && !loadingPokemon && !errorPokemon ? 
            <div style={styles.card}>

              <h2> {nombrepokemonCapital()}</h2>
              <div style={styles.cardDetails}>
                <img style={styles.imagenPoke} alt='Imagen Pokemon' src={pokemon.sprites.front_default}></img>
                <div>
                  <p><span style={styles.spanStats}>Hp:</span> {pokemon.stats[0].base_stat}</p>
                  <p><span style={styles.spanStats}>Attack:</span> {pokemon.stats[1].base_stat}</p>
                  <p><span style={styles.spanStats}>Defense:</span> {pokemon.stats[2].base_stat} </p>
                  <p><span style={styles.spanStats}>Special Attack:</span> {pokemon.stats[3].base_stat} </p>
                  <p><span style={styles.spanStats}>Special Defense:</span> {pokemon.stats[4].base_stat} </p>
                  <p><span style={styles.spanStats}>Speed:</span> {pokemon.stats[5].base_stat} </p>
                </div>              
              </div>              
           </div>            
           : 
              <div style={styles.card}>
                <h2> Pokemon no encontrado</h2>
                <div style={styles.cardDetails}>
                  <img src='https://images.hive.blog/0x0/https://cdn.steemitimages.com/DQmbHKnboQUxh3m9mT6Yy2oQfSww9VEyR6ZPRoW69Ps2KDZ/012_question_mark.png' alt='Pokemon no encontrado' style={styles.imagenDesconocido}></img>                   
                </div>     
              </div>           
          }
         
        </div>

          <div>
            <input style={styles.input}
             type='text'
             placeholder='Buscá tu pokemon'
             name='nombre'
             onChange={handleChange}
             value={nombrePokemon.nombre}
             
            >
            </input> 
        
            <input style={styles.boton}
             type='submit'
             value='Buscar'
             onClick={handleSubmit}
            >
            </input>
          </div>

        </div>

    </div>
        
    </>
  )
}

export default Pokedex