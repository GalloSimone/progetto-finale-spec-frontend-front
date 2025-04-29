import { createContext, useContext, useEffect, useState } from "react";

const CompareContext = createContext();

export function CompareProvider({ children }) {

  const [compareIds, setCompareIds] = useState(() => {
    const saved = localStorage.getItem("compareIds");
    return saved ? JSON.parse(saved) : [];
  });

  
  useEffect(() => {
    localStorage.setItem("compareIds", JSON.stringify(compareIds));
  }, [compareIds]);

  const addToCompare = (id) => {
    if (!id) return;
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev;
      if (prev.length === 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const removeFromCompare = (id) => {
    setCompareIds((prev) => prev.filter((gid) => gid !== id));
  };

  const clearCompare = () => {
    setCompareIds([]);
    localStorage.removeItem("compareIds"); 
  };

  return (
    <CompareContext.Provider
      value={{ compareIds, addToCompare, removeFromCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  return useContext(CompareContext);
}
