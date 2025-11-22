# 📦 Lumière QR Menü - Detaylı Kurulum Kılavuzu

Bu kılavuz, Lumière QR Menü sistemini sıfırdan kurmak için gereken tüm adımları içerir.

---

## 📋 İçindekiler

1. [Sistem Gereksinimleri](#sistem-gereksinimleri)
2. [Backend Kurulumu](#backend-kurulumu)
3. [Frontend Kurulumu](#frontend-kurulumu)
4. [Veritabanı Yapılandırması](#veritabanı-yapılandırması)
5. [Gemini API Kurulumu](#gemini-api-kurulumu)
6. [QR Kod Oluşturma](#qr-kod-oluşturma)
7. [Sorun Giderme](#sorun-giderme)

---

## 🖥️ Sistem Gereksinimleri

### Minimum Gereksinimler
- **İşletim Sistemi:** Windows 10, macOS 10.14+, Linux (Ubuntu 18.04+)
- **Node.js:** v14.0.0 veya üzeri
- **npm:** v6.0.0 veya üzeri (Node.js ile birlikte gelir)
- **RAM:** 4GB (önerilen: 8GB)
- **Disk Alanı:** 500MB

### Tarayıcı Desteği
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Araçlar
- Git (opsiyonel, projeyi klonlamak için)
- Kod editörü (VS Code önerilir)

---

## 🔧 Backend Kurulumu

### Adım 1: Node.js Kurulumu

**Windows:**
1. [nodejs.org](https://nodejs.org) adresine gidin
2. LTS versiyonunu indirin
3. İndirilen dosyayı çalıştırın ve kurulum sihirbazını takip edin
4. Terminalde kontrol edin:
```bash
node --version
npm --version
```

**macOS:**
```bash
# Homebrew ile
brew install node
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Adım 2: Projeyi İndirin

**Git ile:**
```bash
git clone https://github.com/yourusername/lumiere-qr-menu.git
cd lumiere-qr-menu
```

**Zip ile:**
1. GitHub'dan projeyi ZIP olarak indirin
2. ZIP dosyasını çıkarın
3. Terminal/CMD'de proje klasörüne gidin

### Adım 3: Backend Bağımlılıklarını Yükleyin

```bash
cd backend
npm install
```

**Kurulacak paketler:**
- express: Web server
- cors: Cross-origin istekler için

### Adım 4: Veritabanını Başlatın

```bash
npm run init-db
```

Bu komut şunları oluşturur:
- `data/menu.json` - Başlangıç menü verileri
- `data/orders.json` - Boş sipariş listesi
- `data/users.json` - Admin kullanıcı bilgileri

**Çıktı:**
```
✅ menu.json oluşturuldu
✅ orders.json oluşturuldu
✅ users.json oluşturuldu

🎉 Veritabanı başarıyla başlatıldı!

👤 Admin Giriş Bilgileri:
   Kullanıcı Adı: admin
   Şifre: admin123
```

### Adım 5: Backend'i Başlatın

```bash
npm start
```

**Çıktı:**
```
🚀 QR Menü Backend çalışıyor: http://localhost:3001
```

**Test edin:**
Tarayıcıda `http://localhost:3001/api/menu` adresine gidin. JSON formatında menü verilerini görmelisiniz.

---

## 🎨 Frontend Kurulumu

### Adım 1: Yeni Terminal Açın

Backend çalışırken, yeni bir terminal/CMD penceresi açın ve proje ana dizinine gidin.

```bash
cd lumiere-qr-menu  # Backend klasöründen çıkın
```

### Adım 2: React Projesini Oluşturun (İlk Kurulum)

Eğer proje zaten React ile kuruluysa bu adımı atlayın. Değilse:

```bash
npx create-react-app .
```

### Adım 3: Bağımlılıkları Yükleyin

```bash
npm install lucide-react
```

### Adım 4: Dosyaları Yerleştirin

Proje dosyalarını doğru konumlara yerleştirin:

```
lumiere-qr-menu/
├── src/
│   ├── App.js           ✅ (QR menü uygulaması)
│   ├── Admin.js         ✅ (Admin panel)
│   └── index.js         ✅ (Giriş noktası)
```

### Adım 5: index.js'i Güncelleyin

`src/index.js` dosyasını açın ve şu içeriği ekleyin:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Admin from './Admin';

// Route kontrolü (basit yönlendirme)
const CurrentApp = window.location.pathname === '/admin' ? Admin : App;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CurrentApp />
  </React.StrictMode>
);
```

### Adım 6: Frontend'i Başlatın

```bash
npm start
```

**Çıktı:**
```
Compiled successfully!

You can now view lumiere-qr-menu in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.x:3000
```

Tarayıcı otomatik olarak açılacaktır.

---

## 🗄️ Veritabanı Yapılandırması

### JSON Veritabanı Yapısı

#### menu.json
```json
{
  "meals": [
    {
      "id": 101,
      "name": "Ürün Adı",
      "price": "$50.00",
      "description": "Açıklama",
      "image": "https://images.unsplash.com/...",
      "popular": true
    }
  ],
  "desserts": [...],
  "drinks": [...]
}
```

#### orders.json
```json
[
  {
    "id": 1,
    "tableNumber": "5",
    "items": [...],
    "totalPrice": "$100.00",
    "status": "Hazırlanıyor",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
]
```

#### users.json
```json
[
  {
    "id": 1,
    "username": "admin",
    "password": "admin123",
    "role": "admin"
  }
]
```

### Verileri Özelleştirme

1. Backend'i durdurun (Ctrl+C)
2. `backend/data/menu.json` dosyasını düzenleyin
3. Backend'i tekrar başlatın

**Veya:**

Admin panelden ürünleri düzenleyin (önerilen).

---

## 🤖 Gemini API Kurulumu

Yapay zeka özelliklerini kullanmak için Google Gemini API anahtarı gereklidir.

### Adım 1: API Anahtarı Alın

1. [Google AI Studio](https://aistudio.google.com/app/apikey) adresine gidin
2. Google hesabınızla giriş yapın
3. "Create API Key" butonuna tıklayın
4. API anahtarınızı kopyalayın

### Adım 2: API Anahtarını Ekleyin

`src/App.js` dosyasını açın ve şu satırı bulun:

```javascript
const apiKey = "AIzaSyDHNBcQgMzaP7QZ6T23e3eNrVjLKrxZl84";
```

Kendi API anahtarınızla değiştirin:

```javascript
const apiKey = "BURAYA_KENDI_API_ANAHTARINIZ";
```

### Adım 3: Yapay Zeka Özelliklerini Test Edin

1. Uygulamayı yeniden başlatın
2. QR menüde "Yapay Zeka Asistan" butonuna tıklayın
3. Bir soru sorun (örn. "Hangi yemeği önerirsin?")

**Not:** API anahtarı olmadan da uygulama çalışır, ancak yapay zeka özellikleri devre dışı olur.

---

## 📱 QR Kod Oluşturma

### Adım 1: QR Generator'ı Açın

Tarayıcıda `qr-generator.html` dosyasını açın:

**Yöntem 1 (Çift tıklama):**
- Dosya gezgininde `qr-generator.html` dosyasına çift tıklayın

**Yöntem 2 (Tarayıcıdan):**
- Tarayıcıda Ctrl+O (veya Cmd+O) tuşlarına basın
- `qr-generator.html` dosyasını seçin

### Adım 2: Menü URL'sini Girin

1. "Menü URL'si" alanına menünüzün adresini girin:
   - Yerel test: `http://localhost:3000`
   - Canlı: `https://yourdomain.com`

2. (Opsiyonel) Masa numarası ekleyin (örn. "5")

### Adım 3: QR Kod Oluşturun

"QR Kod Oluştur" butonuna tıklayın.

### Adım 4: QR Kodunu İndirin

- **Basit QR:** "İndir (PNG)" butonuna tıklayın
- **Masa Kartı:** "Masa Kartını Yazdır" butonuna tıklayın

### Adım 5: Yazdırma Ayarları

Masa kartını yazdırırken:
- Sayfa boyutu: A5 veya A6
- Yönlendirme: Dikey
- Kenar boşlukları: Minimum
- Arka plan grafikleri: Aktif

---

## 🔧 Sorun Giderme

### Backend Başlamıyor

**Hata:** `Error: listen EADDRINUSE: address already in use :::3001`

**Çözüm:**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID [PID_NUMARASI] /F

# macOS/Linux
lsof -ti:3001 | xargs kill -9
```

### Frontend Başlamıyor

**Hata:** `Module not found: Can't resolve 'lucide-react'`

**Çözüm:**
```bash
npm install lucide-react
```

### API Bağlantı Hatası

**Hata:** `Failed to fetch` veya `Network error`

**Kontrol edin:**
1. Backend çalışıyor mu? (`http://localhost:3001/api/menu` test edin)
2. CORS ayarları doğru mu?
3. Firewall/Antivirüs engelliyor olabilir

### QR Kod Çalışmıyor

**Sorun:** QR kod tarandığında sayfa açılmıyor

**Çözüm:**
1. QR kodda doğru URL var mı kontrol edin
2. Mobil cihaz ve bilgisayar aynı ağda mı?
3. Yerel test için bilgisayarın IP adresini kullanın:
   ```
   http://192.168.1.x:3000
   ```

### Yapay Zeka Çalışmıyor

**Sorun:** AI asistan cevap vermiyor

**Çözüm:**
1. API anahtarı doğru girilmiş mi?
2. API kullanım limitini aşmış olabilirsiniz
3. İnternet bağlantınızı kontrol edin

### Veritabanı Sıfırlandı

**Sorun:** Eklediğim ürünler kayboldu

**Çözüm:**
`backend/data/` klasöründeki JSON dosyalarını yedekleyin:
```bash
cd backend/data
cp menu.json menu.json.backup
```

---

## 🌐 Yerel Ağda Test Etme

Mobil cihazlardan test etmek için:

### Adım 1: IP Adresinizi Bulun

**Windows:**
```bash
ipconfig
# IPv4 Address: 192.168.1.x
```

**macOS/Linux:**
```bash
ifconfig
# inet 192.168.1.x
```

### Adım 2: Frontend'i Network Modunda Başlatın

```bash
npm start
```

Çıktıda göreceksiniz:
```
On Your Network:  http://192.168.1.x:3000
```

### Adım 3: Mobil Cihazdan Bağlanın

1. Mobil cihazınızın aynı Wi-Fi ağında olduğundan emin olun
2. Tarayıcıda `http://192.168.1.x:3000` adresine gidin

### Adım 4: QR Kod Oluşturun

QR generator'da IP adresini kullanın:
```
http://192.168.1.x:3000
```

---

## ✅ Kurulum Kontrol Listesi

- [ ] Node.js kuruldu
- [ ] Proje indirildi
- [ ] Backend bağımlılıkları yüklendi
- [ ] Veritabanı başlatıldı
- [ ] Backend çalışıyor (http://localhost:3001)
- [ ] Frontend bağımlılıkları yüklendi
- [ ] Frontend çalışıyor (http://localhost:3000)
- [ ] Admin panele giriş yapılabildi (/admin)
- [ ] Gemini API anahtarı eklendi
- [ ] QR kod oluşturuldu
- [ ] Mobil cihazdan test edildi

---

## 📞 Yardım ve Destek

Sorun yaşıyorsanız:

1. Bu kılavuzu tekrar okuyun
2. README.md dosyasındaki SSS bölümünü kontrol edin
3. GitHub Issues'da sorun bildirin
4. E-posta: support@lumiere-menu.com

---

**🎉 Kurulum tamamlandı! İyi kullanımlar!**

