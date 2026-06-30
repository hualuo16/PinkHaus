import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { skinTypeDisplay } from '../data/products'
import { getCurrentUser, getData, subscribe, updateUserSkinType, updateUserBio, updateUserBackground, updateUserGender, getUser, ratingLabels, profileBackgrounds, getFavoriteProducts, getFavoriteReviews, toggleFavoriteProduct, toggleFavoriteReview, isReviewFavorited, isProductFavorited } from '../store/store'
import { getProductById, formatProduct } from '../data/products'

function timeAgo(d) {
  const diff = Date.now() - new Date(d).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return '刚刚'
  if (m < 60) return m + '分前'
  const h = Math.floor(m / 60)
  if (h < 24) return h + '小时前'
  return new Date(d).toLocaleDateString('zh-CN')
}

export default function Profile() {
  const navigate = useNavigate()
  const user = getCurrentUser()
  const [reviews, setReviews] = useState([])
  const [tab, setTab] = useState('reviews')
  const [showSkinPicker, setShowSkinPicker] = useState(false)
  const [showBgPicker, setShowBgPicker] = useState(false)
  const [editingBio, setEditingBio] = useState(false)
  const [bioText, setBioText] = useState('')
  const [, setTick] = useState(0)

  useEffect(() => {
    if (!user) return
    const data = getData()
    setReviews(data.reviews.filter(r => r.userId === user.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
    setBioText(user.bio || '')
    const unsub = subscribe(() => { setTick(t => t + 1); setReviews(getData().reviews.filter(r => r.userId === user.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))) })
    return unsub
  }, [user])

  if (!user) return <div className="content"><div className="empty-state"><div className="empty-icon">👤</div><p>请先登录</p></div></div>

  const sd = skinTypeDisplay[user.skinType] || { emoji: '✨', label: '未知肤质' }
  const bg = profileBackgrounds.find(b => b.id === user.background) || profileBackgrounds[0]
  const favProducts = getFavoriteProducts()
  const favReviews = getFavoriteReviews()
  const genderLabel = { female: '👩 女生', male: '👨 男生', other: '🧑 其他' }

  const handleBgSelect = (bgId) => {
    updateUserBackground(bgId)
    setShowBgPicker(false)
  }

  const handleSkinChange = (st) => {
    updateUserSkinType(st)
    setShowSkinPicker(false)
  }

  const saveBio = () => {
    updateUserBio(bioText.trim())
    setEditingBio(false)
  }

  return (
    <>
      <div className="nav-bar">
        <div className="nav-title" style={{ fontSize: '17px' }}>我的主页</div>
        <div className="nav-actions">
          <button className="nav-btn" onClick={() => setShowBgPicker(!showBgPicker)} title="换背景">🎨</button>
        </div>
      </div>

      {/* Cover */}
      <div className="profile-cover">
        <div className="profile-cover-bg" style={{ background: bg.color }}>
          <div className={bg.type === 'stripe' ? 'bg-stripe' : bg.type === 'dot' ? 'bg-dot' : ''} style={{ width: '100%', height: '100%' }}></div>
        </div>
      </div>

      {/* Avatar + Info */}
      <div className="profile-info-section">
        <div className="profile-avatar-wrap">{(user.nickname || '?')[0]}</div>
        <div className="profile-info-text">
          <div className="p-name">{user.nickname}
            <span className="gender-badge" style={{ marginLeft: '6px' }}>{genderLabel[user.gender] || ''}</span>
          </div>
          <div className="p-tags">
            <span className="p-tag" style={{ cursor: 'pointer' }} onClick={() => setShowSkinPicker(!showSkinPicker)}>
              {sd.emoji} {sd.label} {showSkinPicker ? '▲' : '▼'}
            </span>
          </div>
          {editingBio ? (
            <div style={{ marginTop: '6px', display: 'flex', gap: '6px' }}>
              <input className="form-input" style={{ padding: '6px 10px', fontSize: '13px' }} value={bioText} onChange={e => setBioText(e.target.value)} autoFocus />
              <button className="btn btn-sm btn-primary" onClick={saveBio}>✓</button>
              <button className="btn btn-sm btn-secondary" onClick={() => setEditingBio(false)}>✕</button>
            </div>
          ) : (
            <div className="p-bio" style={{ cursor: 'pointer' }} onClick={() => setEditingBio(true)}>
              {user.bio || '点击添加个性签名...'}
            </div>
          )}
        </div>
      </div>

      {/* Skin picker dropdown */}
      {showSkinPicker && (
        <div className="card" style={{ margin: '0 16px 12px' }}>
          <div className="skin-type-grid">
            {Object.entries(skinTypeDisplay).map(([key, val]) => (
              <div key={key} className={'skin-type-option' + (user.skinType === key ? ' selected' : '')} onClick={() => handleSkinChange(key)}>
                <span className="emoji">{val.emoji}</span>
                <span className="label">{val.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Background picker */}
      {showBgPicker && (
        <div className="card" style={{ margin: '0 16px 12px' }}>
          <label className="form-label">选择背景样式</label>
          <div className="bg-picker-grid">
            {profileBackgrounds.map(b => (
              <div key={b.id} className={'bg-picker-item' + (user.background === b.id ? ' selected' : '')} onClick={() => handleBgSelect(b.id)}>
                <div style={{ width: '100%', height: '100%', background: b.color }}>
                  <div className={b.type === 'stripe' ? 'bg-stripe' : b.type === 'dot' ? 'bg-dot' : ''} style={{ width: '100%', height: '100%' }}></div>
                </div>
                <span className="bg-label">{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

            <div className="profile-tabs">
        <button className={'profile-tab' + (tab === 'reviews' ? ' active' : '')} onClick={() => setTab('reviews')}>我的评价 ({reviews.length})</button>
        <button className={'profile-tab' + (tab === 'favProducts' ? ' active' : '')} onClick={() => setTab('favProducts')}>收藏商品 ({favProducts.length})</button>
        <button className={'profile-tab' + (tab === 'favReviews' ? ' active' : '')} onClick={() => setTab('favReviews')}>收藏评价 ({favReviews.length})</button>
      </div>
      <div className="content" style={{ paddingTop: "12px" }}>
        {tab === 'reviews' && (
          reviews.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">✏️</div><p>还没有写过评价</p></div>
          ) : (
            reviews.map(r => {
              const product = getProductById(r.productId)
              const rl = ratingLabels[r.rating]
              return (
                <div key={r.id} className="card fade-in" style={{ cursor: 'pointer' }} onClick={() => navigate('/product/' + r.productId)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{product ? formatProduct(product) : '未知商品'}</div>
                    <span className={'rating-badge ' + r.rating}>{rl?.label || ''}</span>
                  </div>
                  <div className="review-content-text">{r.content}</div>
                  <div className="time-ago" style={{ marginTop: '6px' }}>{timeAgo(r.createdAt)}</div>
                </div>
              )
            })
          )
        )}

        {tab === 'favProducts' && (
          favProducts.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">💝</div><p>还没有收藏商品</p></div>
          ) : (
            favProducts.map(pid => {
              const p = getProductById(pid)
              if (!p) return null
              return (
                <div key={pid} className="card fade-in" style={{ cursor: 'pointer' }} onClick={() => navigate('/product/' + pid)}>
                  <div style={{ fontWeight: 600 }}>{formatProduct(p)}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>点击查看评价</div>
                </div>
              )
            })
          )
        )}

        {tab === 'favReviews' && (
          favReviews.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">💬</div><p>还没有收藏评价</p></div>
          ) : (
            favReviews.map(rid => {
              const data = getData()
              const r = data.reviews.find(rr => rr.id === rid)
              if (!r) return null
              const product = getProductById(r.productId)
              const user2 = getUser(r.userId)
              const rl = ratingLabels[r.rating]
              return (
                <div key={rid} className="card fade-in" style={{ cursor: 'pointer' }} onClick={() => navigate('/product/' + r.productId)}>
                  <div className="review-user">
                    <div className="avatar">{(user2?.nickname || '?')[0]}</div>
                    <div className="info">
                      <div className="name">{user2?.nickname || '匿名'}
                        <span className={'rating-badge ' + r.rating} style={{ marginLeft: '6px' }}>{rl?.label || ''}</span>
                      </div>
                    </div>
                  </div>
                  <div className="review-content-text">{r.content}</div>
                  {product && <div className="time-ago" style={{ marginTop: '4px' }}>{formatProduct(product)}</div>}
                </div>
              )
            })
          )
        )}
      </div>
    </>
  )
}





