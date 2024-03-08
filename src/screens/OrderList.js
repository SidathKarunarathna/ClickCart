import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Divider ,Button, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

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
        Order List
      </Typography>
      <List>
        {orders.map(order => (
          <React.Fragment key={order.id}>
            <ListItem button component={Link} to={`/order/${order.id}`}> {/* Update the Link component here */}
              <ListItemText
                primary={`Order #${order.id}`}
                secondary={`Date: ${order.date}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default OrderList;
