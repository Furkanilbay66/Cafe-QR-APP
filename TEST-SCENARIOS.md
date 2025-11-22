# 🧪 Lumière QR Menü - Test Senaryoları

**Version:** v1.3.0  
**Test Seviyesi:** Enterprise Grade  
**Son Güncelleme:** 22/11/2025

---

## 📋 Test Kategorileri

1. [Fonksiyonel Testler](#fonksiyonel-testler)
2. [Edge Case Testler](#edge-case-testler)
3. [Performans Testler](#performans-testler)
4. [UX Testler](#ux-testler)
5. [Güvenlik Testler](#güvenlik-testler)
6. [Offline Testler](#offline-testler)
7. [Responsive Testler](#responsive-testler)

---

## ✅ Fonksiyonel Testler

### Test 1: AI Input - Normal Kullanım

**Test Adımları:**
1. Ana sayfayı aç
2. ✨ AI Asistan butonuna tıkla
3. Input kutusuna "Hangi yemeği önerirsin?" yaz
4. Enter tuşuna bas

**Beklenen Sonuç:**
- ✅ Mesaj gönderilir
- ✅ Yazı inputtan temizlenir
- ✅ AI "yazıyor..." göstergesi belirir
- ✅ 2-3 saniye içinde AI cevap verir

**Gerçek Sonuç:**
- [ ] BAŞARILI
- [ ] BAŞARISIZ (Detay: _____________)

---

### Test 2: AI Input - Yazarken Otomatik Gönderme

**Test Adımları:**
1. AI Asistan'ı aç
2. "Hangi" yaz
3. Bekle (Enter'a basma)
4. " yemeği" ekle
5. Bekle
6. " önerirsin?" ekle
7. Enter'a bas

**Beklenen Sonuç:**
- ✅ Yazarken hiçbir şey gönderilmez
- ✅ Sadece Enter'a basınca gönderilir

**Gerçek Sonuç:**
- [ ] BAŞARILI
- [ ] BAŞARISIZ

---

### Test 3: AI Input - Shift+Enter (Çoklu Satır)

**Test Adımları:**
1. AI Asistan'ı aç
2. "Birinci satır" yaz
3. Shift+Enter'a bas
4. "İkinci satır" yaz
5. Shift+Enter'a bas
6. "Üçüncü satır" yaz
7. Enter'a bas (Shift olmadan)

**Beklenen Sonuç:**
- ✅ Shift+Enter ile yeni satır açılır
- ✅ Textarea otomatik büyür
- ✅ Normal Enter ile mesaj gönderilir
- ✅ 3 satırlık mesaj gider

**Gerçek Sonuç:**
- [ ] BAŞARILI
- [ ] BAŞARISIZ

---

### Test 4: AI Input - Spam Testi

**Test Adımları:**
1. AI Asistan'ı aç
2. "Test" yaz
3. Enter'a 10 kez hızlıca arka arkaya bas

**Beklenen Sonuç:**
- ✅ Sadece 1 mesaj gider
- ✅ Diğer Enter'lar göz ardı edilir
- ✅ 300ms sonra tekrar gönderim yapılabilir

**Gerçek Sonuç:**
- [ ] BAŞARILI (Kaç mesaj gitti: ___)
- [ ] BAŞARISIZ

---

### Test 5: Textarea Auto-Resize

**Test Adımları:**
1. AI Asistan'ı aç
2. 10 satırlık uzun bir metin yaz (Shift+Enter ile)
3. Textarea yüksekliğini gözlemle

**Beklenen Sonuç:**
- ✅ Textarea otomatik büyür
- ✅ Max 120px'de durur
- ✅ Scroll bar belirir
- ✅ Enter'la gönderim sonrası küçülür

**Gerçek Sonuç:**
- [ ] BAŞARILI
- [ ] BAŞARISIZ

---

## 🖼️ Görsel Testler

### Test 6: Görsel Blur-Up Effect

**Test Adımları:**
1. Browser cache'i temizle (Ctrl+Shift+Del)
2. Menü sayfasını aç
3. Bir kategoriye gir
4. Görsellerin yüklenişini gözlemle

**Beklenen Sonuç:**
- ✅ İlk başta bulanık placeholder
- ✅ Yumuşak geçiş animasyonu (0.3s)
- ✅ Keskin görsel belirir
- ✅ Instagram/Medium tarzı yükleme

**Gerçek Sonuç:**
- [ ] BAŞARILI
- [ ] BAŞARISIZ

---

### Test 7: Lazy Loading

**Test Adımları:**
1. Network tab'ı aç (F12 > Network)
2. Menü sayfasını aç
3. Sayfa sonuna kadar scroll etME (durur)
4. Network isteklerini gözlemle
5. Scroll yap
6. Yeni istekleri gözlemle

**Beklenen Sonuç:**
- ✅ İlk başta sadece görünen görseller yüklenir
- ✅ Scroll'da yeni görseller yüklenir
- ✅ Veri tasarrufu sağlanır

**Gerçek Sonuç:**
- [ ] BAŞARILI (İlk yükleme: ___ görs el, Toplam: ___ görsel)
- [ ] BAŞARISIZ

---

### Test 8: Responsive Görseller (srcset)

**Test Adımları:**
1. Chrome DevTools aç (F12)
2. Device toolbar'ı aç (Ctrl+Shift+M)
3. iPhone SE seç (375px)
4. Network tab'ı aç
5. Bir ürün görselini incele
6. Görsel boyutunu kontrol et
7. Desktop görünümüne geç (1920px)
8. Aynı görseli tekrar kontrol et

**Beklenen Sonuç:**
- ✅ Mobilde 400px görsel
- ✅ Desktop'ta 800px görsel
- ✅ Farklı dosyalar yükleniyor

**Gerçek Sonuç:**
- [ ] BAŞARILI (Mobil: ___px, Desktop: ___px)
- [ ] BAŞARISIZ

---

## 🌐 Offline Testler

### Test 9: Offline Cache - Menü

**Test Adımları:**
1. Menü sayfasını aç
2. Tüm kategorilere gir (menü cache'lenir)
3. Chrome DevTools > Network > Offline seç
4. Sayfayı yenile (F5)

**Beklenen Sonuç:**
- ✅ Menü görünür (cache'den)
- ✅ Görseller yerel fallback ile
- ✅ "Offline" uyarısı yok

**Gerçek Sonuç:**
- [ ] BAŞARILI
- [ ] BAŞARISIZ

---

### Test 10: Offline - AI Asistan

**Test Adımları:**
1. DevTools > Network > Offline
2. AI Asistan'ı aç
3. Mesaj yaz ve gönder

**Beklenen Sonuç:**
- ✅ "İnternet bağlantınız yok" mesajı
- ✅ Mesaj gönderilmez
- ✅ Input temizlenmez

**Gerçek Sonuç:**
- [ ] BAŞARILI
- [ ] BAŞARISIZ

---

### Test 11: Offline - Görsel Fallback

**Test Adımları:**
1. DevTools > Network > Offline
2. Cache'i temizle
3. Menü sayfasını aç
4. Görselleri gözlemle

**Beklenen Sonuç:**
- ✅ Yerel fallback görsel (`/images/fallback.jpg`)
- ✅ "Görsel Yüklenemedi" metni
- ✅ Uygulama crash'lemiyor

**Gerçek Sonuç:**
- [ ] BAŞARILI
- [ ] BAŞARISIZ

---

## ⚡ Performans Testler

### Test 12: Lighthouse Audit

**Test Adımları:**
1. Chrome DevTools > Lighthouse
2. "Analyze page load" seç
3. Run audit

**Beklenen Sonuç:**
- ✅ Performance: >90
- ✅ Best Practices: >95
- ✅ SEO: >95
- ✅ Accessibility: >95

**Gerçek Sonuç:**
- Performance: ___/100
- Best Practices: ___/100
- SEO: ___/100
- Accessibility: ___/100

---

### Test 13: First Contentful Paint (FCP)

**Test Adımları:**
1. DevTools > Performance
2. Sayfayı yenile ve kaydı durdur
3. FCP süresini ölç

**Beklenen Sonuç:**
- ✅ FCP < 1.8s (Good)

**Gerçek Sonuç:**
- FCP: ___s
- [ ] BAŞARILI (<1.8s)
- [ ] BAŞARISIZ (>1.8s)

---

### Test 14: Largest Contentful Paint (LCP)

**Test Adımları:**
1. DevTools > Performance
2. Sayfayı yenile
3. LCP süresini ölç

**Beklenen Sonuç:**
- ✅ LCP < 2.5s (Good)

**Gerçek Sonuç:**
- LCP: ___s
- [ ] BAŞARILI (<2.5s)
- [ ] BAŞARISIZ (>2.5s)

---

## 🔍 Edge Case Testler

### Test 15: Görsel URL Bozuk

**Test Adımları:**
1. Admin panel aç
2. Bir ürünü düzenle
3. Görsel URL'sini yanlış gir: `https://broken-url.com/image.jpg`
4. Kaydet
5. Menü'de ürünü görüntüle

**Beklenen Sonuç:**
- ✅ Online fallback dener
- ✅ O da olmazsa yerel fallback
- ✅ Sonsuz döngü yok
- ✅ Uygulama çalışıyor

**Gerçek Sonuç:**
- [ ] BAŞARILI
- [ ] BAŞARISIZ

---

### Test 16: Çok Uzun Mesaj

**Test Adımları:**
1. AI Asistan'ı aç
2. 500 karakterlik mesaj yaz
3. Gönder

**Beklenen Sonuç:**
- ✅ Textarea 120px'de durur
- ✅ Scroll bar belirir
- ✅ Mesaj gönderilir
- ✅ AI cevap verir

**Gerçek Sonuç:**
- [ ] BAŞARILI
- [ ] BAŞARISIZ

---

### Test 17: API Timeout

**Test Adımları:**
1. DevTools > Network > Throttling > Slow 3G
2. AI Asistan'a mesaj gönder
3. 30 saniye bekle

**Beklenen Sonuç:**
- ✅ Typing indicator görünür
- ✅ Timeout sonrası hata mesajı
- ✅ Uygulama donmaz

**Gerçek Sonuç:**
- [ ] BAŞARILI
- [ ] BAŞARISIZ

---

## 📱 Responsive Testler

### Test 18: iPhone SE (375px)

**Test Adımları:**
1. DevTools > Device: iPhone SE
2. Tüm sayfaları gez
3. Görselleri kontrol et

**Beklenen Sonuç:**
- ✅ Layout düzgün
- ✅ Görseller 400px
- ✅ Touch hedefleri yeterli
- ✅ Scroll sorunsuz

**Gerçek Sonuç:**
- [ ] BAŞARILI
- [ ] BAŞARISIZ

---

### Test 19: iPad (768px)

**Test Adımları:**
1. DevTools > Device: iPad
2. Landscape ve Portrait modları test et

**Beklenen Sonuç:**
- ✅ İki modda da düzgün
- ✅ Görseller 600px
- ✅ Grid layout uygun

**Gerçek Sonuç:**
- [ ] BAŞARILI
- [ ] BAŞARISIZ

---

### Test 20: 4K Monitor (3840px)

**Test Adımları:**
1. DevTools > Responsive > 3840x2160
2. Sayfayı görüntüle

**Beklenen Sonuç:**
- ✅ Layout taşmıyor
- ✅ Görseller 800px (max)
- ✅ Max-width container çalışıyor

**Gerçek Sonuç:**
- [ ] BAŞARILI
- [ ] BAŞARISIZ

---

## 🔐 Güvenlik Testler

### Test 21: XSS Koruması

**Test Adımları:**
1. AI Asistan'a gir
2. Şu mesajı gönder: `<script>alert('XSS')</script>`

**Beklenen Sonuç:**
- ✅ Alert çıkmaz
- ✅ Script execute olmaz
- ✅ Text olarak görünür

**Gerçek Sonuç:**
- [ ] BAŞARILI
- [ ] BAŞARISIZ

---

### Test 22: SQL Injection (API)

**Test Adımları:**
1. DevTools > Console
2. Şunu çalıştır:
```javascript
fetch('/api/menu?id=1 OR 1=1')
```

**Beklenen Sonuç:**
- ✅ Invalid response veya error
- ✅ Tüm data dönmez

**Gerçek Sonuç:**
- [ ] BAŞARILI
- [ ] BAŞARISIZ

---

## 📊 Test Sonuç Özeti

### Fonksiyonel Testler
- Test 1-5: ___/5 Başarılı

### Görsel Testler
- Test 6-8: ___/3 Başarılı

### Offline Testler
- Test 9-11: ___/3 Başarılı

### Performans Testler
- Test 12-14: ___/3 Başarılı

### Edge Case Testler
- Test 15-17: ___/3 Başarılı

### Responsive Testler
- Test 18-20: ___/3 Başarılı

### Güvenlik Testler
- Test 21-22: ___/2 Başarılı

---

## 🎯 Toplam Sonuç

**Başarılı:** ___/22  
**Başarısız:** ___/22  
**Başarı Oranı:** ___%

**Kalite Seviyesi:**
- 100%: 🔥 Enterprise
- 90-99%: ✅ Production Ready
- 80-89%: ⚠️ Needs Work
- <80%: ❌ Not Ready

---

## 📝 Test Notları

**Tespit Edilen Sorunlar:**
1. _______________________________
2. _______________________________
3. _______________________________

**İyileştirme Önerileri:**
1. _______________________________
2. _______________________________
3. _______________________________

---

**Test Eden:** ___________________  
**Test Tarihi:** ___________________  
**Versiyon:** v1.3.0  

---

<div align="center">

**🧪 Comprehensive Testing for Enterprise Quality! 🧪**

</div>

