import React, { useState } from 'react';
import axios from 'axios';



const styles = {
  container: {     
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'black',

    background: '#fffff0',
    padding: '5px'
    
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: '5px',
    borderStyle: 'double',
    borderColor: 'black',
    padding: '20px',
    background: '#fffff0',
    
  },

  cardDetails: {
     display:'flex',
     flexDirection:'row',

    }
  ,
  pokedex: {
    display: 'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'black',
    padding: '20px',
    background: '#ff0000',
        

  },
  imagenPoke: {
    display:'flex',
    width:'100%', 
    height:'100%',
    marginTop:"10%"   
  },

  input: {
    width: '95%',
    margin: '2%',
    padding: '2%', 
    marginTop: '5%'         
  },

  boton: {
    marginTop: '5%',
    margin: '2%',
    padding: '2%',
    width: '100%'
  },

  imagenDesconocido:{
    display:'flex',
    width:'230px', 
    padding: '5%',
    marginTop:'2%'
  },

  spanStats:{
    fontWeight: "bold",
  },
    
  
}

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
    const [loading, setLoading] = useState(true);

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

      const pokemon = await axios(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon.nombre.toLowerCase()}`)
      
      
      setPokemon(pokemon.data);
        
      setError(false);
      setLoading(false);
      setLoad(true);
       
           
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
          {isLoad && !error ?
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

export default App