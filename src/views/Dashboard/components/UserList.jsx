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
  IconButton
} from '@mui/material'
import theme from '../../../theme';
import {
  OrangeContainedButton,
  BlueContainedButton,
  RedOutlinedButton,
  StyledSelect,
  StyledMenuItemSelect,
  TextFieldForm,
  LinkNoDeco,
} from "../../../styles/ComponentStyles";
import { useEffect, useState } from 'react'
import { API_URL } from '../../../utils/constants';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getUsers } from '../../../services/Dashboard';


function UserList({ users }) {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  })
  const [roles, setRoles] = useState([])
  const [ usersFixed, setUsersFixed] = useState([])
  const [usersToShow, setUsersToShow] = useState([])

  const [hoveredRow, setHoveredRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("firstName");
  const [selectedRole, setSelectedRole] = useState("all");


  // Ordenamiento de usuarios
  const handleSort = key => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
    sortedUsers(usersToShow)
  }

  //
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedRole("all"); // Reinicia el filtro de roles al cambiar la categoría
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    if(!event.target.value){
        handleRoleChange()
    }else{
        const results = handleRoleChange().filter(element => element.email.toLowerCase().includes(event.target.value.toLowerCase()))
        setUsersToShow(results)
    }
  };

  const handleRoleChange = (event) => {
    if(!event){
        event = {
            target: {
                value: selectedRole
            }
        }
    }
    console.log(event)
    setSelectedRole(event.target.value)
    let usersfilteredRole
    if(event.target.value === 'all'){
        usersfilteredRole = sortedUsers(usersFixed)
    } else {
        
        usersfilteredRole = sortedUsers(usersFixed).filter(user => user.role === event.target.value)
        setUsersToShow(usersfilteredRole)
    }
    return usersfilteredRole
  }
  //!Borrar usuarios que no tengan un rol
  const sortedUsers = (users) => {
    const sortableUsers = users.slice() // Copia el array para evitar mutar el estado directamente
    if (sortConfig.key !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    setUsersToShow(sortableUsers)
    console.log(usersToShow)
    return sortableUsers
  }

  // Borrado de usuario
  const handleDelete = async(userID)=>{
    try{
        const {data} = await axios.delete(`${API_URL}/shoe/${userID}`)
    } catch(error){
        window.alert(error.message);
    }
  }

  useEffect(() => {
    const getRoles = async()=>{
        try{
    const {data} =   await axios(API_URL+'/user-rol')
    setRoles(data)
    
    const users  = await getUsers()
    setUsersFixed(users)
    setUsersToShow(users)
} catch(error){
    console.error("Error fetching data:", error)
} 
  }
  getRoles()
}, [])

  useEffect(() => {
    console.log(sortConfig)

  }, [usersToShow])

  const renderTableHeader = () => (
    <TableHead>
      <TableRow sx={{ backgroundColor: '#414141' }}>
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
        >
          
        </TableCell>
      </TableRow>
    </TableHead>
  )

  const renderTableData = () => {
    
    return (

      <TableBody>
        {usersToShow.map((user, index) => (
          <TableRow
            key={user.id}
            sx={{
              backgroundColor: index === hoveredRow ? '#333333' : '#131313',
              color: 'white',
              
            }}
            onMouseEnter={() => setHoveredRow(index)}
            onMouseLeave={() => setHoveredRow(null)}
          >
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
                minHeight:50,
                
                justifyContent: 'center',
              }}
            >
                
              <LinkNoDeco to={`/UsersDetail/${user.id}`}>
                <OrangeContainedButton>DETAIL</OrangeContainedButton>
              </LinkNoDeco>
              <LinkNoDeco to={`/UpdateUser/${user.id}`}>
              <EditIcon/>
              </LinkNoDeco>
              <IconButton onClick={() => handleDelete(user.id)}>
                <DeleteIcon />
                </IconButton>
            </TableCell>
          </TableRow>
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
        cursor: "pointer",
        fontSize: 18,
        color: "white",
        maxWidth,
        backgroundColor: sorted ? "#333333" : "#414141",
        textAlign: "start",
      }}
    >
      {label} {sorted && (direction === "ascending" ? "▲" : "▼")}
    </TableCell>
  );
  
  return <ThemeProvider theme={theme}>
  <CssBaseline />
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      margin: "0 auto",
      minHeight: "100vh",
    }}
  >
    <Box sx={{
      color: "#f3a143",
      fontSize: "40px",
    }}>LISTA DE USUARIOS</Box>
    <Box
      sx={{
        py: 1,
        flexGrow: 1,
        width: "90%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center",
          marginBottom: "5px",
        }}
      >

        <TextFieldForm
          label="Search"
          value={searchTerm}
          onChange={handleSearchTermChange}
          sx={{
            width: "100%",
            maxWidth: "100px",
            marginBottom: "10px",
          }}
        />

        <StyledSelect
          value={selectedRole}
          onChange={handleRoleChange}
          sx={{
            width: "100%",
            maxWidth: "200px",
            marginBottom: "10px",
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: "black",
              },
            },
          }}
        >
          <StyledMenuItemSelect value="all">Todos los Roles</StyledMenuItemSelect>
          {roles.length && roles.map(role=><StyledMenuItemSelect value={role.rol}>{role.rol}</StyledMenuItemSelect>)}
        </StyledSelect>
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
}

export default UserList
