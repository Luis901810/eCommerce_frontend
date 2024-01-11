import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
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
import Successes from './components/ShoppingCart/Successes/Successes'
import Failures from './components/ShoppingCart/Failures/Failures'
import { useSelector } from 'react-redux'
function App() {
  const  user = useSelector(state => state.currentUser)
  const excludedRoutes = ['Admin','UpdateUser',"UpdateShoe", "CreateShoe"]
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
        <Route path='/CreateShoe' element={user.roleId === "1e9f34d0-ed48-45fc-94f4-5cbca35b662b"?<FormShoe />:<Navigate to="/" />}></Route>
        <Route path="/UpdateShoe/:id" element={user.roleId === "1e9f34d0-ed48-45fc-94f4-5cbca35b662b"?<UpdateShoe/>:<Navigate to="/" />} />

        <Route path='/Admin' element={user.roleId === "1e9f34d0-ed48-45fc-94f4-5cbca35b662b"?<Dashboard/>:<Navigate to="/" />}></Route>
        <Route path="/UsersDetail/:id" element={<DetailUsers/>} />
        <Route path="/UpdateUser/:id" element={user.roleId === "1e9f34d0-ed48-45fc-94f4-5cbca35b662b"?<UpdateUser/>:<Navigate to="/" />} />

        <Route path='/UserProfile/:idUser' element={<UserProfile />}></Route>
        <Route path='/FormShoe' element={user.roleId === "1e9f34d0-ed48-45fc-94f4-5cbca35b662b"?<FormShoe />:<Navigate to="/" />}></Route>
        <Route path='/Successes'element={<Successes/>}/>
        <Route path='/Failures'element={<Failures/>}/>

      </Routes>
    </div>
  )
}

export default App
