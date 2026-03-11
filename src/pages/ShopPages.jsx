import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import Icon from '../components/Icon';
import { PRODUCTS, CATEGORIES, WA_NUMBER } from '../data/index';

/* ════════════════════════════════════════
   SHOP PAGE
════════════════════════════════════════ */
export const ShopPage = ({ setPage, addToCart }) => {
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sort,     setSort]     = useState('featured');

  const filtered = PRODUCTS
    .filter(p =>
      (category === 'All' || p.category === category) &&
      p.price <= maxPrice &&
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a,b) =>
      sort==='price-asc'  ? a.price - b.price :
      sort==='price-desc' ? b.price - a.price :
      sort==='rating'     ? b.rating - a.rating : 0
    );

  return (
    <>
      <style>{`
        .shop-layout { display:grid;grid-template-columns:260px 1fr;gap:32px;max-width:1400px;margin:0 auto;padding:120px 32px 80px;align-items:start; }
        .filter-panel { background:var(--white);border:1px solid var(--gray-light);border-radius:4px;padding:28px;position:sticky;top:92px; }
        .filter-title { font-family:var(--font-display);font-size:20px;margin-bottom:24px;color:var(--black); }
        .filter-group { margin-bottom:28px; }
        .filter-group-title { font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin-bottom:14px; }
        .filter-opt { display:flex;align-items:center;gap:10px;padding:8px 12px;cursor:pointer;border-radius:2px;font-size:13px;transition:var(--transition);color:var(--charcoal);border:none;background:none;width:100%;text-align:left; }
        .filter-opt:hover,.filter-opt.on { background:var(--gold-pale);color:var(--gold-dark); }
        .filter-opt.on { font-weight:600; }
        .range-val { font-size:13px;color:var(--gold);font-weight:600;margin-bottom:10px; }
        input[type=range] { -webkit-appearance:none;width:100%;height:3px;background:linear-gradient(to right,var(--gold) 0%,var(--gold) 50%,var(--gray-light) 50%);border-radius:2px;outline:none;padding:0; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--gold);cursor:pointer;border:2px solid white;box-shadow:var(--shadow-sm); }
        .shop-header { display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;flex-wrap:wrap;gap:16px; }
        @media(max-width:768px){ .shop-layout{grid-template-columns:1fr;padding-top:100px;} .filter-panel{position:static;} }
      `}</style>
      <div className="shop-layout">
        <div className="filter-panel">
          <div className="filter-title">Filters</div>
          <div className="filter-group">
            <div className="filter-group-title">Search</div>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…" />
          </div>
          <div className="filter-group">
            <div className="filter-group-title">Category</div>
            {['All', ...CATEGORIES.map(c => c.name)].map(cat => (
              <button key={cat} className={`filter-opt${category===cat?' on':''}`} onClick={() => setCategory(cat)}>
                {cat}
                {cat !== 'All' && <span style={{ marginLeft:'auto', fontSize:11, color:'var(--gray-mid)' }}>{PRODUCTS.filter(p=>p.category===cat).length}</span>}
              </button>
            ))}
          </div>
          <div className="filter-group">
            <div className="filter-group-title">Price Range</div>
            <div className="range-val">Up to ₹{maxPrice.toLocaleString()}</div>
            <input type="range" min={1000} max={100000} step={1000} value={maxPrice}
              onChange={e => setMaxPrice(+e.target.value)}
              style={{ backgroundSize:`${(maxPrice-1000)/990}% 100%` }} />
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--gray-mid)', marginTop:6 }}>
              <span>₹1,000</span><span>₹1,00,000</span>
            </div>
          </div>
        </div>
        <div>
          <div className="shop-header">
            <div>
              <h1 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', fontWeight:300 }}>
                Our <span style={{ color:'var(--gold)', fontStyle:'italic' }}>Collection</span>
              </h1>
              <div style={{ fontSize:13, color:'var(--gray-dark)' }}>{filtered.length} products found</div>
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)}
              style={{ border:'1px solid var(--gray-light)', padding:'8px 12px', fontSize:12, width:'auto', background:'white' }}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
          <div className="product-grid">
            {filtered.map(p => <ProductCard key={p.id} product={p} setPage={setPage} addToCart={addToCart} />)}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign:'center', padding:'80px 0', color:'var(--gray-mid)' }}>
              <div style={{ fontSize:60, marginBottom:16 }}>🔍</div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'1.5rem' }}>No products found</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

