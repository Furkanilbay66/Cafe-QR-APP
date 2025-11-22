const fs = require('fs').promises;
const path = require('path');

const dataDir = path.join(__dirname, 'data');

const initialMenu = {
  "burgers": [
    {
      "id": 101,
      "name": "Füme Etli Burger",
      "price": "34₺",
      "description": "100 gr. hamburger köftesi, füme et, mor lahana turşusu.",
      "image": "/images/burgers/burger1.jpg",
      "popular": true
    },
    {
      "id": 102,
      "name": "Tavuk Burger",
      "price": "28₺",
      "description": "100 gr tavuk köftesi, cheddar, domates, salatalık.",
      "image": "/images/burgers/burger2.jpg",
      "popular": false
    },
    {
      "id": 103,
      "name": "Karamelize Soğanlı Burger",
      "price": "31₺",
      "description": "100 gr. hamburger köftesi, karamelize soğan, turşu, füme sos.",
      "image": "/images/burgers/burger3.jpg",
      "popular": true
    },
    {
      "id": 104,
      "name": "Hawaii Burger",
      "price": "31₺",
      "description": "100 gr. hamburger köftesi, gıgara sos, cheddar, ananas, domates, mor soğan.",
      "image": "/images/burgers/burger4.jpg",
      "popular": false
    },
    {
      "id": 105,
      "name": "Ranch Burger",
      "price": "31₺",
      "description": "100 gr. hamburger köftesi, salata sos, turşu, cheddar.",
      "image": "/images/burgers/burger5.jpg",
      "popular": true
    }
  ],
  "pasta": [
    {
      "id": 201,
      "name": "Alfredo Soslu Makarna",
      "price": "42₺",
      "description": "Kremalı alfredo sos, tavuk, parmesan, taze fesleğen.",
      "image": "/images/pasta/pasta1.jpg",
      "popular": true
    },
    {
      "id": 202,
      "name": "Pesto Soslu Penne",
      "price": "38₺",
      "description": "Taze fesleğen pesto, çam fıstığı, parmesan.",
      "image": "/images/pasta/pasta2.jpg",
      "popular": false
    },
    {
      "id": 203,
      "name": "Bolonez Makarna",
      "price": "45₺",
      "description": "Kıymalı domates sos, taze baharatlar, parmesan.",
      "image": "/images/pasta/pasta3.jpg",
      "popular": true
    }
  ],
  "desserts": [
    {
      "id": 201,
      "name": "Çikolata Küre",
      "price": "$24.00",
      "description": "70% kakao, sıcak tuzlu karamel sos, vanilyalı dondurma.",
      "image": "/images/desserts/dessert1.jpg",
      "popular": true
    },
    {
      "id": 202,
      "name": "Matcha Tiramisu",
      "price": "$18.00",
      "description": "Matcha emdirilmiş kedi dili, mascarpone, matcha tozu.",
      "image": "/images/desserts/dessert2.jpg",
      "popular": false
    },
    {
      "id": 203,
      "name": "Limonlu Tart",
      "price": "$16.00",
      "description": "Limon kreması, tereyağlı hamur, fesleğenli beze.",
      "image": "/images/desserts/dessert3.jpg",
      "popular": false
    },
    {
      "id": 204,
      "name": "Cheesecake Özel",
      "price": "$22.00",
      "description": "New York usulü cheesecake, orman meyveli sos.",
      "image": "/images/desserts/dessert4.jpg",
      "popular": true
    }
  ],
  "drinks": [
    {
      "id": 301,
      "name": "Old Fashioned (Dumanlı)",
      "price": "$22.00",
      "description": "Bourbon, angostura, şeker küpü, hickory dumanı.",
      "image": "/images/drinks/drink1.jpg",
      "popular": true
    },
    {
      "id": 302,
      "name": "Lavanta Gin Fizz",
      "price": "$18.00",
      "description": "Empress gin, limon suyu, lavanta şurubu, yumurta akı köpüğü.",
      "image": "/images/drinks/drink2.jpg",
      "popular": true
    },
    {
      "id": 303,
      "name": "Espresso Özel",
      "price": "$6.00",
      "description": "Tek köken çekirdek, zengin krema, çikolata ve kiraz notaları.",
      "image": "/images/drinks/drink3.jpg",
      "popular": false
    },
    {
      "id": 304,
      "name": "Tropikal Mojito",
      "price": "$16.00",
      "description": "Beyaz rom, nane, limon, ananas, soda.",
      "image": "/images/drinks/drink4.jpg",
      "popular": false
    },
    {
      "id": 305,
      "name": "Türk Kahvesi",
      "price": "$8.00",
      "description": "Geleneksel Türk kahvesi, lokum ile servis.",
      "image": "/images/drinks/drink5.jpg",
      "popular": true
    }
  ],
  "breakfast": [
    {
      "id": 401,
      "name": "Serpme Kahvaltı",
      "price": "95₺",
      "description": "Peynir çeşitleri, yumurta, zeytin, reçel, bal, tereyağı, sınırsız çay.",
      "image": "/images/breakfast/breakfast1.jpg",
      "popular": true
    },
    {
      "id": 402,
      "name": "Menemen",
      "price": "35₺",
      "description": "Domates, biber, yumurta, özel baharatlar ile.",
      "image": "/images/breakfast/breakfast2.jpg",
      "popular": true
    },
    {
      "id": 403,
      "name": "Omlet",
      "price": "32₺",
      "description": "3 yumurta, kaşar peyniri, domates, biber.",
      "image": "/images/breakfast/breakfast3.jpg",
      "popular": false
    },
    {
      "id": 404,
      "name": "Krep",
      "price": "38₺",
      "description": "Nutella, muz, çilek, pudra şekeri.",
      "image": "/images/breakfast/breakfast4.jpg",
      "popular": true
    }
  ],
  "special": [
    {
      "id": 501,
      "name": "Wagyu Biftek",
      "price": "185₺",
      "description": "A5 Japon Wagyu, trüf patates püresi, kuşkonmaz, kırmızı şarap sosu.",
      "image": "/images/special/special1.jpg",
      "popular": true
    },
    {
      "id": 502,
      "name": "Istakozlu Risotto",
      "price": "158₺",
      "description": "Arborio pirinç, safran, tereyağlı ıstakoz kuyruğu, parmesan cipsi.",
      "image": "/images/special/special2.jpg",
      "popular": true
    },
    {
      "id": 503,
      "name": "Kuzu Pirzola",
      "price": "145₺",
      "description": "Yeni Zelanda kuzu pirzola, nane jölesi, kızarmış kök sebzeler.",
      "image": "/images/special/special3.jpg",
      "popular": false
    }
  ]
};

