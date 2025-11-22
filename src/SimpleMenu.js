import React, { useState, useEffect } from 'react';
import { X, ChefHat } from 'lucide-react';
import menuData from './menu.json';

// Kategoriler
const CATEGORIES = [
  { id: 'burgers', title: 'Burgerler', icon: '🍔' },
  { id: 'pasta', title: 'Makarnalar', icon: '🍝' },
  { id: 'desserts', title: 'Tatlılar', icon: '🍰' },
  { id: 'drinks', title: 'İçecekler', icon: '🥤' },
  { id: 'breakfast', title: 'Kahvaltı', icon: '☕' },
  { id: 'special', title: 'Special Menü', icon: '⭐' }
];

export default function SimpleMenu() {
  const [darkMode] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('burgers');
  const [menuItems, setMenuItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  // Menüyü yükle
  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = () => {
    // Statik JSON'dan direkt yükle - Backend yok!
    setMenuItems({
      burgers: menuData.burgers || [],
      pasta: menuData.pasta || [],
      desserts: menuData.desserts || [],
      drinks: menuData.drinks || [],
      breakfast: menuData.breakfast || [],
      special: menuData.special || []
    });
    setLoading(false);
  };

  // Tema
  const theme = {
    bg: darkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50',
    text: darkMode ? 'text-white' : 'text-gray-900',
    card: darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200',
    subtext: darkMode ? 'text-gray-400' : 'text-gray-600',
    accent: 'text-amber-400'
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${theme.bg} flex items-center justify-center`}>
        <div className="text-center">
          <ChefHat size={48} className="text-amber-400 mx-auto mb-4 animate-pulse" />
          <p className={theme.text}>Menü yükleniyor...</p>
        </div>
      </div>
    );
  }

  const currentItems = menuItems[selectedCategory] || [];

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text}`}>
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 py-4 text-center">
          <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center">
            <ChefHat size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold font-serif">Lumière</h1>
          <p className="text-xs text-gray-400 uppercase tracking-widest">Menümüz</p>
        </div>
      </div>

      {/* Kategoriler */}
      <div className="sticky top-[100px] z-30 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="max-w-2xl mx-auto px-2 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ürün Listesi */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {currentItems.length === 0 ? (
          <div className="text-center py-12 opacity-50">
            <p>Bu kategoride ürün bulunmuyor</p>
          </div>
        ) : (
          <div className="space-y-4">
            {currentItems.map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`w-full ${theme.card} border rounded-2xl overflow-hidden hover:shadow-xl transition-all text-left`}
              >
                <div className="flex gap-4 p-3">
                  {/* Görsel */}
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-800">
                    <img 
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = '/images/fallback.jpg';
                      }}
                      className="w-full h-full object-cover"
                    />
                    {item.popular && (
                      <div className="absolute top-1 right-1 bg-amber-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                        ÖNE ÇIKAN
                      </div>
                    )}
                  </div>

                  {/* Bilgiler */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-base">{item.name}</h3>
                      <span className={`${theme.accent} font-bold text-lg ml-2 flex-shrink-0`}>
                        {item.price}
                      </span>
                    </div>
                    <p className={`${theme.subtext} text-sm line-clamp-2 leading-snug`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detay Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className={`${theme.card} border rounded-t-3xl sm:rounded-3xl max-w-lg w-full max-h-[80vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Görsel */}
            <div className="relative h-64 w-full bg-gray-800">
              <img 
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white"
              >
                <X size={20} />
              </button>
              {selectedItem.popular && (
                <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                  ÖNE ÇIKAN ÜRÜN
                </div>
              )}
            </div>

            {/* Detaylar */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold font-serif">{selectedItem.name}</h2>
                <span className="text-3xl font-bold text-amber-400 ml-4">
                  {selectedItem.price}
                </span>
              </div>
              
              <p className={`${theme.subtext} leading-relaxed mb-6`}>
                {selectedItem.description}
              </p>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
                <p className="text-amber-400 text-sm font-medium">
                  Sipariş vermek için lütfen garsonunuza haber verin
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <p className={`${theme.subtext} text-sm`}>
          Sipariş için garsonunuza haber verebilirsiniz
        </p>
        <p className="text-xs text-amber-400 mt-2">Lumière Restaurant</p>
      </div>

      {/* CSS Animasyonlar */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

