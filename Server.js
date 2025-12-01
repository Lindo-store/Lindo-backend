// LINDO STORE BACKEND - SOUTH AFRICA
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const orders = [];

app.post('/payfast-notify', (req, res) => {
  const data = req.body;
  console.log('💰 Payment received:', data);
  
  res.status(200).send('OK');
  
  if (data.payment_status === 'COMPLETE') {
    const order = {
      id: data.m_payment_id,
      amount: data.amount_gross,
      customer: data.name_first + ' ' + data.name_last,
      email: data.email_address,
      status: 'paid',
      date: new Date().toLocaleString('en-ZA')
    };
    
    orders.push(order);
    console.log('✅ ORDER COMPLETE:', order);
  }
});

app.get('/api/orders', (req, res) => {
  res.json({ 
    success: true, 
    orders: orders,
    store: 'LINDO Store - South Africa',
    currency: 'ZAR'
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: '🇿🇦 LINDO Store Backend - Ready!',
    test_card: '5284 9732 7396 1239 (01/30 - 311)'
  });
});

app.listen(PORT, () => {
  console.log(`🛍️ LINDO Store backend on port ${PORT}`);
});