const initialOrders = [];

const initialUsers = [
  {
    "id": 1,
    "username": "admin",
    "password": "admin123",
    "role": "admin"
  }
];

async function initializeDatabase() {
  try {
    // Data klasörü oluştur
    await fs.mkdir(dataDir, { recursive: true });
    
    // Menu veritabanını oluştur
    await fs.writeFile(
      path.join(dataDir, 'menu.json'),
      JSON.stringify(initialMenu, null, 2)
    );
    console.log('✅ menu.json oluşturuldu');
    
    // Orders veritabanını oluştur
    await fs.writeFile(
      path.join(dataDir, 'orders.json'),
      JSON.stringify(initialOrders, null, 2)
    );
    console.log('✅ orders.json oluşturuldu');
    
    // Users veritabanını oluştur
    await fs.writeFile(
      path.join(dataDir, 'users.json'),
      JSON.stringify(initialUsers, null, 2)
    );
    console.log('✅ users.json oluşturuldu');
    
    console.log('\n🎉 Veritabanı başarıyla başlatıldı!');
    console.log('\n👤 Admin Giriş Bilgileri:');
    console.log('   Kullanıcı Adı: admin');
    console.log('   Şifre: admin123\n');
    
  } catch (error) {
    console.error('❌ Hata:', error);
  }
}

initializeDatabase();

