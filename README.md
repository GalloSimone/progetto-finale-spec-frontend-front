🧱 Milestone 1 – Setup iniziale
Obiettivo: Prepara ambiente backend e struttura dati
1. Clona il repo backend: git clone https://github.com/boolean-it/progetto-finale-spec-frontend-back
2. Entra nella cartella del progetto e installa le dipendenze: npm install
3. Apri il file types.ts e crea il tipo Videogame:
ts
CopiaModifica
export type Videogame = {
  title: string;
  category: string;
  platform: string;
  developer: string;
  releaseYear: number;
  rating: number;
  price: number;
  image: string;
  description: string;
};
1. Avvia il backend: npm run dev
2. Popola database/videogames.json con almeno 10 videogiochi
3. Testa che le API funzionino:
    * GET /videogames
    * GET /videogames?search=...
    * GET /videogames?category=...
    * GET /videogames/:id
✅ Checkpoint: se vedi correttamente i dati, puoi passare alla prossima milestone.

⚙️ Milestone 2 – Setup frontend e struttura base
Obiettivo: Creare progetto React e organizzare file
1. Crea progetto con Vite (oppure CRA): npm create vite@latest → React + JavaScript
2. Installa Bootstrap (opzionale ma consigliato)
3. Crea le cartelle base:
css
CopiaModifica
src/
 ├─ components/
 ├─ pages/
 ├─ servicesapi.js
 ├─ context/
 └─ App.jsx
1. Crea file api.js in services/ con fetch base:
js
CopiaModifica
const BASE_URL = 'http://localhost:3000';

export async function getVideogames(query = '') {
  const res = await fetch(`${BASE_URL}/videogames${query}`);
  return res.json();
}

export async function getVideogameById(id) {
  const res = await fetch(`${BASE_URL}/videogames/${id}`);
  return res.json();
}
✅ Checkpoint: se riesci a vedere i dati con getVideogames(), sei pronto per la UI.

📄 Milestone 3 – Lista giochi + ricerca e filtro
Obiettivo: Mostrare tutti i giochi, con barra ricerca e filtro categoria
1. Crea HomePage.jsx
2. Usa useEffect per chiamare getVideogames()
3. Mostra titolo e categoria in lista
4. Aggiungi:
    * Input per cercare nei titoli
    * Select per filtrare per category
    * (Opzionale) Select per ordinamento A-Z e Z-A
✅ Checkpoint: se riesci a cercare e filtrare, procedi!

🔍 Milestone 4 – Pagina di dettaglio
Obiettivo: Visualizzare tutte le info di un singolo gioco
1. Crea GameDetailPage.jsx
2. Aggiungi route con react-router-dom tipo /videogame/:id
3. Usa getVideogameById(id) e mostra tutte le proprietà
4. Aggiungi un pulsante "Confronta" e uno "❤️ Preferito"
✅ Checkpoint: se ogni gioco ha una sua pagina, sei pronto per i preferiti!

❤️ Milestone 5 – Sistema preferiti
Obiettivo: Aggiungi e rimuovi preferiti, accessibili ovunque
1. Crea un contesto React FavoritesContext.jsx
2. Gestisci array di ID dei giochi preferiti
3. Aggiungi pulsante "❤️" alla lista e ai dettagli
4. Crea componente FavoritesBar visibile sempre con i preferiti
5. Mostra i preferiti anche nella Home o in una pagina dedicata
✅ Checkpoint: se puoi aggiungere/rimuovere giochi ai preferiti ovunque → ottimo!

🔀 Milestone 6 – Comparatore
Obiettivo: Confrontare 2 giochi fianco a fianco
1. Crea pagina ComparePage.jsx
2. Permetti all’utente di aggiungere 2 giochi al comparatore (da lista o dettagli)
3. Mostra i 2 giochi con le proprietà in tabella o colonne affiancate
4. Mostra differenze (es. evidenzia valori diversi)
✅ Checkpoint: se puoi scegliere 2 giochi e vedere le loro info affiancate → missione compiuta.

📦 Milestone 7 – Preparazione consegna
Obiettivo: Controlli finali + push completo
1. Assicurati che:
    * ci siano almeno 10 videogiochi
    * ci sia il file types.ts
    * tutte le funzionalità minime siano presenti
2. Fai un bel git add ., git commit, git push 🧼
3. Controlla il readme e linka la repo correttamente