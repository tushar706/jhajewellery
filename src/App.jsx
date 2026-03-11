import { useState } from 'react';
import './styles/globals.css';

import Navbar         from './components/Navbar';
import Icon           from './components/Icon';

import HomePage       from './pages/HomePage';
import { ShopPage, CategoriesPage, ProductDetailPage, CartPage, CheckoutPage, LoginPage } from './pages/ShopPages';
import AdminDashboard from './admin/AdminDashboard';

import { WA_NUMBER }  from './data/index';

export default function App() {
  const [page,       setPage]       = useState('home');
  const [cart,       setCart]       = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ── cart helpers ──────────────────────────────────────
  const addToCart = (product, qty = 1) => {
    setCart(c => {
      const existing = c.find(i => i.id === product.id);
      if (existing) return c.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...c, { ...product, qty }];
    });
  };
  const updateQty  = (id, qty) => {
    if (qty <= 0) setCart(c => c.filter(i => i.id !== id));
    else          setCart(c => c.map(i => i.id === id ? { ...i, qty } : i));
  };
  const removeItem = (id) => setCart(c => c.filter(i => i.id !== id));

  // ── parse product detail page ─────────────────────────
  const productId = page.startsWith('product-') ? parseInt(page.split('-')[1]) : null;

  const isFullPage = page === 'admin' || page === 'login';

  return (
    <>
      {!isFullPage && (
        <Navbar
          page={page}
          setPage={setPage}
          cart={cart}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}

      <main>
        {page === 'home'       && <HomePage       setPage={setPage} addToCart={addToCart} />}
        {page === 'shop'       && <ShopPage        setPage={setPage} addToCart={addToCart} />}
        {page === 'categories' && <CategoriesPage  setPage={setPage} addToCart={addToCart} />}
        {page === 'cart'       && <CartPage        cart={cart} updateQty={updateQty} removeItem={removeItem} setPage={setPage} />}
        {page === 'checkout'   && <CheckoutPage    cart={cart} setPage={setPage} />}
        {page === 'login'      && <LoginPage       setPage={setPage} setIsLoggedIn={setIsLoggedIn} />}
        {page === 'admin'      && <AdminDashboard  setPage={setPage} setIsLoggedIn={setIsLoggedIn} />}
        {productId             && <ProductDetailPage productId={productId} setPage={setPage} addToCart={addToCart} />}
      </main>

      {/* Floating WhatsApp button */}
      {!isFullPage && (
        <button
          onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=Hello%20JHA%20Jewellery!`, '_blank')}
          style={{
            position:'fixed', bottom:24, right:24, zIndex:999,
            width:56, height:56, borderRadius:'50%',
            background:'#25D366', border:'none', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 4px 20px rgba(37,211,102,0.4)',
            animation:'pulse-gold 2s infinite',
            transition:'transform 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.transform='scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
          title="Chat on WhatsApp"
        >
          <Icon name="whatsapp" size={28} color="white" />
        </button>
      )}
    </>
  );
}
