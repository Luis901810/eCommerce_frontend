import { useState, useEffect } from 'react'
import {
  Box,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import Menu from '@mui/icons-material/Menu'
import UserList from './components/UserList'
import ShoeList from './components/ShoeList'
import OrderList from './components/OrderList'
import {
  DashBoardCategory,
  DashBoardListItem,
} from '../../styles/ComponentStyles'


function Dashboard() {
  const [showMenu, setShowMenu] = useState(true)

  const [showUsers, setShowUsers] = useState(true)
  const [showShoes, setShowShoes] = useState(false)
  const [showOrders, setShowOrders] = useState(false)

  
  



  const handleToggleMenu = () => {
    setShowMenu(!showMenu)
  }
  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Box
        sx={{
          width: '20%',
          height: '100%',
          backgroundColor: '#141414',
          display: 'flex',
        }}
      >
        <List sx={{ marginTop: '20px', backgroundColor: '#141414' }}>
          {/* Categoria Zapatos */}
          <DashBoardListItem
            button
            onClick={() => {
              setShowUsers(false)
              setShowShoes(true)
              setShowOrders(false)
            }}
          >
            <ListItemText primary='Productos' />
          </DashBoardListItem>
          {/* Categoria Usuarios */}
          <DashBoardListItem
            button
            onClick={() => {
              setShowUsers(true)
              setShowShoes(false)
              setShowOrders(false)
            }}
          >
            <ListItemText primary='Usarios' />
          </DashBoardListItem>
        
      
            {/* Categoria Ordenes */}
      <DashBoardListItem
            button
            onClick={() => {
              setShowUsers(false)
              setShowShoes(false)
              setShowOrders(true)
            }}
          >
            <ListItemText primary='Historial de Compras' />
          </DashBoardListItem>
        </List>
      </Box>

      {/* Contenido Principal */}
      <Box
        sx={{
          flexGrow: 2,
          padding: '20px',
          overflowY: 'auto',
          width: '80%',
        }}
      >
        {showShoes && <ShoeList />}
        {showUsers && <UserList />}
        {showOrders && <OrderList />}
      </Box>
    </Box>
  )
}

export default Dashboard
