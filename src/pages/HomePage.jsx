import { useState, useEffect } from "react";
import { getAllVideogames } from '../services/api';
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useCompare } from "../context/CompareContext";

export default function Homepage({}) {
  const [videogames, setVideogames] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [input, setInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const { addToCompare } = useCompare();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchVideogames = async () => {
      const data = await getAllVideogames();
      setVideogames(data);
    };
    fetchVideogames();
  }, []);  

  const toggleFavorite = (id) => {
    isFavorite(id) ? removeFavorite(id) : addFavorite(id);
  };
  const filteredGames = videogames
  .filter((videogame) =>
    videogame.title.toLowerCase().includes(input.toLowerCase())
  )
  .filter(
    (videogame) =>
      selectedCategory === "" || videogame.category === selectedCategory
  )
  .sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    return sortOrder === 'asc' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
  });
  return (
    <>
      <div className="container p-4">
        <div className="d-flex flex-column flex-sm-row justify-content-center mb-4" style={{ gap: '1rem' }}>
          <input
            className="form-control mb-3 mb-sm-0"
            style={{ width: '100%', maxWidth: '300px', border: '3px solid grey' }}
            type="text"
            placeholder="Cerca titolo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <select
            className="form-control mb-3 mb-sm-0"
            style={{ width: '100%', maxWidth: '300px', border: '3px solid grey' }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Tutte le categorie</option>
            <option value="RPG">RPG</option>
            <option value="FPS">FPS</option>
            <option value="platform 3D">platform 3D</option>
            <option value="Survival Horror.">Survival Horror.</option>
            <option value="Battle Royale">Battle Royale</option>
            <option value="JRPG">JRPG</option>
            <option value="Simulazione di corse">Simulazione di corse</option>
          </select>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
          >
            Ordina {sortOrder === 'asc' ? 'Z → A' : 'A → Z'}
          </button>
        </div>

        <div style={{ backgroundColor: 'rgba(204, 0, 0, 0.7)', padding: '3rem', borderRadius: '10px' }}> 
          <h1 className="mb-4 text-center text-light"> Videogiochi:</h1>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
          {filteredGames.length === 0 ? (
          <div className="col-12">
         <h2 className=" text-white my-4 text-start"
        style={{
        whiteSpace: 'nowrap', 
        marginLeft:'130%',
        marginBottom:'50%'
   }}
     >Giochi non trovati. cambia la ricerca🔍</h2>
     </div>
) : (
      filteredGames.map((videogame, index) => (
<div className="col" key={index}>
<div className="card h-100">
<div className="card-body d-flex flex-column justify-content-between">
 <div>
 <h5 className="card-title">{videogame.title}</h5>
 <h6 className="card-subtitle mb-2 text-body-secondary">
  {videogame.category}
 </h6>
</div>
 <div className="mt-3">
<button
 className="btn btn-secondary mb-2 w-100"
 style={{ borderRadius: '20px' }}
 onClick={() => navigate(`/${videogame.id}`)}
 >
 Vai al dettaglio
</button>
 <button
  className="btn btn-light w-100"
  style={{
    borderRadius: '20px',
    height: '45px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    transition: 'all 0.2s ease',
    fontSize: '0.9rem',
  }}
  onClick={(e) => {
    e.preventDefault(); 
    toggleFavorite(videogame.id);
  }}
>
  {isFavorite(videogame.id)
    ? "💔 Rimuovi dai preferiti"
    : "❤️ Aggiungi ai preferiti"}
</button>
                        <button className="btn w-100" style={{ backgroundColor: "rgba(204, 0, 0, 0.7)" }} onClick={() => addToCompare(videogame.id)}>
                          ➕ Confronta
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
