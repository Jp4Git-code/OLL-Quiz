import React, { useMemo, useState, useEffect } from "react";
import { Check, X, RotateCcw, ChevronRight, ChevronLeft, BookOpen, ShieldCheck, GraduationCap, ListChecks } from "lucide-react";
import { QUESTIONS } from "./data/questions.js";

function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sameSet(a, b) {
  return a.length === b.length && a.every(x => b.includes(x));
}

function topicLabel(topic) {
  if (!topic) return "Allgemein";
  return topic.replace("Block 1 – ", "").replace("Block 2 – ", "").trim();
}

export default function App() {
  const topics = useMemo(() => Array.from(new Set(QUESTIONS.map(q => q.topic))).filter(Boolean), []);
  const [screen, setScreen] = useState("start");
  const [mode, setMode] = useState("learn");
  const [selectedTopics, setSelectedTopics] = useState(topics);
  const [amount, setAmount] = useState(30);
  const [pool, setPool] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState({});
  const [wrongIds, setWrongIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem("oll-wrong-ids") || "[]"); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("oll-wrong-ids", JSON.stringify(wrongIds));
  }, [wrongIds]);

  const available = useMemo(() => QUESTIONS.filter(q => selectedTopics.includes(q.topic)), [selectedTopics]);

  function startQuiz(useWrongOnly = false) {
    let base = useWrongOnly ? QUESTIONS.filter(q => wrongIds.includes(q.id)) : available;
    if (mode === "exam") base = shuffle(base).slice(0, Math.min(amount, base.length));
    else base = shuffle(base);
    setPool(base);
    setIdx(0);
    setSelected([]);
    setRevealed(false);
    setAnswers({});
    setScreen("quiz");
  }

  function toggleTopic(topic) {
    setSelectedTopics(prev => prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]);
  }

  function choose(optionIndex) {
    if (revealed) return;
    const q = pool[idx];
    if (q.multi) {
      setSelected(prev => prev.includes(optionIndex) ? prev.filter(x => x !== optionIndex) : [...prev, optionIndex]);
    } else {
      setSelected([optionIndex]);
    }
  }

  function checkAnswer() {
    const q = pool[idx];
    const correct = sameSet([...selected].sort(), [...q.correct].sort());
    setAnswers(prev => ({ ...prev, [q.id]: { correct, selected } }));
    setWrongIds(prev => {
      const set = new Set(prev);
      if (correct) set.delete(q.id);
      else set.add(q.id);
      return [...set];
    });
    setRevealed(true);
  }

  function next() {
    if (idx + 1 >= pool.length) {
      setScreen("result");
      return;
    }
    setIdx(idx + 1);
    setSelected([]);
    setRevealed(false);
  }

  function prev() {
    if (idx === 0) return;
    setIdx(idx - 1);
    const previous = answers[pool[idx - 1].id];
    setSelected(previous?.selected || []);
    setRevealed(Boolean(previous));
  }

  const score = Object.values(answers).filter(a => a.correct).length;
  const answered = Object.keys(answers).length;
  const q = pool[idx];

  if (screen === "start") {
    return (
      <div className="shell start">
        <main className="start-card">
          <div className="logo"><GraduationCap size={36}/></div>
          <p className="eyebrow">OLL Rechtsprüfung</p>
          <h1>OLL-Quiz</h1>
          <p className="subtitle">{QUESTIONS.length} importierte Fragen aus deiner Word-Datei</p>

          <section className="panel">
            <h2>Modus</h2>
            <div className="segmented">
              <button className={mode === "learn" ? "active" : ""} onClick={() => setMode("learn")}>Lernmodus</button>
              <button className={mode === "exam" ? "active" : ""} onClick={() => setMode("exam")}>Prüfungsmodus</button>
            </div>
            {mode === "exam" && (
              <label className="amount">Fragenanzahl
                <select value={amount} onChange={e => setAmount(Number(e.target.value))}>
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={QUESTIONS.length}>Alle</option>
                </select>
              </label>
            )}
          </section>

          <section className="panel">
            <div className="row-between">
              <h2>Themen</h2>
              <button className="link" onClick={() => setSelectedTopics(selectedTopics.length === topics.length ? [] : topics)}>
                {selectedTopics.length === topics.length ? "Alle abwählen" : "Alle wählen"}
              </button>
            </div>
            <div className="topics">
              {topics.map(topic => {
                const count = QUESTIONS.filter(q => q.topic === topic).length;
                const active = selectedTopics.includes(topic);
                return (
                  <button key={topic} className={"topic " + (active ? "active" : "")} onClick={() => toggleTopic(topic)}>
                    <span>{topicLabel(topic)}</span><small>{count}</small>
                  </button>
                );
              })}
            </div>
          </section>

          <div className="actions">
            <button className="primary" disabled={!available.length} onClick={() => startQuiz(false)}>
              <BookOpen size={18}/> Starten ({available.length})
            </button>
            <button className="secondary" disabled={!wrongIds.length} onClick={() => startQuiz(true)}>
              <ListChecks size={18}/> Fehlertrainer ({wrongIds.length})
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (screen === "result") {
    const pct = pool.length ? Math.round((score / pool.length) * 100) : 0;
    return (
      <div className="shell result">
        <main className="result-card">
          <div className="score">{pct}%</div>
          <h1>{score} von {pool.length} richtig</h1>
          <p className="subtitle">{pct >= 80 ? "Stark. Weiter auf Prüfungsniveau üben." : pct >= 60 ? "Solide, aber Fehlertrainer nutzen." : "Nochmal in Ruhe durchgehen."}</p>
          <div className="actions">
            <button className="primary" onClick={() => startQuiz(false)}><RotateCcw size={18}/> Neu starten</button>
            <button className="secondary" onClick={() => setScreen("start")}>Zur Auswahl</button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="shell quiz">
      <main className="quiz-card">
        <div className="top">
          <span>Frage {idx + 1} von {pool.length}</span>
          <span>{score}/{answered} richtig</span>
        </div>
        <div className="progress"><div style={{width: `${(idx / Math.max(pool.length,1)) * 100}%`}} /></div>

        <div className="badge"><ShieldCheck size={15}/> {topicLabel(q.topic)} · {q.multi ? "Mehrfachauswahl" : "Single Choice"}</div>
        <h1>{q.question}</h1>

        <div className="options">
          {q.options.map((option, i) => {
            const isSelected = selected.includes(i);
            const isCorrect = q.correct.includes(i);
            let cls = "option";
            if (revealed && isCorrect) cls += " correct";
            else if (revealed && isSelected && !isCorrect) cls += " wrong";
            else if (isSelected) cls += " selected";
            return (
              <button key={i} className={cls} onClick={() => choose(i)}>
                <span className="letter">{revealed && isCorrect ? <Check size={16}/> : revealed && isSelected && !isCorrect ? <X size={16}/> : String.fromCharCode(65 + i)}</span>
                <span>{option}</span>
              </button>
            );
          })}
        </div>

        {revealed && (
          <section className="explain">
            <strong>{sameSet([...selected].sort(), [...q.correct].sort()) ? "Richtig." : "Nicht ganz."}</strong>
            <p>{q.explanation}</p>
            <p className="solution">Richtige Antwort: {q.correct.map(i => String.fromCharCode(65 + i)).join(", ")}</p>
          </section>
        )}

        <div className="nav">
          <button className="secondary" onClick={prev} disabled={idx === 0}><ChevronLeft size={16}/> Zurück</button>
          {!revealed ? (
            <button className="primary" onClick={checkAnswer} disabled={!selected.length}>Antwort prüfen</button>
          ) : (
            <button className="primary" onClick={next}>{idx + 1 >= pool.length ? "Ergebnis" : "Weiter"} <ChevronRight size={16}/></button>
          )}
        </div>
      </main>
    </div>
  );
}
