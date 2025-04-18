import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import { CompareProvider } from './context/CompareContext';
import { GlobalProvider } from './context/GlobalContext';
import { FavoritesProvider } from './context/FavoritesContext';
import FavoritesBar from './components/FavoritesBar';
import ComparePage from './pages/ComparePage';
function App(){
    return (
        <BrowserRouter>
        <CompareProvider> 
           <GlobalProvider>  
           <FavoritesProvider> 
            <FavoritesBar/>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/:id' element={<DetailPage />} />
              <Route path='compare' element={<ComparePage/>}></Route>
            </Routes>
          </FavoritesProvider>
          </GlobalProvider>
          </CompareProvider> 
        </BrowserRouter>
      );
}
export default App;