import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { getData, subscribe, isOnboarded, initSampleData, getCurrentUser } from './store/store'
import Home from './pages/Home'
import Search from './pages/Search'
import ProductDetail from './pages/ProductDetail'
import Review from './pages/Review'
import CategoryProducts from './pages/CategoryProducts'
import Profile from './pages/Profile'
import Onboarding from './pages/Onboarding'

function SvgIcon({ name, size }) {
  const s = size || 22
  const icons = {
    home: '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" fill="currentColor"><path d="M12 3L4 9v12h5v-7h6v7h5V9z"/></svg>',
    search: '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>',
    write: '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',
    profile: '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',
    back: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',
  }
  return <span className="tab-icon" dangerouslySetInnerHTML={{ __html: icons[name] || '' }} />
}

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [, setTick] = useState(0)

  useEffect(() => {
    const cu = getCurrentUser()
    if (cu) initSampleData()
    const unsub = subscribe(() => setTick(t => t + 1))
    return unsub
  }, [])

  const onboarded = isOnboarded()
  if (!onboarded) return <Onboarding />

  const showTabs = ['/', '/search', '/profile'].includes(location.pathname)

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/review" element={<Review />} />
        <Route path="/review/:productId" element={<Review />} />
        <Route path="/category/:cat" element={<CategoryProducts />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      {showTabs && (
        <div className="tab-bar">
          <button className={'tab-item' + (location.pathname === '/' ? ' active' : '')} onClick={() => navigate('/')}>
            <SvgIcon name="home" />
            <span>首页</span>
          </button>
          <button className={'tab-item' + (location.pathname === '/search' ? ' active' : '')} onClick={() => navigate('/search')}>
            <SvgIcon name="search" />
            <span>搜索</span>
          </button>
          <button className="tab-item" onClick={() => navigate('/review')}>
            <SvgIcon name="write" />
            <span>评价</span>
          </button>
          <button className={'tab-item' + (location.pathname === '/profile' ? ' active' : '')} onClick={() => navigate('/profile')}>
            <SvgIcon name="profile" />
            <span>我的</span>
          </button>
        </div>
      )}
    </div>
  )
}





