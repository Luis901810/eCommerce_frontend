import { useNavigate } from 'react-router-dom'
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Search from './Search'
import Pages from './Pages'

import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [error, setError] = useState('')
  const { user, logaut, loading } = useAuth()
  const navigate = useNavigate()

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogaut = async () => {
    try {
      await logaut()
    } catch (error) {
      setError(error.message)
    }
  }
  if (loading) {
    return <h1>Cerrando seccion....</h1>
  }

  return (
    <>
      {error && <p>{error}</p>}

      <AppBar
        position='fixed'
        color='primary'
        sx={{
          width: '100%',
          marginTop: '10px',
          backgroundColor: '#414141',
        }}
      >
        <Toolbar disableGutters sx={{ paddingLeft: 2, paddingRight: 2 }}>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Pages />
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'space-evenly',
            }}
          >
            <Pages />
            <Search />
            <IconButton aria-label='cart'>
              <ShoppingCartOutlinedIcon sx={{ color: 'white' }} />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user ? (
                  <Avatar alt='User Avatar' src={user.photoURL} />
                ) : (
                  <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user ? (
                <>
                  <MenuItem onClick={() => navigate('/UserProfile')}>
                    <Typography textAlign='center'>Perfil</Typography>
                  </MenuItem>
                  ,
                  <MenuItem key='logout' onClick={handleLogaut}>
                    <Typography textAlign='center'>Cerrar Sesión</Typography>
                  </MenuItem>
                </>
              ) : (
                <MenuItem onClick={() => navigate('/Login')}>
                  <Typography textAlign='center'>Iniciar Sesión</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )

  //  return (
  //     <div>
  //       <img src ={require('./Logo Temporal.jpg')} alt='Logo Temporal' style={{ width: '25px', height: '25px', borderRadius: 15}}  />
  //       <h3>SearchBar</h3>
  //       <Link to="/Catalogue"> <button>| Catalogo |</button> </Link>
  //       <Link to="/ShoppingCart"> <button>| Carrito |</button> </Link>

  //       {/* //! Al dar click en el siguiente botón,
  //       * si es usuario: poder modificar el usuario
  //       * si es Admin: ingrsar a la dash board */}

  //       <button>| Rol: Cliente / Admind |</button>
  //       {/* //! Nombre del usuario */}
  //        <button>| Nombre de Usuario |</button>
  //       <Link to="/Login"> <button>| Login |</button> </Link>

  //     </div>
  //   );
}
export default NavBar
