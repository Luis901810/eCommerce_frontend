import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { API_URL } from '../../../../redux/actions-type'
import axios from 'axios'
import UserOptions from '../UserOptions'
import { Box } from '@mui/system'
import { Button, Typography, Select, MenuItem } from '@mui/material'

const PurchaseHistory = () => {
  const idUser = useSelector(state => state.User.id)
  const [orders, setOrders] = useState([])
  const [selectedStatus, setSelectedStatus] = useState(null)

  const [orderList, setOrderList] = useState('Todas las ordenes')

  useEffect(() => {
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
    handleStatusFilter(orderList === 'Todas las Ordenes' ? null : orderList);
  }, [orderList]);
  

  const filteredOrdersByStatus = selectedStatus
    ? userOrders.filter(order => order.OrderStatus.status === selectedStatus)
    : userOrders

    const selectStyle = {
      width: '200px',
      backgroundColor: '#414141',
      border: '1px solid #42e268'
    }

    const itemStyle = {
      backgroundColor: '#42e268',
      border: '1px solid #303030 ', 
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
          alignItems: 'center'
        }}
      >
        <Select style={selectStyle} value={orderList} onChange={handleChange}>
          <MenuItem style={itemStyle} value='Pending'>Ordenes Pendientes</MenuItem>
          <MenuItem style={itemStyle} value='Approved'>Ordenes Aprobadas</MenuItem>
          <MenuItem style={itemStyle} value='Rejected'>Ordenes Rechazadas</MenuItem>
          <MenuItem style={itemStyle} value='Todas las Ordenes'>Todas las Ordenes</MenuItem>
        </Select>

        {filteredOrdersByStatus.map(order => (
          <div
            key={order.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              margin: '10px',
            }}
          >
            <p>Order ID: {order.id}</p>
            <p>Order Date: {new Date(order.date).toLocaleString()}</p>
            <p>Total Amount: ${parseFloat(order.totalAmount).toFixed(2)}</p>
            <p>Status: {order.OrderStatus.status}</p>
            <p>User: {order.User.name}</p>
            <ul>
              {order.OrderLines.map(orderLine => (
                <li key={orderLine.id}>
                  {orderLine.Shoe.name} - Quantity: {orderLine.quantity} - Unit
                  Price: ${parseFloat(orderLine.unitPrice).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Box>
    </Box>
  )
}

export default PurchaseHistory
