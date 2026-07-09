import React, { useState, useMemo } from "react";
import { ChevronRight, ChevronLeft, RotateCcw, Check, X, Shield, BookOpen, Scale, Award, CheckSquare } from "lucide-react";

const PASSWORD = "Fristen2026";
const APP_TITLE = "Zeitablauf im einfachen Disziplinarverfahren – Übungsfälle";

const LAGE1 = "Lage Fall 1:\nDie Soldatin begeht am 04.05.20xx ein Dienstvergehen. Der Disziplinarvorgesetzte nimmt nach Kenntnis am 10.05.20xx Ermittlungen auf und schließt diese am 31.05.20xx mit dem Schlussgehör (§ 32 Abs. 5 WDO) ab.\n\n";
const LAGE2 = "Lage Fall 2:\nDer Soldat begeht am 12.08.20xx ein Dienstvergehen. Die Disziplinarvorgesetzte nimmt sofort Ermittlungen auf und schließt diese zügig am 17.08.20xx mit dem Schlussgehör des beschuldigten Soldaten ab.\n\n";
const LAGE3 = "Lage Fall 3:\nDer Soldat begeht am 02.11.20xx ein Dienstvergehen. Der Disziplinarvorgesetzte nimmt nach Kenntnis eines Dienstvergehens Ermittlungen auf und schließt diese nach der erwünschten Anhörung der Vertrauensperson mit dem Schlussgehör des beschuldigten Soldaten am 29.11.20xx ab.\n\n";
const LAGE4 = "Lage Fall 4:\nDie Soldatin begeht am 07.03.20xx ein Dienstvergehen. Die Disziplinarvorgesetzte nimmt Ermittlungen auf und schließt diese am 18.03.20xx mit dem Schlussgehör (§ 32 Abs. 5 WDO) ab.\n\n";
const LAGE5 = "Lage Fall 5:\nDer Soldat begeht am 25.12.20xx ein Dienstvergehen. Der Disziplinarvorgesetzte nimmt unverzüglich Ermittlungen auf und schließt diese am 15.01.20xx+1 (Folgejahr) mit dem Schlussgehör ab.\n\n";
const LAGE6 = "Lage Fall 6:\nDie Soldatin begeht am 19.06.20xx ein Dienstvergehen. Die Disziplinarvorgesetzte nimmt umgehend Ermittlungen auf und schließt diese am 30.06.20xx mit dem Schlussgehör (§ 32 Abs. 5 WDO) ab.\n\n";

