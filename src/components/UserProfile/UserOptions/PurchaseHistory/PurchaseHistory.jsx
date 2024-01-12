import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { API_URL } from '../../../../redux/actions-type'
import axios from 'axios'
import UserOptions from '../UserOptions'
import { Box } from '@mui/system'
import { Button, Typography, Select, MenuItem, List, ListItem } from '@mui/material'

const PurchaseHistory = () => {
  const idUser = useSelector(state => state.User.id)
  const [orders, setOrders] = useState([])
  const [selectedStatus, setSelectedStatus] = useState(null)

  const [orderList, setOrderList] = useState('')

  useEffect(() => {
    setOrderList('Todas las Ordenes')
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/order`)
        setOrders(response.data)
      } catch (error) {
        console.log(error.response)
      }
    }

    fetchData()
  }, [])

  const filteredByUserId = (orders, userId) => {
    return orders.filter(order => order.userId === userId)
  }

  const userOrders = filteredByUserId(orders, idUser)

  const handleStatusFilter = status => {
    setSelectedStatus(status)
  }

  const handleChange = e => {
    const { value } = e.target
    setOrderList(value === null ? 'Todas las Ordenes' : value)
  }

  useEffect(() => {
    handleStatusFilter(orderList === 'Todas las Ordenes' ? null : orderList)
  }, [orderList])

  const filteredOrdersByStatus = selectedStatus
    ? userOrders.filter(order => order.OrderStatus.status === selectedStatus)
    : userOrders

  const selectStyle = {
    width: '200px',
    backgroundColor: '#414141',
    border: '1px solid #42e268',
  }

  const itemStyle = {
    backgroundColor: '#42e268',
    border: '1px solid #303030 ',
  }

  const textStyle = {
    color: 'white',
  }

  return (
    <Box
      sx={{
        mt: 10,
        display: 'flex',
        justifyContent: 'Center',
        padding: 10,
        alignItems: 'center',
      }}
    >
      <UserOptions />
      <Box
        sx={{
          backgroundColor: '#303030',
          padding: 10,
          border: '1px solid #42e268',
          borderRadius: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Select style={selectStyle} value={orderList} onChange={handleChange}>
          <MenuItem style={itemStyle} value='Pending'>
            Ordenes Pendientes
          </MenuItem>
          <MenuItem style={itemStyle} value='Approved'>
            Ordenes Aprobadas
          </MenuItem>
          <MenuItem style={itemStyle} value='Rejected'>
            Ordenes Rechazadas
          </MenuItem>
          <MenuItem style={itemStyle} value='Todas las Ordenes'>
            Todas las Ordenes
          </MenuItem>
        </Select>

        {filteredOrdersByStatus.map(order => (
          <Box
            key={order.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              margin: '10px',
            }}
          >
            <Typography style={textStyle} variant='body1'>Order ID: {order.id}</Typography>
            <Typography style={textStyle} variant='body1'>
              Order Date: {new Date(order.date).toLocaleString()}
            </Typography>
            <Typography style={textStyle} variant='body1'>
              Total Amount: ${parseFloat(order.totalAmount).toFixed(2)}
            </Typography>
            <Typography style={textStyle} variant='body1'>
              Status: {order.OrderStatus.status}
            </Typography>
            <Typography style={textStyle} variant='body1'>User: {order.User.name}</Typography>

            <List>
              {order.OrderLines.map(orderLine => (
                <ListItem key={orderLine.id}>
                  <Typography sx={{color: 'white'}} >
                    {orderLine.Shoe.name} - Quantity: {orderLine.quantity} -
                    Unit Price: ${parseFloat(orderLine.unitPrice).toFixed(2)}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default PurchaseHistory
