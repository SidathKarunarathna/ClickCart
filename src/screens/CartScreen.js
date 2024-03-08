import React from 'react';
import { Typography, Button, Grid, Paper, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';

const CartItem = ({ item, removeFromCart, increaseQty, decreaseQty }) => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <img src={item.image} alt={item.name} style={style} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="body1">Price: ${item.price}</Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button onClick={() => decreaseQty(item.id)} variant="outlined" color="primary">
              <RemoveIcon />
            </Button>
            <Typography variant="body1" style={{ margin: '0 8px' }}>
              {item.qty}
            </Typography>
            <Button onClick={() => increaseQty(item.id)} variant="outlined" color="primary">
              <AddIcon />
            </Button>
          </div>
          <Button onClick={() => removeFromCart(item.id)} variant="outlined" color="secondary">
            Remove
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

const CartScreen = ({ cartItems, removeFromCart, clearCart, increaseQty, decreaseQty }) => {
  const handlePlaceOrder = async () => {
    try {
      await axios.post('http://localhost:5000/api/orders', cartItems);
      clearCart();
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

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
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          <ShoppingCartIcon style={{ fontSize: 100, color: '#ccc' }} />
          <Typography variant="body1">Your cart is empty.</Typography>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              removeFromCart={removeFromCart}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
            />
          ))}
          <Button onClick={handlePlaceOrder} variant="contained" color="primary" sx={{ mr: 2 }}>
            Place Order
          </Button>
          <Button onClick={clearCart} variant="outlined" color="primary">
            Clear Cart
            <ClearIcon style={{ marginLeft: 8 }} />
          </Button>
        </div>
      )}
    </div>
  );
};
const style = {
  maxWidth: '40%',
  height: 'auto'
};

export default CartScreen;
