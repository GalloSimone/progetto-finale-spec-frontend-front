import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { getVideogameById } from "../services/api";
import { useCompare } from "../context/CompareContext";

export default function DetailPage() {
  const [videogame, setVideogame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCompare,compareIds } = useCompare();

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

  const handleCompare = () => {
    const idToAdd = videogame.videogame.id;
  
    // Controlla se il gioco è già presente
    if (compareIds.includes(idToAdd)) {
      navigate("/compare");
      return;
    }
  
    // Controlla se aggiungendo questo gioco arrivi a 2
    if (compareIds.length + 1 === 2) {
      addToCompare(idToAdd);
      navigate("/compare");
    } else {
      addToCompare(idToAdd);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };
  

  return (
    <>
      <h1 className="text-center">{videogame.videogame.title}</h1>
      <div className="container mt-4">
      {showAlert && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            ⚠️ Per confrontare devi aggiungere almeno un altro gioco!
            <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
          </div>
        )}
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
                onClick={handleCompare}
              >
                Confronta
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
