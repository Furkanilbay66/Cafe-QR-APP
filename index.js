import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Admin from './Admin';
import SimpleMenu from './SimpleMenu';

// Route kontrolü (basit yönlendirme)
// /admin → Admin Panel
// /full → Tam özellikli uygulama (sipariş sistemi ile)
// / → Basit QR Menü (sadece görüntüleme)
let CurrentApp;
if (window.location.pathname === '/admin') {
  CurrentApp = Admin;
} else if (window.location.pathname === '/full') {
  CurrentApp = App;
} else {
  CurrentApp = SimpleMenu; // Default: Basit QR menü
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CurrentApp />
  </React.StrictMode>
);

