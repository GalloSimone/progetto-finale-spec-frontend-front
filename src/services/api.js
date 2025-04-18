const BASE_URL ='http://localhost:3001/videogames'

 const getAllVideogames = async()=>{
    try {
        const response= await fetch(`${BASE_URL}`);
        if(!response.ok){
            throw new Error(`Errore HTTP: ${response.status}`)
        } 
        return await response.json()
        
    } catch (error) {
        console.error("Error fetching tasks:",error)
        return []
    }
}

const getVideogameById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching videogame:", error);
    return {};
  }
};

  
export {getAllVideogames,getVideogameById};