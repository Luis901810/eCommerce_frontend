import './App.css'
import { Routes, Route } from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Catalogue from './views/Catalogue/Catalogue'
import Login from './components/Login/Login'
import ShoeDetail from './components/ShoeDetail/ShoeDetail'
import ShoppingCart from './components/ShoppingCart/ShoppingCart'
import NavBar from './components/NavBar/NavBar'
import Register from './components/Login/Register'
import UserProfile from './components/UserProfile/UserProfile'
import FormShoe from './components/Form/FormShoe/FormShoe'
import Dashboard from './views/Dashboard/Dashboard'

function App() {
  const currentPath = window.location.pathname

  const isAdminRoute = currentPath.startsWith('/Admin')
  return (
    <div className='App'>
      {!isAdminRoute? <NavBar />:null}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/Catalogue' element={<Catalogue />} />
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Login/Register' element={<Register />}></Route>
        <Route path='/Detail/:idShoe' element={<ShoeDetail />} />
        <Route path='/ShoppingCart' element={<ShoppingCart />}></Route>
        <Route path='/UserProfile/' element={<UserProfile />}></Route>
        <Route path='/FormShoe' element={<FormShoe />}></Route>
        <Route path='/Admin' element={<Dashboard/>}></Route>
      </Routes>
    </div>
  )
}

export default App