/* ════════════════════════════════════════
   CATEGORIES PAGE
════════════════════════════════════════ */
export const CategoriesPage = ({ setPage, addToCart }) => (
  <>
    <div style={{ background:'var(--black)', padding:'120px 32px 60px', textAlign:'center' }}>
      <div className="section-subtitle">Browse All</div>
      <h1 style={{ fontFamily:'var(--font-display)', fontSize:'3rem', fontWeight:300, color:'white' }}>
        Our <span style={{ color:'var(--gold)', fontStyle:'italic' }}>Collections</span>
      </h1>
      <div className="gold-divider" />
    </div>
    {CATEGORIES.map(cat => (
      <section key={cat.id} style={{ padding:'60px 32px', background: cat.id%2===0 ? 'var(--white-off)' : 'var(--white)' }}>
        <div style={{ maxWidth:1400, margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32, flexWrap:'wrap', gap:16 }}>
            <div>
              <div className="section-subtitle">{cat.count} Pieces</div>
              <h2 className="section-title">{cat.icon} {cat.name}</h2>
            </div>
            <button className="btn-outline" onClick={() => setPage('shop')}>View All {cat.name}</button>
          </div>
          <div className="product-grid">
            {PRODUCTS.filter(p => p.category===cat.name).slice(0,4).map(p => (
              <ProductCard key={p.id} product={p} setPage={setPage} addToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>
    ))}
    <Footer setPage={setPage} />
  </>
);

/* ════════════════════════════════════════
   PRODUCT DETAIL PAGE
════════════════════════════════════════ */
export const ProductDetailPage = ({ productId, setPage, addToCart }) => {
  const product = PRODUCTS.find(p => p.id === productId);
  const [qty,       setQty]       = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  if (!product) return <div style={{ padding:'120px 32px', textAlign:'center' }}>Product not found</div>;

  const savings = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <>
      <style>{`
        .pd-wrap { max-width:1400px;margin:0 auto;padding:120px 32px 80px;display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start; }
        .pd-gallery { position:sticky;top:92px; }
        .main-img { height:480px;background:linear-gradient(135deg,var(--white-off),var(--gray-light));border-radius:4px;border:1px solid var(--gray-light);display:flex;align-items:center;justify-content:center;font-size:120px;margin-bottom:16px;transition:var(--transition);overflow:hidden; }
        .thumbs { display:flex;gap:12px; }
        .thumb { width:80px;height:80px;background:var(--white-off);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:30px;cursor:pointer;border:2px solid transparent;transition:var(--transition);overflow:hidden; }
        .thumb.on,.thumb:hover { border-color:var(--gold);background:var(--gold-pale); }
        .wa-order-btn { background:#25D366;color:white;border:none;padding:14px 32px;font-family:var(--font-body);font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:var(--transition);border-radius:2px;display:flex;align-items:center;justify-content:center;gap:8px;width:100%; }
        .wa-order-btn:hover { background:#128C7E; }
        .qty-btn { width:36px;height:36px;border:1px solid var(--gray-light);background:white;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:var(--transition);border-radius:2px; }
        .qty-btn:hover { border-color:var(--gold);color:var(--gold); }
        @media(max-width:768px){ .pd-wrap{grid-template-columns:1fr;padding-top:100px;gap:32px;} .pd-gallery{position:static;} }
      `}</style>
      <div className="pd-wrap">
        <div className="pd-gallery">
          <div className="main-img">
            {typeof product.images[activeImg]==='string' && product.images[activeImg].startsWith('data:') ? (
              <img src={product.images[activeImg]} alt={product.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            ) : <span style={{ fontSize:120 }}>{product.images[activeImg]}</span>}
          </div>
          <div className="thumbs">
            {product.images.map((img,i) => (
              <div key={i} className={`thumb${i===activeImg?' on':''}`} onClick={() => setActiveImg(i)}>
                {typeof img==='string' && img.startsWith('data:')
                  ? <img src={img} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  : img}
              </div>
            ))}
          </div>
        </div>
        <div>
          <button onClick={() => setPage('shop')}
            style={{ background:'none', border:'none', cursor:'pointer', color:'var(--gold)', fontSize:13, marginBottom:20, padding:0, display:'flex', alignItems:'center', gap:6 }}>
            <Icon name="chevronLeft" size={14} color="var(--gold)" /> Back to Shop
          </button>
          <div className="section-subtitle">{product.category}</div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'2.5rem', fontWeight:300, lineHeight:1.2, marginBottom:16 }}>{product.name}</h1>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:24 }}>
            <div style={{ display:'flex', gap:2 }}>
              {[1,2,3,4,5].map(s => <Icon key={s} name="star" size={14} color={s<=product.rating?'var(--gold)':'var(--gray-light)'} />)}
            </div>
            <span style={{ fontWeight:600 }}>{product.rating}</span>
            <span style={{ color:'var(--gray-mid)', fontSize:13 }}>({product.reviews} reviews)</span>
            {product.stock < 5 && <span className="badge" style={{ background:'#fff3cd', color:'#856404' }}>Only {product.stock} left!</span>}
          </div>
          <div style={{ display:'flex', alignItems:'baseline', gap:12, marginBottom:8 }}>
            <span style={{ fontSize:'2rem', fontWeight:600 }}>₹{product.price.toLocaleString()}</span>
            <span style={{ fontSize:'1.1rem', color:'var(--gray-mid)', textDecoration:'line-through' }}>₹{product.originalPrice.toLocaleString()}</span>
            <span className="badge" style={{ background:'var(--gold-pale)', color:'var(--gold-dark)' }}>Save {savings}%</span>
          </div>
          <div style={{ fontSize:13, color:'var(--success)', fontWeight:600, marginBottom:16 }}>✓ Free shipping on this order</div>
          <div style={{ fontSize:14, color:'var(--gray-dark)', lineHeight:1.9, margin:'24px 0', padding:20, background:'var(--white-off)', borderLeft:'3px solid var(--gold)', borderRadius:2 }}>
            {product.description}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:24 }}>
            {[['Material',product.material],['Weight',product.weight],['Availability',`In Stock (${product.stock})`],['Certification','BIS Hallmarked']].map(([l,v]) => (
              <div key={l} style={{ padding:'12px 16px', background:'var(--white-off)', borderRadius:2 }}>
                <div style={{ fontSize:10, letterSpacing:1.5, textTransform:'uppercase', color:'var(--gray-mid)', marginBottom:4, fontWeight:600 }}>{l}</div>
                <div style={{ fontSize:13, fontWeight:600 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
            <span style={{ fontSize:12, letterSpacing:1.5, textTransform:'uppercase', fontWeight:600, color:'var(--gray-dark)' }}>Quantity:</span>
            <button className="qty-btn" onClick={() => setQty(q => Math.max(1,q-1))}><Icon name="minus" size={14}/></button>
            <span style={{ fontWeight:600, minWidth:24, textAlign:'center', fontSize:16 }}>{qty}</span>
            <button className="qty-btn" onClick={() => setQty(q => q+1)}><Icon name="plus" size={14}/></button>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            <button className="btn-primary" style={{ justifyContent:'center' }} onClick={() => { addToCart(product,qty); setPage('cart'); }}>Add to Cart</button>
            <button className="btn-dark"    style={{ justifyContent:'center' }} onClick={() => { addToCart(product,qty); setPage('checkout'); }}>Buy Now</button>
            <button className="wa-order-btn"
              onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=I want to order this product from JHA Jewellery: ${product.name}`, '_blank')}>
              <Icon name="whatsapp" size={16} color="white" /> Order on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

/* ════════════════════════════════════════
   CART PAGE
════════════════════════════════════════ */
export const CartPage = ({ cart, updateQty, removeItem, setPage }) => {
  const total   = cart.reduce((a,i) => a + i.price * i.qty, 0);
  const savings = cart.reduce((a,i) => a + (i.originalPrice - i.price) * i.qty, 0);

  return (
    <>
      <style>{`
        .cart-wrap { max-width:1200px;margin:0 auto;padding:120px 32px 80px;display:grid;grid-template-columns:1fr 360px;gap:32px;align-items:start; }
        .cart-item { display:flex;gap:20px;padding:24px;border-bottom:1px solid var(--gray-light);align-items:center; }
        .ci-img { width:90px;height:90px;background:var(--white-off);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:40px;flex-shrink:0; }
        .summary-box { background:var(--white-off);border:1px solid var(--gray-light);border-radius:4px;padding:28px;position:sticky;top:92px; }
        @media(max-width:768px){ .cart-wrap{grid-template-columns:1fr;padding-top:100px;} }
      `}</style>
      <div className="cart-wrap">
        <div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', fontWeight:300, marginBottom:8 }}>
            Shopping <span style={{ color:'var(--gold)', fontStyle:'italic' }}>Cart</span>
          </h1>
          <p style={{ color:'var(--gray-dark)', fontSize:13, marginBottom:24 }}>{cart.length} item{cart.length!==1?'s':''} in your cart</p>

          {cart.length === 0 ? (
            <div style={{ textAlign:'center', padding:'80px 0', color:'var(--gray-mid)' }}>
              <div style={{ fontSize:60, marginBottom:16 }}>🛒</div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'1.5rem', marginBottom:16 }}>Your cart is empty</div>
              <button className="btn-primary" onClick={() => setPage('shop')}>Start Shopping</button>
            </div>
          ) : (
            <div style={{ background:'white', border:'1px solid var(--gray-light)', borderRadius:4 }}>
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="ci-img">
                    {typeof item.image==='string' && item.image.startsWith('data:')
                      ? <img src={item.image} alt={item.name} style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:4 }} />
                      : item.image}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:10, letterSpacing:2, textTransform:'uppercase', color:'var(--gold)', fontWeight:600 }}>{item.category}</div>
                    <div style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:400, marginBottom:4 }}>{item.name}</div>
                    <div style={{ fontSize:16, fontWeight:600 }}>₹{item.price.toLocaleString()}</div>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:8 }}>
                      <button style={{ width:28, height:28, border:'1px solid var(--gray-light)', background:'white', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', borderRadius:2 }}
                        onClick={() => updateQty(item.id, item.qty-1)}><Icon name="minus" size={12}/></button>
                      <span style={{ fontWeight:600, minWidth:24, textAlign:'center' }}>{item.qty}</span>
                      <button style={{ width:28, height:28, border:'1px solid var(--gray-light)', background:'white', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', borderRadius:2 }}
                        onClick={() => updateQty(item.id, item.qty+1)}><Icon name="plus" size={12}/></button>
                    </div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontWeight:700, marginBottom:8 }}>₹{(item.price*item.qty).toLocaleString()}</div>
                    <button style={{ background:'none', border:'none', cursor:'pointer', color:'var(--gray-mid)' }}
                      onClick={() => removeItem(item.id)}><Icon name="trash" size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="summary-box">
            <div style={{ fontFamily:'var(--font-display)', fontSize:22, marginBottom:24 }}>Order Summary</div>
            <div style={{ display:'flex', gap:8, marginBottom:16 }}>
              <input placeholder="Coupon code" />
              <button className="btn-primary" style={{ padding:'10px 16px', fontSize:'10px', whiteSpace:'nowrap' }}>Apply</button>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'var(--gray-dark)', marginBottom:8 }}><span>Subtotal</span><span>₹{total.toLocaleString()}</span></div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'var(--success)', marginBottom:8 }}><span>Savings</span><span>-₹{savings.toLocaleString()}</span></div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'var(--success)', marginBottom:8 }}><span>Shipping</span><span>Free</span></div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:18, fontWeight:700, paddingTop:16, borderTop:'2px solid var(--gold)', marginTop:8 }}><span>Total</span><span>₹{total.toLocaleString()}</span></div>
            <div style={{ fontSize:11, color:'var(--gray-dark)', marginBottom:20, lineHeight:1.6, marginTop:8 }}>GST and shipping calculated at checkout</div>
            <button className="btn-primary" style={{ width:'100%', justifyContent:'center' }} onClick={() => setPage('checkout')}>Proceed to Checkout →</button>
            <button className="btn-outline" style={{ width:'100%', justifyContent:'center', marginTop:10 }} onClick={() => setPage('shop')}>Continue Shopping</button>
          </div>
        )}
      </div>
    </>
  );
};

/* ════════════════════════════════════════
   CHECKOUT PAGE
════════════════════════════════════════ */
export const CheckoutPage = ({ cart, setPage }) => {
  const [pay,         setPay]         = useState('upi');
  const [placed,      setPlaced]      = useState(false);
  const [form,        setForm]        = useState({ name:'', phone:'', address:'', city:'', pincode:'' });
  const total = cart.reduce((a,i) => a + i.price*i.qty, 0);

  if (placed) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--white-off)', paddingTop:72 }}>
      <div style={{ background:'white', padding:60, borderRadius:8, textAlign:'center', maxWidth:480, border:'1px solid var(--gray-light)', boxShadow:'var(--shadow-lg)' }}>
        <div style={{ fontSize:72, marginBottom:24 }}>🎉</div>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', marginBottom:12 }}>
          Order <span style={{ color:'var(--gold)', fontStyle:'italic' }}>Confirmed!</span>
        </h2>
        <p style={{ color:'var(--gray-dark)', lineHeight:1.8, marginBottom:8 }}>Thank you for shopping with <strong>JHA Jewellery</strong>.</p>
        <p style={{ color:'var(--gray-dark)', lineHeight:1.8, marginBottom:32 }}>
          Your order <strong>#JHA-{Math.floor(Math.random()*9000+1000)}</strong> has been placed successfully.
        </p>
        <button className="btn-primary" style={{ width:'100%', justifyContent:'center' }} onClick={() => setPage('home')}>Back to Home</button>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        .co-wrap { max-width:1100px;margin:0 auto;padding:120px 32px 80px;display:grid;grid-template-columns:1fr 380px;gap:32px;align-items:start; }
        .co-section { background:white;border:1px solid var(--gray-light);border-radius:4px;padding:28px;margin-bottom:20px; }
        .co-title { font-family:var(--font-display);font-size:20px;margin-bottom:20px; }
        .pay-opt { border:2px solid var(--gray-light);border-radius:4px;padding:16px 20px;cursor:pointer;transition:var(--transition);display:flex;align-items:center;gap:12px;margin-bottom:10px; }
        .pay-opt.on { border-color:var(--gold);background:var(--gold-pale); }
        @media(max-width:768px){ .co-wrap{grid-template-columns:1fr;padding-top:100px;} }
      `}</style>
      <div className="co-wrap">
        <div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', fontWeight:300, marginBottom:32 }}>Checkout</h1>
          <div className="co-section">
            <div className="co-title">📦 Delivery Information</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
              <div><label>Full Name</label><input placeholder="Priya Sharma" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
              <div><label>Phone</label><input placeholder="+91 79822 72872" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} /></div>
            </div>
            <div style={{ marginBottom:16 }}><label>Address</label><textarea rows={2} placeholder="House No., Street, Area" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} /></div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              <div><label>City</label><input placeholder="Noida" value={form.city} onChange={e=>setForm({...form,city:e.target.value})} /></div>
              <div><label>Pincode</label><input placeholder="201301" value={form.pincode} onChange={e=>setForm({...form,pincode:e.target.value})} /></div>
            </div>
          </div>
          <div className="co-section">
            <div className="co-title">💳 Payment Method</div>
            {[{id:'upi',icon:'📱',label:'UPI Payment',desc:'GPay, PhonePe, Paytm'},{id:'card',icon:'💳',label:'Credit / Debit Card',desc:'Visa, Mastercard, RuPay'},{id:'cod',icon:'💵',label:'Cash on Delivery',desc:'Pay when you receive'}].map(opt => (
              <div key={opt.id} className={`pay-opt${pay===opt.id?' on':''}`} onClick={() => setPay(opt.id)}>
                <span style={{ fontSize:24 }}>{opt.icon}</span>
                <div><div style={{ fontSize:13, fontWeight:600 }}>{opt.label}</div><div style={{ fontSize:11, color:'var(--gray-dark)' }}>{opt.desc}</div></div>
                <div style={{ marginLeft:'auto', width:18, height:18, borderRadius:'50%', border:`2px solid ${pay===opt.id?'var(--gold)':'var(--gray-light)'}`, background:pay===opt.id?'var(--gold)':'transparent', transition:'var(--transition)' }} />
              </div>
            ))}
            {pay==='card' && (
              <div style={{ marginTop:20, padding:20, background:'var(--white-off)', borderRadius:4 }}>
                <div style={{ marginBottom:16 }}><label>Card Number</label><input placeholder="1234 5678 9012 3456" /></div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                  <div><label>Expiry</label><input placeholder="MM/YY" /></div>
                  <div><label>CVV</label><input placeholder="•••" type="password" /></div>
                </div>
              </div>
            )}
            {pay==='upi' && (
              <div style={{ marginTop:20, padding:20, background:'var(--white-off)', borderRadius:4 }}>
                <label>UPI ID</label><input placeholder="yourname@upi" />
              </div>
            )}
          </div>
        </div>
        <div style={{ position:'sticky', top:92 }}>
          <div className="co-section">
            <div className="co-title">🛒 Order Summary</div>
            {cart.map(item => (
              <div key={item.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderBottom:'1px solid var(--gray-light)', fontSize:13 }}>
                <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                  <span style={{ fontSize:20 }}>{typeof item.image==='string'&&item.image.startsWith('data:') ? '🖼' : item.image}</span>
                  <div><div style={{ fontWeight:600 }}>{item.name}</div><div style={{ color:'var(--gray-dark)' }}>Qty: {item.qty}</div></div>
                </div>
                <div style={{ fontWeight:600 }}>₹{(item.price*item.qty).toLocaleString()}</div>
              </div>
            ))}
            <div style={{ paddingTop:16 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'var(--gray-dark)', marginBottom:8 }}><span>Subtotal</span><span>₹{total.toLocaleString()}</span></div>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'var(--success)', marginBottom:8 }}><span>Shipping</span><span>Free</span></div>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:18, fontWeight:700, paddingTop:12, borderTop:'2px solid var(--gold)' }}><span>Total</span><span>₹{total.toLocaleString()}</span></div>
            </div>
            <button className="btn-primary" style={{ width:'100%', justifyContent:'center', marginTop:20 }} onClick={() => setPlaced(true)}>
              Place Order · ₹{total.toLocaleString()}
            </button>
            <div style={{ textAlign:'center', marginTop:12, fontSize:11, color:'var(--gray-mid)' }}>🔒 Secured by SSL · 100% Safe Checkout</div>
          </div>
        </div>
      </div>
    </>
  );
};

