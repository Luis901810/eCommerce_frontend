import { useState, useEffect } from 'react'
import { Box, IconButton, List, ListItemIcon, ListItemText } from '@mui/material'
import Menu from '@mui/icons-material/Menu'
import UserList from './components/UserList';
import ShoeList from './components/ShoeList';
import { DashBoardCategory, DashBoardListItem } from '../../styles/ComponentStyles';
import axios from 'axios';
import { API_URL } from '../../utils/constants';

function Dashboard() {
  const [showMenu, setShowMenu] = useState(true)

  const [showUsers, setShowUsers] = useState(false);
  const [showShoes, setShowShoes] = useState(false);

  const [shoes, setShoes] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getShoes = async () => {
      try {
        const response = await axios.get(`${API_URL}/shoe`)
        const { data } = response
        setShoes(data)
      } catch (error) {
        console.error('Error fetching Shoes:', error.message)
      }
    }

    const getUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/user`)
        const { data } = response
        console.log(data)
        setUsers(data)
      } catch (error) {
        console.error('Error fetching Userservices:', error.message)
      }
    }
    getShoes()
    getUsers()
  }, [])

  const handleToggleMenu = () => {
    setShowMenu(!showMenu)
  }
  return (
    <Box
    sx={{
      display:'flex'
    }}>
      <Box
        sx={{
          width: '20%',
          height: '100%',
          backgroundColor: '#141414',
          display:'flex'
        }}
      >
        <List sx={{ marginTop: "20px", backgroundColor: "#141414" }}>
          {/* Categoria Zapatos */}
          <DashBoardListItem
            button
            onClick={()=>{
              setShowUsers(false)
              setShowShoes(true)
            }}>
              <ListItemText primary="Shoes"/>
          </DashBoardListItem>
            {/* Categoria Usuarios */}
          <DashBoardListItem
            button
            onClick={()=>{
              setShowUsers(true)
              setShowShoes(false)
            }}>
              <ListItemText primary="Users"/>
            </DashBoardListItem>
          
        </List>
      </Box>

      {/* Contenido Principal */}
      <Box
      sx={{
        flexGrow: 2,
        padding: "20px",
        overflowY: "auto",
        width: "80%"
      }}
      >
        {showShoes && <ShoeList shoes={shoes}/>}
        {showUsers && <UserList users={users}/>}
      </Box>
      
    </Box>
  )
}

export default Dashboard
