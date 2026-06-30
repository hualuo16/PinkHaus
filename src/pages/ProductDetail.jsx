import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById, formatProduct, skinTypeDisplay } from '../data/products'
import { getReviewsForProduct, getRatingDistribution, getUser, ratingLabels } from '../store/store'

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return '刚刚'
  if (mins < 60) return mins + '分钟前'
  const hours = Math.floor(mins / 60)
  if (hours < 24) return hours + '小时前'
  const days = Math.floor(hours / 24)
  if (days < 30) return days + '天前'
  return new Date(dateStr).toLocaleDateString('zh-CN')
}

// using skinTypeDisplay
// using skinTypeDisplay

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)
  const [reviews, setReviews] = useState([])
  const [distribution, setDistribution] = useState({ pink: 0, red: 0, yellow: 0, black: 0 })

  useEffect(() => {
    setReviews(getReviewsForProduct(id))
    setDistribution(getRatingDistribution(id))
  }, [id])

  const total = Object.values(distribution).reduce((a, b) => a + b, 0)

  const ratingOrder = ['pink', 'red', 'yellow', 'black']
  const maxCount = Math.max(...Object.values(distribution), 1)

  return (
    <>
      <div className="nav-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <div className="nav-title" style={{ flex: 1, textAlign: 'center' }}>商品详情</div>
        <button className="nav-btn" onClick={() => navigate('/review/' + id)} title="评价">✏️</button>
      </div>
      <div className="content">
        {!product ? (
          <div className="empty-state">
            <div className="empty-icon">🤷</div>
            <p>未找到该商品信息</p>
          </div>
        ) : (
          <>
            <div className="product-detail-header fade-in">
              <h1>{product.brand}</h1>
              <div className="brand">{product.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                分类: {({ cleanser: '洁面', toner: '爽肤水', essence: '精华', lotion: '乳液/面霜', sunscreen: '防晒', mask: '面膜', eye: '眼霜', serum: '精华液', mist: '喷雾', lip: '唇部护理', makeup: '底妆', other: '其他' })[product.category] || product.category}
              </div>
            </div>

            <div className="rating-dist fade-in">
              <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>
                综合评分 · {total}人评价
              </div>
              {ratingOrder.map(rk => {
                const rl = ratingLabels[rk]
                const count = distribution[rk]
                const pct = total > 0 ? (count / total * 100) : 0
                return (
                  <div key={rk} className="rating-row">
                    <span className="rr-label" style={{ color: rl.color }}>{rl.label}</span>
                    <div className="rr-bar">
                      <div className="rr-fill" style={{ width: (count / maxCount * 100) + '%', background: rl.color }}></div>
                    </div>
                    <span className="rr-count">{count}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', width: '36px' }}>{pct.toFixed(0)}%</span>
                  </div>
                )
              })}
            </div>

            <div className="section-title">💬 用户评价 ({reviews.length})</div>
            {reviews.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">💭</div>
                <p>还没有人评价这个商品<br/>快来写下第一个测评吧！</p>
                <button className="btn btn-primary" style={{ marginTop: '16px' }} onClick={() => navigate('/review/' + id)}>
                  写评价
                </button>
              </div>
            ) : (
              reviews.map(r => {
                const user = getUser(r.userId)
                const rl = ratingLabels[r.rating]
                return (
                  <div key={r.id} className="card fade-in">
                    <div className="review-user">
                      <div className="avatar">{(user?.nickname || '?')[0]}</div>
                      <div className="info">
                        <div className="name">
                          {user?.nickname || '匿名用户'}
                          <span className="skin-badge" style={{ marginLeft: '6px' }}>
                            {skinTypeDisplay[user?.skinType]?.emoji || '✨'} {skinTypeDisplay[user?.skinType]?.label || '未知肤质'}
                          </span>
                        </div>
                        <div className="meta">
                          <span className={'rating-badge ' + r.rating}>{rl?.label || r.rating}</span>
                          <span style={{ marginLeft: '6px' }} className="time-ago">{timeAgo(r.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="review-content-text">{r.content}</div>
                  </div>
                )
              })
            )}
          </>
        )}
      </div>
    </>
  )
}


