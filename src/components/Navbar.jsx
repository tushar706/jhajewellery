import { useState, useEffect } from 'react';
import Icon from './Icon';
import { WA_NUMBER } from '../data/index';

const Navbar = ({ page, setPage, cart, isLoggedIn, setIsLoggedIn }) => {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ,    setSearchQ]    = useState('');
  const [scrolled,   setScrolled]   = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const cartCount = cart.reduce((a, i) => a + i.qty, 0);

  return (
    <>
      <style>{`
        .navbar {
          position:fixed;top:0;left:0;right:0;z-index:1000;
          transition:all .4s ease;
          background:${scrolled ? 'rgba(10,10,10,.97)' : 'rgba(10,10,10,.85)'};
          backdrop-filter:blur(20px);
          border-bottom:1px solid ${scrolled ? 'rgba(201,168,76,.3)' : 'rgba(201,168,76,.1)'};
        }
        .nav-inner { max-width:1400px;margin:0 auto;padding:0 32px;display:flex;align-items:center;height:72px;gap:32px; }
        .nav-logo { font-family:var(--font-display);font-size:22px;font-weight:600;color:var(--gold);letter-spacing:.05em;cursor:pointer;white-space:nowrap;flex-shrink:0;transition:var(--transition); }
        .nav-logo span { color:var(--white);font-weight:300; }
        .nav-logo:hover { color:var(--gold-light); }
        .nav-links { display:flex;align-items:center;gap:2px;flex:1;justify-content:center; }
        .nav-link { font-size:11px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.75);padding:8px 16px;cursor:pointer;transition:var(--transition);border-radius:2px;position:relative;border:none;background:none; }
        .nav-link::after { content:'';position:absolute;bottom:4px;left:50%;right:50%;height:1px;background:var(--gold);transition:all .3s ease; }
        .nav-link:hover,.nav-link.active { color:var(--gold); }
        .nav-link:hover::after,.nav-link.active::after { left:16px;right:16px; }
        .nav-actions { display:flex;align-items:center;gap:4px;flex-shrink:0; }
        .nav-icon-btn { width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:50%;border:none;background:transparent;color:rgba(255,255,255,.75);cursor:pointer;transition:var(--transition);position:relative; }
        .nav-icon-btn:hover { background:rgba(201,168,76,.15);color:var(--gold); }
        .cart-badge { position:absolute;top:4px;right:4px;width:16px;height:16px;background:var(--gold);color:var(--black);border-radius:50%;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center; }
        .nav-search { position:fixed;top:72px;left:0;right:0;background:rgba(10,10,10,.97);backdrop-filter:blur(20px);padding:20px 32px;border-bottom:1px solid rgba(201,168,76,.2);display:flex;gap:16px;align-items:center;animation:fadeIn .2s ease; }
        .nav-search input { background:rgba(255,255,255,.08);border-color:rgba(201,168,76,.3);color:var(--white);max-width:600px; }
        .nav-search input:focus { border-color:var(--gold); }
        .mobile-menu { position:fixed;top:72px;left:0;right:0;bottom:0;background:var(--black);z-index:999;padding:32px;display:flex;flex-direction:column;gap:8px;animation:fadeIn .2s ease; }
        .mob-link { font-family:var(--font-display);font-size:28px;font-weight:300;color:var(--white);padding:12px 0;border-bottom:1px solid rgba(255,255,255,.08);cursor:pointer;transition:var(--transition);background:none;border-top:none;border-left:none;border-right:none;text-align:left; }
        .mob-link:hover { color:var(--gold);padding-left:16px; }
        .wa-btn { background:#25D366;color:white;border:none;border-radius:50px;padding:8px 16px 8px 12px;display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;cursor:pointer;transition:var(--transition);letter-spacing:.5px; }
        .wa-btn:hover { background:#128C7E;transform:scale(1.05); }
        .admin-panel-btn { display:inline-flex;align-items:center;gap:7px;background:linear-gradient(135deg,#1e1b4b,#4c1d95);color:#c4b5fd;border:1px solid rgba(139,92,246,.5);border-radius:6px;padding:8px 16px;font-family:var(--font-body);font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;transition:var(--transition);white-space:nowrap;box-shadow:0 2px 12px rgba(109,40,217,.3);position:relative;overflow:hidden; }
        .admin-panel-btn::after { content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(196,181,253,.15),transparent);transform:translateX(-100%);transition:transform .5s ease; }
        .admin-panel-btn:hover::after { transform:translateX(100%); }
        .admin-panel-btn:hover { background:linear-gradient(135deg,#312e81,#6d28d9);color:white;border-color:rgba(167,139,250,.7);box-shadow:0 4px 20px rgba(109,40,217,.5);transform:translateY(-1px); }
      `}</style>

      <nav className="navbar">
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => setPage('home')}>
            JHA <span>Jewellery</span>
          </div>

          <div className="nav-links hide-mobile">
            {[['home','Home'],['shop','Shop'],['categories','Categories']].map(([p,l]) => (
              <button key={p} className={`nav-link ${page===p?'active':''}`} onClick={() => setPage(p)}>{l}</button>
            ))}
          </div>

          <div className="nav-actions">
            <button className="nav-icon-btn hide-mobile" onClick={() => setSearchOpen(v => !v)}>
              <Icon name="search" size={18} />
            </button>
            <button className="nav-icon-btn" onClick={() => setPage('cart')} style={{ position:'relative' }}>
              <Icon name="cart" size={18} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
            <button className="nav-icon-btn hide-mobile" onClick={() => setPage(isLoggedIn ? 'account' : 'login')}>
              <Icon name="user" size={18} />
            </button>
            <button className="admin-panel-btn hide-mobile" onClick={() => isLoggedIn ? setPage('admin') : setPage('login')}>
              <Icon name="grid" size={15} color="currentColor" /> Admin Panel
            </button>
            <button className="wa-btn hide-mobile"
              onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=Hello%20JHA%20Jewellery!%20I%20need%20assistance.`, '_blank')}>
              <Icon name="whatsapp" size={14} color="white" /> Chat
            </button>
            <button className="nav-icon-btn hide-desktop" onClick={() => setMenuOpen(v => !v)}>
              <Icon name={menuOpen ? 'x' : 'menu'} size={18} />
            </button>
          </div>
        </div>
      </nav>

      {searchOpen && (
        <div className="nav-search">
          <input value={searchQ} onChange={e => setSearchQ(e.target.value)}
            placeholder="Search for rings, necklaces, earrings..." autoFocus
            onKeyDown={e => { if (e.key==='Enter') { setPage('shop'); setSearchOpen(false); } }} />
          <button className="btn-primary" onClick={() => { setPage('shop'); setSearchOpen(false); }}>Search</button>
          <button className="btn-outline" onClick={() => setSearchOpen(false)}>Cancel</button>
        </div>
      )}

      {menuOpen && (
        <div className="mobile-menu">
          {[['home','Home'],['shop','Shop'],['categories','Categories'],['cart','Cart'],['login','Account']].map(([p,l]) => (
            <button key={p} className="mob-link" onClick={() => { setPage(p); setMenuOpen(false); }}>{l}</button>
          ))}
          <button className="mob-link" style={{ color:'#a78bfa', borderColor:'rgba(139,92,246,.2)' }}
            onClick={() => { setPage(isLoggedIn ? 'admin' : 'login'); setMenuOpen(false); }}>
            ⚙️ Admin Panel
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
