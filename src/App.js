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
import UpdateOrder from './components/Dashboard/UpdateOrder'
import CreateUser from './components/Dashboard/CreateUser'
import EditProfile from './components/UserProfile/UserOptions/EditProfile/EditProfile'
import PurchaseHistory from './components/UserProfile/UserOptions/PurchaseHistory/PurchaseHistory'
import { useEffect } from 'react'
import UserReviews from './components/UserProfile/UserOptions/UserReviews/UserReviews'
import { useAuth } from './contexts/AuthContext'
import { useState } from 'react'

function App() {
  // const  user = useSelector(state => state.currentUser)
  const{user} = useAuth()
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser'))!== null
    ? JSON.parse(localStorage.getItem('currentUser'))
    : {
      UserRol: {
        rol: "Invitado"
      }
      })
  
  const adminId = 'Administrador'

  useEffect(()=>{
    if(JSON.parse(localStorage.getItem('currentUser'))!==null){
    setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))}
  },[user])

  return (
    <div className='App'>
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/Catalogue' element={<Catalogue />} />
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Login/Register' element={<Register />}></Route>
        <Route path='/Detail/:idShoe' element={<ShoeDetail />} />
        <Route path='/ShoppingCart' element={<ShoppingCart />}></Route>

        <Route path='/UserProfile/' element={<UserProfile />}></Route>
        <Route path='/CreateShoe' element={currentUser.UserRol.rol === adminId?<FormShoe />:<Navigate to="/" />}></Route>
        <Route path="/UpdateShoe/:id" element={currentUser.UserRol.rol === adminId?<UpdateShoe/>:<Navigate to="/" />} />

        <Route path='/Admin' element={currentUser.UserRol.rol === adminId?<Dashboard/>:<Navigate to="/" />}></Route>
        <Route path="/CreateUser" element={currentUser.UserRol.rol === adminId?<CreateUser/>:<Navigate to="/" />} />
        <Route path="/UpdateUser/:id" element={currentUser.UserRol.rol === adminId?<UpdateUser/>:<Navigate to="/" />} />
        <Route path="/UpdateOrder/:id" element={currentUser.UserRol.rol === adminId?<UpdateOrder/>:<Navigate to="/" />} />

        <Route path='/UserReviews/:UserEmail' element={<UserReviews/>} />
        <Route path='/FormShoe' element={currentUser.UserRol.rol === adminId?<FormShoe />:<Navigate to="/" />}></Route>
        <Route path='/UserProfile/:UserEmail' element={<UserProfile />}/>
        <Route path='/EditProfile/:UserEmail' element={<EditProfile/>}/>
        <Route path='/PurchaseHistory/:UserEmail' element={<PurchaseHistory />} />
        <Route path='/FormShoe' element={<FormShoe />}></Route>
        <Route path='/Successes'element={<Successes/>}/>
        <Route path='/Failures'element={<Failures/>}/>


      </Routes>
    </div>
  )
}

export default App
