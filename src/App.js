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
import DetailUsers from './components/Dashboard/DetailUsers'
import UpdateUser from './components/Dashboard/UpdateUser'
import UpdateShoe from './components/Dashboard/UpdateShoe'

function App() {

  const excludedRoutes = ['Admin','UpdateUser',"UpdateShoe"]
  const currentPath = window.location.pathname.split("/")

  const renderNavbar = !excludedRoutes.includes(currentPath[1])
  
  return (
    <div className='App'>
      {renderNavbar? <NavBar />:null}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/Catalogue' element={<Catalogue />} />
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Login/Register' element={<Register />}></Route>
        <Route path='/Detail/:idShoe' element={<ShoeDetail />} />
        <Route path='/ShoppingCart' element={<ShoppingCart />}></Route>
        <Route path='/UserProfile/' element={<UserProfile />}></Route>
        <Route path='/CreateShoe' element={<FormShoe />}></Route>
        <Route path="/UpdateShoe/:id" element={<UpdateShoe/>} />

        <Route path='/Admin' element={<Dashboard/>}></Route>
        <Route path="/UsersDetail/:id" element={<DetailUsers/>} />
        <Route path="/UpdateUser/:id" element={<UpdateUser/>} />
      </Routes>
    </div>
  )
}

export default App
