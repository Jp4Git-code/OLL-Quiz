import { useState, useCallback } from 'react'
import QUESTIONS from './questions.js'

const PASSWORD = 'OSLw2026'
const STORAGE_KEY = 'whr_fehler_v1'

function loadFehler() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}
function saveFehler(ids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}

// ── Screens ──────────────────────────────────────────────────
const SCREEN = { LOGIN: 'login', HOME: 'home', QUIZ: 'quiz', RESULT: 'result' }

export default function App() {
  const [screen, setScreen] = useState(SCREEN.LOGIN)
  const [pwInput, setPwInput] = useState('')
  const [pwError, setPwError] = useState(false)

  const [mode, setMode] = useState('all')
  const [queue, setQueue] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState([])
  const [textAnswers, setTextAnswers] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState({ correct: 0, wrong: 0, skipped: 0 })
  const [fehlerIds, setFehlerIds] = useState(loadFehler)

  // ── Auth ──
  function handleLogin() {
    if (pwInput === PASSWORD) { setScreen(SCREEN.HOME); setPwError(false) }
    else setPwError(true)
  }

  // ── Queue builder – Dokumentreihenfolge, kein Shuffle ──
  function buildQueue(m) {
    if (m === 'fehler') return QUESTIONS.filter(q => fehlerIds.includes(q.id))
    return [...QUESTIONS]
  }

  function startQuiz(m) {
    const q = buildQueue(m)
    setMode(m)
    setQueue(q)
    setCurrent(0)
    setSelected([])
    setTextAnswers([])
    setSubmitted(false)
    setScore({ correct: 0, wrong: 0, skipped: 0 })
    setScreen(SCREEN.QUIZ)
  }

  // ── Evaluation ──
  function evalMulti(q) {
    return JSON.stringify([...selected].sort((a,b)=>a-b)) ===
           JSON.stringify([...q.correct].sort((a,b)=>a-b))
  }
  function evalText(q) {
    return q.fields.map((f, i) =>
      (textAnswers[i] || '').trim().toLowerCase().replace(/\s+/g,' ') ===
      f.answer.trim().toLowerCase().replace(/\s+/g,' ')
    )
  }

  function submitAnswer() {
    const q = queue[current]
    const ok = q.type === 'multi' ? evalMulti(q) : evalText(q).every(Boolean)
    const newFehler = ok
      ? fehlerIds.filter(id => id !== q.id)
      : fehlerIds.includes(q.id) ? fehlerIds : [...fehlerIds, q.id]
    setFehlerIds(newFehler)
    saveFehler(newFehler)
    setScore(s => ok ? { ...s, correct: s.correct + 1 } : { ...s, wrong: s.wrong + 1 })
    setSubmitted(true)
  }

  function advance() {
    const next = current + 1
    setSelected([])
    setTextAnswers([])
    setSubmitted(false)
    if (next >= queue.length) { setScreen(SCREEN.RESULT); return }
    setCurrent(next)
  }

  function skipQuestion() {
    setScore(s => ({ ...s, skipped: s.skipped + 1 }))
    advance()
  }

  function clearFehler() {
    setFehlerIds([])
    saveFehler([])
  }

  function toggleOption(idx) {
    if (submitted) return
    setSelected(sel => sel.includes(idx) ? sel.filter(i => i !== idx) : [...sel, idx])
  }

  function setTextField(idx, val) {
    setTextAnswers(ta => { const n = [...ta]; n[idx] = val; return n })
  }

  // ── Render ──
  if (screen === SCREEN.LOGIN) return <LoginScreen pwInput={pwInput} setPwInput={setPwInput} pwError={pwError} onLogin={handleLogin} />
  if (screen === SCREEN.HOME) return <HomeScreen fehlerCount={fehlerIds.length} onStart={startQuiz} onClearFehler={clearFehler} totalCount={QUESTIONS.length} />
  if (screen === SCREEN.RESULT) return <ResultScreen score={score} fehlerCount={fehlerIds.length} onRestart={() => startQuiz('all')} onFehler={() => startQuiz('fehler')} onHome={() => setScreen(SCREEN.HOME)} />

  // QUIZ
  const q = queue[current]
  if (!q) { setScreen(SCREEN.RESULT); return null }
  const total = queue.length
  const pct = Math.round((current / total) * 100)

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <div style={styles.headerTitle}>⚖️ Wehrrecht Prüfungsquiz{mode === 'fehler' ? ' · Fehlermodus' : ''}</div>
          <div style={styles.headerSub}>Frage {current + 1} von {total}</div>
        </div>
        <button style={styles.btnSecondary} onClick={() => setScreen(SCREEN.HOME)}>⬅ Menü</button>
      </div>

      <div style={styles.statsRow}>
        <span style={{...styles.pill, ...styles.pillCorrect}}>✓ {score.correct}</span>
        <span style={{...styles.pill, ...styles.pillWrong}}>✗ {score.wrong}</span>
        <span style={{...styles.pill, ...styles.pillFehler}}>⚠ Fehler: {fehlerIds.length}</span>
      </div>

      <div style={styles.progressWrap}><div style={{...styles.progressFill, width: `${pct}%`}} /></div>
      <div style={{...styles.progressText, marginBottom: 14}}>{pct}% abgeschlossen</div>

      <div style={styles.card}>
        <div style={styles.qMeta}>Frage {q.id} · {q.type === 'multi' ? 'Mehrfachauswahl' : 'Freitext'}</div>
        <div style={styles.qTopic}>{q.topic}</div>
        <div style={styles.qText}>{q.q}</div>

        {q.type === 'multi'
          ? q.options.map((opt, i) => {
              const isCor = q.correct.includes(i)
              const isSel = selected.includes(i)
              let bg = '#0d1b2a', border = '#2a4a6b', color = '#c0d0e0'
              if (!submitted && isSel) { bg = '#1a2f4a'; border = '#3b7dd8' }
              if (submitted && isCor && isSel)  { bg = '#0a1f14'; border = '#52b788' }
              if (submitted && !isCor && isSel) { bg = '#1f0a0a'; border = '#f08080' }
              if (submitted && isCor && !isSel) { bg = '#1f1508'; border = '#f4a942' }
              const mark = submitted ? (isCor ? '✓' : isSel ? '✗' : '') : (isSel ? '✓' : '')
              const boxBg = submitted
                ? (isCor && isSel ? '#52b788' : !isCor && isSel ? '#f08080' : isCor ? '#f4a942' : '#2a4a6b')
                : (isSel ? '#3b7dd8' : '#2a4a6b')
              return (
                <div key={i} onClick={() => toggleOption(i)}
                  style={{...styles.option, background: bg, borderColor: border, cursor: submitted ? 'default' : 'pointer'}}>
                  <div style={{...styles.optionBox, background: boxBg, color: 'white'}}>{mark}</div>
                  <div style={{...styles.optionText, color}}>{opt}</div>
                </div>
              )
            })
          : q.fields.map((f, i) => {
              const res = submitted ? evalText(q) : null
              const ok = res ? res[i] : null
              return (
                <div key={i} style={{marginBottom: 10}}>
                  <div style={styles.inputLabel}>{f.label}</div>
                  <input
                    style={{...styles.inputField, borderColor: submitted ? (ok ? '#52b788' : '#f08080') : '#2a4a6b', background: submitted ? (ok ? '#0a1f14' : '#1f0a0a') : '#0d1b2a'}}
                    value={textAnswers[i] || ''}
                    onChange={e => setTextField(i, e.target.value)}
                    readOnly={submitted}
                    placeholder="Antwort eingeben…"
                  />
                  {submitted && !ok && <div style={styles.hint}>✓ Erwartet: {f.answer}</div>}
                </div>
              )
            })
        }

        {submitted && (() => {
          let ok, cls
          if (q.type === 'multi') {
            ok = evalMulti(q)
            cls = ok ? 'correct' : 'wrong'
          } else {
            const res = evalText(q)
            ok = res.every(Boolean)
            cls = ok ? 'correct' : res.some(Boolean) ? 'partial' : 'wrong'
          }
          const title = ok ? '✅ Richtig!' : cls === 'partial' ? '⚠️ Teilweise richtig' : '❌ Nicht vollständig richtig'
          const fbStyle = ok ? styles.fbCorrect : cls === 'partial' ? styles.fbPartial : styles.fbWrong
          return <div style={fbStyle}><strong>{title}</strong></div>
        })()}

        <div style={styles.btnRow}>
          {!submitted
            ? <>
                <button style={styles.btnPrimary} onClick={submitAnswer}>Auswerten</button>
                <button style={styles.btnSecondary} onClick={skipQuestion}>Überspringen</button>
              </>
            : <button style={styles.btnPrimary} onClick={advance}>
                {current + 1 < total ? 'Nächste Frage ›' : 'Ergebnis anzeigen'}
              </button>
          }
        </div>
      </div>
    </div>
  )
}

