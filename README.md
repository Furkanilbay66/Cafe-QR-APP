# 🍽️ Lumière - QR Menü Sistemi

> **Profesyonel QR Menü + Admin Panel + Sipariş Sistemi**

Modern restoranlar ve kafeler için eksiksiz bir dijital menü çözümü. Müşteriler QR kod tarayarak menüyü görüntüleyebilir, sipariş verebilir ve yapay zeka asistanından öneriler alabilir.

![Lumière Banner](https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200)

---

## ✨ Özellikler

### 🎯 Müşteri Tarafı (QR Menü)
- ✅ Modern ve responsive mobil arayüz
- ✅ Karanlık/Aydınlık mod
- ✅ Kategori bazlı menü (Ana Yemekler, Tatlılar, İçecekler)
- ✅ Ürün görselleri (Unsplash entegrasyonu)
- ✅ Favori ürünler sistemi
- ✅ Sepet ve sipariş yönetimi
- ✅ Masa numarası ile sipariş verme
- ✅ Gerçek zamanlı sipariş takibi
- ✅ **Yapay Zeka Asistan** (Gemini API)
  - Menü önerileri
  - Yemek-içecek eşleştirme
  - Malzeme bilgileri
- ✅ **Akıllı Diyet Filtresi**
  - Yapay zeka destekli alerjen analizi
  - Glütensiz, vegan, vb. filtreleme

### 🔐 Admin Paneli
- ✅ Güvenli giriş sistemi
- ✅ Dashboard (istatistikler)
  - Toplam sipariş sayısı
  - Toplam gelir
  - Aktif sipariş sayısı
- ✅ Ürün yönetimi
  - Ürün ekleme
  - Ürün düzenleme
  - Ürün silme
  - Kategori yönetimi
- ✅ Sipariş yönetimi
  - Sipariş görüntüleme
  - Sipariş durumu güncelleme
  - Sipariş silme

### 🎨 QR Kod Üretici
- ✅ Menü için QR kod oluşturma
- ✅ Masa numarası ile özel QR kodlar
- ✅ Masa kartı tasarımı (yazdırılabilir)
- ✅ PNG olarak indirme

### 🔧 Backend API
- ✅ Node.js + Express
- ✅ JSON tabanlı veritabanı
- ✅ RESTful API endpoints
- ✅ CORS desteği

---

## 🚀 Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- npm veya yarn
- Modern bir web tarayıcı

### Adım 1: Projeyi İndirin
```bash
git clone https://github.com/yourusername/lumiere-qr-menu.git
cd lumiere-qr-menu
```

### Adım 2: Backend Kurulumu
```bash
cd backend
npm install
npm run init-db
npm start
```

Backend şu adreste çalışacak: `http://localhost:3001`

**Varsayılan Admin Giriş:**
- Kullanıcı Adı: `admin`
- Şifre: `admin123`

### Adım 3: Frontend Kurulumu
```bash
# Ana dizine dönün
cd ..

# Bağımlılıkları yükleyin
npm install

# Uygulamayı başlatın
npm start
```

Frontend şu adreste çalışacak: `http://localhost:3000`

---

## 📁 Proje Yapısı

```
lumiere-qr-menu/
├── backend/
│   ├── server.js              # Express server
│   ├── init-db.js             # Veritabanı başlatıcı
│   ├── package.json
│   └── data/
│       ├── menu.json          # Menü verileri
│       ├── orders.json        # Siparişler
│       └── users.json         # Admin kullanıcıları
├── src/
│   ├── App.js                 # Ana müşteri uygulaması
│   ├── Admin.js               # Admin panel
│   └── index.js
├── public/
├── qr-generator.html          # QR kod üretici
├── masa-karti-sablonu.html    # Masa kartı şablonu
├── package.json
└── README.md
```

---

## 🎯 Kullanım

### Müşteri Uygulaması

1. QR kodu tarayın veya `http://localhost:3000` adresine gidin
2. Masa numaranızı girin
3. Menüyü görüntüleyin
4. Ürünleri sepete ekleyin
5. Siparişi onaylayın

### Admin Paneli

1. `http://localhost:3000/admin` adresine gidin
2. Giriş yapın (admin / admin123)
3. Ürünleri yönetin
4. Siparişleri takip edin

### QR Kod Oluşturma

1. `qr-generator.html` dosyasını tarayıcıda açın
2. Menü URL'nizi girin
3. (Opsiyonel) Masa numarası ekleyin
4. "QR Kod Oluştur" butonuna tıklayın
5. PNG olarak indirin veya masa kartını yazdırın

---

## 🔌 API Endpoints

### Kimlik Doğrulama
```
POST /api/auth/login
```

### Menü
```
GET    /api/menu              # Tüm menüyü getir
POST   /api/menu/item         # Yeni ürün ekle
PUT    /api/menu/item/:id     # Ürünü güncelle
DELETE /api/menu/item/:id     # Ürünü sil
```

