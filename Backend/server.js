// Backend (Node.js with Express)

const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

const orderItemsFile = './data/orderItems.json';

// Restructure the data format for orders
const restructureOrdersData = (orders) => {
  return orders.map(order => ({
    id: order.id,
    date: order.date,
    items: Object.keys(order)
      .filter(key => !isNaN(parseInt(key))) // Filter out non-numeric keys
      .map(key => order[key]) // Map over the numeric keys to get the item objects
  }));
};
const restructureOrderData = (order) => {
  return {
    id: order.id,
    date: order.date,
    items: Object.keys(order)
      .filter(key => !isNaN(parseInt(key))) // Filter out non-numeric keys
      .map(key => order[key]) // Map over the numeric keys to get the item objects
  };
};
// GET method to fetch orders
app.get('/api/orders', (req, res) => {
  try {
    const orderItems = JSON.parse(fs.readFileSync(orderItemsFile));
    const formattedOrders = restructureOrdersData(orderItems);
    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send('Error fetching orders');
  }
});
app.get('/api/orders/:id', (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const orderItems = JSON.parse(fs.readFileSync(orderItemsFile));
    const order = orderItems.find(order => order.id === orderId);
    if (!order) {
      return res.status(404).send('Order not found');
    }
    const restructuredOrder = restructureOrderData(order);
    res.status(200).json(restructuredOrder);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).send('Error fetching order');
  }
});

// POST method to place an order
app.post('/api/orders', (req, res) => {
  try {
    const orderItems = JSON.parse(fs.readFileSync(orderItemsFile));
    const newOrder = {
      id: orderItems.length + 1, // Unique identifier
      date: new Date().toISOString(), // Current date
      total: req.body.total, // Total amount
      // Other properties from req.body
      ...req.body,
    };
    orderItems.push(newOrder);
    fs.writeFileSync(orderItemsFile, JSON.stringify(orderItems, null, 2));
    res.status(200).send('Order placed successfully!');
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).send('Error placing order');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
