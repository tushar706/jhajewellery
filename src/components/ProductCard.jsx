import Icon from './Icon';

const ProductCard = ({ product, setPage, addToCart }) => {
  const savings = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="product-card fade-in" onClick={() => setPage('product-' + product.id)}>
      <div className="product-img">
        {typeof product.image === 'string' && product.image.startsWith('data:') ? (
          <img src={product.image} alt={product.name}
            style={{ width:'100%', height:'100%', objectFit:'cover', position:'absolute', inset:0 }} />
        ) : (
          <span>{product.image}</span>
        )}
        {product.tag && <div className="product-tag">{product.tag}</div>}
        <div className="product-actions-overlay" onClick={e => e.stopPropagation()}>
          <button className="btn-primary"
            style={{ padding:'8px 16px', fontSize:'10px', flex:1 }}
            onClick={() => addToCart(product)}>
            Add to Cart
          </button>
          <button className="btn-outline"
            style={{ padding:'8px 16px', fontSize:'10px', color:'white', borderColor:'rgba(255,255,255,0.4)' }}
            onClick={() => setPage('product-' + product.id)}>
            Details
          </button>
        </div>
      </div>

      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <div className="product-name">{product.name}</div>
        <div className="product-price">
          <span className="price-current">₹{product.price.toLocaleString()}</span>
          <span className="price-original">₹{product.originalPrice.toLocaleString()}</span>
          <span className="price-saving">-{savings}%</span>
        </div>
        <div className="product-rating">
          <Icon name="star" size={12} color="var(--gold)" />
          <span style={{ fontWeight:600, color:'var(--black)' }}>{product.rating}</span>
          <span>({product.reviews})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
