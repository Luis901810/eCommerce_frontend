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
import ShoeFilters from '../../../components/Dashboard/ShoeFilters'
import { isEmptyObject } from '../../../utils/tools'
import {
  TextFieldForm,
  TableRowHover,
  StyledSelect,
  StyledMenuItemSelect,
} from '../../../styles/ComponentStyles'
import { getOrders } from '../../../services/Dashboard'
import dayjs from 'dayjs'
import {
  confirmDeleteAlert,
  errorDashboardAlert,
  successDashboardAlert,
} from '../../../alerts/alerts'

export default function OrderList() {
  const [orders, setOrders] = useState([])
  const [ordersToShow, setOrdersToShow] = useState([])
  const [status, setStatus] = useState([])

  const [selectedStatus, setSelectedStatus] = useState('all')

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  })

  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()

  //* Ordenamiento de ordenes
  const handleSort = key => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
    sortedArray(ordersToShow, { key, direction })
  }

  const sortedArray = (array, sortConfigfunc = sortConfig) => {
    const sortableArray = array.slice() // Copia el array para evitar mutar el estado directamente
    if (sortConfigfunc.key !== null) {
      if (['name', 'email'].includes(sortConfigfunc.key)) {
        console.log(sortConfigfunc.key)
        sortableArray.sort((a, b) => {
          if (
            a.User[sortConfigfunc.key].toLowerCase() <
            b.User[sortConfigfunc.key].toLowerCase()
          ) {
            return sortConfigfunc.direction === 'ascending' ? -1 : 1
          }
          if (
            a.User[sortConfigfunc.key].toLowerCase() >
            b.User[sortConfigfunc.key].toLowerCase()
          ) {
            return sortConfigfunc.direction === 'ascending' ? 1 : -1
          }
          return 0
        })
      } else if (sortConfigfunc.key === 'status') {
        sortableArray.sort((a, b) => {
          if (
            a.OrderStatus[sortConfigfunc.key] <
            b.OrderStatus[sortConfigfunc.key]
          ) {
            return sortConfigfunc.direction === 'ascending' ? -1 : 1
          }
          if (
            a.OrderStatus[sortConfigfunc.key] >
            b.OrderStatus[sortConfigfunc.key]
          ) {
            return sortConfigfunc.direction === 'ascending' ? 1 : -1
          }
          return 0
        })
      } else {
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
    }
    setOrdersToShow(sortableArray)

    return sortableArray
  }

  //* Filtro de estado
  const handleStatusChange = event => {
    if (!event) {
      event = {
        target: {
          value: selectedStatus,
        },
      }
    }

    setSelectedStatus(event.target.value)
    let usersfilteredStatus
    if (event.target.value === 'all') {
      usersfilteredStatus = sortedArray(orders)
    } else {
      usersfilteredStatus = sortedArray(orders).filter(
        order => order.statusId === event.target.value
      )
      setOrdersToShow(usersfilteredStatus)
    }
    return usersfilteredStatus
  }

  //* Buscador
  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    if (!searchTerm) {
      handleStatusChange()
    } else if (uuidRegex.test(searchTerm)) {
      const results = handleStatusChange().filter(
        element => element.id === searchTerm
      )
      setOrdersToShow(results)
    } else {
      const results = handleStatusChange().filter(element =>
        element.User.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setOrdersToShow(results)
    }
  }, [selectedStatus, searchTerm])

  //* Borrado
  const handleDelete = async ID => {
    const isConfirmed = await confirmDeleteAlert('registro')
    try {
      if (isConfirmed == true) {
        const { data: order } = await axios.delete(`${API_URL}/order/${ID}`)
        const data = await getOrders()
        setOrders(data)
        setOrdersToShow(sortedArray(data))
        setSelectedStatus('all')

        setSearchTerm('')
      }
    } catch (error) {
      errorDashboardAlert(error.message)
    }
  }
  //* Cargado de datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOrders()
        const { data: statuses } = await axios(API_URL + '/order-status')
        setStatus(statuses)
        setOrders(data)
        setOrdersToShow(sortedArray(data))
      } catch (error) {}
    }
    fetchData()
  }, [])

  useEffect(() => {}, [ordersToShow])

  const renderTableHeader = () => (
    <TableHead>
      <TableRow sx={{ backgroundColor: '#414141' }}>
        <TableCell
          sx={{
            fontSize: 18,
            color: 'white',
            width: 150,
            backgroundColor: '#414141',

            textAlign: 'start',
          }}
        >
          Codigo de Compra
        </TableCell>

        <TableCell
          sx={{
            fontSize: 18,
            color: 'white',
            width: 70,
            backgroundColor: '#414141',

            textAlign: 'start',
          }}
        >
          Usuario
        </TableCell>
        <SortableTableCell
          onClick={() => handleSort('email')}
          label='Email'
          sorted={sortConfig.key === 'email'}
          direction={sortConfig.direction}
          maxWidth={150}
        />
        <SortableTableCell
          onClick={() => handleSort('status')}
          label='Status'
          sorted={sortConfig.key === 'status'}
          direction={sortConfig.direction}
          maxWidth={70}
        />
        <SortableTableCell
          onClick={() => handleSort('totalAmount')}
          label='Total'
          sorted={sortConfig.key === 'totalAmount'}
          direction={sortConfig.direction}
          maxWidth={70}
        />
        <SortableTableCell
          onClick={() => handleSort('createdAt')}
          label='Creado'
          sorted={sortConfig.key === 'createdAt'}
          direction={sortConfig.direction}
          maxWidth={70}
        />
        <SortableTableCell
          onClick={() => handleSort('updatedAt')}
          label='Act.'
          sorted={sortConfig.key === 'updatedAt'}
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
    return !ordersToShow.length ? (
      <h3>No se encontraron resultados</h3>
    ) : (
      <TableBody>
        {ordersToShow.map((order, index) => (
          <TableRowHover key={order.id}>
            <TableCell
              sx={{
                fontSize: 14,
                color: 'white',
                maxWidth: 100,
              }}
            >
              {order.id}
            </TableCell>
            <TableCell
              sx={{
                fontSize: 14,
                color: 'white',
                maxWidth: 70,
              }}
            >
              {order.User.name}
            </TableCell>
            <TableCell
              sx={{
                fontSize: 14,
                color: 'white',
                maxWidth: 150,
                overflowWrap: 'break-word',
              }}
            >
              {order.User.email}
            </TableCell>
            <TableCell
              sx={{
                fontSize: 14,
                color: 'white',
                maxWidth: 70,
              }}
            >
              {order.OrderStatus.status}
            </TableCell>
            <TableCell
              sx={{
                fontSize: 14,
                color: 'white',
                maxWidth: 100,
              }}
            >
              $ {order.totalAmount}
            </TableCell>
            <TableCell
              sx={{
                fontSize: 14,
                color: 'white',
                maxWidth: 70,
              }}
            >
              {dayjs(order.createdAt).format('DD/MM/YYYY')}
            </TableCell>
            <TableCell
              sx={{
                fontSize: 14,
                color: 'white',
                maxWidth: 70,
              }}
            >
              {dayjs(order.updatedAt).format('DD/MM/YYYY')}
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
                onClick={() => navigate(`/UpdateOrder/${order.id}`)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: '#d33',
                }}
                onClick={() => handleDelete(order.id)}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRowHover>
        ))}
      </TableBody>
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
            color: '#22C55E',
            fontSize: '40px',
          }}
        >
          HISTORIAL DE COMPRAS
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
              label='Codigo o Email'
              key='OrderSearch'
              value={searchTerm}
              onChange={handleSearchTermChange}
              sx={{
                width: '100%',
                maxWidth: '200px',
                marginBottom: '10px',
              }}
            />
            <StyledSelect
              value={selectedStatus}
              onChange={handleStatusChange}
              sx={{
                width: '100%',
                maxWidth: '200px',
                marginBottom: '10px',
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
                Todos los Estados
              </StyledMenuItemSelect>
              {status.length &&
                status.map((stat, index) => (
                  <StyledMenuItemSelect key={index} value={stat.id}>
                    {stat.status}
                  </StyledMenuItemSelect>
                ))}
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
  )
}
