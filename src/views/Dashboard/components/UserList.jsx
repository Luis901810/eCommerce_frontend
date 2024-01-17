import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CssBaseline,
  ThemeProvider,
  Box,
  IconButton,
  Button,
  Avatar,
} from '@mui/material'
import theme from '../../../theme'
import {
  StyledSelect,
  StyledMenuItemSelect,
  TextFieldForm,
  TableRowHover,
} from '../../../styles/ComponentStyles'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../../utils/constants'
import axios from 'axios'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { getUsers } from '../../../services/Dashboard'
import {
  errorDashboardAlert,
  successDashboardAlert,
  confirmDeleteAlert,
} from '../../../alerts/alerts'

function UserList() {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  })
  const [roles, setRoles] = useState([])
  const [usersFixed, setUsersFixed] = useState([])
  const [usersToShow, setUsersToShow] = useState([])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')

  const navigate = useNavigate()

  // Ordenamiento de usuarios
  const handleSort = key => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
    sortedUsers(usersToShow, { key, direction })
  }

  // Buscador

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value)
    if (!event.target.value) {
      handleRoleChange()
    } else {
      const results = handleRoleChange().filter(element =>
        element.email.toLowerCase().includes(event.target.value.toLowerCase())
      )
      setUsersToShow(results)
    }
  }

  const handleRoleChange = event => {
    if (!event) {
      event = {
        target: {
          value: selectedRole,
        },
      }
    }
    console.log(event)
    setSelectedRole(event.target.value)
    let usersfilteredRole
    if (event.target.value === 'all') {
      usersfilteredRole = sortedUsers(usersFixed)
    } else {
      usersfilteredRole = sortedUsers(usersFixed).filter(
        user => user.role === event.target.value
      )
      setUsersToShow(usersfilteredRole)
    }
    return usersfilteredRole
  }
  //!Borrar usuarios que no tengan un rol
  const sortedUsers = (array, sortConfigfunc = sortConfig) => {
    const sortableArray = array.slice() // Copia el array para evitar mutar el estado directamente
    if (sortConfigfunc.key !== null) {
      sortableArray.sort((a, b) => {
        if (a[sortConfigfunc.key] < b[sortConfigfunc.key]) {
          return sortConfigfunc.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfigfunc.key] > b[sortConfigfunc.key]) {
          return sortConfigfunc.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    setUsersToShow(sortableArray)
    return sortableArray
  }

  // Borrado de usuario
  const handleDelete = async (userID, userEmail) => {
    const isConfirmed = await confirmDeleteAlert('usuario')

    try {
      if (isConfirmed == true) {
        const { data } = await axios.delete(`${API_URL}/user/${userID}`)
        const users = await getUsers()
        setUsersFixed(sortedUsers(users))
        setUsersToShow(sortedUsers(users))
        setSelectedRole('all')
        setSearchTerm('')
      }
    } catch (error) {
      errorDashboardAlert(error.message)
    }
  }

  useEffect(() => {
    const getRoles = async () => {
      try {
        const { data } = await axios(API_URL + '/user-rol')
        setRoles(data)

        const users = await getUsers()
        setUsersFixed(users)
        setUsersToShow(users)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    getRoles()
  }, [])

  useEffect(() => {}, [usersToShow])

  const renderTableHeader = () => (
    <TableHead>
      <TableRow sx={{ backgroundColor: '#414141' }}>
        <TableCell
          sx={{
            fontSize: 18,
            color: 'white',
            width: 100,
            backgroundColor: '#414141',

            textAlign: 'start',
          }}
        ></TableCell>
        <SortableTableCell
          onClick={() => handleSort('name')}
          label='Nombre'
          sorted={sortConfig.key === 'name'}
          direction={sortConfig.direction}
          maxWidth={70}
        />
        <SortableTableCell
          onClick={() => handleSort('email')}
          label='Email'
          sorted={sortConfig.key === 'email'}
          direction={sortConfig.direction}
          maxWidth={400}
        />
        <SortableTableCell
          onClick={() => handleSort('role')}
          label='Rol'
          sorted={sortConfig.key === 'role'}
          direction={sortConfig.direction}
          maxWidth={100}
        />
        <TableCell
          sx={{
            fontSize: 18,
            color: 'white',
            width: 100,
            backgroundColor: '#414141',

            textAlign: 'start',
          }}
        ></TableCell>
      </TableRow>
    </TableHead>
  )

  const renderTableData = () => {
    return !usersToShow.length ? (
      <h3>No se encontraron resultados</h3>
    ) : (
      <TableBody>
        {usersToShow.map((user, index) => (
          <TableRowHover key={user.id}>
            <TableCell>
              <Avatar alt={user.name} src={user.profilePicture} />
            </TableCell>
            <TableCell
              sx={{
                fontSize: 14,
                color: 'white',
                maxWidth: 100,
              }}
            >
              {user.name}
            </TableCell>
            <TableCell
              sx={{
                fontSize: 14,
                color: 'white',
                maxWidth: 100,
              }}
            >
              {user.email}
            </TableCell>
            <TableCell
              sx={{
                fontSize: 14,
                color: 'white',
                maxWidth: 100,
              }}
            >
              {user.role}
            </TableCell>
            <TableCell
              sx={{
                display: 'flex',
                gap: '8px',
                minWidth: 150,
                minHeight: 50,

                justifyContent: 'center',
              }}
            >
              <IconButton
                sx={{
                  color: '#3085d6',
                }}
                onClick={() => navigate(`/UpdateUser/${user.id}`)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: '#d33',
                }}
                onClick={() => handleDelete(user.id, user.email)}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRowHover>
        ))}
      </TableBody>
    )
  }

  const SortableTableCell = ({
    onClick,
    label,
    sorted,
    direction,
    maxWidth,
  }) => (
    <TableCell
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        fontSize: 18,
        color: 'white',
        maxWidth,
        backgroundColor: sorted ? '#333333' : '#414141',
        textAlign: 'start',
      }}
    >
      {label} {sorted && (direction === 'ascending' ? '▲' : '▼')}
    </TableCell>
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          margin: '0 auto',
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            color: '#22C55E',
            fontSize: '40px',
          }}
        >
          LISTA DE USUARIOS
        </Box>
        <Box
          sx={{
            py: 1,
            flexGrow: 1,
            width: '90%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyItems: 'center',
              marginBottom: '5px',
            }}
          >
            <TextFieldForm
              label='Email'
              value={searchTerm}
              onChange={handleSearchTermChange}
              key='SearchBarUser'
              sx={{
                width: '100%',
                maxWidth: '200px',
                marginBottom: '10px',
                backgroundColor: '#303030',
                '& .MuiInputBase-input': {
                  color: 'white', 
                },
              }}
            />

            <StyledSelect
              value={selectedRole}
              onChange={handleRoleChange}
              sx={{
                width: '100%',
                maxWidth: '200px',
                marginBottom: '10px',
                backgroundColor: '#303030',
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: 'black',
                  },
                },
              }}
            >
              <StyledMenuItemSelect value='all'>
                Todos los Roles
              </StyledMenuItemSelect>
              {roles.length &&
                roles.map(role => (
                  <StyledMenuItemSelect value={role.rol}>
                    {role.rol}
                  </StyledMenuItemSelect>
                ))}
            </StyledSelect>

            <Box>
              {/* <Button
            variant='outlined'
            startIcon={<AddIcon />}
            onClick={() => navigate('/CreateUser')}
          >
            Agregar Usuario
          </Button> */}
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              {renderTableHeader()}
              {renderTableData()}
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default UserList
