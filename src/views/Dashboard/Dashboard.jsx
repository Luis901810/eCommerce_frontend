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
  const [selectedIndex, setSelectedIndex] = useState(1);
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
        marginTop: 10
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
            selected={selectedIndex === 0}
            onClick={() => {
              setShowUsers(false)
              setShowShoes(true)
              setShowOrders(false)
              setSelectedIndex(0);
            }}
          >
            <ListItemText primary='Productos' />
          </DashBoardListItem>
          {/* Categoria Usuarios */}
          <DashBoardListItem
            button
            selected={selectedIndex === 1}
            onClick={() => {
              setShowUsers(true)
              setShowShoes(false)
              setShowOrders(false)
              setSelectedIndex(1)
            }}
          >
            <ListItemText primary='Usarios' />
          </DashBoardListItem>
        
      
            {/* Categoria Ordenes */}
      <DashBoardListItem
            button
            selected={selectedIndex === 2}
            onClick={() => {
              setShowUsers(false)
              setShowShoes(false)
              setShowOrders(true)
              setSelectedIndex(2)
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
