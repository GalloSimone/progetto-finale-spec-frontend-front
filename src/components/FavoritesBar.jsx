import { useFavorites } from "../context/FavoritesContext";
import { Link,useNavigate } from "react-router-dom";

export default function FavoritesBar() {
  const { favorites } = useFavorites();
const navigate=useNavigate();
const handleNavigate=()=>{
navigate('/')
}
const handleNavigateCompare=()=>{
  navigate('/compare')
  }
  return (
    <div className="favorites-bar text-white p-2 d-flex align-items-center justify-content-between flex-wrap" style={{ backgroundColor: "rgba(204, 0, 0, 0.7)" }}>
      <div className="d-flex align-items-center flex-wrap">
        <strong className="me-2">Preferiti:</strong>
        {favorites.length === 0 ? (
          <span>Nessun preferito</span>
        ) : (
          favorites.map((id) => (
            <Link key={id} to={`/${id}`} className="btn btn-sm btn-outline-light me-2 mb-2">
              🎮 {id}
            </Link>
          ))
        )}
      </div>
      <div className="d-flex align-items-center gap-2 mt-2 mt-md-0">
        <button className="btn btn-outline-light" onClick={handleNavigate}>🏠</button>
        <button className="btn btn-outline-light" onClick={handleNavigateCompare}>vai a comparazione</button>
      </div>
    </div>
  );
}