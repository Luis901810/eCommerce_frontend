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
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../../utils/constants'
import axios from 'axios'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { getShoes } from '../../../services/Dashboard'
import ShoeFilters from '../../../components/Dashboard/ShoeFilters'
import { isEmptyObject } from '../../../utils/tools'
import { TextFieldForm, TableRowHover } from '../../../styles/ComponentStyles'
import { errorDashboardAlert, successDashboardAlert } from '../../../alerts/alerts'

function ShoeList() {
  const [shoes, setShoes] = useState([])
  const [shoesToShow, setShoesToShow] = useState([])

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  })

  const [filters, setFilters] = useState({})
  const [searchTerm, setSearchTerm] = useState("");


  const genders = useSelector(state => state.genders)
  const colors = useSelector(state => state.colors)
  const sizes = useSelector(state => state.sizes)
  const brands = useSelector(state => state.brands)

  const navigate = useNavigate()

  //* Filtrado de datos


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getShoes(filters)
        const dataCleaned = data.map(element => ({
          ...element,
          gender: genders.find(item => item.id === element.genderId).gender,
          color: colors.find(item => item.id === element.colorId).color,
          size: sizes.find(item => item.id === element.sizeId).size,
          brand: brands.find(item => item.id === element.brandId).brand,
        }))
        
        setShoes(dataCleaned)
        setShoesToShow(sortedArray(dataCleaned))
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [filters])

  //* Barra de busqueda
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    if(!event.target.value){
      setShoesToShow(sortedArray(shoes))
    }else{
        const results = shoes.filter(element => element.name.toLowerCase().includes(event.target.value.toLowerCase()))
        setShoesToShow(sortedArray(results))
    }
  };
  //* Ordenamiento de zapatos
  const handleSort = key => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
    sortedArray(shoesToShow, { key, direction })
  }

  const sortedArray = (array, sortConfigfunc = sortConfig) => {
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
    setShoesToShow(sortableArray)

    return sortableArray
  }

  //*Borrado de zapato
  const handleDelete = async ID => {
    try {
      const { data: shoe } = await axios.delete(`${API_URL}/shoe/${ID}`)
      const data = await getShoes()
      const dataCleaned = data.map(element => ({
        ...element,
        gender: genders.find(item => item.id === element.genderId).gender,
        color: colors.find(item => item.id === element.colorId).color,
        size: sizes.find(item => item.id === element.sizeId).size,
        brand: brands.find(item => item.id === element.brandId).brand,
      }))
      setShoes(dataCleaned)
      setShoesToShow(sortedArray(dataCleaned))
      // setSelectedRole('all')
      // setSearchTerm("")
      successDashboardAlert(`El producto: ${shoe.name} fue eliminado`)
    } catch (error) {
      errorDashboardAlert(error.message)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getShoes()
        const dataCleaned = data.map(element => ({
          ...element,
          gender: genders.find(item => item.id === element.genderId).gender,
          color: colors.find(item => item.id === element.colorId).color,
          size: sizes.find(item => item.id === element.sizeId).size,
          brand: brands.find(item => item.id === element.brandId).brand,
        }))
        setShoes(dataCleaned)
        setShoesToShow(sortedArray(dataCleaned))
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    console.log(shoes)
  }, [shoes])

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
          label='Producto'
          sorted={sortConfig.key === 'name'}
          direction={sortConfig.direction}
          maxWidth={100}
        />
        <SortableTableCell
          onClick={() => handleSort('price')}
          label='Precio'
          sorted={sortConfig.key === 'price'}
          direction={sortConfig.direction}
          maxWidth={100}
        />
        <SortableTableCell
          onClick={() => handleSort('brand')}
          label='Marca'
          sorted={sortConfig.key === 'brand'}
          direction={sortConfig.direction}
          maxWidth={70}
        />
        <SortableTableCell
          onClick={() => handleSort('size')}
          label='Género'
          sorted={sortConfig.key === 'gender'}
          direction={sortConfig.direction}
          maxWidth={70}
        />
        <SortableTableCell
          onClick={() => handleSort('size')}
          label='Talla'
          sorted={sortConfig.key === 'size'}
          direction={sortConfig.direction}
          maxWidth={70}
        />
        <SortableTableCell
          onClick={() => handleSort('color')}
          label='Color'
          sorted={sortConfig.key === 'color'}
          direction={sortConfig.direction}
          maxWidth={70}
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

  const renderTableData = () => {
    return (
      !shoesToShow.length ? (
        <h3>No se encontraron resultados</h3>
      ) : (<TableBody>
        {
          shoesToShow.map((shoe, index) => (
            <TableRowHover
              key={shoe.id}
            
            >
              <TableCell>
                <Avatar alt={shoe.name} src={shoe.image} />
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 14,
                  color: 'white',
                  maxWidth: 100,
                }}
              >
                {shoe.name}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 14,
                  color: 'white',
                  maxWidth: 100,
                }}
              >
                ${shoe.price}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 14,
                  color: 'white',
                  maxWidth: 100,
                }}
              >
                {shoe.brand}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 14,
                  color: 'white',
                  maxWidth: 100,
                }}
              >
                {shoe.gender}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 14,
                  color: 'white',
                  maxWidth: 100,
                }}
              >
                {shoe.size}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 14,
                  color: 'white',
                  maxWidth: 100,
                }}
              >
                {shoe.color}
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
                <IconButton onClick={() => navigate(`/UpdateShoe/${shoe.id}`)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(shoe.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRowHover>
          ))
        }
      </TableBody>)
    )
  }

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
            color: '#f3a143',
            fontSize: '40px',
          }}
        >
          LISTA DE PRODUCTOS
        </Box>
        <TextFieldForm
          label='Buscar Producto'
          value={searchTerm}
          onChange={handleSearchTermChange}
          sx={{
            width: '100%',
            maxWidth: '200px',
            marginBottom: '10px',
          }}
        />
        <Box>
          {isEmptyObject(filters) ? null : (
            <Button
              onClick={() => {
                setFilters({})
                setSearchTerm('')
              }}
            >
              Limpiar Filtros
            </Button>
          )}

          <ShoeFilters filters={filters} setFilters={setFilters} />
        </Box>
        <Box>
          <Button
            variant='outlined'
            startIcon={<AddIcon />}
            onClick={() => navigate('/CreateShoe')}
          >
            Agregar Producto
          </Button>
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
          ></Box>
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

export default ShoeList
