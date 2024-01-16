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
import UserReviews from './components/UserProfile/UserOptions/UserReviews/UserReviews'
import { useEffect } from 'react'

function App() {
  // const  user = useSelector(state => state.currentUser)
  const  currentUser = JSON.parse(localStorage.getItem('currentUser')) 
  const user = currentUser? currentUser: {
    roleId: 'fc7dd551-c681-488d-9d17-955cad4c16a5'
  }
  console.log(user)
  const excludedRoutes = ['UpdateUser',"UpdateShoe", "CreateShoe", 'UpdateOrder', 'CreateUser']
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
        <Route path="/CreateUser" element={user.roleId === "1e9f34d0-ed48-45fc-94f4-5cbca35b662b"?<CreateUser/>:<Navigate to="/" />} />
        <Route path="/UpdateUser/:id" element={user.roleId === "1e9f34d0-ed48-45fc-94f4-5cbca35b662b"?<UpdateUser/>:<Navigate to="/" />} />
        <Route path="/UpdateOrder/:id" element={user.roleId === "1e9f34d0-ed48-45fc-94f4-5cbca35b662b"?<UpdateOrder/>:<Navigate to="/" />} />

        <Route path='/UserReviews/:UserEmail' element={<UserReviews/>} />
        <Route path='/FormShoe' element={user.roleId === "1e9f34d0-ed48-45fc-94f4-5cbca35b662b"?<FormShoe />:<Navigate to="/" />}></Route>
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
