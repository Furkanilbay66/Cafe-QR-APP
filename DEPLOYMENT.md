# 🚀 Lumière QR Menü - Canlı Yayına Alma (Deployment) Rehberi

Bu rehber, Lumière QR Menü sistemini üretim ortamına (production) almak için adım adım talimatlar içerir.

---

## 📋 İçindekiler

1. [Hazırlık](#hazırlık)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [Veritabanı Kurulumu](#veritabanı-kurulumu)
5. [Domain ve SSL](#domain-ve-ssl)
6. [QR Kodları Güncelleme](#qr-kodları-güncelleme)
7. [İzleme ve Bakım](#izleme-ve-bakım)

---

## 🛠️ Hazırlık

### Gerekli Hesaplar

1. **GitHub Hesabı** (Ücretsiz)
   - [github.com](https://github.com/signup)

2. **Backend için** (Birini seçin):
   - Heroku (Kredi kartı gerekli)
   - Railway (Ücretsiz tier)
   - Render (Ücretsiz tier) ✅ Önerilir
   - DigitalOcean (Ücretli)

3. **Frontend için** (Birini seçin):
   - Vercel (Ücretsiz) ✅ Önerilir
   - Netlify (Ücretsiz)
   - GitHub Pages (Ücretsiz)

4. **Domain** (Opsiyonel):
   - Namecheap, GoDaddy, veya Hostinger
   - Maliyet: ~50₺/yıl

### Environment Variables Hazırlığı

`.env` dosyası oluşturun:

```env
# Backend
PORT=3001
NODE_ENV=production
GEMINI_API_KEY=your_gemini_api_key_here

# Frontend
REACT_APP_API_URL=https://your-backend-url.com/api
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 🔧 Backend Deployment (Render - Önerilen)

### Neden Render?
- ✅ Ücretsiz tier
- ✅ Otomatik SSL
- ✅ GitHub entegrasyonu
- ✅ Kolay kullanım

### Adım 1: Render Hesabı Oluşturun

1. [render.com](https://render.com) adresine gidin
2. GitHub ile giriş yapın

### Adım 2: Projeyi GitHub'a Push'layın

```bash
# Proje ana dizininde
git init
git add .
git commit -m "Initial commit"

# GitHub'da yeni repo oluşturun, sonra:
git remote add origin https://github.com/USERNAME/lumiere-qr-menu.git
git push -u origin main
```

### Adım 3: Render'da Yeni Web Service Oluşturun

1. Render Dashboard'da "New +" → "Web Service"
2. GitHub reponuzu bağlayın
3. Ayarları yapın:
   ```
   Name: lumiere-backend
   Region: Frankfurt (Europe)
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Plan: Free
   ```

### Adım 4: Environment Variables Ekleyin

Render dashboard'da "Environment" sekmesine gidin:

```
GEMINI_API_KEY = your_api_key_here
NODE_ENV = production
```

### Adım 5: Deploy Edin

"Create Web Service" butonuna tıklayın. Deploy otomatik başlar.

**Backend URL'niz:** `https://lumiere-backend.onrender.com`

### Adım 6: API Test Edin

```bash
curl https://lumiere-backend.onrender.com/api/menu
```

JSON yanıt almalısınız.

---

## 🎨 Frontend Deployment (Vercel - Önerilen)

### Neden Vercel?
- ✅ React için optimize
- ✅ Otomatik SSL
- ✅ Global CDN
- ✅ GitHub entegrasyonu
- ✅ Sınırsız ücretsiz site

### Adım 1: Vercel Hesabı Oluşturun

1. [vercel.com](https://vercel.com) adresine gidin
2. GitHub ile giriş yapın

### Adım 2: API URL'sini Güncelleyin

`src/App.js` ve `src/Admin.js` dosyalarında:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
```

### Adım 3: Build Komutu Test Edin

```bash
npm run build
```

Hata yoksa devam edin.

### Adım 4: Vercel'e Deploy Edin

**Yöntem 1: Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel
```

**Yöntem 2: Dashboard**
1. Vercel Dashboard → "New Project"
2. GitHub reponuzu seçin
3. Framework: Create React App
4. Root Directory: ./
5. Build Command: npm run build
6. Output Directory: build

### Adım 5: Environment Variables

Vercel Dashboard → Settings → Environment Variables:

```
REACT_APP_API_URL = https://lumiere-backend.onrender.com/api
REACT_APP_GEMINI_API_KEY = your_api_key_here
```

### Adım 6: Redeploy

Settings → Deployments → En son deployment → "Redeploy"

**Frontend URL'niz:** `https://lumiere-qr-menu.vercel.app`

---

## 💾 Veritabanı Kurulumu

### Seçenek 1: MongoDB Atlas (Ücretsiz - Önerilen)

**Neden MongoDB?**
- ✅ 512MB ücretsiz
- ✅ Cloud hosted
- ✅ Otomatik yedekleme

**Adımlar:**

1. [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) → Kayıt ol
2. "Create a Free Cluster" → Region: Frankfurt
3. "Connect" → "Connect your application"
4. Connection string'i kopyala

**Backend Güncelleme:**

`backend/package.json` dosyasına ekleyin:
```json
"dependencies": {
  "mongoose": "^7.0.0"
}
```

`backend/server.js` dosyasını güncelleyin:
```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);
```

### Seçenek 2: JSON Dosyalarını Kalıcı Hale Getirme (Render)

Render'da JSON dosyaları her deploy'da sıfırlanır. Çözüm:

**Disk Kullanımı:**
1. Render Dashboard → Web Service → "Disks"
2. "Add Disk" → `/var/data` → 1GB
3. `backend/server.js` dosyasında:
```javascript
const DATA_DIR = process.env.NODE_ENV === 'production' 
  ? '/var/data' 
  : path.join(__dirname, 'data');
```

---

## 🌐 Domain ve SSL

### Domain Alma

1. [Namecheap.com](https://namecheap.com) → Domain satın al
2. Örnek: `lumiereqr.com` (~50₺/yıl)

### DNS Ayarları

**Vercel için:**
1. Vercel Dashboard → Settings → Domains
2. "Add Domain" → `lumiereqr.com`
3. Vercel size nameserver'lar verecek

Domain sağlayıcıda:
1. Custom DNS → Vercel nameserver'ları ekle
2. Kaydet (24 saat içinde aktif olur)

**Alt domain (API için):**
1. Domain sağlayıcıda A Record ekle:
   ```
   Host: api
   Type: CNAME
   Value: lumiere-backend.onrender.com
   ```

**Sonuç:**
- Frontend: `https://lumiereqr.com`
- Backend: `https://api.lumiereqr.com`

### SSL Sertifikası

Vercel ve Render otomatik SSL sağlar. Manuel işlem gerekmez.

---

## 📱 QR Kodları Güncelleme

### Adım 1: QR Generator'ı Güncelleyin

`qr-generator.html` dosyasında:
```javascript
document.getElementById('menuUrl').value = "https://lumiereqr.com";
```

### Adım 2: Yeni QR Kodlar Oluşturun

1. `qr-generator.html` dosyasını açın
2. Her masa için QR kod oluşturun:
   ```
   Masa 1: https://lumiereqr.com?table=1
   Masa 2: https://lumiereqr.com?table=2
   ...
   ```
3. PNG olarak indirin

### Adım 3: Masa Kartları Yazdırın

1. QR generator'da masa kartı oluşturun
2. "Masa Kartını Yazdır" → PDF olarak kaydet
3. Profesyonel baskı için matbaaya gönderin

**Baskı Önerileri:**
- Kağıt: 300gsm karton
- Kaplama: Mat lamine
- Boyut: A6 (105x148mm)
- Maliyet: ~10₺/kart

---

## 🔒 Güvenlik Ayarları

### 1. Admin Şifresini Değiştirin

`backend/data/users.json` (veya MongoDB):
```json
{
  "username": "admin",
  "password": "GÜÇLÜ_ŞİFRE_BURAYA",
  "role": "admin"
}
```

**Şifre Önerisi:**
- En az 12 karakter
- Büyük+küçük harf+sayı+sembol
- Örnek: `Lum!ere2024@Qr`

### 2. CORS Ayarları

`backend/server.js` dosyasında:
```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'https://lumiereqr.com',
    'https://www.lumiereqr.com'
  ],
  credentials: true
}));
```

### 3. Rate Limiting

DoS saldırılarına karşı:

```bash
cd backend
npm install express-rate-limit
```

`backend/server.js`:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100 // IP başına max 100 istek
});

app.use('/api/', limiter);
```

### 4. Environment Variables Güvenliği

- ❌ Asla `.env` dosyasını Git'e commit etmeyin
- ✅ `.gitignore` dosyasında `.env` olduğundan emin olun
- ✅ API anahtarlarını sadece platform dashboard'larında saklayın

---

## 📊 İzleme ve Bakım

### Uptime Monitoring

**UptimeRobot** (Ücretsiz):
1. [uptimerobot.com](https://uptimerobot.com) → Kayıt ol
2. "Add New Monitor"
3. URL: `https://lumiereqr.com`
4. Alert: E-posta
5. Interval: 5 dakika

### Error Tracking

**Sentry** (Ücretsiz tier):
1. [sentry.io](https://sentry.io) → Kayıt ol
2. Proje oluştur → React
3. DSN'i kopyala

`src/index.js`:
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production"
});
```

### Analitik

**Google Analytics** (Ücretsiz):
1. [analytics.google.com](https://analytics.google.com) → Property oluştur
2. Tracking ID'yi al

`public/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Düzenli Yedekleme

**MongoDB Atlas** otomatik yedekler.

**JSON Dosyaları için:**
```bash
# Haftada bir kez
curl https://your-backend.com/api/menu > backup_menu.json
curl https://your-backend.com/api/orders > backup_orders.json
```

Cron job ile otomatikleştirin.

---

## 🔄 Güncelleme Süreci

### Kod Güncellemeleri

1. Değişiklikleri GitHub'a push'layın:
```bash
git add .
git commit -m "Feature: Yeni özellik"
git push origin main
```

2. Vercel ve Render otomatik deploy eder

### Manuel Deploy

**Vercel:**
```bash
vercel --prod
```

**Render:**
Dashboard → Manual Deploy → "Deploy latest commit"

---

## 💰 Maliyet Tahmini

### Ücretsiz Tier (Başlangıç)

```
Backend (Render Free): 0₺/ay
Frontend (Vercel Free): 0₺/ay
MongoDB Atlas: 0₺/ay
Domain: ~50₺/yıl
SSL: 0₺ (otomatik)
─────────────────────
TOPLAM: ~4₺/ay
```

**Limitler:**
- Render: 15 dk inaktiflik sonrası sleep
- Vercel: 100GB bandwidth/ay
- MongoDB: 512MB storage

### Profesyonel (Önerilen)

```
Backend (Render Starter): $7/ay (Daima aktif)
Frontend (Vercel Pro): $20/ay (Öncelikli support)
MongoDB (M2): $9/ay (2GB storage)
Domain: ~50₺/yıl
CDN & SSL: 0₺
─────────────────────
TOPLAM: ~1,200₺/ay
```

### Enterprise (Yüksek Trafik)

```
Backend (DigitalOcean): $50/ay
Frontend (Vercel Pro): $20/ay
MongoDB (M10): $57/ay
Domain: ~50₺/yıl
Monitoring: $20/ay
─────────────────────
TOPLAM: ~4,500₺/ay
```

---

## ✅ Deployment Kontrol Listesi

Canlıya almadan önce:

- [ ] Backend API çalışıyor ve erişilebilir
- [ ] Frontend build hatası yok
- [ ] Environment variables doğru ayarlandı
- [ ] Database bağlantısı çalışıyor
- [ ] Admin panele giriş yapılabiliyor
- [ ] QR kodlar yeni domain ile güncellendi
- [ ] SSL sertifikası aktif (HTTPS)
- [ ] CORS ayarları yapıldı
- [ ] Rate limiting eklendi
- [ ] Admin şifresi değiştirildi
- [ ] Error tracking kuruldu
- [ ] Uptime monitoring aktif
- [ ] Yedekleme sistemi kuruldu
- [ ] Mobil cihazlardan test edildi
- [ ] Performans testi yapıldı

---

## 🆘 Sorun Giderme

### Backend'e erişilemiyor

**Çözüm:**
1. Render logs kontrol edin
2. Environment variables doğru mu?
3. Disk mount edilmiş mi?

### Frontend boş sayfa

**Çözüm:**
1. Browser console hatalarını kontrol edin
2. API_URL doğru mu?
3. Build hatası var mı? (`npm run build`)

### QR kod çalışmıyor

**Çözüm:**
1. QR kodda doğru URL var mı?
2. HTTPS kullanılıyor mu?
3. QR kod generator ile yeniden oluşturun

### Sipariş kayboldu

**Çözüm:**
1. Render diskini kontrol edin
2. MongoDB kullanıyorsanız connection string doğru mu?
3. Yedekten geri yükleyin

---

## 📞 Destek

Sorun yaşıyorsanız:

1. [GitHub Issues](https://github.com/yourusername/lumiere-qr-menu/issues)
2. E-posta: support@lumiere-menu.com
3. Discord: [Lumière Community](https://discord.gg/lumiere)

---

**🎉 Tebrikler! Uygulamanız canlıda!**

*İlk 24 saat içinde yakından izleyin. DNS propagation 24 saat sürebilir.*

