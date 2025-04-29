import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getVideogameById } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";
import { useCompare } from "../context/CompareContext";

export default function DetailPage() {
  const [videogame, setVideogame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { addToCompare } = useCompare();

  useEffect(() => {
    const fetchVideogame = async () => {
      try {
        const data = await getVideogameById(id);
        console.log(data);
        if (data) {
          setVideogame(data);
        } else {
          setError("Videogame non trovato.");
        }
      } catch (err) {
        setError("Errore nel recupero del videogioco.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideogame();
  }, [id]);

  if (loading) return <div>Caricamento...</div>;
  if (error) return <div>{error}</div>;
  if (!videogame) return <div>Il videogioco non è disponibile</div>;

  const toggleFavorite = () => {
    isFavorite(videogame.id) ? removeFavorite(videogame.id) : addFavorite(videogame.id);
  };

  return (
    <>
      <h1 className="text-center">{videogame.videogame.title}</h1>
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="card shadow-lg" style={{ width: "25rem" }}>
            <img
              src={videogame.videogame.image}
              className="card-img-top"
              alt={videogame.title}
            />
            <div className="card-body">
              <h5 className="card-title">{videogame.videogame.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{videogame.category}</h6>
              <p className="card-text">{videogame.videogame.releaseYear}</p>
              <p className="card-text">{videogame.videogame.description}</p>
              <button
                className="btn w-100 text-white" style={{ backgroundColor: "rgba(204, 0, 0, 0.7)" }}
                onClick={() => {
                  addToCompare(videogame.videogame.id);
                  setTimeout(() => navigate("/compare"), 100);
                }}
              >
                Confronta
              </button>
              <button
                className="btn btn-light mt-2 w-100"
                onClick={toggleFavorite}
              >
                {isFavorite(videogame.id) ? "💔 Rimuovi dai preferiti" : "❤️ Aggiungi ai preferiti"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
