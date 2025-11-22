# ❓ Sıkça Sorulan Sorular (SSS)

## 📱 Genel Sorular

### Lumière QR Menü nedir?

Lumière, restoranlar ve kafeler için eksiksiz bir dijital menü çözümüdür. Müşteriler QR kod tarayarak menüyü görüntüler, sipariş verir ve yapay zeka asistanından öneriler alır. İşletme sahipleri güçlü bir admin panelden tüm sistemi yönetir.

### Ücretsiz mi?

Evet, yazılım tamamen açık kaynaklıdır (MIT Lisansı). Kurulum ve kullanım ücretsizdir. Sadece hosting maliyetleri (aylık ~4-1,200₺) vardır.

### Hangi cihazlarda çalışır?

- 📱 **Mobil:** iOS ve Android tüm modern tarayıcılar
- 💻 **Desktop:** Chrome, Firefox, Safari, Edge
- 📟 **Tablet:** iPad, Android tabletler

### İnternet bağlantısı gerekli mi?

Evet, hem müşteri hem admin paneli için internet bağlantısı gereklidir. Offline özellik şu anda desteklenmemektedir.

---

## 🔧 Kurulum ve Teknik

### Node.js nedir ve nasıl kurulur?

Node.js, JavaScript çalıştırma ortamıdır. Kurulum:
1. [nodejs.org](https://nodejs.org) adresine gidin
2. LTS versiyonunu indirin
3. Kurulum sihirbazını takip edin
4. Terminal'de `node --version` ile kontrol edin

### Backend neden başlamıyor?

**Yaygın sebepler:**
- Port 3001 kullanımda
- Node.js kurulu değil
- npm install yapılmadı
- Veritabanı başlatılmadı

**Çözüm:**
```bash
cd backend
npm install
npm run init-db
npm start
```

### Frontend hatası: "Module not found"

**Sebep:** Bağımlılıklar yüklenmemiş

**Çözüm:**
```bash
npm install
npm start
```

### "CORS policy" hatası alıyorum

**Sebep:** Backend ve frontend farklı domain'lerde

**Çözüm:** `backend/server.js` dosyasında CORS ayarlarını kontrol edin:
```javascript
app.use(cors({
  origin: 'http://localhost:3000'
}));
```

---

## 🤖 Yapay Zeka

### Gemini API anahtarı nasıl alınır?

1. [Google AI Studio](https://aistudio.google.com/app/apikey) adresine gidin
2. Google hesabınızla giriş yapın
3. "Create API Key" butonuna tıklayın
4. API anahtarınızı kopyalayın
5. `src/App.js` dosyasında ilgili yere yapıştırın

### AI asistan cevap vermiyor

**Kontrol edin:**
- ✅ API anahtarı doğru girilmiş mi?
- ✅ İnternet bağlantısı var mı?
- ✅ API limiti aşılmış olabilir mi?

**Test için:**
Tarayıcı Console'unda hata mesajlarını kontrol edin (F12)

### Gemini API ücretsiz mi?

Evet, günlük 60 istek/dakika ücretsizdir. Detaylar: [ai.google.dev/pricing](https://ai.google.dev/pricing)

### Başka AI kullanabilir miyim?

Evet! `src/App.js` dosyasında `callGeminiChat` fonksiyonunu değiştirerek OpenAI, Claude, veya başka AI'lar kullanabilirsiniz.

---

## 🔐 Güvenlik

### Admin şifresini nasıl değiştiririm?

`backend/data/users.json` dosyasını açın ve şifreyi değiştirin:
```json
{
  "username": "admin",
  "password": "YENİ_GÜçLÜ_ŞİFRE",
  "role": "admin"
}
```

**Önemli:** Production'da mutlaka hash'lenmiş şifre kullanın (bcrypt)

### Şifre hash'leme nasıl yapılır?

```bash
npm install bcrypt
```

`backend/server.js`:
```javascript
const bcrypt = require('bcrypt');

// Şifre oluştururken
const hashedPassword = await bcrypt.hash('myPassword', 10);

// Giriş yaparken
const isValid = await bcrypt.compare(password, user.hashedPassword);
```

### SQL injection riski var mı?

Hayır, çünkü veritabanı olarak JSON kullanıyoruz. Ancak MongoDB'ye geçerseniz input validation önemlidir.

---

## 📦 Veritabanı

### Neden MongoDB değil de JSON?

JSON basit, hızlı başlangıç için idealdir. Ancak production'da MongoDB önerilir.

### MongoDB'ye nasıl geçerim?

1. MongoDB Atlas hesabı oluşturun (ücretsiz)
2. Connection string alın
3. `mongoose` paketini yükleyin
4. Schema'lar oluşturun
5. API endpoint'lerini güncelleyin

Detaylı rehber: [DEPLOYMENT.md](DEPLOYMENT.md)

### Veriler kaybolur mu?

JSON dosyaları kullanıyorsanız:
- ✅ Yerel geliştirmede: Kaybolmaz
- ⚠️ Render'da: Her deploy'da sıfırlanır (disk mount gerekli)

Çözüm: MongoDB kullanın veya Render disk ekleyin.

### Yedekleme nasıl yapılır?

**Manuel:**
```bash
cp backend/data/menu.json backup/menu_$(date +%Y%m%d).json
```

**Otomatik (Cron):**
```bash
0 2 * * * /path/to/backup.sh
```

---

## 💰 Fiyatlandırma ve Maliyet

### Hosting maliyeti ne kadar?

**Ücretsiz Tier (Başlangıç):**
- Render Free: 0₺
- Vercel Free: 0₺
- MongoDB Atlas Free: 0₺
- **Toplam: 0₺/ay** (domain hariç)

**Limitler:** 
- Backend 15dk sonra uyur
- 100GB/ay bandwidth

**Profesyonel:**
- Render Starter: $7/ay
- Vercel Pro: $20/ay
- MongoDB M2: $9/ay
- **Toplam: ~1,200₺/ay**

### Domain zorunlu mu?

Hayır. Test için `https://yourapp.vercel.app` yeterlidir. Ancak profesyonel görünüm için domain önerilir (~50₺/yıl).

### Kaç müşteri destekler?

**Ücretsiz tier:**
- ~100 eşzamanlı kullanıcı

**Profesyonel tier:**
- ~1,000 eşzamanlı kullanıcı

**Enterprise:**
- Sınırsız (özel sunucu)

---

## 📱 QR Kod

### QR kod nasıl oluşturulur?

1. `qr-generator.html` dosyasını açın
2. Menü URL'nizi girin
3. (Opsiyonel) Masa numarası ekleyin
4. "QR Kod Oluştur" butonuna tıklayın
5. PNG olarak indirin

### QR kod yazdırma önerileri

**Masa Kartı:**
- Kağıt: 300gsm karton
- Boyut: A6 (105x148mm)
- Kaplama: Mat lamine
- Maliyet: ~10₺/kart

**Sticker:**
- Su geçirmez vinil
- Boyut: 10x10cm
- Maliyet: ~5₺/adet

### QR kod çalışmıyor

**Kontrol edin:**
- ✅ URL doğru mu?
- ✅ HTTPS kullanılıyor mu?
- ✅ QR kod bozuk değil mi? (Yeniden oluşturun)
- ✅ Kamera izni verilmiş mi?

---

## 🎨 Tasarım ve Özelleştirme

### Renkleri nasıl değiştiririm?

`src/App.js` dosyasında `theme` objesini düzenleyin:
```javascript
const theme = {
  accent: 'text-blue-500', // Amber yerine mavi
  // ...
}
```

### Logo nasıl eklenir?

1. Logo dosyanızı `public/logo.png` olarak kaydedin
2. `src/App.js` dosyasında `<ChefHat>` icon yerine:
```javascript
<img src="/logo.png" alt="Logo" />
```

### Kategorileri nasıl değiştiririm?

`src/App.js` dosyasında `categories` array'ini düzenleyin:
```javascript
const [categories, setCategories] = useState([
  { id: 'breakfast', title: 'Kahvaltı', ... },
  { id: 'lunch', title: 'Öğle Yemeği', ... },
]);
```

### Dil nasıl değiştirilir?

Şu anda sadece Türkçe destekleniyor. Çoklu dil için:
1. `i18next` paketi yükleyin
2. Dil dosyaları oluşturun (`tr.json`, `en.json`)
3. Tüm metinleri çevirin

---

## 📊 Raporlama

### Satış raporları var mı?

Temel istatistikler admin dashboard'da var:
- Toplam sipariş
- Toplam gelir
- Aktif sipariş

Detaylı raporlar için geliştirme gerekli.

### Google Analytics entegrasyonu

`public/index.html` dosyasına ekleyin:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🔄 Güncelleme ve Bakım

### Güncelleme nasıl yapılır?

**GitHub ile:**
```bash
git pull origin main
npm install
npm run build
```

**Manuel:**
1. Değişikliklerinizi yedekleyin
2. Yeni dosyaları indirin
3. Bağımlılıkları güncelleyin

### Düzenli bakım gerekli mi?

**Önerilen:**
- 📅 Haftalık: Yedekleme
- 📅 Aylık: npm paketleri güncelleme
- 📅 3 Ayda: Güvenlik güncellemeleri

### Paket güncellemeleri

```bash
# Eski paketleri kontrol et
npm outdated

# Tümünü güncelle
npm update

# Veya
npm install -g npm-check-updates
ncu -u
npm install
```

---

## 📞 Destek ve Topluluk

### Hata buldum, nereye bildiririm?

GitHub Issues: [github.com/yourrepo/issues](https://github.com/yourrepo/issues)

### Özellik önerisi nasıl yaparım?

1. GitHub Issues'da "Feature Request" açın
2. Detaylı açıklama yapın
3. Mockup/örnek ekleyin

### Katkıda bulunmak istiyorum

1. Repository'yi fork edin
2. Feature branch oluşturun
3. Değişikliklerinizi yapın
4. Pull Request açın

### Ticari kullanım için lisans gerekli mi?

Hayır, MIT lisansı ticari kullanıma izin verir. Tamamen ücretsizdir.

---

## 🛠️ Sorun Giderme

### Port zaten kullanımda hatası

**Windows:**
```bash
netstat -ano | findstr :3001
taskkill /PID [PID] /F
```

**Mac/Linux:**
```bash
lsof -ti:3001 | xargs kill -9
```

### npm install hatası

```bash
# Cache'i temizle
npm cache clean --force

# node_modules'u sil
rm -rf node_modules package-lock.json

# Yeniden yükle
npm install
```

### Build hatası

```bash
# Bağımlılıkları kontrol et
npm audit fix

# Legacy peer deps ile yükle
npm install --legacy-peer-deps
```

---

## 🎓 Öğrenme Kaynakları

### React öğrenmek için

- [React Resmi Docs](https://react.dev)
- [FreeCodeCamp](https://freecodecamp.org)
- YouTube: "React for Beginners"

### Node.js öğrenmek için

- [NodeSchool](https://nodeschool.io)
- [Node.js Docs](https://nodejs.org/docs)
- Udemy: Node.js kursları

### API geliştirme

- [RESTful API Nedir?](https://restfulapi.net)
- [Postman Kullanımı](https://learning.postman.com)

---

## 💡 İleri Seviye

### Mikroservis mimarisine geçiş

Mevcut yapı monolitiktir. Mikroservis için:
- Order Service (Siparişler)
- Menu Service (Menü)
- User Service (Kullanıcılar)
- Gateway (API Gateway)

### Docker ile deployment

`Dockerfile` oluşturun:
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

### CI/CD Pipeline

GitHub Actions ile otomatik deploy:
```yaml
name: Deploy
on: push
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run build
      - run: vercel --prod
```

---

## 📧 İletişim

**E-posta:** support@lumiere-menu.com  
**GitHub:** [github.com/yourrepo](https://github.com/yourrepo)  
**Discord:** [Lumière Community](https://discord.gg/lumiere)  
**Twitter:** [@LumiereQR](https://twitter.com/lumiereqr)

---

## ⚠️ Bilinen Sorunlar

### v1.0.0

- [ ] Render ücretsiz tier'da backend 15dk sonra uyuyor
- [ ] JSON veritabanı her deploy'da sıfırlanıyor
- [ ] Büyük görseller yavaş yükleniyor
- [ ] Safari'de bazı animasyonlar kekiyor

**Geçici çözümler README.md'de**

---

**🎉 Başka sorunuz mu var? GitHub'da Issue açın!**

<div align="center">

Made with ❤️ by Lumière Team

</div>

