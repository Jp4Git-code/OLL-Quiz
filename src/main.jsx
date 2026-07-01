import React, { useState, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { ChevronRight, ChevronLeft, RotateCcw, Check, X, Shield, BookOpen, Scale, Award, Gavel, Flag } from "lucide-react";
import "./style.css";

const QUESTIONS = [
  {cat:"WDO",topic:"Grundsätze",q:"Was besagt das Legalitätsprinzip im Disziplinarrecht?",options:["Der DiszVorg entscheidet nach Ermessen, ob er ermittelt","Der DiszVorg MUSS bei Anfangsverdacht ermitteln – kein Ermessen","Nur Offiziere dürfen ermitteln","Ermittlungen sind nur bei Straftaten zulässig"],correct:1,expl:"§ 32 Abs. 1 WDO: Das 'Ob' der disziplinaren Ermittlung ist keine Ermessensentscheidung. Sobald ein Anfangsverdacht besteht, muss ermittelt werden."},
  {cat:"WDO",topic:"Grundsätze",q:"Welches Prinzip beschreibt, dass der DiszVorg frei entscheidet, OB und WIE er eine Pflichtverletzung ahndet?",options:["Legalitätsprinzip","Opportunitätsprinzip","Beschleunigungsgrundsatz","Verhältnismäßigkeitsgrundsatz"],correct:1,expl:"Das Opportunitätsprinzip gibt dem DiszVorg Ermessen bei der Ahndung – im Gegensatz zur Ermittlungspflicht."},
  {cat:"WDO",topic:"Zuständigkeit",q:"Wer ist nach § 29 WDO grundsätzlich zuständig?",options:["Der ranghöchste Soldat der Einheit","Der nächste Disziplinarvorgesetzte des verdächtigen Soldaten","Der Kompaniefeldwebel","Der Schulkommandeur"],correct:1,expl:"§ 29 WDO: Zuständig ist grundsätzlich der nächste Disziplinarvorgesetzte des verdächtigen Soldaten."},
  {cat:"WDO",topic:"VP & Schlussgehör",q:"Welche Aussage zu VP-Anhörung und Schlussgehör ist richtig?",options:["Beides ist derselbe Schritt","Die VP-Anhörung ersetzt das Schlussgehör","Beides sind getrennte Verfahrensschritte","Das Schlussgehör findet nach der Verhängung statt"],correct:2,expl:"VP-Anhörung und Schlussgehör sind getrennte Schritte und dürfen nicht verwechselt werden."},
  {cat:"SG",topic:"§ 7 SG",q:"Welche drei Kernpflichten umfasst § 7 SG?",options:["Wahrheits-, Treue- und Gehorsamspflicht","Dienstleistungs-, Loyalitäts- und Vermögenswahrungspflicht","Fürsorge-, Aufsichts- und Vorbildpflicht","Melde-, Anzeige- und Auskunftspflicht"],correct:1,expl:"§ 7 SG umfasst Dienstleistungspflicht, Loyalitätspflicht und Vermögenswahrungspflicht."},
  {cat:"SG",topic:"§ 8 SG",q:"Was ist der zentrale Prüfungsmaßstab bei § 8 SG?",options:["Die innere Gesinnung des Soldaten","Die äußere Manifestation, nicht die bloße Gesinnung","Nur die Parteimitgliedschaft","Das Ergebnis eines Eignungstests"],correct:1,expl:"Entscheidend ist das nach außen erkennbare Verhalten."},
  {cat:"SG",topic:"§ 10 SG",q:"Ein Vorgesetzter sieht eine Pflichtverletzung und tut nichts. Welche Pflicht kann betroffen sein?",options:["Dienstaufsichtspflicht nach § 10 Abs. 2 SG","Politische Betätigung nach § 15 SG","Frist nach § 6 WBO","Unmittelbarer Zwang"],correct:0,expl:"Dienstaufsicht bedeutet Wahrnehmen, Bewerten und Reagieren. Wegsehen kann selbst pflichtwidrig sein."},
  {cat:"VorgV",topic:"Grundlagen",q:"Was ist vor einer Befehlsprüfung regelmäßig zuerst zu prüfen?",options:["Die Beschwerdefrist","Das Vorgesetztenverhältnis nach VorgV","Die Vollstreckung","Die Nachtfrist"],correct:1,expl:"Ohne Vorgesetztenverhältnis kein militärischer Befehl und keine Gehorsamspflicht."},
  {cat:"Befehl",topic:"Verbindlichkeit",q:"Welche Aussage ist ein zentraler Merksatz des Befehlsrechts?",options:["Rechtswidrigkeit bedeutet immer Unverbindlichkeit","Rechtmäßigkeit und Verbindlichkeit sind getrennt zu prüfen","Verbindlichkeit wird vor der VorgV geprüft","Ein privater Zweck macht den Befehl besonders verbindlich"],correct:1,expl:"Rechtmäßigkeit und Verbindlichkeit sind strikt getrennt zu prüfen."},
  {cat:"WBO",topic:"Zulässigkeit",q:"Welche vier Punkte umfasst das Zulässigkeitsschema im Beschwerderecht?",options:["Sachverhalt – Beweis – Urteil – Vollstreckung","Statthaftigkeit – Form – Frist – Beschwer","Antrag – Anhörung – Entscheidung – Mitteilung","Zuständigkeit – Ermittlung – Anhörung – Maßnahme"],correct:1,expl:"Das Zulässigkeitsschema lautet: Statthaftigkeit, Form, Frist, Beschwer."},
  {cat:"StGB/WStG",topic:"Notwehr",q:"Was sind die zwei Prüfungsblöcke der Notwehr?",options:["Absicht und Ausführung","Notwehrlage und Notwehrhandlung","Tatbestand und Strafe","Befehl und Gehorsam"],correct:1,expl:"Notwehr wird in Notwehrlage und Notwehrhandlung geprüft."},
  {cat:"GG",topic:"FDGO",q:"Welche drei Kernelemente bilden die FDGO?",options:["Bundeswehr, Bundestag, Bundesrat","Menschenwürde, Demokratieprinzip, Rechtsstaatsprinzip","Freiheit, Gleichheit, Brüderlichkeit","Exekutive, Legislative, Judikative"],correct:1,expl:"Die FDGO umfasst Menschenwürde, Demokratieprinzip und Rechtsstaatsprinzip."}
];

const CAT_STYLES = {
  WDO: { accent: "#2E5F8A", light: "#E8EDF5", icon: Shield, label: "Disziplinarrecht" },
  SG: { accent: "#B5651D", light: "#FBF1E6", icon: BookOpen, label: "Soldatengesetz" },
  VorgV: { accent: "#7A4CA0", light: "#F2EAF8", icon: Flag, label: "VorgV" },
  Befehl: { accent: "#A94A4A", light: "#FAEEEE", icon: Gavel, label: "Befehlsrecht" },
  "StGB/WStG": { accent: "#666666", light: "#EFEFEF", icon: Scale, label: "Strafrecht / WStG" },
  WBO: { accent: "#2D7A45", light: "#E9F5EC", icon: Scale, label: "Beschwerderecht" },
  GG: { accent: "#6A4BBC", light: "#F1ECFA", icon: Award, label: "Verfassungsrecht" }
};

function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

function Quiz(){
  const allCats=Object.keys(CAT_STYLES);
  const [stage,setStage]=useState("start");
  const [activeCats,setActiveCats]=useState(allCats);
  const [order,setOrder]=useState([]);
  const [idx,setIdx]=useState(0);
  const [selected,setSelected]=useState(null);
  const [revealed,setRevealed]=useState(false);
  const [answers,setAnswers]=useState({});
  const filteredQuestions=useMemo(()=>QUESTIONS.filter(q=>activeCats.includes(q.cat)),[activeCats]);

  function startQuiz(){setOrder(shuffle(filteredQuestions.map((_,i)=>i)));setIdx(0);setSelected(null);setRevealed(false);setAnswers({});setStage("quiz");}
  function toggleCat(cat){setActiveCats(prev=>prev.includes(cat)?prev.filter(c=>c!==cat):[...prev,cat]);}
  function confirmAnswer(){if(selected===null)return;const qRef=filteredQuestions[order[idx]];setAnswers(prev=>({...prev,[idx]:{selected,correct:selected===qRef.correct}}));setRevealed(true);}
  function next(){if(idx+1>=order.length)setStage("result");else{setIdx(idx+1);setSelected(null);setRevealed(false);}}
  function prev(){if(idx===0)return;const n=idx-1;setIdx(n);const a=answers[n];setSelected(a?a.selected:null);setRevealed(!!a);}
  const score=Object.values(answers).filter(a=>a.correct).length;
  const totalAnswered=Object.keys(answers).length;

  if(stage==="start")return <div className="screen start"><div className="panel"><div className="heroIcon"><Award size={34}/></div><div className="kicker">BUNDESWEHR OFFIZIERSLEHRGANG</div><h1>OLL-Quiz</h1><p className="muted">{QUESTIONS.length} Startfragen – später beliebig erweiterbar</p><div className="card"><div className="cardTitle">Themenbereiche wählen</div>{allCats.map(cat=>{const s=CAT_STYLES[cat];const Icon=s.icon;const active=activeCats.includes(cat);const count=QUESTIONS.filter(q=>q.cat===cat).length;return <button key={cat} className={`catButton ${active?"active":""}`} onClick={()=>toggleCat(cat)} style={{"--accent":s.accent}}><span className="catIcon"><Icon size={18}/></span><span className="catText"><b>{s.label}</b><small>{cat} · {count} Fragen</small></span><span className="checkBox">{active&&<Check size={14}/>}</span></button>})}</div><button className="primary" onClick={startQuiz} disabled={activeCats.length===0||filteredQuestions.length===0}>Quiz starten ({filteredQuestions.length} Fragen) <ChevronRight size={20}/></button></div></div>;

  if(stage==="result"){const pct=Math.round((score/order.length)*100);return <div className="screen result"><div className="panel"><div className="scoreCircle">{pct}%</div><h1>{score} von {order.length} richtig</h1><p className="muted">{pct>=80?"Sehr gut.":pct>=60?"Solide Basis.":"Nochmal wiederholen."}</p><button className="primary" onClick={()=>setStage("start")}><RotateCcw size={18}/> Neues Quiz starten</button></div></div>;}

  const q=filteredQuestions[order[idx]], s=CAT_STYLES[q.cat], Icon=s.icon, progress=(idx/order.length)*100;
  return <div className="screen quiz"><div className="quizBox"><div className="topline"><span>Frage {idx+1} von {order.length}</span><span>{score}/{totalAnswered} richtig</span></div><div className="progress"><div style={{width:`${progress}%`,background:s.accent}}/></div><div className="badge" style={{background:s.light,color:s.accent}}><Icon size={15}/> {s.label} · {q.topic}</div><h2>{q.q}</h2><div className="options">{q.options.map((opt,i)=>{const isCorrect=i===q.correct,isSelected=i===selected;let cls="option";if(revealed&&isCorrect)cls+=" correct";else if(revealed&&isSelected&&!isCorrect)cls+=" wrong";else if(!revealed&&isSelected)cls+=" selected";return <button key={i} className={cls} onClick={()=>!revealed&&setSelected(i)} style={{"--accent":s.accent}}><span className="letter">{revealed&&isCorrect?<Check size={16}/>:revealed&&isSelected?<X size={16}/>:String.fromCharCode(65+i)}</span>{opt}</button>})}</div>{revealed&&<div className="explanation"><b>{answers[idx]?.correct?"Richtig!":"Nicht ganz."}</b><br/>{q.expl}</div>}<div className="nav"><button className="secondary" onClick={prev} disabled={idx===0}><ChevronLeft size={16}/> Zurück</button>{!revealed?<button className="primary" onClick={confirmAnswer} disabled={selected===null}>Antwort prüfen</button>:<button className="primary" onClick={next}>{idx+1>=order.length?"Ergebnis anzeigen":"Nächste Frage"} <ChevronRight size={16}/></button>}</div></div></div>;
}

createRoot(document.getElementById("root")).render(<Quiz/>);