const QUESTIONS = [
  // ── FALL 1 ──────────────────────────────────────────────────────────────
  {
    cat: "Fall 1",
    mode: "single",
    topic: "Fall 1 – a) Früheste Verhängung",
    q: LAGE1 + "a) Wann darf er frühestens eine einfache Disziplinarmaßnahme verhängen?",
    options: [
      "01.06.20xx, 06:00 Uhr",
      "31.05.20xx, 06:00 Uhr",
      "01.06.20xx, 00:00 Uhr",
      "10.06.20xx, 06:00 Uhr"
    ],
    correct: 0,
    expl: "§ 37 Abs. 1 WDO: Die einfache Disziplinarmaßnahme darf frühestens am Tag nach dem Schlussgehör (31.05.) ab 06:00 Uhr verhängt werden → 01.06.20xx, 06:00 Uhr."
  },
  {
    cat: "Fall 1",
    mode: "single",
    topic: "Fall 1 – b) Früheste Vollstreckung",
    q: LAGE1 + "b) Wann kann er die Maßnahme dann frühestens vollstrecken? (Ausnahmefälle außer Betracht)",
    options: [
      "01.06.20xx, 13:00 Uhr",
      "02.06.20xx, 13:00 Uhr",
      "02.06.20xx, 06:00 Uhr",
      "03.06.20xx, 00:00 Uhr"
    ],
    correct: 1,
    expl: "§ 47 Abs. 1 WDO: Vollstreckung frühestens am nächsten Tag nach Verhängung (01.06.) ab 13:00 Uhr → 02.06.20xx, 13:00 Uhr."
  },
  {
    cat: "Fall 1",
    mode: "single",
    topic: "Fall 1 – c) Späteste Verhängung (6 Monate)",
    q: LAGE1 + "c) Wann kann er spätestens eine einfache Disziplinarmaßnahme verhängen?",
    options: [
      "04.11.20xx, 00:00 Uhr",
      "04.11.20xx, 24:00 Uhr",
      "03.11.20xx, 24:00 Uhr",
      "03.11.20xx, 00:00 Uhr"
    ],
    correct: 2,
    expl: "§ 17 Abs. 2 WDO: 6-Monats-Frist ab Tat (04.05.). Der letzte Tag, an dem noch verhängt werden darf, ist der Vortag des kalendergleichen Datums → 03.11.20xx, 24:00 Uhr. (6 Monate)"
  },
  {
    cat: "Fall 1",
    mode: "single",
    topic: "Fall 1 – d) Verhängungsverbot",
    q: LAGE1 + "d) Wann tritt das sog. Verhängungsverbot ein?",
    options: [
      "05.11.20xx, 00:00 Uhr",
      "03.11.20xx, 24:00 Uhr",
      "04.11.20xx, 24:00 Uhr",
      "04.11.20xx, 00:00 Uhr"
    ],
    correct: 3,
    expl: "Das Verhängungsverbot tritt unmittelbar nach Ablauf der Verhängungsfrist ein, also ab dem kalendergleichen Datum 6 Monate nach Tat: 04.11.20xx, 00:00 Uhr."
  },
  {
    cat: "Fall 1",
    mode: "single",
    topic: "Fall 1 – e) Früheste Beschwerde",
    q: LAGE1 + "e) Wann kann sich die Soldatin frühestens gegen eine am 01.06.2021 verhängte einfache Disziplinarmaßnahme beschweren?",
    options: [
      "02.06.20xx, 06:00 Uhr",
      "01.06.20xx, 06:00 Uhr",
      "02.06.20xx, 00:00 Uhr",
      "03.06.20xx, 06:00 Uhr"
    ],
    correct: 0,
    expl: "§ 42 WDO i.V.m. § 6 Abs. 1 WBO: Beschwerde kann frühestens am Tag nach Verhängung (01.06.) ab 06:00 Uhr eingelegt werden → 02.06.20xx, 06:00 Uhr."
  },
  {
    cat: "Fall 1",
    mode: "single",
    topic: "Fall 1 – f) Späteste Beschwerdeeinlegung",
    q: LAGE1 + "f) Bis wann ist die Beschwerdeeinlegung bei Verhängung am 01.06.20xx noch möglich? (Samstage, Sonntage, Feiertage außer Betracht)",
    options: [
      "02.07.20xx, 00:00 Uhr",
      "01.07.20xx, 24:00 Uhr",
      "01.07.20xx, 06:00 Uhr",
      "30.06.20xx, 24:00 Uhr"
    ],
    correct: 1,
    expl: "§ 42 WDO i.V.m. § 6 Abs. 1 WBO: 1-Monatsfrist ab Verhängung (01.06.). Der letzte Tag ist der Vortag des kalendergleichen Datums → 01.07.20xx, 24:00 Uhr."
  },
  {
    cat: "Fall 1",
    mode: "single",
    topic: "Fall 1 – g) Unanfechtbarkeit",
    q: LAGE1 + "g) Wann ist die einfache Disziplinarmaßnahme unanfechtbar (wann kann diese nicht mehr mit einer Beschwerde angegriffen werden)?",
    options: [
      "02.07.20xx, 06:00 Uhr",
      "01.07.20xx, 24:00 Uhr",
      "02.07.20xx, 00:00 Uhr",
      "01.07.20xx, 00:00 Uhr"
    ],
    correct: 2,
    expl: "Die Maßnahme wird unanfechtbar mit Ablauf der Beschwerdefrist: 01.07.20xx, 24:00 Uhr = 02.07.20xx, 00:00 Uhr (beides bezeichnet denselben Zeitpunkt – Formulierung der Vorlage: 02.07.20xx, 00:00 Uhr)."
  },
  {
    cat: "Fall 1",
    mode: "single",
    topic: "Fall 1 – h) Beschwerdeart",
    q: LAGE1 + "h) Welche Beschwerdeart ist statthaft, wenn die Soldatin sich gegen eine Disziplinarbuße beschwert?",
    options: [
      "Untätigkeitsbeschwerde § 16 Abs. 2 WBO",
      "Truppendienstliche Beschwerde § 1 WBO",
      "Antrag auf Entscheidung des Truppendienstgerichts § 17 WBO",
      "Disziplinarbeschwerde § 42 WDO"
    ],
    correct: 3,
    expl: "§ 42 WDO: Gegen einfache Disziplinarmaßnahmen (hier: Disziplinarbuße) ist ausschließlich die Disziplinarbeschwerde statthaft."
  },
  {
    cat: "Fall 1",
    mode: "single",
    topic: "Fall 1 – i) Späteste Vollstreckung",
    q: LAGE1 + "i) Bis wann muss die einfache Disziplinarmaßnahme spätestens vollstreckt werden?",
    options: [
      "01.01.20xx, 24:00 Uhr",
      "02.01.20xx, 00:00 Uhr",
      "01.12.20xx, 24:00 Uhr",
      "31.12.20xx, 24:00 Uhr"
    ],
    correct: 0,
    expl: "§ 57 Abs. 1 WDO: Vollstreckungsfrist 6 Monate ab Unanfechtbarkeit (02.07.). Vortag des kalendergleichen Datums → 01.01. Folgejahr, 24:00 Uhr."
  },
  {
    cat: "Fall 1",
    mode: "single",
    topic: "Fall 1 – j) Vollstreckungsverbot",
    q: LAGE1 + "j) Ab wann ist die Vollstreckung der unanfechtbar gewordenen Disziplinarmaßnahme unzulässig?",
    options: [
      "01.01.20xx, 24:00 Uhr",
      "02.01.20xx, 00:00 Uhr",
      "02.01.20xx, 06:00 Uhr",
      "03.01.20xx, 00:00 Uhr"
    ],
    correct: 1,
    expl: "§ 57 Abs. 1 WDO: Mit Ablauf der Vollstreckungsfrist (01.01. Folgejahr, 24:00 Uhr) ist die Vollstreckung ab dem Folgetag unzulässig → 02.01.20xx, 00:00 Uhr."
  },

  // ── FALL 2 ──────────────────────────────────────────────────────────────
  {
    cat: "Fall 2",
    mode: "single",
    topic: "Fall 2 – a) Früheste Verhängung",
    q: LAGE2 + "a) Wann darf sie frühestens eine einfache Disziplinarmaßnahme verhängen?",
    options: [
      "18.08.20xx, 00:00 Uhr",
      "17.08.20xx, 06:00 Uhr",
      "18.08.20xx, 06:00 Uhr",
      "19.08.20xx, 06:00 Uhr"
    ],
    correct: 2,
    expl: "§ 37 Abs. 1 WDO: Frühestens am Tag nach dem Schlussgehör (17.08.) ab 06:00 Uhr → 18.08.20xx, 06:00 Uhr."
  },
  {
    cat: "Fall 2",
    mode: "single",
    topic: "Fall 2 – b) Früheste Vollstreckung",
    q: LAGE2 + "b) Wann kann sie die Maßnahme dann frühestens vollstrecken? (Ausnahmefälle außer Betracht)",
    options: [
      "20.08.20xx, 00:00 Uhr",
      "18.08.20xx, 13:00 Uhr",
      "19.08.20xx, 06:00 Uhr",
      "19.08.20xx, 13:00 Uhr"
    ],
    correct: 3,
    expl: "§ 47 Abs. 1 WDO: Frühestens am nächsten Tag nach Verhängung (18.08.) ab 13:00 Uhr → 19.08.20xx, 13:00 Uhr."
  },
  {
    cat: "Fall 2",
    mode: "single",
    topic: "Fall 2 – c) Späteste Verhängung (6 Monate)",
    q: LAGE2 + "c) Wann kann sie spätestens eine einfache Disziplinarmaßnahme verhängen?",
    options: [
      "11.02.20xx, 24:00 Uhr",
      "12.02.20xx, 00:00 Uhr",
      "12.02.20xx, 24:00 Uhr",
      "11.02.20xx, 00:00 Uhr"
    ],
    correct: 0,
    expl: "§ 17 Abs. 2 WDO: 6-Monats-Frist ab Tat (12.08.). Vortag des kalendergleichen Datums im Folgejahr → 11.02.20xx (Folgejahr), 24:00 Uhr. (6 Monate)"
  },
  {
    cat: "Fall 2",
    mode: "single",
    topic: "Fall 2 – d) Verhängungsverbot",
    q: LAGE2 + "d) Wann tritt das sog. Verhängungsverbot ein?",
    options: [
      "11.02.20xx, 24:00 Uhr",
      "12.02.20xx, 00:00 Uhr",
      "12.02.20xx, 24:00 Uhr",
      "13.02.20xx, 00:00 Uhr"
    ],
    correct: 1,
    expl: "Das Verhängungsverbot tritt mit Beginn des kalendergleichen Datums 6 Monate nach Tat ein: 12.02.20xx (Folgejahr), 00:00 Uhr."
  },
  {
    cat: "Fall 2",
    mode: "single",
    topic: "Fall 2 – e) Früheste Beschwerde",
    q: LAGE2 + "e) Wann kann sich der Soldat frühestens gegen eine am 18.08.2020 verhängte einfache Disziplinarmaßnahme beschweren?",
    options: [
      "19.08.20xx, 00:00 Uhr",
      "18.08.20xx, 06:00 Uhr",
      "19.08.20xx, 06:00 Uhr",
      "20.08.20xx, 06:00 Uhr"
    ],
    correct: 2,
    expl: "§ 42 WDO i.V.m. § 6 Abs. 1 WBO: Beschwerde frühestens am Tag nach Verhängung (18.08.) ab 06:00 Uhr → 19.08.20xx, 06:00 Uhr."
  },
  {
    cat: "Fall 2",
    mode: "single",
    topic: "Fall 2 – f) Späteste Beschwerdeeinlegung",
    q: LAGE2 + "f) Bis wann ist die Beschwerdeeinlegung bei Verhängung am 18.08.20xx noch möglich? (Samstage, Sonntage, Feiertage außer Betracht) – innerhalb eines Monats",
    options: [
      "18.09.20xx, 06:00 Uhr",
      "19.09.20xx, 00:00 Uhr",
      "17.09.20xx, 24:00 Uhr",
      "18.09.20xx, 24:00 Uhr"
    ],
    correct: 3,
    expl: "§ 42 WDO i.V.m. § 6 Abs. 1 WBO: 1-Monats-Frist ab Verhängung (18.08.). Vortag des kalendergleichen Datums → 18.09.20xx, 24:00 Uhr. (innerhalb eines Monats)"
  },
  {
    cat: "Fall 2",
    mode: "single",
    topic: "Fall 2 – g) Unanfechtbarkeit",
    q: LAGE2 + "g) Wann ist die einfache Disziplinarmaßnahme unanfechtbar?",
    options: [
      "19.09.20xx, 00:00 Uhr",
      "18.09.20xx, 24:00 Uhr",
      "20.09.20xx, 00:00 Uhr",
      "19.09.20xx, 06:00 Uhr"
    ],
    correct: 0,
    expl: "Die Maßnahme wird unanfechtbar mit Ablauf der Beschwerdefrist (18.09.20xx, 24:00 Uhr) = 19.09.20xx, 00:00 Uhr (Formulierung der Vorlage)."
  },
  {
    cat: "Fall 2",
    mode: "single",
    topic: "Fall 2 – h) Beschwerdeart",
    q: LAGE2 + "h) Welche Beschwerdeart ist statthaft, wenn der Soldat sich gegen einen Disziplinararrest beschwert?",
    options: [
      "Truppendienstliche Beschwerde § 1 WBO",
      "Disziplinarbeschwerde § 42 WDO",
      "Antrag auf Entscheidung des Truppendienstgerichts § 17 WBO",
      "Weitere Beschwerde § 16 WBO"
    ],
    correct: 1,
    expl: "§ 42 WDO: Auch gegen den Disziplinararrest als einfache Disziplinarmaßnahme ist die Disziplinarbeschwerde statthaft."
  },
  {
    cat: "Fall 2",
    mode: "single",
    topic: "Fall 2 – i) Späteste Vollstreckung",
    q: LAGE2 + "i) Bis wann muss die einfache Disziplinarmaßnahme spätestens vollstreckt werden?",
    options: [
      "19.03.20xx, 24:00 Uhr",
      "19.03.20xx, 00:00 Uhr",
      "18.03.20xx, 24:00 Uhr",
      "17.03.20xx, 24:00 Uhr"
    ],
    correct: 2,
    expl: "§ 57 Abs. 1 WDO: Vollstreckungsfrist 6 Monate ab Unanfechtbarkeit (19.09.20xx). Vortag des kalendergleichen Datums im Folgejahr → 18.03.20xx (Folgejahr), 24:00 Uhr."
  },
  {
    cat: "Fall 2",
    mode: "single",
    topic: "Fall 2 – j) Vollstreckungsverbot",
    q: LAGE2 + "j) Ab wann ist die Vollstreckung der unanfechtbar gewordenen Disziplinarmaßnahme unzulässig?",
    options: [
      "19.03.20xx, 06:00 Uhr",
      "18.03.20xx, 24:00 Uhr",
      "20.03.20xx, 00:00 Uhr",
      "19.03.20xx, 00:00 Uhr"
    ],
    correct: 3,
    expl: "§ 57 Abs. 1 WDO: Mit Ablauf der Vollstreckungsfrist (18.03. Folgejahr, 24:00 Uhr) ist die Vollstreckung ab dem Folgetag unzulässig → 19.03.20xx (Folgejahr), 00:00 Uhr."
  },

  // ── FALL 3 ──────────────────────────────────────────────────────────────
  {
    cat: "Fall 3",
    mode: "single",
    topic: "Fall 3 – a) Früheste Verhängung",
    q: LAGE3 + "a) Wann darf er frühestens eine einfache Disziplinarmaßnahme verhängen?",
    options: [
      "30.11.20xx, 06:00 Uhr",
      "29.11.20xx, 06:00 Uhr",
      "30.11.20xx, 00:00 Uhr",
      "01.12.20xx, 06:00 Uhr"
    ],
    correct: 0,
    expl: "§ 37 Abs. 1 WDO: Frühestens am Tag nach dem Schlussgehör (29.11.) ab 06:00 Uhr → 30.11.20xx, 06:00 Uhr."
  },
  {
    cat: "Fall 3",
    mode: "single",
    topic: "Fall 3 – b) Früheste Vollstreckung",
    q: LAGE3 + "b) Wann kann er die Maßnahme dann frühestens vollstrecken? (Ausnahmefälle außer Betracht)",
    options: [
      "30.11.20xx, 13:00 Uhr",
      "01.12.20xx, 13:00 Uhr",
      "01.12.20xx, 06:00 Uhr",
      "02.12.20xx, 00:00 Uhr"
    ],
    correct: 1,
    expl: "§ 47 Abs. 1 WDO: Frühestens am nächsten Tag nach Verhängung (30.11.) ab 13:00 Uhr → 01.12.20xx, 13:00 Uhr."
  },
  {
    cat: "Fall 3",
    mode: "single",
    topic: "Fall 3 – c) Späteste Verhängung (6 Monate)",
    q: LAGE3 + "c) Wann kann er spätestens eine einfache Disziplinarmaßnahme verhängen?",
    options: [
      "02.05.20xx, 24:00 Uhr",
      "02.05.20xx, 00:00 Uhr",
      "01.05.20xx, 24:00 Uhr",
      "01.05.20xx, 00:00 Uhr"
    ],
    correct: 2,
    expl: "§ 17 Abs. 2 WDO: 6-Monats-Frist ab Tat (02.11.). Vortag des kalendergleichen Datums im Folgejahr → 01.05.20xx (Folgejahr), 24:00 Uhr. (6 Monate)"
  },
  {
    cat: "Fall 3",
    mode: "single",
    topic: "Fall 3 – d) Verhängungsverbot",
    q: LAGE3 + "d) Wann tritt das sog. Verhängungsverbot ein?",
    options: [
      "03.05.20xx, 00:00 Uhr",
      "01.05.20xx, 24:00 Uhr",
      "02.05.20xx, 24:00 Uhr",
      "02.05.20xx, 00:00 Uhr"
    ],
    correct: 3,
    expl: "Das Verhängungsverbot tritt mit Beginn des kalendergleichen Datums 6 Monate nach Tat ein: 02.05.20xx (Folgejahr), 00:00 Uhr."
  },
  {
    cat: "Fall 3",
    mode: "single",
    topic: "Fall 3 – e) Früheste Beschwerde",
    q: LAGE3 + "e) Wann kann sich der Soldat frühestens gegen eine am 30.11.20xx verhängte einfache Disziplinarmaßnahme beschweren?",
    options: [
      "01.12.20xx, 06:00 Uhr",
      "30.11.20xx, 06:00 Uhr",
      "01.12.20xx, 00:00 Uhr",
      "02.12.20xx, 06:00 Uhr"
    ],
    correct: 0,
    expl: "§ 42 WDO i.V.m. § 6 Abs. 1 WBO: Beschwerde frühestens am Tag nach Verhängung (30.11.) ab 06:00 Uhr → 01.12.20xx, 06:00 Uhr."
  },
  {
    cat: "Fall 3",
    mode: "single",
    topic: "Fall 3 – f) Späteste Beschwerdeeinlegung",
    q: LAGE3 + "f) Bis wann ist die Beschwerdeeinlegung bei Verhängung am 30.11.20xx noch möglich? (Samstage, Sonntage, Feiertage außer Betracht)",
    options: [
      "31.12.20xx, 00:00 Uhr",
      "30.12.20xx, 24:00 Uhr",
      "29.12.20xx, 24:00 Uhr",
      "30.12.20xx, 06:00 Uhr"
    ],
    correct: 1,
    expl: "§ 42 WDO i.V.m. § 6 Abs. 1 WBO: 1-Monats-Frist ab Verhängung (30.11.). Vortag des kalendergleichen Datums → 30.12.20xx, 24:00 Uhr."
  },
  {
    cat: "Fall 3",
    mode: "single",
    topic: "Fall 3 – g) Unanfechtbarkeit",
    q: LAGE3 + "g) Wann ist die einfache Disziplinarmaßnahme unanfechtbar?",
    options: [
      "01.01.20xx, 00:00 Uhr",
      "30.12.20xx, 24:00 Uhr",
      "31.12.20xx, 00:00 Uhr",
      "31.12.20xx, 06:00 Uhr"
    ],
    correct: 2,
    expl: "Die Maßnahme wird unanfechtbar mit Ablauf der Beschwerdefrist (30.12.20xx, 24:00 Uhr) = 31.12.20xx, 00:00 Uhr (Formulierung der Vorlage)."
  },
  {
    cat: "Fall 3",
    mode: "single",
    topic: "Fall 3 – h) Beschwerdeart",
    q: LAGE3 + "h) Welche Beschwerdeart ist statthaft, wenn der Soldat sich gegen einen strengen Verweis beschwert?",
    options: [
      "Weitere Beschwerde § 16 WBO",
      "Truppendienstliche Beschwerde § 1 WBO",
      "Antrag auf Entscheidung des Truppendienstgerichts § 17 WBO",
      "Disziplinarbeschwerde § 42 WDO"
    ],
    correct: 3,
    expl: "§ 42 WDO: Gegen einfache Disziplinarmaßnahmen – hier: strenger Verweis – ist die Disziplinarbeschwerde statthaft."
  },
  {
    cat: "Fall 3",
    mode: "single",
    topic: "Fall 3 – i) Späteste Vollstreckung",
    q: LAGE3 + "i) Bis wann muss die einfache Disziplinarmaßnahme spätestens vollstreckt werden?",
    options: [
      "30.06.20xx, 24:00 Uhr",
      "01.07.20xx, 00:00 Uhr",
      "01.07.20xx, 24:00 Uhr",
      "29.06.20xx, 24:00 Uhr"
    ],
    correct: 0,
    expl: "§ 57 Abs. 1 WDO: Vollstreckungsfrist 6 Monate ab Unanfechtbarkeit (31.12.20xx). Vortag des kalendergleichen Datums → 30.06.20xx (Folgejahr), 24:00 Uhr."
  },
  {
    cat: "Fall 3",
    mode: "single",
    topic: "Fall 3 – j) Vollstreckungsverbot",
    q: LAGE3 + "j) Ab wann ist die Vollstreckung der unanfechtbar gewordenen Disziplinarmaßnahme unzulässig?",
    options: [
      "30.06.20xx, 24:00 Uhr",
      "01.07.20xx, 00:00 Uhr",
      "02.07.20xx, 00:00 Uhr",
      "01.07.20xx, 06:00 Uhr"
    ],
    correct: 1,
    expl: "§ 57 Abs. 1 WDO: Mit Ablauf der Vollstreckungsfrist (30.06. Folgejahr, 24:00 Uhr) ist die Vollstreckung ab dem Folgetag unzulässig → 01.07.20xx (Folgejahr), 00:00 Uhr."
  },

  // ── FALL 4 ──────────────────────────────────────────────────────────────
  {
    cat: "Fall 4",
    mode: "single",
    topic: "Fall 4 – a) Früheste Verhängung",
    q: LAGE4 + "a) Wann darf sie frühestens eine einfache Disziplinarmaßnahme verhängen?",
    options: [
      "19.03.20xx, 00:00 Uhr",
      "18.03.20xx, 06:00 Uhr",
      "19.03.20xx, 06:00 Uhr",
      "20.03.20xx, 06:00 Uhr"
    ],
    correct: 2,
    expl: "§ 37 Abs. 1 WDO: Frühestens am Tag nach dem Schlussgehör (18.03.) ab 06:00 Uhr → 19.03.20xx, 06:00 Uhr."
  },
  {
    cat: "Fall 4",
    mode: "single",
    topic: "Fall 4 – b) Früheste Vollstreckung",
    q: LAGE4 + "b) Wann kann sie die Maßnahme dann frühestens vollstrecken? (Ausnahmefälle außer Betracht)",
    options: [
      "21.03.20xx, 00:00 Uhr",
      "19.03.20xx, 13:00 Uhr",
      "20.03.20xx, 06:00 Uhr",
      "20.03.20xx, 13:00 Uhr"
    ],
    correct: 3,
    expl: "§ 47 Abs. 1 WDO: Frühestens am nächsten Tag nach Verhängung (19.03.) ab 13:00 Uhr → 20.03.20xx, 13:00 Uhr."
  },
  {
    cat: "Fall 4",
    mode: "single",
    topic: "Fall 4 – c) Späteste Verhängung (6 Monate)",
    q: LAGE4 + "c) Wann kann sie spätestens eine einfache Disziplinarmaßnahme verhängen?",
    options: [
      "06.09.20xx, 24:00 Uhr",
      "07.09.20xx, 00:00 Uhr",
      "07.09.20xx, 24:00 Uhr",
      "06.09.20xx, 00:00 Uhr"
    ],
    correct: 0,
    expl: "§ 17 Abs. 2 WDO: 6-Monats-Frist ab Tat (07.03.). Vortag des kalendergleichen Datums → 06.09.20xx, 24:00 Uhr. (6 Monate)"
  },
  {
    cat: "Fall 4",
    mode: "single",
    topic: "Fall 4 – d) Verhängungsverbot",
    q: LAGE4 + "d) Wann tritt das sog. Verhängungsverbot ein?",
    options: [
      "06.09.20xx, 24:00 Uhr",
      "07.09.20xx, 00:00 Uhr",
      "07.09.20xx, 24:00 Uhr",
      "08.09.20xx, 00:00 Uhr"
    ],
    correct: 1,
    expl: "Das Verhängungsverbot tritt mit Beginn des kalendergleichen Datums 6 Monate nach Tat ein: 07.09.20xx, 00:00 Uhr."
  },
  {
    cat: "Fall 4",
    mode: "single",
    topic: "Fall 4 – e) Früheste Beschwerde",
    q: LAGE4 + "e) Wann kann sich die Soldatin frühestens gegen eine am 19.03.20xx verhängte einfache Disziplinarmaßnahme beschweren?",
    options: [
      "20.03.20xx, 00:00 Uhr",
      "19.03.20xx, 06:00 Uhr",
      "20.03.20xx, 06:00 Uhr",
      "21.03.20xx, 06:00 Uhr"
    ],
    correct: 2,
    expl: "§ 42 WDO i.V.m. § 6 Abs. 1 WBO: Beschwerde frühestens am Tag nach Verhängung (19.03.) ab 06:00 Uhr → 20.03.20xx, 06:00 Uhr."
  },
  {
    cat: "Fall 4",
    mode: "single",
    topic: "Fall 4 – f) Späteste Beschwerdeeinlegung",
    q: LAGE4 + "f) Bis wann ist die Beschwerdeeinlegung bei Verhängung am 19.03.20xx noch möglich? (Samstage, Sonntage, Feiertage außer Betracht)",
    options: [
      "19.04.20xx, 06:00 Uhr",
      "20.04.20xx, 00:00 Uhr",
      "18.04.20xx, 24:00 Uhr",
      "19.04.20xx, 24:00 Uhr"
    ],
    correct: 3,
    expl: "§ 42 WDO i.V.m. § 6 Abs. 1 WBO: 1-Monats-Frist ab Verhängung (19.03.). Vortag des kalendergleichen Datums → 19.04.20xx, 24:00 Uhr."
  },
  {
    cat: "Fall 4",
    mode: "single",
    topic: "Fall 4 – g) Unanfechtbarkeit",
    q: LAGE4 + "g) Wann ist die einfache Disziplinarmaßnahme unanfechtbar?",
    options: [
      "20.04.20xx, 00:00 Uhr",
      "19.04.20xx, 24:00 Uhr",
      "21.04.20xx, 00:00 Uhr",
      "20.04.20xx, 06:00 Uhr"
    ],
    correct: 0,
    expl: "Die Maßnahme wird unanfechtbar mit Ablauf der Beschwerdefrist (19.04.20xx, 24:00 Uhr) = 20.04.20xx, 00:00 Uhr."
  },
  {
    cat: "Fall 4",
    mode: "single",
    topic: "Fall 4 – h) Beschwerdeart",
    q: LAGE4 + "h) Welche Beschwerdeart ist statthaft, wenn die Soldatin sich gegen eine Ausgangsbeschränkung beschwert?",
    options: [
      "Truppendienstliche Beschwerde § 1 WBO",
      "Disziplinarbeschwerde § 42 WDO",
      "Antrag auf Entscheidung des Truppendienstgerichts § 17 WBO",
      "Weitere Beschwerde § 16 WBO"
    ],
    correct: 1,
    expl: "§ 42 WDO: Gegen einfache Disziplinarmaßnahmen – hier: Ausgangsbeschränkung – ist ausschließlich die Disziplinarbeschwerde statthaft."
  },
  {
    cat: "Fall 4",
    mode: "single",
    topic: "Fall 4 – i) Späteste Vollstreckung",
    q: LAGE4 + "i) Bis wann muss die einfache Disziplinarmaßnahme spätestens vollstreckt werden?",
    options: [
      "20.10.20xx, 24:00 Uhr",
      "20.10.20xx, 00:00 Uhr",
      "19.10.20xx, 24:00 Uhr",
      "18.10.20xx, 24:00 Uhr"
    ],
    correct: 2,
    expl: "§ 57 Abs. 1 WDO: Vollstreckungsfrist 6 Monate ab Unanfechtbarkeit (20.04.20xx). Vortag des kalendergleichen Datums → 19.10.20xx, 24:00 Uhr."
  },
  {
    cat: "Fall 4",
    mode: "single",
    topic: "Fall 4 – j) Vollstreckungsverbot",
    q: LAGE4 + "j) Ab wann ist die Vollstreckung der unanfechtbar gewordenen Disziplinarmaßnahme unzulässig?",
    options: [
      "20.10.20xx, 06:00 Uhr",
      "19.10.20xx, 24:00 Uhr",
      "21.10.20xx, 00:00 Uhr",
      "20.10.20xx, 00:00 Uhr"
    ],
    correct: 3,
    expl: "§ 57 Abs. 1 WDO: Mit Ablauf der Vollstreckungsfrist (19.10.20xx, 24:00 Uhr) ist die Vollstreckung ab dem Folgetag unzulässig → 20.10.20xx, 00:00 Uhr."
  },

  // ── FALL 5 ──────────────────────────────────────────────────────────────
  {
    cat: "Fall 5",
    mode: "single",
    topic: "Fall 5 – a) Früheste Verhängung",
    q: LAGE5 + "a) Wann darf er frühestens eine einfache Disziplinarmaßnahme verhängen?",
    options: [
      "16.01.20xx+1, 06:00 Uhr",
      "15.01.20xx+1, 06:00 Uhr",
      "16.01.20xx+1, 00:00 Uhr",
      "17.01.20xx+1, 06:00 Uhr"
    ],
    correct: 0,
    expl: "§ 37 Abs. 1 WDO: Frühestens am Tag nach dem Schlussgehör (15.01.) ab 06:00 Uhr → 16.01. (Folgejahr), 06:00 Uhr."
  },
  {
    cat: "Fall 5",
    mode: "single",
    topic: "Fall 5 – b) Früheste Vollstreckung",
    q: LAGE5 + "b) Wann kann er die Maßnahme dann frühestens vollstrecken? (Ausnahmefälle außer Betracht)",
    options: [
      "16.01.20xx+1, 13:00 Uhr",
      "17.01.20xx+1, 13:00 Uhr",
      "17.01.20xx+1, 06:00 Uhr",
      "18.01.20xx+1, 00:00 Uhr"
    ],
    correct: 1,
    expl: "§ 47 Abs. 1 WDO: Frühestens am nächsten Tag nach Verhängung (16.01.) ab 13:00 Uhr → 17.01. (Folgejahr), 13:00 Uhr."
  },
  {
    cat: "Fall 5",
    mode: "single",
    topic: "Fall 5 – c) Späteste Verhängung (6 Monate)",
    q: LAGE5 + "c) Wann kann er spätestens eine einfache Disziplinarmaßnahme verhängen?",
    options: [
      "25.06.20xx+1, 24:00 Uhr",
      "25.06.20xx+1, 00:00 Uhr",
      "24.06.20xx+1, 24:00 Uhr",
      "24.06.20xx+1, 00:00 Uhr"
    ],
    correct: 2,
    expl: "§ 17 Abs. 2 WDO: 6-Monats-Frist ab Tat (25.12.). Vortag des kalendergleichen Datums im Folgejahr → 24.06. (Folgejahr), 24:00 Uhr. Achtung: Die 6 Monate überspannen hier den Jahreswechsel."
  },
  {
    cat: "Fall 5",
    mode: "single",
    topic: "Fall 5 – d) Verhängungsverbot",
    q: LAGE5 + "d) Wann tritt das sog. Verhängungsverbot ein?",
    options: [
      "26.06.20xx+1, 00:00 Uhr",
      "24.06.20xx+1, 24:00 Uhr",
      "25.06.20xx+1, 24:00 Uhr",
      "25.06.20xx+1, 00:00 Uhr"
    ],
    correct: 3,
    expl: "Das Verhängungsverbot tritt mit Beginn des kalendergleichen Datums 6 Monate nach Tat ein: 25.06. (Folgejahr), 00:00 Uhr."
  },
  {
    cat: "Fall 5",
    mode: "single",
    topic: "Fall 5 – e) Früheste Beschwerde",
    q: LAGE5 + "e) Wann kann sich der Soldat frühestens gegen eine am 16.01.20xx+1 verhängte einfache Disziplinarmaßnahme beschweren?",
    options: [
      "17.01.20xx+1, 06:00 Uhr",
      "16.01.20xx+1, 06:00 Uhr",
      "17.01.20xx+1, 00:00 Uhr",
      "18.01.20xx+1, 06:00 Uhr"
    ],
    correct: 0,
    expl: "§ 42 WDO i.V.m. § 6 Abs. 1 WBO: Beschwerde frühestens am Tag nach Verhängung (16.01.) ab 06:00 Uhr → 17.01. (Folgejahr), 06:00 Uhr."
  },
  {
    cat: "Fall 5",
    mode: "single",
    topic: "Fall 5 – f) Späteste Beschwerdeeinlegung",
    q: LAGE5 + "f) Bis wann ist die Beschwerdeeinlegung bei Verhängung am 16.01.20xx+1 noch möglich? (Samstage, Sonntage, Feiertage außer Betracht)",
    options: [
      "17.02.20xx+1, 00:00 Uhr",
      "16.02.20xx+1, 24:00 Uhr",
      "15.02.20xx+1, 24:00 Uhr",
      "16.02.20xx+1, 06:00 Uhr"
    ],
    correct: 1,
    expl: "§ 42 WDO i.V.m. § 6 Abs. 1 WBO: 1-Monats-Frist ab Verhängung (16.01.). Vortag des kalendergleichen Datums → 16.02. (Folgejahr), 24:00 Uhr."
  },
  {
    cat: "Fall 5",
    mode: "single",
    topic: "Fall 5 – g) Unanfechtbarkeit",
    q: LAGE5 + "g) Wann ist die einfache Disziplinarmaßnahme unanfechtbar?",
    options: [
      "18.02.20xx+1, 00:00 Uhr",
      "16.02.20xx+1, 24:00 Uhr",
      "17.02.20xx+1, 00:00 Uhr",
      "17.02.20xx+1, 06:00 Uhr"
    ],
    correct: 2,
    expl: "Die Maßnahme wird unanfechtbar mit Ablauf der Beschwerdefrist (16.02., 24:00 Uhr) = 17.02. (Folgejahr), 00:00 Uhr."
  },
  {
    cat: "Fall 5",
    mode: "single",
    topic: "Fall 5 – h) Beschwerdeart",
    q: LAGE5 + "h) Welche Beschwerdeart ist statthaft, wenn der Soldat sich gegen einen Verweis beschwert?",
    options: [
      "Weitere Beschwerde § 16 WBO",
      "Truppendienstliche Beschwerde § 1 WBO",
      "Antrag auf Entscheidung des Truppendienstgerichts § 17 WBO",
      "Disziplinarbeschwerde § 42 WDO"
    ],
    correct: 3,
    expl: "§ 42 WDO: Gegen einfache Disziplinarmaßnahmen – hier: Verweis – ist ausschließlich die Disziplinarbeschwerde statthaft."
  },
  {
    cat: "Fall 5",
    mode: "single",
    topic: "Fall 5 – i) Späteste Vollstreckung",
    q: LAGE5 + "i) Bis wann muss die einfache Disziplinarmaßnahme spätestens vollstreckt werden?",
    options: [
      "16.08.20xx+1, 24:00 Uhr",
      "17.08.20xx+1, 00:00 Uhr",
      "17.08.20xx+1, 24:00 Uhr",
      "15.08.20xx+1, 24:00 Uhr"
    ],
    correct: 0,
    expl: "§ 57 Abs. 1 WDO: Vollstreckungsfrist 6 Monate ab Unanfechtbarkeit (17.02.). Vortag des kalendergleichen Datums → 16.08. (Folgejahr), 24:00 Uhr."
  },
  {
    cat: "Fall 5",
    mode: "single",
    topic: "Fall 5 – j) Vollstreckungsverbot",
    q: LAGE5 + "j) Ab wann ist die Vollstreckung der unanfechtbar gewordenen Disziplinarmaßnahme unzulässig?",
    options: [
      "16.08.20xx+1, 24:00 Uhr",
      "17.08.20xx+1, 00:00 Uhr",
      "18.08.20xx+1, 00:00 Uhr",
      "17.08.20xx+1, 06:00 Uhr"
    ],
    correct: 1,
    expl: "§ 57 Abs. 1 WDO: Mit Ablauf der Vollstreckungsfrist (16.08., 24:00 Uhr) ist die Vollstreckung ab dem Folgetag unzulässig → 17.08. (Folgejahr), 00:00 Uhr."
  },

  // ── FALL 6 ──────────────────────────────────────────────────────────────
  {
    cat: "Fall 6",
    mode: "single",
    topic: "Fall 6 – a) Früheste Verhängung",
    q: LAGE6 + "a) Wann darf sie frühestens eine einfache Disziplinarmaßnahme verhängen?",
    options: [
      "01.07.20xx, 00:00 Uhr",
      "30.06.20xx, 06:00 Uhr",
      "01.07.20xx, 06:00 Uhr",
      "02.07.20xx, 06:00 Uhr"
    ],
    correct: 2,
    expl: "§ 37 Abs. 1 WDO: Frühestens am Tag nach dem Schlussgehör (30.06.) ab 06:00 Uhr → 01.07.20xx, 06:00 Uhr."
  },
  {
    cat: "Fall 6",
    mode: "single",
    topic: "Fall 6 – b) Früheste Vollstreckung",
    q: LAGE6 + "b) Wann kann sie die Maßnahme dann frühestens vollstrecken? (Ausnahmefälle außer Betracht)",
    options: [
      "03.07.20xx, 00:00 Uhr",
      "01.07.20xx, 13:00 Uhr",
      "02.07.20xx, 06:00 Uhr",
      "02.07.20xx, 13:00 Uhr"
    ],
    correct: 3,
    expl: "§ 47 Abs. 1 WDO: Frühestens am nächsten Tag nach Verhängung (01.07.) ab 13:00 Uhr → 02.07.20xx, 13:00 Uhr."
  },
  {
    cat: "Fall 6",
    mode: "single",
    topic: "Fall 6 – c) Späteste Verhängung (6 Monate)",
    q: LAGE6 + "c) Wann kann sie spätestens eine einfache Disziplinarmaßnahme verhängen?",
    options: [
      "18.12.20xx, 24:00 Uhr",
      "19.12.20xx, 00:00 Uhr",
      "19.12.20xx, 24:00 Uhr",
      "18.12.20xx, 00:00 Uhr"
    ],
    correct: 0,
    expl: "§ 17 Abs. 2 WDO: 6-Monats-Frist ab Tat (19.06.). Vortag des kalendergleichen Datums → 18.12.20xx, 24:00 Uhr. (6 Monate)"
  },
  {
    cat: "Fall 6",
    mode: "single",
    topic: "Fall 6 – d) Verhängungsverbot",
    q: LAGE6 + "d) Wann tritt das sog. Verhängungsverbot ein?",
    options: [
      "18.12.20xx, 24:00 Uhr",
      "19.12.20xx, 00:00 Uhr",
      "19.12.20xx, 24:00 Uhr",
      "20.12.20xx, 00:00 Uhr"
    ],
    correct: 1,
    expl: "Das Verhängungsverbot tritt mit Beginn des kalendergleichen Datums 6 Monate nach Tat ein: 19.12.20xx, 00:00 Uhr."
  },
  {
    cat: "Fall 6",
    mode: "single",
    topic: "Fall 6 – e) Früheste Beschwerde",
    q: LAGE6 + "e) Wann kann sich die Soldatin frühestens gegen eine am 01.07.20xx verhängte einfache Disziplinarmaßnahme beschweren?",
    options: [
      "02.07.20xx, 00:00 Uhr",
      "01.07.20xx, 06:00 Uhr",
      "02.07.20xx, 06:00 Uhr",
      "03.07.20xx, 06:00 Uhr"
    ],
    correct: 2,
    expl: "§ 42 WDO i.V.m. § 6 Abs. 1 WBO: Beschwerde frühestens am Tag nach Verhängung (01.07.) ab 06:00 Uhr → 02.07.20xx, 06:00 Uhr."
  },
  {
    cat: "Fall 6",
    mode: "single",
    topic: "Fall 6 – f) Späteste Beschwerdeeinlegung",
    q: LAGE6 + "f) Bis wann ist die Beschwerdeeinlegung bei Verhängung am 01.07.20xx noch möglich? (Samstage, Sonntage, Feiertage außer Betracht)",
    options: [
      "01.08.20xx, 06:00 Uhr",
      "02.08.20xx, 00:00 Uhr",
      "31.07.20xx, 24:00 Uhr",
      "01.08.20xx, 24:00 Uhr"
    ],
    correct: 3,
    expl: "§ 42 WDO i.V.m. § 6 Abs. 1 WBO: 1-Monats-Frist ab Verhängung (01.07.). Vortag des kalendergleichen Datums → 01.08.20xx, 24:00 Uhr."
  },
  {
    cat: "Fall 6",
    mode: "single",
    topic: "Fall 6 – g) Unanfechtbarkeit",
    q: LAGE6 + "g) Wann ist die einfache Disziplinarmaßnahme unanfechtbar?",
    options: [
      "02.08.20xx, 00:00 Uhr",
      "01.08.20xx, 24:00 Uhr",
      "03.08.20xx, 00:00 Uhr",
      "02.08.20xx, 06:00 Uhr"
    ],
    correct: 0,
    expl: "Die Maßnahme wird unanfechtbar mit Ablauf der Beschwerdefrist (01.08.20xx, 24:00 Uhr) = 02.08.20xx, 00:00 Uhr."
  },
  {
    cat: "Fall 6",
    mode: "single",
    topic: "Fall 6 – h) Beschwerdeart",
    q: LAGE6 + "h) Welche Beschwerdeart ist statthaft, wenn die Soldatin sich gegen eine strenge Ausgangsbeschränkung beschwert?",
    options: [
      "Truppendienstliche Beschwerde § 1 WBO",
      "Disziplinarbeschwerde § 42 WDO",
      "Antrag auf Entscheidung des Truppendienstgerichts § 17 WBO",
      "Weitere Beschwerde § 16 WBO"
    ],
    correct: 1,
    expl: "§ 42 WDO: Gegen einfache Disziplinarmaßnahmen – hier: strenge Ausgangsbeschränkung – ist ausschließlich die Disziplinarbeschwerde statthaft."
  },
  {
    cat: "Fall 6",
    mode: "single",
    topic: "Fall 6 – i) Späteste Vollstreckung",
    q: LAGE6 + "i) Bis wann muss die einfache Disziplinarmaßnahme spätestens vollstreckt werden?",
    options: [
      "02.02.20xx+1, 24:00 Uhr",
      "02.02.20xx+1, 00:00 Uhr",
      "01.02.20xx+1, 24:00 Uhr",
      "31.01.20xx+1, 24:00 Uhr"
    ],
    correct: 2,
    expl: "§ 57 Abs. 1 WDO: Vollstreckungsfrist 6 Monate ab Unanfechtbarkeit (02.08.20xx). Vortag des kalendergleichen Datums im Folgejahr → 01.02. (Folgejahr), 24:00 Uhr."
  },
  {
    cat: "Fall 6",
    mode: "single",
    topic: "Fall 6 – j) Vollstreckungsverbot",
    q: LAGE6 + "j) Ab wann ist die Vollstreckung der unanfechtbar gewordenen Disziplinarmaßnahme unzulässig?",
    options: [
      "02.02.20xx+1, 06:00 Uhr",
      "01.02.20xx+1, 24:00 Uhr",
      "03.02.20xx+1, 00:00 Uhr",
      "02.02.20xx+1, 00:00 Uhr"
    ],
    correct: 3,
    expl: "§ 57 Abs. 1 WDO: Mit Ablauf der Vollstreckungsfrist (01.02. Folgejahr, 24:00 Uhr) ist die Vollstreckung ab dem Folgetag unzulässig → 02.02. (Folgejahr), 00:00 Uhr."
  }
];

