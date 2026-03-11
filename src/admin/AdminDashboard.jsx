import { useState } from 'react';
import Icon from '../components/Icon';
import ImageUploader from '../components/ImageUploader';
import { PRODUCTS as INIT_PRODUCTS, CATEGORIES as INIT_CATS, ORDERS, CUSTOMERS, COUPONS, STATUS_COLORS } from '../data/index';

const AdminDashboard = ({ setPage, setIsLoggedIn }) => {
  const [tab,            setTab]            = useState('dashboard');
  const [sidebarOpen,    setSidebarOpen]    = useState(true);
  const [products,       setProducts]       = useState(INIT_PRODUCTS);
  const [categories,     setCategories]     = useState(INIT_CATS);
  const [orders,         setOrders]         = useState(ORDERS);
  const [coupons,        setCoupons]        = useState(COUPONS);
  const [showAdd,        setShowAdd]        = useState(false);
  const [aiLoading,      setAiLoading]      = useState(false);
  const [newProd,        setNewProd]        = useState({ name:'', price:'', category:'Rings', stock:'', description:'', seoTitle:'', metaDesc:'', keywords:'' });
  const [editProd,       setEditProd]       = useState(null);
  const [uploadImgs,     setUploadImgs]     = useState([]);
  const [editImgs,       setEditImgs]       = useState([]);

  const revenue = ORDERS.filter(o=>o.status==='Delivered').reduce((s,o)=>s+o.amount,0);

  const navItems = [
    { id:'dashboard', icon:'grid',     label:'Dashboard' },
    { id:'products',  icon:'box',      label:'Products'  },
    { id:'categories',icon:'tag',      label:'Categories'},
    { id:'orders',    icon:'package',  label:'Orders'    },
    { id:'customers', icon:'users',    label:'Customers' },
    { id:'coupons',   icon:'percent',  label:'Coupons'   },
    { id:'inventory', icon:'trending', label:'Inventory' },
    { id:'settings',  icon:'settings', label:'Settings'  },
  ];

  const generateAI = async () => {
    if (!newProd.name && !newProd.category) { alert('Pehle Product Name aur Category fill karo!'); return; }
    setAiLoading(true);
    try {
      const prompt = `You are a professional product copywriter and SEO expert for "JHA Jewellery", a premium Indian jewellery brand.
Generate compelling product content for:
- Product Name: ${newProd.name || 'Gold Ring'}
- Category: ${newProd.category || 'Rings'}
- Price: ₹${newProd.price || '15000'}
Return ONLY valid JSON (no markdown) with keys: description, seoTitle, metaDesc, keywords`;

      const res  = await fetch('https://api.anthropic.com/v1/messages', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:1000, messages:[{ role:'user', content:prompt }] })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || '';
      const parsed = JSON.parse(text.replace(/```json|```/g,'').trim());
      setNewProd(p => ({ ...p, ...parsed }));
    } catch {
      setNewProd(p => ({
        ...p,
        description: `Exquisitely crafted ${p.name||'jewellery'} from JHA Jewellery's premium collection. Made with certified gold and ethically sourced gemstones, this piece is perfect for gifting or personal wear.`,
        seoTitle:    `Buy ${p.name||'Premium Jewellery'} Online | JHA Jewellery`,
        metaDesc:    `Shop ${p.name||'premium jewellery'} at JHA Jewellery. BIS hallmarked, certified gold, handcrafted. Free shipping & easy returns!`,
        keywords:    `${p.name||'jewellery'}, gold jewellery, JHA jewellery, ${p.category?.toLowerCase()||'rings'}, buy jewellery online, hallmarked gold`,
      }));
    } finally { setAiLoading(false); }
  };

  return (
    <>
      <style>{`
        .aw { display:flex;min-height:100vh;background:#F8F9FA;font-family:var(--font-body); }
        .asb { width:${sidebarOpen?'250px':'70px'};background:var(--black);border-right:1px solid rgba(201,168,76,.15);display:flex;flex-direction:column;position:fixed;left:0;top:0;bottom:0;z-index:100;transition:width .3s ease;overflow:hidden; }
        .asb-logo { padding:${sidebarOpen?'24px 20px':'24px 16px'};border-bottom:1px solid rgba(201,168,76,.1);font-family:var(--font-display);font-size:${sidebarOpen?'18px':'12px'};color:var(--gold);font-weight:600;white-space:nowrap;overflow:hidden;display:flex;align-items:center;gap:10px; }
        .asb-nav { flex:1;padding:12px 8px;overflow-y:auto; }
        .asb-item { display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:4px;cursor:pointer;transition:var(--transition);color:rgba(255,255,255,.55);font-size:13px;font-weight:500;border:none;background:none;width:100%;text-align:left;white-space:nowrap; }
        .asb-item:hover { color:var(--gold);background:rgba(201,168,76,.08); }
        .asb-item.on { color:var(--gold);background:rgba(201,168,76,.12);font-weight:600; }
        .amain { flex:1;margin-left:${sidebarOpen?'250px':'70px'};transition:margin-left .3s ease;min-height:100vh;display:flex;flex-direction:column; }
        .atop { background:white;border-bottom:1px solid #E5E7EB;padding:0 28px;height:64px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:50; }
        .acontent { padding:28px;flex:1; }
        .stat-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:28px; }
        .stat-card { background:white;border-radius:8px;padding:24px;border:1px solid #E5E7EB;position:relative;overflow:hidden;transition:var(--transition); }
        .stat-card:hover { transform:translateY(-2px);box-shadow:var(--shadow-md); }
        .stat-card::after { content:'';position:absolute;top:0;left:0;width:4px;height:100%;background:var(--gold); }
        .acard { background:white;border-radius:8px;border:1px solid #E5E7EB;overflow:hidden; }
        .acard-hd { padding:20px 24px;border-bottom:1px solid #F3F4F6;display:flex;justify-content:space-between;align-items:center; }
        .atable { width:100%;border-collapse:collapse; }
        .atable th { background:#F9FAFB;padding:12px 16px;text-align:left;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#6B7280;border-bottom:1px solid #E5E7EB; }
        .atable td { padding:14px 16px;border-bottom:1px solid #F3F4F6;font-size:13px;color:var(--charcoal); }
        .atable tr:hover td { background:#FAFAFA; }
        .sbadge { padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;display:inline-block; }
        .abtn { padding:6px 12px;border-radius:4px;border:none;cursor:pointer;font-size:11px;font-weight:600;transition:var(--transition); }
        .abtn-e { background:#EFF6FF;color:#2563EB; } .abtn-e:hover { background:#DBEAFE; }
        .abtn-d { background:#FEF2F2;color:#DC2626; } .abtn-d:hover { background:#FEE2E2; }
        .modal-ov { position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px; }
        .modal-box { background:white;border-radius:12px;padding:32px;width:100%;max-width:640px;max-height:90vh;overflow-y:auto;animation:fadeIn .2s ease; }
        .ai-banner { background:linear-gradient(135deg,#1e1b4b,#312e81,#4c1d95);border-radius:10px;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;border:1px solid rgba(139,92,246,.3);box-shadow:0 4px 20px rgba(99,102,241,.2); }
        .ai-gen-btn { background:linear-gradient(135deg,#7c3aed,#6d28d9);color:white;border:none;padding:10px 22px;border-radius:8px;cursor:pointer;font-size:12px;font-weight:600;display:flex;align-items:center;gap:8px;transition:var(--transition);box-shadow:0 4px 14px rgba(109,40,217,.5); }
        .ai-gen-btn:disabled { opacity:.7;cursor:not-allowed;box-shadow:none; }
        .ai-gen-btn:hover:not(:disabled) { transform:scale(1.05); }
        .seo-box { background:linear-gradient(135deg,#f0fdf4,#ecfdf5);border:1px solid #86efac;border-radius:10px;padding:20px;margin-bottom:16px;position:relative;overflow:hidden; }
        .seo-tag { position:absolute;top:0;right:0;background:linear-gradient(135deg,#16a34a,#15803d);color:white;font-size:10px;font-weight:700;padding:4px 14px;border-bottom-left-radius:8px;letter-spacing:1px; }
        .drop-z { border:2px dashed var(--gray-light);border-radius:10px;padding:32px;text-align:center;cursor:pointer;transition:all .2s;background:var(--white-off); }
        .drop-z:hover { border-color:var(--gold);background:var(--gold-pale); }
        @media(max-width:1024px){ .stat-grid{grid-template-columns:repeat(2,1fr);} }
        @media(max-width:640px){ .asb{width:0;} .amain{margin-left:0;} .stat-grid{grid-template-columns:1fr;} }
      `}</style>

      <div className="aw">
        {/* Sidebar */}
        <div className="asb">
          <div className="asb-logo"><span>👑</span>{sidebarOpen && 'JHA Admin'}</div>
          <div className="asb-nav">
            {navItems.map(n => (
              <button key={n.id} className={`asb-item${tab===n.id?' on':''}`} onClick={() => setTab(n.id)}>
                <Icon name={n.icon} size={18} color="currentColor" />
                {sidebarOpen && n.label}
              </button>
            ))}
          </div>
          <div style={{ padding:'16px 8px', borderTop:'1px solid rgba(201,168,76,.1)' }}>
            <button className="asb-item" onClick={() => setPage('home')}><Icon name="home" size={18}/>{sidebarOpen&&'View Store'}</button>
            <button className="asb-item" onClick={() => { setIsLoggedIn(false); setPage('home'); }}><Icon name="logout" size={18}/>{sidebarOpen&&'Logout'}</button>
          </div>
        </div>

        {/* Main */}
        <div className="amain">
          <div className="atop">
            <div style={{ display:'flex', alignItems:'center', gap:16 }}>
              <button style={{ background:'none', border:'none', cursor:'pointer', padding:8 }} onClick={() => setSidebarOpen(v=>!v)}><Icon name="menu" size={20}/></button>
              <div style={{ fontFamily:'var(--font-display)', fontSize:22 }}>{navItems.find(n=>n.id===tab)?.label}</div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <span style={{ fontSize:12, color:'#6B7280' }}>Welcome, Admin</span>
              <div style={{ width:36, height:36, borderRadius:'50%', background:'var(--gold)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:700, color:'var(--black)' }}>A</div>
            </div>
          </div>

          <div className="acontent">

            {/* ── DASHBOARD ── */}
            {tab==='dashboard' && (
              <div className="fade-in">
                <div className="stat-grid">
                  {[
                    { label:'Total Products', value:products.length,                      icon:'📦', change:'+12 this month' },
                    { label:'Total Orders',   value:ORDERS.length,                        icon:'🛒', change:'+8 this week'   },
                    { label:'Customers',      value:CUSTOMERS.length,                     icon:'👥', change:'+3 today'       },
                    { label:'Revenue',        value:`₹${(revenue/1000).toFixed(0)}K`,     icon:'💰', change:'+18% this month'},
                  ].map((s,i) => (
                    <div key={i} className="stat-card">
                      <div style={{ fontSize:'2rem', fontWeight:700, marginBottom:4 }}>{s.value}</div>
                      <div style={{ fontSize:12, color:'#6B7280', fontWeight:500 }}>{s.label}</div>
                      <div style={{ fontSize:11, color:'var(--success)', fontWeight:600, marginTop:8 }}>↑ {s.change}</div>
                      <div style={{ position:'absolute', right:20, top:'50%', transform:'translateY(-50%)', fontSize:36, opacity:.1 }}>{s.icon}</div>
                    </div>
                  ))}
                </div>
                <div className="acard">
                  <div className="acard-hd"><div style={{ fontSize:15, fontWeight:600 }}>Recent Orders</div><button className="btn-primary" style={{ padding:'8px 16px', fontSize:'10px' }} onClick={()=>setTab('orders')}>View All</button></div>
                  <div style={{ overflowX:'auto' }}>
                    <table className="atable">
                      <thead><tr><th>Order ID</th><th>Customer</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
                      <tbody>
                        {ORDERS.slice(0,5).map(o=>(
                          <tr key={o.id}>
                            <td style={{ fontWeight:700, color:'var(--gold)' }}>{o.id}</td>
                            <td>{o.customer}</td>
                            <td style={{ fontWeight:600 }}>₹{o.amount.toLocaleString()}</td>
                            <td><span className="sbadge" style={{ background:`${STATUS_COLORS[o.status]}20`, color:STATUS_COLORS[o.status] }}>{o.status}</span></td>
                            <td style={{ color:'#6B7280' }}>{o.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── PRODUCTS ── */}
            {tab==='products' && (
              <div className="fade-in">
                <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:20 }}>
                  <button className="btn-primary" onClick={()=>setShowAdd(true)}>+ Add Product</button>
                </div>
                <div className="acard">
                  <div style={{ overflowX:'auto' }}>
                    <table className="atable">
                      <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Rating</th><th>Actions</th></tr></thead>
                      <tbody>
                        {products.map(p=>(
                          <tr key={p.id}>
                            <td>
                              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                                {typeof p.image==='string'&&p.image.startsWith('data:')
                                  ? <img src={p.image} alt={p.name} style={{ width:44, height:44, objectFit:'cover', borderRadius:6, border:'1px solid var(--gray-light)' }} />
                                  : <span style={{ fontSize:28, width:44, height:44, display:'flex', alignItems:'center', justifyContent:'center', background:'var(--white-off)', borderRadius:6 }}>{p.image}</span>
                                }
                                <div><div style={{ fontWeight:600 }}>{p.name}</div><div style={{ fontSize:11, color:'#6B7280' }}>{p.tag}</div></div>
                              </div>
                            </td>
                            <td><span className="badge">{p.category}</span></td>
                            <td style={{ fontWeight:600 }}>₹{p.price.toLocaleString()}</td>
                            <td style={{ fontWeight:700, color:p.stock<5?'#DC2626':'#16A34A' }}>{p.stock}</td>
                            <td>⭐ {p.rating}</td>
                            <td>
                              <div style={{ display:'flex', gap:6 }}>
                                <button className="abtn abtn-e" onClick={()=>{ setEditProd(p); setEditImgs([]); }}>Edit</button>
                                <button className="abtn abtn-d" onClick={()=>setProducts(ps=>ps.filter(x=>x.id!==p.id))}>Delete</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Add Modal */}
                {showAdd && (
                  <div className="modal-ov" onClick={e=>{if(e.target===e.currentTarget){setShowAdd(false);setUploadImgs([]);}}}>
                    <div className="modal-box">
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:20 }}>
                        <div style={{ fontFamily:'var(--font-display)', fontSize:'1.6rem' }}>Add New Product</div>
                        <button style={{ background:'none', border:'none', cursor:'pointer' }} onClick={()=>{setShowAdd(false);setUploadImgs([]);}}><Icon name="x" size={20}/></button>
                      </div>
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
                        <div><label>Product Name</label><input value={newProd.name} onChange={e=>setNewProd({...newProd,name:e.target.value})} placeholder="e.g. Diamond Ring" /></div>
                        <div><label>Price (₹)</label><input type="number" value={newProd.price} onChange={e=>setNewProd({...newProd,price:e.target.value})} placeholder="45000" /></div>
                        <div><label>Category</label>
                          <select value={newProd.category} onChange={e=>setNewProd({...newProd,category:e.target.value})}>
                            {INIT_CATS.map(c=><option key={c.id}>{c.name}</option>)}
                          </select>
                        </div>
                        <div><label>Stock</label><input type="number" value={newProd.stock} onChange={e=>setNewProd({...newProd,stock:e.target.value})} placeholder="10" /></div>
                      </div>

                      {/* AI Banner */}
                      <div className="ai-banner" style={{ marginBottom:16 }}>
                        <div>
                          <div style={{ color:'white', fontWeight:700, fontSize:13, display:'flex', alignItems:'center', gap:8 }}><span style={{ fontSize:18 }}>🤖</span> AI Content Generator</div>
                          <div style={{ color:'rgba(196,181,253,.8)', fontSize:11, marginTop:3 }}>Product Name + Category fill karo, phir click karo</div>
                        </div>
                        <button className="ai-gen-btn" onClick={generateAI} disabled={aiLoading}
                          style={{ background: aiLoading?'rgba(139,92,246,.4)':'linear-gradient(135deg,#7c3aed,#6d28d9)', boxShadow:aiLoading?'none':undefined }}>
                          {aiLoading ? (
                            <><span style={{ display:'inline-block', width:14, height:14, border:'2px solid rgba(255,255,255,.3)', borderTopColor:'white', borderRadius:'50%', animation:'spin .7s linear infinite' }}/> AI Likh Raha Hai...</>
                          ) : <><Icon name="ai" size={14} color="white"/> ✨ Generate AI Content</>}
                        </button>
                      </div>

                      <div style={{ marginBottom:16 }}>
                        <label>Description</label>
                        <textarea rows={3} value={newProd.description} onChange={e=>setNewProd({...newProd,description:e.target.value})} placeholder="Product description likhein ya AI se generate karein…"
                          style={{ borderColor: newProd.seoTitle?'#7c3aed':undefined, background: newProd.seoTitle?'#faf5ff':undefined }} />
                      </div>

                      {newProd.seoTitle && (
                        <div className="seo-box">
                          <div className="seo-tag">✨ AI GENERATED</div>
                          <div style={{ fontSize:13, fontWeight:700, color:'#15803d', marginBottom:16, display:'flex', alignItems:'center', gap:8 }}>🎯 SEO Content Ready</div>
                          <div style={{ marginBottom:12 }}>
                            <label style={{ color:'#166534' }}>SEO Title</label>
                            <input value={newProd.seoTitle} onChange={e=>setNewProd({...newProd,seoTitle:e.target.value})} style={{ borderColor:'#86efac', background:'white' }} />
                            <div style={{ fontSize:10, color:newProd.seoTitle.length>60?'#dc2626':'#16a34a', textAlign:'right', marginTop:4 }}>{newProd.seoTitle.length}/60</div>
                          </div>
                          <div style={{ marginBottom:12 }}>
                            <label style={{ color:'#166534' }}>Meta Description</label>
                            <textarea rows={2} value={newProd.metaDesc} onChange={e=>setNewProd({...newProd,metaDesc:e.target.value})} style={{ borderColor:'#86efac', background:'white' }} />
                            <div style={{ fontSize:10, color:newProd.metaDesc.length>160?'#dc2626':'#16a34a', textAlign:'right', marginTop:4 }}>{newProd.metaDesc.length}/160</div>
                          </div>
                          <div>
                            <label style={{ color:'#166534' }}>Keywords</label>
                            <input value={newProd.keywords} onChange={e=>setNewProd({...newProd,keywords:e.target.value})} style={{ borderColor:'#86efac', background:'white' }} />
                            <div style={{ marginTop:8, display:'flex', flexWrap:'wrap', gap:6 }}>
                              {newProd.keywords.split(',').filter(k=>k.trim()).map((kw,i)=>(
                                <span key={i} style={{ background:'#dcfce7', color:'#166534', fontSize:10, fontWeight:600, padding:'3px 10px', borderRadius:20, border:'1px solid #86efac' }}>{kw.trim()}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      <div style={{ marginBottom:20 }}>
                        <label>Product Images <span style={{ color:'var(--gray-mid)', fontWeight:400, textTransform:'none', letterSpacing:0 }}>(up to 5)</span></label>
                        <ImageUploader images={uploadImgs} setImages={setUploadImgs} maxImages={5} />
                      </div>

                      <div style={{ display:'flex', gap:12 }}>
                        <button className="btn-primary" style={{ flex:1, justifyContent:'center' }} onClick={()=>{
                          if(newProd.name&&newProd.price){
                            const img  = uploadImgs.length>0 ? uploadImgs[0].url : '✨';
                            const imgs = uploadImgs.length>0 ? uploadImgs.map(i=>i.url) : ['✨','💫','🌟'];
                            setProducts(ps=>[...ps,{ id:Date.now(), name:newProd.name, price:+newProd.price, originalPrice:Math.round(+newProd.price*1.2), category:newProd.category, stock:+newProd.stock||10, image:img, tag:'New', description:newProd.description, material:'18K Gold', weight:'5g', rating:4.5, reviews:0, images:imgs }]);
                            setShowAdd(false); setUploadImgs([]);
                            setNewProd({name:'',price:'',category:'Rings',stock:'',description:'',seoTitle:'',metaDesc:'',keywords:''});
                          }
                        }}>Add Product</button>
                        <button className="btn-outline" onClick={()=>{setShowAdd(false);setUploadImgs([]);}}>Cancel</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Edit Modal */}
                {editProd && (
                  <div className="modal-ov" onClick={e=>{if(e.target===e.currentTarget)setEditProd(null);}}>
                    <div className="modal-box">
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:20 }}>
                        <div style={{ fontFamily:'var(--font-display)', fontSize:'1.6rem' }}>Edit Product</div>
                        <button style={{ background:'none', border:'none', cursor:'pointer' }} onClick={()=>setEditProd(null)}><Icon name="x" size={20}/></button>
                      </div>
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
                        <div><label>Product Name</label><input defaultValue={editProd.name} onChange={e=>setEditProd({...editProd,name:e.target.value})} /></div>
                        <div><label>Price (₹)</label><input type="number" defaultValue={editProd.price} onChange={e=>setEditProd({...editProd,price:+e.target.value})} /></div>
                        <div><label>Category</label>
                          <select defaultValue={editProd.category} onChange={e=>setEditProd({...editProd,category:e.target.value})}>
                            {INIT_CATS.map(c=><option key={c.id}>{c.name}</option>)}
                          </select>
                        </div>
                        <div><label>Stock</label><input type="number" defaultValue={editProd.stock} onChange={e=>setEditProd({...editProd,stock:+e.target.value})} /></div>
                      </div>
                      <div style={{ marginBottom:16 }}><label>Description</label><textarea rows={3} defaultValue={editProd.description} onChange={e=>setEditProd({...editProd,description:e.target.value})} /></div>
                      <div style={{ marginBottom:20 }}>
                        <label>Product Images</label>
                        <ImageUploader images={editImgs} setImages={setEditImgs} maxImages={5} />
                      </div>
                      <div style={{ display:'flex', gap:12 }}>
                        <button className="btn-primary" style={{ flex:1, justifyContent:'center' }} onClick={()=>{
                          const u={...editProd};
                          if(editImgs.length>0){u.image=editImgs[0].url;u.images=editImgs.map(i=>i.url);}
                          setProducts(ps=>ps.map(p=>p.id===u.id?u:p));
                          setEditProd(null); setEditImgs([]);
                        }}>Save Changes</button>
                        <button className="btn-outline" onClick={()=>{setEditProd(null);setEditImgs([]);}}>Cancel</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── CATEGORIES ── */}
            {tab==='categories' && (
              <div className="fade-in">
                <div className="acard">
                  <div className="acard-hd"><div style={{ fontSize:15, fontWeight:600 }}>All Categories</div><button className="btn-primary" style={{ padding:'8px 16px', fontSize:'10px' }}>+ Add Category</button></div>
                  <table className="atable">
                    <thead><tr><th>Category</th><th>Products</th><th>Actions</th></tr></thead>
                    <tbody>
                      {categories.map(c=>(
                        <tr key={c.id}>
                          <td><div style={{ display:'flex', alignItems:'center', gap:12 }}><span style={{ fontSize:28 }}>{c.icon}</span><span style={{ fontWeight:600 }}>{c.name}</span></div></td>
                          <td>{c.count} products</td>
                          <td><div style={{ display:'flex', gap:6 }}>
                            <button className="abtn abtn-e">Edit</button>
                            <button className="abtn abtn-d" onClick={()=>setCategories(cs=>cs.filter(x=>x.id!==c.id))}>Delete</button>
                          </div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── ORDERS ── */}
            {tab==='orders' && (
              <div className="fade-in">
                <div className="acard">
                  <div className="acard-hd"><div style={{ fontSize:15, fontWeight:600 }}>All Orders</div></div>
                  <div style={{ overflowX:'auto' }}>
                    <table className="atable">
                      <thead><tr><th>Order ID</th><th>Customer</th><th>Product</th><th>Amount</th><th>Status</th><th>Date</th><th>Update</th></tr></thead>
                      <tbody>
                        {orders.map(o=>(
                          <tr key={o.id}>
                            <td style={{ fontWeight:700, color:'var(--gold)' }}>{o.id}</td>
                            <td>{o.customer}</td>
                            <td style={{ maxWidth:150, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{o.product}</td>
                            <td style={{ fontWeight:600 }}>₹{o.amount.toLocaleString()}</td>
                            <td><span className="sbadge" style={{ background:`${STATUS_COLORS[o.status]}20`, color:STATUS_COLORS[o.status] }}>{o.status}</span></td>
                            <td style={{ color:'#6B7280' }}>{o.date}</td>
                            <td>
                              <select value={o.status} onChange={e=>setOrders(os=>os.map(x=>x.id===o.id?{...x,status:e.target.value}:x))}
                                style={{ fontSize:11, padding:'4px 8px', borderColor:'#E5E7EB', width:'auto' }}>
                                {['Processing','Shipped','Delivered','Cancelled'].map(s=><option key={s}>{s}</option>)}
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── CUSTOMERS ── */}
            {tab==='customers' && (
              <div className="fade-in">
                <div className="acard">
                  <div className="acard-hd"><div style={{ fontSize:15, fontWeight:600 }}>All Customers</div></div>
                  <div style={{ overflowX:'auto' }}>
                    <table className="atable">
                      <thead><tr><th>Customer</th><th>Email</th><th>Phone</th><th>Orders</th><th>Total Spent</th><th>Joined</th></tr></thead>
                      <tbody>
                        {CUSTOMERS.map(c=>(
                          <tr key={c.id}>
                            <td><div style={{ display:'flex', alignItems:'center', gap:10 }}><div style={{ width:32, height:32, borderRadius:'50%', background:'var(--gold)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:12, color:'var(--black)' }}>{c.name[0]}</div><span style={{ fontWeight:600 }}>{c.name}</span></div></td>
                            <td style={{ color:'#6B7280' }}>{c.email}</td>
                            <td>{c.phone}</td>
                            <td style={{ fontWeight:600 }}>{c.orders}</td>
                            <td style={{ fontWeight:700, color:'var(--gold)' }}>₹{c.total.toLocaleString()}</td>
                            <td style={{ color:'#6B7280' }}>{c.joined}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── COUPONS ── */}
            {tab==='coupons' && (
              <div className="fade-in">
                <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:20 }}><button className="btn-primary">+ Create Coupon</button></div>
                <div className="acard">
                  <div className="acard-hd"><div style={{ fontSize:15, fontWeight:600 }}>Discount Coupons</div></div>
                  <table className="atable">
                    <thead><tr><th>Code</th><th>Discount</th><th>Min Order</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                      {coupons.map(c=>(
                        <tr key={c.id}>
                          <td><code style={{ background:'var(--gold-pale)', padding:'3px 10px', borderRadius:4, fontWeight:700, color:'var(--gold-dark)' }}>{c.code}</code></td>
                          <td style={{ fontWeight:700 }}>{c.type==='percentage'?`${c.discount}%`:`₹${c.discount}`}</td>
                          <td>₹{c.minOrder.toLocaleString()}</td>
                          <td><span className="sbadge" style={{ background:c.status==='Active'?'#F0FDF4':'#FEF2F2', color:c.status==='Active'?'#16A34A':'#DC2626' }}>{c.status}</span></td>
                          <td><div style={{ display:'flex', gap:6 }}>
                            <button className="abtn abtn-e">Edit</button>
                            <button className="abtn abtn-d" onClick={()=>setCoupons(cs=>cs.filter(x=>x.id!==c.id))}>Delete</button>
                          </div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── INVENTORY ── */}
            {tab==='inventory' && (
              <div className="fade-in">
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, marginBottom:28 }}>
                  <div className="stat-card"><div style={{ fontSize:'2rem', fontWeight:700 }}>{products.length}</div><div style={{ fontSize:12, color:'#6B7280' }}>Total Products</div></div>
                  <div className="stat-card" style={{ '--gold':'#DC2626' }}><div style={{ fontSize:'2rem', fontWeight:700, color:'#DC2626' }}>{products.filter(p=>p.stock<5).length}</div><div style={{ fontSize:12, color:'#6B7280' }}>Low Stock Alerts</div></div>
                  <div className="stat-card"><div style={{ fontSize:'2rem', fontWeight:700 }}>{products.reduce((s,p)=>s+p.stock,0)}</div><div style={{ fontSize:12, color:'#6B7280' }}>Total Stock Units</div></div>
                </div>
                <div className="acard">
                  <div className="acard-hd"><div style={{ fontSize:15, fontWeight:600 }}>Inventory Status</div></div>
                  <table className="atable">
                    <thead><tr><th>Product</th><th>Category</th><th>Stock</th><th>Status</th></tr></thead>
                    <tbody>
                      {[...products].sort((a,b)=>a.stock-b.stock).map(p=>(
                        <tr key={p.id}>
                          <td><div style={{ display:'flex', alignItems:'center', gap:10 }}><span style={{ fontSize:24 }}>{typeof p.image==='string'&&p.image.startsWith('data:')?'🖼':p.image}</span><span style={{ fontWeight:600 }}>{p.name}</span></div></td>
                          <td><span className="badge">{p.category}</span></td>
                          <td style={{ fontWeight:700, color:p.stock<5?'#DC2626':'#16A34A' }}>{p.stock} units</td>
                          <td>{p.stock===0?<span className="sbadge" style={{ background:'#FEF2F2', color:'#DC2626' }}>Out of Stock</span>:p.stock<5?<span className="sbadge" style={{ background:'#FEF9C3', color:'#854D0E' }}>⚠ Low Stock</span>:<span className="sbadge" style={{ background:'#F0FDF4', color:'#16A34A' }}>✓ In Stock</span>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── SETTINGS ── */}
            {tab==='settings' && (
              <div className="fade-in" style={{ maxWidth:640 }}>
                <div className="acard">
                  <div className="acard-hd"><div style={{ fontSize:15, fontWeight:600 }}>Store Settings</div></div>
                  <div style={{ padding:24 }}>
                    <div style={{ marginBottom:16 }}><label>Store Name</label><input defaultValue="JHA Jewellery" /></div>
                    <div style={{ marginBottom:16 }}><label>WhatsApp Number</label><input defaultValue="+91 79822 72872" /></div>
                    <div style={{ marginBottom:16 }}><label>Contact Email</label><input defaultValue="hello@jhajewellery.com" /></div>
                    <div style={{ marginBottom:16 }}><label>Store Address</label><textarea rows={2} defaultValue="Plot 12, Sector 18, Noida, Delhi NCR - 201301" /></div>
                    <div style={{ marginBottom:20 }}>
                      <label>Store Logo</label>
                      <div className="drop-z"><div style={{ fontSize:36, marginBottom:8 }}>🏪</div><div style={{ fontSize:13, fontWeight:600 }}>Upload Store Logo</div><div style={{ fontSize:11, color:'var(--gray-mid)' }}>PNG, SVG · 200x60px recommended</div></div>
                    </div>
                    <button className="btn-primary">Save Settings</button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
