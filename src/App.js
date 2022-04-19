import axios from 'axios';
import React, { useState } from 'react'
import { styles } from './styles/styles';


const App = () => {  
  const [isLoad, setLoad] = useState(false);
 

   const [pokemon, setPokemon]= useState({
     nombre:"",
     hp:"",
     attack:"",
     defense:"",
     specialAttack:"",
     specialDefense:"",
     speed:"",

   })

   const [error, setError] = useState(false);
   const [loading, setLoading] = useState(false);

   const [nombrePokemon, setNombrePokemon] = useState({
     nombre:""
   })

const handleChange = (evento) => {
    
     setNombrePokemon({
         ...nombrePokemon,
        [evento.target.name]: evento.target.value,
     })

          
     return (evento.target.value);
   

    }

 const createFormData = () => {

   const inputPokemon = new FormData();

   inputPokemon.append("nombre", nombrePokemon.nombre);

   return inputPokemon;
  }


  const obternerDatos = async () => {
   try {

    setLoading(true);
     const pokemon = await axios(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon.nombre.toLowerCase()}`)
     
     setPokemon(pokemon.data);       
     setError(false);     
     setLoad(true);
     setLoading(false)
      
          
     return (pokemon.data)
     
   } catch (error) {
     
     setError(true);
     setLoading(false);    
     
     return error;
     
   }



};  
 

  const handleSubmit = (evento) => {    

   evento.preventDefault(); 
  
   const inputPokemon = createFormData();
 

   if(inputPokemon.get('nombre')!==""){

     obternerDatos(); 
        

     
   }else{

      setError(true);
   }

      
      
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
      
        <div>
         {isLoad && !error && !loading ? 
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
          : error && !loading ?
             <div style={styles.card}>
               <h2>¡Ups, pokemon no encontrado!</h2>
               <div style={styles.cardDetails}>
                 <img src='https://images.hive.blog/0x0/https://cdn.steemitimages.com/DQmbHKnboQUxh3m9mT6Yy2oQfSww9VEyR6ZPRoW69Ps2KDZ/012_question_mark.png' alt='Pokemon no encontrado' style={styles.imagenDesconocido}></img>                   
               </div>     
             </div>  
         : !loading && !error & !isLoad ?

            <div style={styles.card}>
               <h2> Buscador</h2>
               <div style={styles.cardImagenes}>
                 <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png' alt='PokemonLogo' style={styles.imagenBuscador}></img>                   
                 <img src='https://cdn-icons-png.flaticon.com/512/2052/2052715.png' alt='Lupa' style={styles.imagenLupa}></img>                   
             
               </div>     
             </div>  
                               
         : loading && 
         <div style={styles.card}>
                <div style={styles.cardDetails}>
                  <img src='https://c.tenor.com/e6J4X97EZkIAAAAi/ash-now.gif' alt='Loading...' style={styles.imagenLoading}></img>                   
                  
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

export default App