# 🚀 Lumière QR Menü - Hızlı Başlangıç Rehberi

## ⚡ 5 Dakikada Başlat

### 1️⃣ Backend'i Başlat (Terminal 1)

```bash
cd backend
npm install
npm run init-db
npm start
```

✅ Backend çalışıyor: `http://localhost:3001`

### 2️⃣ Frontend'i Başlat (Terminal 2)

```bash
npm install
npm start
```

✅ Frontend çalışıyor: `http://localhost:3000`

**Tarayıcıda otomatik açılacak!**

---

## 📱 Nasıl Kullanılır?

### Müşteri Olarak Test Etme

1. Ana sayfa açılacak
2. **Masa Numaranızı** girin (örn: 5)
3. "Menüyü Görüntüle" butonuna tıklayın
4. Kategorilere göz atın (Yemekler, Tatlılar, İçecekler)
5. Ürünleri sepete ekleyin (+ butonu)
6. Sağ üstteki 🛒 sepet ikonuna tıklayın
7. "Siparişi Onayla" butonuna tıklayın
8. ✅ Sipariş alındı!

### Admin Olarak Yönetim

1. Tarayıcıda `http://localhost:3000/admin` adresine gidin
2. **Giriş Bilgileri:**
   - Kullanıcı Adı: `admin`
   - Şifre: `admin123`
3. Dashboard'da istatistikleri görün
4. "Ürünler" sekmesinden:
   - ✏️ Ürün düzenle
   - 🗑️ Ürün sil
   - ➕ Yeni ürün ekle
5. "Siparişler" sekmesinden:
   - Sipariş durumunu değiştir
   - Sipariş detaylarını görüntüle

### AI Asistan ile Konuşma

1. Menü sayfasında sağ alttaki ✨ **AI Asistan** butonuna tıklayın
2. Soru sorun:
   - "Hangi yemeği önerirsin?"
   - "Wagyu Biftek ile ne içilir?"
   - "Vegan seçenekleriniz neler?"
3. Yapay zeka size önerilerde bulunacak!

### Diyet Filtresi Kullanma

1. Menü sayfasında sağ üstteki 🛡️ ikonuna tıklayın
2. Diyet kısıtlamanızı yazın:
   - "Glütensiz"
   - "Vegan"
   - "Fıstık alerjim var"
3. "Filtre Uygula" butonuna tıklayın
4. ✅ Güvenli ürünler vurgulanacak, diğerleri soluk görünecek

---

## 📱 QR Kod Oluşturma

1. `qr-generator.html` dosyasını tarayıcıda açın
2. Menü URL'si: `http://localhost:3000` (veya gerçek domain'iniz)
3. Masa numarası girin (örn: 5)
4. "QR Kod Oluştur" butonuna tıklayın
5. **İndir** veya **Yazdır**

---

## 🗂️ Proje Yapısı

```
Cafe-QR-APP/
├── 📁 backend/              # Node.js API
│   ├── server.js           # Express server
│   ├── init-db.js          # Veritabanı başlatıcı
│   └── 📁 data/            # JSON veritabanı
│       ├── menu.json       # Menü
│       ├── orders.json     # Siparişler
│       └── users.json      # Admin kullanıcılar
│
├── 📁 src/                  # React Frontend
│   ├── App.js              # Müşteri uygulaması
│   ├── Admin.js            # Admin panel
│   └── index.js            # Giriş noktası
│
├── 📁 public/               # Statik dosyalar
│   └── index.html          # HTML template
│
├── qr-generator.html        # QR kod üretici
├── masa-karti-sablonu.html  # Masa kartı tasarımı
│
└── 📚 Dokümantasyon
    ├── README.md           # Ana README
    ├── KURULUM.md          # Detaylı kurulum
    ├── DEPLOYMENT.md       # Canlıya alma
    ├── TANITIM.md          # Tanıtım materyalleri
    └── HIZLI-BASLANGIC.md  # Bu dosya
```

---

## 🎯 Özellikler

### ✅ Müşteri Tarafı
- 📱 Modern mobil arayüz
- 🌓 Karanlık/Aydınlık mod
- 🛒 Sepet sistemi
- 🤖 AI asistan (Gemini)
- 🛡️ Akıllı diyet filtresi
- ❤️ Favori ürünler
- ✅ Sipariş takibi

### ✅ Admin Panel
- 📊 Dashboard ve istatistikler
- ➕ Ürün ekleme/düzenleme/silme
- 📦 Sipariş yönetimi
- 🔔 Gerçek zamanlı güncellemeler
- 👤 Güvenli giriş sistemi

