const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database dosya yolları
const MENU_DB = path.join(__dirname, 'data', 'menu.json');
const ORDERS_DB = path.join(__dirname, 'data', 'orders.json');
const USERS_DB = path.join(__dirname, 'data', 'users.json');

// Helper fonksiyonlar
async function readJSON(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

async function writeJSON(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// ============ AUTH ENDPOINTS ============

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const users = await readJSON(USERS_DB);
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    res.json({ 
      success: true, 
      token: 'demo_token_' + Date.now(),
      user: { username: user.username, role: user.role }
    });
  } else {
    res.status(401).json({ success: false, message: 'Kullanıcı adı veya şifre hatalı' });
  }
});

// ============ MENU ENDPOINTS ============

app.get('/api/menu', async (req, res) => {
  const menu = await readJSON(MENU_DB);
  res.json(menu);
});

app.post('/api/menu/item', async (req, res) => {
  const newItem = req.body;
  const menu = await readJSON(MENU_DB);
  
  const category = menu[newItem.category];
  if (!category) {
    return res.status(400).json({ success: false, message: 'Geçersiz kategori' });
  }
  
  // Yeni ID oluştur
  const maxId = Math.max(...Object.values(menu).flat().map(item => item.id), 0);
  newItem.id = maxId + 1;
  newItem.popular = newItem.popular || false;
  
  category.push(newItem);
  await writeJSON(MENU_DB, menu);
  
  res.json({ success: true, item: newItem });
});

app.put('/api/menu/item/:id', async (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedData = req.body;
  const menu = await readJSON(MENU_DB);
  
  let found = false;
  for (const category in menu) {
    const index = menu[category].findIndex(item => item.id === itemId);
    if (index !== -1) {
      menu[category][index] = { ...menu[category][index], ...updatedData };
      found = true;
      break;
    }
  }
  
  if (found) {
    await writeJSON(MENU_DB, menu);
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, message: 'Ürün bulunamadı' });
  }
});

app.delete('/api/menu/item/:id', async (req, res) => {
  const itemId = parseInt(req.params.id);
  const menu = await readJSON(MENU_DB);
  
  let found = false;
  for (const category in menu) {
    const index = menu[category].findIndex(item => item.id === itemId);
    if (index !== -1) {
      menu[category].splice(index, 1);
      found = true;
      break;
    }
  }
  
  if (found) {
    await writeJSON(MENU_DB, menu);
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, message: 'Ürün bulunamadı' });
  }
});

// ============ ORDER ENDPOINTS ============

app.get('/api/orders', async (req, res) => {
  const orders = await readJSON(ORDERS_DB);
  res.json(orders);
});

app.get('/api/orders/:tableNumber', async (req, res) => {
  const tableNumber = req.params.tableNumber;
  const orders = await readJSON(ORDERS_DB);
  const tableOrders = orders.filter(o => o.tableNumber === tableNumber);
  res.json(tableOrders);
});

app.post('/api/orders', async (req, res) => {
  const newOrder = req.body;
  const orders = await readJSON(ORDERS_DB);
  
  // Yeni order ID
  const maxId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) : 0;
  
  const order = {
    id: maxId + 1,
    tableNumber: newOrder.tableNumber,
    items: newOrder.items,
    totalPrice: newOrder.totalPrice,
    status: 'Hazırlanıyor',
    timestamp: new Date().toISOString(),
    notes: newOrder.notes || ''
  };
  
  orders.push(order);
  await writeJSON(ORDERS_DB, orders);
  
  res.json({ success: true, order });
});

app.patch('/api/orders/:id/status', async (req, res) => {
  const orderId = parseInt(req.params.id);
  const { status } = req.body;
  const orders = await readJSON(ORDERS_DB);
  
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    await writeJSON(ORDERS_DB, orders);
    res.json({ success: true, order });
  } else {
    res.status(404).json({ success: false, message: 'Sipariş bulunamadı' });
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  const orderId = parseInt(req.params.id);
  const orders = await readJSON(ORDERS_DB);
  
  const index = orders.findIndex(o => o.id === orderId);
  if (index !== -1) {
    orders.splice(index, 1);
    await writeJSON(ORDERS_DB, orders);
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, message: 'Sipariş bulunamadı' });
  }
});

// ============ STATS ENDPOINT ============

app.get('/api/stats', async (req, res) => {
  const orders = await readJSON(ORDERS_DB);
  const menu = await readJSON(MENU_DB);
  
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => {
    const price = parseFloat(o.totalPrice.replace('$', ''));
    return sum + price;
  }, 0);
  
  const totalProducts = Object.values(menu).flat().length;
  
  const activeOrders = orders.filter(o => o.status !== 'Tamamlandı').length;
  
  res.json({
    totalOrders,
    totalRevenue: `$${totalRevenue.toFixed(2)}`,
    totalProducts,
    activeOrders
  });
});

// Server başlat
app.listen(PORT, () => {
  console.log(`🚀 QR Menü Backend çalışıyor: http://localhost:${PORT}`);
});

