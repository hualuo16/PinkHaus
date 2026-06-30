// 简单的 localStorage 状态管理
const STORAGE_KEY = 'pink_house_data'

let _listeners = []
let _data = loadData()

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) { }
  return getDefaultData()
}

function getDefaultData() {
  return {
    users: [],
    currentUser: null,
    reviews: [],
    products: [],
    favoriteProducts: [],  // productId[]
    favoriteReviews: [],   // reviewId[]
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(_data))
  _listeners.forEach(fn => fn(_data))
}

export function getData() { return _data }

export function subscribe(fn) {
  _listeners.push(fn)
  return () => { _listeners = _listeners.filter(f => f !== fn) }
}

export function setupUser(nickname, skinType, gender, bio) {
  const user = {
    id: 'u_' + Date.now(),
    nickname,
    skinType,
    gender: gender || 'female',
    bio: bio || '',
    background: 'pink-solid',
    createdAt: new Date().toISOString()
  }
  _data.users.push(user)
  _data.currentUser = user.id
  if (_data.reviews.length === 0) initSampleDataInternal()
  save()
  return user
}

export function getCurrentUser() {
  if (!_data.currentUser) return null
  return _data.users.find(u => u.id === _data.currentUser) || null
}

export function isOnboarded() {
  return _data.currentUser !== null
}

export function updateUserSkinType(skinType) {
  const user = getCurrentUser()
  if (!user) return
  user.skinType = skinType
  save()
}

export function updateUserGender(gender) {
  const user = getCurrentUser()
  if (!user) return
  user.gender = gender
  save()
}

export function updateUserBio(bio) {
  const user = getCurrentUser()
  if (!user) return
  user.bio = bio
  save()
}

export function updateUserBackground(bg) {
  const user = getCurrentUser()
  if (!user) return
  user.background = bg
  save()
}

export const ratingLabels = {
  pink: { label: 'PINK', subtitle: '超级赞', color: '#FF7EB3', bg: '#FFF0F5', order: 0 },
  red: { label: '红榜', subtitle: '推荐', color: '#FF6B6B', bg: '#FFF0F0', order: 1 },
  yellow: { label: '黄榜', subtitle: '一般', color: '#F0B400', bg: '#FFFDF0', order: 2 },
  black: { label: '黑榜', subtitle: '不推荐', color: '#555', bg: '#F5F5F5', order: 3 },
}

export const profileBackgrounds = [
  { id: 'pink-solid', name: '蜜桃粉', type: 'solid', color: '#F8D7DA' },
  { id: 'lavender-solid', name: '薰衣草', type: 'solid', color: '#D7D7F8' },
  { id: 'mint-solid', name: '薄荷', type: 'solid', color: '#D7F8E8' },
  { id: 'sky-solid', name: '天空蓝', type: 'solid', color: '#D7ECF8' },
  { id: 'peach-solid', name: '蜜桃橙', type: 'solid', color: '#F8E0D7' },
  { id: 'pink-stripe', name: '粉条纹', type: 'stripe', color: '#F8D7DA', color2: '#F0C0C5' },
  { id: 'lavender-stripe', name: '紫条纹', type: 'stripe', color: '#D7D7F8', color2: '#C0C0F0' },
  { id: 'pink-dot', name: '粉波点', type: 'dot', color: '#F8D7DA', color2: '#F0C0C5' },
  { id: 'mint-dot', name: '绿波点', type: 'dot', color: '#D7F8E8', color2: '#C0F0D0' },
]

// 收藏管理
export function toggleFavoriteProduct(productId) {
  const idx = _data.favoriteProducts.indexOf(productId)
  if (idx >= 0) { _data.favoriteProducts.splice(idx, 1) }
  else { _data.favoriteProducts.push(productId) }
  save()
}

export function isProductFavorited(productId) {
  return _data.favoriteProducts.includes(productId)
}

export function getFavoriteProducts() {
  return [..._data.favoriteProducts]
}

export function toggleFavoriteReview(reviewId) {
  const idx = _data.favoriteReviews.indexOf(reviewId)
  if (idx >= 0) { _data.favoriteReviews.splice(idx, 1) }
  else { _data.favoriteReviews.push(reviewId) }
  save()
}

export function isReviewFavorited(reviewId) {
  return _data.favoriteReviews.includes(reviewId)
}

export function getFavoriteReviews() {
  return [..._data.favoriteReviews]
}

// 评价管理
export function addReview(productId, rating, content) {
  const user = getCurrentUser()
  if (!user) return null
  const review = {
    id: 'r_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
    userId: user.id,
    productId,
    rating,
    content,
    createdAt: new Date().toISOString()
  }
  _data.reviews.push(review)
  save()
  return review
}

