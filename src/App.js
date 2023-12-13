import './App.css';
import { Routes, Route } from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Catalogue from './Components/Catalogue/Catalogue';
import Login from './Components/Login/Login';
import ShoeDetail from './Components/ShoeDetail/ShoeDetail';
import ShoppingCart from './Components/ShoppingCart/ShoppingCart';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/Catalogue' element={<Catalogue />} />
        <Route path='/Login' element={<Login />} /> 
        <Route path='/Detail/:id' element={<ShoeDetail />} />
        <Route path='/ShoppingCart' element={<ShoppingCart />} />
      </Routes>

    </div> 
  );
}

export default App;
