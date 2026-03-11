import Icon from './Icon';
import { WA_NUMBER, ADDRESS, PHONE, EMAIL } from '../data/index';

const Footer = ({ setPage }) => (
  <>
    <style>{`
      .footer { background:var(--black-soft);border-top:1px solid rgba(201,168,76,.15);padding:80px 32px 32px; }
      .footer-grid { max-width:1400px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;margin-bottom:64px; }
      .footer-logo { font-family:var(--font-display);font-size:26px;font-weight:600;color:var(--gold);margin-bottom:16px; }
      .footer-logo span { color:var(--white);font-weight:300; }
      .footer-desc { color:rgba(255,255,255,.5);font-size:13px;line-height:1.8;margin-bottom:24px; }
      .footer-socials { display:flex;gap:12px; }
      .social-btn { width:36px;height:36px;border-radius:50%;border:1px solid rgba(201,168,76,.3);background:transparent;color:var(--gold);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:var(--transition); }
      .social-btn:hover { background:var(--gold);color:var(--black); }
      .footer-heading { font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:var(--gold);margin-bottom:20px;font-weight:600; }
      .footer-link { display:block;color:rgba(255,255,255,.5);font-size:13px;margin-bottom:10px;cursor:pointer;transition:var(--transition);text-decoration:none;border:none;background:none;text-align:left; }
      .footer-link:hover { color:var(--gold);padding-left:4px; }
      .footer-bottom { max-width:1400px;margin:0 auto;padding-top:32px;border-top:1px solid rgba(255,255,255,.08);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px; }
      .footer-bottom-text { font-size:12px;color:rgba(255,255,255,.35); }
      @media(max-width:1024px){ .footer-grid{grid-template-columns:1fr 1fr;} }
      @media(max-width:640px){ .footer-grid{grid-template-columns:1fr;} }
    `}</style>
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-logo">JHA <span>Jewellery</span></div>
          <p className="footer-desc">Where tradition meets modernity. JHA Jewellery has been crafting timeless pieces for over 14 years, using ethically sourced materials and certified gold.</p>
          <div className="footer-socials">
            {['instagram','facebook','youtube'].map(s => (
              <button key={s} className="social-btn"><Icon name={s} size={14} /></button>
            ))}
            <button className="social-btn" onClick={() => window.open(`https://wa.me/${WA_NUMBER}`, '_blank')}>
              <Icon name="whatsapp" size={14} color="var(--gold)" />
            </button>
          </div>
        </div>
        <div>
          <div className="footer-heading">Shop</div>
          {['Rings','Earrings','Necklaces','Bracelets','Bangles','Pendants'].map(l => (
            <button key={l} className="footer-link" onClick={() => setPage('shop')}>{l}</button>
          ))}
        </div>
        <div>
          <div className="footer-heading">Help</div>
          {['About Us','Contact','Size Guide','Care Instructions','Returns Policy','Track Order'].map(l => (
            <button key={l} className="footer-link">{l}</button>
          ))}
        </div>
        <div>
          <div className="footer-heading">Contact</div>
          <div className="footer-link" style={{ cursor:'default' }}>📍 {ADDRESS}</div>
          <div className="footer-link" style={{ cursor:'default' }}>📞 {PHONE}</div>
          <div className="footer-link" style={{ cursor:'default' }}>✉️ {EMAIL}</div>
          <div className="footer-link" style={{ cursor:'default' }}>🕐 Mon–Sat: 10am–8pm</div>
          <div style={{ marginTop:16 }}>
            <div className="footer-heading">Newsletter</div>
            <div style={{ display:'flex', gap:8, marginTop:8 }}>
              <input placeholder="Your email"
                style={{ background:'rgba(255,255,255,.08)', borderColor:'rgba(201,168,76,.2)', color:'white', padding:'10px 14px', fontSize:12 }} />
              <button className="btn-primary" style={{ padding:'10px 16px', whiteSpace:'nowrap' }}>Join</button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-text">© 2024 JHA Jewellery. All rights reserved.</div>
        <div className="footer-bottom-text">BIS Hallmarked · Certified Gold · Secure Payments</div>
      </div>
    </footer>
  </>
);

export default Footer;
