import { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
 
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (id) => {
    if (!favorites.includes(id)) {
      setFavorites([...favorites, id]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((favId) => favId !== id));
  };

  const isFavorite = (id) => favorites.includes(id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
