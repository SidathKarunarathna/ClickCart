// ProductScreen.js
import React, { useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Button, Box,Snackbar, AppBar, Toolbar } from '@mui/material';
import productsData from '../data/products.json';


const ProductScreen = ({ productID ,addToCart}) => {
  const { id } = useParams();
  const product = productsData.find(item => item.id === parseInt(id));
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };


  const handleAddToCart = () => {
    addToCart(product, quantity); 
    setSelectedProduct(product);
    setSnackbarOpen(true);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!product) {
    return <Typography variant="h6">Product not found!</Typography>;
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
      <Typography variant="h4">{product.name}</Typography>
      <img src={product.image} alt={product.name} style={style} />
      <Typography variant="body1">{product.description}</Typography>
      <Typography variant="h5">${product.price}</Typography>
      <Box display="flex" alignItems="center">
        <Button variant="outlined" onClick={decrementQuantity}>-</Button>
        <Typography variant="body1" sx={{ mx: 2 }}>{quantity}</Typography>
        <Button variant="outlined" onClick={incrementQuantity}>+</Button>
      </Box>
      <Button onClick={handleAddToCart} variant="contained">Add to Cart</Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={`Added ${selectedProduct ? selectedProduct.name : ''} to cart`}
      />
    </div>
  );
}
const style = {
  maxWidth: '40%',
  height: 'auto'
};
export default ProductScreen;
