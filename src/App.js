import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import data from './data/products.json';
import cartItemsData from './data/cartItems.json';
import orderItemsData from './data/orderItems.json';
import OrderList from './screens/OrderList';
import NotFound from './screens/NotFound';
import OrderDetails from './screens/OrderDetails';


function App() {
  const [products, setProducts] = useState(data);
  const [cartItems, setCartItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    setCartItems(cartItemsData);
  }, []);

  useEffect(() => {
    setOrderItems(orderItemsData);
  }, []);

  const addToCart = (product, quantity) => {
    const existItem = cartItems.find(item => item.id === product.id);
    if (existItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...existItem, qty: existItem.qty + quantity } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, qty: quantity }]);
    }
  };
  

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const createOrderItem = (newOrderItem) => {
    setOrderItems([...orderItems, newOrderItem]);
  };

  const updateOrderItem = (updatedOrderItem) => {
    setOrderItems(orderItems.map(item =>
      item.id === updatedOrderItem.id ? updatedOrderItem : item
    ));
  };

  const deleteOrderItem = (orderId) => {
    setOrderItems(orderItems.filter(item => item.id !== orderId));
  };

  const updateProduct = (updatedProduct) => {
    // Find the index of the updated product in the products array
    const index = products.findIndex(product => product.id === updatedProduct.id);
    // Create a new array with the updated product
    const updatedProducts = [...products];
    updatedProducts[index] = updatedProduct;
    // Update the state with the new array of products
    setProducts(updatedProducts);
  };

  const deleteProduct = (productId) => {
    // Filter out the deleted product from the products array
    const updatedProducts = products.filter(product => product.id !== productId);
    // Update the state with the new array of products
    setProducts(updatedProducts);
  };

  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // Function to decrease quantity of an item in the cart
  const decreaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty - 1) } : item
      )
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen data={products} addToCart={addToCart} createOrderItem={createOrderItem} updateOrderItem={updateOrderItem} deleteOrderItem={deleteOrderItem} />} />
        <Route path="/product/:id" element={<ProductScreen data={products} addToCart={addToCart} updateProduct={updateProduct} deleteProduct={deleteProduct} />} />
        <Route path="/cart" element={<CartScreen cartItems={cartItems} removeFromCart={removeFromCart} clearCart={clearCart} increaseQty={increaseQty} decreaseQty={decreaseQty}/>} />
        <Route path="/order" element={<OrderList />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route component={NotFound} />
      </Routes>
    </Router>
  );
}

export default App;
