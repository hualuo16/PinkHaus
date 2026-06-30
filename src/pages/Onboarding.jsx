import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { skinTypes, skinTypeDisplay } from '../data/products'
import { setupUser } from '../store/store'

const testQuestions = [
  {
    q: '洗脸后不涂护肤品，多久会觉得脸上出油？',
    options: [
      { text: '1小时以内就油了', value: 'oily' },
      { text: '2-3小时T区开始出油', value: 'combo_oily' },
      { text: '4-5小时才微微出油', value: 'combo_dry' },
      { text: '几乎不出油，甚至觉得干', value: 'dry' },
    ]
  },
  {
    q: '你的脸颊毛孔看起来怎么样？',
    options: [
      { text: '比较粗大明显', value: 'oily' },
      { text: '只有鼻子周围比较明显', value: 'combo' },
      { text: '几乎看不见毛孔', value: 'dry' },
    ]
  },
  {
    q: '你平时长痘痘或闭口的频率？',
    options: [
      { text: '经常长，很困扰', value: 'oily' },
      { text: '偶尔长，换季或熬夜时会', value: 'combo' },
      { text: '很少长痘痘', value: 'dry' },
    ]
  },
]

function calculateSkinType(answers) {
  let oily = 0, combo = 0, dry = 0
  answers.forEach(a => {
    if (a === 'oily') oily++
    else if (a === 'combo_oily') combo += 1.5
    else if (a === 'combo' || a === 'combo_dry') combo++
    else if (a === 'dry') dry++
  })
  if (oily >= dry && oily >= combo) return { type: 'oily', label: '油性皮肤' }
  if (combo >= oily && combo >= dry) return { type: 'combination', label: '混合性皮肤' }
  return { type: 'dry', label: '干性皮肤' }
}

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [nickname, setNickname] = useState('')
  const [gender, setGender] = useState('')
  const [skinType, setSkinType] = useState('')
  const [showSubSkin, setShowSubSkin] = useState(false)
  const [bio, setBio] = useState('')
  const [error, setError] = useState('')
  const [showTest, setShowTest] = useState(null) // null=not asked, true=do test, false=skip
  const [testStep, setTestStep] = useState(0)
  const [testAnswers, setTestAnswers] = useState([])
  const [testResult, setTestResult] = useState(null)

  const handleComplete = () => {
    setupUser(nickname.trim(), skinType, gender, bio.trim())
    navigate('/')
    window.location.reload()
  }

  const startTest = () => {
    setShowTest(true)
    setTestStep(0)
    setTestAnswers([])
    setTestResult(null)
  }

  const handleTestAnswer = (value) => {
    const newAnswers = [...testAnswers, value]
    setTestAnswers(newAnswers)
    if (testStep < testQuestions.length - 1) {
      setTestStep(testStep + 1)
    } else {
      // Calculate result
      const result = calculateSkinType(newAnswers)
      setTestResult(result)
      if (result.type === 'combination') {
        setShowSubSkin(true)
      } else {
        setSkinType(result.type)
        setError('')
      }
    }
  }

  const handleSubSkinSelect = (subId) => {
    setSkinType(subId)
    setShowSubSkin(false)
    setTestResult(null)
    setError('')
    setStep(4)
  }

  const handleSkinSelect = (st) => {
    setError('')
    if (st.subOptions) {
      if (skinType === 'combination_oily' || skinType === 'combination_dry') {
        // Already has a combo selection - show sub options to change
        setShowSubSkin(true)
      } else {
        setShowSubSkin(true)
      }
    } else {
      setSkinType(st.id)
      setShowSubSkin(false)
    }
  }

  // Check if a main skin type is selected (for display)
  const isSkinSelected = (stId) => {
    if (stId === 'combination') {
      return skinType === 'combination_oily' || skinType === 'combination_dry'
    }
    return skinType === stId
  }

  const getSelectedSubLabel = () => {
    if (skinType === 'combination_oily') return '混合-偏油'
    if (skinType === 'combination_dry') return '混合-偏干'
    return ''
  }

  // Steps: 0=welcome, 1=nickname, 2=gender, 3=skin (test/choose), 4=bio, 5=done
  const totalSteps = 5
  const currentStep = showTest ? -1 : (step === 3 && showSubSkin) ? -1 : step

  const steps = ['热情欢迎', '昵称', '性别', '肤质', '签名']

  // === WELCOME STEP ===
  if (step === 0) {
    return (
      <div className="app-container">
        <div className="onboarding-step fade-in">
          <div className="welcome-icon">🏠</div>
          <div className="welcome-title">欢迎加入 PinkHaus！</div>
          <div className="welcome-text">
            姐妹们！你终于来了！🎀<br/><br/>
            这里是 PinkHaus — 一个只聊真实美妆护肤的宝藏小窝<br/>
            没有广告、没有恰饭、只有姐妹们用过之后的真心话<br/><br/>
            想知道某个精华到底值不值得买？<br/>
            想找同肤质的姐妹抄作业？<br/>
            来这里就对了 ✨<br/><br/>
            只需要几步就能进来玩啦～
          </div>
          <button className="btn btn-primary btn-block btn-lg" onClick={() => setStep(1)} style={{ maxWidth: '280px', margin: '0 auto' }}>
            好的，开始设置 →
          </button>
        </div>
      </div>
    )
  }

  // === PROGRESSIVE STEPS ===
  const renderStepIndicator = () => (
    <div className="step-indicator">
      {steps.map((s, i) => (
        <div key={i} className={'step-dot' + (i === currentStep ? ' active' : i < currentStep ? ' done' : '')}></div>
      ))}
    </div>
  )

  // === STEP 1: Nickname ===
  if (step === 1) {
    return (
      <div className="app-container">
        <div className="onboarding-step">
          {renderStepIndicator()}
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>👋</div>
          <h1>怎么称呼你？</h1>
          <p className="step-sub">告诉大家你的昵称，让姐妹们认识你～</p>
          <div className="form-group">
            <input className="form-input" placeholder="输入昵称..." value={nickname} onChange={e => { setNickname(e.target.value); setError('') }} autoFocus />
          </div>
          {error && <p style={{ color: 'var(--red)', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}
          <button className="btn btn-primary btn-block btn-lg" onClick={() => { if (!nickname.trim()) { setError('昵称不能为空哦～'); return } setStep(2) }}>下一步 →</button>
        </div>
      </div>
    )
  }

  // === STEP 2: Gender ===
  if (step === 2) {
    return (
      <div className="app-container">
        <div className="onboarding-step">
          {renderStepIndicator()}
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🧑</div>
          <h1>你的性别？</h1>
          <p className="step-sub">方便姐妹们参考你的护肤偏好</p>
          <div className="gender-select" style={{ maxWidth: '320px', margin: '0 auto 24px' }}>
            {[
              { id: 'female', emoji: '👩', label: '女生' },
              { id: 'male', emoji: '👨', label: '男生' },
              { id: 'other', emoji: '🧑', label: '其他' },
            ].map(g => (
              <div key={g.id} className={'gender-option' + (gender === g.id ? ' selected' : '')} onClick={() => { setGender(g.id); setError('') }}>
                <span className="emoji">{g.emoji}</span>
                <span className="label">{g.label}</span>
              </div>
            ))}
          </div>
          {error && <p style={{ color: 'var(--red)', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}
          <button className="btn btn-primary btn-block btn-lg" onClick={() => { if (!gender) { setError('请选择性别～'); return } setStep(3) }}>下一步 →</button>
        </div>
      </div>
    )
  }

  // === STEP 3: Skin Type (test or manual) ===
  if (step === 3) {
    // Skin test mode
    if (showTest && testStep < testQuestions.length && !testResult) {
      const q = testQuestions[testStep]
      return (
        <div className="app-container">
          <div className="onboarding-step">
            <div className="step-indicator">
              {testQuestions.map((_, i) => (
                <div key={i} className={'step-dot' + (i === testStep ? ' active' : i < testStep ? ' done' : '')}></div>
              ))}
            </div>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔬</div>
            <h1 style={{ fontSize: '20px' }}>肤质测试</h1>
            <p className="step-sub">第 {testStep + 1} 题，共 {testQuestions.length} 题</p>
            <div className="test-question">
              <div className="q-text">{q.q}</div>
              <div className="test-options">
                {q.options.map((opt, i) => (
                  <div key={i} className="test-option" onClick={() => handleTestAnswer(opt.value)}>
                    {opt.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Show sub-skin option for combo
    if (showSubSkin) {
      const comboSt = skinTypes.find(s => s.id === 'combination')
      return (
        <div className="app-container">
          <div className="onboarding-step">
            {renderStepIndicator()}
            <h1>混合性皮肤细分</h1>
            <p className="step-sub">请选择你的具体肤质倾向</p>
            <div className="skin-type-grid" style={{ maxWidth: '320px', margin: '0 auto 16px' }}>
              {comboSt?.subOptions?.map(sub => (
                <div key={sub.id} className={'skin-type-option' + (skinType === sub.id ? ' selected' : '')} onClick={() => handleSubSkinSelect(sub.id)}>
                  <span className="emoji">{sub.emoji}</span>
                  <span className="label">{sub.label}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-secondary btn-block" style={{ maxWidth: '280px', margin: '0 auto' }} onClick={() => { setShowSubSkin(false); if (testResult) setTestResult(null) }}>← 返回</button>
          </div>
        </div>
      )
    }

    // Show test result or manual selection
    const showResult = testResult && !showSubSkin

    return (
      <div className="app-container">
        <div className="onboarding-step">
          {renderStepIndicator()}
          {showResult ? (
            <>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎉</div>
              <h1>测试完成！</h1>
              <p className="step-sub">根据你的回答，你的肤质可能是：</p>
              <div className="card" style={{ maxWidth: '280px', margin: '0 auto 16px', textAlign: 'center', padding: '24px' }}>
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>
                  {{ dry: '🌵', oily: '💧', combination: '🌓' }[testResult.type] || '✨'}
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700 }}>{testResult.type === 'combination' ? '混合性皮肤' : testResult.label}</div>
                {testResult.type === 'combination' && (
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px' }}>请选择偏油还是偏干 👆</p>
                )}
              </div>
              <div style={{ display: 'flex', gap: '8px', maxWidth: '320px', margin: '0 auto' }}>
                <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => { setShowTest(null); setTestResult(null); setTestAnswers([]); setTestStep(0) }}>重新测试</button>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => {
                  if (testResult.type === 'combination') { setShowSubSkin(true); return }
                  setSkinType(testResult.type)
                  setStep(4)
                }}>确认，下一步 →</button>
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🧴</div>
              <h1>了解你的肤质</h1>
              <p className="step-sub">肤质信息会展示在你的每条评价旁，帮助姐妹们参考</p>

              {showTest === null && (
                <div style={{ maxWidth: '320px', margin: '0 auto' }}>
                  <div className="card" style={{ cursor: 'pointer', textAlign: 'center', padding: '20px', marginBottom: '12px' }} onClick={startTest}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔬</div>
                    <div style={{ fontWeight: 600, fontSize: '16px' }}>做个简单的肤质测试</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>3个问题帮你判断肤质</div>
                  </div>
                  <div className="card" style={{ cursor: 'pointer', textAlign: 'center', padding: '20px' }} onClick={() => setShowTest(false)}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>✅</div>
                    <div style={{ fontWeight: 600, fontSize: '16px' }}>我知道自己的肤质，跳过测试</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>直接选择肤质类型</div>
                  </div>
                </div>
              )}

              {showTest === false && (
                <div>
                  <div className="skin-type-grid" style={{ maxWidth: '320px', margin: '0 auto 12px' }}>
                    {skinTypes.map(st => {
                      const selected = isSkinSelected(st.id)
                      return (
                        <div key={st.id} className={'skin-type-option' + (selected ? ' selected' : '')} onClick={() => handleSkinSelect(st)}>
                          <span className="emoji">{st.emoji}</span>
                          <span className="label">{st.label}</span>
                          {selected && st.id === 'combination' && getSelectedSubLabel() && (
                            <div style={{ fontSize: '11px', color: 'var(--pink)', marginTop: '4px' }}>已选: {getSelectedSubLabel()}</div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  <button className="btn btn-secondary" style={{ maxWidth: '280px', margin: '0 auto', display: 'block' }} onClick={() => { setShowTest(null); setSkinType(''); setError('') }}>← 回去做测试</button>
                  {error && <p style={{ color: 'var(--red)', fontSize: '13px', marginTop: '12px' }}>{error}</p>}
                </div>
              )}

              {showTest === false && skinType && !showSubSkin && (
                <button className="btn btn-primary btn-block btn-lg" style={{ maxWidth: '280px', margin: '16px auto 0' }} onClick={() => { if (!skinType) { setError('请选择肤质～'); return } setStep(4) }}>下一步 →</button>
              )}
            </>
          )}
        </div>
      </div>
    )
  }

  // === STEP 4: Bio ===
  if (step === 4) {
    return (
      <div className="app-container">
        <div className="onboarding-step">
          {renderStepIndicator()}
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>✍️</div>
          <h1>个性签名</h1>
          <p className="step-sub">一句话介绍自己，也可以留空～</p>
          <div className="form-group">
            <input className="form-input" placeholder="例如：混油皮护肤狂魔" value={bio} onChange={e => setBio(e.target.value)} autoFocus />
          </div>
          <button className="btn btn-primary btn-block btn-lg" onClick={() => handleComplete()}>完成，进入 PinkHaus！</button>
          <button className="btn btn-secondary btn-block" style={{ marginTop: '8px' }} onClick={() => setStep(3)}>← 上一步</button>
        </div>
      </div>
    )
  }

  return null
}


