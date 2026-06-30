// 化妆品护肤品产品数据库 - 肤质定义
export const skinTypes = [
  { id: 'dry', label: '干性', emoji: '🌵', displayLabel: '干皮' },
  { id: 'oily', label: '油性', emoji: '💧', displayLabel: '油皮' },
  { id: 'combination', label: '混合性', emoji: '🌓', displayLabel: '混合', subOptions: [
    { id: 'combination_oily', label: '混合-偏油', emoji: '🌓', displayLabel: '混油' },
    { id: 'combination_dry', label: '混合-偏干', emoji: '🌓', displayLabel: '混干' },
  ]},
  { id: 'neutral', label: '中性', emoji: '✨', displayLabel: '中性皮' },
  { id: 'sensitive', label: '敏感性', emoji: '🍃', displayLabel: '敏皮' },
]

export const skinTypeDisplay = {
  dry: { emoji: '🌵', label: '干皮' },
  oily: { emoji: '💧', label: '油皮' },
  combination: { emoji: '🌓', label: '混合' },
  combination_oily: { emoji: '🌓', label: '混油' },
  combination_dry: { emoji: '🌓', label: '混干' },
  neutral: { emoji: '✨', label: '中性皮' },
  sensitive: { emoji: '🍃', label: '敏皮' },
}
export const productCategories = [
  { id: 'cleanser', label: '洁面' },
  { id: 'toner', label: '爽肤水/化妆水' },
  { id: 'essence', label: '精华' },
  { id: 'lotion', label: '乳液/面霜' },
  { id: 'sunscreen', label: '防晒' },
  { id: 'mask', label: '面膜' },
  { id: 'eye', label: '眼霜' },
  { id: 'serum', label: '精华液' },
  { id: 'mist', label: '喷雾' },
  { id: 'lip', label: '唇部护理' },
  { id: 'makeup', label: '底妆' },
  { id: 'other', label: '其他' },
]
// 产品数据库
export const productDB = [
  // 国际大牌
  { id: 'p1', brand: 'La Mer', name: '精华面霜', category: 'lotion' },
  { id: 'p2', brand: 'La Mer', name: '浓缩修复精华', category: 'serum' },
  { id: 'p3', brand: 'La Mer', name: '精粹水', category: 'toner' },
  { id: 'p4', brand: 'SK-II', name: '神仙水', category: 'toner' },
  { id: 'p5', brand: 'SK-II', name: '小灯泡精华', category: 'serum' },
  { id: 'p6', brand: 'SK-II', name: '大红瓶面霜', category: 'lotion' },
  { id: 'p7', brand: 'Lancôme', name: '小黑瓶精华', category: 'serum' },
  { id: 'p8', brand: 'Lancôme', name: '粉水', category: 'toner' },
  { id: 'p9', brand: 'Lancôme', name: '菁纯面霜', category: 'lotion' },
  { id: 'p10', brand: 'Estée Lauder', name: '小棕瓶精华', category: 'serum' },
  { id: 'p11', brand: 'Estée Lauder', name: '樱花水', category: 'toner' },
  { id: 'p12', brand: 'Estée Lauder', name: 'DW粉底液', category: 'makeup' },
  { id: 'p13', brand: 'Clinique', name: '黄油乳液', category: 'lotion' },
  { id: 'p14', brand: 'Clinique', name: '洁面皂', category: 'cleanser' },
  { id: 'p15', brand: 'Shiseido', name: '红腰子精华', category: 'serum' },
  { id: 'p16', brand: 'Shiseido', name: '悦薇水乳', category: 'lotion' },
  { id: 'p17', brand: 'Clarins', name: '双萃精华', category: 'serum' },
  { id: 'p18', brand: 'Clarins', name: '防晒', category: 'sunscreen' },
  { id: 'p19', brand: "Kiehl's", name: '高保湿面霜', category: 'lotion' },
  { id: 'p20', brand: "Kiehl's", name: '金盏花水', category: 'toner' },
  { id: 'p21', brand: "Kiehl's", name: '淡斑精华', category: 'serum' },
  { id: 'p22', brand: 'Sulwhasoo', name: '润燥精华', category: 'serum' },
  { id: 'p23', brand: 'Sulwhasoo', name: '滋盈水乳', category: 'lotion' },
  { id: 'p24', brand: 'Whoo', name: '天气丹水乳', category: 'lotion' },
  { id: 'p25', brand: 'Whoo', name: '秘贴精华', category: 'serum' },
  { id: 'p26', brand: 'La Roche-Posay', name: 'B5修复霜', category: 'lotion' },
  { id: 'p27', brand: 'La Roche-Posay', name: '喷雾', category: 'mist' },
  { id: 'p28', brand: 'La Roche-Posay', name: 'K乳', category: 'lotion' },
  { id: 'p29', brand: 'Vichy', name: '89修护精华', category: 'serum' },
  { id: 'p30', brand: 'Avene', name: '雅漾喷雾', category: 'mist' },
  { id: 'p31', brand: 'Avene', name: '修复霜', category: 'lotion' },
  { id: 'p32', brand: 'CeraVe', name: '适乐肤洁面', category: 'cleanser' },
  { id: 'p33', brand: 'CeraVe', name: '适乐肤PM乳', category: 'lotion' },
  { id: 'p34', brand: 'CeraVe', name: '适乐肤C乳', category: 'lotion' },
  { id: 'p35', brand: 'EltaMD', name: '氨基酸洁面', category: 'cleanser' },
  { id: 'p36', brand: 'EltaMD', name: '防晒霜', category: 'sunscreen' },
  { id: 'p37', brand: 'ISDIN', name: '防晒水', category: 'sunscreen' },
  { id: 'p38', brand: 'Drunk Elephant', name: '多酸面膜', category: 'mask' },
  { id: 'p39', brand: 'Drunk Elephant', name: 'B-Hydra保湿精华', category: 'serum' },
  { id: 'p40', brand: 'Chanel', name: '山茶花精华', category: 'serum' },
  { id: 'p41', brand: 'Dior', name: 'Capture面霜', category: 'lotion' },
  { id: 'p42', brand: 'Guerlain', name: '复原蜜精华', category: 'serum' },
  { id: 'p43', brand: 'Guerlain', name: '御庭兰花面霜', category: 'lotion' },
  { id: 'p44', brand: 'HR', name: '黑绷带', category: 'lotion' },
  { id: 'p45', brand: 'HR', name: '绿宝瓶', category: 'serum' },
  { id: 'p46', brand: 'Decorte', name: '紫苏水', category: 'toner' },
  { id: 'p47', brand: 'Decorte', name: '牛油果乳', category: 'lotion' },
  { id: 'p48', brand: 'CPB', name: '肌肤之钥洗面奶', category: 'cleanser' },
  { id: 'p49', brand: 'CPB', name: '水磨精华', category: 'toner' },
  { id: 'p50', brand: 'Albion', name: '健康水', category: 'toner' },
  { id: 'p51', brand: 'Albion', name: '渗透乳', category: 'lotion' },
  { id: 'p52', brand: 'POLA', name: '极光精华', category: 'serum' },
  { id: 'p53', brand: 'POLA', name: '黑BA洗面奶', category: 'cleanser' },
  // 国货品牌
  { id: 'c1', brand: '薇诺娜', name: '特护霜', category: 'lotion' },
  { id: 'c2', brand: '薇诺娜', name: '舒敏保湿洁面', category: 'cleanser' },
  { id: 'c3', brand: '薇诺娜', name: '防晒乳', category: 'sunscreen' },
  { id: 'c4', brand: '珀莱雅', name: '双抗精华', category: 'serum' },
  { id: 'c5', brand: '珀莱雅', name: '红宝石精华', category: 'serum' },
  { id: 'c6', brand: '珀莱雅', name: '源力面霜', category: 'lotion' },
  { id: 'c7', brand: '珀莱雅', name: '弹润水', category: 'toner' },
  { id: 'c8', brand: '玉泽', name: '屏障修护乳', category: 'lotion' },
  { id: 'c9', brand: '玉泽', name: '积雪草面膜', category: 'mask' },
  { id: 'c10', brand: '玉泽', name: '修护面霜', category: 'lotion' },
  { id: 'c11', brand: '花西子', name: '蜜粉', category: 'makeup' },
  { id: 'c12', brand: '完美日记', name: '小细跟口红', category: 'other' },
  { id: 'c13', brand: '完美日记', name: '动物眼影盘', category: 'other' },
  { id: 'c14', brand: '完美日记', name: '珍珠妆前乳', category: 'makeup' },
  { id: 'c15', brand: '至本', name: '洁面乳', category: 'cleanser' },
  { id: 'c16', brand: '至本', name: '舒颜修护乳', category: 'lotion' },
  { id: 'c17', brand: '至本', name: '特安修护精华', category: 'serum' },
  { id: 'c18', brand: 'HBN', name: '视黄醇精华乳', category: 'serum' },
  { id: 'c19', brand: 'HBN', name: '发光水', category: 'toner' },
  { id: 'c20', brand: 'HBN', name: '双A面霜', category: 'lotion' },
  { id: 'c21', brand: '溪木源', name: '层孔菌精华', category: 'serum' },
  { id: 'c22', brand: '溪木源', name: '山茶花面膜', category: 'mask' },
  { id: 'c23', brand: '溪木源', name: '洁面泡沫', category: 'cleanser' },
  { id: 'c24', brand: '瑷尔博士', name: '前导精华', category: 'serum' },
  { id: 'c25', brand: '瑷尔博士', name: '洁颜蜜', category: 'cleanser' },
  { id: 'c26', brand: '瑷尔博士', name: '益生菌水乳', category: 'lotion' },
  { id: 'c27', brand: '佰草集', name: '太极精华', category: 'serum' },
  { id: 'c28', brand: '佰草集', name: '新七白面膜', category: 'mask' },
  { id: 'c29', brand: '自然堂', name: '小紫瓶精华', category: 'serum' },
  { id: 'c30', brand: '自然堂', name: '冰肌水', category: 'toner' },
  { id: 'c31', brand: '相宜本草', name: '红景天面霜', category: 'lotion' },
  { id: 'c32', brand: '相宜本草', name: '龙胆洁面', category: 'cleanser' },
  { id: 'c33', brand: '百雀羚', name: '帧颜霜', category: 'lotion' },
  { id: 'c34', brand: '百雀羚', name: '甘油一号', category: 'lotion' },
  { id: 'c35', brand: '润百颜', name: '玻尿酸次抛', category: 'serum' },
  { id: 'c36', brand: '润百颜', name: '白纱布面膜', category: 'mask' },
  { id: 'c37', brand: '夸迪', name: '蓝次抛精华', category: 'serum' },
  { id: 'c38', brand: '夸迪', name: '悬油次抛', category: 'serum' },
  { id: 'c39', brand: '可复美', name: '胶原棒次抛', category: 'serum' },
  { id: 'c40', brand: '可复美', name: '涂抹面膜', category: 'mask' },
  { id: 'c41', brand: '米蓓尔', name: '粉水', category: 'toner' },
  { id: 'c42', brand: '米蓓尔', name: '蓝绷带面膜', category: 'mask' },
  { id: 'c43', brand: 'PMPM', name: '玫瑰精华', category: 'serum' },
  { id: 'c44', brand: 'PMPM', name: '海糖乳', category: 'lotion' },
  { id: 'c45', brand: '雏菊的天空', name: '翡冷翠精华', category: 'serum' },
  { id: 'c46', brand: '雏菊的天空', name: '白檀面霜', category: 'lotion' },
  // 日韩品牌
  { id: 'j1', brand: 'SK-II', name: '前男友面膜', category: 'mask' },
  { id: 'j2', brand: 'Amorepacific', name: '绿茶精华水', category: 'toner' },
  { id: 'j3', brand: 'Laneige', name: '睡眠面膜', category: 'mask' },
  { id: 'j4', brand: 'Laneige', name: '唇膜', category: 'lip' },
  { id: 'j5', brand: 'Innisfree', name: '绿茶精华', category: 'serum' },
  { id: 'j6', brand: 'Innisfree', name: '火山泥面膜', category: 'mask' },
  { id: 'j7', brand: 'Muji', name: '敏感肌水乳', category: 'lotion' },
  { id: 'j8', brand: 'Muji', name: '洁面乳', category: 'cleanser' },
  { id: 'j9', brand: 'Hada Labo', name: '极润水', category: 'toner' },
  { id: 'j10', brand: 'Hada Labo', name: '极润面霜', category: 'lotion' },
  { id: 'j11', brand: 'Curel', name: '面霜', category: 'lotion' },
  { id: 'j12', brand: 'Curel', name: '洁面泡沫', category: 'cleanser' },
  { id: 'j13', brand: 'Minon', name: '氨基酸面膜', category: 'mask' },
  { id: 'j14', brand: 'Minon', name: '化妆水', category: 'toner' },
  { id: 'j15', brand: 'DHC', name: '橄榄卸妆油', category: 'cleanser' },
  { id: 'j16', brand: 'DHC', name: '唇膏', category: 'lip' },
  { id: 'j17', brand: 'Fancl', name: '卸妆油', category: 'cleanser' },
  { id: 'j18', brand: 'Fancl', name: '防晒霜', category: 'sunscreen' },
  { id: 'j19', brand: 'IPSA', name: '流金水', category: 'toner' },
  { id: 'j20', brand: 'IPSA', name: '自律乳', category: 'lotion' },
  { id: 'j21', brand: 'Three', name: '植物卸妆油', category: 'cleanser' },
  { id: 'j22', brand: 'RMK', name: '粉底液', category: 'makeup' },

  // 更多热门单品
  { id: 'h1', brand: '安热沙', name: '小金瓶防晒', category: 'sunscreen' },
  { id: 'h2', brand: 'Supergoop', name: '防晒霜', category: 'sunscreen' },
  { id: 'h3', brand: '露得清', name: 'A醇晚霜', category: 'lotion' },
  { id: 'h4', brand: '露得清', name: '水杨酸洁面', category: 'cleanser' },
  { id: 'h5', brand: '宝拉珍选', name: '水杨酸精华', category: 'serum' },
  { id: 'h6', brand: 'The Ordinary', name: '烟酰胺精华', category: 'serum' },
  { id: 'h7', brand: 'The Ordinary', name: '透明质酸精华', category: 'serum' },
  { id: 'h8', brand: '修丽可', name: 'CE抗氧化精华', category: 'serum' },
  { id: 'h9', brand: '修丽可', name: '色修精华', category: 'serum' },
  { id: 'h10', brand: '修丽可', name: 'B5保湿精华', category: 'serum' },
  { id: 'h11', brand: '欧莱雅', name: '紫熨斗眼霜', category: 'eye' },
  { id: 'h12', brand: '欧莱雅', name: '复颜玻尿酸精华', category: 'serum' },
  { id: 'h13', brand: '欧莱雅', name: '黑精华', category: 'serum' },
  { id: 'h14', brand: '欧莱雅', name: '注白瓶精华', category: 'serum' },
  { id: 'h15', brand: 'OLAY', name: '小白瓶精华', category: 'serum' },
  { id: 'h16', brand: 'OLAY', name: '大红瓶面霜', category: 'lotion' },
  { id: 'h17', brand: 'OLAY', name: '超红瓶面霜', category: 'lotion' },
  { id: 'h18', brand: '科颜氏', name: '白泥面膜', category: 'mask' },
  { id: 'h19', brand: '科颜氏', name: 'VC精华', category: 'serum' },
  { id: 'h20', brand: 'Farmacy', name: '蜂蜜面膜', category: 'mask' },
  { id: 'h21', brand: 'Farmacy', name: '卸妆膏', category: 'cleanser' },
  { id: 'h22', brand: '植村秀', name: '琥珀卸妆油', category: 'cleanser' },
  { id: 'h23', brand: '植村秀', name: '小方瓶粉底', category: 'makeup' },
  { id: 'h24', brand: 'MAC', name: '定制无暇粉底', category: 'makeup' },
  { id: 'h25', brand: 'NARS', name: '超方瓶粉底', category: 'makeup' },
  { id: 'h26', brand: 'NARS', name: '大白饼', category: 'makeup' },
  { id: 'h27', brand: 'Tom Ford', name: '眼影盘', category: 'other' },
  { id: 'h28', brand: 'Tom Ford', name: '气垫', category: 'makeup' },
  { id: 'h29', brand: '兰蔻', name: '持妆粉底', category: 'makeup' },
  { id: 'h30', brand: '兰蔻', name: '菁纯气垫', category: 'makeup' },
  { id: 'h31', brand: 'YSL', name: '粉底液', category: 'makeup' },
  { id: 'h32', brand: '阿玛尼', name: '权利粉底', category: 'makeup' },
  { id: 'h33', brand: 'CT', name: '魔法面霜', category: 'lotion' },
  { id: 'h34', brand: 'CT', name: '蜜粉饼', category: 'makeup' },
  { id: 'h35', brand: 'Bobbi Brown', name: '橘子面霜', category: 'lotion' },
  { id: 'h36', brand: 'Bobbi Brown', name: '虫草粉底', category: 'makeup' },
  { id: 'h37', brand: 'Tatcha', name: '紫米面霜', category: 'lotion' },
  { id: 'h38', brand: 'Tatcha', name: '山茶花卸妆油', category: 'cleanser' },
  { id: 'h39', brand: 'Augustinus Bader', name: '蓝钻面霜', category: 'lotion' },
  { id: 'h40', brand: 'Valmont', name: '幸福面膜', category: 'mask' },
  { id: 'h41', brand: 'Valmont', name: '生命之泉', category: 'toner' },
]
// 搜索函数
export function searchProducts(query) {
  if (!query || query.trim().length === 0) return []
  const q = query.trim().toLowerCase()
  return productDB.filter(p => {
    const name = p.name.toLowerCase()
    const brand = p.brand.toLowerCase()
    const aliases = getBrandAliases(p.brand).map(a => a.toLowerCase())
    const terms = [name, brand, ...aliases]
    return terms.some(t => t.includes(q)) ||
      q.split(/[\s,，]/).every(term =>
        term.length > 0 && terms.some(t => t.includes(term))
      )
  }).slice(0, 15)
}

