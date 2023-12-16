import './App.css';
import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Catalogue from './views/Catalogue/Catalogue';
import Login from './components/Login/Login';
import ShoeDetail from './components/ShoeDetail/ShoeDetail';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import NavBar from './components/NavBar/NavBar';
import Register from './components/Login/Register/Register';
import UserProfile from './components/UserProfile/UserProfile';
import { AuthProvider } from './components/AuthContext/AuthContext';

function App() {
  return (
    <div className="App">
       <AuthProvider>
          <NavBar/>
  
      <Routes>
        <Route path='/'element={<Landing/>}/>
        
        <Route path='/Catalogue' element={<Catalogue/>}/>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/Login/Register' element={<Register/>}></Route>
        <Route path='/Detail/:idShoe'element={<ShoeDetail/>}/>
        <Route path='/ShoppingCart' element={<ShoppingCart/>} ></Route>
        <Route path='/UserProfile/:idUser' element={<UserProfile/>} ></Route>

      </Routes>
      </AuthProvider>

    </div>
  );
}

export default App;