/* ════════════════════════════════════════
   LOGIN PAGE
════════════════════════════════════════ */
export const LoginPage = ({ setPage, setIsLoggedIn }) => {
  const [mode,     setMode]     = useState('login');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => { setIsLoggedIn(true); setPage('home'); };

  return (
    <>
      <style>{`
        .login-bg { min-height:100vh;display:grid;grid-template-columns:1fr 1fr;background:var(--white); }
        .login-visual { background:var(--black);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden; }
        .login-visual::before { content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(201,168,76,.1) 0%,transparent 70%); }
        .login-logo { font-family:var(--font-display);font-size:32px;font-weight:600;color:var(--gold);margin-bottom:8px; }
        .login-logo span { color:white;font-weight:300; }
        .login-form-side { display:flex;align-items:center;justify-content:center;padding:48px; }
        .login-tabs { display:flex;gap:0;margin-bottom:28px;border:1px solid var(--gray-light);border-radius:4px;overflow:hidden; }
        .login-tab { flex:1;padding:12px;text-align:center;cursor:pointer;font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;background:white;border:none;transition:var(--transition);color:var(--gray-dark); }
        .login-tab.on { background:var(--gold);color:var(--black); }
        @media(max-width:768px){ .login-bg{grid-template-columns:1fr;} .login-visual{display:none;} }
      `}</style>
      <div className="login-bg">
        <div className="login-visual">
          <div style={{ position:'relative', zIndex:1, textAlign:'center', padding:48 }}>
            <div className="login-logo">JHA <span>Jewellery</span></div>
            <div style={{ fontSize:13, color:'rgba(255,255,255,.5)', letterSpacing:2, textTransform:'uppercase', marginBottom:48 }}>Where Tradition Meets Elegance</div>
            <div style={{ fontSize:120, animation:'float 6s ease-in-out infinite' }}>💍</div>
            <div style={{ marginTop:40, padding:24, border:'1px solid rgba(201,168,76,.2)', borderRadius:4, color:'rgba(255,255,255,.6)', fontSize:13, lineHeight:1.8 }}>
              "Crafting timeless pieces with certified gold and ethically sourced gemstones since 2010."
            </div>
          </div>
        </div>
        <div className="login-form-side">
          <div style={{ width:'100%', maxWidth:420 }}>
            <div style={{ marginBottom:32 }}>
              <button onClick={() => setPage('home')} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--gold)', fontSize:13, padding:0, display:'flex', alignItems:'center', gap:6, marginBottom:24 }}>
                <Icon name="chevronLeft" size={14} color="var(--gold)"/> Back to Home
              </button>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'2.2rem', fontWeight:300, marginBottom:8 }}>
                Welcome to <span style={{ color:'var(--gold)', fontStyle:'italic' }}>JHA</span>
              </div>
              <div style={{ color:'var(--gray-dark)', fontSize:13 }}>Sign in to access exclusive offers and track your orders.</div>
            </div>
            <div className="login-tabs">
              <button className={`login-tab${mode==='login'?' on':''}`} onClick={() => setMode('login')}>Sign In</button>
              <button className={`login-tab${mode==='signup'?' on':''}`} onClick={() => setMode('signup')}>Sign Up</button>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              {mode==='signup' && <div><label>Full Name</label><input placeholder="Priya Sharma" /></div>}
              <div><label>Email Address</label><input type="email" placeholder="hello@email.com" value={email} onChange={e=>setEmail(e.target.value)} /></div>
              <div><label>Password</label><input type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} /></div>
              {mode==='signup' && <div><label>Confirm Password</label><input type="password" placeholder="••••••••" /></div>}
              {mode==='login' && <div style={{ textAlign:'right' }}><button style={{ background:'none', border:'none', cursor:'pointer', color:'var(--gold)', fontSize:12 }}>Forgot password?</button></div>}
              <button className="btn-primary" style={{ justifyContent:'center', padding:16 }} onClick={handleSubmit}>
                {mode==='login' ? 'Sign In to JHA' : 'Create Account'}
              </button>
            </div>
            <div style={{ position:'relative', textAlign:'center', margin:'24px 0' }}>
              <hr style={{ border:'none', borderTop:'1px solid var(--gray-light)' }} />
              <span style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', background:'white', padding:'0 12px', fontSize:11, color:'var(--gray-mid)', letterSpacing:1 }}>OR</span>
            </div>
            <button style={{ width:'100%', padding:14, border:'1px solid var(--gray-light)', background:'white', borderRadius:2, cursor:'pointer', fontSize:12, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', gap:10 }} onClick={handleSubmit}>
              🔍 Continue with Google
            </button>
            <div style={{ textAlign:'center', marginTop:24, fontSize:12, color:'var(--gray-dark)' }}>
              {mode==='login' ? "Don't have an account? " : 'Already have an account? '}
              <button style={{ background:'none', border:'none', cursor:'pointer', color:'var(--gold)', fontWeight:600 }} onClick={() => setMode(mode==='login'?'signup':'login')}>
                {mode==='login'?'Sign Up':'Sign In'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
