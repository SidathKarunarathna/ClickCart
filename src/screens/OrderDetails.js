import React, { useState, useEffect } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Button, AppBar, Toolbar } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // Import useParams

const OrderDetails = ({ID}) => {
  const { id } = useParams(); // Retrieve the id parameter from the URL
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        console.log(id); // Check if id is retrieved correctly
        const response = await axios.get(`http://localhost:5000/api/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [id]); // Make sure to include id in the dependency array

  const formatDate = (date) => {
    // Implement your date formatting logic here
    return date;
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
            ClickCart
          </Typography>
          <Button component={Link} to="/" color="inherit">Home</Button>
          <Button component={Link} to="/cart" color="inherit">Cart</Button>
          <Button component={Link} to="/order" color="inherit">Order</Button>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>
      <Typography variant="h6" gutterBottom>
        Order ID: {order.id}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Date: {formatDate(order.date)}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.qty}</TableCell>
                <TableCell>{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderDetails;
