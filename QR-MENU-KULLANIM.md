# 📱 QR MENÜ UYGULAMASI - KULLANIM REHBERİ

## 🎯 Uygulama Versiyonları

### 1. **Basit QR Menü** (Önerilen - Müşteri için)
**Adres:** `http://localhost:3000`

✅ **ÖZELLİKLER:**
- Sadece menü görüntüleme
- Sipariş sistemi YOK (garson alacak)
- 6 kategori: Burgerler, Makarnalar, Tatlılar, İçecekler, Kahvaltı, Special
- Modern kart tasarımı
- Mobil uyumlu
- Hızlı açılış

### 2. **Admin Panel**
**Adres:** `http://localhost:3000/admin`

🔐 **GİRİŞ BİLGİLERİ:**
- Kullanıcı Adı: `admin`
- Şifre: `admin123`

✨ **YÖNETİM ÖZELLİKLERİ:**
- Ürün ekleme/silme/güncelleme
- Kategori yönetimi
- Görsel yükleme
- Fiyat düzenleme

### 3. **Full Uygulama** (Sipariş sistemli)
**Adres:** `http://localhost:3000/full`

🛒 **EK ÖZELLİKLER:**
- Sepet sistemi
- Masa numarası
- Sipariş oluşturma
- Yapay zeka asistan

---

## 🍔 MENÜ KATEGORİLERİ

### Burgerler (5 adet)
- Füme Etli Burger - 34₺
- Tavuk Burger - 28₺
- Karamelize Soğanlı Burger - 31₺ (Öne Çıkan)
- Hawaii Burger - 31₺
- Ranch Burger - 31₺ (Öne Çıkan)

### Makarnalar (3 adet)
- Alfredo Soslu Makarna - 42₺ (Öne Çıkan)
- Pesto Soslu Penne - 38₺
- Bolonez Makarna - 45₺ (Öne Çıkan)

### Tatlılar (4 adet)
- Çikolata Küre - $24.00 (Öne Çıkan)
- Matcha Tiramisu - $18.00
- Limonlu Tart - $16.00
- Cheesecake Özel - $22.00 (Öne Çıkan)

### İçecekler (5 adet)
- Old Fashioned (Dumanlı) - $22.00 (Öne Çıkan)
- Lavanta Gin Fizz - $18.00 (Öne Çıkan)
- Espresso Özel - $6.00
- Tropikal Mojito - $16.00
- Türk Kahvesi - $8.00 (Öne Çıkan)

### Kahvaltı (4 adet)
- Serpme Kahvaltı - 95₺ (Öne Çıkan)
- Menemen - 35₺ (Öne Çıkan)
- Omlet - 32₺
- Krep - 38₺ (Öne Çıkan)

### Special Menü (3 adet)
- Wagyu Biftek - 185₺ (Öne Çıkan)
- Istakozlu Risotto - 158₺ (Öne Çıkan)
- Kuzu Pirzola - 145₺

**TOPLAM: 24 ürün**

---

## 🚀 ÇALIŞTIRMA

### İlk Kurulum
```bash
# Backend klasöründe
cd backend
npm install
npm run init-db

# Ana klasörde
cd ..
npm install
```

### Her Seferinde
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
npm start
```

Tarayıcıda otomatik açılacak: `http://localhost:3000`

---

## 📱 QR KOD İÇİN

QR kod oluşturmak için şu adrese git:
👉 **https://www.qr-code-generator.com/**

**QR kod için link:**
```
http://localhost:3000
```

> **NOT:** Canlı yayına aldığında gerçek domain adresini kullanacaksın
> Örnek: `https://lumiere-restaurant.com`

---

## 🎨 TASARIM ÖZELLİKLERİ

✅ **Modern & Minimalist**
✅ **Glassmorphism** efektleri
✅ **Smooth** animasyonlar
✅ **Responsive** tasarım
✅ **Dark mode** optimizasyonu
✅ **Yüksek kaliteli** görseller
✅ **Öne çıkan ürün** rozetleri

---

## 📸 KULLANICI DENEYİMİ

1. **Müşteri masadaki QR kodu okuttur**
2. **Menü anında açılır** (kurulum yok)
3. **Kategori seç** (üstte tab'lar)
4. **Ürüne tıkla** → Pop-up detay açılır
5. **Sipariş vermek için garson çağır** (alt kısımda not)

---

## 🔧 TEKNİK BİLGİLER

- **Frontend:** React.js + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** JSON dosyaları
- **Icons:** Lucide React
- **Responsive:** %100 mobil uyumlu
- **SEO Ready:** Meta tags hazır

---

## 📞 DESTEK

Sorun yaşarsan:
1. Backend çalışıyor mu kontrol et (Terminal 1)
2. Frontend çalışıyor mu kontrol et (Terminal 2)
3. Tarayıcı konsoluna bak (F12 → Console)

**Not:** Port 3001 (backend) ve 3000 (frontend) kullanımda olmalı.

