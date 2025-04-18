import { createContext, useState, useContext,  } from 'react';

const GlobalContext=createContext();

export const useGlobalContext=()=>{
    return useContext(GlobalContext);
};
export const GlobalProvider =({children})=>{
    const[videgames,setVideogames]=useState([]);
    return(
       < GlobalContext.Provider value={{videgames,setVideogames}}>
       {children}
       </GlobalContext.Provider>
    )
}