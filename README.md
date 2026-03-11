# 💍 JHA Jewellery — Premium Ecommerce Website

A full-featured jewellery ecommerce frontend built with **React + Vite**.

## 🚀 Quick Start

```bash
# 1. Folder mein jao
cd jha-jewellery

# 2. Dependencies install karo
npm install

# 3. Dev server start karo
npm run dev
```

Browser mein open hoga: **http://localhost:5173**

---

## 📁 Project Structure

```
jha-jewellery/
├── public/
│   └── favicon.svg
├── src/
│   ├── admin/
│   │   └── AdminDashboard.jsx   ← Admin panel (all tabs)
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Icon.jsx
│   │   ├── ImageUploader.jsx    ← Drag & drop image upload
│   │   ├── Navbar.jsx
│   │   └── ProductCard.jsx
│   ├── data/
│   │   └── index.js             ← Products, Orders, Customers data
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   └── ShopPages.jsx        ← Shop, Categories, Product Detail, Cart, Checkout, Login
│   ├── styles/
│   │   └── globals.css          ← All global styles + CSS variables
│   ├── App.jsx                  ← Main app + routing
│   └── main.jsx                 ← Entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 🌐 Deploy to Vercel

```bash
# 1. GitHub pe push karo
git init
git add .
git commit -m "JHA Jewellery - initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/jha-jewellery.git
git push -u origin main

# 2. vercel.com pe jao → New Project → GitHub repo select karo → Deploy
```

**Vercel Settings:**
- Framework Preset: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`

---

## ✨ Features

### Public Website
- 🏠 Hero banner with auto-rotating slides
- 🛍️ Shop with filters (category, price, search, sort)
- 📦 Product detail with image gallery
- 🛒 Cart with quantity management
- 💳 Checkout (UPI / Card / COD)
- 🔐 Login / Signup page
- 📱 WhatsApp order button

### Admin Panel
- 📊 Dashboard with stats
- 📦 Product CRUD with image upload
- 🤖 AI Content Generator (Claude API)
- 📋 Order management with status update
- 👥 Customer list
- 🏷️ Coupon management
- 📈 Inventory & stock alerts
- ⚙️ Store settings

---

## 📞 Contact Info
- WhatsApp: +91 xxxx
- Address: Plot 12, Sector 18, Noida, Delhi NCR - 201301
- Email: hello@jhajewellery.com
