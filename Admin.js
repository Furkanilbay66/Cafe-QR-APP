import React, { useState, useEffect } from 'react';
import { 
  LogOut, 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Package, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp,
  Clock,
  AlertCircle
} from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [currentTab, setCurrentTab] = useState('dashboard'); // dashboard, products, orders
  const [menuItems, setMenuItems] = useState({ meals: [], desserts: [], drinks: [] });
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({});
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [newItem, setNewItem] = useState({
    category: 'meals',
    name: '',
    price: '',
    description: '',
    image: '',
    popular: false
  });

  useEffect(() => {
    if (isLoggedIn) {
      loadData();
      const interval = setInterval(loadData, 5000); // Her 5 saniyede bir güncelle
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  const loadData = async () => {
    try {
      const [menuRes, ordersRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/menu`),
        fetch(`${API_URL}/orders`),
        fetch(`${API_URL}/stats`)
      ]);
      
      setMenuItems(await menuRes.json());
      setOrders(await ordersRes.json());
      setStats(await statsRes.json());
    } catch (error) {
      console.error('Veri yüklenemedi:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsLoggedIn(true);
        setLoginError('');
      } else {
        setLoginError(data.message);
      }
    } catch (error) {
      setLoginError('Giriş başarısız');
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch(`${API_URL}/menu/item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsAddModalOpen(false);
        setNewItem({
          category: 'meals',
          name: '',
          price: '',
          description: '',
          image: '',
          popular: false
        });
        loadData();
      }
    } catch (error) {
      console.error('Ürün eklenemedi:', error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await fetch(`${API_URL}/menu/item/${editingItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsEditModalOpen(false);
        setEditingItem(null);
        loadData();
      }
    } catch (error) {
      console.error('Ürün güncellenemedi:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;
    
    try {
      const response = await fetch(`${API_URL}/menu/item/${id}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.success) {
        loadData();
      }
    } catch (error) {
      console.error('Ürün silinemedi:', error);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      const data = await response.json();
      
      if (data.success) {
        loadData();
      }
    } catch (error) {
      console.error('Sipariş durumu güncellenemedi:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Bu siparişi silmek istediğinize emin misiniz?')) return;
    
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.success) {
        loadData();
      }
    } catch (error) {
      console.error('Sipariş silinemedi:', error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <Package size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-gray-400">Lumière QR Menü Yönetimi</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Kullanıcı Adı</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none focus:border-amber-500"
                placeholder="admin"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none focus:border-amber-500"
                placeholder="••••••••"
                required
              />
            </div>
            
            {loginError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                {loginError}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all"
            >
              Giriş Yap
            </button>
          </form>
          
          <div className="mt-6 p-4 bg-white/5 rounded-xl">
            <p className="text-xs text-gray-400 text-center">
              Varsayılan: <span className="text-amber-400">admin / admin123</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const StatCard = ({ icon, title, value, color }) => (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-white text-3xl font-bold">{value}</p>
    </div>
  );

  const ProductModal = ({ isOpen, onClose, isEdit = false }) => {
    if (!isOpen) return null;
    
    const item = isEdit ? editingItem : newItem;
    const setItem = isEdit ? setEditingItem : setNewItem;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
        <div className="w-full max-w-2xl bg-gray-900 border border-white/10 rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {isEdit ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg text-gray-400">
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Kategori</label>
              <select
                value={item.category}
                onChange={(e) => setItem({ ...item, category: e.target.value })}
                className="w-full p-3 bg-white/10 border border-white/10 rounded-xl text-white outline-none focus:border-amber-500"
              >
                <option value="meals">Ana Yemekler</option>
                <option value="desserts">Tatlılar</option>
                <option value="drinks">İçecekler</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Ürün Adı</label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => setItem({ ...item, name: e.target.value })}
                className="w-full p-3 bg-white/10 border border-white/10 rounded-xl text-white outline-none focus:border-amber-500"
                placeholder="örn. Wagyu Biftek"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Fiyat</label>
              <input
                type="text"
                value={item.price}
                onChange={(e) => setItem({ ...item, price: e.target.value })}
                className="w-full p-3 bg-white/10 border border-white/10 rounded-xl text-white outline-none focus:border-amber-500"
                placeholder="örn. $85.00"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Açıklama</label>
              <textarea
                value={item.description}
                onChange={(e) => setItem({ ...item, description: e.target.value })}
                className="w-full p-3 bg-white/10 border border-white/10 rounded-xl text-white outline-none focus:border-amber-500 min-h-[100px]"
                placeholder="Ürün açıklaması..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Görsel URL (Unsplash)</label>
              <input
                type="text"
                value={item.image}
                onChange={(e) => setItem({ ...item, image: e.target.value })}
                className="w-full p-3 bg-white/10 border border-white/10 rounded-xl text-white outline-none focus:border-amber-500"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
            
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={item.popular}
                onChange={(e) => setItem({ ...item, popular: e.target.checked })}
                className="w-5 h-5 rounded border-white/10"
              />
              <label className="text-sm font-medium text-gray-300">Şef Önerisi olarak işaretle</label>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
            >
              İptal
            </button>
            <button
              onClick={isEdit ? handleUpdateProduct : handleAddProduct}
              className="flex-1 py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Save size={18} />
              <span>{isEdit ? 'Güncelle' : 'Ekle'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const DashboardTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<ShoppingBag size={24} className="text-white" />}
          title="Toplam Sipariş"
          value={stats.totalOrders || 0}
          color="from-blue-400 to-blue-600"
        />
        <StatCard 
          icon={<DollarSign size={24} className="text-white" />}
          title="Toplam Gelir"
          value={stats.totalRevenue || '$0.00'}
          color="from-green-400 to-green-600"
        />
        <StatCard 
          icon={<Package size={24} className="text-white" />}
          title="Toplam Ürün"
          value={stats.totalProducts || 0}
          color="from-purple-400 to-purple-600"
        />
        <StatCard 
          icon={<Clock size={24} className="text-white" />}
          title="Aktif Sipariş"
          value={stats.activeOrders || 0}
          color="from-amber-400 to-amber-600"
        />
      </div>
      
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Son Siparişler</h3>
        <div className="space-y-3">
          {orders.slice(0, 5).map(order => (
            <div key={order.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
              <div>
                <p className="text-white font-medium">Masa {order.tableNumber}</p>
                <p className="text-gray-400 text-sm">{new Date(order.timestamp).toLocaleString('tr-TR')}</p>
              </div>
              <div className="text-right">
                <p className="text-amber-400 font-bold">{order.totalPrice}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  order.status === 'Hazırlanıyor' ? 'bg-yellow-500/20 text-yellow-400' :
                  order.status === 'Yolda' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProductsTab = () => {
    const allItems = [...menuItems.meals, ...menuItems.desserts, ...menuItems.drinks];
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Ürün Yönetimi</h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
          >
            <Plus size={20} />
            <span>Yeni Ürün</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allItems.map(item => (
            <div key={item.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all">
              <img 
                src={item.image} 
                alt={item.name}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/fallback.jpg';
                }}
                className="w-full h-48 object-cover" 
              />
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-bold">{item.name}</h3>
                  {item.popular && (
                    <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full">Özel</span>
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 font-bold text-lg">{item.price}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingItem(item);
                        setIsEditModalOpen(true);
                      }}
                      className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(item.id)}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const OrdersTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Sipariş Yönetimi</h2>
      
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Masa {order.tableNumber}</h3>
                <p className="text-gray-400 text-sm">{new Date(order.timestamp).toLocaleString('tr-TR')}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-amber-400">{order.totalPrice}</p>
                <select
                  value={order.status}
                  onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                  className={`mt-2 px-3 py-1 rounded-full text-xs font-medium outline-none cursor-pointer ${
                    order.status === 'Hazırlanıyor' ? 'bg-yellow-500/20 text-yellow-400' :
                    order.status === 'Yolda' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-green-500/20 text-green-400'
                  }`}
                >
                  <option value="Hazırlanıyor">Hazırlanıyor</option>
                  <option value="Yolda">Yolda</option>
                  <option value="Tamamlandı">Tamamlandı</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/fallback.jpg';
                      }}
                      className="w-12 h-12 rounded-lg object-cover" 
                    />
                    <div>
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-gray-400 text-sm">Adet: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-amber-400 font-bold">{item.price}</span>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => handleDeleteOrder(order.id)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all"
            >
              <Trash2 size={16} />
              <span>Siparişi Sil</span>
            </button>
          </div>
        ))}
        
        {orders.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
            <p>Henüz sipariş yok</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <Package size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Lumière Admin</h1>
              <p className="text-xs text-gray-400">Yönetim Paneli</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all"
          >
            <LogOut size={18} />
            <span>Çıkış</span>
          </button>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2">
            {[
              { id: 'dashboard', label: 'Genel Bakış', icon: <TrendingUp size={18} /> },
              { id: 'products', label: 'Ürünler', icon: <Package size={18} /> },
              { id: 'orders', label: 'Siparişler', icon: <ShoppingBag size={18} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                  currentTab === tab.id
                    ? 'text-amber-400 border-b-2 border-amber-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {currentTab === 'dashboard' && <DashboardTab />}
        {currentTab === 'products' && <ProductsTab />}
        {currentTab === 'orders' && <OrdersTab />}
      </div>
      
      {/* Modals */}
      <ProductModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <ProductModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} isEdit={true} />
    </div>
  );
}