// ── Sub-screens ───────────────────────────────────────────────
function LoginScreen({ pwInput, setPwInput, pwError, onLogin }) {
  return (
    <div style={{...styles.page, display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh'}}>
      <div style={{...styles.card, maxWidth: 340, width: '100%', textAlign: 'center'}}>
        <div style={{fontSize:'2rem', marginBottom:12}}>⚖️</div>
        <div style={{...styles.headerTitle, marginBottom:4}}>Wehrrecht Prüfungsquiz</div>
        <div style={{...styles.headerSub, marginBottom:24}}>OSLw · Zugang mit Passwort</div>
        <input
          style={{...styles.inputField, textAlign:'center', marginBottom: 8, fontSize:'1rem'}}
          type="password"
          placeholder="Passwort eingeben"
          value={pwInput}
          onChange={e => setPwInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onLogin()}
        />
        {pwError && <div style={{color:'#f08080', fontSize:'0.82rem', marginBottom:8}}>Falsches Passwort</div>}
        <button style={{...styles.btnPrimary, width:'100%'}} onClick={onLogin}>Anmelden</button>
      </div>
    </div>
  )
}

function HomeScreen({ fehlerCount, onStart, onClearFehler, totalCount }) {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <div style={styles.headerTitle}>⚖️ Wehrrecht Prüfungsquiz</div>
          <div style={styles.headerSub}>OSLw · {totalCount} Fragen · Reihenfolge wie im Dokument</div>
        </div>
      </div>
      <div style={{textAlign:'center', padding: '20px 0'}}>
        <div style={{fontSize:'1.3rem', fontWeight:700, color:'#7eb8f7', marginBottom:8}}>Modus wählen</div>
        <div style={{color:'#8ab0d0', fontSize:'0.88rem', marginBottom:28}}>
          Fragen erscheinen in der Reihenfolge der Word-Datei. Antwortoptionen bleiben unverändert.
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, maxWidth:520, margin:'0 auto 24px'}}>
          <ModeCard icon="📋" title="Alle Fragen" desc={`Alle ${totalCount} Fragen in Dokumentreihenfolge`} onClick={() => onStart('all')} />
          <ModeCard
            icon="🔁"
            title="Fehler wiederholen"
            desc={fehlerCount > 0 ? `${fehlerCount} Fragen in Dokumentreihenfolge` : 'Noch keine Fehler gespeichert'}
            onClick={fehlerCount > 0 ? () => onStart('fehler') : null}
            disabled={fehlerCount === 0}
          />
        </div>
        {fehlerCount > 0 &&
          <button style={styles.btnDanger} onClick={onClearFehler}>🗑 Fehlerliste leeren</button>
        }
      </div>
    </div>
  )
}