### ✅ Backend
- 🔌 RESTful API
- 📄 JSON veritabanı
- 🔐 Kimlik doğrulama
- 🌐 CORS desteği

---

## 🛠️ Teknolojiler

**Frontend:**
- React 18
- Tailwind CSS
- Lucide Icons
- Google Fonts

**Backend:**
- Node.js
- Express
- JSON Database

**AI:**
- Google Gemini API

---

## 📞 Hızlı Sorun Giderme

### Backend başlamıyor?

```bash
# Port 3001 kullanımda mı?
netstat -ano | findstr :3001

# Çakışma varsa kill edin veya port değiştirin
```

### Frontend hatası?

```bash
# node_modules'u sil ve yeniden yükle
rm -rf node_modules
npm install
```

### API çağrıları çalışmıyor?

- Backend çalışıyor mu? → `http://localhost:3001/api/menu` kontrol et
- CORS hatası mı? → Backend'de CORS ayarları doğru mu?
- Network hatası mı? → Tarayıcı Console'u kontrol et

### AI asistan cevap vermiyor?

- `src/App.js` dosyasında Gemini API anahtarını kontrol et
- API anahtarı geçerli mi? → [AI Studio](https://aistudio.google.com/app/apikey)

---

## 🎓 Öğrenme Kaynakları

### Video Tutorial Önerisi (Kendiniz Çekebilirsiniz)

1. **Bölüm 1:** Projeye Giriş (5dk)
2. **Bölüm 2:** Backend Kurulumu (10dk)
3. **Bölüm 3:** Frontend Kurulumu (10dk)
4. **Bölüm 4:** Müşteri Uygulaması Kullanımı (15dk)
5. **Bölüm 5:** Admin Panel Kullanımı (15dk)
6. **Bölüm 6:** QR Kod Oluşturma (5dk)
7. **Bölüm 7:** Canlıya Alma (20dk)

### Blog Yazısı İçin Başlıklar

```markdown
# QR Menü Sistemi Nasıl Kurulur? [Full Stack Proje]

## 1. Giriş
- QR menü nedir?
- Neden ihtiyaç duyulur?

## 2. Proje Mimarisi
- Frontend (React)
- Backend (Node.js)
- Database (JSON)

## 3. Özellikler
- AI entegrasyonu
- Admin panel
- Sipariş sistemi

## 4. Kurulum
- Adım adım kurulum
- Ekran görüntüleri

## 5. Demo
- Canlı demo link
- Video

## 6. Sonuç
- Geliştirme fikirleri
- Kaynak kodlar
```

---

## 💡 Geliştirme Fikirleri

Bu projeyi nasıl geliştirebilirsiniz?

1. **Ödeme Sistemi:** Stripe/iyzico entegrasyonu
2. **Çoklu Dil:** İngilizce, Almanca desteği
3. **Mutfak Ekranı:** Garson için ayrı ekran
4. **E-posta Bildirimleri:** Sipariş onayları
5. **Raporlar:** Günlük/haftalık satış raporları
6. **Mobile App:** React Native/Flutter versiyonu
7. **Rezervasyon:** Masa rezervasyonu sistemi
8. **Sadakat:** Puan toplama sistemi

---

## 📈 Performans İpuçları

### Geliştirme Ortamı
```bash
# Hot reload aktif
# Console loglar açık
# Source maps aktif
```

### Production Build
```bash
npm run build

# Optimize edilmiş build
# Minified code
# Gzip sıkıştırma
```

---

## 🎉 Başarılar!

Artık profesyonel bir QR Menü sisteminiz var!

**Sonraki adımlar:**
1. ✅ Kendi verilerinizi ekleyin
2. ✅ Tasarımı özelleştirin
3. ✅ Canlıya alın (DEPLOYMENT.md)
4. ✅ Müşterilere satın

---

## 📚 Daha Fazla Bilgi

- 📖 [README.md](README.md) - Tam proje dökümantasyonu
- 🔧 [KURULUM.md](KURULUM.md) - Detaylı kurulum
- 🚀 [DEPLOYMENT.md](DEPLOYMENT.md) - Canlıya alma
- 💼 [TANITIM.md](TANITIM.md) - Satış materyalleri

---

**💬 Sorularınız mı var?**

GitHub Issues: [lumiere-qr-menu/issues](https://github.com/yourusername/lumiere-qr-menu/issues)

---

<div align="center">

**⭐ Projeyi beğendiyseniz GitHub'da yıldız vermeyi unutmayın! ⭐**

Made with ❤️ by Lumière Team

</div>

