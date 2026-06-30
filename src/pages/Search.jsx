import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchProducts, getProductById } from '../data/products'
import { getData } from '../store/store'

export default function Search() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [listening, setListening] = useState(false)
  const [popularProducts, setPopularProducts] = useState([])
  const recognitionRef = useRef(null)

  React.useEffect(() => {
    const data = getData()
    const reviewCounts = {}
    data.reviews.forEach(r => {
      reviewCounts[r.productId] = (reviewCounts[r.productId] || 0) + 1
    })
    const sorted = Object.entries(reviewCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([pid]) => getProductById(pid))
      .filter(Boolean)
    setPopularProducts(sorted)
  }, [])

  const handleSearch = (val) => {
    setQuery(val)
    if (val.trim().length > 0) {
      setResults(searchProducts(val))
      setShowResults(true)
    } else {
      setResults([])
      setShowResults(false)
    }
  }

  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('当前浏览器不支持语音输入，建议使用Chrome')
      return
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = 'zh-CN'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => setListening(true)
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript
      setQuery(text)
      setResults(searchProducts(text))
      setShowResults(true)
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const catLabels = { cleanser: '洁面', toner: '水', essence: '精华', lotion: '面霜/乳液', sunscreen: '防晒', mask: '面膜', eye: '眼霜', serum: '精华', mist: '喷雾', lip: '唇部', makeup: '底妆', other: '其他' }

  return (
    <>
      <div className="nav-bar">
        <div className="nav-title"><span style={{ color: 'var(--pink)', fontWeight: 800 }}>Pink</span><span style={{ fontWeight: 700, color: 'var(--text)' }}>Haus</span></div>
        <div className="nav-actions">
          <button className="nav-btn" onClick={() => navigate('/')} title="首页">🏠</button>
        </div>
      </div>
      <div className="content">
        <div style={{ padding: '12px 0' }}>
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              placeholder="搜索商品名称或品牌..."
              value={query}
              onChange={e => handleSearch(e.target.value)}
              onFocus={() => { if (results.length > 0) setShowResults(true) }}
            />
            <button className={'voice-btn' + (listening ? ' listening' : '')} onClick={handleVoice} title="语音搜索">🎤</button>
            {showResults && results.length > 0 && (
              <div className="search-results">
                {results.map(p => (
                  <div key={p.id} className="search-result-item" onClick={() => { navigate('/product/' + p.id); setShowResults(false) }}>
                    <div>
                      <div className="sr-name">{p.brand} {p.name}</div>
                      <div className="sr-brand">{p.brand}</div>
                    </div>
                    <span className="sr-category">{catLabels[p.category] || p.category}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {!showResults && query.length === 0 && (
          <>
            <div className="section-title">🔥 社区热评商品</div>
            <div className="tag-chips">
              {popularProducts.map(p => (
                <span key={p.id} className="tag-chip" onClick={() => navigate('/product/' + p.id)}>
                  {p.brand} {p.name}
                </span>
              ))}
            </div>
            <div className="section-title">🏷️ 热门品牌</div>
            <div className="tag-chips">
              {['SK-II', 'La Mer', '修丽可', '珀莱雅', '薇诺娜', '兰蔻', '科颜氏', '雅诗兰黛', 'HBN', '欧莱雅'].map(b => (
                <span key={b} className="tag-chip" onClick={() => { setQuery(b); setResults(searchProducts(b)); setShowResults(true) }}>
                  {b}
                </span>
              ))}
            </div>
          </>
        )}

        {showResults && results.length === 0 && query.trim().length > 0 && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p>没有找到匹配的商品<br/>试试其他关键词吧</p>
          </div>
        )}
      </div>
    </>
  )
}






