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
import Successes from './components/ShoppingCart/Successes/Successes'
import Failures from './components/ShoppingCart/Failures/Failures'
import EditProfile from './components/UserProfile/UserOptions/EditProfile/EditProfile'
import PurchaseHistory from './components/UserProfile/UserOptions/PurchaseHistory/PurchaseHistory'

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/Catalogue' element={<Catalogue />} />
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Login/Register' element={<Register />}></Route>
        <Route path='/Detail/:idShoe' element={<ShoeDetail />} />
        <Route path='/ShoppingCart' element={<ShoppingCart />}></Route>
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
