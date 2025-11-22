import React, { useState, useEffect, useRef } from 'react';
import { 
  Utensils, 
  Coffee, 
  Wine, 
  Home, 
  Heart, 
  ChevronLeft, 
  Moon, 
  Sun, 
  Search,
  ChefHat,
  ArrowRight,
  Sparkles,
  MessageCircle,
  X,
  Send,
  ShieldCheck,
  Filter,
  AlertCircle,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CheckCircle
} from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

/**
 * Ana Uygulama Bileşeni - QR Menü + Sipariş Sistemi
 */
export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentView, setCurrentView] = useState('home');
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Menü verileri (API'den gelecek)
  const [menuItems, setMenuItems] = useState({ meals: [], desserts: [], drinks: [] });
  const [categories, setCategories] = useState([
    { 
      id: 'meals', 
      title: 'Ana Yemekler', 
      subtitle: 'Özel Ana Yemeklerimiz',
      icon: <Utensils size={24} />,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
      color: "from-orange-400 to-red-500"
    },
    { 
      id: 'desserts', 
      title: 'Tatlılar', 
      subtitle: 'El Yapımı Tatlılar',
      icon: <Coffee size={24} />,
      image: "https://images.unsplash.com/photo-1563729768-b638c6537a96?auto=format&fit=crop&q=80&w=600",
      color: "from-pink-400 to-rose-500"
    },
    { 
      id: 'drinks', 
      title: 'İçecekler', 
      subtitle: 'Kokteyller & Serinletici İçecekler',
      icon: <Wine size={24} />,
      image: "https://images.unsplash.com/photo-1514362545857-3bc16549766b?auto=format&fit=crop&q=80&w=600",
      color: "from-blue-400 to-indigo-500"
    }
  ]);
  
  // Sipariş Sistemi
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState(localStorage.getItem('tableNumber') || '');
  const [orderStatus, setOrderStatus] = useState(null);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  
  // Yapay Zeka Durumu
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'model', text: "Merhaba! Ben Lumière'in yapay zeka asistandıyım. Size menü önerileri verebilir, malzemeler hakkında bilgi verebilir veya tercihlerinize göre yardımcı olabilirim. Nasıl yardımcı olabilirim?" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);
  
  // Diyet Filtresi
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dietaryQuery, setDietaryQuery] = useState('');
  const [activeRestriction, setActiveRestriction] = useState(null);
  const [safeItemIds, setSafeItemIds] = useState(null);
  const [isFiltering, setIsFiltering] = useState(false);

  // Menüyü API'den yükle
  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      // Önce cache'den kontrol et
      const cachedMenu = localStorage.getItem('cachedMenu');
      if (cachedMenu && !navigator.onLine) {
        setMenuItems(JSON.parse(cachedMenu));
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/menu`);
      const data = await response.json();
      setMenuItems(data);
      
      // Cache'e kaydet
      localStorage.setItem('cachedMenu', JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      console.error('Menü yüklenemedi:', error);
      
      // Offline ise cache'den yükle
      const cachedMenu = localStorage.getItem('cachedMenu');
      if (cachedMenu) {
        setMenuItems(JSON.parse(cachedMenu));
      }
      setLoading(false);
    }
  };

  // İlk yükleme
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  // Masa numarasını kaydet
  useEffect(() => {
    if (tableNumber) {
      localStorage.setItem('tableNumber', tableNumber);
    }
  }, [tableNumber]);

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // ============ SEPETİ YÖNETİM FONKSİYONLARI ============
  
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, delta) => {
    setCart(cart.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const createOrder = async () => {
    if (!tableNumber || cart.length === 0) {
      alert('Lütfen masa numaranızı girin ve sepetinize ürün ekleyin');
      return;
    }

    try {
      const orderData = {
        tableNumber,
        items: cart,
        totalPrice: `$${getTotalPrice()}`,
        notes: ''
      };

      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();
      
      if (result.success) {
        setOrderStatus(result.order);
        setShowOrderSuccess(true);
        setCart([]);
        
        setTimeout(() => {
          setShowOrderSuccess(false);
          setCurrentView('home');
        }, 3000);
      }
    } catch (error) {
      console.error('Sipariş oluşturulamadı:', error);
      alert('Sipariş oluşturulurken bir hata oluştu');
    }
  };

  // ============ YAPAY ZEKA FONKSİYONLARI ============

  const callGeminiChat = async (userMessage) => {
    const apiKey = "AIzaSyDHNBcQgMzaP7QZ6T23e3eNrVjLKrxZl84";
    if (!apiKey) {
      setChatMessages(prev => [...prev, { role: 'model', text: "Şu anda çevrimdışıyım (API anahtarı eksik). Lütfen daha sonra tekrar deneyin." }]);
      setIsAiLoading(false);
      setIsAiTyping(false);
      return;
    }

    // Offline kontrolü
    if (!navigator.onLine) {
      setChatMessages(prev => [...prev, { role: 'model', text: "İnternet bağlantınız yok gibi görünüyor. Lütfen bağlantınızı kontrol edin." }]);
      setIsAiLoading(false);
      setIsAiTyping(false);
      return;
    }

    setIsAiTyping(true);

    try {
      const systemPrompt = `
        Sen Lumière adlı lüks bir restoranın yapay zeka asistandısın. 
        Tarzın sofistike, kibar, bilgili ve özlü (profesyonel bir sommelier gibi).
        
        Menü Verileri: ${JSON.stringify(menuItems)}
        
        Yetenekler:
        1. Menüden yemek/içecek eşleştirmeleri öner.
        2. Malzemeleri açıkla.
        3. Ruh haline göre yemek öner (örn. "romantik", "hafif", "maceracı").
        4. Alerjenler sorulursa, misafirlerin garsona bilgi vermesi gerektiğini belirt.
        
        Cevapları kısa tut (max 2-3 cümle) detaylı açıklama istenmedikçe. 
        Her zaman menüdeki ürünlerden öner.
      `;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: systemPrompt + "\n\nKullanıcı Sorusu: " + userMessage }] }
            ]
          })
        }
      );

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Üzgünüm, bu bilgiyi alırken sorun yaşıyorum.";
      
      setChatMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    } catch (error) {
      console.error("Gemini API Hatası:", error);
      setChatMessages(prev => [...prev, { role: 'model', text: "Üzgünüm, şu anda mutfağa bağlanamıyorum. Lütfen garsonunuza sorun." }]);
    } finally {
      setIsAiLoading(false);
      setIsAiTyping(false);
    }
  };

  const analyzeDietaryNeeds = async (restriction) => {
    const apiKey = "AIzaSyDHNBcQgMzaP7QZ6T23e3eNrVjLKrxZl84";
    if (!apiKey || !restriction.trim()) return;

    setIsFiltering(true);
    try {
      const systemPrompt = `
        Sen bir restoran için gıda güvenliği yapay zekasısın.
        
        Menü Verileri: ${JSON.stringify(menuItems)}
        Kullanıcı Kısıtlaması: "${restriction}"
        
        Görev: Menüdeki her ürünü analiz et. Kullanıcı Kısıtlamasına uygun olup olmadığını belirle.
        - Muhafazakar ol. Emin değilsen (örn. "sos" gluten içerebilir), güvensiz işaretle.
        - Sadece "safeItemIds" anahtarı içeren bir JSON nesnesi döndür, içinde güvenli olan ID'leri (tamsayılar) tut.
        
        Yanıt Formatı: SADECE JSON. Markdown yok.
        Örnek: { "safeItemIds": [101, 104, 303] }
      `;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
            generationConfig: { responseMimeType: "application/json" }
          })
        }
      );

      const data = await response.json();
      const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const result = JSON.parse(resultText);

      if (result && result.safeItemIds) {
        setSafeItemIds(result.safeItemIds);
        setActiveRestriction(restriction);
        setIsFilterOpen(false);
      }
    } catch (error) {
      console.error("Diyet Analizi Hatası:", error);
      setSafeItemIds(null);
    } finally {
      setIsFiltering(false);
    }
  };

  const clearFilter = () => {
    setSafeItemIds(null);
    setActiveRestriction(null);
    setDietaryQuery('');
  };

  const handleSendMessage = async (text = userInput) => {
    if (!text.trim() || isSending) return;
    
    setIsSending(true);
    const newMsg = { role: 'user', text: text };
    setChatMessages(prev => [...prev, newMsg]);
    setUserInput('');
    setIsAiLoading(true);
    
    await callGeminiChat(text);
    
    // Anti-spam: 300ms bekleme
    setTimeout(() => setIsSending(false), 300);
  };

  const openChatWithPrompt = (prompt) => {
    setIsChatOpen(true);
    handleSendMessage(prompt);
  };

  // Tema Sınıfları
  const theme = {
    bg: darkMode 
      ? 'bg-[#0a0a0a] text-white' 
      : 'bg-slate-50 text-slate-900',
    card: darkMode 
      ? 'bg-white/5 border-white/10 text-white' 
      : 'bg-white/70 border-slate-200 text-slate-900',
    glass: darkMode 
      ? 'backdrop-blur-xl bg-black/40 border border-white/10' 
      : 'backdrop-blur-xl bg-white/60 border border-white/20',
    accent: 'text-amber-400',
    subtext: darkMode ? 'text-gray-400' : 'text-gray-500',
    nav: darkMode 
      ? 'bg-black/80 border-t border-white/10' 
      : 'bg-white/90 border-t border-slate-200',
    heading: 'font-serif tracking-wide',
    chatUser: darkMode ? 'bg-amber-600 text-white' : 'bg-amber-500 text-white',
    chatModel: darkMode ? 'bg-white/10 text-gray-200' : 'bg-white shadow-sm text-gray-800'
  };

  // Yükleme Ekranı
  if (loading) {
    return (
      <div className={`h-screen w-full flex flex-col items-center justify-center ${theme.bg} transition-colors duration-500`}>
        <div className="relative">
          <div className={`w-20 h-20 rounded-full border-t-2 border-b-2 border-amber-400 animate-spin`}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <ChefHat size={32} className="text-amber-400" />
          </div>
        </div>
        <h1 className={`mt-6 text-2xl font-light tracking-[0.2em] uppercase ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Lumière
        </h1>
        <p className={`text-xs mt-2 tracking-widest ${theme.subtext}`}>Lezzetli Deneyim</p>
      </div>
    );
  }

  /* --- BİLEŞENLER --- */

  const Header = ({ title, showBack = false, showFilter = false, showCart = false }) => (
    <div className={`sticky top-0 z-40 w-full px-6 py-4 flex justify-between items-center ${theme.glass}`}>
      <div className="flex items-center gap-3">
        {showBack && (
          <button 
            onClick={() => setCurrentView('categories')}
            className={`p-2 rounded-full ${darkMode ? 'hover:bg-white/10' : 'hover:bg-slate-200/50'} transition-all`}
          >
            <ChevronLeft size={20} />
          </button>
        )}
        <h2 className={`text-xl font-medium ${theme.heading}`}>{title}</h2>
      </div>
      
      <div className="flex items-center gap-2">
        {showCart && (
          <button 
            onClick={() => setCurrentView('cart')}
            className={`p-2 rounded-full relative transition-colors ${darkMode ? 'bg-white/10' : 'bg-slate-200'}`}
          >
            <ShoppingCart size={18} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </button>
        )}
        {showFilter && (
          <button 
            onClick={() => setIsFilterOpen(true)}
            className={`p-2 rounded-full transition-colors ${activeRestriction ? 'bg-amber-500 text-white' : (darkMode ? 'bg-white/10' : 'bg-slate-200')}`}
          >
            <ShieldCheck size={18} />
          </button>
        )}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full ${darkMode ? 'bg-white/10' : 'bg-slate-200'} transition-colors`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  );

  const DietaryFilterModal = () => {
    if (!isFilterOpen) return null;
    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center px-6 bg-black/80 backdrop-blur-sm animate-fade-in">
        <div className={`w-full max-w-sm p-6 rounded-2xl shadow-2xl ${darkMode ? 'bg-[#1a1a1a] border border-white/10' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-amber-500">
              <ShieldCheck size={24} />
              <h3 className="text-lg font-serif font-semibold">Diyet İhtiyaçları</h3>
            </div>
            <button onClick={() => setIsFilterOpen(false)} className="opacity-50 hover:opacity-100">
              <X size={20} />
            </button>
          </div>
          
          <p className={`text-sm mb-4 ${theme.subtext}`}>
            Diyet kısıtlamalarınızı açıklayın (örn. "Glütensiz", "Vegan", "Deniz ürünleri yok"). 
            Yapay zekamız size güvenli ürünleri gösterecek.
          </p>
          <div className="space-y-4">
            <input 
              type="text" 
              value={dietaryQuery}
              onChange={(e) => setDietaryQuery(e.target.value)}
              placeholder="örn. Fıstık alerjim var..."
              className={`w-full p-3 rounded-xl outline-none border ${darkMode ? 'bg-black/30 border-white/10 focus:border-amber-500' : 'bg-slate-50 border-slate-200 focus:border-amber-500'}`}
            />
            
            <button 
              onClick={() => analyzeDietaryNeeds(dietaryQuery)}
              disabled={isFiltering || !dietaryQuery.trim()}
              className="w-full py-3 rounded-xl bg-amber-500 text-white font-medium disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {isFiltering ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Menü Analiz Ediliyor...</span>
                </>
              ) : (
                <>
                  <Filter size={18} />
                  <span>Filtre Uygula</span>
                </>
              )}
            </button>
            {activeRestriction && (
              <button 
                onClick={clearFilter}
                className="w-full py-3 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 font-medium"
              >
                Filtreleri Temizle
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const AIChatOverlay = () => {
    if (!isChatOpen) return null;
    return (
      <div className="fixed inset-0 z-[60] flex flex-col bg-black/60 backdrop-blur-sm animate-fade-in">
        <div className={`flex-1 mt-12 mx-4 mb-24 rounded-2xl overflow-hidden flex flex-col shadow-2xl border ${darkMode ? 'bg-gray-900 border-white/10' : 'bg-white border-slate-200'}`}>
          
          {/* Sohbet Başlığı */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-amber-600 to-amber-700">
            <div className="flex items-center gap-2 text-white">
              <Sparkles size={18} className="text-yellow-200 fill-yellow-200 animate-pulse" />
              <span className="font-serif font-medium tracking-wide">Lumière Asistan</span>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="text-white/80 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Mesaj Alanı */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${darkMode ? 'bg-[#111]' : 'bg-slate-50'}`}>
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? theme.chatUser + ' rounded-br-none' : theme.chatModel + ' rounded-bl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isAiTyping && (
              <div className="flex justify-start items-center gap-2">
                <div className={`px-4 py-3 rounded-2xl rounded-bl-none flex gap-1 items-center ${theme.chatModel}`}>
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-xs text-gray-400">AI yazıyor...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Giriş Alanı */}
          <div className={`p-3 border-t ${darkMode ? 'bg-gray-900 border-white/10' : 'bg-white border-slate-200'}`}>
            <div className="flex items-start gap-2">
              <textarea
                ref={textareaRef}
                rows={1}
                value={userInput}
                onChange={(e) => {
                  setUserInput(e.target.value);
                  // Auto-resize
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                    // Reset height
                    if (textareaRef.current) {
                      textareaRef.current.style.height = 'auto';
                    }
                  }
                }}
                placeholder="Öneriler için sorun... (Shift+Enter: yeni satır)"
                className={`flex-1 p-3 rounded-xl text-sm outline-none resize-none ${darkMode ? 'bg-white/5 text-white placeholder-gray-500' : 'bg-slate-100 text-slate-900'}`}
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
              <button 
                onClick={() => {
                  handleSendMessage();
                  if (textareaRef.current) {
                    textareaRef.current.style.height = 'auto';
                  }
                }}
                disabled={!userInput.trim() || isAiLoading || isSending}
                className="p-3 rounded-xl bg-amber-500 text-white disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 mt-0.5"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const FloatingChatButton = () => (
    <button
      onClick={() => setIsChatOpen(true)}
      className="fixed bottom-20 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 shadow-lg shadow-amber-500/30 flex items-center justify-center text-white hover:scale-110 transition-transform active:scale-95 group"
    >
      <Sparkles size={24} className="absolute animate-ping opacity-20" />
      <MessageCircle size={24} className="fill-white/20" />
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-[#0a0a0a]" />
    </button>
  );

  const HomeScreen = () => (
    <div className="flex flex-col h-full relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[40%] bg-purple-500/20 blur-[100px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[40%] bg-amber-500/10 blur-[100px] rounded-full" />
      
      <div className="flex-1 flex flex-col items-center justify-center px-8 z-10 text-center">
        <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-8 ${darkMode ? 'bg-gradient-to-br from-gray-800 to-black border border-white/10' : 'bg-white shadow-lg'} shadow-2xl`}>
          <ChefHat size={48} className="text-amber-500" />
        </div>
        
        <h1 className={`text-4xl mb-3 ${theme.heading}`}>Lumière</h1>
        <p className={`text-sm uppercase tracking-[0.3em] mb-8 ${theme.subtext}`}>Lezzetli Yolculuk</p>
        
        {/* Masa Numarası */}
        {!tableNumber && (
          <div className="w-full max-w-xs mb-6">
            <input
              type="text"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="Masa Numaranız"
              className={`w-full p-4 rounded-xl text-center text-lg outline-none border-2 ${darkMode ? 'bg-white/5 border-white/10 focus:border-amber-500' : 'bg-white border-slate-200 focus:border-amber-500'}`}
            />
          </div>
        )}
        
        {tableNumber && (
          <div className={`mb-6 px-4 py-2 rounded-full ${darkMode ? 'bg-white/10' : 'bg-slate-200'}`}>
            <span className={theme.subtext}>Masa: </span>
            <span className="font-bold text-amber-500">{tableNumber}</span>
          </div>
        )}
        
        <p className={`text-lg leading-relaxed mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Lezzetin sanatla buluştuğu gastronomi deneyimini yaşayın.
        </p>
        
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button 
            onClick={() => setCurrentView('categories')}
            className="group relative w-full py-4 rounded-xl overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600" />
            <div className="relative flex items-center justify-center gap-3 text-white font-medium tracking-wide">
              <span>Menüyü Görüntüle</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
          
          <button 
            onClick={() => setIsChatOpen(true)}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-medium transition-all ${darkMode ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'}`}
          >
            <Sparkles size={16} className="text-amber-500" />
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Yapay Zeka Asistan</span>
          </button>
        </div>
      </div>
    </div>
  );

  const CategoriesScreen = () => (
    <div className="pb-24 min-h-screen animate-fade-in">
      <Header title="Menü" showFilter={true} showCart={true} />
      
      <div className="p-6 flex flex-col gap-2">
        {activeRestriction && (
          <div className="flex items-center justify-between p-3 mb-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center gap-2 text-amber-500">
              <ShieldCheck size={16} />
              <span className="text-xs font-bold uppercase tracking-wide">Filtrelendi: {activeRestriction}</span>
            </div>
            <button onClick={clearFilter} className="p-1 hover:bg-amber-500/20 rounded">
              <X size={14} className="text-amber-500" />
            </button>
          </div>
        )}
        
        <div className={`p-4 rounded-xl mb-4 flex items-center gap-3 ${theme.card} backdrop-blur-sm`}>
          <Search size={20} className={theme.subtext} />
          <input 
            type="text" 
            placeholder="Yemek ara..." 
            className="bg-transparent w-full outline-none text-sm placeholder:text-gray-500"
          />
        </div>
        
        <h3 className={`text-sm uppercase tracking-wider mb-4 font-semibold ${theme.subtext}`}>Kategoriler</h3>
        
        <div className="grid gap-5">
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => setCurrentView(cat.id)}
              className={`relative w-full h-40 rounded-2xl overflow-hidden group transition-all duration-500 hover:shadow-2xl`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${cat.color} opacity-40 mix-blend-multiply`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white font-serif mb-1">{cat.title}</h3>
                    <p className="text-white/80 text-xs font-medium tracking-wide">{cat.subtitle}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                    {React.cloneElement(cat.icon, { size: 18 })}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const ItemsListScreen = ({ categoryId }) => {
    const items = menuItems[categoryId] || [];
    const categoryInfo = categories.find(c => c.id === categoryId);

    return (
      <div className="pb-24 min-h-screen animate-fade-in">
        <Header title={categoryInfo?.title} showBack={true} showFilter={true} showCart={true} />
        
        <div className="p-5 grid gap-6">
          {items.map((item) => {
            const isSafe = !safeItemIds || safeItemIds.includes(item.id);
            
            return (
              <div 
                key={item.id}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${theme.card} ${isSafe ? 'hover:shadow-lg' : 'opacity-40 grayscale filter'}`}
              >
                {!isSafe && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 pointer-events-none">
                    <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-xs font-medium flex items-center gap-2">
                      <AlertCircle size={12} />
                      <span>{activeRestriction} Uygun Değil</span>
                    </div>
                  </div>
                )}
                
                <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                  <img 
                    src={item.image}
                    srcSet={`${item.image}&w=400 400w, ${item.image}&w=800 800w`}
                    sizes="(max-width: 600px) 400px, 800px"
                    alt={item.name}
                    loading="lazy"
                    onLoad={(e) => e.target.classList.add('loaded')}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80';
                    }}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 blur-sm opacity-0"
                    style={{ filter: 'blur(8px)', opacity: 0, transition: 'filter 0.3s ease-out, opacity 0.3s ease-out' }}
                    onLoadCapture={(e) => {
                      e.target.style.filter = 'blur(0px)';
                      e.target.style.opacity = '1';
                    }}
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item);
                      }}
                      disabled={!isSafe}
                      className="p-2 rounded-full bg-amber-500 backdrop-blur-md border border-amber-400 text-white transition-all active:scale-90 disabled:opacity-50"
                    >
                      <Plus size={18} />
                    </button>
                    <button 
                      onClick={(e) => toggleFavorite(e, item.id)}
                      className="p-2 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white transition-transform active:scale-90"
                    >
                      <Heart 
                        size={18} 
                        className={favorites.includes(item.id) ? "fill-red-500 text-red-500" : ""} 
                      />
                    </button>
                  </div>
                  {item.popular && isSafe && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500/90 backdrop-blur-sm border border-amber-400/50">
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">Şef Önerisi</span>
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-medium text-lg pr-4 ${theme.heading}`}>{item.name}</h3>
                    <span className={`text-lg font-semibold ${theme.accent}`}>{item.price}</span>
                  </div>
                  <p className={`text-sm leading-relaxed ${theme.subtext} mb-4`}>{item.description}</p>
                  
                  {categoryId === 'meals' && isSafe && (
                    <button 
                      onClick={() => openChatWithPrompt(`${item.name} ile en iyi hangi şarap veya içecek gider?`)}
                      className={`text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${darkMode ? 'border-amber-500/30 text-amber-400 hover:bg-amber-500/10' : 'border-amber-500/50 text-amber-600 hover:bg-amber-50'}`}
                    >
                      <Sparkles size={12} />
                      <span>Akıllı Eşleştirme</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const CartScreen = () => (
    <div className="pb-24 min-h-screen animate-fade-in">
      <Header title="Sepetim" showBack={false} />
      
      <div className="p-6">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 opacity-50">
            <ShoppingCart size={48} className="mb-4" />
            <p>Sepetiniz boş</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className={`flex gap-4 p-4 rounded-xl items-center ${theme.card}`}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80';
                    }}
                    className="w-20 h-20 rounded-lg object-cover" 
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className={`text-sm ${theme.accent} mt-1`}>{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 rounded-lg bg-amber-500/20 text-amber-500">
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 rounded-lg bg-amber-500/20 text-amber-500">
                      <Plus size={16} />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className={`p-4 rounded-xl ${theme.card} mb-4`}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Toplam:</span>
                <span className="text-2xl font-bold text-amber-500">${getTotalPrice()}</span>
              </div>
              {tableNumber && (
                <div className="text-sm text-gray-500">
                  Masa: <span className="font-bold">{tableNumber}</span>
                </div>
              )}
            </div>
            
            <button 
              onClick={createOrder}
              disabled={!tableNumber}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-white font-bold text-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <CheckCircle size={20} />
              <span>Siparişi Onayla</span>
            </button>
            
            {!tableNumber && (
              <p className="text-center text-red-500 text-sm mt-2">Lütfen masa numaranızı girin</p>
            )}
          </>
        )}
      </div>
    </div>
  );

  const FavoritesScreen = () => {
    const allItems = [...menuItems.meals, ...menuItems.desserts, ...menuItems.drinks];
    const favItems = allItems.filter(item => favorites.includes(item.id));

    return (
      <div className="pb-24 min-h-screen animate-fade-in">
        <Header title="Favorilerim" />
        <div className="p-6">
          {favItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-20 opacity-50">
              <Heart size={48} className="mb-4" />
              <p>Henüz favori yok</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {favItems.map(item => (
                <div key={item.id} className={`flex gap-4 p-3 rounded-xl items-center ${theme.card}`}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80';
                    }}
                    className="w-20 h-20 rounded-lg object-cover" 
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className={`text-sm ${theme.accent} mt-1`}>{item.price}</p>
                  </div>
                  <button 
                    onClick={(e) => toggleFavorite(e, item.id)}
                    className="p-3 text-red-500"
                  >
                    <Heart size={20} className="fill-red-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const OrderSuccessModal = () => {
    if (!showOrderSuccess) return null;
    return (
      <div className="fixed inset-0 z-[80] flex items-center justify-center px-6 bg-black/80 backdrop-blur-sm">
        <div className={`w-full max-w-sm p-8 rounded-2xl shadow-2xl text-center ${darkMode ? 'bg-[#1a1a1a] border border-white/10' : 'bg-white'}`}>
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle size={48} className="text-green-500" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Sipariş Alındı!</h3>
          <p className={`${theme.subtext} mb-4`}>
            Siparişiniz mutfağa iletildi. En kısa sürede hazırlanacak.
          </p>
          <p className="text-amber-500 font-bold">
            Masa: {tableNumber}
          </p>
        </div>
      </div>
    );
  };

  const BottomNav = () => (
    <div className={`fixed bottom-0 w-full px-6 py-3 z-50 ${theme.nav} backdrop-blur-lg`}>
      <div className="flex justify-around items-center max-w-md mx-auto">
        <button 
          onClick={() => setCurrentView('home')}
          className={`flex flex-col items-center gap-1 p-2 transition-colors ${currentView === 'home' ? theme.accent : 'text-gray-400'}`}
        >
          <Home size={22} strokeWidth={currentView === 'home' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Ana Sayfa</span>
        </button>
        
        <button 
          onClick={() => setCurrentView('categories')}
          className={`flex flex-col items-center gap-1 p-2 transition-colors ${['categories', 'meals', 'desserts', 'drinks'].includes(currentView) ? theme.accent : 'text-gray-400'}`}
        >
          <Utensils size={22} strokeWidth={['categories', 'meals', 'desserts', 'drinks'].includes(currentView) ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Menü</span>
        </button>

        <button 
          onClick={() => setCurrentView('cart')}
          className={`flex flex-col items-center gap-1 p-2 relative transition-colors ${currentView === 'cart' ? theme.accent : 'text-gray-400'}`}
        >
          <ShoppingCart size={22} strokeWidth={currentView === 'cart' ? 2.5 : 2} />
          {cart.length > 0 && (
            <span className="absolute -top-1 right-0 w-5 h-5 bg-amber-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
              {cart.length}
            </span>
          )}
          <span className="text-[10px] font-medium">Sepet</span>
        </button>
        
        <button 
          onClick={() => setCurrentView('favorites')}
          className={`flex flex-col items-center gap-1 p-2 transition-colors ${currentView === 'favorites' ? theme.accent : 'text-gray-400'}`}
        >
          <Heart size={22} className={currentView === 'favorites' ? "fill-current" : ""} strokeWidth={currentView === 'favorites' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Favoriler</span>
        </button>
      </div>
    </div>
  );

  const renderView = () => {
    switch(currentView) {
      case 'home': return <HomeScreen />;
      case 'categories': return <CategoriesScreen />;
      case 'meals': return <ItemsListScreen categoryId="meals" />;
      case 'desserts': return <ItemsListScreen categoryId="desserts" />;
      case 'drinks': return <ItemsListScreen categoryId="drinks" />;
      case 'cart': return <CartScreen />;
      case 'favorites': return <FavoritesScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div className={`min-h-screen w-full font-sans transition-colors duration-500 selection:bg-amber-500/30 ${theme.bg}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@400;600;700&display=swap');
        
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
      
      <div className="max-w-md mx-auto min-h-screen relative shadow-2xl overflow-hidden bg-inherit">
        {renderView()}
        
        <AIChatOverlay />
        <DietaryFilterModal />
        <OrderSuccessModal />
        
        {!isChatOpen && !isFilterOpen && currentView !== 'home' && <FloatingChatButton />}
        {currentView !== 'home' && <BottomNav />}
      </div>
    </div>
  );
}