function ModeCard({ icon, title, desc, onClick, disabled }) {
  return (
    <div onClick={disabled ? undefined : onClick} style={{
      background: '#152236', border: '1px solid #2a4a6b', borderRadius: 10,
      padding: 20, cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1, textAlign: 'left',
      transition: 'border-color 0.2s'
    }}>
      <div style={{fontSize:'1.6rem', marginBottom:8}}>{icon}</div>
      <div style={{fontWeight:700, color:'#d0dcea', fontSize:'0.95rem', marginBottom:4}}>{title}</div>
      <div style={{fontSize:'0.78rem', color:'#8ab0d0', lineHeight:1.4}}>{desc}</div>
    </div>
  )
}

function ResultScreen({ score, fehlerCount, onRestart, onFehler, onHome }) {
  const total = score.correct + score.wrong + score.skipped
  const pct = total > 0 ? Math.round((score.correct / total) * 100) : 0
  const grade = pct >= 90 ? '🏆 Ausgezeichnet' : pct >= 75 ? '👍 Gut' : pct >= 60 ? '📚 Bestanden' : '🔁 Weiterüben'
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div><div style={styles.headerTitle}>⚖️ Wehrrecht · Ergebnis</div></div>
        <button style={styles.btnSecondary} onClick={onHome}>⬅ Menü</button>
      </div>
      <div style={{...styles.card, textAlign:'center'}}>
        <div style={{fontSize:'1rem', color:'#8ab0d0'}}>Gesamtergebnis</div>
        <div style={{fontSize:'3rem', fontWeight:700, color:'#7eb8f7', margin:'16px 0'}}>{pct}%</div>
        <div style={{fontSize:'1rem', color:'#8ab0d0', marginBottom:24}}>{grade}</div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:24}}>
          {[['✓ Richtig', score.correct, '#52b788'],['✗ Falsch', score.wrong, '#f08080'],['→ Übersprungen', score.skipped, '#7eb8f7']].map(([label, val, color]) => (
            <div key={label} style={{background:'#0d1b2a', border:'1px solid #2a4a6b', borderRadius:8, padding:14}}>
              <div style={{fontSize:'1.6rem', fontWeight:700, color}}>{val}</div>
              <div style={{fontSize:'0.75rem', color:'#8ab0d0', marginTop:4}}>{label}</div>
            </div>
          ))}
        </div>
        <div style={styles.btnRow}>
          <button style={styles.btnPrimary} onClick={onRestart}>Neu starten</button>
          {fehlerCount > 0 && <button style={styles.btnSecondary} onClick={onFehler}>Fehler wiederholen ({fehlerCount})</button>}
        </div>
      </div>
    </div>
  )
}

