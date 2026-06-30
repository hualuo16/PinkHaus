import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getData, subscribe, getFeed, getUser, ratingLabels } from '../store/store'
import { getProductById, formatProduct, skinTypeDisplay } from '../data/products'

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

export default function Home() {
  const navigate = useNavigate()
  const [feed, setFeed] = useState([])
  const [, setTick] = useState(0)

  useEffect(() => {
    setFeed(getFeed())
    const unsub = subscribe(() => { setFeed(getFeed()); setTick(t => t + 1) })
    return unsub
  }, [])

  return (
    <>
      <div className="nav-bar">
        <div className="nav-title"><span style={{ color: 'var(--pink)', fontWeight: 800 }}>Pink</span><span style={{ fontWeight: 700, color: 'var(--text)' }}>Haus</span></div>
        <div className="nav-actions">
          <button className="nav-btn" onClick={() => navigate('/search')} title="搜索">🔍</button>
        </div>
      </div>
      <div className="content">
        <div style={{ padding: '16px 0 8px' }}><h2 style={{ fontSize: '18px', fontWeight: 700 }}>社区动态</h2></div>
        {feed.length === 0 ? (
          <div className="empty-state"><div className="empty-icon">📝</div><p>还没有评价，快来写下第一个测评吧！</p></div>
        ) : (
          feed.map(r => {
            const user = getUser(r.userId)
            const product = getProductById(r.productId)
            const rl = ratingLabels[r.rating]
            const sd = skinTypeDisplay[user?.skinType] || { emoji: '✨', label: '未知肤质' }
            return (
              <div key={r.id} className="card feed-item fade-in" onClick={() => navigate('/product/' + r.productId)}>
                <div className="review-user">
                  <div className="avatar">{(user?.nickname || '?')[0]}</div>
                  <div className="info">
                    <div className="name">
                      {user?.nickname || '匿名用户'}
                      <span className="skin-badge">{sd.emoji} {sd.label}</span>
                    </div>
                    <div className="meta">
                      <span className={'rating-badge ' + r.rating}>{rl?.label || r.rating}</span>
                      <span className="time-ago">{timeAgo(r.createdAt)}</span>
                    </div>
                  </div>
                </div>
                {product && <div className="review-product"><strong>{formatProduct(product)}</strong></div>}
                <div className="review-content">{r.content}</div>
                <div className="review-actions"><span>💬 查看详情</span></div>
              </div>
            )
          })
        )}
      </div>
    </>
  )
}
