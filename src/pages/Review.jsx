import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { searchProducts, getProductById, formatProduct, productDB } from '../data/products'
import { addReview, ratingLabels } from '../store/store'

const ratingOptions = [
  { key: 'pink', emoji: '💖', label: 'PINK', sub: '超级赞' },
  { key: 'red', emoji: '❤️', label: '红榜', sub: '推荐' },
  { key: 'yellow', emoji: '💛', label: '黄榜', sub: '一般' },
  { key: 'black', emoji: '🖤', label: '黑榜', sub: '不推荐' },
]

const categoryIcons = [
  { label: '面霜', cat: 'lotion', icon: '🧴' },
  { label: '水乳', cat: 'toner', icon: '💧' },
  { label: '眼霜', cat: 'eye', icon: '👁️' },
  { label: '面膜', cat: 'mask', icon: '🎭' },
  { label: '精华', cat: 'serum', icon: '✨' },
  { label: '唇部', cat: 'lip', icon: '💋' },
  { label: '其他', cat: 'other', icon: '📦', full: true },
]

export default function Review() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [selectedProduct, setSelectedProduct] = useState(productId ? getProductById(productId) : null)
  const [query, setQuery] = useState(productId && getProductById(productId) ? formatProduct(getProductById(productId)) : '')
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [rating, setRating] = useState('')
  const [content, setContent] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [listening, setListening] = useState(false)
  const [activeCat, setActiveCat] = useState('')
  const recognitionRef = React.useRef(null)

  const searchByCategory = (cat) => {
    if (activeCat === cat) {
      setActiveCat('')
      if (!query) { setResults([]); setShowResults(false); setSelectedProduct(null) }
      return
    }
    setActiveCat(cat)
    const filtered = productDB.filter(p => p.category === cat)
    const catNames = { lotion: '面霜', toner: '水乳', eye: '眼霜', mask: '面膜', serum: '精华', lip: '唇部', other: '其他' }
    setQuery(catNames[cat] || cat)
    setResults(filtered)
    setShowResults(true)
  }

  const handleProductSearch = (val) => {
    setQuery(val)
    setActiveCat('')
    if (val.trim().length > 0) {
      setResults(searchProducts(val))
      setShowResults(true)
    } else {
      setResults([]); setShowResults(false); setSelectedProduct(null)
    }
  }

  const selectProduct = (p) => { setSelectedProduct(p); setQuery(formatProduct(p)); setShowResults(false); setActiveCat('') }

  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) { alert('当前浏览器不支持语音输入，建议使用Chrome'); return }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = 'zh-CN'
    recognition.continuous = false
    recognition.interimResults = false
    recognition.onstart = () => setListening(true)
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)
    recognition.onresult = (event) => { handleProductSearch(event.results[0][0].transcript) }
    recognitionRef.current = recognition
    recognition.start()
  }

  const handleSubmit = () => {
    if (!selectedProduct) { alert('请先选择要评价的商品'); return }
    if (!rating) { alert('请选择一个评分等级'); return }
    if (!content.trim()) { alert('请写下你的使用感受'); return }
    addReview(selectedProduct.id, rating, content.trim())
    setSubmitted(true)
    setTimeout(() => navigate('/product/' + selectedProduct.id), 1500)
  }

  if (submitted) {
    return (
      <>
        <div className="nav-bar"><div className="nav-title" style={{ flex: 1, textAlign: 'center' }}>PinkHaus</div></div>
        <div className="content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', minHeight: '60vh' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
          <h2 style={{ marginBottom: '8px' }}>评价发布成功！</h2>
          <p style={{ color: 'var(--text-secondary)' }}>正在跳转到商品页...</p>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="nav-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <div className="nav-title" style={{ flex: 1, textAlign: 'center', fontSize: '17px' }}>写评价</div>
        <div style={{ width: '36px' }}></div>
      </div>
      <div className="content">
        <div className="form-group">
          <label className="form-label">选择商品</label>
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input placeholder="输入商品名或品牌名..." value={query} onChange={e => handleProductSearch(e.target.value)} />
            <button className={'voice-btn' + (listening ? ' listening' : '')} onClick={handleVoice} title="语音输入">🎤</button>
            {showResults && results.length > 0 && (
              <div className="search-results">
                {results.map(p => (
                  <div key={p.id} className="search-result-item" onClick={() => selectProduct(p)}>
                    <div><div className="sr-name">{p.brand} {p.name}</div><div className="sr-brand">{p.brand}</div></div>
                    <span className="sr-category">{({ lotion: '面霜', toner: '水乳', eye: '眼霜', mask: '面膜', serum: '精华', lip: '唇部', cleanser: '洁面', makeup: '底妆', sunscreen: '防晒', mist: '喷雾', other: '其他' })[p.category] || p.category}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', margin: '4px 0 8px' }}>或者按品类查找：</div>
          <div className="cat-icon-grid">
            {categoryIcons.map(ci => (
              <div key={ci.cat} className={'cat-icon-item' + (activeCat === ci.cat ? ' active' : '') + (ci.full ? ' cat-icon-full' : '')} onClick={() => navigate('/category/' + ci.cat)}>
                <span style={{ fontSize: ci.full ? '20px' : '28px' }}>{ci.icon}</span>
                <span className="cat-label">{ci.label}</span>
              </div>
            ))}
          </div>

          {selectedProduct && (
            <div style={{ padding: '10px 14px', background: 'var(--pink-light)', borderRadius: 'var(--radius-sm)', fontSize: '14px', fontWeight: 600 }}>
              ✅ 已选择: {formatProduct(selectedProduct)}
            </div>
          )}
        </div>

        {selectedProduct && (
          <>
            <div className="form-group">
              <label className="form-label">你的评分</label>
              <div className="rating-selector">
                {ratingOptions.map(ro => (
                  <div key={ro.key} className={'rating-option' + (rating === ro.key ? ' selected' : '')} onClick={() => setRating(ro.key)}
                    style={rating === ro.key ? { borderColor: ratingLabels[ro.key].color, backgroundColor: ratingLabels[ro.key].bg } : {}}>
                    <span className="emoji">{ro.emoji}</span>
                    <span className="rlabel" style={rating === ro.key ? { color: ratingLabels[ro.key].color } : {}}>{ro.label}</span>
                    <span className="rsub">{ro.sub}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">使用感受</label>
              <textarea className="form-input form-textarea" placeholder="分享你的使用体验、效果感受、适合什么肤质... 越详细越能帮助姐妹们！" value={content} onChange={e => setContent(e.target.value)} />
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', textAlign: 'right' }}>{content.length} 字</div>
            </div>

            <button className="btn btn-primary btn-block btn-lg" onClick={handleSubmit}>发布评价 💬</button>
          </>
        )}
      </div>
    </>
  )
}