const CAT_STYLES = {
  "Fall 1": { bg:"#1F3864", light:"#E8EDF5", accent:"#2E5F8A", icon:Shield, label:"Fall 1 – Tat 04.05., SG 31.05." },
  "Fall 2": { bg:"#1E5631", light:"#E9F5EC", accent:"#2D7A45", icon:Shield, label:"Fall 2 – Tat 12.08., SG 17.08." },
  "Fall 3": { bg:"#5C2E2E", light:"#FAEEEE", accent:"#A94A4A", icon:Shield, label:"Fall 3 – Tat 02.11., SG 29.11." },
  "Fall 4": { bg:"#4B2E83", light:"#F1ECFA", accent:"#6A4BBC", icon:Shield, label:"Fall 4 – Tat 07.03., SG 18.03." },
  "Fall 5": { bg:"#7A4419", light:"#FBF1E6", accent:"#B5651D", icon:Shield, label:"Fall 5 – Tat 25.12., SG 15.01. (Jahreswechsel)" },
  "Fall 6": { bg:"#1A5C5C", light:"#E6F5F5", accent:"#1A8C8C", icon:Shield, label:"Fall 6 – Tat 19.06., SG 30.06." },
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Quiz() {
  const [stage, setStage] = useState("start");
  const [activeCats, setActiveCats] = useState(Object.keys(CAT_STYLES));
  const [order, setOrder] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState({});
  const [errorKeys, setErrorKeys] = useState(null);
  const [errorCounts, setErrorCounts] = useState(() => {
    try { return JSON.parse(localStorage.getItem("uebungErrors") || "{}"); } catch { return {}; }
  });
  const qKey = (q) => q.q.slice(0, 80);
  const errCount = Object.keys(errorCounts).length;
  const [unlocked, setUnlocked] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState({});

  const filteredQ = useMemo(
    () => errorKeys ? QUESTIONS.filter(q => errorKeys.includes(qKey(q)))
                    : QUESTIONS.filter(q => activeCats.includes(q.cat)),
    [activeCats, errorKeys]
  );

  function shuffleOptionsForPool(pool) {
    const result = {};
    pool.forEach((q, i) => {
      const correctAnswers = Array.isArray(q.correct) ? q.correct : [q.correct];
      const indexed = q.options.map((opt, idx) => ({ opt, isCorrect: correctAnswers.includes(idx) }));
      for (let k = indexed.length - 1; k > 0; k--) {
        const j = Math.floor(Math.random() * (k + 1));
        [indexed[k], indexed[j]] = [indexed[j], indexed[k]];
      }
      const newOptions = indexed.map(x => x.opt);
      const newCorrect = Array.isArray(q.correct)
        ? indexed.map((x, ni) => x.isCorrect ? ni : -1).filter(n => n >= 0)
        : indexed.findIndex(x => x.isCorrect);
      result[i] = { options: newOptions, correct: newCorrect };
    });
    return result;
  }

  function startQuiz(flag) {
    const errorsOnly = flag === true;
    const keys = errorsOnly ? Object.keys(errorCounts).filter(k => errorCounts[k] > 0) : null;
    const pool = keys ? QUESTIONS.filter(q => keys.includes(qKey(q)))
                      : QUESTIONS.filter(q => activeCats.includes(q.cat));
    if (pool.length === 0) return;
    setErrorKeys(keys);
    setShuffledOptions(shuffleOptionsForPool(pool));
    const ord = pool.map((_, i) => i);
    setOrder(ord); setIdx(0); setSelected([]); setRevealed(false); setAnswers({});
    setStage("quiz");
  }

  function toggleCat(cat) {
    setActiveCats(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  }

  function toggleOption(i, mode) {
    if (revealed) return;
    if (mode === "single") {
      setSelected([i]);
    } else {
      setSelected(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
    }
  }

  function confirmAnswer() {
    if (selected.length === 0) return;
    const q = filteredQ[order[idx]];
    const correctArr = Array.isArray(q.correct) ? q.correct : [q.correct];
    const isCorrect = JSON.stringify([...selected].sort((a,b)=>a-b)) === JSON.stringify([...correctArr].sort((a,b)=>a-b));
    setAnswers(prev => ({ ...prev, [idx]: { selected: [...selected], correct: isCorrect } }));
    const key = qKey(q);
    setErrorCounts(prev => {
      const nextC = { ...prev };
      if (isCorrect) {
        if (nextC[key]) { nextC[key] -= 1; if (nextC[key] <= 0) delete nextC[key]; }
      } else {
        nextC[key] = (nextC[key] || 0) + 1;
      }
      try { localStorage.setItem("uebungErrors", JSON.stringify(nextC)); } catch (e) {}
      return nextC;
    });
    setRevealed(true);
  }

  function next() {
    if (idx + 1 >= order.length) { setStage("result"); return; }
    setIdx(idx + 1); setSelected([]); setRevealed(false);
  }

  function prev() {
    if (idx === 0) return;
    const ni = idx - 1; setIdx(ni);
    const a = answers[ni];
    setSelected(a ? a.selected : []);
    setRevealed(!!a);
  }

  const score = Object.values(answers).filter(a => a.correct).length;
  const totalAnswered = Object.keys(answers).length;

  // ── PASSWORD GATE ──
  if (!unlocked) {
    return (
      <div style={{ minHeight:"100vh", background:"#0F1B2D", display:"flex", alignItems:"center", justifyContent:"center", padding:24, fontFamily:"Inter,system-ui,sans-serif" }}>
        <div style={{ maxWidth:400, width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16, padding:32, textAlign:"center" }}>
          <Shield size={40} color="#2E5F8A" style={{ margin:"0 auto 16px" }} />
          <h1 style={{ color:"#fff", fontSize:20, fontWeight:800, marginBottom:8 }}>{APP_TITLE}</h1>
          <p style={{ color:"#A8BAD0", fontSize:13, marginBottom:24 }}>Bitte Passwort eingeben</p>
          <input
            type="password"
            value={pw}
            onChange={e => { setPw(e.target.value); setPwError(false); }}
            onKeyDown={e => { if (e.key === "Enter") { if (pw === PASSWORD) setUnlocked(true); else setPwError(true); } }}
            placeholder="Passwort"
            style={{ width:"100%", padding:"12px 14px", borderRadius:10, border:`2px solid ${pwError ? "#C0392B" : "rgba(255,255,255,0.15)"}`, background:"rgba(255,255,255,0.06)", color:"#fff", fontSize:15, marginBottom:12, boxSizing:"border-box", outline:"none" }}
          />
          {pwError && <p style={{ color:"#F1948A", fontSize:12, marginBottom:10 }}>Falsches Passwort</p>}
          <button
            onClick={() => { if (pw === PASSWORD) setUnlocked(true); else setPwError(true); }}
            style={{ width:"100%", padding:"12px", borderRadius:10, border:"none", background:"linear-gradient(135deg,#2E5F8A,#1F3864)", color:"#fff", fontWeight:700, fontSize:15, cursor:"pointer" }}
          >
            Entsperren
          </button>
        </div>
      </div>
    );
  }

  // ── START ──
  if (stage === "start") {
    return (
      <div style={{ minHeight:"100vh", background:"#0F1B2D", fontFamily:"Inter,system-ui,sans-serif", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px" }}>
        <div style={{ maxWidth:520, width:"100%" }}>
          <div style={{ textAlign:"center", marginBottom:28 }}>
            <Shield size={44} color="#2E5F8A" style={{ margin:"0 auto 12px" }} />
            <h1 style={{ fontSize:22, fontWeight:800, margin:"0 0 6px" }}>{APP_TITLE}</h1>
            <p style={{ color:"#A8BAD0", fontSize:13 }}>§ 37 · § 47 · § 42 · § 57 WDO – Fristen trainieren</p>
          </div>

          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:1.5, color:"#7FA8D9", marginBottom:10 }}>FÄLLE AUSWÄHLEN</div>
            {Object.entries(CAT_STYLES).map(([cat, style]) => {
              const active = activeCats.includes(cat);
              const count = QUESTIONS.filter(q => q.cat === cat).length;
              return (
                <button key={cat} onClick={() => toggleCat(cat)} style={{ width:"100%", marginBottom:8, padding:"12px 14px", borderRadius:11, border:`2px solid ${active ? style.accent : "rgba(255,255,255,0.12)"}`, background:active ? `rgba(${style.accent},0.08)` : "transparent", color:active ? "#fff" : "#6B8CAE", cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:10, transition:"all 0.15s" }}>
                  <div style={{ width:20, height:20, borderRadius:5, border:`2px solid ${active ? style.accent : "#4A6A8A"}`, background:active ? style.accent : "transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    {active && <Check size={12} color="#fff" strokeWidth={3} />}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, fontSize:13 }}>{style.label}</div>
                  </div>
                  <div style={{ fontSize:12, color:"#7FA8D9", fontWeight:600 }}>{count} Fragen</div>
                </button>
              );
            })}
          </div>

          <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, padding:"10px 14px", marginBottom:16, fontSize:12.5, color:"#A8BAD0", lineHeight:1.6 }}>
            <strong style={{ color:"#7FA8D9" }}>Fristen-Logik:</strong> Verhängung (§ 37 WDO) → +1 Tag ab 06:00 Uhr · Vollstreckung (§ 47 WDO) → +1 Tag ab 13:00 Uhr · Beschwerde (§ 42/§ 6 WBO) → +1 Tag ab 06:00 Uhr, Frist 1 Monat · Vollstreckungsfrist (§ 57 WDO) → 6 Monate ab Unanfechtbarkeit · 6-Monats-Verhängungsfrist → Vortag des kalendergleichen Datums, 24:00 Uhr
          </div>

          <button
            onClick={() => startQuiz(false)}
            disabled={filteredQ.length === 0}
            style={{ width:"100%", padding:"14px", borderRadius:11, border:"none", background:filteredQ.length === 0 ? "#1E3050" : "linear-gradient(135deg,#2E5F8A,#1F3864)", color:filteredQ.length === 0 ? "#4A6A8A" : "#fff", fontWeight:700, fontSize:15, cursor:filteredQ.length === 0 ? "not-allowed" : "pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}
          >
            Quiz starten ({filteredQ.length} Fragen) <ChevronRight size={17} />
          </button>
          {errCount > 0 && !errorKeys && (
            <button onClick={() => startQuiz(true)} style={{ width:"100%", marginTop:10, padding:"13px", borderRadius:11, border:"2px solid #B03A3A", background:"rgba(176,58,58,0.15)", color:"#F5B7B1", fontSize:14, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              <RotateCcw size={15} /> Fehler wiederholen ({errCount} {errCount === 1 ? "Frage" : "Fragen"})
            </button>
          )}
          {errCount > 0 && !errorKeys && (
            <button onClick={() => { if (window.confirm("Fehlerliste wirklich löschen?")) { setErrorCounts({}); try { localStorage.removeItem("uebungErrors"); } catch (e) {} } }} style={{ width:"100%", marginTop:8, padding:"10px", borderRadius:10, border:"1px solid rgba(255,255,255,0.2)", background:"transparent", color:"#8FA3BC", fontSize:12.5, fontWeight:600, cursor:"pointer" }}>
              Fehlerliste zurücksetzen
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── RESULT ──
  if (stage === "result") {
    const pct = Math.round((score / order.length) * 100);
    const byTopic = {};
    order.forEach((qi, i) => {
      const q = filteredQ[qi];
      if (!byTopic[q.cat]) byTopic[q.cat] = { correct:0, total:0 };
      byTopic[q.cat].total++;
      if (answers[i]?.correct) byTopic[q.cat].correct++;
    });
    return (
      <div style={{ minHeight:"100vh", background:"#0F1B2D", fontFamily:"Inter,system-ui,sans-serif", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px" }}>
        <div style={{ maxWidth:520, width:"100%" }}>
          <div style={{ textAlign:"center", marginBottom:24 }}>
            <div style={{ width:90, height:90, borderRadius:"50%", margin:"0 auto 14px", display:"flex", alignItems:"center", justifyContent:"center", background:`conic-gradient(#2E5F8A ${pct}%, rgba(255,255,255,0.08) ${pct}%)` }}>
              <div style={{ width:72, height:72, borderRadius:"50%", background:"#0F1B2D", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ fontSize:20, fontWeight:800 }}>{pct}%</div>
              </div>
            </div>
            <h2 style={{ fontSize:20, fontWeight:800, margin:"0 0 5px" }}>{score} von {order.length} richtig</h2>
            <p style={{ color:"#A8BAD0", fontSize:13 }}>{pct >= 80 ? "Sehr gut – Fristen sitzen!" : pct >= 60 ? "Solide – weiter üben!" : "Nochmal die Fristenlogik wiederholen!"}</p>
          </div>
          <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, padding:16, marginBottom:16 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:1.5, color:"#7FA8D9", marginBottom:12 }}>ERGEBNIS NACH FALL</div>
            {Object.entries(byTopic).map(([cat, stats]) => {
              const style = CAT_STYLES[cat]; const p = Math.round(stats.correct / stats.total * 100);
              return (<div key={cat} style={{ marginBottom:10 }}><div style={{ display:"flex", justifyContent:"space-between", fontSize:12.5, marginBottom:4 }}><span style={{ fontWeight:600 }}>{style.label}</span><span style={{ color:"#A8BAD0" }}>{stats.correct}/{stats.total}</span></div><div style={{ height:6, borderRadius:3, background:"rgba(255,255,255,0.08)", overflow:"hidden" }}><div style={{ height:"100%", width:`${p}%`, background:style.accent, borderRadius:3 }} /></div></div>);
            })}
          </div>
          <button onClick={() => { setErrorKeys(null); setStage("start"); }} style={{ width:"100%", padding:"13px", borderRadius:11, border:"none", background:"linear-gradient(135deg,#2E5F8A,#1F3864)", color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
            <RotateCcw size={14} /> Neues Quiz starten
          </button>
        </div>
      </div>
    );
  }

  // ── QUIZ ──
  const q = filteredQ[order[idx]];
  const style = CAT_STYLES[q.cat];
  const Icon = style.icon;
  const isMulti = q.mode === "multi";
  // Use shuffled options/correct for this question slot
  const shuffled = shuffledOptions[order[idx]] || { options: q.options, correct: q.correct };
  const displayOptions = shuffled.options;
  const correctArr = Array.isArray(shuffled.correct) ? shuffled.correct : [shuffled.correct];

  return (
    <div style={{ minHeight:"100vh", background:"#F5F3EE", fontFamily:"Inter,system-ui,sans-serif", display:"flex", flexDirection:"column", alignItems:"center", padding:"16px 12px 30px" }}>
      <div style={{ maxWidth:680, width:"100%" }}>
        <div style={{ marginBottom:12 }}>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#666", marginBottom:4, fontWeight:600 }}>
            <span>Frage {idx + 1} von {order.length}</span>
            <span>{score}/{totalAnswered} richtig</span>
          </div>
          <div style={{ height:4, borderRadius:2, background:"#E2DFD6", overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${idx/order.length*100}%`, background:style.accent, borderRadius:2, transition:"width 0.3s" }} />
          </div>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:10 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 10px", borderRadius:20, background:style.light }}>
            <Icon size={11} color={style.accent} />
            <span style={{ fontSize:11, fontWeight:700, color:style.accent }}>{style.label} · {q.topic}</span>
          </div>
          {isMulti && (
            <div style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"3px 8px", borderRadius:20, background:"#FFF3CD", border:"1px solid #FFC107" }}>
              <CheckSquare size={10} color="#856404" />
              <span style={{ fontSize:10, fontWeight:700, color:"#856404" }}>MEHRFACHAUSWAHL</span>
            </div>
          )}
        </div>

        <h2 style={{ fontSize:15, fontWeight:700, color:"#1A1A1A", lineHeight:1.5, marginBottom:14, whiteSpace:"pre-wrap" }}>{q.q}</h2>

        <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:14 }}>
          {displayOptions.map((opt, i) => {
            const isSel = selected.includes(i);
            const isCorrectOpt = correctArr.includes(i);
            let bg="#fff", border="#E2DFD6", color="#1A1A1A", marker="";

            if (revealed) {
              if (isCorrectOpt && isSel)   { bg="#E9F7EF"; border="#1E6B1E"; color="#14401A"; marker="✓"; }
              else if (isCorrectOpt)        { bg="#FFF9E6"; border="#F0A500"; color="#7A5100"; marker="→"; }
              else if (isSel)               { bg="#FADBD8"; border="#C0392B"; color="#7B241C"; marker="✗"; }
              else                          { bg="#FAFAFA"; color="#999"; }
            } else if (isSel) {
              bg = style.light; border = style.accent;
            }

            return (
              <button key={i} onClick={() => toggleOption(i, q.mode)} style={{ display:"flex", alignItems:"flex-start", gap:9, textAlign:"left", padding:"10px 13px", borderRadius:10, border:`2px solid ${border}`, background:bg, color, fontSize:13.5, fontWeight:500, width:"100%", cursor:revealed?"default":"pointer", transition:"all 0.1s" }}>
                <span style={{
                  width:20, height:20,
                  borderRadius: isMulti ? "4px" : "50%",
                  border:`2px solid ${isSel && !revealed ? style.accent : revealed ? "transparent" : "#CCC"}`,
                  background: isSel && !revealed ? style.accent : "transparent",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:10, fontWeight:800,
                  color: revealed ? (isCorrectOpt ? (isSel ? "#1E6B1E" : "#F0A500") : (isSel ? "#C0392B" : "#999")) : (isSel ? "#fff" : "#888"),
                  flexShrink:0, marginTop:1
                }}>
                  {revealed ? marker : (isMulti ? (isSel ? "✓" : "") : String.fromCharCode(65+i))}
                </span>
                <span style={{ flex:1, lineHeight:1.45 }}>{opt}</span>
              </button>
            );
          })}
        </div>

        {revealed && (
          <div style={{ background:answers[idx]?.correct?"#E9F7EF":"#FFF8E1", border:`1px solid ${answers[idx]?.correct?"rgba(30,107,30,0.2)":"rgba(240,180,41,0.2)"}`, borderRadius:10, padding:"12px 14px", marginBottom:14, fontSize:13, lineHeight:1.6, color:"#333" }}>
            <div style={{ fontWeight:700, marginBottom:4, color:answers[idx]?.correct?"#1E6B1E":"#8A6D1A" }}>
              {answers[idx]?.correct ? "✓ Richtig!" : "✗ Nicht ganz – korrekte Antwort(en) oben markiert (→)"}
            </div>
            {q.expl}
          </div>
        )}

        <div style={{ display:"flex", gap:8 }}>
          <button onClick={prev} disabled={idx===0} style={{ padding:"11px 14px", borderRadius:9, border:"2px solid #E2DFD6", background:"#fff", color:idx===0?"#CCC":"#333", fontWeight:600, fontSize:13, cursor:idx===0?"not-allowed":"pointer", display:"flex", alignItems:"center", gap:4 }}>
            <ChevronLeft size={14}/> Zurück
          </button>
          {!revealed ? (
            <button onClick={confirmAnswer} disabled={selected.length===0} style={{ flex:1, padding:"11px", borderRadius:9, border:"none", background:selected.length===0?"#E2DFD6":style.accent, color:"#fff", fontWeight:700, fontSize:14, cursor:selected.length===0?"not-allowed":"pointer" }}>
              {isMulti ? `Antwort prüfen (${selected.length} gewählt)` : "Antwort prüfen"}
            </button>
          ) : (
            <button onClick={next} style={{ flex:1, padding:"11px", borderRadius:9, border:"none", background:style.accent, color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:4 }}>
              {idx+1>=order.length?"Ergebnis":"Nächste Frage"} <ChevronRight size={14}/>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
