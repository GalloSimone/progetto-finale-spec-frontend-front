import { useEffect, useState } from "react";
import { useCompare } from "../context/CompareContext";
import { getVideogameById } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function ComparePage() {
  const { compareIds, clearCompare } = useCompare();
  const [games, setGames] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchGames = async () => {
      if (compareIds.length === 2) {
        const data = await Promise.all(compareIds.map(id => getVideogameById(id)));
        setGames(data);
      }
    };
    fetchGames();
  }, [compareIds]);

  // Reset delle games se non ci sono ID da confrontare
  useEffect(() => {
    if (compareIds.length === 0) {
      setGames([]);
    }
  }, [compareIds]);

  if (games.length < 2) {
    return (
      <div className="container p-4">
        <h1>Confronto Giochi</h1>
        <p>⚠️ Devi selezionare almeno due giochi per avviare il confronto.</p>
      </div>
    );
  }

  const [game1, game2] = games;

  const highlight = (v1, v2) => v1 !== v2 ? { color: 'red', fontWeight: 'bold' } : {};

  const handleClearCompare = () => {
    clearCompare();  
    setGames([]); 
      navigate('/');
     
  };
    
  

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Confronto Giochi</h1>
        <style>
          {`
            .custom-hover-btn:hover {
              background-color: rgba(204, 0, 0, 0.7);
              color: white;
            }
          `}
        </style>
        <button className="btn custom-hover-btn" onClick={handleClearCompare}>❌ Svuota confronto</button>
      </div>

      <div className="row">
        {[game1, game2].map((game, idx) => (
          <div key={idx} className="col-md-6 mb-4 d-flex">
            <div className="card shadow w-60 d-flex flex-column">
              <img
                src={game.videogame.image}
                className="card-img-top"
                style={{
                  height: "400px",
                  objectFit: "cover"
                }}
                alt={game.videogame.title}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{game.videogame.title}</h5>
                <p className="card-text" style={highlight(game.videogame.category, games[1 - idx].videogame.category)}>
                  <strong>Categoria:</strong> {game.videogame.category}
                </p>
                <p className="card-text" style={highlight(game.videogame.releaseYear, games[1 - idx].videogame.releaseYear)}>
                  <strong>Anno:</strong> {game.videogame.releaseYear}
                </p>
                <p className="card-text" style={highlight(game.videogame.price, games[1 - idx].videogame.price)}>
                  <strong>Prezzo:</strong> {game.videogame.price}€
                </p>
                <p className="card-text mt-auto">
                  <strong>Descrizione:</strong> {game.videogame.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
