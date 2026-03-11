import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { PRODUCTS, CATEGORIES } from '../data/index';

const heroes = [
  { title: 'Timeless Elegance',  subtitle: 'New Collection 2024',  desc: 'Discover pieces crafted for eternity', cta: 'Explore Collection', emoji: '💍' },
  { title: 'Bridal Splendour',   subtitle: 'Wedding Collection',   desc: "Begin your forever with JHA",          cta: 'Shop Bridal',        emoji: '📿' },
  { title: 'Gift of Gold',       subtitle: 'Special Occasions',    desc: 'The finest gold jewellery for every celebration', cta: 'Shop Gifts', emoji: '✨' },
];

const HomePage = ({ setPage, addToCart }) => {
  const [activeHero, setActiveHero] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveHero(v => (v + 1) % heroes.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        .hero { min-height:100vh;display:flex;align-items:center;position:relative;overflow:hidden;background:var(--black);padding-top:72px; }
        .hero-pattern { position:absolute;inset:0;opacity:.03;background-image:repeating-linear-gradient(45deg,var(--gold) 0,var(--gold) 1px,transparent 0,transparent 50%);background-size:30px 30px; }
        .hero-content { position:relative;z-index:2;max-width:1400px;margin:0 auto;padding:80px 32px;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;width:100%; }
        .hero-kicker { font-size:11px;font-weight:600;letter-spacing:4px;text-transform:uppercase;color:var(--gold);margin-bottom:20px;display:flex;align-items:center;gap:12px; }
        .hero-kicker::before { content:'';width:40px;height:1px;background:var(--gold); }
        .hero-title { font-family:var(--font-display);font-size:clamp(3rem,6vw,6rem);font-weight:300;color:var(--white);line-height:1.05;margin-bottom:24px;letter-spacing:-.01em; }
        .hero-title em { color:var(--gold);font-style:italic; }
        .hero-desc { font-size:15px;color:rgba(255,255,255,.6);margin-bottom:40px;max-width:440px;line-height:1.8;font-weight:300; }
        .hero-actions { display:flex;gap:16px;flex-wrap:wrap; }
        .hero-visual { display:flex;align-items:center;justify-content:center; }
        .hero-ring { width:320px;height:320px;border-radius:50%;border:1px solid rgba(201,168,76,.2);display:flex;align-items:center;justify-content:center;position:relative;animation:float 6s ease-in-out infinite; }
        .hero-ring::before { content:'';position:absolute;inset:20px;border-radius:50%;border:1px solid rgba(201,168,76,.15); }
        .hero-ring::after  { content:'';position:absolute;inset:40px;border-radius:50%;border:1px solid rgba(201,168,76,.1); }
        .hero-emoji { font-size:120px;filter:drop-shadow(0 20px 40px rgba(201,168,76,.3)); }
        .hero-dots { display:flex;gap:8px;margin-top:40px; }
        .hero-dot { width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.3);cursor:pointer;transition:var(--transition);border:none; }
        .hero-dot.on { background:var(--gold);width:24px;border-radius:3px; }
        .hero-stats { display:flex;gap:40px;margin-top:48px;padding-top:48px;border-top:1px solid rgba(255,255,255,.08); }
        .hero-stat-num { font-family:var(--font-display);font-size:2rem;color:var(--gold);font-weight:500; }
        .hero-stat-lbl { font-size:11px;color:rgba(255,255,255,.5);letter-spacing:1.5px;text-transform:uppercase;font-weight:500; }

        .section { padding:80px 32px;max-width:1400px;margin:0 auto; }
        .section-header { text-align:center;margin-bottom:56px; }

        .cat-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:20px; }
        .cat-card { position:relative;overflow:hidden;border-radius:4px;cursor:pointer;height:320px;background:var(--black);transition:var(--transition);border:1px solid rgba(201,168,76,.1); }
        .cat-card:hover { transform:scale(1.02);border-color:var(--gold); }
        .cat-bg { position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:100px;opacity:.2; }
        .cat-content { position:absolute;bottom:0;left:0;right:0;padding:24px;background:linear-gradient(transparent,rgba(0,0,0,.8)); }
        .cat-name { font-family:var(--font-display);font-size:24px;color:var(--white);font-weight:300;margin-bottom:4px; }
        .cat-count { font-size:11px;color:var(--gold);letter-spacing:2px; }

        .promo { background:var(--black);padding:80px 32px;text-align:center;position:relative;overflow:hidden; }
        .promo::before { content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(201,168,76,.08) 0%,transparent 70%); }
        .promo-title { font-family:var(--font-display);font-size:clamp(2.5rem,5vw,4rem);color:var(--white);font-weight:300;margin-bottom:16px; }
        .promo-title em { color:var(--gold);font-style:italic; }
        .promo-desc { color:rgba(255,255,255,.6);margin-bottom:32px;font-size:15px;max-width:500px;margin-left:auto;margin-right:auto; }

        @media(max-width:1024px){ .hero-content{grid-template-columns:1fr;text-align:center;} .hero-visual{display:none;} .cat-grid{grid-template-columns:repeat(2,1fr);} }
        @media(max-width:640px){ .hero-stats{flex-wrap:wrap;gap:24px;} }
      `}</style>

      {/* Hero */}
      <section className="hero">
        <div className="hero-pattern" />
        <div className="hero-content">
          <div className="fade-in">
            <div className="hero-kicker">JHA Jewellery · Est. 2010</div>
            <h1 className="hero-title">
              {heroes[activeHero].title.split(' ').map((w,i) => (
                <span key={i}>{i===1 ? <em>{w} </em> : `${w} `}</span>
              ))}
            </h1>
            <p className="hero-desc">{heroes[activeHero].desc}. Every piece tells a story of craftsmanship, love, and heritage.</p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => setPage('shop')}>{heroes[activeHero].cta} →</button>
              <button className="btn-outline" onClick={() => setPage('categories')}>View Categories</button>
            </div>
            <div className="hero-dots">
              {heroes.map((_,i) => (
                <button key={i} className={`hero-dot${i===activeHero?' on':''}`} onClick={() => setActiveHero(i)} />
              ))}
            </div>
            <div className="hero-stats">
              {[['2000+','Designs'],['50K+','Happy Customers'],['14','Years of Craft']].map(([n,l]) => (
                <div key={l}><div className="hero-stat-num">{n}</div><div className="hero-stat-lbl">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-ring"><span className="hero-emoji">{heroes[activeHero].emoji}</span></div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section style={{ padding:'80px 0', background:'var(--white-off)' }}>
        <div className="section">
          <div className="section-header">
            <div className="section-subtitle">Handcrafted Excellence</div>
            <h2 className="section-title">Featured <span>Pieces</span></h2>
            <div className="gold-divider" />
          </div>
          <div className="product-grid">
            {PRODUCTS.slice(0,4).map(p => <ProductCard key={p.id} product={p} setPage={setPage} addToCart={addToCart} />)}
          </div>
          <div style={{ textAlign:'center', marginTop:40 }}>
            <button className="btn-primary" onClick={() => setPage('shop')}>View All Products →</button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding:'80px 0' }}>
        <div className="section">
          <div className="section-header">
            <div className="section-subtitle">Browse by Category</div>
            <h2 className="section-title">Shop Our <span>Collections</span></h2>
            <div className="gold-divider" />
          </div>
          <div className="cat-grid">
            {CATEGORIES.map(cat => (
              <div key={cat.id} className="cat-card" onClick={() => setPage('shop')}>
                <div className="cat-bg">{cat.icon}</div>
                <div className="cat-content">
                  <div className="cat-name">{cat.name}</div>
                  <div className="cat-count">{cat.count} Pieces</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo */}
      <div className="promo">
        <div style={{ position:'relative', zIndex:1 }}>
          <div className="section-subtitle">Limited Time Offer</div>
          <h2 className="promo-title">Up to <em>30% Off</em> on <br/>Festive Collection</h2>
          <p className="promo-desc">Celebrate every moment with JHA's exclusive festive pieces, crafted with love and certified gold.</p>
          <button className="btn-primary" onClick={() => setPage('shop')}>Shop the Sale →</button>
        </div>
      </div>

      {/* Trending */}
      <section style={{ padding:'80px 0', background:'var(--white-off)' }}>
        <div className="section">
          <div className="section-header">
            <div className="section-subtitle">What's Hot Right Now</div>
            <h2 className="section-title">Trending <span>Now</span></h2>
            <div className="gold-divider" />
          </div>
          <div className="product-grid">
            {PRODUCTS.slice(4,8).map(p => <ProductCard key={p.id} product={p} setPage={setPage} addToCart={addToCart} />)}
          </div>
        </div>
      </section>

      <Footer setPage={setPage} />
    </>
  );
};

export default HomePage;
