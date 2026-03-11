import { useRef, useCallback, useState } from 'react';

const ImageUploader = ({ images, setImages, maxImages = 5 }) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const processFiles = useCallback((files) => {
    const valid = Array.from(files)
      .filter(f => f.type.startsWith('image/'))
      .slice(0, maxImages - images.length);

    valid.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prev => {
          if (prev.length >= maxImages) return prev;
          return [...prev, { id: Date.now() + Math.random(), url: e.target.result, name: file.name, file }];
        });
      };
      reader.readAsDataURL(file);
    });
  }, [images.length, maxImages, setImages]);

  const onDrop = useCallback((e) => {
    e.preventDefault(); setDragging(false);
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const removeImage = (id) => setImages(prev => prev.filter(img => img.id !== id));
  const moveImage   = (from, to) => {
    setImages(prev => {
      const arr = [...prev];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
  };

  return (
    <div>
      <style>{`
        .img-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(110px,1fr)); gap:12px; margin-bottom:12px; }
        .img-wrap { position:relative; border-radius:8px; overflow:hidden; border:2px solid var(--gray-light); aspect-ratio:1; background:var(--white-off); transition:border-color .2s; cursor:grab; }
        .img-wrap:first-child { border-color:var(--gold); }
        .img-wrap:hover { border-color:var(--gold-light); }
        .img-wrap img { width:100%; height:100%; object-fit:cover; display:block; }
        .img-overlay { position:absolute;inset:0;background:rgba(0,0,0,.55);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;opacity:0;transition:opacity .2s; }
        .img-wrap:hover .img-overlay { opacity:1; }
        .img-del { background:#DC2626;color:white;border:none;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:14px;font-weight:bold;transition:transform .15s; }
        .img-del:hover { transform:scale(1.1); }
        .img-mvs { display:flex;gap:4px; }
        .img-mv { background:rgba(255,255,255,.9);color:var(--black);border:none;border-radius:4px;width:24px;height:24px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:12px; }
        .img-badge { position:absolute;top:6px;left:6px;background:var(--gold);color:var(--black);font-size:9px;font-weight:700;letter-spacing:1px;padding:2px 7px;border-radius:10px;text-transform:uppercase; }
        .drop-z { border:2px dashed var(--gray-light);border-radius:10px;padding:${images.length > 0 ? '20px' : '36px'};text-align:center;cursor:pointer;transition:all .2s;background:var(--white-off); }
        .drop-z.active, .drop-z:hover { border-color:var(--gold);background:var(--gold-pale); }
      `}</style>

      {images.length > 0 && (
        <div className="img-grid">
          {images.map((img, idx) => (
            <div key={img.id} className="img-wrap">
              <img src={img.url} alt={img.name} />
              {idx === 0 && <div className="img-badge">Main</div>}
              <div className="img-overlay">
                <button className="img-del" onClick={() => removeImage(img.id)}>✕</button>
                <div className="img-mvs">
                  {idx > 0 && <button className="img-mv" onClick={() => moveImage(idx, idx-1)}>◀</button>}
                  {idx < images.length-1 && <button className="img-mv" onClick={() => moveImage(idx, idx+1)}>▶</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length < maxImages && (
        <div
          className={`drop-z${dragging ? ' active' : ''}`}
          onDrop={onDrop}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onClick={() => inputRef.current?.click()}
        >
          <div style={{ fontSize: images.length > 0 ? 24 : 36, marginBottom:8 }}>📸</div>
          <div style={{ fontSize:13, fontWeight:600, color:'var(--gray-dark)' }}>
            {dragging ? 'Drop images here!' : images.length > 0 ? 'Add more images' : 'Drag & Drop images here'}
          </div>
          <div style={{ fontSize:11, color:'var(--gray-mid)', marginTop:4 }}>
            or <span style={{ color:'var(--gold)', fontWeight:600 }}>click to browse</span>
            {' '}· PNG, JPG, WebP · Max {maxImages - images.length} more
          </div>
          <input ref={inputRef} type="file" accept="image/*" multiple
            style={{ display:'none' }} onChange={e => processFiles(e.target.files)} />
        </div>
      )}

      {images.length > 0 && (
        <div style={{ fontSize:11, color:'var(--gray-mid)', marginTop:8, display:'flex', gap:16, flexWrap:'wrap' }}>
          <span>✅ {images.length} image{images.length > 1 ? 's' : ''} added</span>
          <span>⭐ First image = Main photo</span>
          <span>↔ Hover to reorder / delete</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
