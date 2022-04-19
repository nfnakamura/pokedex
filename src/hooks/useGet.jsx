import { useEffect, useState } from "react";
import axios from "axios";


export const useGet = (url) =>{

    const [data, setData] = useState({

        loading: true,
        error: null,
        data: null,
        isLoad: false,

    })


    useEffect(() => {
        
        getPokemon(
        );

    }, [])

    
    const getPokemon = async () =>{

        try {
            const res = await axios(url)
                        
            setData({
                loading: false,
                error: null ,
                data: res.data,
                isLoad: true,

            });
                              
                      
          } catch (error) {

            setData({
                loading: false,
                error: error,
                data: null,
                isLoad: false, 

            })           
                 console.log("ACA HAY ALGO MAL");      
          }
      
    };
         return[data.data, data.loading, data.error, data.isLoad , getPokemon()];
};