export function getReviewsForProduct(productId) {
  return _data.reviews.filter(r => r.productId === productId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export function getRatingDistribution(productId) {
  const reviews = getReviewsForProduct(productId)
  const dist = { pink: 0, red: 0, yellow: 0, black: 0 }
  reviews.forEach(r => { dist[r.rating]++ })
  return dist
}

export function getFeed() {
  return [..._data.reviews]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export function searchReviews(query, productDB) {
  if (!query || !query.trim()) return []
  const q = query.trim().toLowerCase()
  const matchingProductIds = productDB
    .filter(p => {
      const name = p.name.toLowerCase()
      const brand = p.brand.toLowerCase()
      return name.includes(q) || brand.includes(q)
    })
    .map(p => p.id)
  return _data.reviews
    .filter(r => matchingProductIds.includes(r.productId))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export function getUser(id) {
  return _data.users.find(u => u.id === id)
}

export function resetData() {
  _data = getDefaultData()
  localStorage.removeItem(STORAGE_KEY)
  save()
}

function initSampleDataInternal() {
  const u2 = {
    id: 'u_sample2',
    nickname: '油皮小王',
    skinType: 'oily',
    gender: 'female',
    bio: '混油皮护肤狂魔',
    background: 'lavender-stripe',
    createdAt: new Date().toISOString()
  }
  _data.users.push(u2)
  _data.currentUser = _data.users[0].id

  const samples = [
    { pid: 'p4', uid: _data.users[0].id, rating: 'pink', content: '用了三年了，神仙水真的是油皮亲妈！皮肤变得透亮很多，除了贵没毛病。' },
    { pid: 'p4', uid: u2.id, rating: 'red', content: '还挺好的，控油效果明显，但是味道真的不好闻。' },
    { pid: 'p10', uid: _data.users[0].id, rating: 'red', content: '维稳效果很好，换季必备。质地清爽不油腻。' },
    { pid: 'p10', uid: u2.id, rating: 'pink', content: '小棕瓶一生推！熬夜党救星，第二天皮肤状态超好。' },
    { pid: 'p19', uid: _data.users[0].id, rating: 'black', content: '对我来说太厚重了，会长闭口。干皮朋友说冬天用很不错。' },
    { pid: 'c4', uid: _data.users[0].id, rating: 'pink', content: '双抗真的有效！用了两个月肤色明显亮了，国货之光！' },
    { pid: 'c4', uid: u2.id, rating: 'red', content: '性价比很高，质地清爽夏天用也不油腻。' },
    { pid: 'c1', uid: _data.users[0].id, rating: 'pink', content: '敏感肌救星！换季过敏全靠它，已经回购无数瓶了。' },
    { pid: 'c1', uid: u2.id, rating: 'yellow', content: '对我油皮来说太滋润了，可能干皮更适合。' },
    { pid: 'j11', uid: u2.id, rating: 'pink', content: '珂润面霜yyds！平价又好用，油皮用着也不闷痘。' },
    { pid: 'j11', uid: _data.users[0].id, rating: 'red', content: '温和保湿，敏感期用很安心。' },
    { pid: 'p7', uid: u2.id, rating: 'black', content: '小黑瓶用了半瓶完全没感觉，不会再买。' },
    { pid: 'c18', uid: _data.users[0].id, rating: 'red', content: 'A醇入门不错，肤感细腻，用完会回购。' },
    { pid: 'h8', uid: u2.id, rating: 'pink', content: '色修绝了！新生痘印一周就淡了，红痘印姐妹冲！' },
    { pid: 'p26', uid: _data.users[0].id, rating: 'red', content: 'B5修复霜厚敷yyds，皮肤屏障受损时必用。' },
    { pid: 'c41', uid: u2.id, rating: 'pink', content: '粉水性价比很高，保湿力好又不粘腻，回购好几次了。' },
    { pid: 'j19', uid: u2.id, rating: 'pink', content: '流金水湿敷去闭口效果绝了，已经空瓶3瓶了。' },
    { pid: 'p44', uid: u2.id, rating: 'pink', content: '黑绷带贵有贵的道理！用完皮肤饱满度明显提升。' },
  ]

  samples.forEach(s => {
    _data.reviews.push({
      id: 'r_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      userId: s.uid,
      productId: s.pid,
      rating: s.rating,
      content: s.content,
      createdAt: new Date(Date.now() - Math.random() * 30 * 86400000).toISOString()
    })
  })

  // Add some example favorites
  _data.favoriteProducts.push('p4', 'c4', 'j11')
  _data.favoriteReviews.push(_data.reviews[3].id, _data.reviews[7].id)
  save()
}

export function initSampleData() {
  if (_data.reviews.length > 0) return
  // check if current user already exists from setupUser
  if (!_data.currentUser || !_data.users.find(u => u.id === _data.currentUser)) return
  initSampleDataInternal()
}