function getBrandAliases(brand) {
  const map = {
    'La Mer': ['海蓝之谜'],
    'SK-II': ['sk2', 'skii'],
    "Lanc\u00f4me": ['兰蔻'],
    'Est\u00e9e Lauder': ['雅诗兰黛'],
    'Clinique': ['倩碧'],
    'Shiseido': ['资生堂'],
    'Clarins': ['娇韵诗'],
    "Kiehl's": ['科颜氏'],
    'Sulwhasoo': ['雪花秀'],
    'Whoo': ['后'],
    'La Roche-Posay': ['理肤泉'],
    'Vichy': ['薇姿'],
    'Avene': ['雅漾'],
    'CeraVe': ['适乐肤'],
    'EltaMD': ['elta'],
    'ISDIN': ['怡思丁'],
    'Drunk Elephant': ['醉象'],
    'Guerlain': ['娇兰'],
    'HR': ['赫莲娜'],
    'Decorte': ['黛珂'],
    'CPB': ['肌肤之钥'],
    'Albion': ['奥尔滨'],
    'POLA': ['宝丽'],
    'Innisfree': ['悦诗风吟'],
    'Laneige': ['兰芝'],
    'Muji': ['无印良品'],
    'Hada Labo': ['肌研'],
    'Curel': ['珂润'],
    'Minon': ['蜜浓'],
    'DHC': ['蝶翠诗'],
    'Fancl': ['芳珂'],
    'IPSA': ['茵芙莎'],
    'Three': ['思丽'],
    'Amorepacific': ['爱茉莉'],
    'The Ordinary': ['ordinary'],
    'Tom Ford': ['TF', '汤姆福特'],
    'YSL': ['圣罗兰'],
    'Bobbi Brown': ['芭比波朗'],
    'CT': ['Charlotte Tilbury'],
    'Valmont': ['法尔曼'],
    'Augustinus Bader': ['ab面霜'],
  }
  return map[brand] || []
}

