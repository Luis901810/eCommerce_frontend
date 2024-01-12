import {
  Box,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CssBaseline,
  ThemeProvider,
} from '@mui/material'
import { TextFieldForm, TableRowHover } from '../../styles/ComponentStyles'
import { useParams } from 'react-router-dom'
import { getOrderById } from '../../services/Dashboard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../utils/constants'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/system'
import dayjs from 'dayjs'

export default function UpdateOrder() {
  const { id } = useParams()
  const [order, setOrder] = useState({})
  const [orderUpdate, setOrderUpdate] = useState({})
  const [status, setStatus] = useState([])
  const navigate = useNavigate()

  const handleChange = event => {
    setOrderUpdate({ ...orderUpdate, [event.target.name]: event.target.value })
  }

  const TextFieldF = styled(TextField)`
    color: white;
    & label.Mui-focused {
      color: white;
    }

    & .MuiInputLabel-root {
      color: #22c55e;
    }
    & .MuiInputBase-input {
      color: #22c55e;
    }
  `
  useEffect(() => {
    const fetchData = async () => {
      try {
        const order = await getOrderById(id)
        console.log(order)
        const { data: statuses } = await axios(API_URL + '/order-status')
        setOrder(order)
        setStatus(statuses)
      } catch (error) {
        console.error('Error fetching order:', error)
      }
    }
    fetchData()
  }, [id])

  useEffect(() => {
    console.log(orderUpdate)
  }, [orderUpdate])

  // Updata info
  const handleUpdate = async () => {
    try {
      const orderUpdated = await axios.put(
        `${API_URL}/order/${id}`,
        orderUpdate
      )
      window.alert('Compra Actualizada')
      setOrderUpdate({})
      const order = await getOrderById(id)
      setOrder(order)
    } catch (error) {
      console.log(error)
    }
  }
  // Renderizado de tabla
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
          Producto
        </TableCell>
        <TableCell
          sx={{
            fontSize: 18,
            color: 'white',
            width: 50,
            backgroundColor: '#414141',

            textAlign: 'start',
          }}
        >
          P.U.
        </TableCell>

        <TableCell
          sx={{
            fontSize: 18,
            color: 'white',
            width: 50,
            backgroundColor: '#414141',

            textAlign: 'start',
          }}
        >
          Cantidad
        </TableCell>

        <TableCell
          sx={{
            fontSize: 18,
            color: 'white',
            width: 50,
            backgroundColor: '#414141',

            textAlign: 'start',
          }}
        >
          Total
        </TableCell>
      </TableRow>
    </TableHead>
  )

  const renderTableData = () => {
    return (
      <TableBody>
        {order.OrderLines.map((order, index) => (
          <TableRowHover key={order.id}>
            <TableCell
              sx={{
                fontSize: 14,
                color: 'white',
                maxWidth: 100,
              }}
            >
              {order.Shoe.name}
            </TableCell>
            <TableCell
              sx={{
                fontSize: 14,
                color: 'white',
                maxWidth: 70,
              }}
            >
              {order.Shoe.price}
            </TableCell>
            <TableCell
              sx={{
                fontSize: 14,
                color: 'white',
                maxWidth: 150,
                overflowWrap: 'break-word',
              }}
            >
              {order.quantity}
            </TableCell>
            <TableCell
              sx={{
                fontSize: 14,
                color: 'white',
                maxWidth: 70,
              }}
            >
              {order.unitPrice}
            </TableCell>
          </TableRowHover>
        ))}
        <TableRowHover key={order.id}>
            <TableCell
              sx={{
                fontSize: 14,
                color: 'white',
                maxWidth: 100,
              }}
            >
             
            </TableCell>
            <TableCell
              sx={{
                fontSize: 14,
                color: 'white',
                maxWidth: 70,
              }}
            >
              
            </TableCell>
            <TableCell
              sx={{
                fontSize: 14,
                color: 'white',
                maxWidth: 150,
                overflowWrap: 'break-word',
              }}
            >
              
            </TableCell>
            <TableCell
              sx={{
                fontSize: 14,
                color: 'white',
                maxWidth: 70,
              }}
            >
              {order.totalAmount}
            </TableCell>
          </TableRowHover>
      </TableBody>
    )
  }

  return order.id ? (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'center',
      }}
      noValidate
      autoComplete='off'
    >
      <IconButton
        color='secondary'
        onClick={() => {
          navigate('/Admin')
        }}
      >
        <CloseIcon />
      </IconButton>

      <TextFieldForm
        disabled
        id='outlined-required'
        label='Codigo de compra'
        value={order.id}
      />

      <TextFieldForm
        disabled
        id='outlined-required'
        label='Usuario'
        value={order.User.name}
      />
      <TextFieldForm
        disabled
        id='outlined-required'
        label='Email'
        value={order.User.email}
      />
      <TextFieldForm
        id='outlined-select-currency'
        select
        name='statusId'
        label='Estado'
        value={orderUpdate.statusId ? orderUpdate.statusId : order.statusId}
        onChange={handleChange}
      >
        {status.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.status}
          </MenuItem>
        ))}
      </TextFieldForm>

      <TextFieldForm
        disabled
        id='outlined-required'
        label='Fecha de Creación'
        value={dayjs(order.createdAt).format('DD/MM/YYYY')}
      />
      <TextFieldForm
        disabled
        id='outlined-required'
        label='Fecha de Actualización'
        value={dayjs(order.updatedAt).format('DD/MM/YYYY')}
      />
      
          <TableContainer component={Paper}>
            <Table>
              {renderTableHeader()}
              {renderTableData()}
            </Table>
          </TableContainer>

          {Object.keys(orderUpdate).length ? (
        <Box>
          <Button
            variant='outlined'
            size='medium'
            onClick={() => {
              setOrderUpdate({})
            }}
          >
            Descartar Cambios
          </Button>
          <Button variant='outlined' size='medium' onClick={handleUpdate}>
            Guardar Cambios
          </Button>
        </Box>
      ) : null}
        
    
    </Box>
  ) : null
}
