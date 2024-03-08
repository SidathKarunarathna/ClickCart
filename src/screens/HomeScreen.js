import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardActionArea, CardContent, CardMedia, Typography, Button, Snackbar, AppBar, Toolbar } from '@mui/material';

const HomeScreen = ({ data, addToCart }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product,1);
    setSelectedProduct(product);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
          <Button component={Link} to="/order" color="inherit">Orders</Button>
        </Toolbar>
      </AppBar>
      <Typography variant="h3" gutterBottom>
        Welcome to ClickCart
      </Typography>
      <Grid container spacing={3}>
        {data.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardActionArea component={Link} to={`/product/${product.id}`}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                  {product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}
                </Typography>
                  <Typography variant="h6" color="text.secondary">
                    ${product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={`Added ${selectedProduct ? selectedProduct.name : ''} to cart`}
      />
    </div>
  );
}

export default HomeScreen;