export function getAllBrands() {
  return [...new Set(productDB.map(p => p.brand))].sort()
}

export function getProductById(id) {
  return productDB.find(p => p.id === id)
}

export function formatProduct(product) {
  if (!product) return ''
  return product.brand + ' ' + product.name
}



// 生成商品占位图（SVG data URL）
export function generateProductImage(product) {
  const colors = [
    '#F8D7DA,#F0C0C5', '#D7D7F8,#C0C0F0', '#D7F8E8,#C0F0D0',
    '#F8E0D7,#F0D0C0', '#D7ECF8,#C0E0F0', '#F8F0D7,#F0E8C0',
    '#E8D7F8,#D8C0F0', '#F8D7EC,#F0C0E0'
  ]
  const hash = product.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const gradient = colors[hash % colors.length]
  const [c1, c2] = gradient.split(',')
  const initials = (product.brand[0] || '') + (product.name[0] || '')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${c1}"/><stop offset="100%" style="stop-color:${c2}"/></linearGradient></defs>
    <rect width="200" height="200" fill="url(#g)" rx="12"/>
    <circle cx="100" cy="80" r="35" fill="rgba(255,255,255,0.4)"/>
    <text x="100" y="92" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="28" font-weight="bold">${initials}</text>
    <text x="100" y="140" text-anchor="middle" fill="#fff" font-size="13" font-weight="600" opacity="0.9">${product.brand}</text>
    <text x="100" y="160" text-anchor="middle" fill="#fff" font-size="11" opacity="0.7">${product.name}</text>
  </svg>`
  return 'data:image/svg+xml,' + encodeURIComponent(svg)
}