### Siparişler
```
GET    /api/orders                    # Tüm siparişleri getir
GET    /api/orders/:tableNumber       # Masaya özel siparişler
POST   /api/orders                    # Yeni sipariş oluştur
PATCH  /api/orders/:id/status         # Sipariş durumu güncelle
DELETE /api/orders/:id                # Siparişi sil
```

### İstatistikler
```
GET /api/stats                 # Dashboard istatistikleri
```

---

## 🤖 Yapay Zeka Özellikleri

### Gemini API Entegrasyonu

Uygulama Google Gemini AI kullanır:

**Özellikler:**
- Menü önerileri
- Yemek-içecek eşleştirme
- Malzeme açıklamaları
- Akıllı diyet filtresi

**API Anahtarı Eklemek:**

`src/App.js` dosyasında:
```javascript
const apiKey = "BURAYA_API_ANAHTARINIZ";
```

🔑 **Ücretsiz Gemini API Anahtarı:** [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

---

## 🎨 Unsplash Görseller

Tüm ürün görselleri ücretsiz Unsplash API'den gelir. Görseller otomatik olarak yüklenmiştir.

**Kendi görsellerinizi eklemek için:**
- Admin panelden ürün düzenleyin
- Görsel URL alanına Unsplash veya kendi görsel URL'nizi girin

---

## 🖨️ Masa Kartı Yazdırma

1. QR Generator'da masa numarası ile QR oluşturun
2. "Masa Kartını Yazdır" butonuna tıklayın
3. Yazdırma ayarlarından:
   - Sayfa boyutu: A5 veya A6
   - Yönlendirme: Dikey
   - Kenar boşlukları: Orta

**Alternatif:** `masa-karti-sablonu.html` dosyasını referans alarak özel tasarım yapabilirsiniz.

---

## 🔒 Güvenlik

⚠️ **Önemli Güvenlik Notları:**

1. **Üretim ortamında mutlaka:**
   - Admin şifresini değiştirin
   - JWT token sistemi ekleyin
   - HTTPS kullanın
   - API anahtarlarını environment variable olarak saklayın

2. **Veritabanı:**
   - Şu anda JSON dosyaları kullanılıyor
   - Üretim için MongoDB, PostgreSQL veya Firebase kullanın

3. **CORS:**
   - Şu anda tüm domainlere açık
   - Üretimde sadece kendi domaininizi ekleyin

---

## 🚀 Üretim Ortamına Alma

### 1. Environment Variables Oluşturun

`.env` dosyası oluşturun:
```env
PORT=3001
NODE_ENV=production
GEMINI_API_KEY=your_api_key_here
```

### 2. Backend Deploy

**Heroku, Vercel, Railway gibi platformlarda:**
```bash
cd backend
git init
git add .
git commit -m "Initial commit"
# Platform CLI komutlarını kullanın
```

### 3. Frontend Deploy

**Vercel, Netlify:**
```bash
npm run build
# Platform'a build klasörünü deploy edin
```

### 4. QR Kodları Güncelleyin

Canlı domain'iniz ile yeni QR kodlar oluşturun.

---

## 📱 Mobil Uygulama (Flutter)

Bu projeyi Flutter'a çevirmek isterseniz:

1. React componentlerini Flutter Widget'larına dönüştürün
2. API çağrıları için `http` veya `dio` paketini kullanın
3. State management için `Provider` veya `Riverpod` kullanın

**Temel yapı aynı kalır:**
- API endpoints değişmez
- UI tasarımı benzer şekilde uygulanır

---

## 🎯 Gelecek Özellikler (Roadmap)

- [ ] Çoklu dil desteği (TR/EN)
- [ ] Ödeme sistemi entegrasyonu (Stripe, iyzico)
- [ ] Garson çağırma butonu
- [ ] Mutfak ekranı (Kitchen Display System)
- [ ] E-posta ile sipariş onayı
- [ ] SMS bildirimleri
- [ ] Müşteri yorumları ve puanlama
- [ ] Rezervasyon sistemi
- [ ] Sadakat programı
- [ ] Raporlama ve analizler

---

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz!

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

## 📄 Lisans

Bu proje MIT lisansı altındadır.

---

## 💡 İletişim ve Destek

**Proje Sahibi:** Lumière Development Team

**E-posta:** support@lumiere-menu.com

**Website:** [lumiere-menu.com](https://lumiere-menu.com)

---

## 🙏 Teşekkürler

- [React](https://react.dev/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Unsplash](https://unsplash.com/)
- [Google Gemini AI](https://ai.google.dev/)
- [QRCode.js](https://davidshimjs.github.io/qrcodejs/)

---

<div align="center">

**⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın! ⭐**

Made with ❤️ by Lumière Team

</div>

