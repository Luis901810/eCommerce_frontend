import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../../../../redux/actions-type";
import axios from "axios";
import UserOptions from "../UserOptions";

const PurchaseHistory = () => {
  const idUser = useSelector((state) => state.User.id);
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/order`);
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  const filteredByUserId = (orders, userId) => {
    return orders.filter((order) => order.userId === userId);
  };

  const userOrders = filteredByUserId(orders, idUser);

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
  };

  const filteredOrdersByStatus = selectedStatus
    ? userOrders.filter((order) => order.OrderStatus.status === selectedStatus)
    : userOrders;

  return (
    <div>
      <h1>Purchase History</h1>
      <UserOptions/>
      <div>
        <button onClick={() => handleStatusFilter("Pending")}>OrdenesPendientes</button>
        <button onClick={() => handleStatusFilter("Approved")}>Ordenes Aprobadas</button>
        <button onClick={() => handleStatusFilter("Rejected")}>Ordenes Rechazadas</button>
        <button onClick={() => handleStatusFilter(null)}>Todas las Ordenes</button>
      </div>
      {filteredOrdersByStatus.map((order) => (
        <div key={order.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <p>Order ID: {order.id}</p>
          <p>Order Date: {new Date(order.date).toLocaleString()}</p>
          <p>Total Amount: ${parseFloat(order.totalAmount).toFixed(2)}</p>
          <p>Status: {order.OrderStatus.status}</p>
          <p>User: {order.User.name}</p>
          <ul>
            {order.OrderLines.map((orderLine) => (
              <li key={orderLine.id}>
                {orderLine.Shoe.name} - Quantity: {orderLine.quantity} - Unit Price: ${parseFloat(orderLine.unitPrice).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PurchaseHistory;