// ── Styles ────────────────────────────────────────────────────
const styles = {
  page: { maxWidth: 860, margin: '0 auto', padding: 16 },
  header: { background: 'linear-gradient(135deg,#1a2f4a 0%,#0d1b2a 100%)', border: '1px solid #2a4a6b', borderRadius: 12, padding: '20px 24px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 },
  headerTitle: { fontSize: '1.15rem', fontWeight: 700, color: '#7eb8f7', letterSpacing: '0.5px' },
  headerSub: { fontSize: '0.78rem', color: '#8ab0d0', marginTop: 2 },
  statsRow: { display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap' },
  pill: { background: '#1a2f4a', border: '1px solid #2a4a6b', borderRadius: 20, padding: '5px 14px', fontSize: '0.78rem', color: '#8ab0d0' },
  pillCorrect: { borderColor: '#2d6a4f', color: '#52b788' },
  pillWrong: { borderColor: '#7d3030', color: '#f08080' },
  pillFehler: { borderColor: '#6b4a10', color: '#f4a942' },
  progressWrap: { background: '#1a2f4a', borderRadius: 6, height: 8, overflow: 'hidden', marginBottom: 6 },
  progressFill: { height: '100%', background: 'linear-gradient(90deg,#3b7dd8,#7eb8f7)', borderRadius: 6, transition: 'width 0.4s ease' },
  progressText: { fontSize: '0.75rem', color: '#8ab0d0' },
  card: { background: '#152236', border: '1px solid #2a4a6b', borderRadius: 12, padding: 22, marginBottom: 16 },
  qMeta: { fontSize: '0.72rem', color: '#5a8ab0', marginBottom: 8, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase' },
  qTopic: { fontSize: '0.78rem', color: '#7eb8f7', marginBottom: 10, fontStyle: 'italic' },
  qText: { fontSize: '0.97rem', lineHeight: 1.55, color: '#d0dcea', marginBottom: 18, whiteSpace: 'pre-wrap' },
  option: { display: 'flex', alignItems: 'flex-start', gap: 12, padding: '11px 14px', borderRadius: 8, border: '1px solid #2a4a6b', marginBottom: 8, transition: 'all 0.15s', userSelect: 'none' },
  optionBox: { width: 20, height: 20, borderRadius: 4, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', marginTop: 1, color: 'white' },
  optionText: { fontSize: '0.88rem', lineHeight: 1.45, flex: 1 },
  inputLabel: { fontSize: '0.8rem', color: '#8ab0d0', marginBottom: 4 },
  inputField: { width: '100%', background: '#0d1b2a', border: '1px solid #2a4a6b', borderRadius: 6, color: '#e8edf2', fontSize: '0.88rem', padding: '8px 12px', outline: 'none' },
  hint: { fontSize: '0.78rem', color: '#f4a942', marginTop: 3 },
  fbCorrect: { marginTop: 14, padding: '12px 16px', borderRadius: 8, background: '#0a1f14', border: '1px solid #2d6a4f', color: '#74c69d' },
  fbPartial: { marginTop: 14, padding: '12px 16px', borderRadius: 8, background: '#1a1508', border: '1px solid #8b6914', color: '#f4a942' },
  fbWrong: { marginTop: 14, padding: '12px 16px', borderRadius: 8, background: '#1f0a0a', border: '1px solid #6b2020', color: '#f08080' },
  btnRow: { display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' },
  btnPrimary: { padding: '9px 20px', borderRadius: 8, border: 'none', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', background: '#3b7dd8', color: 'white' },
  btnSecondary: { padding: '9px 20px', borderRadius: 8, border: '1px solid #2a4a6b', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', background: '#1a2f4a', color: '#7eb8f7' },
  btnDanger: { padding: '9px 20px', borderRadius: 8, border: '1px solid #a04040', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', background: '#7d3030', color: '#ffb0b0' },
}
