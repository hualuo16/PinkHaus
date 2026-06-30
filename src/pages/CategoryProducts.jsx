import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productDB } from '../data/products'

const catNames = {
  lotion: '面霜/乳液', toner: '水乳', eye: '眼霜',
  mask: '面膜', serum: '精华', lip: '唇部', other: '其他',
  cleanser: '洁面', makeup: '底妆', sunscreen: '防晒', mist: '喷雾'
}

const catEmojis = {
  lotion: '🧴', toner: '💧', eye: '👁️',
  mask: '🎭', serum: '✨', lip: '💋', other: '📦'
}

// Generate a pink-tone placeholder color based on product ID
function getPlaceholderColor(id) {
  const pinks = ['#F8D7DA', '#F0C8D0', '#FFE0E8', '#FFD6E0', '#FADADD', '#F5D0D8', '#FFE4EC', '#F8E0E8']
  const hash = id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return pinks[hash % pinks.length]
}

export default function CategoryProducts() {
  const { cat } = useParams()
  const navigate = useNavigate()
  const products = productDB.filter(p => p.category === cat)
  const name = catNames[cat] || cat
  const emoji = catEmojis[cat] || '📦'

  return (
    <>
      <div className="nav-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <div className="nav-title" style={{ flex: 1, textAlign: 'center', fontSize: '17px' }}>{emoji} {name}</div>
        <div style={{ width: '36px' }}></div>
      </div>
      <div className="content" style={{ paddingBottom: '80px' }}>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '12px 0', textAlign: 'center' }}>
          共 {products.length} 款商品，点击选择并评价
        </div>
        <div className="cat-prod-grid">
          {products.map(p => {
            const bgColor = getPlaceholderColor(p.id)
            return (
              <div key={p.id} className="cat-prod-card fade-in" onClick={() => navigate('/review/' + p.id)}>
                <div className="cat-prod-img" style={{ background: bgColor }}>
                  <div className="cat-prod-initials">{(p.brand[0] || '') + (p.name[0] || '')}</div>
                </div>
                <div className="cat-prod-info">
                  <div className="cat-prod-name">{p.brand}</div>
                  <div className="cat-prod-sub">{p.name}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
